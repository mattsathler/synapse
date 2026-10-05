# Rotas e navegação

Definições: [app.routes.ts](../src/app/app.routes.ts) e [finance.routes.ts](../src/app/modules/finance/finance.routes.ts). A proteção verifica apenas a presença de `AuthService.employee()`.

| URL | Destino | Proteção |
| --- | --- | --- |
| `/` | Redirect para `/home` | Guard no destino |
| `/login` | `Login` | Pública |
| `/home` | `Home` | `authGuard` |
| `/pacientes` | `Patients` | No pai `pacientes` |
| `/pacientes/detalhes/:id` | `Records` | No pai |
| `/pacientes/novo` | `PatientsUpsert` | No pai |
| `/pacientes/editar/:id` | `PatientsUpsert` | No pai |
| `/agenda` | `Agenda` | `authGuard` |
| `/ajustes` | Redirect para `/ajustes/clinica` | No pai `ajustes` |
| `/ajustes/clinica` | `SettingsClinic` | No pai |
| `/ajustes/app` | `SettingsApp` | No pai |
| `/ajustes/agendamentos` | `SettingsTask` | No pai |
| `/ajustes/funcionarios` | `Employees` | No pai |
| `/financeiro` | Redirect para `/financeiro/dashboard` | Guard no destino |
| `/financeiro/dashboard` | `FinanceDashboard` | `authGuard` |
| `/financeiro/contas` | `FinanceAccounts` | No pai `contas` |
| `/financeiro/contas/:id` | `FinanceAccountsStatement` | No pai `contas` |

Em pacientes, `:id` contém **registration**, conforme links da listagem e comparação no formulário. No financeiro, `:id` é `FinanceAccount.id`. Os componentes leem `ActivatedRoute.snapshot`; mudança de parâmetro reutilizando a mesma instância precisa ser considerada em evolução futura.

`NavigationService` agrupa Clínica, Financeiro e Ajustes da clínica. Apenas contas bancárias aparece no grupo financeiro; dashboard existe como rota. Links de resumo, transações e PIX estão comentados e não representam funcionalidades disponíveis.

Não há wildcard `**`, página 404, resolvers, lazy loading de telas ou guard por cargo. `Settings` existe como componente, mas não é o destino das rotas de ajustes. Um host para SPA precisa encaminhar URLs internas ao `index.html`; este repositório não configura esse host.
