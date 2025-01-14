import { CommonModule } from '@angular/common'
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core'
import { TabComponent } from './tab.component'

@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-container">
      <!-- Tab Headers -->
      <div class="flex border-b">
        <button
          *ngFor="let tab of tabs; let i = index"
          (click)="selectTab(i)"
          class="px-4 py-2 -mb-px"
          [class.border-b-2]="selectedIndex === i"
          [class.border-blue-500]="selectedIndex === i"
          [class.text-blue-600]="selectedIndex === i"
        >
          {{ tab.title }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TabContainerComponent implements AfterContentInit {
  // content children for what?
  // - to get the tabs as a list of components
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>
  selectedIndex = 0

  constructor() {
    console.log(this.tabs)
  }

  // Set initial active tab
  ngAfterContentInit() {
    // Set initial active tab
    console.log('ngAfterContentInit', this.tabs)
    this.selectTab(0)
  }

  // ngAfterContentChecked
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked', this.tabs)
  }

  selectTab(index: number) {
    this.selectedIndex = index
    this.tabs.forEach((tab, i) => (tab.active = i === index))
  }
}
