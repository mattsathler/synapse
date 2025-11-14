import { Component, effect, OnInit, signal, Signal } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Patient } from '../../../../@shared/types/Patient';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient-service';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsUpsertService } from './patients-upsert-service';
import { NgxMaskDirective } from 'ngx-mask';
import { removeEmptyFields } from '../../../../@shared/validators/removeEmptyFields';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';

@Component({
  selector: 'app-patients-upsert',
  imports: [CommonModule, Header, SkeletonDirective, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './patients-upsert.html',
  styleUrl: './patients-upsert.scss',
  standalone: true,
})
export class PatientsUpsert implements OnInit {
  public isLoading = signal(false);

  public patient: Signal<Patient | null> | (() => null) = () => null;
  public patientId;
  public hasCompanion: boolean = false;

  public patientForm: FormGroup;

  constructor(private snackbarService: SnackbarService, private service: PatientsUpsertService, private patientService: PatientService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.patientId = this.activatedRoute.snapshot.params['id'] as string | null;
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

  public async submitForm(): Promise<void> {
    this.isLoading.set(true);
    let raw = this.patientForm.value;
    raw = removeEmptyFields(raw);

    let patient = { ...raw } as Patient;

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

    try {
      await this.patientService.savePatient(patient);
      if (this.patient()) {
        this.snackbarService.showMessage('Paciente atualizado com sucesso!');
      } else {
        this.snackbarService.showMessage('Paciente criado com sucesso!');
      }

      this.isLoading.set(false);
      this.router.navigate(['/pacientes']);

    } catch (error: any) {
      this.isLoading.set(false);
      this.snackbarService.showMessage(error.message || 'Ocorreu um erro');
    }
  }

  private injectDataIntoForm() {
    this.patientForm.patchValue(this.patient()!);
    this.patientForm.patchValue(this.patient()?.address!);
  }
}
