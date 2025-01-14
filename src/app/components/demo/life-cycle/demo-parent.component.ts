import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DemoComponent } from './demo.component'

@Component({
  selector: 'app-demo-parent',
  standalone: true,
  imports: [CommonModule, DemoComponent, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Lifecycle Demo</h1>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2"> Parent Input Value: </label>
        <input
          type="text"
          [(ngModel)]="parentInputValue"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <button (click)="toggleChild()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ showChild ? 'Destroy' : 'Create' }} Child Component
        </button>
      </div>

      @if (showChild) {
      <app-demo [demoInput]="parentInputValue" />
      }
    </div>
  `,
})
export class DemoParentComponent {
  parentInputValue = ''
  showChild = true

  toggleChild() {
    this.showChild = !this.showChild
  }
}
