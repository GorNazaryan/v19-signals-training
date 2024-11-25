import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Label } from "./types";
import { LabelService } from "./labels.service";
import { TaskService } from "./tasks.service";
import { Router } from "@angular/router";

@Component({
  template: `
    <h1>Add Task</h1>
    <form (ngSubmit)="submit()">
        <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Task name" [(ngModel)]="task.name">
        </div>
        <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" placeholder="Task description" [(ngModel)]="task.description"></textarea>
        </div>
        <div class="form-group">
            <label for="labels" class="form-label">Labels</label>
            <select multiple class="form-control" id="labels" placeholder="Task labels" name="labels" [(ngModel)]="task.labels">
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
export class AddTaskComponent implements OnInit {
    private readonly labelsService = inject(LabelService);
    private readonly tasksService = inject(TaskService);
    private readonly router = inject(Router);
    labels: Label[] = [];

    ngOnInit(): void {
        this.labelsService.getAllLabels().subscribe((labels) => {
            this.labels = labels;
        });
    }
    task = {
        name: '',
        description: '',
        labels: [],
    };

    submit() {
        this.tasksService.createTask(this.task).subscribe((task) => {
            this.router.navigate(['/tasks']);
        });
    }
}