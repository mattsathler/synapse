import { AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendaService } from '../../agenda-service';
import { Patient } from '../../../../../@shared/types/Patient';
import { PatientService } from '../../../patients/patient-service';
import { minTimeValidator } from '../../../../../@shared/validators/minTimeValidator';
import { Observable, of, take } from 'rxjs';
import { Task } from '../../../../../@shared/types/Task';
import { DateService } from '../../../../../@shared/services/date-service';

@Component({
  selector: 'new-task',
  imports: [CommonModule, FormsModule, Avatar, ReactiveFormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss'
})
export class NewTask implements AfterViewInit {
  @Input()
  public selectedEmployees: Employee[] = [];

  @Input()
  public employees: Employee[] = [];

  @Input()
  public task: Task | null = null;

  public taskTypes: { title: string, id: number | null }[] = [];
  public taskStatus: { title: string, id: number, color: string }[] = [];
  public taskForm: FormGroup;
  public taskEmployees: Employee[] = [];

  public employeeList: Employee[] = [];
  public patientList$: Observable<Patient[]> = of([]);
  public selectedPatient: Patient | null = null;

  constructor(private service: AgendaService, private dateService: DateService, private patientService: PatientService, private formBuilder: FormBuilder) {
    this.taskTypes = this.service.getTaskTypes().sort((a, b) => a.title.localeCompare(b.title));
    this.taskTypes.unshift({
      title: "Escolha um tipo de agendamento",
      id: null,
    })
    this.taskTypes.push(
      {
        title: "Outros",
        id: 0
      }
    )

    this.taskStatus = this.service.getTaskStatus();

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      type: [null, Validators.required],
      patient: [null],
      start: ['', Validators.required],
      end: ['', Validators.required],
      status: [1, Validators.required],
      employees: [[], Validators.required],
    })

    this.taskForm.get('start')!.valueChanges.pipe(take(1)).subscribe(startTime => {
      const endControl = this.taskForm.get('end');
      if (startTime && endControl) {
        endControl.setValidators([Validators.required, minTimeValidator(startTime)]);
        endControl.updateValueAndValidity();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.task) {
      this.taskEmployees = [...this.task.employees];
      this.selectedPatient = this.task.patient;
      this.taskForm.patchValue({
        title: this.task.title,
        type: this.task.type,
        start: this.dateService.formatTimeForInput(this.task.start),
        end: this.dateService.formatTimeForInput(this.task.end),
        status: this.task.status,
      }, { emitEvent: false });

      this.taskForm.patchValue({ patient: this.selectedPatient }, { emitEvent: false });
      this.taskForm.patchValue({ employees: this.taskEmployees }, { emitEvent: false });
    } else {
      this.taskEmployees = [...this.selectedEmployees];
    }

    this.employeeList = this.employees.filter(
      e => !this.taskEmployees.some(selected => selected.id === e.id)
    );

    this.reorderEmployeesList(this.employeeList);
    this.reorderEmployeesList(this.taskEmployees);

    return;
  }

  public generateDefaultTitle(): void {
    const type = this.taskTypes.find(type => this.taskForm.controls['type'].value == type.id)?.title;
    if (this.selectedPatient) {
      this.taskForm.controls['title'].setValue(`${type} - ${this.selectedPatient?.fullName}`);
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

  public togglePatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.taskForm.patchValue({ patient: patient }, { emitEvent: true });
    this.clearPatientList()
  }

  public toggleEmployee(e?: Event, id?: string): void {
    const target = e?.target as HTMLSelectElement;

    if (!target && !id) return;

    const employee = target
      ? this.employees.find(emp => emp.id === target.value)
      : this.employees.find(emp => emp.id === id);

    if (!employee) return;

    const isSelected = this.taskEmployees.find(e => e.id === employee.id);

    if (isSelected) {
      this.taskEmployees = this.taskEmployees.filter(e => e.id !== isSelected.id);
      this.employeeList.push(isSelected);
    } else {
      this.taskEmployees.push(employee);
      this.employeeList = this.employeeList.filter(e => e.id !== employee.id);
    }

    if (target) {
      target.value = "";
    }

    this.reorderEmployeesList(this.employeeList);
    this.reorderEmployeesList(this.taskEmployees);

    this.taskForm.patchValue({ employees: this.taskEmployees }, { emitEvent: true });
    return;
  }

  public reorderEmployeesList(list: Employee[]): void {
    list = list.sort((a, b) => a.name.localeCompare(b.name));
    return;
  }
}
