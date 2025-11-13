import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientsUpsertService {
  constructor(private fb: FormBuilder) { }
  
  public getPatientFormBuilder(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      socialName: [''],
      birthDate: ['', Validators.required],
      gender: ['Other', Validators.required],
      identification: ['', Validators.required],
      image: [''],
      phone: ['', Validators.required],
      secondaryPhone: [''],
      cellphone: ['', Validators.required],
      secondaryCellphone: [''],
      email: ['', [, Validators.required, Validators.email]],
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
