import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border p-4 rounded-lg bg-white shadow-sm">
      <h3 class="text-lg font-semibold mb-4">Child Component</h3>

      <!-- Display Input values -->
      <div class="mb-4">
        <p class="text-gray-600">
          Message from parent: <span class="font-medium">{{ message }}</span>
        </p>
        <p class="text-gray-600">
          Count from parent: <span class="font-medium">{{ count }}</span>
        </p>
      </div>

      <!-- Buttons to emit events -->
      <div class="space-x-2">
        <button (click)="increment($event)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Increment
        </button>
        <button (click)="sendMessage()" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Send Message
        </button>
      </div>
    </div>
  `,
})
export class ChildComponent {
  // Input properties - receive data from parent
  @Input() message = '' // Simple input
  @Input({ required: true }) count = 0 // Required input

  // Output properties - send events to parent
  @Output() countChange = new EventEmitter<number>()
  @Output() messageEvent = new EventEmitter<string>()

  increment(event: Event) {
    console.log('increment', event)
    this.countChange.emit(this.count + 1)
  }

  sendMessage() {
    this.messageEvent.emit('Hello from child!')
  }
}
