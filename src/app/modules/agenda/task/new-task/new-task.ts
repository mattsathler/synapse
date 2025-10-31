import { Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  public taskTypes: { title: string, id: number | null }[] = [];
  public taskStatus: { title: string, id: number, color: string }[] = [];
  public taskForm: FormGroup;

  constructor(private service: AgendaService, private formBuilder: FormBuilder) {
    this.taskTypes = this.service.getTaskTypes().sort((a, b) => a.title.localeCompare(b.title));
    this.taskTypes.unshift({
      title: "Escolha um tipo de agendamento",
      id: null,
    })

    this.taskStatus = this.service.getTaskStatus();
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      type: [null, Validators.required],
      patient: [null],
      start: ['', Validators.required],
      end: ['', Validators.required]
    })

    this.taskForm.get('start')!.valueChanges.subscribe(startTime => {
      const endControl = this.taskForm.get('end');
      if (startTime && endControl) {
        endControl.setValidators([Validators.required, this._minTimeValidator(startTime)]);
        endControl.updateValueAndValidity();
      }
    });
  }


  public generateDefaultTitle(): void {
    const type = this.taskTypes.find(type => this.taskForm.controls['type'].value == type.id)?.title;
    const patient = this.taskForm.controls['patient'].value;

    if (patient) {
      this.taskForm.controls['title'].setValue(`${type} - ${patient?.name}`);
      return;
    }

    this.taskForm.controls['title'].setValue(type);
    return;
  }

  public setupMinTime(): void {
    const start = this.taskForm.get('start')?.value;
    const end = this.taskForm.get('end')?.value;

    if (start && end && end < start) {
      this.taskForm.patchValue({ end: start });
    }
  }

  private _minTimeValidator(minTime: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputTime = control.value as string;

      if (!inputTime || !minTime) return null;

      const [minH, minM] = minTime.split(':').map(Number);
      const [inputH, inputM] = inputTime.split(':').map(Number);

      const minMinutes = minH * 60 + minM;
      const inputMinutes = inputH * 60 + inputM;

      return inputMinutes >= minMinutes ? null : { minTime: true };
    };
  }


  private toMinutes(value: string): number {
    if (!value) return 0;
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  }
}
