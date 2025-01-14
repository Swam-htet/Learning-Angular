import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ChildComponent } from './child.component'

@Component({
  selector: 'app-input-output-demo',
  standalone: true,
  imports: [CommonModule, ChildComponent, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-8">Input decorator and Output decorator Demo</h2>

      <!-- Parent Component Controls -->
      <div class="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Parent Component</h3>
        <div class="space-y-4">
          <div>
            <p class="text-gray-600">
              Current count: <span class="font-medium">{{ parentCount }}</span>
            </p>
            <p class="text-gray-600">
              Last message: <span class="font-medium">{{ lastMessage }}</span>
            </p>
          </div>
          <div>
            <input
              type="text"
              [(ngModel)]="parentMessage"
              class="px-3 py-2 border rounded mr-2"
              placeholder="Type a message..."
            />
          </div>
        </div>
      </div>

      <!-- Child Components -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-child
          [message]="parentMessage"
          [count]="parentCount"
          (countChange)="handleCountChange($event)"
          (messageEvent)="handleMessageEvent($event)"
        />

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Explanation</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Input decorator: Parent → Child data flow</li>
            <li>Output decorator: Child → Parent event flow</li>
            <li>Try typing in the input field above</li>
            <li>Click the buttons in child component</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class InputOutputDemoComponent {
  // Parent state
  parentMessage = 'Hello from parent!'
  parentCount = 0
  lastMessage = ''

  // Event handlers
  handleCountChange(newCount: number) {
    this.parentCount = newCount
  }

  handleMessageEvent(message: string) {
    this.lastMessage = message
  }
}
