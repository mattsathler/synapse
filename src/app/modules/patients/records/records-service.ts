import { computed, Injectable, signal } from '@angular/core';
import { Record } from '../../../../@shared/types/Record';
import { HttpService } from '../../../../@shared/services/http-service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  // --- signals ---
  private _isLoading = signal(false);

  // --- derivated signals ---
  public isLoading = computed(() => this._isLoading());

  constructor(private httpService: HttpService) { }

  public createNewRecord(patientId: string, record: Record): void {
    this._isLoading.set(true);
    this.httpService.post(`/patients/${patientId}/records`, record);
  }
}
