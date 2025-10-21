import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Patients } from './modules/patients/patients';
import { Agenda } from './modules/agenda/agenda';
import { Records } from './modules/patients/records/records';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {

        path: 'pacientes',
        children: [
            {
                path: '',
                component: Patients,
            },
            {
                path: ':id',
                component: Records,
            }
        ]
    },
    {
        path: 'agenda',
        component: Agenda
    }
];
