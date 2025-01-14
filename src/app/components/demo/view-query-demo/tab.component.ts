import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-4 rounded cursor-pointer transition-colors"
      [class.bg-blue-500]="active"
      [class.text-white]="active"
      [class.bg-gray-100]="!active"
      [class.hover:bg-gray-200]="!active"
    >
      <div class="flex items-center justify-between">
        <ng-content></ng-content>
        <span class="text-sm">{{ active ? 'Active' : 'Inactive' }}</span>
      </div>
    </div>
  `,
})
export class TabComponent {
  @Input() title: string = ''
  @Input() active: boolean = false
}
