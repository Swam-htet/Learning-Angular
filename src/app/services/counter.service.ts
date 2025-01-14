import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root', // This makes it a singleton service available throughout the app
})
export class CounterService {
  // Private BehaviorSubject to hold the current count
  private countSubject = new BehaviorSubject<number>(0)

  // Public Observable that components can subscribe to
  count$ = this.countSubject.asObservable()

  increment() {
    this.countSubject.next(this.countSubject.value + 1)
  }

  decrement() {
    this.countSubject.next(this.countSubject.value - 1)
  }

  reset() {
    this.countSubject.next(0)
  }

  // Get current value without subscribing
  getCurrentCount(): number {
    return this.countSubject.value
  }
}
