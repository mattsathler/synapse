import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, of, tap } from 'rxjs';
import { Employee } from '../../../@shared/types/Employee';
import { getMockedEmployees } from '../../../@shared/mockups/Employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  public employeesList$: BehaviorSubject<Employee[] | null> = new BehaviorSubject<Employee[] | null>(null);
  public employeesListCache: Employee[] | null = null;

  public employee$: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null)
  public employeeCache: Map<string, Employee | null> = new Map<string, Employee | null>();

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getEmployeesList(): void {
    if (this.employeesListCache) {
      this.employeesList$.next(this.employeesListCache);
      return;
    };

    this.isLoading$.next(true);

    of(getMockedEmployees()).pipe(
      delay(2000),
      tap((employees) => {
        this.employeesList$.next(employees);
        this.employeesListCache = employees;
        this.isLoading$.next(false);
      })).subscribe()
  }

  public getEmployeeById(id: string): void {
    if (this.employeeCache.has(id)) {
      this.employee$.next(this.employeeCache.get(id)!);
      return;
    }
    const employeeList = getMockedEmployees();
    this.isLoading$.next(true);

    of(employeeList).pipe(
      delay(2000),
      map(employees => employees.find(e => e.id === id) ?? null),
      tap(employee => {
        this.employee$.next(employee);
        this.employeeCache.set(id, employee);
        this.isLoading$.next(false);
      })
    ).subscribe()
  }
}
