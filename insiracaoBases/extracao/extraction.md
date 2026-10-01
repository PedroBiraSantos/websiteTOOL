# Reference 01: Extração de design

Fonte analisada: `insiracaoBases/sites/reference01/` (`STACK.md`, `design-system.html`, cópia salva `A Perfect Circle.html` + `A Perfect Circle_files/`, `assets/css/`).
Nenhum arquivo da referência foi alterado.

---

## 0. Convenções deste documento

Cada valor vem marcado com sua origem:

| Marca | Significado |
|---|---|
| **[OBS]** | Observado diretamente nos arquivos visuais da referência (imagens/logos abertos e inspecionados, conteúdo de texto exibido). |
| **[CÓD]** | Identificado nos arquivos de código (CSS/JS/HTML) da referência: valor exato declarado. |
| **[INF]** | Inferido a partir da implementação (combinação de regras, cascata, comportamento padrão do navegador). |
| **[EST]** | Estimativa calculada: depende de métricas de fonte ou de viewport que não puderam ser medidas. |

> **Limite da análise:** a página não foi renderizada num navegador durante esta extração. O vídeo do hero (arquivo remoto, não salvo) e a fonte display "Fezeline" (arquivos `.woff2/.woff` ausentes na cópia salva) **não puderam ser observados**. Tudo que depende deles está marcado como [INF] ou [EST].

### 0.1 Tokens de cor (base de todo o documento)

| Token | Valor | Uso | Origem |
|---|---|---|---|
| `--apc-black` | `#010101` | Fundo do site, header ao rolar, texto de botões preenchidos | [CÓD] |
| `--apc-primary` (home) | `#decec0` | Bege quente: cor de **todo** texto, bordas, botões e ícones | [CÓD], sobrescreve o padrão do tema |
| `--apc-primary` (padrão do tema) | `#a9b5ba` | Cinza-azulado; **não aparece** na home porque é sobrescrito por `#decec0` | [CÓD] |
| Preto puro | `#000` | Título do hero, gradiente inferior do hero | [CÓD] |
| Branco | `#ffffff` | Wordmark do logotipo do header | [OBS] (pixels do PNG) |
| Cinza-bege do símbolo | `#c3c1b4` | Símbolo circular do logo da newsletter | [OBS] (pixels do PNG) |
| Vermelho-alaranjado | `#e85c41` | Asterisco de obrigatório, erro de campo | [CÓD] |
| Verde | `#529214` | Mensagem de sucesso do formulário | [CÓD] |
| Cinza foco | `#333` | Borda do input em foco | [CÓD] |
| Divisória | `rgba(124,124,124,.25)` | Linhas entre datas da turnê | [CÓD] |
| Hover de linha | `rgba(81,81,81,.1)` | Fundo de linha da lista de turnê no hover | [CÓD] |

Paleta essencialmente **bicromática**: quase-preto `#010101` + bege `#decec0`. Não há cinzas intermediários de UI fora da lista de turnê e das letras. **Raio de borda é 0 em todo o sistema** [CÓD].

---

## 1. Header e navegação

### 1.1 Estrutura e posicionamento

| Propriedade | Valor | Origem |
|---|---|---|
| Posição | `fixed`, `top: 0`, `left: 0` | [CÓD] |
| Largura | `100%` do viewport | [CÓD] |
| Camada | `z-index: 4000` (acima de todo o conteúdo; abaixo dos overlays de letras, 5000) | [CÓD] |
| Padding vertical do `<nav>` | `1rem` (16px) em cima e embaixo | [CÓD] |
| Padding lateral do container | `1.5rem` (24px) abaixo de 992px · `3rem` (48px) a partir de 992px | [CÓD] |
| Altura total | ≈ **52px** (16 + ~20,4 de linha + 16) | [EST] |
| Compensação no corpo | `body { padding-top: 70px }`: o conteúdo começa 70px abaixo do topo | [CÓD] |
| Borda / sombra / divisória | Nenhuma | [CÓD] |

Como o header (~52px) é mais baixo que o recuo do corpo (70px), na posição inicial ele **não se sobrepõe ao vídeo do hero**: fica sobre uma faixa de ~18px do fundo `#010101` [INF].

### 1.2 Cores

| Estado | Fundo | Texto/ícones | Origem |
|---|---|---|---|
| Topo da página (scroll ≤ 50px) | `transparent` (fundo visível = body `#010101`) | `#decec0` | [CÓD] |
| Após rolar (> 50px) | `#010101` | `#decec0` | [CÓD] |
| Logotipo | — | Wordmark **branco `#ffffff`** sobre PNG transparente (levemente mais frio/claro que os links bege) | [OBS] |

### 1.3 Comportamento no scroll

- Gatilho: `scrollY > 50px` adiciona o estado "scrolled"; ao voltar para ≤ 50px, o estado é removido. Avaliado no carregamento e a cada evento de scroll [CÓD].
- Transição: `background-color 0.3s ease-in-out` [CÓD].
- **Não há** encolhimento, ocultação ao rolar para baixo, sombra ou mudança de logo [CÓD].
- Na prática, como a área atrás do header no topo já é quase preta, a mudança só é perceptível quando o conteúdo (vídeo, seções com imagem de fundo) passa por trás do header [INF].

### 1.4 Layout desktop (≥ 992px)

Uma única linha flex: `display:flex; align-items:center; justify-content:space-between` [CÓD].

Ordem dos 7 itens [CÓD]:

```
[ TURNÊ ] [ MÚSICA ] [ MÍDIA ] [ ——— LOGO ——— ] [ LOJA ] [ CONTATO ] [ ◎ f ▶ ♪ ]
```

| Item | Âncora de destino |
|---|---|
| Turnê | `#tour` |
| Música | `#music` |
| Mídia | `#vids` |
| Logo | topo da página |
| Loja | `#merch` |
| Contato | `#contact` |
| Redes sociais | Instagram, Facebook, YouTube, TikTok (links externos, nova aba) |

(Original em inglês: Tour, Music, Media, Store, Contact [OBS].)

- Cada item tem `flex-basis: 14.2%` (≈ 1/7) e `text-align: center` [CÓD].
- O logotipo renderiza com ~283px de largura, mais que 1/7 da barra na maioria dos viewports, então sua célula cresce até o tamanho do logo e as outras 6 encolhem por igual. Resultado: **3 células iguais à esquerda, logo no centro exato, 3 células iguais à direita** [INF].
  - Ex. 1440px: área útil 1344px → logo ≈ 283px, demais células ≈ 177px [EST].
  - Ex. 992px: área útil 896px → logo ≈ 283px, demais ≈ 102px [EST].
- Os links de texto ficam **centralizados** dentro de suas células [CÓD].
- O grupo social é um flex com `gap: 1rem` (16px) **alinhado ao início (esquerda)** da sua célula, não centralizado. Ocupa ≈ 4×20px + 3×16px = 128px [CÓD]/[EST].
- O espaçamento entre itens não é fixo: ele surge da distribuição igual de células. Distância visual entre centros de links ≈ largura de uma célula (~177px a 1440px) [INF]/[EST].

### 1.5 Logotipo

| Propriedade | Valor | Origem |
|---|---|---|
| Arquivo | PNG 354 × 25px, wordmark horizontal "A Perfect Circle" | [OBS] |
| Proporção | 14,16 : 1 | [OBS] |
| Altura renderizada | `20px` (largura automática → ≈ 283px) | [CÓD]/[EST] |
| `line-height` do link | `0` (sem espaço fantasma abaixo da imagem) | [CÓD] |
| Hover | Nenhum efeito | [CÓD] |

### 1.6 Tipografia do menu

| Propriedade | Valor | Origem |
|---|---|---|
| Família | Fezeline (display), fallback `serif` | [CÓD] |
| Peso | 400 (único peso disponível) | [CÓD] |
| Tamanho | `0.85rem` = **13.6px** | [CÓD] |
| `line-height` | 1.5 herdado → ~20.4px | [INF] |
| `letter-spacing` | `0.25rem` = **4px** | [CÓD] |
| Transformação | `uppercase` | [CÓD] |
| Quebra | `white-space: nowrap` | [CÓD] |
| Alinhamento | centralizado na célula | [CÓD] |
| Cor | `#decec0` | [CÓD] |
| Sublinhado | nenhum | [CÓD] |

Ícones sociais: `1.25rem` (20px), `line-height: 1`, cor `#decec0`, sem letter-spacing [CÓD]. São glifos monocromáticos de linha/sólidos das marcas (Instagram, Facebook, YouTube, TikTok) [INF].

### 1.7 Interação do menu
Detalhado na seção 3: links e ícones vão para `opacity: .75` em 0.2s ease-in-out; o logo não reage.

### 1.8 Responsivo (< 992px)

- A linha desktop é **ocultada por completo** [CÓD].
- Entra uma barra simples: `display:flex; justify-content:space-between; align-items:center` [CÓD]:

```
[ LOGO                                   ◎ f ▶ ]
```

- Logo à esquerda: `max-height: 20px`, `max-width: 80%`, altura automática [CÓD].
- À direita, **3 ícones sociais** (Instagram, Facebook, YouTube). **TikTok não aparece no mobile** [CÓD].
- **Não existe menu hambúrguer nem drawer.** Os itens Turnê/Música/Mídia/Loja/Contato **não ficam acessíveis no mobile** pelo header [CÓD]. Ao recriar, essa lacuna é uma decisão a revisitar.
- Em telas muito estreitas (≲ 400px), logo (~283px) + ícones (~92px) ultrapassam a largura útil, então o logo é comprimido pelo `max-width` [EST].
- O recuo do conteúdo continua 70px; o deslocamento de rolagem para âncoras passa de 80px para 70px abaixo de 768px [CÓD].

### 1.9 Outros detalhes

- Link "Pular para o conteúdo" visualmente oculto, que aparece no canto superior esquerdo ao receber foco (`z-index: 7000`) [CÓD].
- Clique num item do menu: rolagem suave animada de **600ms** até a seção, descontando a altura do header. Ver 3.6 [CÓD].

---

## 2. Tipografia geral

### 2.1 Famílias

| Papel | Família | Fallback | Pesos disponíveis | Observações | Origem |
|---|---|---|---|---|---|
| **Display / principal de identidade** | **Fezeline** (nome interno `fezeline_demoregular`) | `serif` | **400 apenas**, normal | Auto-hospedada (woff2/woff). Usada em **tudo que é título, navegação e botão**, sempre em CAIXA ALTA com tracking largo. O nome indica versão "demo"; verifique o licenciamento antes de usar. Arquivos ausentes na cópia salva, então o desenho da fonte **não foi observado** | [CÓD] |
| **Texto / principal de leitura** | **Muli** | `sans-serif` | 200, 300, 400, 800 carregados | Corpo, títulos de produtos, lista de turnê, letras. O Google Fonts renomeou "Muli" para **"Mulish"** (mesmo desenho), que é o nome a usar num projeto novo [INF]. Os pesos 200 e 300 **não têm uso identificado** nesta página; o 800 só é usado quando algo pede "bold" (lista de turnê) | [CÓD]/[INF] |
| Específica: formulário da newsletter | Helvetica | Arial, sans-serif | normal | 14px, herdado do bloco do formulário embutido. É a única área do site fora do par Fezeline/Muli | [CÓD] |

**Resumo:** sistema de **duas fontes**. A display serifada/decorativa (Fezeline, só regular) faz toda a hierarquia por meio de caixa alta + letter-spacing, não por peso. A sans humanista (Muli) cuida da leitura. Contraste de peso praticamente não é usado como recurso de hierarquia.

### 2.2 Escala tipográfica por uso

Base: `html` 16px; `body` 16px / `line-height 1.5` / cor `#decec0` [CÓD].

| Uso | Família | Peso | Tamanho | Line-height | Letter-spacing | Transform | Cor | Origem |
|---|---|---|---|---|---|---|---|---|
| **Título do hero** | Fezeline | 400 | fluido, ver 4.6 (≈ 7,77% da largura do hero menos 4vw; ~107px a 1440px) | `1` | `0.3em` | uppercase | **`#000`** | [CÓD]/[EST] |
| **Título de seção** (H2: "Mídia", "Datas da turnê", "Lista de e-mails"…) | Fezeline | 400 | `calc(1.325rem + .9vw)` < 1200px; **`2rem` (32px)** ≥ 1200px | `1.2` | **`0.75rem` (12px)** | uppercase | `#decec0` | [CÓD] |
| Título de bloco do contato (H6) | Fezeline | 400 | `1rem` (16px) | `1.2` | `0.25rem` | uppercase | `#decec0` | [CÓD] |
| Navegação | Fezeline | 400 | `0.85rem` (13.6px) | 1.5 | `0.25rem` | uppercase | `#decec0` | [CÓD] |
| Botão padrão (contorno) | Fezeline | 400 | `0.875rem` (14px) | `1` | `0.25rem` | uppercase | `#decec0` | [CÓD] |
| Botão CTA do hero | Fezeline | 400 | `clamp(0.875rem, 2.5vw, 1.75rem)` → 14–28px | `1.2` | `0.25rem` | uppercase | `#010101` | [CÓD] |
| Link de texto simples (ex.: "Ver loja dos EUA") | Fezeline | 400 | `0.875rem` | 1.5 | `0.25rem` | uppercase | `#decec0` | [CÓD] |
| Links de álbum (Comprar / Ouvir / Letras) | Fezeline | 400 | `0.875rem` | 1.5 | `0.25rem` | uppercase | `#decec0` | [CÓD] |
| Corpo / parágrafos (contato etc.) | Muli | 400 | `1rem` (16px) | `1.5` | normal | none | `#decec0` | [CÓD] |
| Título de produto (H4) | **Muli** | 400 | `1rem` | `1.2` | `0.25rem` | uppercase (herdado dos headings) | `#decec0` | [CÓD]/[INF] |
| Lista de turnê: base | Muli | 400 | 16px (`0.8rem` < 768px) | 22px | normal | none | `#decec0` | [CÓD] |
| Lista de turnê: data, cidade (mobile), títulos de aba | Muli | bold → renderiza **800** | 16px / 14px | 22px | normal | data em caixa alta no conteúdo | `#decec0` | [CÓD]/[INF] |
| Letras: lista de faixas | Muli | 400 | `1rem` | 1.5 | `2px` | uppercase | `#666`, ativo/hover `#fff` | [CÓD] |
| Letras: texto | Muli | 400 | 16px | 1.5 | normal | none | `#fff` | [CÓD] |
| Formulário: labels, avisos, campos | Helvetica/Arial | 400 | `14px` | normal | normal | none | `#decec0` | [CÓD] |
| Formulário: textos de consentimento | Muli | 400 *itálico* | 14px | `1.5` | normal | none | `#decec0` | [CÓD]/[INF] |
| Formulário: "* indica campo obrigatório" | Helvetica/Arial | 400 | `11px` | normal | normal | none | `#decec0` | [CÓD] |

### 2.3 Margens tipográficas recorrentes [CÓD]

- Título de seção: `margin-bottom: 2.5rem` (40px), centralizado.
- Headings em geral: `margin-bottom: .5rem`; H6 do contato: `1rem`.
- Parágrafos: `margin-bottom: 1rem`.
- Título de produto: `margin: 1.5rem auto`, com alturas igualadas entre os cards via JS (os títulos de uma linha ficam com a altura do mais alto) [CÓD].

### 2.4 Escala de letter-spacing (assinatura do sistema)

| Valor | Uso |
|---|---|
| `0.75rem` (12px) | Títulos de seção |
| `0.3em` (proporcional) | Título do hero |
| `0.25rem` (4px) | Navegação, botões, links, H4/H6: o "tracking padrão" |
| `2px` | Lista de faixas das letras |

---

## 3. Elementos interativos e comportamento do mouse

Princípios gerais [CÓD]:
- Nenhum elemento usa escala, deslocamento, sombra ou sublinhado no hover.
- Só existem **dois tipos de feedback**: (a) **queda de opacidade** em links de texto/ícones e (b) **inversão de preenchimento** em botões.
- Duração padrão: **0.2s ease-in-out**. Header: 0.3s.
- `:focus` reproduz o `:hover` nos botões e links simples; **o contorno de foco foi removido globalmente** (`outline: 0` em todos os elementos e estados). Ao recriar, convém adicionar um indicador de foco visível, o que **não** vem da referência.
- Não há estilos específicos de `:active`. O estado pressionado é igual ao hover/focus [CÓD].
- Cursor: `pointer` nos links e botões [CÓD].

### 3.1 Padrão A: fade de opacidade (links de texto e ícones)

| Elemento | Normal | Hover | Focus | Transição | Origem |
|---|---|---|---|---|---|
| Links do menu (Turnê… Contato) | opacity 1, `#decec0` | **opacity 0.75**, cor igual | sem mudança (só hover) | `opacity .2s ease-in-out` | [CÓD] |
| Ícones sociais, desktop | opacity 1 | opacity 0.75 | — | `opacity .2s ease-in-out` | [CÓD] |
| Ícones sociais, mobile | opacity 1 | opacity 0.75 | — | **instantânea** (sem transição declarada) | [CÓD] |
| Logo | — | sem efeito | — | — | [CÓD] |
| Link simples (ex.: lojas) | opacity 1 | opacity 0.75 | opacity 0.75 | `opacity .2s ease-in-out` | [CÓD] |
| Links de álbum (Comprar/Ouvir/Letras) | opacity 1 | opacity 0.75 | opacity 0.75 | `opacity .2s ease-in-out` | [CÓD] |

### 3.2 Padrão B: botão de contorno → preenchido

Aplica-se a "Siga no YouTube", "VER" (produtos), "Ver todas as datas" e **"Inscrever-se" (newsletter)** [CÓD].

| Estado | Fundo | Texto | Borda |
|---|---|---|---|
| Normal | `transparent` | `#decec0` | `1px solid #decec0` |
| Hover / Focus | `#decec0` | `#010101` | `#decec0` |

- Transição: `background-color, color, border-color` em **0.2s ease-in-out** [CÓD].
- Geometria [CÓD]: padding `0.75rem 1.5rem 0.65rem` (12 / 24 / 10.4px; o padding inferior menor compensa opticamente a fonte display), `line-height: 1`, `border-radius: 0`, `display: inline-block`.
- Altura resultante ≈ 12 + 14 + 10.4 + 2 = **38.4px** [EST].
- Botão "VER" dos produtos: `display: block; width: 100%` (ocupa a largura do card) [CÓD].

### 3.3 Padrão C: CTA preenchido → invertido (botão do hero)

| Estado | Fundo | Texto | Borda |
|---|---|---|---|
| Normal | `#decec0` | `#010101` | `1px solid #decec0` |
| Hover / Focus | `#010101` | `#decec0` | `#010101` (borda some no fundo preto) |

Transição 0.2s ease-in-out nas três propriedades [CÓD]. Visualmente, o bloco bege vira um bloco preto com texto bege sobre o vídeo [INF].

### 3.4 Lista de turnê (componente secundário)

- Linha inteira (desktop): fundo `rgba(81,81,81,.1)` no hover, **sem transição** [CÓD].
- Botão "Confirmar": contorno `#decec0`, fundo transparente; "Ingressos": preenchido `#decec0` / texto `#010101`. **Nenhum dos dois muda no hover** [CÓD].
- "Datas anteriores" e o texto "Acompanhe": **sublinhados**. São as únicas ocorrências de sublinhado no site [CÓD].
- Menu suspenso de ofertas: aparece com `opacity .25s ease-out`, fundo branco, borda `#cbcbcb`, sombra `0 2px 9px rgba(0,0,0,.11)`; itens com hover `rgba(81,81,81,.1)` [CÓD].

### 3.5 Overlay de letras (modal)

- Abertura: o fundo do modal aparece em fade de **250ms**, e só então o conteúdo aparece em fade de mais **250ms** (sequencial) [CÓD].
- Fechamento: o inverso (conteúdo 250ms → fundo 250ms) [CÓD].
- Troca de faixa: a letra atual some em fade de 250ms e a nova aparece já visível (troca seca) [CÓD].
- Itens da lista de faixas: `#666` → `#fff` no hover e no ativo, **sem transição** [CÓD].
- Botão fechar "×": branco, 30px, área mínima 44×44px, sem hover [CÓD].
- Mobile (< 700px): a lista de faixas desliza da esquerda (`left: -100% → 0`) em 250ms [CÓD].
- Esc fecha; o foco fica preso dentro do modal; ao fechar, o foco volta ao gatilho [CÓD].

### 3.6 Rolagem para âncoras

- Animação de rolagem de **600ms** até a seção, descontando a altura do header [CÓD].
- Easing: o padrão "swing" da animação usada, `0.5 − cos(πt)/2`, que corresponde exatamente a **easeInOutSine** → `cubic-bezier(0.37, 0, 0.63, 1)` [INF].
- Os fades das letras (3.5) usam a mesma curva [INF].
- A URL é atualizada com o hash sem pular; a seção recebe foco [CÓD].

### 3.7 Preferência por movimento reduzido

Com `prefers-reduced-motion: reduce`: rolagem instantânea, overlays sem fade, troca de faixa sem fade [CÓD]. **O vídeo do hero não é afetado** (continua em autoplay) [CÓD].

### 3.8 Campos de formulário
Ver 5.7.

---

## 4. Hero

### 4.1 Estrutura (camadas, de baixo para cima)

```
section#hero  (position: relative, padding 0, largura 100%)
│
├─ z auto  VÍDEO            largura 100%, altura pela proporção 64:35 (define a altura do hero)
├─ z 1     camada de imagem  absolute, cobre 100%: inativa nesta página (ver 4.4)
├─ z 2     GRADIENTE INF.    absolute, faixa de 15% da altura na base, transparente → #000
└─ z 5     BLOCO DE TEXTO    absolute, cobre 100%, flex coluna centralizado
            ├─ TÍTULO  "TO WHOM IT MAY CONCERN"
            └─ BOTÃO   "OUÇA AGORA"  (original: "LISTEN NOW")
```
[CÓD]

### 4.2 Dimensões e proporções

| Propriedade | Valor | Origem |
|---|---|---|
| Largura | 100% do viewport (sem margens) | [CÓD] |
| Altura | **definida pelo vídeo**, proporção fixa **64 : 35** (≈ 1.829:1, um pouco mais alto que 16:9) → altura = 54.69% da largura | [CÓD] |
| Não é full-screen | O hero **não** usa `100vh`; a altura varia com a largura | [CÓD] |
| Topo | Começa 70px abaixo do topo da página (recuo do body) | [CÓD] |

Alturas resultantes [EST]:

| Viewport | Altura do hero |
|---|---|
| 1920px | ≈ 1050px |
| 1440px | ≈ 788px |
| 1280px | ≈ 700px |
| 1024px | ≈ 560px |
| 768px | ≈ 420px |
| 390px | ≈ 213px |

### 4.3 Vídeo

| Aspecto | Valor | Origem |
|---|---|---|
| Reprodução automática | sim (autoplay) | [CÓD] |
| Som | mudo | [CÓD] |
| Loop | sim, infinito | [CÓD] |
| Inline no iOS | sim (não abre em tela cheia) | [CÓD] |
| Controles | **nenhum** visível | [CÓD] |
| Pré-carregamento | apenas metadados (o autoplay força o download logo em seguida) | [CÓD]/[INF] |
| Poster / imagem de espera | **nenhum** | [CÓD] |
| Formato do arquivo | MP4 único, sem versão mobile separada | [CÓD] |
| Conteúdo | não observável (arquivo remoto, nome sugere imagem de um pássaro) | [INF] |
| Posição | fluxo normal (não absoluto), bloco, `width:100%`, `height:auto` | [CÓD] |
| Crop / enquadramento | Sem `object-fit` declarado → comportamento padrão de vídeo (**contain**): o quadro inteiro é exibido sem corte. A caixa de 64:35 provavelmente corresponde à proporção nativa do arquivo, ou seja, **sem crop e sem tarjas** | [INF] |
| Relação com o viewport | escala proporcional com a largura; nunca cortado; nunca cobre a altura toda da tela em desktops widescreen | [INF] |
| Movimento no scroll | nenhum (sem parallax, sem pausa ao sair da tela) | [CÓD] |

**Durante o carregamento** [INF]:
- O espaço do hero já está reservado pela proporção 64:35, então **não há salto de layout**.
- Até o primeiro quadro, a área mostra o fundo da página `#010101`.
- Título e botão aparecem imediatamente por cima.
- Como o título é **preto `#000`**, ele fica praticamente invisível até o vídeo carregar; só o botão bege aparece. Isso indica que o vídeo tem tons claros atrás do título.

### 4.4 Tratamento visual sobre o vídeo

| Camada | Detalhe | Origem |
|---|---|---|
| Gradiente inferior | `linear-gradient(to bottom, transparent, #000)`, altura **15%** do hero, colado à base, largura total, não bloqueia cliques. Funde o vídeo com a seção seguinte | [CÓD] |
| Camada de imagem | O template prevê uma imagem sobreposta (escala 130%, centralizada, sem repetição), mas **está vazia nesta página**, logo sem efeito visível | [CÓD] |
| Overlay escuro / opacidade / filtros / blend | **Nenhum.** O vídeo aparece com cores originais | [CÓD] |

### 4.5 Bloco de texto: composição e espaçamento

| Propriedade | Valor | Origem |
|---|---|---|
| Área | cobre 100% do hero (absoluto) | [CÓD] |
| Layout | flex **coluna**, centralizado nos dois eixos (centro óptico = centro geométrico do vídeo) | [CÓD] |
| Espaço entre título e botão | `gap: 1.5rem` (24px) | [CÓD] |
| Padding lateral | `2vw` de cada lado | [CÓD] |
| Alinhamento do texto | centralizado | [CÓD] |
| Interatividade | aceita cliques (botão clicável acima do gradiente) | [CÓD] |

### 4.6 Título do hero

| Propriedade | Valor | Origem |
|---|---|---|
| Texto | `TO WHOM IT MAY CONCERN` (22 caracteres; mantido em inglês) | [OBS] |
| Família | Fezeline, fallback `serif` | [CÓD] |
| Peso | 400 | [CÓD] |
| Cor | **`#000` (preto puro)** | [CÓD] |
| Transform | uppercase | [CÓD] |
| `letter-spacing` | `0.3em` | [CÓD] |
| `line-height` | `1` | [CÓD] |
| Quebra de linha | permitida (quebra normal entre palavras) | [CÓD] |
| Tamanho | **fluido, calculado pelo número de letras** (ver abaixo) | [CÓD] |

**Fórmula do tamanho** [CÓD]:

```
font-size = 155% da largura do container  ÷  (N × 0.62  +  (N − 1) × 0.3)
  N = número de caracteres (22)
  container = largura do hero − 2 × 2vw
→ 155 ÷ 19.94 ≈ 7.773% da largura do container
```

A fórmula supõe uma largura média de glifo de 0.62em e um espaçamento de 0.3em. Ela foi calibrada para que o texto, numa linha só, ocupe ~155% do container, o que **força a quebra em ~2 linhas** de tamanho grande [INF]. A quebra exata depende das métricas reais da Fezeline [EST].

| Viewport | Tamanho do título [EST] | Tracking [EST] |
|---|---|---|
| 1920px | ≈ 143px | ≈ 43px |
| 1440px | ≈ 107px | ≈ 32px |
| 1280px | ≈ 96px | ≈ 29px |
| 1024px | ≈ 76px | ≈ 23px |
| 768px | ≈ 57px | ≈ 17px |
| 390px | ≈ 29px | ≈ 9px |

Para reproduzir: use container queries (`container-type: inline-size` + unidade `cqi`) ou um equivalente em `vw` (≈ `7.462vw` com padding de 2vw) [INF].

### 4.7 Botão do hero ("OUÇA AGORA")

| Propriedade | Valor | Origem |
|---|---|---|
| Estilo | **preenchido**: fundo `#decec0`, texto `#010101`, borda `1px #decec0`, raio 0 | [CÓD] |
| Família / peso | Fezeline 400 | [CÓD] |
| Tamanho da fonte | `clamp(0.875rem, 2.5vw, 1.75rem)`: 14px até 560px de viewport, depois 2.5vw, travando em 28px a partir de 1120px | [CÓD] |
| `letter-spacing` | `0.25rem` (4px fixo) | [CÓD] |
| `line-height` | `1.2` | [CÓD] |
| Padding | `0.95rem 1.5rem 0.75rem` (15.2 / 24 / 12px), topo maior por compensação óptica | [CÓD] |
| Largura máxima | `min(100%, 36rem)`; o texto pode quebrar e fica centralizado | [CÓD] |
| Altura a ≥1120px | ≈ 15.2 + 33.6 + 12 + 2 = **~63px** | [EST] |
| Altura a 390px | ≈ 15.2 + 16.8 + 12 + 2 = **~46px** | [EST] |
| Hover/focus | inversão para preto/bege, ver 3.3 | [CÓD] |
| Destino | link externo em nova aba | [CÓD] |

### 4.8 Responsivo

- **Não há breakpoints próprios no hero.** Tudo escala continuamente: altura pela proporção 64:35, título pela largura do container, botão por `clamp` [CÓD].
- No mobile o hero é uma faixa baixa (~213px a 390px) com título de ~29px e botão de 14px; o bloco centralizado (~2 linhas + 24px + ~46px ≈ 128px) cabe na altura [EST].
- O mesmo vídeo e o mesmo enquadramento valem para todos os tamanhos [CÓD].

### 4.9 Scroll
Nenhum efeito no próprio hero. O único efeito ligado à rolagem é o header ganhar fundo preto após 50px [CÓD].

---

## 5. Newsletter / Mailing List

### 5.1 Composição geral

```
section#newsletter  — fundo #010101
└─ container fluido (padding lateral 24px)
   ├─ H2 "LISTA DE E-MAILS"  (centralizado, largura total)
   └─ linha (gutter 24px, colunas centralizadas vertical e horizontalmente)
        ├─ [ IMAGEM / LOGO CIRCULAR ]   ← esquerda
        └─ [ FORMULÁRIO ]                ← direita
```
[CÓD]

Antes desta seção vem o bloco de contato (3 colunas centralizadas com títulos H6 e parágrafos); a newsletter é a **última seção da página**. Não há rodapé adicional [CÓD].

### 5.2 Espaçamento vertical da seção [CÓD]

| Viewport | Topo / base |
|---|---|
| < 768px | 48px |
| ≥ 768px | 96px (48 da seção + 48 do container) |

Título → linha de conteúdo: 40px (margin do título) [CÓD].

### 5.3 Divisão imagem × formulário

A linha usa uma grade de 12 colunas; o conjunto é centralizado e as sobras viram margens laterais iguais [CÓD].

| Viewport | Imagem | Formulário | Sobra (dividida igualmente nas laterais) |
|---|---|---|---|
| < 768px | 100%, **abaixo** | 100%, **acima** | — |
| 768–991px | 4/12 (33.3%) | 6/12 (50%) | 2/12 (8.3% de cada lado) |
| ≥ 992px | 4/12 (33.3%) | 5/12 (41.7%) | 3/12 (12.5% de cada lado) |

- Gutter horizontal e vertical: **24px** [CÓD].
- As duas colunas ficam **centralizadas verticalmente** entre si: a imagem alinha pelo meio da altura do formulário [CÓD].
- **Sem divisórias**, bordas ou fundos distintos entre as colunas [CÓD].

### 5.4 Imagem (lado esquerdo)

| Propriedade | Valor | Origem |
|---|---|---|
| Conteúdo | Logotipo-símbolo da banda: duas meias-luas em arco formando um círculo aberto, com o wordmark "a perfect circle" em branco atravessando o centro na horizontal | [OBS] |
| Cores | símbolo `#c3c1b4` (cinza-bege quente), wordmark `#ffffff`, fundo **transparente** (aparece sobre `#010101`) | [OBS] |
| Arquivo | PNG quadrado **360 × 360px** | [OBS] |
| Dimensionamento | tamanho natural, nunca maior que a coluna (`max-width: 100%`), não esticado | [CÓD] |
| Alinhamento | centralizado horizontalmente na coluna | [CÓD] |
| Tratamento | nenhum (sem filtro, borda, sombra ou crop) | [CÓD] |

Tamanho renderizado [EST]: 1440px → 360px · 992px → ~299px · 768px → ~224px · mobile 375px → ~327px (largura total da coluna).

### 5.5 Caixa do formulário (lado direito)

| Propriedade | Valor | Origem |
|---|---|---|
| Fundo | `#010101` | [CÓD] |
| Largura | `600px`, limitada a `min(750px, 100%)` → **min(600px, largura da coluna)**, centralizada na coluna | [CÓD]/[INF] |
| Fonte base | Helvetica, Arial, sans-serif, **14px**, line-height normal | [CÓD] |
| Cor do texto | `#decec0` | [INF] (herdada) |
| Margem interna do form | `20px` em todos os lados + padding `10px 0 10px 3%` | [CÓD] |
| Alinhamento | texto à esquerda | [CÓD] |

Na prática, a 1440px a caixa tem ~566px (largura da coluna) e a 1920px trava em 600px, centralizada [EST].

### 5.6 Conteúdo, de cima para baixo

| # | Elemento | Texto (PT / original) | Estilo | Origem |
|---|---|---|---|---|
| 1 | Aviso de obrigatório | "* indica campo obrigatório" / "* indicates required" | 11px, **alinhado à direita**, recuo direito 4% (alinha com a borda dos campos) | [CÓD] |
| 2 | Label do e-mail | "Endereço de e-mail *" / "Email Address *" | 14px, bloco, 3px acima do campo | [CÓD] |
| 3 | Campo de e-mail | — (**sem placeholder**; usa label visível) | ver 5.7 | [CÓD] |
| 4 | Grupo de consentimento (20px acima) | Label "Confirmação de inscrição" / "Confirm opt-in" | 14px, peso normal | [CÓD] |
| 5 | Texto | "Confirme que você nos autoriza…" | **Muli itálico**, line-height 1.5, 10px acima | [CÓD] |
| 6 | Checkbox + "E-mail" | — | checkbox nativo do sistema, 10px de espaço até o texto; fieldset sem borda; altura mínima 50px | [CÓD] |
| 7 | Texto | "Você pode cancelar a inscrição…" | Muli itálico, line-height 1.5 | [CÓD] |
| 8 | Texto legal | "Usamos … Saiba mais …" | Helvetica 14px, **não itálico**. O link "Saiba mais" herda o azul padrão `#0d6efd` (hover `#0a58ca`), sem sublinhado: inconsistente com a paleta, provavelmente sem intenção | [INF] |
| 9 | Área de respostas | erro / sucesso (ocultos por padrão) | ver 5.7 | [CÓD] |
| 10 | Botão | "Inscrever-se" / "Subscribe" | ver 5.8 | [CÓD] |

Asterisco: `#e85c41`, 150% do tamanho do texto (~21px), deslocado 5px para baixo [CÓD].

Cada grupo de campo: largura **96%** da caixa, espaço inferior de 3%, altura mínima 50px, label e campo empilhados [CÓD].

### 5.7 Campo de e-mail e estados

| Estado | Visual | Origem |
|---|---|---|
| Normal | fundo transparente, borda `1px solid #decec0`, raio 0, texto `#decec0` Helvetica 14px, padding `8px 0` com recuo de texto de 2%, largura 100% do grupo | [CÓD] |
| Altura | ≈ 34px (8 + ~16 + 8 + 2) | [EST] |
| Hover | sem mudança | [CÓD] |
| **Focus** | borda muda para **`#333`** (escurece e quase desaparece no fundo preto), sem outline | [CÓD]/[INF] |
| Erro | borda **`2px solid #e85c41`**; abaixo, caixa `inline-block` com fundo `rgba(255,255,255,.85)`, texto `#e85c41` 14px, padding 3px, raio 3px, margem `2px 0 1em` | [CÓD] |
| Sucesso | mensagem em `#529214`, negrito | [CÓD] |

O focus da referência *reduz* o contraste. Para reproduzir com fidelidade, esse é o comportamento; para um projeto novo, recomenda-se um foco que aumente o contraste (ex.: borda 2px `#decec0`), mas isso **não** vem da referência.

### 5.8 Botão de envio

Segue o **Padrão B** (contorno → preenchido) [CÓD]:

| Propriedade | Valor |
|---|---|
| Normal | fundo transparente, texto `#decec0`, borda `1px solid #decec0`, raio 0 |
| Hover / Focus | fundo `#decec0`, texto `#010101` |
| Transição | bg/cor/borda 0.2s ease-in-out |
| Tipografia | Fezeline 400, 14px, uppercase, tracking 4px, line-height 1 |
| Padding | 12px 24px 10.4px |
| Altura | ≈ 38.4px [EST] |
| Largura | ajustada ao conteúdo |
| Posição | **alinhado à esquerda**, abaixo do bloco de consentimento; margem `0 5px 10px 0` |

### 5.9 Responsivo

| Faixa | Comportamento | Origem |
|---|---|---|
| < 768px | Uma coluna. **Ordem invertida: formulário primeiro, imagem embaixo**, ambos com 100% da largura útil; 24px de espaço vertical entre eles; imagem centralizada (até 360px) | [CÓD] |
| 768–991px | Duas colunas lado a lado: imagem 33% · formulário 50% | [CÓD] |
| ≥ 992px | Imagem 33% · formulário 42%; o conjunto fica mais estreito e centralizado | [CÓD] |
| ≥ ~1900px | A caixa do formulário trava em 600px dentro da coluna | [INF] |

O título da seção fica sempre acima de tudo, centralizado, e encolhe de 32px para ~25px no mobile [CÓD]/[EST].

---

## 6. Sistema de layout e espaçamento (observável)

Complemento ao que foi pedido, sem referência à tecnologia original:

| Aspecto | Valor | Origem |
|---|---|---|
| Container | sempre fluido (largura total), sem largura máxima | [CÓD] |
| Margem lateral do conteúdo | 24px (header: 48px a partir de 992px) | [CÓD] |
| Grade | 12 colunas; conteúdos principais ocupam 10/12 centralizados | [CÓD] |
| Gutters | 24px (newsletter/contato), 48px (álbuns/produtos) | [CÓD] |
| Ritmo vertical das seções | 48px mobile / 96px a partir de 768px | [CÓD] |
| Breakpoints em uso | 480 · 576 · 700 · 768 · 992 · 1200px | [CÓD] |
| Raio | 0 em tudo | [CÓD] |
| Rolagem para âncoras | margem de 80px (70px < 768px) para o header fixo | [CÓD] |

---

## 7. Fora do escopo (não extraído)

Conforme solicitado, foram ignoradas como tecnologia: CMS e plugins, framework de grid/CSS, bibliotecas JS, plataforma de e-mail, widget de turnês como serviço, fontes de ícones, embed de vídeo externo, analytics/pixels/tag managers, dados estruturados, metadados sociais, RSS e prefetch.
Os efeitos visuais produzidos por eles (grade e espaçamento, aparência do formulário, animações de fade e rolagem, layout da lista de turnês, glifos sociais) foram descritos como características, nas seções acima.
