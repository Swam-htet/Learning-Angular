import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-event-handling-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-8">Event Handling Demo</h2>

      <!-- Mouse Events -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">1. Mouse Events</h3>
        <div class="space-y-4">
          <!-- Click Events -->
          <div>
            <button
              (click)="handleClick($event)"
              (dblclick)="handleDoubleClick($event)"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Click or Double Click Me (Clicks: {{ clickCount }})
            </button>
          </div>

          <!-- Mouse Movement -->
          <div
            (mouseover)="handleMouseOver($event)"
            (mouseout)="handleMouseOut($event)"
            (mousemove)="handleMouseMove($event)"
            class="p-4 border rounded transition-colors duration-200"
            [class.bg-yellow-100]="isHovered"
          >
            <p>Mouse Position: X: {{ mouseX }}, Y: {{ mouseY }}</p>
            <p>{{ hoverMessage }}</p>
          </div>
        </div>
      </section>

      <!-- Keyboard Events -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">2. Keyboard Events</h3>
        <div class="space-y-4">
          <input
            type="text"
            (keydown)="handleKeyDown($event)"
            (keyup)="handleKeyUp($event)"
            class="px-3 py-2 border rounded w-full"
            placeholder="Type something..."
          />
          <div class="text-sm text-gray-600">
            <p>Last Key Pressed: {{ lastKeyPressed }}</p>
            <p>Key Combinations: {{ keyCombo }}</p>
          </div>
        </div>
      </section>

      <!-- Form Events by one way binding -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">3. Form Events</h3>
        <form (submit)="handleSubmit($event)" class="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              [value]="formData.name"
              [(ngModel)]="formData.name"
              (focus)="handleFocus('name')"
              (blur)="handleBlur('name')"
              (input)="handleInput($event)"
              class="px-3 py-2 border rounded w-full"
              placeholder="Enter name"
            />
          </div>
          <div>
            <textarea
              name="message"
              [value]="formData.message"
              (input)="handleInput($event)"
              (focus)="handleFocus('message')"
              (blur)="handleBlur('message')"
              class="px-3 py-2 border rounded w-full"
              placeholder="Enter message"
            ></textarea>
          </div>
          <div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit Form
            </button>
          </div>
        </form>
        <div class="mt-4 text-sm text-gray-600">
          <p>Focused Field: {{ focusedField }}</p>
          <p>Form Data: {{ formData | json }}</p>
        </div>
      </section>

      <!-- Form Events by two way binding -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">4. Form Events by two way binding</h3>
        <form (submit)="handleSubmit($event)" class="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              [(ngModel)]="formData.name"
              class="px-3 py-2 border rounded w-full"
              placeholder="Enter name"
            />
          </div>
          <div>
            <textarea
              name="message"
              [(ngModel)]="formData.message"
              class="px-3 py-2 border rounded w-full"
              placeholder="Enter message"
            ></textarea>
          </div>
          <div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit Form
            </button>
          </div>
        </form>
      </section>

      <!-- Custom Events -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">4. Custom Events</h3>
        <div
          class="p-4 border rounded cursor-pointer"
          [class.bg-blue-100]="isDragging"
          (mousedown)="startDrag($event)"
          (mousemove)="drag($event)"
          (mouseup)="endDrag($event)"
          (mouseleave)="endDrag($event)"
        >
          <p>{{ isDragging ? 'Dragging...' : 'Drag me!' }}</p>
          <p class="text-sm text-gray-600">Drag Position: X: {{ dragPosition.x }}, Y: {{ dragPosition.y }}</p>
        </div>
      </section>

      <!-- Event Log -->
      <section class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Event Log</h3>
        <div class="h-48 overflow-y-auto border rounded p-4">
          <div *ngFor="let log of eventLogs; let i = index" class="py-1" [class.bg-gray-50]="i % 2 === 0">
            {{ log }}
          </div>
        </div>
        <button (click)="clearLogs()" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Clear Logs
        </button>
      </section>
    </div>
  `,
})
export class EventHandlingDemoComponent {
  // Mouse event states
  clickCount = 0
  isHovered = false
  mouseX = 0
  mouseY = 0
  hoverMessage = 'Hover over me!'

  // Keyboard event states
  lastKeyPressed = ''
  keyCombo = ''

  // Form states
  formData = {
    name: '',
    message: '',
  }
  focusedField = ''

  // Custom event states
  isDragging = false
  dragPosition = { x: 0, y: 0 }
  dragStart = { x: 0, y: 0 }

  // Event logging
  eventLogs: string[] = []

  private logEvent(event: string) {
    const timestamp = new Date().toLocaleTimeString()
    this.eventLogs.unshift(`${timestamp}: ${event}`)
  }

  // Mouse event handlers
  handleClick(event: MouseEvent) {
    this.clickCount++
    this.logEvent(`Click at (${event.clientX}, ${event.clientY})`)
  }

  handleDoubleClick(event: MouseEvent) {
    this.logEvent('Double click detected!')
  }

  handleMouseOver(event: MouseEvent) {
    this.isHovered = true
    this.hoverMessage = 'Mouse is over!'
    this.logEvent('Mouse entered element')
  }

  handleMouseOut(event: MouseEvent) {
    this.isHovered = false
    this.hoverMessage = 'Hover over me!'
    this.logEvent('Mouse left element')
  }

  handleMouseMove(event: MouseEvent) {
    this.mouseX = event.offsetX
    this.mouseY = event.offsetY
  }

  // Keyboard event handlers
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault()
    this.lastKeyPressed = event.key
    const combo = []
    if (event.ctrlKey) combo.push('Ctrl')
    if (event.altKey) combo.push('Alt')
    if (event.shiftKey) combo.push('Shift')
    if (event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Shift') {
      combo.push(event.key)
    }
    this.keyCombo = combo.join(' + ')
    this.logEvent(`Key down: ${this.keyCombo}`)
  }

  handleKeyUp(event: KeyboardEvent) {
    this.logEvent(`Key up: ${event.key}`)
  }

  // Form event handlers
  handleSubmit(event: Event) {
    event.preventDefault()
    this.logEvent('Form submitted')
    console.log('Form data:', this.formData)
  }

  handleFocus(field: string) {
    this.focusedField = field
    this.logEvent(`Focus on ${field}`)
  }

  handleBlur(field: string) {
    this.focusedField = ''
    this.logEvent(`Blur from ${field}`)
  }

  handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement | HTMLInputElement
    this.formData[target.name as keyof typeof this.formData] = target.value
    this.logEvent(`Input changed: ${target.value.length} characters`)
  }

  // Custom drag event handlers
  startDrag(event: MouseEvent) {
    this.isDragging = true
    this.dragStart = {
      x: event.clientX - this.dragPosition.x,
      y: event.clientY - this.dragPosition.y,
    }
    this.logEvent('Started dragging from ' + this.dragStart.x + ' ' + this.dragStart.y)
  }

  drag(event: MouseEvent) {
    if (this.isDragging) {
      this.dragPosition = {
        x: event.clientX - this.dragStart.x,
        y: event.clientY - this.dragStart.y,
      }
    }
  }

  endDrag(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false
      this.logEvent('Ended dragging at ' + event.clientX + ' ' + event.clientY)
    }
  }

  // Utility methods
  clearLogs() {
    this.eventLogs = []
  }
}
