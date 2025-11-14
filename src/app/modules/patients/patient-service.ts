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
  constructor(private httpService: HttpService, private snackbarService: SnackbarService) { }

  // --- signals ---
  private _patient = signal<Patient | null>(null);
  private _isLoading = signal<boolean>(false);
  private _patientList = signal<Patient[]>([]);

  // --- cache ---
  public patientCache = new Map<string, Patient | null>();
  public patientListCache = new Map<string, Patient[] | null>

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

  public getPatientList(query: string, forceUpdate?: boolean): void {
    const cache = this.patientListCache.get(query);
    if (cache && !forceUpdate) {
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


  public async createNewPatient(patient: Patient): Promise<void> {
    this._isLoading.set(true);

    try {
      await firstValueFrom(this.httpService.post('/patients', patient))
      this.snackbarService.showNessage('Paciente criado com sucesso!');
      this.getPatientList('', true);
    } catch (error: any) {
      this.snackbarService.showNessage(error?.message, 'error');
    }
  }

  public async updatePatient(id: string, patient: Patient): Promise<void> {
    this._isLoading.set(true);
    const data = removeEmptyFields(patient);

    try {
      await firstValueFrom(this.httpService.patch(`/patients/${id}`, data))
      this.snackbarService.showNessage('Paciente atualizado com sucesso!');
      this.getPatientList('', true);
    } catch (error: any) {
      this.snackbarService.showNessage(error?.message, 'error');
    }
  }
}
