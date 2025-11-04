import { Injectable } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { Observable, of } from 'rxjs';
import { patientList, singlePatient } from '../../../@shared/mockups/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public getPatientById(id: string): Observable<Patient> {
    return of(singlePatient);
  }

  public getPatientList(query?: string): Observable<Patient[]> {
    return of(patientList);
  }
}
