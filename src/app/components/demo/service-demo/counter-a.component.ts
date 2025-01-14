import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CounterService } from '../../../services/counter.service'

@Component({
  selector: 'app-counter-a',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 border rounded bg-blue-50">
      <h3 class="text-lg font-semibold mb-2">Counter A Component</h3>

      <!-- Using async pipe to subscribe to the Observable -->
      <div class="mb-4">Current Count: {{ counterService.count$ | async }}</div>

      <div class="flex space-x-2">
        <button (click)="counterService.increment()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Increment
        </button>
        <button (click)="counterService.decrement()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Decrement
        </button>
        <button (click)="counterService.reset()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  `,
})
export class CounterAComponent {
  // Inject the counter service
  constructor(public counterService: CounterService) {}
}
