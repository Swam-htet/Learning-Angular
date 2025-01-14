import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Todo } from '../../models/todo.model'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white shadow rounded-lg">
      <!-- Header -->
      <div class="px-6 py-4 border-b">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-semibold">Todo Details</h2>
          <div class="space-x-2">
            <button (click)="goBack()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Back</button>
            <button
              (click)="saveTodo()"
              [disabled]="!isDirty"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      @if (todo) {
      <div class="p-6 space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Title </label>
          <input
            type="text"
            [ngModel]="editedTodo!.title"
            (ngModelChange)="editedTodo!.title = $event; checkDirty()"
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
          <textarea
            [ngModel]="editedTodo!.description"
            (ngModelChange)="editedTodo!.description = $event; checkDirty()"
            rows="3"
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Priority </label>
          <select
            [ngModel]="editedTodo!.priority"
            (ngModelChange)="editedTodo!.priority = $event; checkDirty()"
            class="w-full px-3 py-2 border rounded bg-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              [ngModel]="editedTodo!.completed"
              (ngModelChange)="editedTodo!.completed = $event; checkDirty()"
              class="h-4 w-4"
            />
            <span class="text-sm font-medium text-gray-700"> Mark as completed </span>
          </label>
        </div>

        <!-- Metadata -->
        <div class="pt-6 border-t space-y-2 text-sm text-gray-500">
          <p>Created: {{ todo.createdAt | date : 'medium' }}</p>
          @if (todo.completed) {
          <p>Completed: {{ todo.completedAt | date : 'medium' }}</p>
          }
        </div>
      </div>
      }
    </div>
  `,
})
export class TodoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private todoService = inject(TodoService)

  todo: Todo | undefined
  editedTodo: Todo | undefined
  isDirty = false

  ngOnInit() {
    // Get todo from resolver data
    this.route.data.subscribe((data) => {
      this.todo = data['todo']
      this.editedTodo = { ...this.todo! } // Create a copy for editing
    })
  }

  checkDirty() {
    if (!this.todo || !this.editedTodo) return

    this.isDirty =
      this.todo.title !== this.editedTodo.title ||
      this.todo.description !== this.editedTodo.description ||
      this.todo.priority !== this.editedTodo.priority ||
      this.todo.completed !== this.editedTodo.completed
  }

  saveTodo() {
    if (!this.todo || !this.editedTodo || !this.isDirty) return

    this.todoService.updateTodo(this.todo.id, {
      title: this.editedTodo.title,
      description: this.editedTodo.description,
      priority: this.editedTodo.priority,
      completed: this.editedTodo.completed,
      completedAt: this.editedTodo.completed ? new Date() : undefined,
    })

    this.isDirty = false
    this.goBack()
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
