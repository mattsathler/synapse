import { Component, effect, OnInit, Signal } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Patient } from '../../../../@shared/types/Patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient-service';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsUpsertService } from './patients-upsert-service';

@Component({
  selector: 'app-patients-upsert',
  imports: [CommonModule, Header, SkeletonDirective, FormsModule, ReactiveFormsModule],
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
        if (patientData) {
          this.injectDataIntoForm();
        }
      });
    } else {
      this.patient = () => null;
    }
  }

  ngOnInit() { }

  private injectDataIntoForm() {
    this.patientForm.patchValue(this.patient()!);
  }
}
