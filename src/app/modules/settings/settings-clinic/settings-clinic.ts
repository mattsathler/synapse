import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasFormChanged } from '../../../../@shared/validators/hasFormChanged';

@Component({
  selector: 'app-settings-clinic',
  imports: [Header, FormsModule, ReactiveFormsModule],
  templateUrl: './settings-clinic.html',
  styleUrl: './settings-clinic.scss'
})
export class SettingsClinic {
  public clinicForm: FormGroup;
  public initialValue: any;

  constructor(private fb: FormBuilder) {
    this.clinicForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      main_phone: ['', Validators.required],
      secondary_phone: ['', Validators.required],
    })

    this.initialValue = this.clinicForm.getRawValue();
  }

  get isChanged(): boolean {
    return hasFormChanged(this.clinicForm, this.initialValue);
  }
}
