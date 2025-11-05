import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PatientService } from './patient-service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single patient by his Id', (done) => {
    service.getPatientList('1');

    service.patient$.subscribe((patient) => {
      if (patient) {
        expect(patient).toBeTruthy();
        expect(patient.id).toBeDefined();
        expect(patient.fullName).toBeDefined();
      }
      done();
    });
  });

  it('should get a list of patients', fakeAsync(() => {
    service.getPatientList();

    tick(3000)
    service.patientList$.subscribe((patientList) => {
      expect(patientList).toBeTruthy();
      expect(Array.isArray(patientList)).toBeTruthy();
    });
  }));
});
