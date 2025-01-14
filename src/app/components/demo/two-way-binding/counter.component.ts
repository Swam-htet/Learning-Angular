import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 border rounded">
      <h3 class="text-lg font-semibold mb-2">Counter Component</h3>
      <div class="flex items-center space-x-4">
        <button (click)="decrement()" class="px-3 py-1 bg-red-500 text-white rounded">-</button>
        <span>{{ value }}</span>
        <button (click)="increment()" class="px-3 py-1 bg-green-500 text-white rounded">+</button>
      </div>
    </div>
  `,
})
export class CounterComponent {
  // Input property for the value
  @Input() value: number = 0

  // Output event emitter for value changes
  // Note: must be named {propertyName}Change for two-way binding
  @Output() valueChange = new EventEmitter<number>()

  increment() {
    this.valueChange.emit(this.value + 1)
  }

  decrement() {
    this.valueChange.emit(this.value - 1)
  }
}
