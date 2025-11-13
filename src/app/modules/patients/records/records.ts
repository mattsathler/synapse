import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { CommonModule } from '@angular/common';
import { CustomDate } from '../../../../@shared/pipes/CustomDate';
import { FormsModule } from '@angular/forms';
import { NewRecord } from './modal/new-record/new-record';
import { Record } from '../../../../@shared/types/Record';
import { Modal } from '../../../../@shared/components/modal/modal';
import { RichTextViewer } from '../../../../@shared/components/rich-text/viewer/rich-text-viewer';
import { ActivatedRoute } from '@angular/router';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';

@Component({
  selector: 'app-records',
  imports: [FormsModule, Header, CommonModule, CustomDate, NewRecord, Modal, RichTextViewer, SkeletonDirective],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  public patient;
  public isLoading;

  public today = new Date().toISOString().split('T')[0];
  public patientRegistration: string | null;
  public modalOpen: boolean = false;
  public selectedRecord: Record | null = null;

  constructor(private service: PatientService, private route: ActivatedRoute) {
    this.patientRegistration = this.route.snapshot.paramMap.get('id');
    this.patient = this.service.patient;
    this.isLoading = this.service.isLoading;
  }

  ngOnInit() {
    this.service.getPatientById(this.patientRegistration ?? '0');
  }

  public printRecords() {
    window.print();
  }
}
