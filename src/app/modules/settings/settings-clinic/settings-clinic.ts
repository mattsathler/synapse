import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from '../../../../@shared/components/tabs/tabs';
import { TabComponent } from '../../../../@shared/components/tabs/tab';
import { SettingsClinicGeneral } from './settings-clinic-general/settings-clinic-general';
import { SettingsClinicContact } from './settings-clinic-contact/settings-clinic-contact';
import { SettingsClinicService } from './settings-clinic-service';
import { Clinic } from '../../../../@shared/types/Clinic';
import { SnackbarService } from '../../../../@shared/components/snackbar/snackbar-service';

@Component({
  selector: 'app-settings-clinic',
  imports: [Header, FormsModule, ReactiveFormsModule, TabsComponent, TabComponent, SettingsClinicGeneral, SettingsClinicContact],
  templateUrl: './settings-clinic.html',
  styleUrl: './settings-clinic.scss'
})
export class SettingsClinic {
  public clinic;
  public isLoadingClinic;

  constructor(private service: SettingsClinicService, private snackbar: SnackbarService) {
    this.clinic = service.clinic;
    this.isLoadingClinic = service.isLoading;
  }

  ngOnInit() { }

  public async updateClinic($event: Clinic) {
    const clinic = this.clinic();
    if (clinic && clinic.id) {
      try {
        await this.service.patchClinic(clinic.id, $event);
        this.snackbar.showMessage("Clínica atualizada com sucesso")
      } catch {

      }
    }
    else {
      this.snackbar.showMessage("Clínica inválida", "error")
      return;
    }
  }
}
