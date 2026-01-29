import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {KeyValue} from '@angular/common';
import {TaskStatus} from '../../core/model/task.status';
import {AuthService} from '../../core/service/auth.service';
import {TaskService} from '../../core/service/task.service';

@Component({
  selector: 'app-ticket',
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatSelect,
    MatOption
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  protected taskForm: FormGroup = new FormGroup({});
  protected isEditMode = false;

  private ticketId: number | null = null;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly taskService: TaskService) {
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.ticketId = idParam ? Number(idParam) : null;
    const task = this.taskService.getTask(this.ticketId);

    this.isEditMode = !!task;

    this.taskForm = this.fb.group({
      title: [task?.title || '', Validators.required],
      description: [task?.description || '', Validators.required],
      assignedTo: [task?.assignedTo || '', Validators.required],
      status: [task?.status || TaskStatus.TODO, Validators.required]
    });
  }

  protected getStatuses(): KeyValue<string, string>[] {
    return Object.entries(TaskStatus).map(([key, value]) => ({key, value}));
  }

  protected onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskForm.touched) {
        this.taskService.updateTask(this.ticketId!, this.taskForm.value);
      } else if (!this.isEditMode) {
        this.taskService.createTask(this.taskForm.value);
      }
      this.router.navigate(['/dashboard']);
    }
  }

  protected getUsers() {
    return this.authService.getAllUsers();
  }

  protected logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  protected delete() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.ticketId!);
      this.router.navigate(['/dashboard']);
    }
  }
}
