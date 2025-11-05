import { Injectable } from '@angular/core';
import { NavigationItem } from '../types/NavigationItem';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public getNavigation(): NavigationItem[] {
    return [
      {
        title: 'Clínica',
        children: [
          { icon: 'home', route: '/home', label: 'Inicio' },
          { icon: 'patient_list', route: '/pacientes', label: 'Pacientes' },
          { icon: 'calendar_today', route: '/agenda', label: 'Agenda' },
        ]
      },
      {
        title: 'Ajustes',
        children: [
          { icon: 'health_metrics', route: '/ajustes/clinica', label: 'Clínica' },
          { icon: 'badge', route: '/ajustes/funcionarios', label: 'Funcionários' },
          { icon: 'event', route: '/ajustes/agendamentos', label: 'Agendamentos' },
        ]
      }
    ];
  }
}
