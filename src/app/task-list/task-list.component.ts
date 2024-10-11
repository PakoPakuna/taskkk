import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Import RouterModule and Router
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add RouterModule to imports
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  selectedPriority: string = '';

  constructor(private taskService: TaskService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(100).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      error: (error) => console.error('Error fetching tasks', error)
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => 
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedPriority === '' || task.priority.toString() === this.selectedPriority)
    );
  }

  deleteTask(id: number | undefined) {
    if (id) {
      this.taskService.deleteTasks([id]).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
          this.applyFilters();
        },
        error: (error) => console.error('Error deleting task', error)
      });
    }
  }

  getPriorityClass(priority: number): string {
    switch(priority) {
      case 1: return 'low';
      case 2: return 'medium';
      case 3: return 'high';
      default: return '';
    }
  }

  getPriorityText(priority: number): string {
    switch(priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return '';
    }
  }



  navigateTo(route: string) {
    this.router.navigate([route]); 
  }
}
