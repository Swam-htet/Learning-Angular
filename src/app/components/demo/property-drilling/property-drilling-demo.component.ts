import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'
import { UserStateService } from '../../../services/user-state.service'
import { HeaderComponent } from './header.component'
import { SidebarComponent } from './sidebar.component'

@Component({
  selector: 'app-property-drilling-demo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-8">Property Drilling Demo</h2>

      <div class="grid grid-cols-2 gap-8">
        <!-- Property Drilling Example -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Using Property Drilling</h3>
          <div
            class="border rounded-lg overflow-hidden"
            [class.bg-gray-50]="localState().theme === 'light'"
            [class.bg-gray-900]="localState().theme === 'dark'"
          >
            <app-header [userState]="localState()" />
            <div class="flex">
              <app-sidebar
                [theme]="localState().theme"
                (themeToggle)="toggleLocalTheme()"
                (notificationToggle)="toggleLocalNotifications()"
              />
              <div class="flex-1 p-4">
                <pre
                  class="text-sm"
                  [class.text-black]="localState().theme === 'light'"
                  [class.text-white]="localState().theme === 'dark'"
                >
                  {{ localState() | json }}
                </pre
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Service-based Example -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Using Service (Signals)</h3>
          <div
            class="border rounded-lg overflow-hidden"
            [class.bg-gray-50]="userState.currentState().theme === 'light'"
            [class.bg-gray-900]="userState.currentState().theme === 'dark'"
          >
            <app-header [userState]="userState.currentState()" />
            <div class="flex">
              <app-sidebar
                [theme]="userState.currentState().theme"
                (themeToggle)="userState.toggleTheme()"
                (notificationToggle)="userState.toggleNotifications()"
              />
              <div class="flex-1 p-4">
                <pre
                  class="text-sm"
                  [class.text-black]="userState.currentState().theme === 'light'"
                  [class.text-white]="userState.currentState().theme === 'dark'"
                >
                  {{ userState.currentState() | json }}
                </pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Notes:</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>Left side demonstrates property drilling - passing state through multiple components</li>
          <li>Right side shows the same UI using a service with signals - no prop drilling needed</li>
          <li>Try toggling theme and notifications to see state updates</li>
          <li>Notice how service-based approach reduces component coupling and prop passing</li>
        </ul>
      </div>
    </div>
  `,
})
export class PropertyDrillingDemoComponent {
  // Local state example (property drilling)
  private localStateSignal = signal({
    name: 'Jane Doe',
    email: 'jane@example.com',
    theme: 'light',
    notifications: true,
  })

  // Expose as readonly
  localState = this.localStateSignal.asReadonly()

  // Local state methods
  toggleLocalTheme() {
    this.localStateSignal.update((state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
  }

  toggleLocalNotifications() {
    this.localStateSignal.update((state) => ({
      ...state,
      notifications: !state.notifications,
    }))
  }

  // Service-based example
  constructor(public userState: UserStateService) {}
}
