import { computed, Injectable, signal } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of, shareReplay, startWith, Subject, tap } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';
import { HttpService } from '../../../@shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpService: HttpService) { }

  // --- signals ---
  private _patient = signal<Patient | null>(null);
  private _isLoading = signal<boolean>(true);
  private _patientList = signal<Patient[]>([]);

  // --- cache ---
  private patientCache = new Map<string, Patient | null>();
  private patientListCache = new Map<string, Patient[] | null>

  // --- sinais derivados (readonly) ---
  public patient = computed(() => this._patient());
  public isLoading = computed(() => this._isLoading());
  public patientList = computed(() => this._patientList());

  public getPatientById(id: string): void {
    if (this.patientCache.has(id)) {
      this._patient.set(this.patientCache.get(id)!);
      return;
    }

    this._isLoading.set(true);
    this.httpService.get<Patient>(`patients/${id}`)
      .pipe(
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe(patient => {
        this._patient.set(patient);
        this.patientCache.set(id, patient)
        this._isLoading.set(false);
      });
  }

  public getPatientList(query: string): void {
    const cache = this.patientListCache.get(query);
    if (cache) {
      this._patientList.set(cache);
      return;
    }

    this._isLoading.set(true);

    this.httpService.get<{ data: Patient[] }>(`patients/?${query}`)
      .pipe(
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe(patient => {
        this._patientList.set(patient.data);
        this.patientListCache.set(query, patient.data)
        this._isLoading.set(false);
      });
  }
}
