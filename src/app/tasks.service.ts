import { Observable } from "rxjs";
import { Task } from "./types";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';

  // Get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get tasks by name (case-insensitive search)
  getTasksByName(name: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?name_like=${name}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Create a new task
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
}
