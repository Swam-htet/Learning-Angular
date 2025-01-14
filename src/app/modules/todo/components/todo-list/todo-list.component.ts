import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { TodoService } from '../../services/todo.service'
import { TodoItemComponent } from '../todo-item/todo-item.component'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  template: `
    <div class="max-w-4xl mx-auto p-4">
      <!-- Header and Stats -->
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold">Todo List</h1>
        <div class="text-sm text-gray-600">
          {{ todoService.stats().total }} total, {{ todoService.stats().active }} active,
          {{ todoService.stats().completed }} completed
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="mb-6 flex gap-4">
        <input
          type="text"
          [ngModel]="todoService.searchTerm()"
          (ngModelChange)="todoService.setSearchTerm($event)"
          placeholder="Search todos..."
          class="flex-grow px-4 py-2 border rounded-lg"
        />
        <select
          [ngModel]="todoService.filter()"
          (ngModelChange)="todoService.setFilter($event)"
          class="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <!-- Add Todo Form -->
      <form (submit)="addTodo()" class="mb-6 flex gap-4">
        <input
          type="text"
          [(ngModel)]="newTodoTitle"
          name="title"
          placeholder="Add new todo..."
          class="flex-grow px-4 py-2 border rounded-lg"
        />
        <select [(ngModel)]="newTodoPriority" name="priority" class="px-4 py-2 border rounded-lg bg-white">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Todo</button>
      </form>

      <!-- Todo List -->
      <div class="flex flex-col gap-2">
        @for (todo of todoService.filteredTodos(); track todo.id) {

        <app-todo-item
          [todo]="todo"
          (viewDetail)="viewDetail(todo.id)"
          (toggle)="todoService.toggleTodo($event)"
          (delete)="todoService.deleteTodo($event)"
        />

        } @empty {
        <div class="text-center py-8 text-gray-500">No todos found</div>
        }
      </div>

      <!-- Actions -->
      @if (todoService.stats().completed > 0) {
      <div class="mt-6 flex justify-end">
        <button
          (click)="todoService.clearCompleted()"
          class="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
        >
          Clear Completed
        </button>
      </div>
      }
    </div>
  `,
})
export class TodoListComponent {
  newTodoTitle = ''
  newTodoPriority: 'low' | 'medium' | 'high' = 'medium'

  constructor(public todoService: TodoService, private router: Router) {}

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle.trim(), undefined, this.newTodoPriority)
      this.newTodoTitle = ''
      this.newTodoPriority = 'medium'
    }
  }

  viewDetail(id: number) {
    this.router.navigate(['/demo-module/todos', id])
  }
}
