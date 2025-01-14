import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DiceComponent } from './dice.component'
import { Player, SnakeLadder } from './interfaces'

interface GameLog {
  playerId: number
  diceRoll: number
  from: number
  to: number
  snakeOrLadder?: SnakeLadder
  timestamp: Date
}

@Component({
  selector: 'app-snake-ladder-board',
  standalone: true,
  imports: [CommonModule, DiceComponent, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-4xl mx-auto">
        <!-- Player Settings -->
        @if (!gameStarted) {
        <div class="mb-8 bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Player Settings</h3>
            <div class="space-x-2">
              <button
                (click)="addPlayer()"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                [disabled]="players.length >= 4"
              >
                Add Player
              </button>
              <button
                (click)="removePlayer()"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                [disabled]="players.length <= 2"
              >
                Remove Player
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            @for (player of players; track player.id) {
            <div class="space-y-2 bg-gray-50 p-3 rounded">
              <div class="flex items-center space-x-2">
                <input
                  type="text"
                  [(ngModel)]="player.name"
                  class="border rounded px-2 py-1 flex-grow"
                  [placeholder]="'Player ' + player.id"
                />
                <input type="color" [(ngModel)]="player.color" class="w-8 h-8 rounded cursor-pointer" />
              </div>
            </div>
            }
          </div>
          <div class="mt-4 flex justify-center">
            <button
              (click)="startGame()"
              class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              [disabled]="!isValidPlayerSetup()"
            >
              Start Game
            </button>
          </div>
          @if (!isValidPlayerSetup()) {
          <p class="text-red-500 text-sm text-center mt-2">Please ensure all players have unique names and colors</p>
          }
        </div>
        }

        <!-- Game Status -->
        @if (gameStarted) {
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold mb-4">Snake & Ladder</h2>
          <p class="text-xl" [style.color]="currentPlayer.color">
            {{ gameStatus }}
          </p>
        </div>

        <!-- Game Board -->
        <div class="grid grid-cols-10 gap-1 aspect-square mb-8 bg-white rounded-lg shadow-lg p-2">
          @for (cell of board; track $index) {
          <div
            class="relative border border-gray-200 flex items-center justify-center"
            [class.bg-gray-100]="(9 - Math.floor($index / 10)) % 2 === Math.floor($index % 10) % 2"
          >
            <!-- Cell Number -->
            <span class="text-xs text-gray-500 absolute top-0 left-1">{{ 100 - $index }}</span>

            <!-- Players in Cell -->
            <div class="flex gap-1">
              @for (player of getPlayersInCell(100 - $index); track player.id) {
              <div
                class="w-3 h-3 rounded-full"
                [style.background-color]="player.color"
                [class.ring-2]="player.id === currentPlayer.id"
              ></div>
              }
            </div>

            <!-- Snake or Ladder Indicator with Points -->
            @if (getSnakeLadder(100 - $index)) {
            <div
              class="absolute inset-0 flex flex-col items-center justify-center text-sm"
              [class.text-red-500]="getSnakeLadder(100 - $index)?.type === 'snake'"
              [class.text-green-500]="getSnakeLadder(100 - $index)?.type === 'ladder'"
            >
              <span>{{ getSnakeLadder(100 - $index)?.type === 'snake' ? '🐍' : '🪜' }}</span>
              <span class="text-xs font-bold">
                {{ getSnakeLadderPoints(100 - $index) }}
              </span>
            </div>
            }
          </div>
          }
        </div>

        <!-- Snakes and Ladders Info -->
        <div class="mb-8 grid grid-cols-3 gap-4">
          <!-- Snakes List -->
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2 text-red-600">Snakes 🐍</h3>
            <div class="space-y-1">
              @for (snake of getSnakes(); track snake.start) {
              <div class="text-sm">
                From {{ snake.start }} to {{ snake.end }}
                <span class="text-red-500 font-bold">({{ snake.end - snake.start }})</span>
              </div>
              }
            </div>
          </div>

          <!-- Ladders List -->
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2 text-green-600">Ladders 🪜</h3>
            <div class="space-y-1">
              @for (ladder of getLadders(); track ladder.start) {
              <div class="text-sm">
                From {{ ladder.start }} to {{ ladder.end }}
                <span class="text-green-500 font-bold">(+{{ ladder.end - ladder.start }})</span>
              </div>
              }
            </div>
          </div>

          <!-- Movement Log -->
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2 text-gray-600">Movement Log 📝</h3>
            <div class="h-48 overflow-y-auto space-y-2">
              @for (log of movementLog.slice().reverse(); track log.timestamp) {
              <div
                class="text-sm p-2 rounded"
                [style.color]="players[log.playerId - 1].color"
                [class.bg-gray-50]="log.playerId === 1"
                [class.bg-gray-100]="log.playerId === 2"
              >
                <div class="font-semibold flex justify-between">
                  <span>{{ players[log.playerId - 1].name }}</span>
                  <span class="text-xs text-gray-500">{{ log.timestamp | date : 'HH:mm:ss' }}</span>
                </div>
                <div class="text-gray-600">
                  Rolled: {{ log.diceRoll }}
                  <span class="mx-1">•</span>
                  {{ log.from }} → {{ log.to }}
                </div>
                @if (log.snakeOrLadder) {
                <div class="text-xs">
                  Hit {{ log.snakeOrLadder.type === 'snake' ? '🐍' : '🪜' }} ({{
                    log.snakeOrLadder.type === 'snake' ? '' : '+'
                  }}{{ log.snakeOrLadder.end - log.snakeOrLadder.start }})
                </div>
                }
              </div>
              }
            </div>
          </div>
        </div>

        <!-- Game Controls -->
        <div class="flex justify-center space-x-8">
          <app-dice [disabled]="gameWon" (rolled)="onDiceRolled($event)" />
          <div class="space-y-2">
            @for (player of players; track player.id) {
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full" [style.background-color]="player.color"></div>
              <span>{{ player.name }}: Position {{ player.position }}</span>
            </div>
            }
          </div>
        </div>

        <!-- New Game Button -->
        @if (gameWon) {
        <div class="text-center mt-8">
          <button (click)="newGame()" class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            New Game
          </button>
        </div>
        } }
      </div>
    </div>
  `,
})
export class BoardComponent implements OnInit {
  board = Array(100).fill(null)
  players: Player[] = [
    { id: 1, name: 'Player 1', position: 1, color: '#2563eb' },
    { id: 2, name: 'Player 2', position: 1, color: '#dc2626' },
  ]
  defaultColors = ['#2563eb', '#dc2626', '#16a34a', '#ca8a04']
  currentPlayerIndex = 0
  gameWon = false
  gameStarted = false
  snakesAndLadders: SnakeLadder[] = [
    { start: 16, end: 6, type: 'snake' },
    { start: 47, end: 26, type: 'snake' },
    { start: 49, end: 11, type: 'snake' },
    { start: 56, end: 53, type: 'snake' },
    { start: 62, end: 19, type: 'snake' },
    { start: 64, end: 60, type: 'snake' },
    { start: 87, end: 24, type: 'snake' },
    { start: 93, end: 73, type: 'snake' },
    { start: 95, end: 75, type: 'snake' },
    { start: 98, end: 78, type: 'snake' },
    { start: 4, end: 14, type: 'ladder' },
    { start: 9, end: 31, type: 'ladder' },
    { start: 20, end: 38, type: 'ladder' },
    { start: 28, end: 84, type: 'ladder' },
    { start: 40, end: 59, type: 'ladder' },
    { start: 51, end: 67, type: 'ladder' },
    { start: 63, end: 81, type: 'ladder' },
    { start: 71, end: 91, type: 'ladder' },
  ]
  movementLog: GameLog[] = []

  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex]
  }

  get gameStatus(): string {
    if (this.gameWon) {
      return `${this.currentPlayer.name} wins!`
    }
    return `${this.currentPlayer.name}'s turn`
  }

  ngOnInit() {
    this.newGame()
  }

  startGame() {
    this.gameStarted = true
  }

  onDiceRolled(value: number) {
    const player = this.currentPlayer
    const startPosition = player.position
    let newPosition = startPosition + value

    // Create log entry
    const logEntry: GameLog = {
      playerId: player.id,
      diceRoll: value,
      from: startPosition,
      to: newPosition,
      timestamp: new Date(),
    }

    // Check if player won
    if (newPosition === 100) {
      player.position = newPosition
      this.gameWon = true
      this.movementLog.push(logEntry)
      return
    }

    // Check if player went past 100
    if (newPosition > 100) {
      newPosition = startPosition
      logEntry.to = startPosition
    }

    // Check for snakes and ladders
    const snakeLadder = this.getSnakeLadder(newPosition)
    if (snakeLadder) {
      logEntry.snakeOrLadder = snakeLadder
      newPosition = snakeLadder.end
      logEntry.to = newPosition
    }

    // Update player position
    player.position = newPosition
    this.movementLog.push(logEntry)

    // Switch to next player if game not won
    if (!this.gameWon) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
    }
  }

  getPlayersInCell(cellNumber: number): Player[] {
    return this.players.filter((player) => player.position === cellNumber)
  }

  getSnakeLadder(position: number): SnakeLadder | undefined {
    return this.snakesAndLadders.find((sl) => sl.start === position)
  }

  newGame() {
    this.players.forEach((player) => (player.position = 1))
    this.currentPlayerIndex = 0
    this.gameWon = false
    this.gameStarted = false
    this.movementLog = []
  }

  // Helper for template
  Math = Math

  // Helper methods for snakes and ladders info
  getSnakeLadderPoints(position: number): string {
    const snakeLadder = this.getSnakeLadder(position)
    if (!snakeLadder) return ''

    const diff = snakeLadder.end - snakeLadder.start
    return snakeLadder.type === 'snake' ? `${diff}` : `+${diff}`
  }

  getSnakes(): SnakeLadder[] {
    return this.snakesAndLadders.filter((sl) => sl.type === 'snake')
  }

  getLadders(): SnakeLadder[] {
    return this.snakesAndLadders.filter((sl) => sl.type === 'ladder')
  }

  addPlayer() {
    if (this.players.length < 4) {
      const newId = this.players.length + 1
      this.players.push({
        id: newId,
        name: `Player ${newId}`,
        position: 1,
        color: this.defaultColors[newId - 1],
      })
    }
  }

  removePlayer() {
    if (this.players.length > 2) {
      this.players.pop()
    }
  }

  isValidPlayerSetup(): boolean {
    const names = new Set(this.players.map((p) => p.name))
    const colors = new Set(this.players.map((p) => p.color))
    return (
      names.size === this.players.length &&
      colors.size === this.players.length &&
      this.players.every((p) => p.name.trim() !== '')
    )
  }
}
