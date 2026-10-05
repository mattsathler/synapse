# Desenvolvimento e entrega

## Ambiente

Na análise foram usados Node **20.19.5** e npm **10.8.2**. O Angular instalado declara suporte a Node `^20.19.0 || ^22.12.0 || >=24.0.0`; essa informação veio do package local, sem consulta remota. Não há `.nvmrc` ou versão de Node definida no projeto. `package-lock.json` fixa a resolução das dependências; use `npm ci` em um checkout novo.

`environments/` está no `.gitignore`, embora o código importe `environments/environment.ts`. Um checkout novo precisa criar esse arquivo:

```typescript
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000',
};
```

Use a URL adequada ao backend da tarefa. Esse exemplo não comprova que existe backend local. A configuração local analisada usa uma API hospedada em Render. Não coloque segredos no environment: o arquivo é compilado para o navegador. Build production não troca automaticamente a URL, pois `fileReplacements` não está configurado; `production` não controla as chamadas atuais.

## Comandos existentes

| Comando | Resultado |
| --- | --- |
| `npm ci` | Instalação reproduzível pelo lockfile |
| `npm start` | Servidor development, normalmente localhost:4200 |
| `npm run build` | Build production, padrão em angular.json |
| `npm run build -- --configuration development` | Build sem otimização, com source maps |
| `npm run watch` | Rebuild contínuo development |
| `npm test` | Karma com Chrome e watch |
| `npm run test:ci` | Execução única com ChromeHeadlessWSL |
| `npm run test:coverage` | Execução única com cobertura |
| `npm test -- --watch=false --browsers=ChromeHeadlessWSL` | Execução única headless |
| `npm test -- --watch=false --code-coverage --browsers=ChromeHeadlessWSL` | Execução única com cobertura |

Não há scripts de lint, format, E2E ou deploy. `README.md` contém setup Angular e instruções da suíte; nenhum runner E2E está configurado. `.vscode` fornece tarefas npm e launch de Chrome para serve/test. Os scripts de CI/cobertura foram adicionados por alterações locais durante este levantamento e estão incluídos nesta fotografia final.

## Build e distribuição

Builder `@angular/build:application`, entrada `src/main.ts`, target TypeScript ES2022. Saída em `dist/synapse`, com assets navegáveis em `dist/synapse/browser`. Production ativa hashing e budgets: initial warning 500kB/error 1MB; SCSS por componente warning 4kB/error 8kB. Verifique avisos reais, não apenas exit code.

O host precisa servir arquivos estáticos por HTTPS e redirecionar URLs internas ao index da SPA. Não há configuração versionada de hosting, pipeline ou deploy; não deduza uso de AWS a partir da presença de uma pasta local. A URL de API Render não identifica onde o frontend é hospedado. Backend deve permitir a origem do frontend por CORS; a política real não foi inspecionada.

No levantamento, o build production passou com bundle inicial de 649,59kB, acima do aviso de 500kB, e aviso de CommonJS em `quill-delta`. A otimização faz inlining das Google Fonts e depende de rede: a primeira execução no sandbox falhou com `EAI_AGAIN fonts.googleapis.com`; a execução autorizada fora do sandbox passou.

## Convenções observadas

`.editorconfig` define UTF-8, espaços de 2, newline final e remoção de trailing whitespace, com exceção Markdown. Configuração Prettier em `package.json`: largura 100, aspas simples e parser Angular para HTML; não há script nem dependência direta Prettier. O código tem formatação histórica variável. Evite reformatar arquivos sem relação com a tarefa.

Use dados fictícios em fixtures e exemplos. Antes de uma mudança, confira `git status`, fontes afetados e baseline em [testes.md](testes.md). Não altere lockfile ou dependências apenas para silenciar avisos de um levantamento documental.
