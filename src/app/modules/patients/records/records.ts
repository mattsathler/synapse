import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { CommonModule } from '@angular/common';
import { CustomDate } from '../../../../@shared/pipes/CustomDate';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../../@shared/types/Patient';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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
  public patient$: BehaviorSubject<Patient | null>;
  public isLoading$: BehaviorSubject<boolean>;

  public today = new Date().toISOString().split('T')[0];
  public patientId: string | null;
  public modalOpen: boolean = false;
  public selectedRecord: Record | null = null;
  public patient: Patient | undefined = undefined;

  constructor(private service: PatientService, private route: ActivatedRoute) {
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.patient$ = this.service.patient$;
    this.isLoading$ = this.service.isLoading$;
  }

  ngOnInit() {
    this.service.getPatientById(this.patientId ?? '0');
  }

  public printRecords() {
    window.print();
  }
}
