import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="w-full h-full text-5xl font-bold border-2 border-gray-400 focus:outline-none transition-colors"
      [class.hover:bg-gray-100]="!value"
      [class.cursor-pointer]="!value"
      [class.cursor-not-allowed]="value"
      [class.text-blue-600]="value === 'X'"
      [class.text-red-600]="value === 'O'"
      (click)="onClick()"
    >
      {{ value }}
    </button>
  `,
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null
  @Output() move = new EventEmitter<void>()

  onClick() {
    if (!this.value) {
      this.move.emit()
    }
  }
}
