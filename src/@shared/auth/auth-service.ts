import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service';
import { Employee } from '../types/Employee';
import { firstValueFrom } from 'rxjs';

export const AUTH_SESSION_KEY = 'synapse.auth.session';
export const AUTH_SESSION_STORAGE = new InjectionToken<Storage | null>('Auth session storage', {
  providedIn: 'root',
  factory: () => {
    const document = inject(DOCUMENT);
    try {
      return document.defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage = inject(AUTH_SESSION_STORAGE);
  // --- signals ---
  private _isLoading = signal(false);
  private _employee = signal<Employee | null>(null);
  private _error = signal<string | null>(null);
  private _token = signal<string | null>(null);

  // --- derivated signals ---
  public isLoading = computed(() => this._isLoading());
  public employee = computed(() => this._employee());
  public error = computed(() => this._error());
  public token = computed(() => this._token());

  constructor(private httpService: HttpService, private router: Router) {
    this.restoreSession();
  }

  private restoreSession(): void {
    try {
      const saved = this.storage?.getItem(AUTH_SESSION_KEY);
      if (!saved) return;
      const session = JSON.parse(saved);
      if (typeof session?.token !== 'string' || !session.token.trim() ||
          typeof session?.employee?.id !== 'string' || !session.employee.id ||
          typeof session.employee.name !== 'string' || !session.employee.name.trim()) {
        this.logout();
        return;
      }
      this._employee.set(session.employee);
      this._token.set(session.token);
    } catch {
      this.logout();
    }
  }

  private persistSession(employee: Employee, token: string): void {
    try {
      this.storage?.setItem(AUTH_SESSION_KEY, JSON.stringify({ employee, token }));
    } catch {
      // Storage may be unavailable; the current in-memory session still works.
    }
  }

  public async auth(email: string, password: string): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const response = await firstValueFrom(this.httpService.post<{ employee: Employee; token: string }>('/auth', { email, password }));

      this._employee.set(response.employee);
      this._token.set(response.token);
      this.persistSession(response.employee, response.token);

      await this.router.navigate(['/home']);
    } catch (error: any) {
      this._error.set(error?.message ?? 'Não foi possível autenticar');
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  public logout(): void {
    this._employee.set(null);
    this._token.set(null);
    try {
      this.storage?.removeItem(AUTH_SESSION_KEY);
    } catch {
      // Logout must clear in-memory state even when storage is unavailable.
    }
  }
}
