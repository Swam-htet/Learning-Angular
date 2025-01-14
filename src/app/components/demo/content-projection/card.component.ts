import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Header Projection -->
      <div class="bg-gray-50 px-4 py-3 border-b" *ngIf="showHeader">
        <ng-content select="[card-header]"></ng-content>
      </div>

      <!-- Default/Body Projection -->
      <div class="p-4">
        <ng-content></ng-content>
      </div>

      <!-- Footer Projection -->
      <div class="bg-gray-50 px-4 py-3 border-t" *ngIf="showFooter">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() showHeader = true
  @Input() showFooter = true
}
