import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Patient } from '../../../@shared/types/Patient';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { RouterModule } from '@angular/router';
import { PatientService } from './patient-service';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, Header, Avatar, RouterModule],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients {
  public patients$: Observable<Patient[]>;

  constructor(private service: PatientService) {
    this.patients$ = this.service.getPatientList();
  }
}
