import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AdminLayoutComponent } from './admin-layout.component'

@Component({
  selector: 'app-admin-layout-demo',
  standalone: true,
  imports: [CommonModule, AdminLayoutComponent],
  template: `
    <app-admin-layout>
      <!-- Navbar Content -->
      <div navbar-content class="flex items-center space-x-4">
        <button class="text-gray-500 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button class="text-gray-500 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </button>
        <div class="flex items-center">
          <img class="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="User" />
        </div>
      </div>

      <!-- Sidebar Content -->
      <div sidebar-content>
        <nav class="space-y-2">
          <a
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
          </a>
          <a
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="ml-3">Components</span>
          </a>
          <a
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="ml-3">Users</span>
          </a>
        </nav>
      </div>

      <!-- Main Content -->
      <div main-content>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-64"></div>
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-64"></div>
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-64"></div>
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-64"></div>
        </div>
        <div class="border-2 border-dashed rounded-lg border-gray-300 h-96 mb-4"></div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"></div>
        </div>
      </div>

      <!-- Footer Content -->
      <div footer-left>
        <span class="text-sm text-gray-500 sm:text-center">
          © 2024 <a href="#" class="hover:underline">Company™</a>. All Rights Reserved.
        </span>
      </div>
      <div footer-right>
        <div class="flex space-x-6 sm:justify-center">
          <a href="#" class="text-gray-500 hover:text-gray-900">About</a>
          <a href="#" class="text-gray-500 hover:text-gray-900">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </app-admin-layout>
  `,
})
export class AdminLayoutDemoComponent {}
