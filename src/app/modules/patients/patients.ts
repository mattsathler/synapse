import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { Patient } from './components/patient/patient';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IPatient } from '../../../@shared/types/Patient';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, Header, Patient],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients {
  public patients: IPatient[] = [
    {
      full_name: "Matheus William",
      id: 1,
      registration: '12312'
    }
  ];

  constructor() {

  }
}
