import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PatientService } from './patient-service';
import { SnackbarService } from '../../../@shared/components/snackbar/snackbar-service';
import { Patients } from './patients';

describe('Patients', () => {
  let component: Patients;
  let service: jasmine.SpyObj<PatientService>;
  let snackbar: jasmine.SpyObj<SnackbarService>;
  beforeEach(() => {
    service = jasmine.createSpyObj('PatientService', ['getPatientList'], { patientList: signal([]) });
    service.getPatientList.and.resolveTo();
    snackbar = jasmine.createSpyObj('SnackbarService', ['showMessage']);
    TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: PatientService, useValue: service }, { provide: SnackbarService, useValue: snackbar }] });
    component = TestBed.createComponent(Patients).componentInstance;
  });
  it('loads the first page on initialization', () => {
    component.ngOnInit();
    expect(service.getPatientList).toHaveBeenCalledWith('page=1');
  });
  it('loads requested pages with search and resets loading', async () => {
    const pending = component.fetchPatients(2, 'Ana');
    expect(component.isLoading()).toBeTrue();
    await pending;
    expect(service.getPatientList).toHaveBeenCalledWith('page=2&search=Ana');
    expect(component.isLoading()).toBeFalse();
  });
  for (const error of [new Error('Unavailable'), {}]) {
    it(`reports fetch failures ${JSON.stringify(error)}`, async () => {
      service.getPatientList.and.rejectWith(error);
      await component.fetchPatients(1);
      expect(snackbar.showMessage).toHaveBeenCalledWith(error instanceof Error ? error.message : 'Não foi possível carregar a lista de pacientes', 'error');
    });
  }
});
