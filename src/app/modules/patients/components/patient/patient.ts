import { Component, Input } from '@angular/core';
import { IPatient } from '../../../../../@shared/types/Patient';
import { Avatar } from '../../../../../@shared/components/avatar/avatar';

@Component({
  selector: 'patient',
  imports: [Avatar],
  templateUrl: './patient.html',
  styleUrl: './patient.scss'
})
export class Patient {
  @Input()
  public patient: IPatient | null = null;
}
