import { CommonModule } from '@angular/common'
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Lifecycle Demo Component</h2>

      <div class="mb-4">
        <input type="text" [(ngModel)]="inputValue" class="border rounded px-2 py-1" placeholder="Type something..." />
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Lifecycle Events Log:</h3>
        <div class="space-y-2">
          @for (event of lifecycleEvents; track $index) {
            <div class="p-2 rounded" [class.bg-blue-100]="$index === lifecycleEvents.length - 1">
              {{ event }}
            </div>
          }
        </div>
      </div>

      <div class="mt-4">
        <button (click)="clearLog()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Clear Log
        </button>
      </div>
    </div>
  `,
})
export class DemoComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @Input() demoInput = ''
  inputValue = ''
  lifecycleEvents: string[] = []

  private logLifecycleEvent(event: string) {
    const timestamp = new Date().toLocaleTimeString()
    this.lifecycleEvents.push(`${timestamp}: ${event}`)
  }

  clearLog() {
    this.lifecycleEvents = []
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logLifecycleEvent(`ngOnChanges - Input properties changed: ${JSON.stringify(changes)}`)
  }

  ngOnInit() {
    this.logLifecycleEvent('ngOnInit - Component initialized')
  }

  ngDoCheck() {
    this.logLifecycleEvent('ngDoCheck - Change detection run')
  }

  ngAfterContentInit() {
    this.logLifecycleEvent('ngAfterContentInit - Content initialized')
  }

  ngAfterContentChecked() {
    this.logLifecycleEvent('ngAfterContentChecked - Content checked')
  }

  ngAfterViewInit() {
    this.logLifecycleEvent('ngAfterViewInit - View initialized')
  }

  ngAfterViewChecked() {
    this.logLifecycleEvent('ngAfterViewChecked - View checked')
  }

  ngOnDestroy() {
    this.logLifecycleEvent('ngOnDestroy - Component destroyed')
  }
}
