import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PatientService } from '../../../patients/patient-service';
import { EmployeesService } from '../../../employees/employees-service';
import { Employee } from '../../../../../@shared/types/Employee';
import { Patient } from '../../../../../@shared/types/Patient';
import { NewTask } from './new-task';

describe('NewTask', () => {
  let component: NewTask;
  let patients: { patientList: ReturnType<typeof signal<Patient[]>>; isLoading: ReturnType<typeof signal<boolean>>; getPatientList: jasmine.Spy };
  const ana = { id: '1', name: 'Ana', tasks: [] } as unknown as Employee;
  const zelia = { id: '2', name: 'Zelia', tasks: [] } as unknown as Employee;
  const patient = { fullName: 'Maria' } as Patient;
  beforeEach(() => {
    patients = { patientList: signal([]), isLoading: signal(false), getPatientList: jasmine.createSpy('getPatientList') };
    TestBed.configureTestingModule({ providers: [
      { provide: PatientService, useValue: patients },
      { provide: EmployeesService, useValue: { employeesList: signal([ana, zelia]), isLoading: signal(false) } }
    ] });
    component = TestBed.createComponent(NewTask).componentInstance;
  });
  it('initializes required fields and available types', () => {
    expect(component.taskForm.invalid).toBeTrue();
    expect(component.taskTypes[0].id).toBeNull();
    expect(component.taskTypes.at(-1)?.title).toBe('Outros');
    expect(component.taskStatus.length).toBeGreaterThan(0);
  });
  it('copies selected employees for new appointments', () => {
    component.selectedEmployees = [zelia, ana];
    component.ngAfterViewInit();
    expect(component.taskEmployees).toEqual([ana, zelia]);
    expect(component.taskEmployees).not.toBe(component.selectedEmployees);
    expect(component.selectedEmployees).toEqual([zelia, ana]);
  });
  it('loads existing appointment details into the form', () => {
    component.task = { title: 'Consult', start: new Date(2026, 0, 1, 9), end: new Date(2026, 0, 1, 10), patient, employees: [ana], type: 2, status: 3 };
    component.ngAfterViewInit();
    expect(component.taskForm.value).toEqual({ title: 'Consult', description: '', type: 2, patient, start: '09:00', end: '10:00', status: 3, employees: [ana] });
  });
  it('generates titles with and without patient names', () => {
    component.taskForm.patchValue({ type: '2' });
    component.generateDefaultTitle();
    expect(component.taskForm.controls['title'].value).toBe('Consulta médica');
    component.togglePatient(patient);
    component.generateDefaultTitle();
    expect(component.taskForm.controls['title'].value).toBe('Consulta médica - Maria');
    expect(component.taskForm.controls['patient'].value).toBe(patient);
    expect(component.patientSearchQuery).toBe('');
  });
  it('validates and adjusts an end time preceding start', () => {
    component.taskForm.patchValue({ start: '10:30', end: '09:00' });
    expect(component.taskForm.controls['end'].hasError('minTime')).toBeTrue();
    component.setupMinTime();
    expect(component.taskForm.controls['end'].value).toBe('10:30');
    expect(component.taskForm.controls['end'].valid).toBeTrue();
    component.taskForm.patchValue({ end: '11:00' });
    component.setupMinTime();
    expect(component.taskForm.controls['end'].value).toBe('11:00');
  });
  it('ignores empty searches and fetches patients for a name', () => {
    component.searchPatient('');
    expect(patients.getPatientList).not.toHaveBeenCalled();
    component.searchPatient('Maria');
    expect(patients.getPatientList).toHaveBeenCalledWith('page=1&limit=10&search=Maria');
    expect(component.patientSearchQuery).toBe('Maria');
  });
  it('adds, sorts and removes employees while updating the form', () => {
    component.toggleEmployee();
    expect(component.taskEmployees).toEqual([]);
    component.toggleEmployee(undefined, zelia);
    component.toggleEmployee(undefined, ana);
    expect(component.taskEmployees).toEqual([ana, zelia]);
    expect(component.taskForm.controls['employees'].value).toEqual([ana, zelia]);
    component.toggleEmployee(undefined, ana);
    expect(component.taskEmployees).toEqual([zelia]);
  });
  it('selects employees from a dropdown and resets the dropdown', () => {
    const target = { value: '1' };
    component.toggleEmployee({ target } as unknown as Event);
    expect(component.taskEmployees).toEqual([ana]);
    expect(target.value).toBe('');
    component.toggleEmployee({ target: { value: 'missing' } } as unknown as Event);
    expect(component.taskEmployees).toEqual([ana]);
  });
});
