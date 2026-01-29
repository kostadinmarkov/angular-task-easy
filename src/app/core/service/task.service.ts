import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../model/task';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_KEY = 'tasks';
  private readonly tasksSubject$ = new BehaviorSubject<Task[]>([]);

  constructor(private readonly storageService: StorageService) {
    this.tasksSubject$.next(this.getTasksFromStorage());
  }

  public createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getTasks();
    const task: Task = {
      ...taskData,
      id: Date.now().valueOf(),
      createdAt: new Date(),
      updatedAt: null
    };
    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  }

  public updateTask(id: number, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return null;
    }

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date()
    };

    this.saveTasks(tasks);
    return tasks[index];
  }

  public deleteTask(id: number): boolean {
    const tasks = this.getTasks();
    const filtered = tasks.filter(t => t.id !== id);

    if (filtered.length === tasks.length) {
      return false;
    }

    this.saveTasks(filtered);
    return true;
  }

  public getTask(id: number | null): Task | null {
    return this.getTasks().find(t => t.id === id) || null;
  }

  public getTasks(): Task[] {
    return this.tasksSubject$.getValue();
  }

  public onTaskChange(): Observable<Task[]> {
    return this.tasksSubject$.asObservable();
  }

  private getTasksFromStorage(): Task[] {
    return this.storageService.getItem(this.TASKS_KEY) || [];
  }

  private saveTasks(tasks: Task[]): void {
    this.storageService.setItem(this.TASKS_KEY, tasks);
    this.tasksSubject$.next(tasks);
  }
}
