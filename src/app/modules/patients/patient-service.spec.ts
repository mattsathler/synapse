import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { PatientService } from './patient-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Patient } from '../../../@shared/types/Patient';
import { Record } from '../../../@shared/types/Record';

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

  const mockRecord: Record = {
    id: '1',
    author: {
      name: "Administrador",
      email: "adm@synapse.com",
      id: "1",
      identification: "1231241342",
      isMedic: false,
      mainPhone: "21993242340",
      position: "Gestor",
      tasks: []
    },
    content: '',
    date: "2025-11-15",
    time: "15:30"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.isLoading()).toBeFalse();
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

  it('should create new record', async () => {
    const patientPromise = service.getPatientById('1');
    const patientReq = httpMock.expectOne(`${environment.API_URL}/patients/1`);
    patientReq.flush(mockedPatient);

    await patientPromise;

    const recordPromise = service.createNewRecord(mockedPatient.registration, mockRecord)
    const req = httpMock.expectOne(`${environment.API_URL}/patients/1/records`);
    req.flush(mockRecord);

    await recordPromise;

    expect(service.patientCache.get('1')?.records).toBeTruthy();
    expect(service.patientCache.get('1')?.records.length).toBeGreaterThan(0);
  })

  afterEach(() => httpMock.verify());
  it('uses a cached patient, including cached null', async () => {
    service.patientCache.set('1', mockedPatient);
    await service.getPatientById('1');
    expect(service.patient()).toBe(mockedPatient);
    service.patientCache.set('missing', null);
    await service.getPatientById('missing');
    expect(service.patient()).toBeNull();
    httpMock.expectNone(() => true);
  });
  it('refreshes a cached patient when requested', async () => {
    service.patientCache.set('1', mockedPatient);
    const pending = service.getPatientById('1', true);
    const updated = { ...mockedPatient, fullName: 'Updated' };
    httpMock.expectOne(`${environment.API_URL}/patients/1`).flush(updated);
    await pending;
    expect(service.patient()).toEqual(updated);
    expect(service.patientCache.get('1')).toEqual(updated);
  });
  it('refreshes a cached list and caches empty results', async () => {
    service.patientListCache.set('', [mockedPatient]);
    const pending = service.getPatientList('', true);
    httpMock.expectOne(`${environment.API_URL}/patients/?`).flush({ data: [] });
    await pending;
    expect(service.patientList()).toEqual([]);
    await service.getPatientList('');
    httpMock.expectNone(() => true);
  });
  it('creates patients with empty fields removed and refreshes the list', fakeAsync(() => {
    const patient = { ...mockedPatient, registration: '', socialName: '' };
    service.savePatient(patient);
    const req = httpMock.expectOne(`${environment.API_URL}/patients`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.registration).toBeUndefined();
    expect(req.request.body.socialName).toBeUndefined();
    req.flush({}); tick();
    httpMock.expectOne(`${environment.API_URL}/patients/?`).flush({ data: [mockedPatient] }); tick();
    expect(service.patientList()).toEqual([mockedPatient]);
    expect(patient.socialName).toBe('');
  }));
  it('updates registered patients and refreshes patient and list caches', fakeAsync(() => {
    service.savePatient(mockedPatient);
    const req = httpMock.expectOne(`${environment.API_URL}/patients/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush({}); tick();
    httpMock.expectOne(`${environment.API_URL}/patients/1`).flush(mockedPatient);
    httpMock.expectOne(`${environment.API_URL}/patients/?`).flush({ data: [mockedPatient] }); tick();
    expect(service.patient()).toEqual(mockedPatient);
  }));
  it('propagates save failures without refreshing caches', async () => {
    const pending = service.savePatient(mockedPatient);
    const assertion = expectAsync(pending).toBeRejectedWith({ message: 'Failed' });
    httpMock.expectOne(`${environment.API_URL}/patients/1`).flush({ message: 'Failed' }, { status: 500, statusText: 'Error' });
    await assertion;
    httpMock.expectNone(() => true);
  });
  it('prepends records to the active patient without mutating old records', async () => {
    const old = { ...mockedPatient, records: [mockRecord] };
    service.patientCache.set('1', old);
    await service.getPatientById('1');
    const added = { ...mockRecord, id: '2' };
    const pending = service.createNewRecord('1', added);
    httpMock.expectOne(`${environment.API_URL}/patients/1/records`).flush(added);
    await pending;
    expect(service.patient()?.records).toEqual([added, mockRecord]);
    expect(old.records).toEqual([mockRecord]);
  });
  it('does not replace another active patient when adding a record', async () => {
    service.patientCache.set('1', mockedPatient);
    const other = { ...mockedPatient, registration: '2' };
    service.patientCache.set('2', other);
    await service.getPatientById('2');
    const pending = service.createNewRecord('1', mockRecord);
    httpMock.expectOne(`${environment.API_URL}/patients/1/records`).flush(mockRecord);
    await pending;
    expect(service.patient()).toBe(other);
    expect(service.patientCache.get('1')?.records).toEqual([mockRecord]);
  });
  it('creates records even when the patient is not cached', async () => {
    const pending = service.createNewRecord('missing', mockRecord);
    httpMock.expectOne(`${environment.API_URL}/patients/missing/records`).flush(mockRecord);
    await pending;
    expect(service.patientCache.has('missing')).toBeFalse();
    expect(service.patient()).toBeNull();
  });

});
