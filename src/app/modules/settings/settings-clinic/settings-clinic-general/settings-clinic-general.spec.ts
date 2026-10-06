import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsClinicGeneral } from './settings-clinic-general';

describe('SettingsClinicGeneral', () => {
  let component: SettingsClinicGeneral;
  let fixture: ComponentFixture<SettingsClinicGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsClinicGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsClinicGeneral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('patches incoming clinic data and emits edited values', () => {
    component.clinic = { name: 'Clinic', email: 'clinic@example.com', address: 'Street', phone: '11987654321', isActive: true };
    component.ngOnChanges();
    expect(component.generalForm.value).toEqual({ name: 'Clinic', address: 'Street' });
    const update = jasmine.createSpy('update');
    component.updateClinic.subscribe(update);
    component.emitUpdateClinic();
    expect(update).toHaveBeenCalledWith({ name: 'Clinic', address: 'Street' });
  });
  it('keeps an empty form when no clinic is supplied', () => {
    component.clinic = null;
    component.ngOnChanges();
    expect(component.generalForm.invalid).toBeTrue();
  });

});
