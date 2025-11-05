import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { TabsComponent } from '../../../../@shared/components/tabs/tabs';
import { TabComponent } from '../../../../@shared/components/tabs/tab';
import { SettingsAppCustomization } from './settings-app-customization/settings-app-customization';

@Component({
  selector: 'app-settings-app',
  imports: [CommonModule, Header, TabsComponent, TabComponent, SettingsAppCustomization],
  templateUrl: './settings-app.html',
  styleUrl: './settings-app.scss'
})
export class SettingsApp {

}
