import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SettingsClinicService } from './settings-clinic-service';
import { provideHttpClient } from '@angular/common/http';
import { Clinic } from '../../../../@shared/types/Clinic';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';

describe('SettingsClinicService', () => {
  let service: SettingsClinicService;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SettingsClinicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should update signals when fetching is complete', fakeAsync(() => {
    const mock: Clinic = {
      name: "teste",
      email: "sad@teste",
      cnpj: "12.345.678/0001-90",
      address: "Rua Teste, 321",
      isActive: true
    };
    // service.fetchClinic();
    expect(service.isLoading()).toBe(true);

    const req = httpMock.expectOne(`${environment.API_URL}/clinics/`);
    expect(req.request.method).toBe('GET');

    req.flush(mock);
    tick();

    expect(service.clinic()).toEqual(mock)
    expect(service.isLoading()).toBe(false);
  }))
});
