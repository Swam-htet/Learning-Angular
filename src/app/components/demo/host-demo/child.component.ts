import { CommonModule } from '@angular/common'
import { Component, Host, Inject, Optional } from '@angular/core'
import { GrandchildComponent } from './grandchild.component'


@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, GrandchildComponent],
  template: `
    <div class="bg-gray-100 p-4 rounded mt-4">
      <h3 class="text-xl font-semibold mb-2">Child Component</h3>
      <p class="text-gray-600 mb-4">Value from Host: {{ hostValue }}</p>
      <app-grandchild></app-grandchild>
    </div>
  `,
  providers: [{ provide: 'VALUE', useValue: 'Child Component Value' }],
})
export class ChildComponent {
  constructor(@Host() @Optional() @Inject('VALUE') public hostValue: string) {
    console.log('Child Component - Value from Host:', hostValue)
  }
}
