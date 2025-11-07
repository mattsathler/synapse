import { computed, Injectable, signal } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { BehaviorSubject, catchError, delay, map, Observable, of, shareReplay, startWith, Subject, tap } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // --- signals ---
  private _patient = signal<Patient | null>(null);
  private _isLoading = signal<boolean>(true);
  private _patientList = signal<Patient[]>([]);

  // --- cache ---
  private patientCache = new Map<string, Patient | null>();
  private patientListCache: Patient[] | null = null;

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
    const patient = patientList.find(p => p.id === id);

    of(patient ?? null)
      .pipe(delay(2000))
      .subscribe(patient => {
        this._patient.set(patient);
        this.patientCache.set(id, patient);
        this._isLoading.set(false);
      });
  }

  public getPatientList(query?: string): void {
    if (this.patientListCache) {
      this._patientList.set(this.patientListCache);
      return;
    }

    this._isLoading.set(true);

    of(patientList ?? null)
      .pipe(delay(2000))
      .subscribe(patient => {
        this._patientList.set(patientList);
        this.patientListCache = patientList;
        this._isLoading.set(false);
        console.log(this.isLoading())
      });
  }
}
