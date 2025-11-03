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
});
