import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'settings-clinic-contact',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings-clinic-contact.html',
  styleUrl: './settings-clinic-contact.scss'
})
export class SettingsClinicContact {
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      main_phone: ['', Validators.required],
      secondary_phone: ['', Validators.required],
    })
  }
}