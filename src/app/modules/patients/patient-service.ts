import { Injectable } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { BehaviorSubject, catchError, delay, map, Observable, of, startWith, Subject, tap } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public patient$: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public getPatientById(id: string): void {
    const patient = patientList.find(p => p.id === id);
    this.isLoading$.next(true);
    if (patient) {
      of(patient).pipe(
        delay(2000),
        tap(patient => {
          this.patient$.next(patient);
          this.isLoading$.next(false);
        })
      ).subscribe(); // Dispara a execução do Observable e alimenta o Subject
    } else {
      this.patient$.next(null);
    }
  }

  public getPatientList(query?: string): Observable<Patient[]> {
    return of(patientList).pipe(
      delay(2000),
    );
  }
}
