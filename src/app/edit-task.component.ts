import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelService } from './labels.service';
import { TaskService } from './tasks.service';
import { Label, Task } from './types';

@Component({
  template: `
    <h1>Edit Task</h1>
    <form (ngSubmit)="submit()">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          placeholder="Task name"
          [(ngModel)]="task.name"
        />
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          placeholder="Task description"
          [(ngModel)]="task.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="labels" class="form-label">Labels</label>
        <select
          multiple
          class="form-control"
          id="labels"
          placeholder="Task labels"
          name="labels"
          [(ngModel)]="task.labels"
        >
          @for (label of labels; track label.id) {
          <option [value]="label.id">{{ label.name }}</option>
          }
        </select>
        <div class="help-text">Select at least one label</div>
      </div>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
  `,
  imports: [FormsModule],
})
export class EditTaskComponent implements OnInit {
  private readonly labelsService = inject(LabelService);
  private readonly tasksService = inject(TaskService);
  private readonly router = inject(Router);
  readonly id = input.required<number>();
  task: Task = {
    id: 0,
    name: '',
    description: '',
    labels: [],
  };
  labels: Label[] = [];

  ngOnInit(): void {
    this.labelsService.getAllLabels().subscribe((labels) => {
      this.labels = labels;
    });

    this.tasksService.getTaskById(this.id()).subscribe((task) => {
      this.task = task;
    });
  }

  submit() {
    this.tasksService.updateTask(this.task).subscribe((task) => {
      this.router.navigate(['/tasks']);
    });
  }
}
