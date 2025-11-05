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
        title: 'Financeiro',
        children: [
          { icon: 'bar_chart_4_bars', route: '/financeiro/resumo', label: 'Resumo' },
          { icon: 'paid', route: '/financeiro/transacoes', label: 'Transações' },
          { icon: 'account_balance', route: '/financeiro/contas', label: 'Contas bancárias' },
          { icon: 'wallet', route: '/financeiro/contas', label: 'Chaves pix' },
        ]
      },
      {
        title: 'Ajustes',
        children: [
          { icon: 'health_metrics', route: '/ajustes/clinica', label: 'Clínica' },
          { icon: 'badge', route: '/ajustes/funcionarios', label: 'Funcionários' },
          { icon: 'event', route: '/ajustes/agendamentos', label: 'Agendamentos' },
          { icon: 'slide_library', route: '/ajustes/app', label: 'Aplicativo' },
        ]
      },
    ];
  }
}
