import { TestBed } from '@angular/core/testing';
import { PatientsUpsertService } from './patients-upsert-service';
import { provideHttpClient } from '@angular/common/http';

describe('PatientsUpsertService', () => {
  let service: PatientsUpsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ]
    });

    service = TestBed.inject(PatientsUpsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});