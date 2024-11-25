import { Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task.component';
import { EditTaskComponent } from './edit-task.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: AddTaskComponent,
  },
  {
    path: 'tasks/:id/edit',
    component: EditTaskComponent,
  },
];
