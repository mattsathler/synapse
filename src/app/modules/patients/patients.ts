import { Component, OnInit, signal } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { RouterModule } from '@angular/router';
import { PatientService } from './patient-service';
import { SkeletonDirective } from '../../../@shared/directives/skeleton';
import { PhonePipe } from '../../../@shared/pipes/CustomPhone';
import { SnackbarService } from '../../../@shared/components/snackbar/snackbar-service';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, Header, Avatar, RouterModule, SkeletonDirective, PhonePipe],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients implements OnInit {
  public patients;
  public isLoading = signal(false);

  public page = 1;

  constructor(private service: PatientService, private snackbar: SnackbarService) {
    this.patients = this.service.patientList;
  }

  ngOnInit() {
    this.fetchPatients(1);
  }

  public async fetchPatients(page: number, query?: string): Promise<void> {
    let queryString = `page=${page}`;
    queryString += query ? `&search=${query}` : '';

    this.isLoading.set(true);
    try {
      await this.service.getPatientList(queryString);
      this.isLoading.set(false);
    } catch (error: any) {
      this.snackbar.showMessage(error?.message ?? 'Não foi possível carregar a lista de pacientes', 'error');
    }
  }
}
