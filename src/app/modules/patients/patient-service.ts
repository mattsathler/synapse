import { computed, Injectable, signal } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { finalize, firstValueFrom } from 'rxjs';
import { HttpService } from '../../../@shared/services/http-service';
import { SnackbarService } from '../../../@shared/components/snackbar/snackbar-service';
import { removeEmptyFields } from '../../../@shared/validators/removeEmptyFields';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpService: HttpService) { }

  // --- signals ---
  private _patient = signal<Patient | null>(null);
  private _patientList = signal<Patient[]>([]);
  private _isLoading = signal<boolean>(false);

  // --- cache ---
  public patientCache = new Map<string, Patient | null>();
  public patientListCache = new Map<string, Patient[] | null>

  // --- sinais derivados (readonly) ---
  public patient = computed(() => this._patient());
  public patientList = computed(() => this._patientList());
  public isLoading = computed(() => this._isLoading());

  public async getPatientById(id: string, forceUpdate?: boolean): Promise<void> {
    if (this.patientCache.has(id) && !forceUpdate) {
      this._patient.set(this.patientCache.get(id)!);
      return;
    }

    const patient = await firstValueFrom(this.httpService.get<Patient>(`patients/${id}`));
    this._patient.set(patient);
    this.patientCache.set(id, patient)
    return;
  }

  public async getPatientList(query: string, forceUpdate?: boolean): Promise<void> {
    const cache = this.patientListCache.get(query);
    if (cache && !forceUpdate) {
      this._patientList.set(cache);
      return;
    }


    const patients = await firstValueFrom(this.httpService.get<{ data: Patient[] }>(`patients/?${query}`));
    this._patientList.set(patients.data);
    this.patientListCache.set(query, patients.data)
    return;
  }

  public async savePatient(patient: Patient): Promise<void> {
    const data = removeEmptyFields(patient);
    if (data.registration) {
      await firstValueFrom(this.httpService.patch(`/patients/${data.registration}`, data))
      this.getPatientById(data.registration, true);
    } else {
      await firstValueFrom(this.httpService.post('/patients', data))
    }
    this.getPatientList('', true);
  }
}
