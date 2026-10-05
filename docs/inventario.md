# Inventário do repositório

Gerado em 2026-10-05. Inclui arquivos autorais locais, assets e lockfile; exclui dependências, caches, bundles, cobertura, `.git` e configurações potencialmente sensíveis. Caminhos relativos ao repositório. O inventário é uma fotografia e deve ser atualizado quando a estrutura mudar.

## Estrutura

```text
src/
  app/                    shell, rotas, tema e módulos funcionais
    modules/
      login/ home/ agenda/ employees/ finance/ patients/ settings/
  @shared/
    auth/ components/ directives/ interceptors/ services/
    types/ validators/ pipes/ mockups/ styles/ assets/
public/                   favicon
environments/             configuração local ignorada pelo Git
docs/                     documentação, briefs e skills
AGENTS.md                 orientação geral para agentes
```

## Arquivos

| Arquivo | Papel |
| --- | --- |
| [.editorconfig](../.editorconfig) | Configuração do projeto |
| [.gitignore](../.gitignore) | Configuração do projeto |
| [.vscode/extensions.json](../.vscode/extensions.json) | Configuração do projeto |
| [.vscode/launch.json](../.vscode/launch.json) | Configuração do projeto |
| [.vscode/tasks.json](../.vscode/tasks.json) | Configuração do projeto |
| [README.md](../README.md) | Documentação |
| [angular.json](../angular.json) | Configuração do projeto |
| [environments/environment.ts](../environments/environment.ts) | TypeScript: environment |
| [karma.conf.js](../karma.conf.js) | Configuração do projeto |
| [package-lock.json](../package-lock.json) | Resolução das dependências; não reproduzida na documentação |
| [package.json](../package.json) | Configuração do projeto |
| [public/favicon.ico](../public/favicon.ico) | Asset binário; não interpretado como código |
| [src/@shared/assets/images/avatar.png](../src/@shared/assets/images/avatar.png) | Asset binário; não interpretado como código |
| [src/@shared/assets/images/background.png](../src/@shared/assets/images/background.png) | Asset binário; não interpretado como código |
| [src/@shared/assets/images/google-logo.png](../src/@shared/assets/images/google-logo.png) | Asset binário; não interpretado como código |
| [src/@shared/assets/images/home.jpg](../src/@shared/assets/images/home.jpg) | Asset binário; não interpretado como código |
| [src/@shared/assets/images/logo.png](../src/@shared/assets/images/logo.png) | Asset binário; não interpretado como código |
| [src/@shared/auth/auth-service.spec.ts](../src/@shared/auth/auth-service.spec.ts) | Spec Jasmine; 4 casos literais (pode conter casos parametrizados) |
| [src/@shared/auth/auth-service.ts](../src/@shared/auth/auth-service.ts) | TypeScript: AuthService |
| [src/@shared/auth/authGuard.spec.ts](../src/@shared/auth/authGuard.spec.ts) | Spec Jasmine; 0 casos literais (pode conter casos parametrizados) |
| [src/@shared/auth/authGuard.ts](../src/@shared/auth/authGuard.ts) | TypeScript: authGuard |
| [src/@shared/components/avatar/avatar.html](../src/@shared/components/avatar/avatar.html) | Template Angular |
| [src/@shared/components/avatar/avatar.scss](../src/@shared/components/avatar/avatar.scss) | Estilo SCSS |
| [src/@shared/components/avatar/avatar.spec.ts](../src/@shared/components/avatar/avatar.spec.ts) | Spec Jasmine; 5 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/avatar/avatar.ts](../src/@shared/components/avatar/avatar.ts) | TypeScript: Avatar |
| [src/@shared/components/header/header.html](../src/@shared/components/header/header.html) | Template Angular |
| [src/@shared/components/header/header.scss](../src/@shared/components/header/header.scss) | Estilo SCSS; arquivo vazio |
| [src/@shared/components/header/header.spec.ts](../src/@shared/components/header/header.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/header/header.ts](../src/@shared/components/header/header.ts) | TypeScript: Header |
| [src/@shared/components/modal/modal.html](../src/@shared/components/modal/modal.html) | Template Angular |
| [src/@shared/components/modal/modal.scss](../src/@shared/components/modal/modal.scss) | Estilo SCSS |
| [src/@shared/components/modal/modal.spec.ts](../src/@shared/components/modal/modal.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/modal/modal.ts](../src/@shared/components/modal/modal.ts) | TypeScript: Modal |
| [src/@shared/components/rich-text/editor/rich-text-editor.html](../src/@shared/components/rich-text/editor/rich-text-editor.html) | Template Angular |
| [src/@shared/components/rich-text/editor/rich-text-editor.spec.ts](../src/@shared/components/rich-text/editor/rich-text-editor.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/rich-text/editor/rich-text-editor.ts](../src/@shared/components/rich-text/editor/rich-text-editor.ts) | TypeScript: RichTextEditor |
| [src/@shared/components/rich-text/viewer/rich-text-viewer.html](../src/@shared/components/rich-text/viewer/rich-text-viewer.html) | Template Angular |
| [src/@shared/components/rich-text/viewer/rich-text-viewer.spec.ts](../src/@shared/components/rich-text/viewer/rich-text-viewer.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/rich-text/viewer/rich-text-viewer.ts](../src/@shared/components/rich-text/viewer/rich-text-viewer.ts) | TypeScript: RichTextViewer |
| [src/@shared/components/sidebar/sidebar.html](../src/@shared/components/sidebar/sidebar.html) | Template Angular |
| [src/@shared/components/sidebar/sidebar.scss](../src/@shared/components/sidebar/sidebar.scss) | Estilo SCSS |
| [src/@shared/components/sidebar/sidebar.spec.ts](../src/@shared/components/sidebar/sidebar.spec.ts) | Spec Jasmine; 6 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/sidebar/sidebar.ts](../src/@shared/components/sidebar/sidebar.ts) | TypeScript: Sidebar |
| [src/@shared/components/snackbar/snackbar-service.spec.ts](../src/@shared/components/snackbar/snackbar-service.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/snackbar/snackbar-service.ts](../src/@shared/components/snackbar/snackbar-service.ts) | TypeScript: SnackbarService |
| [src/@shared/components/snackbar/snackbar.html](../src/@shared/components/snackbar/snackbar.html) | Template Angular |
| [src/@shared/components/snackbar/snackbar.scss](../src/@shared/components/snackbar/snackbar.scss) | Estilo SCSS |
| [src/@shared/components/snackbar/snackbar.spec.ts](../src/@shared/components/snackbar/snackbar.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/snackbar/snackbar.ts](../src/@shared/components/snackbar/snackbar.ts) | TypeScript: Snackbar |
| [src/@shared/components/tabs/tab.spec.ts](../src/@shared/components/tabs/tab.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/tabs/tab.ts](../src/@shared/components/tabs/tab.ts) | TypeScript: TabComponent |
| [src/@shared/components/tabs/tabs.html](../src/@shared/components/tabs/tabs.html) | Template Angular |
| [src/@shared/components/tabs/tabs.scss](../src/@shared/components/tabs/tabs.scss) | Estilo SCSS; arquivo vazio |
| [src/@shared/components/tabs/tabs.spec.ts](../src/@shared/components/tabs/tabs.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/components/tabs/tabs.ts](../src/@shared/components/tabs/tabs.ts) | TypeScript: TabsComponent |
| [src/@shared/directives/skeleton.scss](../src/@shared/directives/skeleton.scss) | Estilo SCSS |
| [src/@shared/directives/skeleton.spec.ts](../src/@shared/directives/skeleton.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/directives/skeleton.ts](../src/@shared/directives/skeleton.ts) | TypeScript: SkeletonRect, SkeletonDirective |
| [src/@shared/interceptors/AuthInterceptor.spec.ts](../src/@shared/interceptors/AuthInterceptor.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/@shared/interceptors/AuthInterceptor.ts](../src/@shared/interceptors/AuthInterceptor.ts) | TypeScript: AuthInterceptor |
| [src/@shared/mockups/Employees.ts](../src/@shared/mockups/Employees.ts) | TypeScript: getMockedAgenda, getMockedEmployees |
| [src/@shared/mockups/FinanceAccounts.ts](../src/@shared/mockups/FinanceAccounts.ts) | TypeScript: getMockedFinanceAccounts |
| [src/@shared/pipes/CustomDate.spec.ts](../src/@shared/pipes/CustomDate.spec.ts) | Spec Jasmine; 3 casos literais (pode conter casos parametrizados) |
| [src/@shared/pipes/CustomDate.ts](../src/@shared/pipes/CustomDate.ts) | TypeScript: CustomDate |
| [src/@shared/pipes/CustomPhone.spec.ts](../src/@shared/pipes/CustomPhone.spec.ts) | Spec Jasmine; 0 casos literais (pode conter casos parametrizados) |
| [src/@shared/pipes/CustomPhone.ts](../src/@shared/pipes/CustomPhone.ts) | TypeScript: PhonePipe |
| [src/@shared/services/date-service.spec.ts](../src/@shared/services/date-service.spec.ts) | Spec Jasmine; 3 casos literais (pode conter casos parametrizados) |
| [src/@shared/services/date-service.ts](../src/@shared/services/date-service.ts) | TypeScript: DateService |
| [src/@shared/services/http-service.spec.ts](../src/@shared/services/http-service.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/@shared/services/http-service.ts](../src/@shared/services/http-service.ts) | TypeScript: HttpService |
| [src/@shared/services/navigation-service.spec.ts](../src/@shared/services/navigation-service.spec.ts) | Spec Jasmine; 3 casos literais (pode conter casos parametrizados) |
| [src/@shared/services/navigation-service.ts](../src/@shared/services/navigation-service.ts) | TypeScript: NavigationService |
| [src/@shared/styles/_colors.scss](../src/@shared/styles/_colors.scss) | Estilo SCSS |
| [src/@shared/styles/_components.scss](../src/@shared/styles/_components.scss) | Estilo SCSS |
| [src/@shared/styles/_helpers.scss](../src/@shared/styles/_helpers.scss) | Estilo SCSS |
| [src/@shared/styles/animations/fade.scss](../src/@shared/styles/animations/fade.scss) | Estilo SCSS |
| [src/@shared/styles/animations/slide.scss](../src/@shared/styles/animations/slide.scss) | Estilo SCSS |
| [src/@shared/styles/components/_button.scss](../src/@shared/styles/components/_button.scss) | Estilo SCSS |
| [src/@shared/styles/components/_card.scss](../src/@shared/styles/components/_card.scss) | Estilo SCSS |
| [src/@shared/styles/components/_checkbox.scss](../src/@shared/styles/components/_checkbox.scss) | Estilo SCSS |
| [src/@shared/styles/components/_datepicker.scss](../src/@shared/styles/components/_datepicker.scss) | Estilo SCSS |
| [src/@shared/styles/components/_details.scss](../src/@shared/styles/components/_details.scss) | Estilo SCSS |
| [src/@shared/styles/components/_divider.scss](../src/@shared/styles/components/_divider.scss) | Estilo SCSS |
| [src/@shared/styles/components/_input.scss](../src/@shared/styles/components/_input.scss) | Estilo SCSS |
| [src/@shared/styles/components/_page.scss](../src/@shared/styles/components/_page.scss) | Estilo SCSS |
| [src/@shared/styles/components/_rich-text.scss](../src/@shared/styles/components/_rich-text.scss) | Estilo SCSS |
| [src/@shared/styles/components/_scrollbar.scss](../src/@shared/styles/components/_scrollbar.scss) | Estilo SCSS |
| [src/@shared/styles/components/_select.scss](../src/@shared/styles/components/_select.scss) | Estilo SCSS |
| [src/@shared/styles/components/_slide-toggle.scss](../src/@shared/styles/components/_slide-toggle.scss) | Estilo SCSS |
| [src/@shared/styles/components/_tabs.scss](../src/@shared/styles/components/_tabs.scss) | Estilo SCSS |
| [src/@shared/styles/components/_textarea.scss](../src/@shared/styles/components/_textarea.scss) | Estilo SCSS |
| [src/@shared/styles/components/_timepicker.scss](../src/@shared/styles/components/_timepicker.scss) | Estilo SCSS; arquivo vazio |
| [src/@shared/styles/components/_tooltip.scss](../src/@shared/styles/components/_tooltip.scss) | Estilo SCSS |
| [src/@shared/styles/components/mixins/_button.scss](../src/@shared/styles/components/mixins/_button.scss) | Estilo SCSS |
| [src/@shared/styles/components/mixins/_card.scss](../src/@shared/styles/components/mixins/_card.scss) | Estilo SCSS |
| [src/@shared/styles/components/mixins/_divider.scss](../src/@shared/styles/components/mixins/_divider.scss) | Estilo SCSS |
| [src/@shared/styles/components/mixins/_tooltip.scss](../src/@shared/styles/components/mixins/_tooltip.scss) | Estilo SCSS |
| [src/@shared/types/Address.ts](../src/@shared/types/Address.ts) | TypeScript: Address |
| [src/@shared/types/Clinic.ts](../src/@shared/types/Clinic.ts) | TypeScript: Clinic |
| [src/@shared/types/Employee.ts](../src/@shared/types/Employee.ts) | TypeScript: Employee |
| [src/@shared/types/FinanceAccount.ts](../src/@shared/types/FinanceAccount.ts) | TypeScript: FinanceAccount |
| [src/@shared/types/NavigationItem.ts](../src/@shared/types/NavigationItem.ts) | TypeScript: NavigationItem |
| [src/@shared/types/Patient.ts](../src/@shared/types/Patient.ts) | TypeScript: Patient |
| [src/@shared/types/Record.ts](../src/@shared/types/Record.ts) | TypeScript: Record |
| [src/@shared/types/Task.ts](../src/@shared/types/Task.ts) | TypeScript: Task |
| [src/@shared/validators/min-time-validator.spec.ts](../src/@shared/validators/min-time-validator.spec.ts) | Spec Jasmine; 4 casos literais (pode conter casos parametrizados) |
| [src/@shared/validators/minTimeValidator.ts](../src/@shared/validators/minTimeValidator.ts) | TypeScript: minTimeValidator |
| [src/@shared/validators/removeEmptyFields.spec.ts](../src/@shared/validators/removeEmptyFields.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/@shared/validators/removeEmptyFields.ts](../src/@shared/validators/removeEmptyFields.ts) | TypeScript: removeEmptyFields |
| [src/app/app.config.ts](../src/app/app.config.ts) | TypeScript: appConfig |
| [src/app/app.html](../src/app/app.html) | Template Angular |
| [src/app/app.routes.spec.ts](../src/app/app.routes.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/app.routes.ts](../src/app/app.routes.ts) | TypeScript: routes |
| [src/app/app.scss](../src/app/app.scss) | Estilo SCSS; arquivo vazio |
| [src/app/app.spec.ts](../src/app/app.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/app.ts](../src/app/app.ts) | TypeScript: App |
| [src/app/modules/agenda/agenda-service.spec.ts](../src/app/modules/agenda/agenda-service.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/agenda/agenda-service.ts](../src/app/modules/agenda/agenda-service.ts) | TypeScript: AgendaService |
| [src/app/modules/agenda/agenda.html](../src/app/modules/agenda/agenda.html) | Template Angular |
| [src/app/modules/agenda/agenda.scss](../src/app/modules/agenda/agenda.scss) | Estilo SCSS |
| [src/app/modules/agenda/agenda.spec.ts](../src/app/modules/agenda/agenda.spec.ts) | Spec Jasmine; 8 casos literais (pode conter casos parametrizados) |
| [src/app/modules/agenda/agenda.ts](../src/app/modules/agenda/agenda.ts) | TypeScript: Agenda |
| [src/app/modules/agenda/task/new-task/new-task.html](../src/app/modules/agenda/task/new-task/new-task.html) | Template Angular |
| [src/app/modules/agenda/task/new-task/new-task.scss](../src/app/modules/agenda/task/new-task/new-task.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/agenda/task/new-task/new-task.spec.ts](../src/app/modules/agenda/task/new-task/new-task.spec.ts) | Spec Jasmine; 8 casos literais (pode conter casos parametrizados) |
| [src/app/modules/agenda/task/new-task/new-task.ts](../src/app/modules/agenda/task/new-task/new-task.ts) | TypeScript: NewTask |
| [src/app/modules/agenda/task/task.html](../src/app/modules/agenda/task/task.html) | Template Angular |
| [src/app/modules/agenda/task/task.scss](../src/app/modules/agenda/task/task.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/agenda/task/task.spec.ts](../src/app/modules/agenda/task/task.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/agenda/task/task.ts](../src/app/modules/agenda/task/task.ts) | TypeScript: Task |
| [src/app/modules/employees/employees-service.spec.ts](../src/app/modules/employees/employees-service.spec.ts) | Spec Jasmine; 6 casos literais (pode conter casos parametrizados) |
| [src/app/modules/employees/employees-service.ts](../src/app/modules/employees/employees-service.ts) | TypeScript: EmployeesService |
| [src/app/modules/employees/employees.html](../src/app/modules/employees/employees.html) | Template Angular |
| [src/app/modules/employees/employees.scss](../src/app/modules/employees/employees.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/employees/employees.spec.ts](../src/app/modules/employees/employees.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/employees/employees.ts](../src/app/modules/employees/employees.ts) | TypeScript: Employees |
| [src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.html](../src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.html) | Template Angular |
| [src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.scss](../src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.spec.ts](../src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.ts](../src/app/modules/finance/finance-accounts/finance-accounts-statement/finance-accounts-statement.ts) | TypeScript: FinanceAccountsStatement |
| [src/app/modules/finance/finance-accounts/finance-accounts.html](../src/app/modules/finance/finance-accounts/finance-accounts.html) | Template Angular |
| [src/app/modules/finance/finance-accounts/finance-accounts.scss](../src/app/modules/finance/finance-accounts/finance-accounts.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/finance/finance-accounts/finance-accounts.spec.ts](../src/app/modules/finance/finance-accounts/finance-accounts.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/finance/finance-accounts/finance-accounts.ts](../src/app/modules/finance/finance-accounts/finance-accounts.ts) | TypeScript: FinanceAccounts |
| [src/app/modules/finance/finance-dashboard/finance-dashboard.html](../src/app/modules/finance/finance-dashboard/finance-dashboard.html) | Template Angular |
| [src/app/modules/finance/finance-dashboard/finance-dashboard.scss](../src/app/modules/finance/finance-dashboard/finance-dashboard.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/finance/finance-dashboard/finance-dashboard.spec.ts](../src/app/modules/finance/finance-dashboard/finance-dashboard.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/finance/finance-dashboard/finance-dashboard.ts](../src/app/modules/finance/finance-dashboard/finance-dashboard.ts) | TypeScript: FinanceDashboard |
| [src/app/modules/finance/finance-service.spec.ts](../src/app/modules/finance/finance-service.spec.ts) | Spec Jasmine; 6 casos literais (pode conter casos parametrizados) |
| [src/app/modules/finance/finance-service.ts](../src/app/modules/finance/finance-service.ts) | TypeScript: FinanceService |
| [src/app/modules/finance/finance.routes.ts](../src/app/modules/finance/finance.routes.ts) | TypeScript: financeRoutes |
| [src/app/modules/home/home.html](../src/app/modules/home/home.html) | Template Angular |
| [src/app/modules/home/home.scss](../src/app/modules/home/home.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/home/home.spec.ts](../src/app/modules/home/home.spec.ts) | Spec Jasmine; 0 casos literais (pode conter casos parametrizados) |
| [src/app/modules/home/home.ts](../src/app/modules/home/home.ts) | TypeScript: Home |
| [src/app/modules/login/login.html](../src/app/modules/login/login.html) | Template Angular |
| [src/app/modules/login/login.scss](../src/app/modules/login/login.scss) | Estilo SCSS |
| [src/app/modules/login/login.spec.ts](../src/app/modules/login/login.spec.ts) | Spec Jasmine; 5 casos literais (pode conter casos parametrizados) |
| [src/app/modules/login/login.ts](../src/app/modules/login/login.ts) | TypeScript: Login |
| [src/app/modules/patients/patient-service.spec.ts](../src/app/modules/patients/patient-service.spec.ts) | Spec Jasmine; 14 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/patient-service.ts](../src/app/modules/patients/patient-service.ts) | TypeScript: PatientService |
| [src/app/modules/patients/patients-upsert/patients-upsert-service.spec.ts](../src/app/modules/patients/patients-upsert/patients-upsert-service.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/patients-upsert/patients-upsert-service.ts](../src/app/modules/patients/patients-upsert/patients-upsert-service.ts) | TypeScript: PatientsUpsertService |
| [src/app/modules/patients/patients-upsert/patients-upsert.html](../src/app/modules/patients/patients-upsert/patients-upsert.html) | Template Angular |
| [src/app/modules/patients/patients-upsert/patients-upsert.scss](../src/app/modules/patients/patients-upsert/patients-upsert.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/patients/patients-upsert/patients-upsert.spec.ts](../src/app/modules/patients/patients-upsert/patients-upsert.spec.ts) | Spec Jasmine; 4 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/patients-upsert/patients-upsert.ts](../src/app/modules/patients/patients-upsert/patients-upsert.ts) | TypeScript: PatientsUpsert |
| [src/app/modules/patients/patients.html](../src/app/modules/patients/patients.html) | Template Angular |
| [src/app/modules/patients/patients.scss](../src/app/modules/patients/patients.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/patients/patients.spec.ts](../src/app/modules/patients/patients.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/patients.ts](../src/app/modules/patients/patients.ts) | TypeScript: Patients |
| [src/app/modules/patients/records/modal/new-record/new-record.html](../src/app/modules/patients/records/modal/new-record/new-record.html) | Template Angular |
| [src/app/modules/patients/records/modal/new-record/new-record.scss](../src/app/modules/patients/records/modal/new-record/new-record.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/patients/records/modal/new-record/new-record.spec.ts](../src/app/modules/patients/records/modal/new-record/new-record.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/records/modal/new-record/new-record.ts](../src/app/modules/patients/records/modal/new-record/new-record.ts) | TypeScript: NewRecord |
| [src/app/modules/patients/records/records-service.spec.ts](../src/app/modules/patients/records/records-service.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/records/records-service.ts](../src/app/modules/patients/records/records-service.ts) | TypeScript: RecordsService |
| [src/app/modules/patients/records/records.html](../src/app/modules/patients/records/records.html) | Template Angular |
| [src/app/modules/patients/records/records.scss](../src/app/modules/patients/records/records.scss) | Estilo SCSS |
| [src/app/modules/patients/records/records.spec.ts](../src/app/modules/patients/records/records.spec.ts) | Spec Jasmine; 7 casos literais (pode conter casos parametrizados) |
| [src/app/modules/patients/records/records.ts](../src/app/modules/patients/records/records.ts) | TypeScript: Records |
| [src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.html](../src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.html) | Template Angular |
| [src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.scss](../src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.spec.ts](../src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.ts](../src/app/modules/settings/settings-app/settings-app-customization/settings-app-customization.ts) | TypeScript: SettingsAppCustomization |
| [src/app/modules/settings/settings-app/settings-app.html](../src/app/modules/settings/settings-app/settings-app.html) | Template Angular |
| [src/app/modules/settings/settings-app/settings-app.scss](../src/app/modules/settings/settings-app/settings-app.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-app/settings-app.spec.ts](../src/app/modules/settings/settings-app/settings-app.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-app/settings-app.ts](../src/app/modules/settings/settings-app/settings-app.ts) | TypeScript: SettingsApp |
| [src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.html](../src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.html) | Template Angular |
| [src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.scss](../src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.spec.ts](../src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.spec.ts) | Spec Jasmine; 3 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.ts](../src/app/modules/settings/settings-clinic/settings-clinic-contact/settings-clinic-contact.ts) | TypeScript: SettingsClinicContact |
| [src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.html](../src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.html) | Template Angular |
| [src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.scss](../src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.spec.ts](../src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.spec.ts) | Spec Jasmine; 3 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.ts](../src/app/modules/settings/settings-clinic/settings-clinic-general/settings-clinic-general.ts) | TypeScript: SettingsClinicGeneral |
| [src/app/modules/settings/settings-clinic/settings-clinic-service.spec.ts](../src/app/modules/settings/settings-clinic/settings-clinic-service.spec.ts) | Spec Jasmine; 4 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-clinic/settings-clinic-service.ts](../src/app/modules/settings/settings-clinic/settings-clinic-service.ts) | TypeScript: SettingsClinicService |
| [src/app/modules/settings/settings-clinic/settings-clinic.html](../src/app/modules/settings/settings-clinic/settings-clinic.html) | Template Angular |
| [src/app/modules/settings/settings-clinic/settings-clinic.scss](../src/app/modules/settings/settings-clinic/settings-clinic.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-clinic/settings-clinic.spec.ts](../src/app/modules/settings/settings-clinic/settings-clinic.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-clinic/settings-clinic.ts](../src/app/modules/settings/settings-clinic/settings-clinic.ts) | TypeScript: SettingsClinic |
| [src/app/modules/settings/settings-task/settings-task.html](../src/app/modules/settings/settings-task/settings-task.html) | Template Angular |
| [src/app/modules/settings/settings-task/settings-task.scss](../src/app/modules/settings/settings-task/settings-task.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings-task/settings-task.spec.ts](../src/app/modules/settings/settings-task/settings-task.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings-task/settings-task.ts](../src/app/modules/settings/settings-task/settings-task.ts) | TypeScript: SettingsTask |
| [src/app/modules/settings/settings.html](../src/app/modules/settings/settings.html) | Template Angular |
| [src/app/modules/settings/settings.scss](../src/app/modules/settings/settings.scss) | Estilo SCSS; arquivo vazio |
| [src/app/modules/settings/settings.spec.ts](../src/app/modules/settings/settings.spec.ts) | Spec Jasmine; 1 casos literais (pode conter casos parametrizados) |
| [src/app/modules/settings/settings.ts](../src/app/modules/settings/settings.ts) | TypeScript: Settings |
| [src/app/theme-service.spec.ts](../src/app/theme-service.spec.ts) | Spec Jasmine; 2 casos literais (pode conter casos parametrizados) |
| [src/app/theme-service.ts](../src/app/theme-service.ts) | TypeScript: ThemeService |
| [src/index.html](../src/index.html) | Template Angular |
| [src/main.ts](../src/main.ts) | TypeScript / configuração |
| [src/styles.scss](../src/styles.scss) | Estilo SCSS |
| [tsconfig.app.json](../tsconfig.app.json) | Configuração do projeto |
| [tsconfig.json](../tsconfig.json) | Configuração do projeto |
| [tsconfig.spec.json](../tsconfig.spec.json) | Configuração do projeto |

## Diretórios de suporte

`node_modules`, `.angular`, `dist` e `coverage` são instalados/gerados e não devem servir como fonte de instruções de produto. `.agents` e `.codex` não continham arquivos no primeiro levantamento. `.aws` não foi lido: sua presença local não define arquitetura de deploy. Nenhum AGENTS.md do projeto existia antes desta tarefa; o arquivo da raiz foi criado como entrada para esta base.

Total no inventário: **219 arquivos**.
