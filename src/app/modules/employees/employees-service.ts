import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, delay, filter, map, of, tap } from 'rxjs';
import { Employee } from '../../../@shared/types/Employee';
import { getMockedEmployees } from '../../../@shared/mockups/Employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  // --- signals ---
  public _isLoading = signal<boolean>(false);
  public _employee = signal<Employee | null>(null);
  public _employeesList = signal<Employee[] | null>(null);

  // --- derivated signals ---
  public employee = computed(() => this._employee());
  public employeesList = computed(() => this._employeesList());
  public isLoading = computed(() => this._isLoading());

  // --- cache ---
  public employeeCache: Map<string, Employee | null> = new Map<string, Employee | null>();
  public employeesListCache: Employee[] | null = null;

  public getEmployeesList(): void {
    if (this.employeesListCache) {
      this._employeesList.set(this.employeesListCache)
      return;
    };

    this._isLoading.set(true);

    of(getMockedEmployees()).pipe(
      delay(2000),
      tap((employees) => {
        this._employeesList.set(employees);
        this.employeesListCache = employees;
        this._isLoading.set(false);
      })).subscribe()
  }

  public getEmployeeById(id: string): void {
    if (this.employeeCache.has(id)) {
      this._employee.set(this.employeeCache.get(id)!);
      return;
    }
    const employeeList = getMockedEmployees();
    this._isLoading.set(true);

    of(employeeList).pipe(
      delay(2000),
      map(employees => employees.find(e => e.id === id) ?? null),
      tap(employee => {
        this._employee.set(employee);
        this.employeeCache.set(id, employee);
        this._isLoading.set(false);
      })
    ).subscribe()
  }
}
