import { computed, Injectable, signal } from '@angular/core';
import { User } from '../../../@shared/types/User';
import { HttpService } from '../../../@shared/services/http-service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // --- signals ---
  public _isLoading = signal(false);
  public _user = signal<User | null>(null);
  public _error = signal<string | null>(null);

  // --- derivated signals ---
  public isLoading = computed(() => this._isLoading());
  public user = computed(() => this._user());
  public error = computed(() => this._error());

  constructor(private httpService: HttpService) {
    const storagedUser = localStorage.getItem('user');
    if (storagedUser) {
      this._user.set(JSON.parse(storagedUser));
    }
  }

  public auth(email: string, password: string): void {
    this._isLoading.set(true);
    this._error.set(null);
    this.httpService.post<{ user: User; token: string }>('/auth', { email, password })
      .pipe(
        finalize(() => {
          this._isLoading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          this._user.set(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          window.location.href = '/home';
        },
        error: (err) => {
          this._error.set(err.message);
        }
      });
  }
}
