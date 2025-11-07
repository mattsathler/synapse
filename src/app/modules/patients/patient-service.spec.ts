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

    if (service.patient()) {
      expect(service.patient()).toBeTruthy();
      expect(service.patient()?.id).toBeDefined();
      expect(service.patient()?.fullName).toBeDefined();
    }
    done();
  });

  it('should get a list of patients', fakeAsync(() => {
    service.getPatientList();

    tick(3000)
    expect(service.patientList()).toBeTruthy();
    expect(Array.isArray(service.patientList())).toBeTruthy();
  }));
});
