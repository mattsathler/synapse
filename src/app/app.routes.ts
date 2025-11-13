import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Patients } from './modules/patients/patients';
import { Agenda } from './modules/agenda/agenda';
import { Records } from './modules/patients/records/records';
import { Home } from './modules/home/home';
import { Settings } from './modules/settings/settings';
import { SettingsTask } from './modules/settings/settings-task/settings-task';
import { SettingsClinic } from './modules/settings/settings-clinic/settings-clinic';
import { Employees } from './modules/employees/employees';
import { SettingsApp } from './modules/settings/settings-app/settings-app';
import { financeRoutes } from './modules/finance/finance.routes';
import { authGuard } from './modules/auth/authGuard';
import { PatientsUpsert } from './modules/patients/patients-upsert/patients-upsert';

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
        canActivate: [authGuard],
    },
    {

        path: 'pacientes',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: Patients,
            },
            {
                path: 'detalhes/:id',
                component: Records,
                pathMatch: 'full',
            },
            {
                path: 'novo',
                component: PatientsUpsert,
            },
                        {
                path: 'editar/:id',
                component: PatientsUpsert,
            }
        ]
    },
    {
        path: 'agenda',
        component: Agenda,
        canActivate: [authGuard],
    },
    {
        path: 'ajustes',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'clinica',
                pathMatch: 'full',
            },
            {
                path: 'clinica',
                component: SettingsClinic,
            },
            {
                path: 'app',
                component: SettingsApp,
            },
            {
                path: 'agendamentos',
                component: SettingsTask,
            },
            {
                path: 'funcionarios',
                component: Employees,
            },
        ]
    },
    financeRoutes
];
