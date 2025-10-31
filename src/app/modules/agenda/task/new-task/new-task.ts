import { Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Separator } from '../../../../../@shared/components/separator/separator';
import { AgendaService } from '../../agenda-service';

@Component({
  selector: 'new-task',
  imports: [CommonModule, FormsModule, Avatar, Separator, ReactiveFormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss'
})
export class NewTask {
  @Input()
  public selectedEmployees: Employee[] = [];
  public taskTypes: { title: string, id: number }[] = [];
  public taskStatus: { title: string, id: number, color: string }[] = [];
  public taskForm: FormGroup;

  constructor(private service: AgendaService, private formBuilder: FormBuilder) {
    this.taskTypes = this.service.getTaskTypes().sort((a, b) => a.title.localeCompare(b.title));
    this.taskTypes.unshift({
      title: "Escolha um tipo de agendamento",
      id: 0,
    })

    this.taskStatus = this.service.getTaskStatus();
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
}
