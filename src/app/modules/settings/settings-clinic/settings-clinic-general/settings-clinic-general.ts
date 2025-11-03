import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'settings-clinic-general',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './settings-clinic-general.html',
  styleUrl: './settings-clinic-general.scss'
})
export class SettingsClinicGeneral {
  public generalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    })
  }
}
