import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CounterComponent } from './counter.component'

@Component({
  selector: 'app-two-way-parent',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Two-Way Binding Demo</h2>

      <!-- Using two-way binding -->
      <div class="mb-6">
        <h3 class="text-lg mb-2">Two-way binding counter:</h3>
        <app-counter [(value)]="count"></app-counter>
        <p class="mt-2 text-gray-600">Parent count: {{ count }}</p>
      </div>

      <!-- Same thing but with separate property and event binding -->
      <div class="mb-6">
        <h3 class="text-lg mb-2">Equivalent with separate bindings:</h3>
        <app-counter [value]="count2" (valueChange)="count2 = $event"></app-counter>
        <p class="mt-2 text-gray-600">Parent count: {{ count2 }}</p>
      </div>

      <div class="bg-gray-100 p-4 rounded">
        <p class="text-sm">
          Note: Both counters are equivalent. The first uses [(value)] syntax, while the second shows the expanded form
          with separate [value] and (valueChange).
        </p>
      </div>
    </div>
  `,
})
export class TwoWayParentComponent {
  count = 0
  count2 = 0
}
