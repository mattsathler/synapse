import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { SettingsClinicService } from './settings-clinic-service';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { SettingsClinic } from './settings-clinic';

describe('SettingsClinic', () => {
  let component: SettingsClinic;
  let service: jasmine.SpyObj<SettingsClinicService>;
  let snackbar: jasmine.SpyObj<SnackbarService>;
  const clinic = { id: '1', name: 'Clinic', email: 'clinic@example.com', isActive: true };
  beforeEach(() => {
    service = jasmine.createSpyObj('SettingsClinicService', ['patchClinic'], { clinic: signal<any>(clinic), isLoading: signal(false) });
    service.patchClinic.and.resolveTo();
    snackbar = jasmine.createSpyObj('SnackbarService', ['showMessage']);
    TestBed.configureTestingModule({ providers: [{ provide: SettingsClinicService, useValue: service }, { provide: SnackbarService, useValue: snackbar }] });
    component = TestBed.createComponent(SettingsClinic).componentInstance;
  });
  it('updates clinic and reports success', async () => {
    await component.updateClinic(clinic);
    expect(service.patchClinic).toHaveBeenCalledWith('1', clinic);
    expect(snackbar.showMessage).toHaveBeenCalledWith('Clínica atualizada com sucesso');
  });
  for (const value of [null, { ...clinic, id: undefined }]) {
    it(`rejects missing clinic identifiers ${JSON.stringify(value)}`, async () => {
      (service.clinic as any).set(value);
      await component.updateClinic(clinic);
      expect(service.patchClinic).not.toHaveBeenCalled();
      expect(snackbar.showMessage).toHaveBeenCalledWith('Clínica inválida', 'error');
    });
  }
  it('does not report success if updating rejects', async () => {
    service.patchClinic.and.rejectWith(new Error('Failed'));
    await component.updateClinic(clinic);
    expect(snackbar.showMessage).not.toHaveBeenCalled();
  });
});
