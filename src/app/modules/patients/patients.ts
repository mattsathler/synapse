import { Component, OnInit } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient } from '../../../@shared/types/Patient';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { RouterModule } from '@angular/router';
import { PatientService } from './patient-service';
import { SkeletonDirective } from '../../../@shared/directives/skeleton';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, Header, Avatar, RouterModule, SkeletonDirective],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients implements OnInit {
  public patients$: BehaviorSubject<Patient[]>;
  public isLoading$: BehaviorSubject<boolean>;

  constructor(private service: PatientService) {
    this.patients$ = this.service.patientList$;
    this.isLoading$ = this.service.isLoading$;
  }

  ngOnInit() {
    this.service.getPatientList();
  }
}
