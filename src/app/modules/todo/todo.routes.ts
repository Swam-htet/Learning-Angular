import { Routes } from '@angular/router'
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component'
import { TodoLayoutComponent } from './components/todo-layout/todo-layout.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import {
  PendingChangesGuard,
  TodoChildrenGuard,
  TodoEditableGuard,
  TodoExistsGuard,
  TodoFeatureGuard,
} from './guards/todo.guard'
import { todoResolver } from './resolvers/todo.resolver'

export const TODO_ROUTES: Routes = [
  {
    path: 'todos',
    component: TodoLayoutComponent,
    // CanActivateChild guard for the parent route
    canActivateChild: [TodoChildrenGuard],
    // CanMatch guard for lazy loading
    canMatch: [TodoFeatureGuard],
    children: [
      {
        path: '',
        component: TodoListComponent,
        title: 'Todo List',
      },
      {
        path: ':id',
        component: TodoDetailComponent,
        title: 'Todo Detail',
        resolve: {
          todo: todoResolver,
        },
        // Multiple CanActivate guards
        canActivate: [TodoExistsGuard, TodoEditableGuard],
        // CanDeactivate guard
        canDeactivate: [PendingChangesGuard],
        data: { requireAuth: true },
      },
    ],
  },
]
