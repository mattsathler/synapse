# Perfil: arquitetura

Use para decompor funcionalidades ou revisar mudanças que atravessam rotas, estado e contratos. Leia [arquitetura](../arquitetura.md), [modelo](../modelo-de-dados.md) e [diagnóstico](../diagnostico.md).

Mapeie o fluxo de dados no código atual e separe comportamento implementado de intenção da UI. Preserve a organização standalone e os padrões do domínio sem impor migração global. Identifique quais contratos externos são conhecidos e quais exigem dados do backend. Para tarefas que permitem implementação, entregue a mudança e validação; para planejamento, entregue proposta concreta com impactos e critérios de aceite.

Avalie especialmente ciclo de sessão, isolamento/invalidação de cache, registration de paciente, Date versus strings e transição de mocks para API. Registre decisões aceitas e contexto nas páginas afetadas, sem apresentar sugestões como decisões já aprovadas.
