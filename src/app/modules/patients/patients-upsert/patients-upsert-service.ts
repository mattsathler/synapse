import { computed, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../@shared/services/http-service';
import { Patient } from '../../../../@shared/types/Patient';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { removeEmptyFields } from '../../../../@shared/validators/removeEmptyFields';
import { PatientService } from '../patient-service';

@Injectable({
  providedIn: 'root'
})
export class PatientsUpsertService {
  constructor(private fb: FormBuilder, private httpService: HttpService, private snackbarService: SnackbarService, private router: Router, private patientService: PatientService) { }

  // signals ---
  public _isLoading = signal(false);
  public isLoading = computed(() => this._isLoading());


  public async createNewPatient(patient: Patient): Promise<void> {
    this._isLoading.set(true);

    try {
      await firstValueFrom(this.httpService.post('/patients', patient))
      this.snackbarService.showNessage('Paciente criado com sucesso!');
      this.router.navigate(['pacientes']);
      this.patientService.getPatientList('', true);
    } catch (error: any) {
      this.snackbarService.showNessage(error?.message, 'error');
    }
  }

  public async updatePatient(id: string, patient: Patient): Promise<void> {
    this._isLoading.set(true);
    const data = removeEmptyFields(patient);

    try {
      await firstValueFrom(this.httpService.patch(`/patients/${id}`, data))
      this.snackbarService.showNessage('Paciente atualizado com sucesso!');
      this.router.navigate(['pacientes']);
      this.patientService.getPatientList('', true);
    } catch (error: any) {
      this.snackbarService.showNessage(error?.message, 'error');
    }
  }

  public getPatientFormBuilder(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['Other', Validators.required],
      identification: ['', Validators.required],
      mainPhone: ['', Validators.required],
      mainCellphone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postalCode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: ['', Validators.required],
      socialName: [''],
      image: [''],
      secondaryPhone: [''],
      secondaryCellphone: [''],
      insuranceType: [''],
      insuranceCode: [''],
      cnsNumber: [''],
      medicalRecordNumber: [''],
      registrationNumber: [''],
      company: [''],
      reference: [''],
      referredBy: [''],
      maritalStatus: [''],
      profession: [''],
      educationLevel: [''],
      fatherName: [''],
      motherName: [''],
      children: [''],
      companion: [''],
      spouse: [''],
      notes: [''],
    });
  }
}
