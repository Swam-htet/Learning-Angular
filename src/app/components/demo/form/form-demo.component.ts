import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  gender: string
  hobbies: {
    reading: boolean
    gaming: boolean
    traveling: boolean
  }
  address: string
  country: string
  termsAccepted: boolean
  profilePicture: File | null
}

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <h2 class="text-3xl font-bold mb-6">Registration Form</h2>

      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 class="text-xl font-semibold mb-4">Basic Information</h3>

          <!-- Name -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Name * </label>
            <input
              type="text"
              formControlName="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('name') && isFieldTouched('name')"
            />
            @if (isFieldInvalid('name') && isFieldTouched('name')) {
              <p class="text-red-500 text-xs italic">Name is required</p>
            }
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Email * </label>
            <input
              type="email"
              formControlName="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('email') && isFieldTouched('email')"
            />
            @if (isFieldInvalid('email') && isFieldTouched('email')) {
              <p class="text-red-500 text-xs italic">Please enter a valid email address</p>
            }
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Password * </label>
            <input
              type="password"
              formControlName="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('password') && isFieldTouched('password')"
            />
            @if (isFieldInvalid('password') && isFieldTouched('password')) {
              <p class="text-red-500 text-xs italic">
                Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase
                letter, one number and one special character
              </p>
            }
          </div>

          <!-- Confirm Password -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Confirm Password * </label>
            <input
              type="password"
              formControlName="confirmPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('confirmPassword') && isFieldTouched('confirmPassword')"
            />
            @if (isFieldInvalid('confirmPassword') && isFieldTouched('confirmPassword')) {
              <p class="text-red-500 text-xs italic">Passwords must match</p>
            }
          </div>

          <!-- Date of Birth -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Date of Birth * </label>
            <input
              type="date"
              formControlName="dateOfBirth"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('dateOfBirth') && isFieldTouched('dateOfBirth')"
            />
            @if (isFieldInvalid('dateOfBirth') && isFieldTouched('dateOfBirth')) {
              <p class="text-red-500 text-xs italic">Date of birth is required</p>
            }
          </div>

          <!-- Gender -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Gender * </label>
            <div class="mt-2 space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" formControlName="gender" value="male" class="form-radio" />
                <span class="ml-2">Male</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" formControlName="gender" value="female" class="form-radio" />
                <span class="ml-2">Female</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" formControlName="gender" value="other" class="form-radio" />
                <span class="ml-2">Other</span>
              </label>
            </div>
            @if (isFieldInvalid('gender') && isFieldTouched('gender')) {
              <p class="text-red-500 text-xs italic">Please select a gender</p>
            }
          </div>
        </div>

        <!-- Additional Information -->
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 class="text-xl font-semibold mb-4">Additional Information</h3>

          <!-- Hobbies -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Hobbies </label>
            <div formGroupName="hobbies" class="space-y-2">
              <label class="inline-flex items-center">
                <input type="checkbox" formControlName="reading" class="form-checkbox" />
                <span class="ml-2">Reading</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" formControlName="gaming" class="form-checkbox" />
                <span class="ml-2">Gaming</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" formControlName="traveling" class="form-checkbox" />
                <span class="ml-2">Traveling</span>
              </label>
            </div>
          </div>

          <!-- Address -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Address </label>
            <textarea
              formControlName="address"
              rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <!-- Country -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Country * </label>
            <select
              formControlName="country"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [class.border-red-500]="isFieldInvalid('country') && isFieldTouched('country')"
            >
              <option value="">Select Country</option>
              @for (country of countries; track country) {
                <option [value]="country">{{ country }}</option>
              }
            </select>
            @if (isFieldInvalid('country') && isFieldTouched('country')) {
              <p class="text-red-500 text-xs italic">Please select a country</p>
            }
          </div>

          <!-- Profile Picture -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"> Profile Picture </label>
            <input
              type="file"
              (change)="onFileChange($event)"
              accept="image/*"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="mb-4">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              formControlName="termsAccepted"
              class="form-checkbox"
              [class.border-red-500]="isFieldInvalid('termsAccepted') && isFieldTouched('termsAccepted')"
            />
            <span class="ml-2">I accept the terms and conditions *</span>
          </label>
          @if (isFieldInvalid('termsAccepted') && isFieldTouched('termsAccepted')) {
            <p class="text-red-500 text-xs italic">You must accept the terms and conditions</p>
          }
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button
            type="submit"
            [disabled]="!registrationForm.valid"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Register
          </button>
        </div>
      </form>

      <!-- Form Debug Information -->
      @if (showDebug) {
        <div class="mt-8 p-4 bg-gray-100 rounded">
          <h3 class="text-lg font-semibold mb-2">Form Debug Info:</h3>
          <pre class="text-sm">{{ registrationForm.value | json }}</pre>
          <pre class="text-sm mt-2">Valid: {{ registrationForm.valid }}</pre>
        </div>
      }
    </div>
  `,
})
export class FormDemoComponent implements OnInit {
  registrationForm: FormGroup
  showDebug = true
  countries = ['USA', 'Canada', 'UK', 'Australia', 'India']

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        hobbies: this.fb.group({
          reading: [false],
          gaming: [false],
          traveling: [false],
        }),
        address: [''],
        country: ['', [Validators.required]],
        termsAccepted: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    )
  }

  ngOnInit() {
    // You can initialize the form with default values here if needed
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password?.pristine || confirmPassword?.pristine) {
      return null
    }

    return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName)
    return field ? field.invalid : false
  }

  isFieldTouched(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName)
    return field ? field.touched : false
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    // Handle file upload logic here
    console.log('Selected file:', file)
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value)
      // Handle form submission logic here
    } else {
      this.markFormGroupTouched(this.registrationForm)
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched()

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      }
    })
  }
}
