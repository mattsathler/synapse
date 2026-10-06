import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsClinicContact } from './settings-clinic-contact';

describe('SettingsClinicContact', () => {
  let component: SettingsClinicContact;
  let fixture: ComponentFixture<SettingsClinicContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsClinicContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsClinicContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('patches incoming clinic data and emits edited values', () => {
    component.clinic = { name: 'Clinic', email: 'clinic@example.com', address: 'Street', phone: '11987654321', isActive: true };
    component.ngOnChanges();
    expect(component.contactForm.value).toEqual({ phone: '11987654321', email: 'clinic@example.com' });
    const update = jasmine.createSpy('update');
    component.updateClinic.subscribe(update);
    component.emitUpdateClinic();
    expect(update).toHaveBeenCalledWith({ phone: '11987654321', email: 'clinic@example.com' });
  });
  it('keeps an empty form when no clinic is supplied', () => {
    component.clinic = null;
    component.ngOnChanges();
    expect(component.contactForm.invalid).toBeTrue();
  });

});
