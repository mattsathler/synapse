import { AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';
import { Employee } from '../../../../../@shared/types/Employee';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendaService } from '../../agenda-service';
import { Patient } from '../../../../../@shared/types/Patient';
import { PatientService } from '../../../patients/patient-service';
import { minTimeValidator } from '../../../../../@shared/validators/minTimeValidator';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { Task } from '../../../../../@shared/types/Task';
import { DateService } from '../../../../../@shared/services/date-service';
import { EmployeesService } from '../../../employees/employees-service';
import { SkeletonDirective } from '../../../../../@shared/directives/skeleton';

@Component({
  selector: 'new-task',
  imports: [CommonModule, FormsModule, Avatar, ReactiveFormsModule, SkeletonDirective],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss'
})
export class NewTask implements AfterViewInit {
  @Input()
  public selectedEmployees: Employee[] = [];


  @Input()
  public task: Task | null = null;

  public employeeList;
  public taskTypes: { title: string, id: string | null }[] = [];
  public taskStatus: { title: string, id: string, color: string }[] = [];
  public taskForm: FormGroup;
  public taskEmployees: Employee[] = [];

  public isLoadingEmployees;

  public selectedPatient: Patient | null = null;

  public patientList;
  public isLoadingPatientList;
  public patientSearchQuery: string = '';

  constructor(private service: AgendaService, private employeesService: EmployeesService, private dateService: DateService, private patientService: PatientService, private formBuilder: FormBuilder) {
    this.patientList = this.patientService.patientList;
    this.isLoadingPatientList = this.patientService.isLoading;

    this.employeeList = this.employeesService.employeesList;
    this.isLoadingEmployees = this.employeesService.isLoading;

    this.taskTypes = this.service.getTaskTypes().sort((a, b) => a.title.localeCompare(b.title));
    this.taskTypes.unshift({
      title: "Escolha um tipo de agendamento",
      id: null,
    })
    this.taskTypes.push(
      {
        title: "Outros",
        id: '0'
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
      });

      this.taskForm.patchValue({ patient: this.selectedPatient });
      this.taskForm.patchValue({ employees: this.taskEmployees });
    } else {
      this.taskEmployees = [...this.selectedEmployees];
      this.taskForm.patchValue({ employees: this.selectedEmployees });

    }

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
      return;
    }

    this.patientSearchQuery = name;
    this.patientService.getPatientList();
    return;
  }

  public togglePatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.taskForm.patchValue({ patient: patient }, { emitEvent: true });
    this.patientSearchQuery = '';
    return;
  }

  public toggleEmployee(e?: Event, employee?: Employee): void {
    const target = e?.target as HTMLSelectElement | undefined;
    const employees = this.employeeList();
    let targetEmployee: Employee | undefined;

    if (target?.value) {
      targetEmployee = employees?.find(emp => emp.id === target.value);
    } else if (employee) {
      targetEmployee = employee;
    }

    if (!targetEmployee) return;

    const alreadySelected = this.taskEmployees.some(e => e.id === targetEmployee.id);

    if (alreadySelected) {
      this.taskEmployees = this.taskEmployees.filter(e => e.id !== targetEmployee.id);
    } else {
      this.taskEmployees = [...this.taskEmployees, targetEmployee];
    }

    if (target) target.value = '';

    this.reorderEmployeesList(this.taskEmployees);
    this.taskForm.patchValue({ employees: this.taskEmployees }, { emitEvent: true });
  }


  public reorderEmployeesList(list: Employee[]): void {
    list = list.sort((a, b) => a.name.localeCompare(b.name));
    return;
  }
}
