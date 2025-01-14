import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SquareComponent } from './square.component'

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-md mx-auto">
        <!-- Game Status -->
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold mb-4">Tic Tac Toe</h2>
          <p class="text-xl" [class.text-blue-600]="xIsNext" [class.text-red-600]="!xIsNext">
            {{ gameStatus }}
          </p>
        </div>

        <!-- Game Board -->
        <div class="grid grid-cols-3 gap-2 aspect-square mb-8">
          @for (square of squares; track $index) {
          <app-square [value]="square" (move)="makeMove($index)" />
          }
        </div>

        <!-- Game Controls -->
        <div class="flex justify-center space-x-4">
          <button
            (click)="newGame()"
            class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            New Game
          </button>
          <button
            (click)="undoMove()"
            [disabled]="moveHistory.length === 0"
            class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>
        </div>

        <!-- Game Stats -->
        <div class="mt-8 text-center space-y-2">
          <p class="text-blue-600">Player X Wins: {{ xWins }}</p>
          <p class="text-red-600">Player O Wins: {{ oWins }}</p>
          <p class="text-gray-600">Draws: {{ draws }}</p>
        </div>
      </div>
    </div>
  `,
})
export class BoardComponent {
  squares: ('X' | 'O' | null)[] = Array(9).fill(null)
  xIsNext = true
  winner: string | null = null
  moveHistory: number[] = []
  xWins = 0
  oWins = 0
  draws = 0

  get gameStatus(): string {
    if (this.winner) {
      return `Winner: ${this.winner}`
    } else if (this.isDraw()) {
      return "It's a draw!"
    } else {
      return `Next player: ${this.xIsNext ? 'X' : 'O'}`
    }
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.squares[idx] = this.xIsNext ? 'X' : 'O'
      this.moveHistory.push(idx)
      this.xIsNext = !this.xIsNext
      this.winner = this.calculateWinner()

      if (this.winner) {
        if (this.winner === 'X') this.xWins++
        else this.oWins++
      } else if (this.isDraw()) {
        this.draws++
      }
    }
  }

  undoMove() {
    if (this.moveHistory.length > 0) {
      const lastMove = this.moveHistory.pop()!
      this.squares[lastMove] = null
      this.xIsNext = !this.xIsNext
      this.winner = null
    }
  }

  newGame() {
    this.squares = Array(9).fill(null)
    this.xIsNext = true
    this.winner = null
    this.moveHistory = []
  }

  private calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a]
      }
    }
    return null
  }

  private isDraw(): boolean {
    return !this.winner && this.squares.every((square) => square !== null)
  }
}
