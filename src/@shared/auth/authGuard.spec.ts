import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';
import { authGuard } from './authGuard';

describe('authGuard', () => {
  for (const loggedIn of [true, false]) {
    it(loggedIn ? 'allows authenticated employees' : 'redirects anonymous users', () => {
      const router = jasmine.createSpyObj('Router', ['navigate']);
      TestBed.configureTestingModule({ providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: { employee: () => loggedIn ? { id: '1' } : null } }
      ] });
      expect(TestBed.runInInjectionContext(() => authGuard())).toBe(loggedIn);
      if (loggedIn) expect(router.navigate).not.toHaveBeenCalled();
      else expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  }
});
