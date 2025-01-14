import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside
      class="w-64 p-4"
      [class.bg-gray-100]="theme === 'light'"
      [class.bg-gray-900]="theme === 'dark'"
      [class.text-gray-900]="theme === 'light'"
      [class.text-white]="theme === 'dark'"
    >
      <div class="space-y-4">
        <button
          (click)="themeToggle.emit()"
          class="w-full px-4 py-2 rounded"
          [class.bg-blue-500]="theme === 'light'"
          [class.bg-blue-700]="theme === 'dark'"
          [class.text-white]="true"
        >
          Toggle Theme
        </button>
        <button
          (click)="notificationToggle.emit()"
          class="w-full px-4 py-2 rounded"
          [class.bg-green-500]="theme === 'light'"
          [class.bg-green-700]="theme === 'dark'"
          [class.text-white]="true"
        >
          Toggle Notifications
        </button>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  @Input({ required: true }) theme!: string
  @Output() themeToggle = new EventEmitter<void>()
  @Output() notificationToggle = new EventEmitter<void>()
}
