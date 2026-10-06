# Módulos e fluxos

## Login e início

Em `modules/login`, Reactive Forms exige email válido e senha. `login()` aguarda auth, apresenta `error.message` e encerra loading em `finally`. Se havia funcionário ao criar a tela, `ngOnInit` navega ao início. Há alternância de tema. `Home` usa o primeiro nome do funcionário e três cartões, sem consultas de métricas; inclusive o cartão financeiro aponta atualmente para `/agenda`.

## Pacientes

`Patients.ngOnInit` busca página 1. Enter ou botão disparam busca e a lista apresenta detalhes expansíveis, edição e prontuário. O botão de agendar é visual. `page` existe, mas não há controle de paginação no template.

`PatientsUpsert` usa o mesmo form para novo/edição. Na edição, lê registration da rota, busca paciente e usa `effect` para preencher apenas quando a registration recebida coincide. Campos de endereço são achatados no form e aninhados no payload. Ao salvar, mostra snackbar e retorna à lista. O botão é desabilitado por validade/loading, mas `submitForm` não faz sua própria checagem de validade. Erro de fetch na edição não tem tratamento local equivalente ao de save.

Fontes: [patient-service.ts](../src/app/modules/patients/patient-service.ts), [patients-upsert.ts](../src/app/modules/patients/patients-upsert/patients-upsert.ts) e [form builder](../src/app/modules/patients/patients-upsert/patients-upsert-service.ts).

## Prontuários

`Records` carrega o paciente da rota e agrupa os registros por dia em ordem decrescente de data/hora, sem alterar a lista original. `NewRecord` emite form content/date/time; o componente pai fecha modal, faz POST e reagrupa os registros do signal. Falha é informada por snackbar. Falha de leitura redireciona à lista de pacientes.

Quill permite formatação, títulos, listas, alinhamento e links. Viewer injeta HTML confiado via `DomSanitizer.bypassSecurityTrustHtml`. Área de anexos é um placeholder. `selectedRecord` existe, mas não há fluxo completo de edição. Imprimir e baixar PDF chamam `window.print()`; não existe gerador PDF nem estilo específico de impressão encontrado.

## Agenda

`Agenda` pede lista simulada de funcionários. Cria 24 slots horários e permite escolher colunas por funcionário. `adjustTasks` calcula top/height pela duração e `resolveOverlaps` divide largura por grupos de sobreposição. Cliques abrem modal de edição; botão superior abre form novo.

Nomes e colunas compartilham um canvas com largura mínima de 240px por funcionário, espaçamento de 8px e faixa de horários de 56px. Um único viewport permite scroll horizontal e vertical, com cabeçalhos fixos no topo durante o scroll vertical. O conteúdo do shell usa `min-width: 0` para que a agenda role dentro da tela, mesmo ao lado da sidebar.

O indicador de hora atual é posicionado após renderização e centralizado com scroll. Um `setInterval` de 1 ms atualiza a posição sem teardown. A primeira medição assume que `slotRefs.first` existe. O datepicker tem somente `[value]`, sem mudança ligada a fetch/filtro; os agendamentos não são filtrados pelo dia selecionado.

`NewTask` inclui funcionários, paciente opcional, tipo, título, descrição, início/fim e status. Busca paciente na API e gera título pelo tipo/paciente. `minTimeValidator` permite fim igual ao início; o validator é atualizado só no primeiro `valueChanges` de início por `take(1)`. Não há submit, emissão de save ou chamada de persistência no botão Agendar/Salvar. Ao remover paciente pelo template, somente `selectedPatient` é limpo; o form pode manter o paciente anterior.

Catálogos de `AgendaService`: 14 tipos, IDs string `1` a `14`; o form acrescenta Outros `0`. Status: Agendado `1`, Em andamento `2`, Concluído `3`, Cancelado `4`, Aguardando aprovação `5`. Flags default/enabled são dados locais; o form não filtra os tipos desabilitados.

## Funcionários e financeiro

Funcionários são apresentados a partir de `getMockedEmployees()`, com delay de 2 segundos na primeira leitura. Não há cadastro/edição de funcionário ou API.

Financeiro lista contas e extratos de `getMockedFinanceAccounts()`, também com delay de 2 segundos e caches. Listagem mostra dados das contas; extrato mostra transações e status ativo. No extrato, os cartões de saldo/entradas/saídas usam a constante `12312312`, não cálculos das transações. Busca, nova transação e toggle de conta não persistem alterações. Dashboard tem template inicial gerado.

## Configurações

Clínica: serviço inicia fetch no constructor; tabs separam gerais e contato. Filhos recebem `Clinic`, fazem `patchValue` em `ngOnChanges` e emitem valores para o pai. General exige nome/endereço; Contact exige telefone/email válido. Logo é placeholder. O serviço captura falha de PATCH e não relança; o pai pode exibir sucesso após o serviço informar erro.

Agendamentos: separa tipos/status padrão e personalizados. Avisos de migração para Outros/Nenhum descrevem intenção da UI, sem implementação correspondente. Criar, editar, excluir e salvar são controles sem handlers de persistência.

Aplicativo: Personalização chama `ThemeService`, persistindo light/dark na chave `theme` do localStorage. `Settings` é um wrapper existente sem rota direta.
