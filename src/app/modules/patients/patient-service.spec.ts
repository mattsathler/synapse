import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { PatientService } from './patient-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Patient } from '../../../@shared/types/Patient';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  const mockedPatient: Patient = {
    id: '1',
    fullName: "Testovaldo",
    records: [],
    address: {
      city: "Testovania",
      complement: "Ao lado do teste",
      neighborhood: "Testobairro",
      number: "2",
      postalCode: "1223123",
      state: "Estadoteste",
      street: "Rua dos Testes"
    },
    registration: "1",
    age: 20
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single patient by his Id', fakeAsync(() => {
    const mockPatient = {
      id: '1',
      fullName: 'Júlio César',
      birthDate: '1990-01-01'
    };

    service.getPatientById(mockPatient.id);

    const req = httpMock.expectOne(`${environment.API_URL}/patients/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);

    tick();
    expect(service.patient()).toBeTruthy();
    expect(service.patient()?.id).toBe('1');
    expect(service.patient()?.fullName).toBe('Júlio César');
    expect(service.patientCache.get(mockPatient.id)).toBeTruthy();
    expect(service.patientCache.get(mockPatient.id)?.fullName).toEqual(mockPatient.fullName);
  }));

  it('should get a list of patients', fakeAsync(() => {
    service.getPatientList('page=1&limit=10');
    const mockPatient = {
      count: 1, data: [{
        id: '1',
        fullName: 'Júlio César',
        birthDate: '1990-01-01'
      }]
    };

    const req = httpMock.expectOne(`${environment.API_URL}/patients/?page=1&limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);

    tick();
    expect(service.patientList()).toBeTruthy();
    expect(Array.isArray(service.patientList())).toBeTruthy();
    expect(service.patientList().length).toEqual(1);
    expect(service.patientListCache.get('page=1&limit=10')?.length).toEqual(1);
  }));

  it('should use the cache and NOT make a new HTTP request', fakeAsync(() => {
    const testQuery = 'page=1&limit=10';
    service.patientListCache.set(testQuery, [mockedPatient]);

    service.getPatientList(testQuery);
    expect(service.patientList()).toEqual([mockedPatient]);
    httpMock.expectNone(req => req.url.includes(testQuery));
  }));
});
