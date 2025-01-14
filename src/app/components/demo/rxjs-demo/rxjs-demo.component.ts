import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">RxJS Demo</h2>

      <!-- Todo List with Reactive State -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Reactive Todo List</h3>
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            [(ngModel)]="newTodoText"
            (keyup.enter)="addTodo()"
            placeholder="Add new todo..."
            class="flex-grow px-3 py-2 border rounded"
          />
          <button (click)="addTodo()" class="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
          <button (click)="addTodoAsync()" class="px-4 py-2 bg-green-500 text-white rounded">Add Async</button>
        </div>

        <!-- Todo Stats -->
        <!-- <div class="mb-4 flex gap-4 text-sm">
          <p>Total: {{ todoStats$ | async | json }}</p>
        </div> -->

        <!-- Todo List -->
        <div class="space-y-2">
          @for (todo of todos$ | async; track todo.id) {
          <div class="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              type="checkbox"
              [disabled]="todo.completed"
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
              class="h-4 w-4"
            />
            <span [class.line-through]="todo.completed">
              {{ todo.text }}
            </span>
            <button
              (click)="removeTodo(todo.id)"
              [disabled]="todo.completed"
              class="ml-auto px-2 py-1 text-sm text-red-500 hover:bg-red-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class RxjsDemoComponent {
  // Todo list
  private todos = new BehaviorSubject<TodoItem[]>([])
  todos$ = this.todos.asObservable()
  newTodoText = ''
  // todoStats$: Observable<{ total: number; completed: number; active: number }> = null!

  // ngOnInit() {
  //   // Setup todo stats
  //   this.todoStats$ = this.todos$.pipe(
  //     map((todos) => ({
  //       total: todos.length,
  //       completed: todos.filter((t) => t.completed).length,
  //       active: todos.filter((t) => !t.completed).length,
  //     })),
  //   )
  // }

  // Todo methods
  addTodo() {
    if (this.newTodoText.trim()) {
      const currentTodos = this.todos.value
      const newTodo: TodoItem = {
        id: Date.now(),
        text: this.newTodoText.trim(),
        completed: false,
      }
      this.todos.next([...currentTodos, newTodo])
      this.newTodoText = ''
    }
  }

  toggleTodo(id: number) {
    const currentTodos = this.todos.value
    const updatedTodos = currentTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    this.todos.next(updatedTodos)
  }

  removeTodo(id: number) {
    const currentTodos = this.todos.value
    this.todos.next(currentTodos.filter((todo) => todo.id !== id))
  }

  async addTodoAsync() {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const newTodo: TodoItem = {
      id: Date.now(),
      text: this.newTodoText.trim(),
      completed: false,
    }
    this.todos.next([...this.todos.value, newTodo])
    this.newTodoText = ''
  }
}
