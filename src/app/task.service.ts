// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: number;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTasks(size: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getTasks?size=${size}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/add`, task);
  }


  deleteTasks(ids: number[]): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: { ids } });
  }
}