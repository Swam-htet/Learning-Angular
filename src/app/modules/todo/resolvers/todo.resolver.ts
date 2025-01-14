import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Todo } from '../models/todo.model'
import { TodoService } from '../services/todo.service'

export const todoResolver: ResolveFn<Todo | undefined> = (route) => {
  const todoService = inject(TodoService)
  const id = Number(route.params['id'])
  return todoService.todos().find((todo) => todo.id === id)
}
