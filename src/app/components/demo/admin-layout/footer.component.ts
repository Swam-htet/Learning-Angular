import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white rounded-lg shadow p-4 md:p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <ng-content select="[footer-left]"></ng-content>
        <ng-content select="[footer-right]"></ng-content>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
