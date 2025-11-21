import { computed, Injectable, signal } from '@angular/core';
import { Clinic } from '../../../../@shared/types/Clinic';
import { HttpService } from '../../../../@shared/services/http-service';
import { firstValueFrom } from 'rxjs';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';

@Injectable({
  providedIn: 'root'
})
export class SettingsClinicService {
  // --- signals ---
  public _clinic = signal<Clinic | null>(null);
  public _isLoading = signal<boolean>(false);

  // --- derivated signals ---
  public clinic = computed(() => this._clinic());
  public isLoading = computed(() => this._isLoading());

  constructor(private httpService: HttpService, private snackbar: SnackbarService) {
    this.fetchClinic();
  };

  public async fetchClinic(): Promise<void> {
    try {
      this._isLoading.set(true);
      const clinic = await firstValueFrom<Clinic>(this.httpService.get("clinics/"));
      this._clinic.set(clinic);
      this._isLoading.set(false);
    } catch (error: any) {
      this.snackbar.showMessage(error.message, "error");
      this._isLoading.set(false);
    }
  }

  public async patchClinic(id: string, payload: Clinic): Promise<void> {
    try {
      this._isLoading.set(true);
      const clinic = await firstValueFrom<Clinic>(this.httpService.patch("clinics/", payload));
      this._clinic.set(clinic);
      this._isLoading.set(false);
    } catch (error: any) {
      this.snackbar.showMessage(error.message, "error");
      this._isLoading.set(false);
    }
  }
}
