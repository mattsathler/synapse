import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsUpsert } from './patients-upsert';
import { provideHttpClient } from '@angular/common/http';

describe('PatientsUpsert', () => {
  let component: PatientsUpsert;
  let fixture: ComponentFixture<PatientsUpsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsUpsert],
      providers: [provideHttpClient()]
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
