import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../../@shared/auth/auth-service';
import { ThemeService } from '../../theme-service';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    auth = jasmine.createSpyObj('AuthService', ['auth', 'employee']);
    auth.employee.and.returnValue(null);
    auth.auth.and.resolveTo();
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useValue: auth }, { provide: Router, useValue: router },
      { provide: ThemeService, useValue: { theme: () => 'light' } }
    ] });
    component = TestBed.createComponent(Login).componentInstance;
  });
  it('requires a valid email and password', () => {
    expect(component.loginForm.valid).toBeFalse();
    component.loginForm.setValue({ email: 'invalid', password: 'secret' });
    expect(component.loginForm.get('email')?.hasError('email')).toBeTrue();
    component.loginForm.patchValue({ email: 'ana@example.com' });
    expect(component.loginForm.valid).toBeTrue();
  });
  it('keeps anonymous employees on the login page', () => {
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  it('redirects authenticated employees', () => {
    auth.employee.and.returnValue({ id: '1' } as any);
    component = TestBed.createComponent(Login).componentInstance;
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('submits credentials and resets loading on success', async () => {
    component.loginForm.setValue({ email: 'ana@example.com', password: 'secret' });
    const pending = component.login();
    expect(component.isLoading).toBeTrue();
    await pending;
    expect(auth.auth).toHaveBeenCalledWith('ana@example.com', 'secret');
    expect(component.isLoading).toBeFalse();
  });
  it('displays authentication errors and resets loading', async () => {
    auth.auth.and.rejectWith(new Error('Invalid credentials'));
    await component.login();
    expect(component.error).toBe('Invalid credentials');
    expect(component.isLoading).toBeFalse();
  });
});
