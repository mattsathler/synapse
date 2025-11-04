import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { CommonModule } from '@angular/common';
import { CustomDate } from '../../../../@shared/pipes/CustomDate';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../../@shared/types/Patient';
import { Observable } from 'rxjs';
import { NewRecord } from './modal/new-record/new-record';
import { Record } from '../../../../@shared/types/Record';
import { Modal } from '../../../../@shared/components/modal/modal';
import { RichTextViewer } from '../../../../@shared/components/rich-text/viewer/rich-text-viewer';

@Component({
  selector: 'app-records',
  imports: [FormsModule, Header, CommonModule, CustomDate, NewRecord, Modal, RichTextViewer],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  public patient$: Observable<Patient>;
  public today = new Date().toISOString().split('T')[0];

  public modalOpen: boolean = false;
  public selectedRecord: Record | null = null;

  constructor(private service: PatientService) {
    this.patient$ = this.service.getPatientById('1');
  }

  public printRecords() {
    window.print();
  }
}
