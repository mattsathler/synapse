import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../../@shared/auth/auth-service';
import { Home } from './home';

describe('Home', () => {
  for (const employee of [null, { name: 'Ana Silva' }, { name: '' }]) {
    it(`greets ${employee?.name || 'anonymous users'}`, () => {
      TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: AuthService, useValue: { employee: () => employee } }] });
      const component = TestBed.createComponent(Home).componentInstance;
      expect(component.employee).toBe(employee as any);
      expect(component.displayedName).toBe(employee?.name ? 'Ana' : 'Usuário');
    });
  }
});
