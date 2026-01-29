import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {Task} from '../../core/model/task';
import {Subject, takeUntil} from 'rxjs';
import {User} from '../../core/model/user';
import {TaskStatus} from '../../core/model/task.status';
import {AuthService} from '../../core/service/auth.service';
import {TaskService} from '../../core/service/task.service';
import {Router, RouterLink} from '@angular/router';
import {KeyValue} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-taskboard',
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    RouterLink
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy {
  protected currentUser: string | undefined;
  protected tasks: Task[] = [];

  private readonly destroy$ = new Subject<void>();
  private users: User[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly taskService: TaskService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedUser()?.name;
    this.users = this.authService.getAllUsers();
    this.tasks = this.taskService.getTasks();

    this.taskService.onTaskChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getColumns(): KeyValue<string, TaskStatus>[] {
    return Object.entries(TaskStatus).map(([key, value]) => ({key, value}));
  }

  protected getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  protected getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unassigned';
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
