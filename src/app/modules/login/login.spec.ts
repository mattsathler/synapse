import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importe o Router real
import { Component } from '@angular/core';

// Crie o Router Spy (Mock) fora do describe para clareza
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  // Declare o Router Spy aqui para uso
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerSpy } // ✅ Fornece o mock do Router
      ]
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    router.navigate.calls.reset();

    localStorage.setItem('employee', JSON.stringify({
      name: 'Rafael Monteiro',
      email: 'rafael.monteiro@auroraclinic.com',
      role: 'doctor',
      isActive: true,
    }));

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect when loggedIn', () => {
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});