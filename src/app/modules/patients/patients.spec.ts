import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patients } from './patients';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('Patients', () => {
  let component: Patients;
  let fixture: ComponentFixture<Patients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patients],
      providers: [provideRouter([]), provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Patients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
