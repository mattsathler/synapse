import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Patients } from './modules/patients/patients';
import { Agenda } from './modules/agenda/agenda';
import { Records } from './modules/patients/records/records';
import { Home } from './modules/home/home';
import { Settings } from './modules/settings/settings';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Home,
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
    },
    {
        path: 'ajustes/agendamentos',
        component: Settings
    }
];
