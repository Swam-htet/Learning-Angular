import { Component, Input } from '@angular/core'
import { UserState } from '../../../interfaces/user-state.interface'

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header
      class="p-4 shadow-md"
      [class.bg-white]="userState.theme === 'light'"
      [class.bg-gray-800]="userState.theme === 'dark'"
      [class.text-gray-900]="userState.theme === 'light'"
      [class.text-white]="userState.theme === 'dark'"
    >
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold">Welcome, {{ userState.name }}</h1>
        <p class="text-sm">{{ userState.email }}</p>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input({ required: true }) userState!: UserState
}
