---
name: synapse-feature
description: Implementar ou alterar telas, formulários e navegação do frontend Angular Synapse, respeitando componentes locais e o estado real dos módulos.
---

# Funcionalidades do Synapse

Leia [módulos](../../modulos.md) e [UI](../../ui-e-estilos.md); para URLs, consulte [rotas](../../rotas.md). Confirme TS/HTML/SCSS e spec da área antes de editar.

- Componentes são standalone com imports locais. Mantenha domínio em `src/app/modules` e reutilizáveis em `src/@shared`.
- Pacientes usam registration nas rotas e API; o form achata address e o submit aninha. Preserve esse fluxo ou migre todos os consumidores afetados.
- Funcionários, financeiro e tarefas exibidas são mocks. Controles visuais existentes podem não ter handler; confirme efeito real e contrato antes de ampliar.
- Reutilize tokens SCSS, helpers e componentes compartilhados. Leia signals como funções; no financeiro, preserve bindings `async` se não houver motivo para mudar estado.

Implemente o comportamento solicitado com loading, erro, vazio e validação pertinentes. Verifique cenários afetados e build conforme [testes](../../testes.md). Atualize documentos de domínio/rotas quando o comportamento mudar. Relate o que funciona, como foi verificado e dependências externas ainda pendentes.
