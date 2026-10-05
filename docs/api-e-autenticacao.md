# API, autenticação e caches

Esta é uma descrição das chamadas **observadas no frontend**, sem validação do backend. A URL vem de `environments/environment.ts`, importado diretamente por `HttpService`. O arquivo local aponta para `https://syn-api-9pgn.onrender.com`; não há configuração Angular de `fileReplacements` ou carregamento de `.env`.

## Chamadas atuais

| Método | Caminho | Entrada | Resposta esperada / uso |
| --- | --- | --- | --- |
| POST | `/auth` | `{ email, password }` | `{ employee: Employee, token: string }` |
| GET | `/patients/?${query}` | Query string montada pelo chamador | `{ data: Patient[] }` |
| GET | `/patients/${id}` | `id` utilizado como registration | `Patient` |
| POST | `/patients` | Campos do paciente com address aninhado | Resposta ignorada; atualização de lista |
| PATCH | `/patients/${registration}` | Campos não vazios do paciente | Resposta ignorada; atualização de paciente e lista |
| POST | `/patients/${patientId}/records` | Content/date/time não vazios | `Record`, adicionado ao cache |
| GET | `/clinics/` | Sem ID no caminho | `Clinic` |
| PATCH | `/clinics/` | Campos editados de clínica | `Clinic` |

`SettingsClinicService.patchClinic(id, payload)` recebe ID, mas não o usa na URL. Não há chamadas de funcionários, agenda ou financeiro. Não há endpoint de exclusão de paciente ou edição/exclusão de prontuário no código atual.

Busca de pacientes usa `page` e `search`; o modal de agenda usa também `limit=10`. O consumidor utiliza apenas `data`, sem total de páginas. As queries são concatenadas sem codificação do termo; valores com `&`, `?` ou `#` precisam de tratamento em futura correção.

## Transporte e erros

`HttpService` oferece GET/POST/PUT/PATCH/DELETE genéricos, aceita headers e params como objetos ou tipos Angular e adiciona `/` inicial ao caminho. `setBaseUrl` remove barras finais, mas a atribuição inicial do environment não normaliza a URL. Erros são relançados como `error.error ?? error.message ?? error`: consumidores nem sempre recebem `HttpErrorResponse`, nem sempre têm `status` ou `message`.

O interceptor vê a resposta antes dessa normalização. Com token, clona a requisição e adiciona `Authorization: Bearer …`. Em 401, com ou sem token, faz logout, navega para `/login` e relança o erro. Não implementa refresh, retry ou tratamento específico de 403. O token é adicionado a qualquer chamada que atravesse esse HttpClient, sem filtro de origem.

## Sessão

`AuthService` mantém funcionário/token em signals, inicialmente null. Login define loading, chama a API, armazena a resposta e atribui `document.location.href = '/home'`. Não há persistência/restauração de sessão. Essa navegação recarrega a aplicação e perde os signals, de modo que o guard pode redirecionar novamente para login. O comportamento resulta da leitura do código; não foi realizado login real.

`authGuard` permite acesso quando existe funcionário, sem validar expiração do token ou permissões. Logout limpa os signals. A sidebar adiciona recarregamento para `/login`. `AuthService.isLoading` não retorna a false após login/erro e `error` não é preenchido; `Login` usa loading/erro próprios e finaliza seu loading em `finally`.

## Caches

| Serviço | Chave | Atualização |
| --- | --- | --- |
| `PatientService.patientCache` | Identificador/registration | Leitura individual; `forceUpdate` ignora cache |
| `PatientService.patientListCache` | String exata da query | Listagem; `forceUpdate` ignora cache |
| `EmployeesService.employeeCache` | ID | Leitura dos mocks, inclusive null |
| `EmployeesService.employeesListCache` | Lista única | Primeira leitura mock |
| `FinanceService.financeAccountListCache` | Lista única | Primeira leitura mock |
| `FinanceService.financeAccountStatementCache` | ID | Extrato mock; null armazenado não aciona o atalho de leitura |

Salvar paciente dispara refresh individual/lista sem `await`; a Promise de save pode finalizar antes desses refreshes. Apenas a query vazia é atualizada, preservando caches antigos de busca/página. Criar prontuário atualiza paciente em cache e signal ativo apenas se a registration coincidir; sem cache prévio, não faz novo fetch. Não atualiza `totalRecords` ou listas. Logout não invalida caches. `PatientService.isLoading` existe, mas seus métodos atuais não o alteram.
