import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Patient } from '../../../@shared/types/Patient';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, Header, Avatar, RouterModule],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients {
  public patients: Patient[] = [
    {
      full_name: "Matheus William",
      id: 1,
      registration: '12312',
      records: [],
      age: 25,
      address: {
        city: "Nova Iguaçu",
        neighborhood: "Centro",
        number: '3',
        state: "RJ",
        street: "Rua Pedro",
        zip: "365554-800"
      },
    }
  ];

  constructor() {

  }
}
