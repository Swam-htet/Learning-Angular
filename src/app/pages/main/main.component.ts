import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../modules/auth/services/auth.service'

interface DemoCategory {
  name: string
  description: string
  items: DemoItem[]
  icon: string
}

interface DemoItem {
  path: string
  title: string
  description: string
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <!-- Left side -->
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-indigo-600">Angular Demos</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  routerLink="/"
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  routerLinkActive="border-indigo-500 text-gray-900"
                >
                  Home
                </a>
              </div>
            </div>

            <!-- Right side -->
            <div class="flex items-center">
              @if (authService.isAuthenticated()) {
              <button
                (click)="authService.logout()"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
              } @else {
              <a
                routerLink="/login"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </a>
              }
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Angular Demo Components
            </h1>
            <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Explore various Angular concepts and examples through interactive demos
            </p>
            <div class="mt-8 flex justify-center space-x-4">
              <a
                routerLink="/demo"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View All Demos
              </a>
              <a
                routerLink="/todos"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Try Todo App
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          @for (category of demoCategories; track category.name) {
          <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="p-6">
              <!-- Category Header -->
              <div class="flex items-center">
                <div
                  class="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-indigo-500 text-white"
                  [innerHTML]="category.icon"
                ></div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">{{ category.name }}</h3>
                  <p class="text-sm text-gray-500">{{ category.description }}</p>
                </div>
              </div>

              <!-- Category Items -->
              <div class="mt-8">
                <div class="space-y-4">
                  @for (item of category.items; track item.path) {
                  <a
                    [routerLink]="['/demo', item.path]"
                    class="block p-4 rounded-md hover:bg-gray-50 transition-all duration-150 hover:translate-x-1"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="text-base font-medium text-indigo-600">{{ item.title }}</h4>
                        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                      </div>
                      <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                  }
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-white mt-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <p class="text-base text-gray-500">
              Built with Angular and Tailwind CSS. View source on
              <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">GitHub</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class MainComponent {
  authService = inject(AuthService)
  demoCategories: DemoCategory[] = [
    {
      name: 'Core Concepts',
      description: 'Fundamental Angular concepts and features',
      icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
      items: [
        {
          path: 'template-demo',
          title: 'Template Basics',
          description: 'Learn about Angular templates and syntax',
        },
        {
          path: 'one-way-binding-demo',
          title: 'One-Way Binding',
          description: 'Understand data flow from component to view',
        },
        {
          path: 'two-way-binding-demo',
          title: 'Two-Way Binding',
          description: 'Explore bidirectional data binding',
        },
      ],
    },
    {
      name: 'Component Features',
      description: 'Advanced component patterns and communication',
      icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>',
      items: [
        {
          path: 'life-cycle-demo',
          title: 'Lifecycle Hooks',
          description: 'Component lifecycle and hooks usage',
        },
        {
          path: 'content-projection-demo',
          title: 'Content Projection',
          description: 'Learn about ng-content and slots',
        },
        {
          path: 'input-output-demo',
          title: 'Component Communication',
          description: 'Parent-child component interaction',
        },
      ],
    },
    {
      name: 'State Management',
      description: 'Different ways to manage application state',
      icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
      items: [
        {
          path: 'service-demo',
          title: 'Services',
          description: 'State management with services',
        },
        {
          path: 'signal-demo',
          title: 'Signals',
          description: 'Modern reactive state management',
        },
        {
          path: 'rxjs-demo',
          title: 'RxJS Integration',
          description: 'Reactive programming with RxJS',
        },
      ],
    },
    {
      name: 'Forms & Validation',
      description: 'Form handling and validation techniques',
      icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
      items: [
        {
          path: 'form-demo',
          title: 'Form Handling',
          description: 'Template-driven and reactive forms',
        },
        {
          path: 'host-demo',
          title: 'Host Bindings',
          description: 'DOM manipulation and events',
        },
      ],
    },
    {
      name: 'Real World Examples',
      description: 'Complete application examples',
      icon: '<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>',
      items: [
        {
          path: 'admin-layout-demo',
          title: 'Admin Dashboard',
          description: 'Complete admin panel layout',
        },
        {
          path: 'ox-game-demo',
          title: 'Tic-Tac-Toe Game',
          description: 'Interactive game implementation',
        },
        {
          path: 'snake-ladder-demo',
          title: 'Snake & Ladder',
          description: 'Complex game with state management',
        },
      ],
    },
  ]
}
