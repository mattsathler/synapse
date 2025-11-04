import { TestBed } from '@angular/core/testing';

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
    service.getPatientById('1').subscribe((patient) => {
      if (patient) {
        expect(patient).toBeTruthy();
        expect(patient.id).toBeDefined();
        expect(patient.fullName).toBeDefined();
      }
      done();
    });
  });

  it('should get a list of patient', (done) => {
    service.getPatientList().subscribe((patient) => {
      expect(patient).toBeTruthy();
      expect(Array.isArray(patient)).toBeTruthy();
      done();
    });
  });
});
