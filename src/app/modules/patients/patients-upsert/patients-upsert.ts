import { Component, effect, OnInit, Signal } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Patient } from '../../../../@shared/types/Patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient-service';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsUpsertService } from './patients-upsert-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-patients-upsert',
  imports: [CommonModule, Header, SkeletonDirective, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './patients-upsert.html',
  styleUrl: './patients-upsert.scss'
})
export class PatientsUpsert implements OnInit {
  public patient: Signal<Patient | null> | (() => null) = () => null;
  public patientId;
  public hasCompanion: boolean = false;
  public isLoading;

  public patientForm: FormGroup;

  constructor(private service: PatientsUpsertService, private patientService: PatientService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.patientId = this.activatedRoute.snapshot.params['id'] as string | null;
    this.isLoading = this.patientService.isLoading;

    this.patientForm = this.service.getPatientFormBuilder();

    if (this.patientId) {
      this.patient = this.patientService.patient;
      this.patientService.getPatientById(this.patientId || '');

      effect(() => {
        const patientData = this.patient();
        if (patientData && patientData.registration === this.patientId) {
          this.injectDataIntoForm();
        }
      });
    } else {
      this.patient = () => null;
    }
  }

  ngOnInit() { }

  public submitForm(): void {
    const raw = this.patientForm.value;
    const patient = { ...raw } as Patient & Record<string, any>;

    patient.address = {
      street: raw.street,
      number: raw.number,
      complement: raw.complement,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      postalCode: raw.postalCode
    };

    ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postalCode']
      .forEach(k => delete (patient as any)[k]);

    if (!this.patient()) {
      this.service.createNewPatient(patient);
      return;
    }

    if (this.patientId) {
      this.service.updatePatient(this.patientId, patient);
      return;
    }
  }
  
  private injectDataIntoForm() {
    this.patientForm.patchValue(this.patient()!);
    this.patientForm.patchValue(this.patient()?.address!);
  }
}
