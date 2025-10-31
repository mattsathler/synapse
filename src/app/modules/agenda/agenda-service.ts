import { Injectable } from '@angular/core';
import { Task } from '../../../@shared/types/Task';
import { Employee } from '../../../@shared/types/Employee';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  public getMockedAgenda(): Task[] {
    return [
      {
        description: 'Brainstorm de ideias inovadoras',
        start: new Date('2025-10-17T08:30:00'),
        end: new Date('2025-10-17T09:25:00'),
      },
      {
        description: 'Sessão de meditação guiada',
        start: new Date('2025-10-17T09:20:00'),
        end: new Date('2025-10-17T09:40:00'),
      },
      {
        description: 'Reunião com equipe internacional',
        start: new Date('2025-10-17T10:00:00'),
        end: new Date('2025-10-17T11:00:00'),
      },
      {
        description: 'Workshop de culinária saudável',
        start: new Date('2025-10-17T11:30:00'),
        end: new Date('2025-10-17T12:30:00'),
      },
      {
        description: 'Desafio de programação relâmpago',
        start: new Date('2025-10-17T13:00:00'),
        end: new Date('2025-10-17T14:00:00'),
      },
      {
        description: 'Piquenique colaborativo no parque',
        start: new Date('2025-10-17T14:30:00'),
        end: new Date('2025-10-17T17:30:00'),
      },
      {
        description: 'Apresentação de projetos surpresa',
        start: new Date('2025-10-17T17:32:00'),
        end: new Date('2025-10-17T18:00:00'),
      },
      {
        description: 'Sessão de feedback criativo',
        start: new Date('2025-10-17T17:43:00'),
        end: new Date('2025-10-17T18:45:00'),
      },
      {
        description: 'Happy hour temático',
        start: new Date('2025-10-17T18:30:00'),
        end: new Date('2025-10-17T20:00:00'),
      }
    ]
  }

  public getMockedEmployees(): Employee[] {
    return [
      {
        id: '1',
        name: 'Ana Souza',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg',
        tasks: this.getMockedAgenda()
      },
      {
        id: '2',
        name: 'Carlos Silva',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg',
        tasks: this.getMockedAgenda()
      },
      {
        id: '3',
        name: 'Mariana Lima',
        photo: 'https://randomuser.me/api/portraits/women/3.jpg',
        tasks: this.getMockedAgenda()
      },
      {
        id: '4',
        name: 'João Pereira',
        tasks: this.getMockedAgenda()
      },
      {
        id: '5',
        name: 'Fernanda Costa',
        photo: 'https://randomuser.me/api/portraits/women/5.jpg',
        tasks: this.getMockedAgenda()
      }
    ]
  }

  public getTaskTypes() {
    return [
      { title: 'Blefaroplastia', id: 0 },
      { title: 'Bioimpedância', id: 1 },
      { title: 'Consulta médica', id: 2 },
      { title: 'Retorno de consulta', id: 3 },
      { title: 'Avaliação estética', id: 4 },
      { title: 'Aplicação de botox', id: 5 },
      { title: 'Preenchimento facial', id: 6 },
      { title: 'Limpeza de pele', id: 7 },
      { title: 'Peeling químico', id: 8 },
      { title: 'Microagulhamento', id: 9 },
      { title: 'Criolipólise', id: 10 },
      { title: 'Depilação a laser', id: 11 },
      { title: 'Exame laboratorial', id: 12 },
      { title: 'Pós-operatório', id: 13 },
    ];
  }
}