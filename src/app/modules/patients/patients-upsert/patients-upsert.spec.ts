import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsUpsert } from './patients-upsert';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';

describe('PatientsUpsert', () => {
  let component: PatientsUpsert;
  let fixture: ComponentFixture<PatientsUpsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsUpsert],
      providers: [provideHttpClient(), provideRouter([]), provideNgxMask()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PatientsUpsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
