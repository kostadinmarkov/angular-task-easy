import {TaskStatus} from './task.status';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: number;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date | null;
}
