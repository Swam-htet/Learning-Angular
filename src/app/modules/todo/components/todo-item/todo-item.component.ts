import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Todo } from '../../models/todo.model'

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 border rounded-lg" [class.bg-gray-50]="!todo.completed" [class.bg-green-50]="todo.completed">
      <div class="flex items-start gap-4">
        <!-- Checkbox and Title -->
        <div class="flex-grow flex items-start gap-3">
          <input type="checkbox" [checked]="todo.completed" (change)="toggle.emit(todo.id)" class="mt-1.5 h-4 w-4" />
          <div>
            @if (isEditing) {
            <input
              type="text"
              [ngModel]="todo.title"
              (ngModelChange)="updateTitle($event)"
              (blur)="isEditing = false"
              class="w-full px-2 py-1 border rounded"
              #titleInput
            />
            } @else {
            <div (dblclick)="startEditing()" class="cursor-pointer" [class.line-through]="todo.completed">
              <span class="font-medium">{{ todo.title }}</span>
              @if (todo.description) {
              <p class="text-sm text-gray-600 mt-1">
                {{ todo.description }}
              </p>
              }
            </div>
            }
          </div>
        </div>

        <!-- Priority and Actions -->
        <div class="flex items-center gap-2">
          <span
            class="px-2 py-1 text-xs rounded"
            [class.bg-red-100]="todo.priority === 'high'"
            [class.text-red-700]="todo.priority === 'high'"
            [class.bg-yellow-100]="todo.priority === 'medium'"
            [class.text-yellow-700]="todo.priority === 'medium'"
            [class.bg-green-100]="todo.priority === 'low'"
            [class.text-green-700]="todo.priority === 'low'"
          >
            {{ todo.priority }}
          </span>
          <button (click)="delete.emit(todo.id)" class="text-red-500 hover:bg-red-50 p-1 rounded">Delete</button>
          <button (click)="viewDetail.emit(todo.id)" class="text-blue-500 hover:bg-blue-50 p-1 rounded">Detail</button>
        </div>
      </div>

      <!-- Metadata -->
      <div class="mt-2 text-xs text-gray-500">
        Created: {{ todo.createdAt | date : 'medium' }}
        @if (todo.completed) {
        <span class="ml-2"> Completed: {{ todo.completedAt | date : 'medium' }} </span>
        }
      </div>
    </div>
  `,
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo
  @Output() toggle = new EventEmitter<number>()
  @Output() delete = new EventEmitter<number>()
  @Output() update = new EventEmitter<{ id: number; updates: Partial<Todo> }>()
  @Output() viewDetail = new EventEmitter<number>()

  isEditing = false

  startEditing() {
    if (!this.todo.completed) {
      this.isEditing = true
      // Focus input on next tick
      setTimeout(() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement
        input?.focus()
      })
    }
  }

  updateTitle(newTitle: string) {
    if (newTitle.trim() !== this.todo.title) {
      this.update.emit({
        id: this.todo.id,
        updates: { title: newTitle.trim() },
      })
    }
    this.isEditing = false
  }
}
