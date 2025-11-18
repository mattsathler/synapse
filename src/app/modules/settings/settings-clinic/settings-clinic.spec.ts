import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsClinic } from './settings-clinic';
import { provideHttpClient } from '@angular/common/http';

describe('SettingsClinic', () => {
  let component: SettingsClinic;
  let fixture: ComponentFixture<SettingsClinic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsClinic],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsClinic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
