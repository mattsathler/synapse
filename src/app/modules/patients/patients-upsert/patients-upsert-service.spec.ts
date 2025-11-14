import { TestBed } from '@angular/core/testing';

import { PatientsUpsertService } from './patients-upsert-service';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Routes } from '@angular/router';
import { Patients } from '../patients';
import { PatientsUpsert } from './patients-upsert';
import { of } from 'rxjs';
import { Records } from '../records/records';

describe('PatientsUpsertService', () => {
  let service: PatientsUpsertService;
  const routes: Routes = [
    { path: 'pacientes/novo', component: PatientsUpsert },
    { path: 'pacientes/editar/:id', component: PatientsUpsert },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(
        [{
          path: 'pacientes',
          children: [
            { path: '', component: Patients },
            { path: 'detalhes/:id', component: Records },
            { path: 'novo', component: PatientsUpsert },
            { path: 'editar/:id', component: PatientsUpsert },
          ]
        }]), {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: { get: () => null }
          },
          params: of({})
        }
      },
      provideHttpClient()]
    })
    service = TestBed.inject(PatientsUpsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
