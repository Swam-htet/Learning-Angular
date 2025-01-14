import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                [class.border-red-500]="showError('email')"
                placeholder="Email address"
              />
              @if (showError('email')) {
              <p class="mt-1 text-sm text-red-500">
                {{ getErrorMessage('email') }}
              </p>
              }
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                [class.border-red-500]="showError('password')"
                placeholder="Password"
              />
              @if (showError('password')) {
              <p class="mt-1 text-sm text-red-500">
                {{ getErrorMessage('password') }}
              </p>
              }
            </div>
          </div>

          @if (loginError) {
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Invalid credentials</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>Please check your email and password and try again.</p>
                </div>
              </div>
            </div>
          </div>
          }

          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              @if (isLoading) {
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Loading spinner -->
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              } Sign in
            </button>
          </div>

          <div class="text-sm text-gray-600">
            <p>Password must contain:</p>
            <ul class="list-disc list-inside mt-1">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (&amp;#64;$&amp;#33;%&amp;#42;?&amp;#38;)</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup
  isLoading = false
  loginError = false

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    })
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this.loginError = false

      try {
        const success = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)

        if (success) {
          this.router.navigate(['/'])
        } else {
          this.loginError = true
        }
      } finally {
        this.isLoading = false
      }
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  showError(field: string): boolean {
    const control = this.loginForm.get(field)
    return control ? control.invalid && (control.dirty || control.touched) : false
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field)
    if (!control) return ''

    if (control.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address'
    }

    if (control.hasError('minlength')) {
      return 'Password must be at least 8 characters'
    }

    if (control.hasError('pattern')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }

    return ''
  }
}
