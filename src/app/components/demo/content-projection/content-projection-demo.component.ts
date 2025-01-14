import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CardComponent } from './card.component'
import { TabContainerComponent } from './tab-container.component'
import { TabComponent } from './tab.component'

@Component({
  selector: 'app-content-projection-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, TabComponent, TabContainerComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-8">Content Projection Demo</h2>

      <!-- Basic Content Projection -->
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-4">1. Basic Content Projection</h3>
        <app-card>
          <p class="text-gray-600">This is basic content projection. The content is projected into the default slot.</p>
        </app-card>
      </section>

      <!-- Multi-Slot Content Projection -->
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-4">2. Multi-Slot Content Projection</h3>
        <app-card>
          <h4 card-header class="text-lg font-semibold">Card Header</h4>
          <div class="space-y-2">
            <p class="text-gray-600">This card demonstrates multi-slot content projection.</p>
            <p class="text-gray-600">Content can be projected into different slots using selectors.</p>
          </div>
          <div card-footer class="text-sm text-gray-500">Card Footer</div>
        </app-card>
      </section>

      <!-- Conditional Content Projection -->
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-4">3. Conditional Content Projection</h3>
        <div class="space-y-4">
          <app-card [showHeader]="false">
            <p class="text-gray-600">This card has no header (conditional projection).</p>
            <div card-footer class="text-sm text-gray-500">But it has a footer!</div>
          </app-card>

          <app-card [showFooter]="false">
            <h4 card-header class="text-lg font-semibold">Header Only</h4>
            <p class="text-gray-600">This card has no footer (conditional projection).</p>
          </app-card>
        </div>
      </section>

      <!-- Tabs with Content Projection -->
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-4">4. Tabs with Content Projection</h3>
        <app-tab-container>
          <app-tab title="First Tab">
            <app-card>
              <h4 card-header class="text-lg font-semibold">Card Header</h4>
              <div class="space-y-2">
                <p class="text-gray-600">This is the content of the first tab.</p>
              </div>
              <div card-footer class="text-sm text-gray-500">Card Footer</div>
            </app-card>
          </app-tab>
          <app-tab title="Second Tab">
            <app-card>
              <h4 card-header class="text-lg font-semibold">Card Header</h4>
              <div class="space-y-2">
                <p class="text-gray-600">This is the content of the second tab.</p>
              </div>
              <div card-footer class="text-sm text-gray-500">Card Footer</div>
            </app-card>
          </app-tab>
          <app-tab title="Third Tab">
            <app-card>
              <h4 card-header class="text-lg font-semibold">Card Header</h4>
              <div class="space-y-2">
                <p class="text-gray-600">This is the content of the third tab.</p>
              </div>
              <div card-footer class="text-sm text-gray-500">Card Footer</div>
            </app-card>
          </app-tab>
        </app-tab-container>
      </section>

      <!-- Notes -->
      <section class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Notes:</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Basic projection uses the default <code class="bg-gray-200 px-1">ng-content</code> slot</li>
          <li>Multi-slot projection uses selectors like <code class="bg-gray-200 px-1">card-header</code></li>
          <li>Conditional projection can show/hide content based on inputs</li>
          <li>Complex projection patterns can be used for tabs and other components</li>
        </ul>
      </section>
    </div>
  `,
})
export class ContentProjectionDemoComponent {}
