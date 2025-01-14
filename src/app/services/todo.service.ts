import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Todo } from '../interfaces/todo.interface'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private http: HttpClient) {}

  // add filter params
  getTodos(filterParams: { page: number; limit: number }): Observable<Todo[]> {
    // add auth token
    const headers = new HttpHeaders().set('Authorization', `Bearer token`)
    return this.http.get<Todo[]>(this.apiUrl, { headers, params: filterParams })
  }
}
