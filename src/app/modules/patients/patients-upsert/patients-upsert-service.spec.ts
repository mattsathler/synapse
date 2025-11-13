import { TestBed } from '@angular/core/testing';

import { PatientsUpsertService } from './patients-upsert-service';

describe('PatientsUpsertService', () => {
  let service: PatientsUpsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsUpsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
