import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ChildComponent } from './child.component'

@Component({
  selector: 'app-host-demo',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Host Demo</h2>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-600 mb-4">Parent Value: {{ parentValue }}</p>
        <app-child></app-child>
      </div>
    </div>
  `,
  providers: [{ provide: 'VALUE', useValue: 'Parent Component Value' }],
})
export class HostDemoComponent {
  parentValue = 'Parent Component Value'
}
