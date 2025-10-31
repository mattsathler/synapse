import { Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Separator } from '../../../../../@shared/components/separator/separator';
import { AgendaService } from '../../agenda-service';
import { Patient } from '../../../../../@shared/types/Patient';
import { PatientService } from '../../../patients/patient-service';
import { minTimeValidator } from '../../../../../@shared/validators/minTimeValidator';
import { Observable, of } from 'rxjs';

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

  public patientList$: Observable<Patient[]> = of([]);
  public selectedPatient: Patient | null = null;

  constructor(private service: AgendaService, private patientService: PatientService, private formBuilder: FormBuilder) {
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
        endControl.setValidators([Validators.required, minTimeValidator(startTime)]);
        endControl.updateValueAndValidity();
      }
    });
  }

  public generateDefaultTitle(): void {
    const type = this.taskTypes.find(type => this.taskForm.controls['type'].value == type.id)?.title;
    if (this.selectedPatient) {
      this.taskForm.controls['title'].setValue(`${type} - ${this.selectedPatient?.full_name}`);
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

  public searchPatient(name: string): void {
    if (!name || name === "") {
      this.patientList$ = of([]);
      return;
    }
    this.patientList$ = this.patientService.getPatientList(`&search=${name}`);
    return;
  }

  public clearPatientList(): void {
    this.patientList$ = of([]);
    return;
  }
}
