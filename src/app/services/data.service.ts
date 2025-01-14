import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ILogger, LOGGER_TOKEN } from './logger.service'

export interface DataItem {
  id: number
  name: string
  value: string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private items = new BehaviorSubject<DataItem[]>([])
  items$ = this.items.asObservable()

  constructor(@Inject(LOGGER_TOKEN) private logger: ILogger) {
    this.logger.log('DataService initialized')
  }

  addItem(name: string, value: string) {
    const currentItems = this.items.value
    const newItem: DataItem = {
      id: currentItems.length + 1,
      name,
      value,
    }

    this.items.next([...currentItems, newItem])
    this.logger.log(`Added new item: ${name}`)
  }

  removeItem(id: number) {
    const currentItems = this.items.value
    const filteredItems = currentItems.filter((item) => item.id !== id)

    if (currentItems.length !== filteredItems.length) {
      this.items.next(filteredItems)
      this.logger.log(`Removed item with id: ${id}`)
    } else {
      this.logger.warn(`Item with id ${id} not found`)
    }
  }

  updateItem(id: number, updates: Partial<DataItem>) {
    const currentItems = this.items.value
    const itemIndex = currentItems.findIndex((item) => item.id === id)

    if (itemIndex !== -1) {
      const updatedItems = [...currentItems]
      updatedItems[itemIndex] = { ...currentItems[itemIndex], ...updates }
      this.items.next(updatedItems)
      this.logger.log(`Updated item with id: ${id}`)
    } else {
      this.logger.error(`Failed to update: Item with id ${id} not found`)
    }
  }
}
