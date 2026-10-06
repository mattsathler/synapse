import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthService } from '../@shared/auth/auth-service';
import { ThemeService } from './theme-service';
import { Home } from './modules/home/home';
import { Login } from './modules/login/login';
import { routes } from './app.routes';

describe('Application routing', () => {
  let employee: { name: string } | null;
  beforeEach(() => {
    employee = null;
    TestBed.configureTestingModule({ providers: [
      provideRouter(routes),
      { provide: AuthService, useValue: { employee: () => employee } },
      { provide: ThemeService, useValue: { theme: () => 'light' } }
    ] });
  });
  for (const path of ['/home', '/pacientes', '/pacientes/novo', '/pacientes/editar/1', '/pacientes/detalhes/1', '/agenda', '/ajustes/clinica', '/ajustes/app', '/ajustes/agendamentos', '/ajustes/funcionarios', '/financeiro/dashboard', '/financeiro/contas', '/financeiro/contas/1']) {
    it(`redirects anonymous users from ${path} to login`, async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(path, Login);
      expect(TestBed.inject(Router).url).toBe('/login');
    });
  }
  it('opens home from the root URL for authenticated employees', async () => {
    employee = { name: 'Ana Silva' };
    const harness = await RouterTestingHarness.create();
    const home = await harness.navigateByUrl('/', Home);
    expect(TestBed.inject(Router).url).toBe('/home');
    expect(home.displayedName).toBe('Ana');
  });
});
