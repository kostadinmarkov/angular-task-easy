import {TestBed} from '@angular/core/testing';
import {TaskService} from './task.service';
import {TaskStatus} from '../model/task.status';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a task', () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      assignedTo: 1,
      status: TaskStatus.TODO as const
    };
    const task = service.createTask(taskData);
    expect(task).toBeTruthy();
    expect(task.title).toBe('Test Task');
    expect(task.id).toBeTruthy();
  });

  it('should get tasks by status', () => {
    service.createTask({
      title: 'Task 1',
      description: 'Desc 1',
      assignedTo: 1,
      status: TaskStatus.TODO
    });
    service.createTask({
      title: 'Task 2',
      description: 'Desc 2',
      assignedTo: 1,
      status: TaskStatus.IN_PROGRESS
    });

    const todoTasks = service.getTasks().filter(task => task.status === TaskStatus.TODO);
    expect(todoTasks.length).toBe(1);
  });

  it('should update a task', () => {
    const task = service.createTask({
      title: 'Original',
      description: 'Desc',
      assignedTo: 1,
      status: TaskStatus.TODO
    });

    const updated = service.updateTask(task.id, {title: 'Updated'});
    expect(updated?.title).toBe('Updated');
  });

  it('should delete a task', () => {
    const task = service.createTask({
      title: 'To Delete',
      description: 'Desc',
      assignedTo: 1,
      status: TaskStatus.TODO
    });

    service.deleteTask(task.id);
    expect(service.getTasks().length).toBe(0);
  });

  it('should return false when deleting non-existent task', () => {
    service.deleteTask(666);
  });
});
