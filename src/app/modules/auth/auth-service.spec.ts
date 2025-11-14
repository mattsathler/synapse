import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { provideHttpClient } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;
  let fixture: ComponentFixture<Login>;
  let component: Login;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
