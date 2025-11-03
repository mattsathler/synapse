import { Component } from '@angular/core';
import { AgendaService } from '../../agenda/agenda-service';
import { CommonModule } from '@angular/common';
import { Header } from '../../../../@shared/components/header/header';

@Component({
  selector: 'settings-task',
  imports: [CommonModule, Header],
  templateUrl: './settings-task.html',
  styleUrl: './settings-task.scss'
})
export class SettingsTask {
  public defaultTypes: { title: string, id: number, isDefault: boolean, isEnabled: boolean }[];
  public customTypes: { title: string, id: number, isDefault: boolean, isEnabled: boolean }[];

  public defaultStatus: { title: string, id: number, color: string, isDefault: boolean, isEnabled: boolean }[];
  public customStatus: { title: string, id: number, color: string, isDefault: boolean, isEnabled: boolean }[];

  constructor(private agendaService: AgendaService) {
    this.defaultTypes = this.agendaService.getTaskTypes().filter(i => i.isDefault);
    this.customTypes = this.agendaService.getTaskTypes().filter(i => !i.isDefault);

    this.defaultStatus = this.agendaService.getTaskStatus().filter(i => i.isDefault);
    this.customStatus = this.agendaService.getTaskStatus().filter(i => !i.isDefault);
  }
}
