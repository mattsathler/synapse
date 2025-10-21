import { Injectable } from '@angular/core';
import { NavigationItem } from '../types/NavigationItem';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public getNavigation(): NavigationItem[] {
    return [
      { icon: 'home', route: '/home', label: 'Inicio' },
      { icon: 'patient_list', route: '/pacientes', label: 'Pacientes', badge: 'BETA' },
      { icon: 'calendar_today', route: '/agenda', label: 'Agenda', badge: 'BETA' },
    ];
  }
}
