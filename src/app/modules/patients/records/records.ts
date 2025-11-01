import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { Patient } from '../../../../@shared/types/Patient';
import { CommonModule } from '@angular/common';
import { CustomDate } from '../../../../@shared/pipes/Date';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-records',
  imports: [FormsModule, Header, CommonModule, CustomDate],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  public patient: Patient;
  public today = new Date().toISOString().split('T')[0];

  constructor(private service: PatientService) {
    this.patient = this.service.getPatientById();
  }

  public printRecords() {
    window.print();
  }
}
