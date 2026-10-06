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
    service.getEmployeesList();
    expect(service.isLoading()).toBe(true);
    tick(3000);
    expect(service.employeesList()).toBeTruthy();
    expect(service.employeesListCache).toBe(service.employeesList());
    expect(service.isLoading()).toBe(false);
  }))

  it('should return a single employee by his id', fakeAsync(() => {
    service.getEmployeeById('1');
    expect(service.isLoading()).toBe(true);
    tick(3000);
    expect(service.employee()).toBeTruthy();
    expect(service.employeeCache.get('1')).toBeTruthy();
    expect(service.isLoading()).toBe(false);
  }))

  it('returns the cached list immediately', fakeAsync(() => {
    service.getEmployeesList(); tick(2000);
    const cached = service.employeesList();
    service._employeesList.set(null);
    service.getEmployeesList();
    expect(service.employeesList()).toBe(cached);
    expect(service.isLoading()).toBeFalse();
  }));
  it('returns cached employees without loading', fakeAsync(() => {
    service.getEmployeeById('1'); tick(2000);
    const cached = service.employee();
    service._employee.set(null);
    service.getEmployeeById('1');
    expect(service.employee()).toBe(cached);
    expect(service.isLoading()).toBeFalse();
  }));
  it('caches missing employees as null', fakeAsync(() => {
    service.getEmployeeById('missing'); tick(2000);
    expect(service.employee()).toBeNull();
    expect(service.employeeCache.has('missing')).toBeTrue();
    service.getEmployeeById('missing');
    expect(service.isLoading()).toBeFalse();
  }));

});
