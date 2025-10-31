import { Injectable } from '@angular/core';
import { Patient } from '../../../@shared/types/Patient';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public getPatientById(): Patient {
    return {
      full_name: "Matheus William",
      id: 1,
      registration: '12334',
      age: 25,
      address: {
        city: "Nova Iguaçu",
        neighborhood: "Centro",
        number: '3',
        state: "Rio de Janeiro",
        street: "Rua Pedro",
        zip: "365554-800"
      },
      records: [
        {
          date: new Date("2025-10-21T08:30:00"),
          records: [
            {
              id: '1',
              author: "Thalles Gonçalves",
              date: new Date("2025-10-21T08:30:00"),
              content: "Paciente relata dores abdominais pós-cirúrgicas e leve dificuldade para se alimentar nas primeiras horas da manhã."
            },
            {
              id: '2',
              author: "Thalles Gonçalves",
              date: new Date("2025-10-21T11:45:00"),
              content: "Administração de analgésico leve resultou em melhora parcial da dor. Mantida observação e hidratação intravenosa."
            },
            {
              id: '3',
              author: "Marina Soares",
              date: new Date("2025-10-21T15:10:00"),
              content: "Paciente apresentou náuseas e leve aumento de temperatura corporal (37.9°C). Solicitado exame laboratorial de rotina."
            },
          ]
        },
        {
          date: new Date("2025-10-20T20:00:00"),
          records: [
            {
              id: '4',
              author: "Thalles Gonçalves",
              date: new Date("2025-10-20T20:00:00"),
              content: "Paciente estável no pós-operatório. Mantém alimentação pastosa e resposta positiva aos medicamentos prescritos."
            },
            {
              id: '5',
              author: "Dr. Henrique Lima",
              date: new Date("2025-10-20T09:20:00"),
              content: "Exames laboratoriais indicam níveis de hemoglobina dentro da normalidade. Continuidade do tratamento sem alterações."
            }
          ]
        }
      ]
    }
  }

  public getPatientList(query?: string): Observable<Patient[]> {
    return of([
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
      {
        full_name: "Matheus William",
        id: 1,
        registration: '12312',
        records: [],
        age: 25,
        address: {
          city: "Nova Iguaçu",
          neighborhood: "Centro",
          number: '3',
          state: "RJ",
          street: "Rua Pedro",
          zip: "365554-800"
        },
      },
    ]);
  }
}
