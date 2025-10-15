import { Injectable } from '@angular/core';
import { Task } from '../../../@shared/types/Task';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  public getMockedAgenda(): Task[] {
    return [
      {
        description: 'Brainstorm de ideias inovadoras',
        start: new Date('2025-10-15T08:30:00'),
        end: new Date('2025-10-15T09:15:00'),
      },
      {
        description: 'Sessão de meditação guiada',
        start: new Date('2025-10-15T09:20:00'),
        end: new Date('2025-10-15T09:40:00'),
      },
      {
        description: 'Reunião com equipe internacional',
        start: new Date('2025-10-15T10:00:00'),
        end: new Date('2025-10-15T11:00:00'),
      },
      {
        description: 'Workshop de culinária saudável',
        start: new Date('2025-10-15T11:30:00'),
        end: new Date('2025-10-15T12:30:00'),
      },
      {
        description: 'Desafio de programação relâmpago',
        start: new Date('2025-10-15T13:00:00'),
        end: new Date('2025-10-15T14:00:00'),
      },
      {
        description: 'Piquenique colaborativo no parque',
        start: new Date('2025-10-15T14:30:00'),
        end: new Date('2025-10-15T15:30:00'),
      },
      {
        description: 'Sessão de feedback criativo',
        start: new Date('2025-10-15T15:43:00'),
        end: new Date('2025-10-15T16:45:00'),
      },
      {
        description: 'Apresentação de projetos surpresa',
        start: new Date('2025-10-15T15:32:00'),
        end: new Date('2025-10-15T18:00:00'),
      },
      {
        description: 'Happy hour temático',
        start: new Date('2025-10-15T18:30:00'),
        end: new Date('2025-10-15T20:00:00'),
      }
    ]
  }
}