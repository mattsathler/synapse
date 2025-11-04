import { Injectable } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { catchError, delay, map, Observable, of, startWith } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public getPatientById(id: string): Observable<Patient | undefined> {
    const list = patientList;
    const patient = patientList.find(p => p.id === id);
    if (patient) {
      return of(patient).pipe(
        delay(2000) // simula o tempo de carregamento ⏳
      );
    }
    
    return of(undefined);
  }

  public getPatientList(query?: string): Observable<Patient[]> {
    return of(patientList).pipe(
      delay(2000), // simula o tempo de carregamento ⏳
    );
  }
}
