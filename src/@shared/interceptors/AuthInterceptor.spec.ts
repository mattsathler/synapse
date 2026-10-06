import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { AuthInterceptor } from './AuthInterceptor';

describe('AuthInterceptor', () => {
  for (const token of [null, 'test-token']) {
    describe(token ? 'authenticated' : 'anonymous', () => {
      let client: HttpClient;
      let http: HttpTestingController;
      let auth: { token: () => string | null; logout: jasmine.Spy };
      let router: jasmine.SpyObj<Router>;
      beforeEach(() => {
        auth = { token: () => token, logout: jasmine.createSpy('logout') };
        router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([AuthInterceptor])), provideHttpClientTesting(),
          { provide: AuthService, useValue: auth }, { provide: Router, useValue: router }] });
        client = TestBed.inject(HttpClient);
        http = TestBed.inject(HttpTestingController);
      });
      afterEach(() => http.verify());
      it('preserves request data and adds authorization when available', () => {
        client.post('/test', { value: 1 }, { headers: { 'X-Test': 'yes' } }).subscribe();
        const req = http.expectOne('/test');
        expect(req.request.headers.get('Authorization')).toBe(token ? `Bearer ${token}` : null);
        expect(req.request.headers.get('X-Test')).toBe('yes');
        expect(req.request.body).toEqual({ value: 1 });
        req.flush({});
        expect(auth.logout).not.toHaveBeenCalled();
      });
      for (const status of [401, 403, 500]) {
        it(`propagates ${status} and logs out only on 401`, () => {
          let error: HttpErrorResponse | undefined;
          client.get('/test').subscribe({ error: e => error = e });
          http.expectOne('/test').flush({ message: 'Denied' }, { status, statusText: 'Error' });
          expect(error?.status).toBe(status);
          if (status === 401) {
            expect(auth.logout).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
          } else {
            expect(auth.logout).not.toHaveBeenCalled();
            expect(router.navigate).not.toHaveBeenCalled();
          }
        });
      }
    });
  }
});
