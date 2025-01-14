import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CounterService } from '../../../services/counter.service'
import { CounterAComponent } from './counter-a.component'
import { CounterBComponent } from './counter-b.component'

@Component({
  selector: 'app-service-demo',
  standalone: true,
  imports: [CommonModule, CounterAComponent, CounterBComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Service Demo</h2>

      <div class="mb-6 bg-white p-4 rounded shadow">
        <p class="text-gray-600">
          This demo shows how services can share state between components. Both counters are synchronized because they
          use the same service instance.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <app-counter-a></app-counter-a>
        <app-counter-b></app-counter-b>
      </div>

      <!-- Service Information -->
      <div class="mt-6 bg-gray-100 p-4 rounded">
        <h3 class="text-lg font-semibold mb-2">About Services</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Services are singleton objects that can be injected into components</li>
          <li>They are great for sharing data and logic between components</li>
          <li>Current count from service: {{ counterService.getCurrentCount() }}</li>
        </ul>
      </div>
    </div>
  `,
})
export class ServiceDemoComponent {
  constructor(public counterService: CounterService) {}
}
