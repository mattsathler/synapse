import { Component, Input } from '@angular/core';
import { Task as ITask } from '../../../../@shared/types/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task',
  imports: [CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  @Input()
  public task: ITask | null = null;

  constructor() {
  }
}
