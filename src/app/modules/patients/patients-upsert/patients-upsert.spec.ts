import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { PatientService } from '../patient-service';
import { Patient } from '../../../../@shared/types/Patient';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { PatientsUpsert } from './patients-upsert';

describe('PatientsUpsert', () => {
  let component: PatientsUpsert;
  let service: jasmine.SpyObj<PatientService>;
  let router: jasmine.SpyObj<Router>;
  let snackbar: jasmine.SpyObj<SnackbarService>;
  let params: { id?: string };
  const patient = { registration: '1', fullName: 'Ana', address: { street: 'Rua', number: '1', city: 'SP', postalCode: '123', state: 'SP', neighborhood: 'Centro', complement: 'A' } } as Patient;
  beforeEach(() => {
    service = jasmine.createSpyObj('PatientService', ['savePatient', 'getPatientById'], { patient: signal<Patient | null>(null) });
    service.savePatient.and.resolveTo();
    service.getPatientById.and.resolveTo();
    router = jasmine.createSpyObj('Router', ['navigate']);
    snackbar = jasmine.createSpyObj('SnackbarService', ['showMessage']);
    params = {};
    TestBed.configureTestingModule({ providers: [provideNgxMask(),
      { provide: ActivatedRoute, useValue: { snapshot: { params } } },
      { provide: PatientService, useValue: service }, { provide: Router, useValue: router }, { provide: SnackbarService, useValue: snackbar }
    ] });
    component = TestBed.createComponent(PatientsUpsert).componentInstance;
  });
  it('starts a new patient with no fetch', () => {
    expect(component.patient()).toBeNull();
    expect(component.isLoading()).toBeFalse();
    expect(service.getPatientById).not.toHaveBeenCalled();
  });
  it('loads and patches patient and address data for editing', () => {
    params.id = '1';
    const fixture = TestBed.createComponent(PatientsUpsert);
    component = fixture.componentInstance;
    expect(component.isLoading()).toBeTrue();
    expect(service.getPatientById).toHaveBeenCalledWith('1');
    (service.patient as any).set({ ...patient, registration: 'other' });
    TestBed.tick();
    expect(component.isLoading()).toBeTrue();
    (service.patient as any).set(patient);
    TestBed.tick();
    expect(component.patientForm.get('fullName')?.value).toBe('Ana');
    expect(component.patientForm.get('street')?.value).toBe('Rua');
    expect(component.isLoading()).toBeFalse();
  });
  it('nests address fields, removes empty fields and navigates after creation', async () => {
    component.patientForm.patchValue({ fullName: 'Ana', ...patient.address });
    const pending = component.submitForm();
    expect(component.isLoading()).toBeTrue();
    await pending;
    const payload = service.savePatient.calls.mostRecent().args[0];
    expect(payload.fullName).toBe('Ana');
    expect(payload.address).toEqual(patient.address);
    expect((payload as any).street).toBeUndefined();
    expect(payload.socialName).toBeUndefined();
    expect(snackbar.showMessage).toHaveBeenCalledWith('Paciente criado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
    expect(component.isLoading()).toBeFalse();
  });
  it('reports a successful update', async () => {
    component.patient = signal(patient);
    await component.submitForm();
    expect(snackbar.showMessage).toHaveBeenCalledWith('Paciente atualizado com sucesso!');
  });
  for (const error of [new Error('Failed'), {}]) {
    it(`reports save errors and stays on the form ${JSON.stringify(error)}`, async () => {
      service.savePatient.and.rejectWith(error);
      await component.submitForm();
      expect(component.isLoading()).toBeFalse();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(snackbar.showMessage).toHaveBeenCalledWith(error instanceof Error ? error.message : 'Ocorreu um erro');
    });
  }
});
