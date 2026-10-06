import { Subject, of, throwError } from 'rxjs';
import { AUTH_SESSION_KEY, AUTH_SESSION_STORAGE, AuthService } from './auth-service';
import { HttpService } from '../services/http-service';
import { Employee } from '../types/Employee';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app/app.routes';
import { Login } from '../../app/modules/login/login';
import { Home } from '../../app/modules/home/home';
import { ThemeService } from '../../app/theme-service';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthInterceptor } from '../interceptors/AuthInterceptor';

describe('AuthService', () => {
  let service: AuthService;
  let http: jasmine.SpyObj<HttpService>;
  let router: jasmine.SpyObj<Router>;
  let storage: Storage;
  const employee = { id: '1', name: 'Ana' } as Employee;
  beforeEach(() => {
    http = jasmine.createSpyObj('HttpService', ['post']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate.and.resolveTo(true);
    const data = new Map<string, string>();
    storage = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => { data.set(key, value); },
      removeItem: (key: string) => { data.delete(key); }
    } as Storage;
    TestBed.configureTestingModule({ providers: [{ provide: AUTH_SESSION_STORAGE, useValue: storage }] });
    service = TestBed.runInInjectionContext(() => new AuthService(http, router));
  });
  it('starts unauthenticated with no loading or error', () => {
    expect(service.employee()).toBeNull();
    expect(service.token()).toBeNull();
    expect(service.error()).toBeNull();
    expect(service.isLoading()).toBeFalse();
    expect(storage.getItem(AUTH_SESSION_KEY)).toBeNull();
  });
  it('posts credentials, exposes employee and token, and redirects home', async () => {
    const response = new Subject<{ employee: Employee; token: string }>();
    http.post.and.returnValue(response);
    const pending = service.auth('ana@example.com', 'secret');
    expect(service.isLoading()).toBeTrue();
    expect(http.post).toHaveBeenCalledWith('/auth', { email: 'ana@example.com', password: 'secret' });
    response.next({ employee, token: 'token' });
    await pending;
    expect(service.employee()).toBe(employee);
    expect(service.token()).toBe('token');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(service.isLoading()).toBeFalse();
    expect(JSON.parse(storage.getItem(AUTH_SESSION_KEY)!)).toEqual({ employee, token: 'token' });
  });
  it('propagates authentication failures without redirecting', async () => {
    const error = new Error('Invalid credentials');
    http.post.and.returnValue(throwError(() => error));
    await expectAsync(service.auth('ana@example.com', 'wrong')).toBeRejectedWith(error);
    expect(service.employee()).toBeNull();
    expect(service.token()).toBeNull();
    expect(storage.getItem(AUTH_SESSION_KEY)).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(service.isLoading()).toBeFalse();
    expect(service.error()).toBe('Invalid credentials');
  });
  it('clears authenticated state on logout and allows repeated logout', async () => {
    http.post.and.returnValue(of({ employee, token: 'token' }));
    await service.auth('ana@example.com', 'secret');
    service.logout();
    expect(service.employee()).toBeNull();
    expect(service.token()).toBeNull();
    expect(storage.getItem(AUTH_SESSION_KEY)).toBeNull();
    service.logout();
    expect(service.employee()).toBeNull();
  });

  it('restores the employee and token when the application creates a new service', async () => {
    http.post.and.returnValue(of({ employee, token: 'saved-token' }));
    await service.auth('ana@example.com', 'secret');
    const restored = TestBed.runInInjectionContext(() => new AuthService(http, router));
    expect(restored.employee()).toEqual(employee);
    expect(restored.token()).toBe('saved-token');
    service.logout();
    const loggedOut = TestBed.runInInjectionContext(() => new AuthService(http, router));
    expect(loggedOut.employee()).toBeNull();
    expect(loggedOut.token()).toBeNull();
  });

  for (const saved of ['broken-json', '{}', '{"token":"","employee":{"id":"1","name":"Ana"}}', '{"token":"token","employee":null}']) {
    it(`ignores and removes an invalid saved session: ${saved}`, () => {
      storage.setItem(AUTH_SESSION_KEY, saved);
      const restored = TestBed.runInInjectionContext(() => new AuthService(http, router));
      expect(restored.employee()).toBeNull();
      expect(restored.token()).toBeNull();
      expect(storage.getItem(AUTH_SESSION_KEY)).toBeNull();
    });
  }

  it('supports login and logout when storage throws', async () => {
    spyOn(storage, 'getItem').and.throwError('Storage blocked');
    spyOn(storage, 'setItem').and.throwError('Storage blocked');
    spyOn(storage, 'removeItem').and.throwError('Storage blocked');
    const fallback = TestBed.runInInjectionContext(() => new AuthService(http, router));
    http.post.and.returnValue(of({ employee, token: 'token' }));
    await fallback.auth('ana@example.com', 'secret');
    expect(fallback.token()).toBe('token');
    fallback.logout();
    expect(fallback.token()).toBeNull();
  });
});

describe('Login session routing', () => {
  it('restores the saved session before the home route guard runs', async () => {
    const employee = { id: '1', name: 'Ana Silva' } as Employee;
    TestBed.configureTestingModule({ providers: [
      provideRouter(routes),
      { provide: AUTH_SESSION_STORAGE, useValue: { getItem: () => JSON.stringify({ employee, token: 'restored-token' }) } },
      { provide: HttpService, useValue: jasmine.createSpyObj('HttpService', ['post']) },
      { provide: ThemeService, useValue: { theme: () => 'light' } }
    ] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/home', Home);
    expect(TestBed.inject(Router).url).toBe('/home');
    expect(TestBed.inject(AuthService).token()).toBe('restored-token');
  });

  it('keeps the authenticated session when opening the protected home route after login', async () => {
    const employee = { id: '1', name: 'Ana Silva' } as Employee;
    const http = jasmine.createSpyObj<HttpService>('HttpService', ['post']);
    http.post.and.returnValue(of({ employee, token: 'session-token' }));
    TestBed.configureTestingModule({ providers: [
      provideRouter(routes),
      { provide: AUTH_SESSION_STORAGE, useValue: null },
      { provide: HttpService, useValue: http },
      { provide: ThemeService, useValue: { theme: () => 'light' } }
    ] });
    const harness = await RouterTestingHarness.create();
    const login = await harness.navigateByUrl('/login', Login);
    login.loginForm.setValue({ email: 'ana@example.com', password: 'secret' });

    await login.login();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/home');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(Home);
    expect(TestBed.inject(AuthService).employee()).toBe(employee);
    expect(TestBed.inject(AuthService).token()).toBe('session-token');
    expect(TestBed.inject(AuthService).isLoading()).toBeFalse();
    expect(login.error).toBeNull();
  });
});

describe('Persisted session expiration', () => {
  it('clears persisted credentials when the API responds with 401', () => {
    let saved: string | null = JSON.stringify({ employee: { id: '1', name: 'Ana' }, token: 'expired-token' });
    const router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({ providers: [
      provideHttpClient(withInterceptors([AuthInterceptor])),
      provideHttpClientTesting(),
      { provide: Router, useValue: router },
      { provide: AUTH_SESSION_STORAGE, useValue: {
        getItem: () => saved,
        removeItem: () => { saved = null; }
      } }
    ] });
    const auth = TestBed.inject(AuthService);
    const http = TestBed.inject(HttpTestingController);
    TestBed.inject(HttpClient).get('/session-check').subscribe({ error: () => {} });
    const request = http.expectOne('/session-check');
    expect(request.request.headers.get('Authorization')).toBe('Bearer expired-token');
    request.flush({ message: 'Expired' }, { status: 401, statusText: 'Unauthorized' });
    expect(auth.employee()).toBeNull();
    expect(auth.token()).toBeNull();
    expect(saved).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    http.verify();
  });
});
