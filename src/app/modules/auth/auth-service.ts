import { computed, Injectable, signal } from '@angular/core';
import { HttpService } from '../../../@shared/services/http-service';
import { finalize, firstValueFrom } from 'rxjs';
import { Employee } from '../../../@shared/types/Employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // --- signals ---
  public _isLoading = signal(false);
  public _employee = signal<Employee | null>(null);
  public _error = signal<string | null>(null);

  // --- derivated signals ---
  public isLoading = computed(() => this._isLoading());
  public employee = computed(() => this._employee());
  public error = computed(() => this._error());

  constructor(private httpService: HttpService) {
    const storagedEmployee = localStorage.getItem('employee');
    if (storagedEmployee) {
      this._employee.set(JSON.parse(storagedEmployee));
    }
  }

  public async auth(email: string, password: string): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);
    const response = await firstValueFrom(this.httpService.post<{ employee: Employee; token: string }>('/auth', { email, password }));
    this._employee.set(response.employee);
    localStorage.setItem('employee', JSON.stringify(response.employee));
    localStorage.setItem('token', response.token);
    window.location.href = '/home';

    return;
    // .pipe(
    //   finalize(() => {
    //     this._isLoading.set(false);
    //   })
    // )
    // .subscribe({
    //   next: (response) => {
    //   },
    //   error: (err) => {
    //     this._error.set(err.message);
    //   }
    // });
  }
}
