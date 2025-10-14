import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Patients } from './modules/patients/patients';
import { Agenda } from './modules/agenda/agenda';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'pacientes',
        component: Patients
    },
    {
        path: 'agenda',
        component: Agenda
    }
];
