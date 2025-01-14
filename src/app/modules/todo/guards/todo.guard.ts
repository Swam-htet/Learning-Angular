import { Injectable, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router'
import { Observable } from 'rxjs'
import { TodoDetailComponent } from '../components/todo-detail/todo-detail.component'
import { TodoService } from '../services/todo.service'

// CanActivate Guard: Checks if a route can be activated
@Injectable({
  providedIn: 'root',
})
export class TodoExistsGuard implements CanActivate {
  private todoService = inject(TodoService)
  private router = inject(Router)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const id = Number(route.params['id'])
    const todo = this.todoService.todos().find((t) => t.id === id)

    if (!todo) {
      this.router.navigate(['/todos'])
      return false
    }

    return true
  }
}

// CanActivateChild Guard: Checks if child routes can be activated
@Injectable({
  providedIn: 'root',
})
export class TodoChildrenGuard implements CanActivateChild {
  private todoService = inject(TodoService)
  private router = inject(Router)

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Example: Only allow access to child routes if there are todos
    const hasTodos = this.todoService.todos().length > 0

    if (!hasTodos) {
      this.router.navigate(['/todos'])
      return false
    }

    return true
  }
}

// CanDeactivate Guard: Checks if a user can leave the route
@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard implements CanDeactivate<TodoDetailComponent> {
  canDeactivate(
    component: TodoDetailComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (component.isDirty) {
      return window.confirm('You have unsaved changes. Do you really want to leave?')
    }
    return true
  }
}

// CanMatch Guard: Controls if a lazy-loaded module can be loaded
@Injectable({
  providedIn: 'root',
})
export class TodoFeatureGuard implements CanMatch {
  private todoService = inject(TodoService)

  canMatch(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    // Example: Only load the todo feature if there are active todos
    const hasActiveTodos = this.todoService.todos().some((todo) => !todo.completed)
    return hasActiveTodos
  }
}

// Combination Guard: Implements multiple guard interfaces
@Injectable({
  providedIn: 'root',
})
export class TodoEditableGuard implements CanActivate, CanActivateChild {
  private todoService = inject(TodoService)
  private router = inject(Router)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const id = Number(route.params['id'])
    const todo = this.todoService.todos().find((t) => t.id === id)

    if (todo?.completed) {
      this.router.navigate(['/todos'])
      return false
    }

    return true
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Example: Only allow access to child routes if there are incomplete todos
    const hasIncompleteTodos = this.todoService.todos().some((todo) => !todo.completed)
    return hasIncompleteTodos
  }
}
