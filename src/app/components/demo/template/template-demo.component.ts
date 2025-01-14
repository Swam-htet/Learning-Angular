import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

interface User {
  name: string
  age: number
  active: boolean
}

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-6">Template Syntax Demo</h2>

      <!-- Interpolation -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">1. Interpolation</h3>
        <p>Welcome, {{ username }}!</p>
        <p>2 + 2 = {{ 2 + 2 }}</p>
        <p>{{ getGreeting() }}</p>
      </section>

      <!-- Property Binding -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">2. Property Binding</h3>
        <img [src]="imageUrl" [alt]="imageAlt" class="w-32 h-32 object-cover rounded" />
        <button [disabled]="isDisabled" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          Click me
        </button>
      </section>

      <!-- Event Binding -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">3. Event Binding</h3>
        <button (click)="handleClick($event)" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Click Counter: {{ clickCount }}
        </button>
        <div
          (mouseover)="handleMouseOver()"
          (mouseout)="handleMouseOut()"
          class="mt-4 p-4 bg-gray-100 rounded"
          [class.bg-yellow-100]="isHovered"
        >
          Hover over me!
        </div>
      </section>

      <!-- Two-way Binding -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">4. Two-way Binding</h3>
        <input [(ngModel)]="username" class="px-3 py-2 border rounded" placeholder="Enter your name" />
        <p class="mt-2">Hello, {{ username }}!</p>
      </section>

      <!-- Structural Directives -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">5. Structural Directives</h3>

        <!-- ngIf -->
        <div class="mb-4">
          <button (click)="toggleContent()" class="px-4 py-2 bg-purple-500 text-white rounded">Toggle Content</button>
          @if (showContent) {
            <div class="mt-2 p-2 bg-purple-100 rounded">This content can be toggled!</div>
          }
        </div>

        <!-- ngFor -->
        <div class="mb-4">
          <h4 class="font-semibold mb-2">User List</h4>
          @for (user of users; track user.name) {
            <div class="p-2 mb-2 bg-gray-100 rounded flex justify-between items-center">
              <span>{{ user.name }} ({{ user.age }})</span>
              <span class="px-2 py-1 rounded" [class.bg-green-200]="user.active" [class.bg-red-200]="!user.active">
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          }
        </div>

        <!-- ngSwitch -->
        <div class="mb-4">
          <select [(ngModel)]="selectedRole" class="px-3 py-2 border rounded">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>

          <div [ngSwitch]="selectedRole" class="mt-2">
            @switch (selectedRole) {
              @case ('admin') {
                <div class="p-2 bg-red-100 rounded">Welcome Administrator!</div>
              }
              @case ('user') {
                <div class="p-2 bg-blue-100 rounded">Welcome User!</div>
              }
              @default {
                <div class="p-2 bg-gray-100 rounded">Welcome Guest!</div>
              }
            }
          </div>
        </div>
      </section>

      <!-- Template Variables -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">6. Template Variables</h3>
        <input #nameInput type="text" class="px-3 py-2 border rounded mr-2" placeholder="Enter text" />
        <button (click)="showInputValue(nameInput.value)" class="px-4 py-2 bg-indigo-500 text-white rounded">
          Show Value
        </button>
        <p class="mt-2">Last entered value: {{ lastInputValue }}</p>
      </section>
    </div>
  `,
})
export class TemplateDemoComponent {
  // Properties for interpolation
  username = 'John Doe'
  getGreeting() {
    return 'Hello from a method!'
  }

  // Properties for property binding
  imageUrl = 'https://picsum.photos/200'
  imageAlt = 'Random image'
  isDisabled = false

  // Properties for event binding
  clickCount = 0
  isHovered = false

  // Properties for structural directives
  showContent = false
  users: User[] = [
    { name: 'John', age: 30, active: true },
    { name: 'Jane', age: 25, active: false },
    { name: 'Bob', age: 35, active: true },
  ]
  selectedRole = 'guest'

  // Properties for template variables
  lastInputValue = ''

  // Event handlers
  handleClick(event: MouseEvent) {
    this.clickCount++
    console.log('Click event:', event)
  }

  handleMouseOver() {
    this.isHovered = true
  }

  handleMouseOut() {
    this.isHovered = false
  }

  toggleContent() {
    this.showContent = !this.showContent
  }

  showInputValue(value: string) {
    this.lastInputValue = value
  }
}
