import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clinic } from '../../../../../@shared/types/Clinic';
import { SkeletonDirective } from '../../../../../@shared/directives/skeleton';

@Component({
  selector: 'settings-clinic-contact',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SkeletonDirective],
  templateUrl: './settings-clinic-contact.html',
  styleUrl: './settings-clinic-contact.scss'
})
export class SettingsClinicContact implements OnChanges {
  @Input()
  clinic: Clinic | null = null;

  @Output()
  updateClinic = new EventEmitter<Clinic>;

  public contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnChanges() {
    if (this.clinic) {
      this.contactForm.patchValue(this.clinic);
    }
  }

  public emitUpdateClinic(): void {
    this.updateClinic.emit(this.contactForm.value as Clinic);
  }
}