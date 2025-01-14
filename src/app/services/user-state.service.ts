import { Injectable, signal } from '@angular/core'
import { UserState } from '../interfaces/user-state.interface'

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private initialState: UserState = {
    name: 'John Doe',
    email: 'john@example.com',
    theme: 'light',
    notifications: true,
  }

  private state = signal<UserState>(this.initialState)

  // Expose state as readonly
  readonly currentState = this.state.asReadonly()

  // Update methods
  updateName(name: string) {
    this.state.update((state) => ({ ...state, name }))
  }

  updateEmail(email: string) {
    this.state.update((state) => ({ ...state, email }))
  }

  toggleTheme() {
    this.state.update((state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
  }

  toggleNotifications() {
    this.state.update((state) => ({
      ...state,
      notifications: !state.notifications,
    }))
  }
}
