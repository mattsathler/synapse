import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from '../../../../@shared/components/tabs/tabs';
import { TabComponent } from '../../../../@shared/components/tabs/tab';
import { SettingsClinicGeneral } from './settings-clinic-general/settings-clinic-general';
import { SettingsClinicContact } from './settings-clinic-contact/settings-clinic-contact';

@Component({
  selector: 'app-settings-clinic',
  imports: [Header, FormsModule, ReactiveFormsModule, TabsComponent, TabComponent, SettingsClinicGeneral, SettingsClinicContact],
  templateUrl: './settings-clinic.html',
  styleUrl: './settings-clinic.scss'
})
export class SettingsClinic { }
