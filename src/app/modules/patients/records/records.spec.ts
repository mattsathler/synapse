import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Records } from './records';
import { provideRouter, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Records', () => {
  let component: Records;
  let fixture: ComponentFixture<Records>;
  const routes: Routes = [
    { path: 'pacientes/:id', component: Records },
  ]

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Records],
        providers: [provideRouter(routes), provideHttpClient()]
      })
        .compileComponents();

    fixture = TestBed.createComponent(Records);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id from parameter', async () => {
    const harness = await RouterTestingHarness.create();
    const fixture = await harness.navigateByUrl('/pacientes/2', Records);

    expect(fixture.patientRegistration).toBe('2');
  })
});
