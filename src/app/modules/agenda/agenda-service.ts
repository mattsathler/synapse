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
        description: 'Usaremos esse tempo para discutir boas e novas ideias para atender a clinica aos dias de sábado e domingo',
        start: new Date('2025-10-17T08:30:00'),
        end: new Date('2025-10-17T09:25:00'),
        title: "Brainstorm de ideias inovadoras",
        type: 1,
        status: 4,
        patient: {
          fullName: "Matheus William",
          id: 1,
          registration: '12312',
          records: [],
          age: 25,
          address: {
            complement: "",
            region: "",
            city: "Nova Iguaçu",
            neighborhood: "Centro",
            number: '3',
            state: "RJ",
            street: "Rua Pedro",
            postalCode: "365554-800"
          },
        },
        employees: [{
          id: '1',
          name: 'Ana Souza',
          photo: 'https://randomuser.me/api/portraits/women/1.jpg',
          tasks: [],
        }],
      },
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

  public getTaskStatus() {
    return [
      {
        id: 1,
        title: "Agendado",
        color: "#22bb33"
      },
      {
        id: 2,
        title: "Em andamento",
        color: "#007bff"
      },
      {
        id: 3,
        title: "Concluído",
        color: "#6c757d"
      },
      {
        id: 4,
        title: "Cancelado",
        color: "#dc3545"
      },
      {
        id: 5,
        title: "Aguardando aprovação",
        color: "#ffc107"
      }
    ]
  }
}