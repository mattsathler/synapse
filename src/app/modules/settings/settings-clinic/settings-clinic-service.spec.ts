import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { SettingsClinicService } from './settings-clinic-service';

describe('SettingsClinicService', () => {
  let service: SettingsClinicService;
  let http: HttpTestingController;
  let snackbar: jasmine.SpyObj<SnackbarService>;
  const clinic = { name: 'Clinic', email: 'clinic@example.com', isActive: true };
  beforeEach(() => {
    snackbar = jasmine.createSpyObj('SnackbarService', ['showMessage']);
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), { provide: SnackbarService, useValue: snackbar }] });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SettingsClinicService);
  });
  afterEach(() => http.verify());
  it('fetches clinic on construction and resets loading', fakeAsync(() => {
    expect(service.isLoading()).toBeTrue();
    http.expectOne(`${environment.API_URL}/clinics/`).flush(clinic); tick();
    expect(service.clinic()).toEqual(clinic);
    expect(service.isLoading()).toBeFalse();
  }));
  it('reports fetch errors and resets loading', fakeAsync(() => {
    http.expectOne(`${environment.API_URL}/clinics/`).flush({ message: 'Failed' }, { status: 500, statusText: 'Error' }); tick();
    expect(service.clinic()).toBeNull();
    expect(service.isLoading()).toBeFalse();
    expect(snackbar.showMessage).toHaveBeenCalledWith('Failed', 'error');
  }));
  it('patches clinic and publishes the response', fakeAsync(() => {
    http.expectOne(`${environment.API_URL}/clinics/`).flush(clinic); tick();
    const updated = { ...clinic, name: 'Updated' };
    service.patchClinic('1', updated);
    expect(service.isLoading()).toBeTrue();
    const req = http.expectOne(`${environment.API_URL}/clinics/`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updated);
    req.flush(updated); tick();
    expect(service.clinic()).toEqual(updated);
    expect(service.isLoading()).toBeFalse();
  }));
  it('preserves clinic on failed update and reports errors', fakeAsync(() => {
    http.expectOne(`${environment.API_URL}/clinics/`).flush(clinic); tick();
    service.patchClinic('1', clinic);
    http.expectOne(`${environment.API_URL}/clinics/`).flush({ message: 'Denied' }, { status: 403, statusText: 'Denied' }); tick();
    expect(service.clinic()).toEqual(clinic);
    expect(service.isLoading()).toBeFalse();
    expect(snackbar.showMessage).toHaveBeenCalledWith('Denied', 'error');
  }));
});
