import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { Patient } from '../../../../@shared/types/Patient';
import { CommonModule } from '@angular/common';
import { Separator } from '../../../../@shared/components/separator/separator';
import { CustomDate } from '../../../../@shared/pipes/Date';

@Component({
  selector: 'app-records',
  imports: [Header, CommonModule, Separator, CustomDate],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  public patient: Patient;

  constructor(private service: PatientService) {
    this.patient = this.service.getPatientById();
  }

  public printRecords() {
    window.print();
  }
}
