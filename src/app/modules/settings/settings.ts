import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { AgendaService } from '../agenda/agenda-service';
import { CommonModule } from '@angular/common';
import { SettingsTask } from './settings-task/settings-task';

@Component({
  selector: 'settings',
  imports: [CommonModule, Header, SettingsTask],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

}