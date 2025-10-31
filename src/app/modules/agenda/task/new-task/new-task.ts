import { Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Separator } from '../../../../../@shared/components/separator/separator';
import { AgendaService } from '../../agenda-service';

@Component({
  selector: 'new-task',
  imports: [CommonModule, FormsModule, Avatar, Separator],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss'
})
export class NewTask {
  @Input()
  public selectedEmployees: Employee[] = [];
  public taskTypes: { title: string, id: number }[] = [];

  constructor(private service: AgendaService) {
    this.taskTypes = this.service.getTaskTypes().sort((a, b) => a.title.localeCompare(b.title));
    this.taskTypes.unshift({
      title: "Escolha um tipo de agendamento",
      id: 0,
    })
  }
}
