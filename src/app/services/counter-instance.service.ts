import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable() // Note: No providedIn: 'root' here
export class CounterInstanceService {
  private static instanceCount = 0
  public instanceId: number

  private count = new BehaviorSubject<number>(0)
  count$ = this.count.asObservable()

  constructor() {
    CounterInstanceService.instanceCount++
    this.instanceId = CounterInstanceService.instanceCount
    console.log(`Created Counter Service Instance #${this.instanceId}`)
  }

  increment() {
    this.count.next(this.count.value + 1)
    console.log(`Instance #${this.instanceId} count: ${this.count.value}`)
  }

  getInstanceCount(): number {
    return CounterInstanceService.instanceCount
  }
}
