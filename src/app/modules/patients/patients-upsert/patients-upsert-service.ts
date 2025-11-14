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
