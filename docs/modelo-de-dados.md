# Modelo de dados

Interfaces em [src/@shared/types](../src/@shared/types). Elas documentam expectativas do frontend, sem provar o schema da API. Campos obrigatórios na interface podem faltar em payloads montados a partir de forms e convertidos com `as`.

| Tipo | Campos principais | Relações e observações |
| --- | --- | --- |
| `Patient` | `id?`, `registration`, `fullName`, `age`, `records`, `address` | `registration` identifica operações; nome social, nascimento, gênero, identificação, imagem e total de registros opcionais |
| `Address` | `postalCode`, `state`, `city`, `street`, `complement`, `number`, `neighborhood` | Todos declarados como string |
| `Employee` | `id`, `name`, `tasks`, `email`, `identification`, `position`, `isMedic`, `mainPhone` | Foto, endereço, telefone secundário e nascimento opcionais |
| `Task` | `start`, `end`, `title`, `patient`, `employees`, `type`, `status` | Datas são `Date`; paciente aceita null; layout opcional `top`, `height`, `width`, `left` |
| `Record` | `date`, `time`, `author`, `content`, `id?` | Data/hora strings; conteúdo HTML; anexos e imagem opcionais |
| `Clinic` | `name`, `email`, `isActive`, `id?` | CNPJ, logo, endereço textual e telefone opcionais |
| `FinanceAccount` | `id`, `isActive`, `title`, `transactions`, `bank`, `number`, `balance` | Transação tem título, valor, data e destino opcional; banco tem código e nome |
| `NavigationItem` | `title`, `children` | Filhos têm label, icon, route e badge opcional |

## Pacientes

`Patient` inclui quatro contatos telefônicos, email, convênio e código, CNS, números de prontuário/cadastro, tags e informações familiares, profissionais e de referência. `gender` aceita `Male`, `Female`, `Other`. `age` é recebido/exibido; não há cálculo no serviço de cadastro.

`PatientsUpsertService` cria um form com dados pessoais, endereço **achatado**, contatos, convênio e informações adicionais. São obrigatórios: nome completo, nascimento, gênero, identificação, telefone principal, celular principal, email válido, CEP, estado, cidade, bairro, rua, número e complemento. Parte dos controles não aparece no template atual, como gênero, que recebe `Other` como padrão.

Na escrita, `PatientsUpsert.submitForm()` remove valores vazios do primeiro nível, cria `address` a partir dos campos achatados e remove esses campos da raiz. Na edição, o objeto do paciente e seu endereço são aplicados separadamente com `patchValue`. `registration` presente determina PATCH; ausente determina POST.

`removeEmptyFields` remove somente `null`, `undefined` e `""` no primeiro nível. Preserva `0`, `false`, arrays e objetos vazios. Não faz limpeza recursiva, trim ou validação; a criação de `address` ocorre após a primeira limpeza.

## Datas, prontuários e financeiro

`Record.date` é usado como `YYYY-MM-DD`; `time` como `HH:mm`. `RecordsService` compõe data/hora para ordenar e agrupar, assumindo esse formato. O form de prontuário envia content/date/time e não monta `author`; a resposta da API é usada como `Record`. A interface prevê `attachments: {name, type, url?}[]` e `images: {name, base64}`, mas não há upload implementado.

`Task.type/status` são números na interface; catálogos retornam IDs string e opções HTML também podem produzir strings. O mock contém objetos `Date`; uma futura API JSON precisará de conversão explícita para que `getHours()` funcione.

No financeiro, sinais positivo/negativo orientam a UI de entrada/saída. Não há moeda na entidade, saldo recalculado ou regra de precisão; a exibição usa `currency:'BRL'`. Esses são contratos a definir antes de persistir transações.
