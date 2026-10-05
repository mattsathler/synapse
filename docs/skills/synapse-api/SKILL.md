---
name: synapse-api
description: Alterar integrações HTTP, autenticação e caches do Synapse com base nos contratos observados ou fornecidos, incluindo payloads de pacientes e clínica.
---

# Integrações do Synapse

Leia [API e autenticação](../../api-e-autenticacao.md) e [modelo](../../modelo-de-dados.md), depois o serviço e seus chamadores. A tabela da documentação é inferida do cliente; contrato backend fornecido na tarefa prevalece.

Confirme método, path, chave da entidade, payload e resposta. Use `HttpService`; lembre que o interceptor trata 401 antes de o adapter relançar `error.error ?? error.message ?? error`. Não presuma que todo erro tem status/message.

Para paciente, preserve registration, resposta de lista `{ data }` e endereço aninhado. `removeEmptyFields` é superficial e preserva false/0. Para novas integrações de agenda, converta strings JSON para Date onde há getHours/getMinutes. Não deduza endpoints de funcionários/financeiro dos mocks.

Defina conclusão da Promise, finalização de loading e propagação de falhas. Ao escrever, avalie invalidação de queries e atualização de entidade ativa; ao mudar sessão, considere caches de serviços root. Teste método/URL/payload e efeitos de estado com as ferramentas em [testes](../../testes.md). Atualize documentação quando um contrato mudar.
