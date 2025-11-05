import { Injectable } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { BehaviorSubject, catchError, delay, map, Observable, of, shareReplay, startWith, Subject, tap } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public patient$: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public patientList$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  private patientCache = new Map<string, Patient | null>();
  private patientListCache: Patient[] | null = null;

  public getPatientById(id: string): void {
    if (this.patientCache.has(id)) {
      this.patient$.next(this.patientCache.get(id)!);
      return;
    }

    this.isLoading$.next(true);
    const patient = patientList.find(p => p.id === id);

    of(patient ?? null).pipe(
      delay(2000)
    ).pipe(
      tap(patient => {
        this.patient$.next(patient);
        this.patientCache.set(id, patient);
        this.isLoading$.next(false);
      }),
    ).subscribe();

  }

  public getPatientList(query?: string): void {
    if (this.patientListCache) {
      this.patientList$.next(this.patientListCache);
      return;
    }
    this.isLoading$.next(true);
    of(patientList).pipe(
      delay(2000),
      tap(list => {
        this.patientList$.next(list);
        this.isLoading$.next(false);
        this.patientListCache = list;
      })
    ).subscribe();
  }
}
