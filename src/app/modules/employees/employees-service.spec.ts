import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EmployeesService } from './employees-service';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of employees', fakeAsync(() => {
    let isLoading: boolean = false;
    service.getEmployeesList();
    service.isLoading$.subscribe(value => isLoading = value);

    expect(isLoading).toBe(true);
    tick(3000);
    service.employeesList$.subscribe(employeesList => {
      expect(employeesList).toBeTruthy();
      expect(service.employeesListCache).toBe(employeesList);
      expect(isLoading).toBe(false);
    })
  }))

  it('should return a single employee by his id', fakeAsync(() => {
    let isLoading: boolean = false;
    service.getEmployeeById('1');
    service.isLoading$.subscribe(value => isLoading = value);

    expect(isLoading).toBe(true);
    tick(3000);
    service.employee$.subscribe(employee => {
      expect(employee).toBeTruthy();
      expect(service.employeeCache.get('1')).toBeTruthy();
      expect(isLoading).toBe(false);
    })
  }))
});
