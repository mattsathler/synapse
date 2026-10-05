# UI e estilos

Design próprio, sem Angular Material ou Tailwind. `angular.json` inclui globalmente reset, helpers, cores, componentes, animações slide/fade e `quill.snow.css`. Cada tela pode ter SCSS local. O índice `_components.scss` agrega estilos de botões, cards, inputs, selects, textareas, tabs e demais controles.

## Componentes compartilhados

| Componente | Contrato e comportamento |
| --- | --- |
| `Header` / `page-header` | Inputs title, subtitle, returnUrl; conteúdo projetado para ações; navegação de retorno |
| `Sidebar` | Menu de NavigationService, logout e controle de largura; mobile até 768px |
| `Avatar` | image/name/alt/size; imagem ou iniciais; small/medium/large |
| `Modal` | `[(open)]`, title e conteúdo projetado; close emite `openChange(false)` |
| `TabsComponent` / `TabComponent` | ContentChildren, primeira tab ativa, seleção por título; títulos devem distinguir as tabs |
| `Snackbar` | Consome signals de mensagem/tipo; service exibe por 4 segundos e reinicia timer |
| `RichTextEditor` | Recebe FormControl em `formController`; configura toolbar Quill |
| `RichTextViewer` | Recebe content HTML; desabilita sanitização para esse conteúdo |
| `SkeletonDirective` | `*skeleton`, size e className; null/undefined/true mostram placeholders; demais valores mostram template |

`RichTextEditor` e viewer usam `ViewEncapsulation.None`; mudanças de CSS nesses controles podem afetar outras telas. Skeleton não significa “valor falsy”: `false`, `0` e array vazio mostram o conteúdo. Inputs da diretiva dependem de classes existentes nos helpers.

## Temas e utilitários

`_colors.scss` define mapas light/dark, variáveis CSS em `:root` e `[data-theme="dark"]`, funções `color` e `var-color` e paleta para classes. Use `var-color` para acompanhar o tema em runtime. Existem tokens primary, altpri, secondary, background, surface, placeholder, text, success, warn, error, info e variantes alpha. `tertiary` aparece no mapa dark/utilitários, mas não no light.

`ThemeService` grava tema no `document.documentElement`; `index.html` também fixa `data-theme="light"` no body. Sidebar lê tema do body no constructor. Esses pontos podem produzir discrepâncias no tema herdado e devem ser reconciliados ao corrigir personalização.

`_helpers.scss` gera classes de dimensões e espaçamento por escala: `w-40`, `h-48`, `gap-8`, `p-16`, `max-h-480`; percentuais como `w-60-p`; flex (`d-flex`, `flex-col`, `items-center`); cores (`bg-surface`, `text-error`); posição, scroll, truncamento e visibilidade. `gap` padrão é 24px e passa a 16px até 768px. Breakpoints principais: 768px, 456px e botão com regra em 425px. Reutilize a escala antes de acrescentar valores arbitrários.

Animações usam `animate.enter`/`animate.leave` em templates e classes em `animations/slide.scss` e `fade.scss`. Tooltips são CSS por atributos `data-tooltip` e `data-tooltip-bottom`. Verifique foco/teclado e contraste ao alterar controles; o reset global remove outlines e desabilita seleção de texto.

## Assets e fontes

`src/@shared/assets/images` contém logo, avatar, background, home e google-logo, copiados para `/assets/` no build. `public/favicon.ico` vai para a raiz. `index.html` carrega Google Fonts e Material Symbols por rede; login usa uma imagem externa Rawpixel e mocks de funcionários usam imagens Random User. Não há evidência de autenticação Google apesar do asset com esse nome.

Inspeção visual futura: desktop/mobile, light/dark, loading, listas vazias, erros, modal e impressão. Não houve inspeção de navegador neste levantamento.
