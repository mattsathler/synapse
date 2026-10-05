# Synapse — documentação do projeto

Base de contexto para manutenção e evolução com Codex. Levantamento de **2026-10-05**, a partir do código e da configuração locais, incluindo alterações ainda não commitadas. Referência Git no início da análise: `9949c8f`. O código é a fonte de verdade quando houver divergência.

O checkout recebeu alterações de testes, scripts e README durante a análise. A fotografia final incorpora essas mudanças, que não foram feitas pela tarefa documental. Build production e 198 testes passaram; veja [testes](testes.md) para evidências e limites.

O Synapse é uma aplicação web para gestão de clínica, com cadastro de pacientes, prontuários, agenda por funcionário, consulta de contas financeiras e ajustes da clínica e do aplicativo. Este repositório contém o **frontend**; implementação da API, banco de dados e infraestrutura de produção não estão presentes.

## Mapa de leitura

| Documento | Conteúdo |
| --- | --- |
| [Visão geral](visao-geral.md) | Produto, funcionalidades reais e limites |
| [Arquitetura](arquitetura.md) | Inicialização, camadas, estado e dependências |
| [Módulos e fluxos](modulos.md) | Comportamento das telas e pontos de extensão |
| [Rotas](rotas.md) | URLs, componentes, proteção e navegação |
| [Modelo de dados](modelo-de-dados.md) | Tipos, campos e diferenças entre forms e entidades |
| [API e autenticação](api-e-autenticacao.md) | Chamadas observadas, respostas e caches |
| [UI e estilos](ui-e-estilos.md) | Componentes, temas, utilitários e assets |
| [Desenvolvimento](desenvolvimento.md) | Setup, comandos, ambiente e entrega |
| [Testes](testes.md) | Estratégia, execução e baseline |
| [Diagnóstico e próximos passos](diagnostico.md) | Limitações verificadas e prioridades sugeridas |
| [Inventário](inventario.md) | Arquivos autorais e papel de cada grupo |
| [Perfis de agentes](agents/README.md) | Contexto e entregáveis por especialidade |
| [Skills](skills/README.md) | Procedimentos reutilizáveis do projeto |

## Uso nas próximas tarefas

Comece por este índice, pelo documento do domínio afetado e pelos arquivos citados. O [AGENTS.md da raiz](../AGENTS.md) concentra as instruções gerais do repositório. Os perfis em `docs/agents` são briefs de trabalho; não iniciam agentes automaticamente. As skills em `docs/skills` são artefatos locais que podem ser indicados explicitamente pelo caminho.

Exemplo de solicitação: “Leia `docs/README.md`, `docs/modulos.md` e `docs/skills/synapse-feature/SKILL.md`. Implemente a mudança no cadastro de pacientes preservando o contrato atual e valide os cenários afetados.”

## Alcance do levantamento

Foram mapeados fontes TypeScript, templates, estilos, specs, mocks, tipos, configurações Angular/TypeScript/Karma, dependências declaradas e assets. O inventário inclui arquivos locais relevantes que não estão no Git, como `environments/environment.ts`. Dependências de terceiros, caches, histórico interno de `.git`, binários e bundles gerados não são documentação autoral do projeto. Não foram consultados serviços remotos nem validados contratos contra a API real.

Mantenha a documentação junto da mudança: rota em `rotas.md`; payload em `api-e-autenticacao.md` e `modelo-de-dados.md`; comportamento em `modulos.md`; comandos em `desenvolvimento.md` e `testes.md`. Achados resolvidos devem ser removidos ou marcados como resolvidos em `diagnostico.md`.
