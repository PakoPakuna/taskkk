import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';


export const routes: Routes = [
    { 
        path: 'create', 
        component: TaskCreationComponent
      },
      { 
        path: 'list', 
        component: TaskListComponent 
      },
      { path: '', component: TaskCreationComponent },
      { path: '**', redirectTo: '/list' }
];
