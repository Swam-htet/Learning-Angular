import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken())

  constructor(private router: Router) {
    // Check token on service initialization
    this.isAuthenticatedSubject.next(this.hasValidToken())
  }

  login(email: string, password: string): Promise<boolean> {
    // Demo login - in real app, this would be an API call
    return new Promise((resolve) => {
      if (this.isValidEmail(email) && this.isStrongPassword(password)) {
        // Demo token - in real app, this would come from the server
        const demoToken = btoa(JSON.stringify({ email, exp: Date.now() + 24 * 60 * 60 * 1000 }))
        this.setToken(demoToken)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  logout(): void {
    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  private setToken(token: string): void {
    // Set token in cookie with 24 hour expiry
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${this.TOKEN_KEY}=${token}; expires=${expires}; path=/;`
    this.isAuthenticatedSubject.next(true)
  }

  private getToken(): string | null {
    const cookies = document.cookie.split(';')
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(`${this.TOKEN_KEY}=`))
    return tokenCookie ? tokenCookie.split('=')[1] : null
  }

  private hasValidToken(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token))
      return payload.exp > Date.now()
    } catch {
      return false
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  private isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  }
}
