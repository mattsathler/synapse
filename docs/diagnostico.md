# Diagnóstico e próximos passos

Achados de leitura em 2026-10-05, sem correções de aplicação nesta tarefa. Prioridades abaixo são **sugestões**, não roadmap aprovado. Revalidar cada achado no código antes de implementar.

## Prioridade sugerida: sessão e dados

| Achado | Evidência | Implicação / direção sugerida |
| --- | --- | --- |
| Sessão só em memória | `AuthService` | Login já usa Router e preserva sessão; refresh manual ainda exige novo login. Definir restauração com contrato backend se necessária |
| HTML de prontuário confiado sem sanitização Angular | `RichTextViewer.content` | Revisar origem e sanitização do HTML antes de confiar conteúdo armazenado |
| Caches sobrevivem a logout | `AuthService.logout` e serviços root | Prevenir apresentação de dados de sessão anterior ao trocar usuário/clínica |
| Falha de atualização de clínica pode exibir sucesso | Serviço captura erro; pai sempre mostra sucesso após await | Definir propagação/resultado explícito e teste de integração componente-serviço |

O backend não foi lido: sanitização no servidor, permissões, isolamento entre clínicas e expiração de tokens permanecem desconhecidos. Guard frontend não estabelece essas garantias.

## Prioridade sugerida: consistência e manutenção

| Achado | Local | Direção sugerida |
| --- | --- | --- |
| Save dispara refresh sem await e preserva caches de outras queries | `PatientService.savePatient` | Definir invalidação, ordem e tratamento de refresh |
| Loading público de pacientes nunca muda | `PatientService` | Alinhar contrato com consumidores, especialmente busca na agenda |
| Loading permanece true em erro da listagem | `Patients.fetchPatients` | Encerrar estado em sucesso/falha |
| Edição de paciente não trata rejeição do fetch | `PatientsUpsert` constructor | Fallback/feedback sem spinner indefinido |
| Query de busca concatenada | Pacientes e NewTask | Usar parâmetros codificados |
| Intervalo de agenda de 1ms sem limpeza | `Agenda.ngAfterViewInit` | Atualizar em frequência proporcional ao indicador e limpar ao destruir |
| Listener de resize sem remoção | `Sidebar` constructor | Teardown ao destruir |
| Layout altera tarefas do cache | `Agenda.adjustTasks` | Separar layout de entidade ou definir cópia |
| Grupo de sobreposição não une grupos já criados | `Agenda.resolveOverlaps` | Testar interseções transitivas e diferentes ordens |
| Validator depende apenas da primeira alteração de início | `NewTask` com `take(1)` | Revalidar fim para todas as alterações relevantes |
| Remover paciente visual não limpa o form | `new-task.html` | Sincronizar seleção e payload |
| Tema em html, body e sidebar diverge | ThemeService, index, Sidebar | Unificar fonte e herança de tema |
| Erro de telefone usa controle inexistente | `settings-clinic-contact.html`: `main_phone` | Referenciar `phone` |
| Environment obrigatório está ignorado | `.gitignore` e import HTTP | Fornecer setup reproduzível ou template versionado |

## Funcionalidades ainda incompletas

- Persistência de agenda; mudança de dia/filtro; tipos/status persistidos; edição completa.
- Integração de funcionários e financeiro; criação de conta/transação, busca e status; totais reais no extrato.
- Anexos e logo; edição/exclusão de prontuários; PDF dedicado se necessário.
- Métricas do início, destino correto do cartão financeiro e paginação de pacientes.
- Página 404, autorização por função, fluxo de recuperação de senha e automação de entrega, se forem requisitos do produto.

## Validação e distribuição

O build production passou com bundle inicial de 649,59kB (warning em 500kB; limite de erro 1MB) e aviso de CommonJS `quill-delta`. Há dependência de rede para inlining das fontes Google. A suíte final passou 198 testes; detalhes e cobertura em [testes.md](testes.md). Esses resultados não eliminam as lacunas de integração listadas acima.

O log dos testes também contém `NG0101: ApplicationRef.tick is called recursively`, sem failures ou exit code de erro na execução final. A causa permanece a investigar; não foi atribuída a um componente específico.

## Decisões que dependem de contexto externo

Confirmar contrato da API e repositório backend; identidade do paciente por registration; escopo por clínica; sessão persistente e refresh; timezone da agenda e serialização; conteúdo/anexos de prontuário; moeda/precisão financeira; requisitos de acesso e auditoria; destino de deploy. Não transformar essas perguntas em requisitos técnicos inventados.

Uma sequência possível é estabilizar sessão e erros, tornar setup/validação reproduzíveis, confirmar contratos e então integrar áreas simuladas por domínio. Cada etapa deve ter cenário de aceite verificável e atualização desta documentação.
