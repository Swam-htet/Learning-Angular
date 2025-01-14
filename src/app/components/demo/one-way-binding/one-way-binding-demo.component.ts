import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  inStock: boolean
}

@Component({
  selector: 'app-one-way-binding-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-8">One-Way Data Binding Demo</h2>

      <!-- Interpolation -->
      <section class="mb-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">1. Interpolation</h3>
        <p>Welcome, {{ username }}</p>
        <p>Current Time: {{ getCurrentTime() }}</p>
        <p>Total Price: $ {{ calculateTotal(100, 0.1) }}</p>
        <p>Expression {{ 2 + 2 }} equals 4</p>
      </section>

      <!-- Property Binding Examples -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">2. Property Binding ( [property] )</h3>
        <div class="space-y-4">
          <div>
            <img
              [src]="imageUrl"
              [alt]="imageAlt"
              class="w-32 h-32 object-cover rounded"
              [class.opacity-50]="isImageDimmed"
            />
          </div>
          <div>
            <button [disabled]="isButtonDisabled" class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
              {{ buttonText }}
            </button>
          </div>
          <div>
            <input type="text" [placeholder]="inputPlaceholder" class="px-3 py-2 border rounded" />
          </div>
        </div>
      </section>

      <!-- Attribute Binding Examples -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">3. Attribute Binding ( [attr.attribute] )</h3>
        <div class="space-y-4">
          <div>
            <table class="w-full border-collapse border">
              <tr>
                <td [attr.colspan]="tableColspan" class="border p-2 bg-gray-100 text-center">
                  Spanning {{ tableColspan }} columns
                </td>
              </tr>
              <tr>
                <td class="border p-2">Column 1</td>
                <td class="border p-2">Column 2</td>
              </tr>
            </table>
          </div>
          <div>
            <progress
              [attr.value]="progressValue"
              max="100"
              class="w-full"
              [attr.data-label]="progressLabel"
            ></progress>
            <p class="text-sm text-gray-600 mt-1">Progress: {{ progressValue }}%</p>
          </div>
        </div>
      </section>

      <!-- Event Binding Examples -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">4. Event Binding ( (event) )</h3>
        <div class="space-y-4">
          <div>
            <button (click)="handleClick($event)" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Click me ({{ clickCount }} clicks)
            </button>
          </div>
          <div
            (mouseover)="handleMouseOver()"
            (mouseout)="handleMouseOut()"
            class="p-4 border rounded transition-colors duration-200"
            [class.bg-yellow-100]="isHovered"
          >
            Hover over me! {{ isHovered ? '🌟' : '☆' }}
          </div>
          <div>
            <input
              type="text"
              (input)="handleInput($event)"
              class="px-3 py-2 border rounded w-full"
              placeholder="Type something..."
            />
            <p class="mt-2 text-sm text-gray-600">You typed: {{ inputValue }}</p>
          </div>
        </div>
      </section>

      <!-- Product Card Example (Combining Different Bindings) -->
      <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">5. Combined Bindings Example</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (product of products; track product.id) {
          <div class="border rounded-lg overflow-hidden">
            <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h4 class="font-semibold">{{ product.name }}</h4>
              <p class="text-gray-600">$ {{ product.price }}</p>
              <div class="mt-2">
                <button
                  (click)="addToCart(product)"
                  [disabled]="!product.inStock"
                  class="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
                </button>
              </div>
            </div>
          </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class OneWayBindingDemoComponent {
  // Properties for interpolation
  username = 'John Doe'
  getCurrentTime() {
    return new Date().toLocaleTimeString()
  }
  calculateTotal(price: number, tax: number) {
    return (price * (1 + tax)).toFixed(2)
  }

  // Properties for property binding
  imageUrl = 'https://picsum.photos/200'
  imageAlt = 'Random image'
  isImageDimmed = true
  isButtonDisabled = false
  buttonText = 'Click Me'
  inputPlaceholder = 'Enter text here'

  // Properties for attribute binding
  tableColspan = 2
  progressValue = 75
  progressLabel = 'Loading...'

  // Properties for event binding
  clickCount = 0
  isHovered = false
  inputValue = ''

  // Sample products data
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      imageUrl: 'https://picsum.photos/200/300?random=1',
      inStock: true,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      imageUrl: 'https://picsum.photos/200/300?random=2',
      inStock: false,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 199.99,
      imageUrl: 'https://picsum.photos/200/300?random=3',
      inStock: true,
    },
  ]

  // Event handlers
  handleClick(event: MouseEvent) {
    console.log('Click event:', event)
    this.clickCount++
  }

  handleMouseOver() {
    this.isHovered = true
  }

  handleMouseOut() {
    this.isHovered = false
  }

  handleInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value
  }

  addToCart(product: Product) {
    console.log('Adding to cart:', product)
    alert(`Added ${product.name} to cart!`)
  }
}
