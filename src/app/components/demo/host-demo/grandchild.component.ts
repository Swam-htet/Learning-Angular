import { CommonModule } from '@angular/common'
import { Component, Host, Inject, Optional } from '@angular/core'

@Component({
  selector: 'app-grandchild',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-200 p-4 rounded mt-4">
      <h4 class="text-lg font-semibold mb-2">Grandchild Component</h4>
    </div>
  `,
})
export class GrandchildComponent {
  constructor(@Host() @Optional() @Inject('VALUE') public hostValue: string) {
    console.log('Grandchild Component - Value from Host:', hostValue)
  }
}
