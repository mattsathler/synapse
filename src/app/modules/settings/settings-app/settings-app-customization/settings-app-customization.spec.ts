import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SettingsAppCustomization } from './settings-app-customization';

describe('SettingsAppCustomization', () => {
  let component: SettingsAppCustomization;
  let fixture: ComponentFixture<SettingsAppCustomization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAppCustomization]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsAppCustomization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
