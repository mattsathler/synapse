import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { Login } from '../login/login';


describe('AuthService', () => {
  let service: AuthService;
  let fixture: ComponentFixture<Login>;
  let component: Login;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);

    localStorage.setItem('user', JSON.stringify({
      name: 'Rafael Monteiro',
      email: 'rafael.monteiro@auroraclinic.com',
      role: 'doctor',
      isActive: true,
    }));

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect when loggedIn', () => {
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
