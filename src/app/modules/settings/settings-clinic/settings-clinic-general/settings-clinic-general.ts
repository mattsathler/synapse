import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clinic } from '../../../../../@shared/types/Clinic';
import { SkeletonDirective } from '../../../../../@shared/directives/skeleton';

@Component({
  selector: 'settings-clinic-general',
  imports: [FormsModule, ReactiveFormsModule, SkeletonDirective],
  templateUrl: './settings-clinic-general.html',
  styleUrl: './settings-clinic-general.scss'
})
export class SettingsClinicGeneral implements OnInit, OnChanges {
  @Input()
  clinic: Clinic | null = null;

  @Output()
  updateClinic = new EventEmitter<Clinic>;

  public generalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.clinic) {
      this.generalForm.patchValue(this.clinic);
    }
  }

  public emitUpdateClinic(): void {
    this.updateClinic.emit(this.generalForm.value as Clinic);
  }
}
