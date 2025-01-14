import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FooterComponent } from './footer.component'
import { NavbarComponent } from './navbar.component'
import { SidebarComponent } from './sidebar.component'

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navbar -->
      <app-navbar (toggleSidebar)="toggleSidebar()">
        <div navbar-content>
          <ng-content select="[navbar-content]"></ng-content>
        </div>
      </app-navbar>

      <!-- Sidebar -->
      <app-sidebar [isOpen]="isSidebarOpen">
        <ng-content select="[sidebar-content]"></ng-content>
      </app-sidebar>

      <!-- Main Content -->
      <main class="lg:ml-64 pt-16 min-h-screen" [class.ml-0]="!isSidebarOpen" [class.ml-64]="isSidebarOpen">
        <div class="px-4 py-6">
          <ng-content select="[main-content]"></ng-content>
        </div>

        <!-- Footer -->
        <app-footer>
          <div footer-left>
            <ng-content select="[footer-left]"></ng-content>
          </div>
          <div footer-right>
            <ng-content select="[footer-right]"></ng-content>
          </div>
        </app-footer>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  isSidebarOpen = true

  toggleSidebar() {
    console.log('toggleSidebar', this.isSidebarOpen)
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
