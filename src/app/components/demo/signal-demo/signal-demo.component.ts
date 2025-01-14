import { CommonModule } from '@angular/common'
import { Component, computed, effect, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Signals Demo</h2>

      <!-- Counter Example -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Counter with Signals</h3>
        <div class="flex items-center gap-4">
          <p class="text-2xl">Count: {{ count() }}</p>
          <p class="text-gray-600">Double: {{ doubleCount() }}</p>
          <div class="space-x-2">
            <button (click)="increment()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Increment
            </button>
            <button (click)="decrement()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Decrement
            </button>
            <button (click)="reset()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Reset</button>
          </div>
        </div>
      </div>

      <!-- Todo List with Signals -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Todo List with Signals</h3>

        <!-- Add Todo -->
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            [(ngModel)]="newTodoText"
            (keyup.enter)="addTodo()"
            placeholder="Add new todo..."
            class="flex-grow px-3 py-2 border rounded"
          />
          <button (click)="addTodo()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
        </div>

        <!-- Todo Stats -->
        <div class="mb-4 p-3 bg-gray-50 rounded flex gap-4">
          <p>Total: {{ todoStats().total }}</p>
          <p>Active: {{ todoStats().active }}</p>
          <p>Completed: {{ todoStats().completed }}</p>
        </div>

        <!-- Todo List -->
        <div class="space-y-2">
          @for (todo of todos(); track todo.id) {
          <div class="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)" class="h-4 w-4" />
            <span [class.line-through]="todo.completed">
              {{ todo.text }}
            </span>
            <button
              (click)="removeTodo(todo.id)"
              class="ml-auto px-2 py-1 text-sm text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </div>
          }
        </div>
      </div>

      <!-- Form with Signals -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Form with Signals</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              [ngModel]="formData().name"
              (ngModelChange)="updateFormField('name', $event)"
              class="mt-1 px-3 py-2 border rounded w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              [ngModel]="formData().email"
              (ngModelChange)="updateFormField('email', $event)"
              class="mt-1 px-3 py-2 border rounded w-full"
            />
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="font-medium">Form Data:</p>
            <pre class="text-sm">{{ formData() | json }}</pre>
          </div>
        </div>
      </div>

      <!-- Signal Information -->
      <div class="bg-gray-100 p-4 rounded">
        <h3 class="text-lg font-semibold mb-2">About Signals</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Signals are Angular's new reactive primitive</li>
          <li>They provide fine-grained reactivity</li>
          <li>computed() creates derived signals</li>
          <li>effect() runs side effects when signals change</li>
        </ul>
      </div>
    </div>
  `,
})
export class SignalDemoComponent {
  // Counter with Signals
  count = signal(0)
  doubleCount = computed(() => this.count() * 2)

  // Todo List with Signals
  todos = signal<TodoItem[]>([])
  newTodoText = ''

  // Computed todo stats
  todoStats = computed(() => {
    const todos = this.todos()
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    }
  })

  // Form with Signals
  formData = signal({
    name: '',
    email: '',
  })

  constructor() {
    // Effect to log changes
    effect(() => {
      console.log('Count changed:', this.count())
      console.log('Todos changed:', this.todos())
      console.log('Form data changed:', this.formData())
    })
  }

  // Counter methods
  increment() {
    this.count.update((c) => c + 1)
  }

  decrement() {
    this.count.update((c) => c - 1)
  }

  reset() {
    this.count.set(0)
  }

  // Todo methods
  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.update((todos) => [
        ...todos,
        {
          id: Date.now(),
          text: this.newTodoText.trim(),
          completed: false,
        },
      ])
      this.newTodoText = ''
    }
  }

  toggleTodo(id: number) {
    this.todos.update((todos) => todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  removeTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id))
  }

  // Form methods
  updateFormField(field: 'name' | 'email', value: string) {
    this.formData.update((data) => ({
      ...data,
      [field]: value,
    }))
  }
}
