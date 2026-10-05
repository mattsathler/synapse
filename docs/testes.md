# Testes e validação

Jasmine 5 + Karma 6, builder `@angular/build:karma`. Specs estão junto dos arquivos de implementação. `tsconfig.spec.json` inclui fontes e tipos Jasmine. Há testes com `TestBed`, instanciação direta de classes, spies de serviços, `HttpTestingController`, `fakeAsync/tick` e Promises.

## Execução

```bash
npm test -- --watch=false --browsers=ChromeHeadlessWSL
npm test -- --watch=false --code-coverage --browsers=ChromeHeadlessWSL
```

Karma usa porta local 9876 e requer Chrome/Chromium. `CHROME_BIN` pode apontar ao executável instalado. Launcher `ChromeHeadlessWSL` acrescenta `--no-sandbox` e `--disable-gpu`; o nome não significa que só roda em WSL. Em sandbox restrito, `listen EPERM` na porta é falha do ambiente, não teste reprovado; a execução precisa ocorrer em ambiente autorizado que permita a porta. Não altere specs para resolver esse erro.

Cobertura é gravada em `coverage/synapse` nos formatos HTML, resumo textual, JSON e LCOV. A configuração final exige 95% statements, 90% branches, 95% functions e 95% lines. `npm run test:ci` e `npm run test:coverage` são atalhos locais para execução única. Esses scripts e thresholds surgiram em alterações locais durante o levantamento. Test styles incluem apenas `src/styles.scss`, diferente da coleção global usada pelo build, portanto specs não garantem fidelidade visual.

## O que a suíte cobre

| Área | Cenários encontrados |
| --- | --- |
| Auth | Credenciais, estado, logout, guard e 401/403/500 no interceptor |
| Rotas | RouterTestingHarness verifica redirecionamento anônimo nas rotas protegidas e acesso autenticado ao início |
| HTTP | Verbos, query, headers, URL normalizada e propagação de erros |
| Pacientes | Fetch/cache, forceUpdate, save, payload, retorno de tela e erros |
| Prontuários | Agrupamento/ordem, criação/cache, emissão de form e impressão |
| Agenda | 24 slots, funcionários, posicionamento, sobreposição e formulário |
| Mocks | Delay, loading, caches e ID inexistente |
| Compartilhados | Tabs, modal, avatar, header, skeleton, snackbar e texto rico |
| Utilitários | Datas, telefone, remoção de campos e validação de horário |

Há specs que validam apenas criação de componente e specs comportamentais. Passar a suíte não comprova sessão real, API disponível, persistência de mocks, proteção no backend ou conclusão de fluxos visuais. Não há E2E, contrato backend ou testes de navegador para navegação completa.

## Baseline do levantamento

Execução em 2026-10-05 sobre o estado local final, com 51 arquivos de spec:

| Check | Resultado |
| --- | --- |
| Build development | Passou |
| Build production | Passou; aviso de budget initial e CommonJS quill-delta |
| Jasmine/Karma com cobertura | **198 testes passaram**, exit code 0 |
| Statements | 99,86% (755/756) |
| Branches | 95,54% (150/157) |
| Functions | 98,93% (185/187) |
| Lines | 100% (665/665) |

Logs desta execução: `/tmp/synapse-docs-tests.log` e `/tmp/synapse-docs-production.log` (temporários, não versionados). O primeiro teste no sandbox compilou, mas foi bloqueado ao abrir a porta; a execução fora do sandbox concluiu. Cobertura considera os arquivos instrumentados/importados, não interfaces TypeScript nem uma garantia de cobertura funcional de todo o produto. Não foram realizados E2E, login real, inspeção visual ou chamadas à API.

Apesar do resultado aprovado, o log contém mensagens `NG0101: ApplicationRef.tick is called recursively`. Elas não reprovaram specs nessa execução; a origem não foi isolada na tarefa documental. Investigar a interação de change detection e fixtures antes de considerar o log totalmente limpo.

## Escolha de validação em futuras tarefas

Para serviços HTTP, use cliente de teste e confira método, URL, payload, erro e efeitos de cache. Para estado/form, cubra comportamento observável e evite testes que repetem a implementação. Para templates, valide interação real quando o comportamento depende de binding. `fakeAsync` é útil para mocks com delay e snackbar; descarte timers periódicos nos testes de agenda. Depois de checks adequados à mudança passarem, amplie apenas se houver nova falha ou risco concreto. Mudanças só de documentação pedem links, coerência e validação das skills.
