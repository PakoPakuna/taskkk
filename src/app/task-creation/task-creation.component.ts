// task-creation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
templateUrl: './task-creation.component.html',
  styleUrl: 'task-creation.component.scss'
})
export class TaskCreationComponent {
  task: Task = {
    title: '',
    description: '',
    priority: 1,
    dueDate: new Date().toISOString().split('T')[0]
  };

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit() {
    this.taskService.addTask(this.task).subscribe({
      next: (response) => {
        console.log('Task added successfully', response);
        this.router.navigate(['/list']);
      },
      error: (error) => console.error('Error adding task', error)
    });
  }

  getPriorityClass(): string {
    switch(this.task.priority) {
      case 1: return 'low';
      case 2: return 'medium';
      case 3: return 'high';
      default: return '';
    }
  }

  getPriorityText(): string {
    switch(this.task.priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return '';
    }
  }
}