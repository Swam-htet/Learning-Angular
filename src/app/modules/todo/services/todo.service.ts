import { Injectable, computed, signal } from '@angular/core'
import { Todo } from '../models/todo.model'

export interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  searchTerm: string
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // State management with signals
  private state = signal<TodoState>({
    todos: [],
    filter: 'all',
    searchTerm: '',
  })

  // Exposed signals for components
  todos = computed(() => this.state().todos)
  filter = computed(() => this.state().filter)
  searchTerm = computed(() => this.state().searchTerm)

  // Computed values
  filteredTodos = computed(() => {
    const { todos, filter, searchTerm } = this.state()

    return todos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
      })
      .filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  })

  stats = computed(() => {
    const todos = this.state().todos
    return {
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }
  })

  // State updates
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.state.update((state) => ({ ...state, filter }))
  }

  setSearchTerm(searchTerm: string) {
    this.state.update((state) => ({ ...state, searchTerm }))
  }

  addTodo(title: string, description?: string, priority: Todo['priority'] = 'medium') {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      priority,
    }

    this.state.update((state) => ({
      ...state,
      todos: [...state.todos, newTodo],
    }))
  }

  toggleTodo(id: number) {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined,
            }
          : todo,
      ),
    }))
  }

  updateTodo(id: number, updates: Partial<Todo>) {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    }))
  }

  deleteTodo(id: number) {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  }

  clearCompleted() {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
    }))
  }
}
