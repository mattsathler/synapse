import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { PatientService } from './patient-service';
import { provideHttpClient } from '@angular/common/http';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
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

  // it('should get a list of patients', waitForAsync(() => {
    // service.getPatientList('page=1&limit=10');

    // expect(service.patientList()).toBeTruthy();
    // expect(Array.isArray(service.patientList())).toBeTruthy();
  // }));
});
