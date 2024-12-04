import { Component, inject, signal } from "@angular/core";
import { TaskService } from "./tasks.service";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { rxResource } from "@angular/core/rxjs-interop";

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
          @for (task of tasksResource.value(); track task.id) {
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
export class TasksComponent {
  private readonly tasksService = inject(TaskService);
  query = signal('');
  tasksResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: (params) => {
      if (params.request.query) {
        return this.tasksService.getTasksByName(params.request.query);
      } else {
        return this.tasksService.getAllTasks();
      }
    }
  });

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasksResource.reload();
    });
  }
}