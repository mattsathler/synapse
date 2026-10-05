# Visão geral

A interface se apresenta como “Synapse — Saúde Digital Integrada”, em português brasileiro. A unidade de trabalho é uma clínica: funcionários acessam pacientes e prontuários, visualizam agendas e consultam configurações e contas. A interface informa “BETA 1.0”; `package.json` declara versão `0.0.0`. Não há especificação de produto ou política de permissões por cargo neste repositório.

| Área | Implementação observada | Fonte de dados |
| --- | --- | --- |
| Login | Formulário email/senha, Bearer token, proteção de rotas | API `/auth` |
| Início | Saudação e cartões de atalho, sem métricas calculadas | Funcionário da sessão |
| Pacientes | Listagem, busca, formulário de criação/edição | API `/patients` |
| Prontuários | Consulta por paciente, agrupamento, criação com texto rico, impressão | API de pacientes/prontuários |
| Agenda | Grade de 24 horas por funcionário, sobreposição e modal | Mocks dos funcionários |
| Funcionários | Listagem e leitura em serviço | Mocks |
| Financeiro | Contas e extrato, dashboard inicial | Mocks e valores fixos na UI |
| Clínica | Leitura e atualização de nome/endereço e contato | API `/clinics/` |
| Agendamentos | Catálogos de tipos/status e controles visuais | Arrays locais |
| Aplicativo | Tema claro/escuro | `localStorage` |

Há diferença entre controles disponíveis e fluxos concluídos. Agendar, criar transações, editar catálogos e anexar arquivos não têm persistência implementada. O botão de PDF abre a impressão do navegador. Não há backend, migrações, servidor SSR, configuração de CI, integração bancária, E2E configurado ou implementação de autorização por função.

Fontes principais: [rotas](../src/app/app.routes.ts), [navegação](../src/@shared/services/navigation-service.ts), [módulos](../src/app/modules), [dependências](../package.json).
