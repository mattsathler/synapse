import { Employee } from "../types/Employee";
import { Task } from "../types/Task";

export function getMockedAgenda(): Task[] {
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
                id: '1',
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

export function getMockedEmployees(): Employee[] {
    return [
        {
            id: '1',
            name: 'Ana Souza',
            photo: 'https://randomuser.me/api/portraits/women/1.jpg',
            tasks: getMockedAgenda()
        },
        {
            id: '2',
            name: 'Carlos Silva',
            photo: 'https://randomuser.me/api/portraits/men/2.jpg',
            tasks: getMockedAgenda()
        },
        {
            id: '3',
            name: 'Mariana Lima',
            photo: 'https://randomuser.me/api/portraits/women/3.jpg',
            tasks: getMockedAgenda()
        },
        {
            id: '4',
            name: 'João Pereira',
            tasks: getMockedAgenda()
        },
        {
            id: '5',
            name: 'Fernanda Costa',
            photo: 'https://randomuser.me/api/portraits/women/5.jpg',
            tasks: getMockedAgenda()
        }
    ]
}