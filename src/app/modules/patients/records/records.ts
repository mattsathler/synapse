import { Component, signal } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { PatientService } from '../patient-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewRecord } from './modal/new-record/new-record';
import { Record as IRecord } from '../../../../@shared/types/Record';
import { Modal } from '../../../../@shared/components/modal/modal';
import { RichTextViewer } from '../../../../@shared/components/rich-text/viewer/rich-text-viewer';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';
import { CustomDate } from '../../../../@shared/pipes/CustomDate';
import { RichTextEditor } from '../../../../@shared/components/rich-text/editor/rich-text-editor';

@Component({
  selector: 'app-records',
  imports: [FormsModule, Header, CommonModule, NewRecord, Modal, RichTextViewer, RichTextEditor, SkeletonDirective, CustomDate],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  public patient;
  public isLoading = signal(false);

  public today = new Date().toISOString().split('T')[0];
  public patientRegistration: string | null;
  public modalOpen: boolean = false;
  public selectedRecord: IRecord | null = null;

  public orderedRecords?: { date: string; records: IRecord[] }[];

  constructor(private service: PatientService, private route: ActivatedRoute, private snackbarService: SnackbarService, private router: Router) {
    this.patientRegistration = this.route.snapshot.paramMap.get('id');
    this.patient = this.service.patient;
  }

  ngOnInit() {
    if (this.patientRegistration) {
      this.fetchPatient(this.patientRegistration);
    }

    return;
  }

  private async fetchPatient(id: string) {
    this.isLoading.set(true);
    try {
      await this.service.getPatientById(this.patientRegistration ?? '0');
      this.orderedRecords = this.groupRecordsByDay(this.patient()?.records!);
      this.isLoading.set(false);
    }
    catch (error: any) {
      this.router.navigate(['/pacientes']);
      this.snackbarService.showMessage(error?.message, 'error');
    }
  }

  public printRecords() {
    window.print();
  }


  public async createNewRecord(record: IRecord): Promise<void> {
    this.modalOpen = false;
    const patient = this.patient();
    if (!patient?.registration) return;

    try {
      await this.service.createNewRecord(patient.registration, record)
      this.snackbarService.showMessage('Prontuário incluído com sucesso');
      this.orderedRecords = this.groupRecordsByDay(this.patient()?.records!);

    } catch (error: any) {
      this.snackbarService.showMessage(error?.message);
    }
  }

  public groupRecordsByDay(records: IRecord[]): { date: string; records: IRecord[] }[] {
    const sorted = [...records].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time ?? "00:00"}:00`).getTime();
      const dateB = new Date(`${b.date}T${b.time ?? "00:00"}:00`).getTime();
      return dateB - dateA;
    });

    const map = new Map<string, IRecord[]>();

    sorted.forEach(record => {
      if (!map.has(record.date)) {
        map.set(record.date, []);
      }
      map.get(record.date)!.push(record);
    });

    return Array.from(map, ([date, records]) => ({ date, records }));
  }



}
