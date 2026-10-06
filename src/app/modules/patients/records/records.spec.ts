import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { PatientService } from '../patient-service';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { Record } from '../../../../@shared/types/Record';
import { Patient } from '../../../../@shared/types/Patient';
import { Records } from './records';

describe('Records', () => {
  let component: Records;
  let service: jasmine.SpyObj<PatientService>;
  let router: jasmine.SpyObj<Router>;
  let snackbar: jasmine.SpyObj<SnackbarService>;
  const record = { date: '2026-01-01', time: '09:00', content: 'Notes' } as Record;
  const patient = { registration: '1', records: [record] } as Patient;
  beforeEach(() => {
    service = jasmine.createSpyObj('PatientService', ['getPatientById', 'createNewRecord'], { patient: signal<Patient | null>(patient) });
    service.getPatientById.and.resolveTo();
    service.createNewRecord.and.resolveTo();
    router = jasmine.createSpyObj('Router', ['navigate']);
    snackbar = jasmine.createSpyObj('SnackbarService', ['showMessage']);
    TestBed.configureTestingModule({ providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } } },
      { provide: PatientService, useValue: service }, { provide: Router, useValue: router }, { provide: SnackbarService, useValue: snackbar }
    ] });
    component = TestBed.createComponent(Records).componentInstance;
  });
  it('loads patient from route and groups records', fakeAsync(() => {
    component.ngOnInit();
    expect(component.patientRegistration).toBe('1');
    expect(component.isLoading()).toBeTrue();
    tick();
    expect(service.getPatientById).toHaveBeenCalledWith('1');
    expect(component.orderedRecords).toEqual([{ date: record.date, records: [record] }]);
    expect(component.isLoading()).toBeFalse();
  }));
  it('does not load without a route registration', () => {
    component.patientRegistration = null;
    component.ngOnInit();
    expect(service.getPatientById).not.toHaveBeenCalled();
  });
  it('redirects and reports failed patient loading', fakeAsync(() => {
    service.getPatientById.and.rejectWith(new Error('Missing'));
    component.ngOnInit(); tick();
    expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
    expect(snackbar.showMessage).toHaveBeenCalledWith('Missing', 'error');
  }));
  it('closes modal, saves and groups records', async () => {
    component.modalOpen = true;
    await component.createNewRecord(record);
    expect(component.modalOpen).toBeFalse();
    expect(service.createNewRecord).toHaveBeenCalledWith('1', record);
    expect(snackbar.showMessage).toHaveBeenCalledWith('Prontuário criado com sucesso');
    expect(component.orderedRecords).toEqual([{ date: record.date, records: [record] }]);
  });
  it('does not save without an active patient', async () => {
    (service.patient as any).set(null);
    await component.createNewRecord(record);
    expect(service.createNewRecord).not.toHaveBeenCalled();
  });
  it('reports record creation errors', async () => {
    service.createNewRecord.and.rejectWith(new Error('Failed'));
    await component.createNewRecord(record);
    expect(snackbar.showMessage).toHaveBeenCalledWith('Failed', 'error');
  });
  it('prints records', () => {
    spyOn(window, 'print');
    component.printRecords();
    expect(window.print).toHaveBeenCalled();
  });
});
