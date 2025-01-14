import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TabComponent } from './tab.component'

@Component({
  selector: 'app-view-query-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TabComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">View Query Demo</h2>

      <!-- ViewChild with template reference -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-4">ViewChild Demo</h3>
        <input #nameInput type="text" class="border rounded px-3 py-2 mb-4 w-full" placeholder="Type something..." />
        <button (click)="focusInput()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Focus Input
        </button>
        <p class="mt-2 text-gray-600">Input Value: {{ nameInput.value }}</p>
      </div>

      <!-- ViewChildren with multiple elements -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-4">ViewChildren Demo</h3>
        <div class="space-y-4">
          @for (tab of tabs; track tab.id) {
          <app-tab [title]="tab.title" [active]="tab.active" (click)="selectTab(tab.id)">
            <span class="font-medium">{{ tab.title }}</span>
          </app-tab>
          }
        </div>
        <div class="mt-4">
          <p class="text-gray-600">Active Tabs: {{ getActiveTabs() }}</p>
        </div>
      </div>

      <!-- Dynamic Component Creation -->
      <div class="mb-8 bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-4">Dynamic Tab Creation</h3>
        <div class="flex gap-4 mb-4">
          <input
            [(ngModel)]="newTabTitle"
            type="text"
            class="border rounded px-3 py-2 flex-grow"
            placeholder="New tab title..."
          />
          <button (click)="addTab()" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Tab
          </button>
        </div>
      </div>

      <!-- Component Information -->
      <div class="bg-gray-100 p-4 rounded">
        <h3 class="text-lg font-semibold mb-2">Component Information</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Total Tabs: {{ tabs.length }}</li>
          <li>Active Tabs Count: {{ getActiveTabsCount() }}</li>
          <li>Last Clicked Tab: {{ lastClickedTab || 'None' }}</li>
        </ul>
      </div>
    </div>
  `,
})
export class ViewQueryDemoComponent implements AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>
  @ViewChildren(TabComponent) tabComponents!: QueryList<TabComponent>

  tabs = [
    { id: 1, title: 'Tab 1', active: true },
    { id: 2, title: 'Tab 2', active: false },
    { id: 3, title: 'Tab 3', active: false },
  ]

  newTabTitle = ''
  lastClickedTab = ''

  ngAfterViewInit() {
    // Subscribe to changes in tab components
    this.tabComponents.changes.subscribe(() => {
      console.log('Tabs changed:', this.tabComponents.length)
    })
  }

  focusInput() {
    this.nameInput.nativeElement.focus()
  }

  selectTab(id: number) {
    const tab = this.tabs.find((t) => t.id === id)
    if (tab) {
      tab.active = !tab.active
      this.lastClickedTab = tab.title
    }
  }

  addTab() {
    if (this.newTabTitle.trim()) {
      const newId = Math.max(...this.tabs.map((t) => t.id)) + 1
      this.tabs.push({
        id: newId,
        title: this.newTabTitle,
        active: false,
      })
      this.newTabTitle = ''
    }
  }

  getActiveTabs(): string {
    return this.tabs
      .filter((tab) => tab.active)
      .map((tab) => tab.title)
      .join(', ')
  }

  getActiveTabsCount(): number {
    return this.tabs.filter((tab) => tab.active).length
  }
}
