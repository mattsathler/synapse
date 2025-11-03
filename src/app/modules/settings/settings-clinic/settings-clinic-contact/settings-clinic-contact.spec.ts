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
});
