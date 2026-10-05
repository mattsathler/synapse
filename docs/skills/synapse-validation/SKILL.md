---
name: synapse-validation
description: Diagnosticar e validar mudanças no Synapse com build Angular e testes Jasmine/Karma, distinguindo falhas existentes de restrições do ambiente.
---

# Validação do Synapse

Leia [testes](../../testes.md) para execução/baseline e [diagnóstico](../../diagnostico.md) para achados conhecidos. Confira mudanças locais antes de atribuir regressões.

Execute checks adequados ao pedido. Build production: `npm run build`; suíte única: `npm test -- --watch=false --browsers=ChromeHeadlessWSL`; acrescente `--code-coverage` quando cobertura for parte da análise. O launcher já existe em `karma.conf.js`; requer navegador e porta 9876 disponíveis.

Se Karma falhar com listen EPERM, trate como restrição de execução e use o fluxo de autorização do ambiente quando necessário. Não modifique testes para contornar a porta. Compile não equivale a testes executados; specs de criação não provam integração real. Para timers, use fakeAsync/tick e descarte intervalos quando pertinente.

Investigue failures com cenário reproduzível e arquivos afetados. Corrija código quando a tarefa autorizar correção; em levantamento/revisão, registre baseline sem ampliar escopo. Relate comando, resultado, quantidade real de testes quando disponível e limites da validação. Em mudanças documentais, confira links locais e frontmatter das skills.
