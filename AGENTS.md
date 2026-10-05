# Synapse — contexto para agentes

Leia [docs/README.md](docs/README.md) para localizar o contexto da tarefa. A documentação descreve o frontend no estado de 2026-10-05; confirme contratos e comportamento no código antes de alterar.

- Aplicação Angular 20 standalone, TypeScript estrito, templates HTML e SCSS. Código de domínio em `src/app/modules`; infraestrutura, UI reutilizável e tipos em `src/@shared`.
- Autenticação atual em `src/@shared/auth`. Não use o antigo caminho `src/app/modules/auth`.
- Pacientes e clínica usam `HttpService`; funcionários, agenda exibida e financeiro usam mocks. Não invente endpoints para substituir os mocks.
- Nas rotas e operações de pacientes, o identificador utilizado é `registration`, apesar dos parâmetros chamados `id`.
- Preserve mudanças locais preexistentes. Evite refatorações fora da tarefa.
- Validação: `npm run build`; testes sem watch: `npm test -- --watch=false --browsers=ChromeHeadlessWSL`. Consulte [docs/testes.md](docs/testes.md) para cobertura, limitações e baseline.
- Atualize os documentos afetados quando mudar rotas, contratos, comandos ou arquitetura. Não copie dados reais de pacientes, credenciais ou tokens para documentação e fixtures.

Perfis de trabalho estão em [docs/agents/README.md](docs/agents/README.md). Skills do projeto estão em [docs/skills/README.md](docs/skills/README.md); podem ser lidas pelo caminho indicado, sem depender de instalação global.
