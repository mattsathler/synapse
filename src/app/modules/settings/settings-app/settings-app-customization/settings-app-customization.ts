import { Component } from '@angular/core';
import { ThemeService } from '../../../../theme-service';

@Component({
  selector: 'settings-app-customization',
  imports: [],
  templateUrl: './settings-app-customization.html',
  styleUrl: './settings-app-customization.scss'
})
export class SettingsAppCustomization {
  constructor(public service: ThemeService) { }
}
