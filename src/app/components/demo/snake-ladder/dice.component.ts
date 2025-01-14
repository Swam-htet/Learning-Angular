import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center">
      <div
        class="w-20 h-20 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex items-center justify-center mx-auto mb-4 cursor-pointer"
        [class.animate-bounce]="isRolling"
        (click)="roll()"
      >
        <span class="text-4xl font-bold">{{ value || '?' }}</span>
      </div>
      <button
        (click)="roll()"
        [disabled]="isRolling || disabled"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Roll Dice
      </button>
    </div>
  `,
})
export class DiceComponent {
  @Input() disabled = false
  @Output() rolled = new EventEmitter<number>()

  value: number | null = null
  isRolling = false

  roll() {
    if (this.isRolling || this.disabled) return

    this.isRolling = true
    this.value = null

    // Simulate rolling animation
    const rolls = 10
    let count = 0
    const interval = setInterval(() => {
      this.value = Math.floor(Math.random() * 6) + 1
      count++

      if (count === rolls) {
        clearInterval(interval)
        this.isRolling = false
        this.rolled.emit(this.value)
      }
    }, 100)
  }
}
