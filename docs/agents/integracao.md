# Perfil: integração

Use para transporte HTTP, sessão, contratos e caches. Leia [API](../api-e-autenticacao.md), [modelo](../modelo-de-dados.md) e os serviços afetados.

Use `HttpService` e a configuração existente do interceptor. Confirme método, caminho, identificador, payload e resposta no contrato disponível. Para paciente, observe registration e montagem de address. Para agenda JSON, planeje conversão de datas. Funcionários e financeiro ainda são mocks; seus tipos não provam a existência de endpoints.

Defina quem controla loading e erro, quando a Promise termina e como escrita atualiza/invalida caches. Considere logout e troca de identidade. Valide chamadas com `HttpTestingController` e efeitos de estado. Uma alteração de transporte deve considerar que `HttpService` normaliza erros e pode remover o envelope original.
