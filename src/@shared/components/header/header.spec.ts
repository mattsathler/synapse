import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  it('renders title and subtitle and navigates using the back button', () => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: router }] });
    const fixture = TestBed.createComponent(Header);
    fixture.componentInstance.title = 'Patient';
    fixture.componentInstance.subtitle = 'Details';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toBe('Patient');
    expect(fixture.nativeElement.querySelector('h3').textContent).toBe('Details');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    fixture.componentInstance.returnUrl = '/pacientes';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
  });
});
