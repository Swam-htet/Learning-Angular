import { CommonModule } from '@angular/common'
import { Component, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <button
              (click)="toggleSidebar.emit()"
              class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Admin Dashboard</span>
          </div>
          <div class="flex items-center">
            <ng-content select="[navbar-content]"></ng-content>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  toggleSidebar = new EventEmitter<void>()
}
