import { Component, inject, OnInit } from "@angular/core";
import { TaskService } from "./tasks.service";
import { Task } from "./types";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  template: `
    <h1>Tasks</h1>
    <div class="table-container">
      <table class="table">
        <caption>
        <div class="caption-content">
          <div class="caption-search">
            <input
              type="search"
              class="form-control search-input"
              placeholder="Search tasks..."
              [(ngModel)]="query"
              (ngModelChange)="search()"
            />
          </div>
          <a routerLink="/tasks/new" class="btn-primary">Add Task</a>
        </div>
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th class="action-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (task of tasks; track task.id) {
            <tr>
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td>
                <td>{{ task.description }}</td>
                <td class="action-cell">
                <button class="action-button" (click)="deleteTask(task.id)">
                    Delete
                </button>
                <a routerLink="/tasks/{{task.id}}/edit" class="action-button">Edit</a>
                </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  imports: [RouterLink, FormsModule],
})
export class TasksComponent implements OnInit {
  private readonly tasksService = inject(TaskService);
  tasks: Task[] = [];
  query = '';

  ngOnInit(): void {
    this.getTasks();
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  search() {
    this.tasksService.getTasksByName(this.query).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  private getTasks() {
    this.tasksService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}