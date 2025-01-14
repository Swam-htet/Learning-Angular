import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { CounterService } from '../../../services/counter.service'

@Component({
  selector: 'app-counter-b',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 border rounded bg-green-50">
      <h3 class="text-lg font-semibold mb-2">Counter B Component</h3>

      <!-- Using subscription approach instead of async pipe -->
      <div class="mb-4">Current Count: {{ currentCount }}</div>

      <div class="flex space-x-2">
        <button
          (click)="counterService.increment()"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>
        <button (click)="counterService.decrement()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Decrement
        </button>
      </div>

      <!-- Show count updates -->
      <div class="mt-4 text-sm text-gray-600">Updates received: {{ updateCount }}</div>
    </div>
  `,
})
export class CounterBComponent implements OnInit, OnDestroy {
  currentCount = 0
  updateCount = 0
  private subscription: Subscription = new Subscription()

  constructor(public counterService: CounterService) {}

  ngOnInit() {
    // Subscribe to count changes
    this.subscription = this.counterService.count$.subscribe((count) => {
      this.currentCount = count
      this.updateCount++
    })
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
