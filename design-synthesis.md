# Síntese de design: Projeto Tool

Documento-ponte entre as quatro extrações (`extraction.md`, `extraction2.md`, `extraction3.md`, `extraction4.md`) e o futuro `DESIGN.md`.
Nenhuma referência é tratada como modelo de site. Cada uma foi desmontada em soluções isoladas, avaliadas pela função que cumprem e recombinadas numa linguagem nova.

---

## 0. Como ler este documento

### 0.1 Classificação de procedência

| Marca | Significado |
|---|---|
| **[OBSERVADO]** | Identificado diretamente: inspeção visual ou medição de pixels das imagens das referências, ou dos assets do projeto |
| **[EXTRAÍDO]** | Valor identificado no código/arquivos e registrado nas extrações |
| **[INFERIDO]** | Dedução a partir das referências (cálculo, cascata, comportamento implícito) |
| **[PROPOSTA]** | Decisão nova, criada para o projeto Tool. **Não existe em nenhuma referência** |

### 0.2 Materiais considerados

- As quatro extrações e, quando necessário, os arquivos originais de cada referência.
- **Os assets do projeto** (`insiracaoBases/albuns`, `imagens`, `integrantes`), inspecionados nesta etapa porque condicionam várias decisões [OBSERVADO]:
  - **Álbuns (6 arquivos):** Undertow, Ænima, Lateralus, 10,000 Days (duas versões) e Fear Inoculum, salvo como `Fear Inhumanity.jpeg`. Resolução entre **512 e 1200px**; Opiate (EP) não está presente.
  - **Integrantes (12 fotos, 3 por pessoa):** épocas, enquadramentos e tratamentos **muito heterogêneos**: anos 90 e atuais, cor saturada, tons azulados, P&B, sépia, fundos de palco e de estúdio. Resoluções de **252×350 a 2000×1297**.
  - **Imagens gerais (34):**
    - pôsteres de turnê, muitos com o logo da banda já impresso;
    - arte visionária e anatômica;
    - **geometria sagrada/ocultista** (Metatron, Flor da Vida, Árvore da Vida, ouroboros com heptagrama, mandalas);
    - 4 fotos de show;
    - o logo de 2019 (dourado).
  - Quase tudo tem **≤ 1200px**; só `show4.jpg` (1200×675) é paisagem larga. `canvas.png` (300×150, 570 bytes) parece vazio.

**Consequência direta:** fotos e capas **não aguentam ser exibidas nítidas em largura total** numa tela de 1440–1920px. Isso favorece fortemente a técnica da Reference 04: imagem nítida em tamanho moderado sobre uma atmosfera desfocada e escurecida, que aguenta ser ampliada.

---

## 1. Análise de cada referência

### 1.1 Reference 01: header, tipografia, interação, hero, newsletter

| Característica extraída | Função visual |
|---|---|
| Paleta bicromática: quase-preto `#010101` + bege `#decec0`, raio 0 [EXTRAÍDO] | Sobriedade; o texto "brilha" em tom quente sobre o escuro, sem branco puro |
| Fonte display serifada em CAIXA ALTA com tracking largo (4px na nav, 12px nos títulos) + sans humanista para leitura [EXTRAÍDO] | Hierarquia por espaçamento e caixa, não por peso |
| Header fixo, transparente → preto após 50px de scroll, 0.3s [EXTRAÍDO] | Some sobre o hero e se materializa ao rolar |
| Logo centralizado entre 3 links de cada lado, células iguais [EXTRAÍDO] | Simetria cerimonial; o logo vira eixo da página |
| Hero com vídeo 64:35 em largura total, sem overlay, **degradê de 15% para preto na base** [EXTRAÍDO] | Imagem que se dissolve na seção seguinte |
| Título do hero com tamanho fluido calculado pelo nº de letras [EXTRAÍDO] | Tipografia como imagem, ocupando a largura |
| **Só dois padrões de interação:** opacidade 1 → 0.75 (links) e contorno → preenchido (botões), 0.2s ease-in-out [EXTRAÍDO] | Sistema mínimo, previsível |
| Rolagem para âncoras em 600ms, curva easeInOutSine [INFERIDO] | Navegação interna suave |
| Newsletter: imagem à esquerda (4/12) + formulário à direita (5–6/12); no mobile o formulário sobe [EXTRAÍDO] | Composição assimétrica imagem/ação |
| Falhas: outline de foco removido, foco do input escurece para `#333`, link azul fora da paleta, **mobile sem menu** [EXTRAÍDO] | Nenhuma |

- **Útil:**
  - a contenção do sistema de interação (2 padrões);
  - texto em tom quente em vez de branco;
  - raio 0;
  - degradê da imagem para o fundo;
  - header que se materializa no scroll;
  - simetria com o logo como eixo;
  - título fluido como elemento gráfico.
- **Específico demais:**
  - a fonte display usada (versão demo, identidade de outra banda);
  - o bege exato `#decec0`;
  - título do hero preto sobre o vídeo (some enquanto o vídeo carrega);
  - widget de turnê, loja, ícones sociais como faixa.
- **Combinável:**
  - header + linha dourada da Ref04;
  - degradê do hero + regra "tudo termina no mesmo preto" da Ref04;
  - botão de contorno + colchetes da Ref04;
  - hover por opacidade + o hover idêntico da Ref03.

### 1.2 Reference 02: estrutura espacial

| Característica extraída | Função visual |
|---|---|
| Bloco central estreito e centralizado, sem fundo próprio; o background aparece nas laterais [EXTRAÍDO] | Moldura de "página" dentro da tela; sensação de site dos anos 2000 |
| Proporções pedidas: bloco **70% da viewport**, margens 15%; principal **71.4%** · secundária **28.6%** do bloco [PEDIDO, registrado na extração] | Coluna larga de leitura + coluna estreita de apoio |
| Divisória vertical de 1px com **espaço simétrico** (≈ 3% do bloco) [EXTRAÍDO] | Separa sem criar caixas |
| Cabeçalho do site **dentro** da coluna principal; a secundária começa no topo [EXTRAÍDO] | Composição de blog/arquivo, não de "landing page" |
| Coluna secundária de destaques: miniatura **2.125:1** + **uma linha** de texto truncada, itens de altura fixa, espaço 3:1 entre itens × imagem-texto [EXTRAÍDO] | Índice visual compacto; "marginália" |
| Ritmo vertical: espaço entre posts **≈ 5.5×** o espaço interno [EXTRAÍDO] | Entradas separadas por silêncio, não por bordas |
| Linhas internas "item à esquerda + item à direita" (autor/data, logo/link) [EXTRAÍDO] | Metadados de arquivo |
| Mídia sempre em 100% da largura da coluna [EXTRAÍDO] | Imagens como "pranchas" da coluna |
| Sem responsividade nenhuma (842px fixos) [EXTRAÍDO] | Nenhuma (é uma limitação) |

- **Útil:**
  - a estrutura bloco → coluna principal → divisória → coluna secundária;
  - a marginália de miniaturas com legenda de uma linha;
  - o ritmo vertical;
  - metadados em linha;
  - o cabeçalho integrado à coluna, como opção.
- **Específico demais:**
  - largura fixa;
  - terceira coluna;
  - navegação por imagens de texto;
  - tipografia dourada em Verdana;
  - textura marrom;
  - barras de comentário/curtir, banners de anúncio, paginação numérica tradicional.
- **Combinável:**
  - margens laterais mostrando o **background fixo** da Ref04;
  - divisória transformada na **linha dourada vertical** da Ref04;
  - miniaturas com o tratamento de imagem da Ref04;
  - entradas com a tipografia de rótulos proposta.

### 1.3 Reference 03: setas e transição de conteúdo

| Característica extraída | Função visual |
|---|---|
| Chevron de 45°, pontas arredondadas, proporção 1:1.75, sem fundo; ~22×38px a 1920 [EXTRAÍDO] | Seta quase invisível como objeto; só direção |
| Seta **fora** do quadro do conteúdo, centralizada na vertical [EXTRAÍDO] | Não cobre a imagem; o conteúdo fica limpo |
| Área clicável de 50×50px (vídeos) × só o ícone (música) [EXTRAÍDO] | A primeira é a solução correta |
| Hover: opacidade 1 → 0.6, 0.3s ease (vídeos) [EXTRAÍDO] | Consistente com a Ref01 |
| Trilha rígida: deslocamento = item + espaço, **250ms ease**, sem fade, sem escala, saída e entrada simultâneas [EXTRAÍDO] | Movimento físico e literal, como um filme que corre |
| Navegação circular, setas nunca desativadas [EXTRAÍDO] | Sem "fim" visível |
| Falhas: setas não focáveis, ícone saindo da tela em tablets na vertical [EXTRAÍDO] | Nenhuma |

- **Útil:** praticamente todo o comportamento (posição externa, hover por opacidade, trilha rígida, circularidade).
- **Específico demais:** dimensionamento só em `vw` misturado com px fixos; ícone branco puro; botão de "play" sobreposto às miniaturas de vídeo.
- **Combinável:**
  - cor do ícone no tom de texto quente (Ref01);
  - duração ajustada ao ritmo mais lento da Ref04;
  - uso com fotos dos integrantes e de shows.

### 1.4 Reference 04: background, álbuns, divisórias

| Característica extraída | Função visual |
|---|---|
| Fundo base preto + texturas por seção **já escurecidas no arquivo** (luminância média ~3%, máxima ~29%) [OBSERVADO] | Profundidade sem competir com o conteúdo |
| Textura **fixa na viewport** dentro de uma seção: a seção vira "janela" que revela a imagem imóvel [EXTRAÍDO] | O momento de transparência; revelação pelo scroll |
| Todas as imagens terminam em **preto puro nas bordas** [OBSERVADO] | Emendas invisíveis entre seções, sem fade em código |
| "Bloco central" pintado na própria textura (centro preto em ~56% da largura) [OBSERVADO] | Impressão de coluna escura com textura nas laterais |
| Álbum principal em largura total, 2.667:1, capa à esquerda + texto à direita [EXTRAÍDO]/[OBSERVADO] | Destaque cinematográfico |
| Grade de 4 células iguais, proporção 1:1.367, **espaço preto de 12px** + borda 1px `#111` [EXTRAÍDO] | Separação estrutural, sem linhas desenhadas |
| Card: arte do álbum ampliada, **escurecida ~46%**, blur leve, capa nítida a 73% da largura, nome fino em caixa alta, botão de **colchetes** [OBSERVADO] | Capa nítida em primeiro plano, a mesma arte como atmosfera |
| Zoom 1.03, 0.5s ease, dentro da moldura [EXTRAÍDO] | Hover tátil e contido |
| Entrada no scroll: subida de 20px + fade, 0.6s `cubic-bezier(0,0,.3,1)`, cascata de 75ms [EXTRAÍDO] | Conteúdo "emerge" |
| Linha dourada `#e2ad3a`, 2px, ponto branco central, **estática** [EXTRAÍDO] | Separador de **zona** (nunca entre itens) |

- **Útil:**
  - hierarquia de luminância (fundo < atmosfera < capa);
  - regra de emenda em preto;
  - fundo fixo como janela;
  - composição de placa do álbum;
  - grade com espaço preto;
  - zoom contido;
  - entrada por cascata;
  - linha dourada como separador de zona.
- **Específico demais:**
  - a fonte de títulos da loja;
  - as composições promocionais prontas (imagem única com texto e botão "embutidos");
  - as texturas específicas da loja;
  - a troca por GIF no hover;
  - a densidade de vitrine (produtos, preços).
  - **Atenção:** esta é a loja **oficial** da banda. Fonte, dourado e composições pertencem à identidade oficial, então devem ser reinterpretados, não reproduzidos.
- **Combinável:**
  - com a estrutura da Ref02: o fundo fixo aparece nas margens do bloco e nas janelas;
  - com o degradê de hero da Ref01;
  - com as setas da Ref03, num carrossel de placas;
  - o dourado como divisória vertical da Ref02.

---

## 2. Características por função (com veredito)

Legenda do veredito: **REUSAR** (direto) · **ADAPTAR** · **DESCARTAR**.

### A. Estrutura e layout

| Característica | Ref. | O que faz | Veredito |
|---|---|---|---|
| Bloco central 70vw, margens 15% [PEDIDO/EXTRAÍDO] | 02 | Mostra o fundo nas laterais | **REUSAR** |
| Divisão 10:4 com divisória vertical | 02 | Coluna de leitura + marginália | **REUSAR** |
| Espaço simétrico de ~3% do bloco em torno da divisória | 02 | Respiro sem caixas | **REUSAR** |
| Cabeçalho dentro da coluna principal | 02 | Estrutura de blog antigo | **ADAPTAR**: só nas páginas internas, como "cabeçalho de capítulo"; o header global continua sendo uma faixa |
| Seções em largura total, encostadas, sem espaço entre elas | 04 | Fluxo contínuo | **ADAPTAR**: só para placas e janelas |
| "Bloco" pintado na própria imagem de fundo | 04 | Bloco sem caixa | **ADAPTAR**: substituído por um bloco real de bordas esfumadas [PROPOSTA] |
| Grade de 4 colunas com espaço preto de 12px | 04 | Itens iguais separados por "vazio" | **REUSAR** |
| Newsletter imagem 4/12 + formulário 5–6/12, que se reorganiza no mobile | 01 | Composição assimétrica | **ADAPTAR**: padrão "imagem + texto" assimétrico, não necessariamente formulário |
| Largura fixa de 842px, sem responsividade | 02 | — | **DESCARTAR** |
| Terceira coluna | 02 | — | **DESCARTAR** |
| Responsivo proposto: margens encolhem antes de empilhar; < 768px empilha e a divisória vira horizontal [PEDIDO] | 02 | Preserva o princípio até o tablet | **REUSAR** |

### B. Navegação

| Característica | Ref. | O que faz | Veredito |
|---|---|---|---|
| Header fixo, transparente → sólido após 50px, 0.3s | 01 | Some sobre a abertura | **REUSAR** |
| Logo central com links simétricos dos dois lados | 01 | Eixo cerimonial | **ADAPTAR**: 2 + 2 links com wordmark central [PROPOSTA] |
| Nav em caixa alta com tracking largo | 01, 04 | Leitura como "etiqueta" | **ADAPTAR**: em fonte de rótulo (mono) [PROPOSTA] |
| Linha dourada de 2px fechando o header | 04 | Separa header e conteúdo | **REUSAR** + realce irregular [PROPOSTA] |
| Hover por opacidade (0.75 / 0.6) | 01, 03 | Feedback discreto | **REUSAR**, unificado em 0.65 |
| Mobile sem menu | 01 | — | **DESCARTAR**: menu de tela cheia obrigatório |
| Ícones sociais no header | 01 | — | **DESCARTAR** (no máximo no rodapé) |
| Rolagem suave para âncoras (600ms) | 01 | Navegação interna | **REUSAR** |
| Setas de carrossel | 03 | Navegação lateral entre conteúdos | **REUSAR** com ajustes (ver F) |
| Marginália como índice da página | 02 | Navegação secundária | **ADAPTAR**: índice de capítulos/integrantes [PROPOSTA] |

### C. Tipografia

| Característica | Ref. | O que faz | Veredito |
|---|---|---|---|
| Par display + leitura; hierarquia por caixa/tracking em vez de peso | 01 | Contenção | **ADAPTAR**: 3 papéis (display / leitura / rótulo) [PROPOSTA] |
| Tracking largo em caixa alta (0.25–0.75rem) | 01, 04 | Ar cerimonial | **ADAPTAR**: só em rótulos, nav, botões e nomes de álbum |
| Título fluido que ocupa a largura | 01 | Tipografia como imagem | **ADAPTAR**: `clamp()` em vez da fórmula por letras |
| Nome do álbum fino, geométrico, caixa alta, tracking amplo (~0.12em) | 04 | Etiqueta técnica | **ADAPTAR**: em fonte mono fina [PROPOSTA] |
| Tipografia pequena e densa da coluna de arquivo | 02 | Sensação de arquivo | **ADAPTAR**: só em metadados/legendas, não no corpo |
| Fontes originais (display demo, Verdana, fonte da loja, Helvetica do formulário) | 01, 02, 04 | — | **DESCARTAR** |

### D. Imagens e fundos

| Característica | Ref. | O que faz | Veredito |
|---|---|---|---|
| Fundo escurecido (luminância média ~3–10%) | 04 | Profundidade silenciosa | **REUSAR** como faixa-alvo |
| Fundo fixo revelado por janelas | 04 | Momento de transparência | **REUSAR** |
| Imagens terminam no preto (vinheta, degradê na base) | 04, 01 | Integração ao ambiente | **REUSAR** como regra global |
| Atmosfera: mesma arte ampliada, escurecida ~40%, blur leve atrás da imagem nítida | 04 | Cor contextual + resolve a baixa resolução | **REUSAR** para álbuns; **ADAPTAR** para fotos de integrantes |
| Capa nítida sem filtro, em tamanho moderado | 04 | Foco único | **REUSAR** |
| Hero sem overlay, com título preto sobre a imagem | 01 | — | **DESCARTAR** (risco de legibilidade) |
| Textura marrom de página | 02 | — | **DESCARTAR** |
| Composição com texto embutido na imagem | 04 | — | **DESCARTAR**: tudo em camadas HTML |

### E. Componentes

| Componente | Ref. | Veredito |
|---|---|---|
| Placa de álbum (atmosfera + capa + nome + botão) | 04 | **ADAPTAR** em camadas reais |
| Álbum principal grande + grade de 4 | 04 | **REUSAR**: 5 álbuns de estúdio = 1 + 4 |
| Item de marginália (miniatura 2.125:1 + 1 linha) | 02 | **REUSAR** |
| Entrada de arquivo (título, linha de metadados, mídia em 100%, texto) | 02 | **ADAPTAR** |
| Botão de contorno quadrado | 01 | **ADAPTAR**: fundido ao botão de colchetes da Ref04 |
| Botão de colchetes (laterais inteiras, topo e base só nos cantos) | 04 | **ADAPTAR**: vira o botão-assinatura, com hover animado [PROPOSTA] |
| Carrossel com setas externas | 03 | **REUSAR** |
| Linha dourada | 04 | **ADAPTAR**: realce irregular, também na vertical |
| Espaço preto entre itens da grade | 04 | **REUSAR** |
| Formulário de newsletter | 01 | **DESCARTAR** por padrão (opcional, ver Próxima etapa) |
| Player de vídeo clique-para-tocar | 03 | **DESCARTAR** por padrão (opcional) |
| Lista de turnê, loja, ícones sociais | 01, 04 | **DESCARTAR** |

### F. Animações e interação

| Característica | Ref. | Valor de referência | Veredito |
|---|---|---|---|
| Hover de texto/ícone por opacidade | 01, 03 | 0.75 / 0.2s ease-in-out · 0.6 / 0.3s ease [EXTRAÍDO] | **REUSAR** unificado: 0.65 / 0.3s ease [PROPOSTA] |
| Botão contorno → preenchido | 01 | 0.2s ease-in-out [EXTRAÍDO] | **ADAPTAR**: colchetes que se fecham + preenchimento [PROPOSTA] |
| Zoom de imagem dentro da moldura | 04 | 1.03, 0.5s ease [EXTRAÍDO] | **REUSAR** |
| Entrada no scroll com cascata | 04 | 20px, 0.6s `cubic-bezier(0,0,.3,1)`, 75ms [EXTRAÍDO] | **REUSAR** (0.7s) |
| Header que escurece | 01 | 50px, 0.3s ease-in-out [EXTRAÍDO] | **REUSAR** |
| Trilha rígida do carrossel | 03 | 250ms ease [EXTRAÍDO] | **ADAPTAR**: 450ms, curva mais lenta [PROPOSTA] |
| Rolagem para âncoras | 01 | 600ms easeInOutSine [INFERIDO] | **REUSAR** |
| Fundo fixo (o "movimento" é a página passando) | 04 | — | **REUSAR** |
| Fades sequenciais de modal (250 + 250ms) | 01 | — | **DESCARTAR** (sem modais de letras) |
| Troca de imagem por GIF no hover | 04 | — | **DESCARTAR** |

### G. Atmosfera visual

| Ref. | Densidade | Espaço vazio | Contraste | Textura | Profundidade | Sensação dominante |
|---|---|---|---|---|---|---|
| 01 | baixa | muito | médio (bege sobre preto) | nenhuma | 1 plano + vídeo | cinematográfica, teatral, contida |
| 02 | **alta** | pouco | baixo | textura de papel/couro | plana | **editorial, arquivo, site antigo** |
| 03 | média | médio | médio | nenhuma | plana | funcional, neutra |
| 04 | média-alta | pouco (seções encostadas) | baixo no fundo, alto nas capas | **forte** (texturas escuras) | **3 planos** (fundo fixo, seção, capa) | sombria, profunda, ritualística (e comercial) |

O que nenhuma referência tem e o projeto precisa **criar**:
- **organicidade/biomorfismo**: todas as quatro são ortogonais e rígidas;
- **surrealismo**: nenhuma desloca escala ou plano de forma inesperada;
- **fotografia integrada ao ambiente** em vez de emoldurada.

---

## 3. Padrões, convergências e conflitos

### 3.1 Convergências (soluções que já "conversam")

1. **Fundo quase preto + texto em tom quente, nunca branco puro** (01, 04). Base segura para toda a paleta.
2. **Hover por redução de opacidade** (01: 0.75; 03: 0.6). Duas referências independentes chegaram ao mesmo gesto, então ele vira regra.
3. **Raio de borda zero** (01, 02, 04). Nada arredondado.
4. **Separar por espaço/linha em vez de caixa** (02: divisória + silêncio vertical; 04: espaço preto + linha dourada). Atende ao pedido de evitar cards.
5. **Imagem que se dissolve no fundo** (01: degradê da base; 04: vinhetas pretas). Regra global de integração.
6. **Movimento contido**: nenhuma referência usa escala > 1.03, bounce ou animação contínua chamativa.

### 3.2 Conflitos a resolver

| Conflito | Referências | Resolução |
|---|---|---|
| Bloco estreito com margens (02) × seções de largura total (04) | 02 × 04 | **Alternância de registros**: o bloco é o padrão; placas e janelas rompem para largura total em momentos definidos [PROPOSTA] |
| Fundo da página visível nas margens (02) × fundo oculto atrás de preto (04) | 02 × 04 | O fundo fixo da página fica **sempre visível nas margens**; dentro do bloco fica quase oculto, e as janelas o revelam inteiro [PROPOSTA] |
| Densidade de arquivo (02) × espaço cinematográfico (01) | 01 × 02 | Densidade **só** na coluna/marginália; abertura e placas têm muito espaço [PROPOSTA] |
| Tracking largo em tudo (01) × leitura longa | 01 | Caixa alta tracked só em rótulos; corpo em caixa normal [PROPOSTA] |
| Carrossel rápido (03: 250ms) × ritmo lento das imagens (04: 0.5–0.6s) | 03 × 04 | Carrossel a ~450ms [PROPOSTA] |
| Dourado oficial (04) × "não copiar a identidade oficial" | 04 | Manter o dourado como **material** (veio fino), nunca em logo, títulos ou grandes áreas; o realce irregular o diferencia do original [PROPOSTA] |

### 3.3 Mapa de coexistência

```
Ref04  fundo fixo escuro ─────────────┐
                                       ├─► margens 15% (Ref02) mostram o fundo
Ref02  bloco 70vw │ 10fr ┊ 4fr ───────┘
                       ┊
Ref04  linha dourada ──┘ (vertical entre colunas + horizontal entre zonas)

Ref01  header simétrico ─► + linha dourada (Ref04) ─► + hover opacidade (Ref01=Ref03)
Ref01  abertura full-bleed + degradê na base ─► + regra "termina no preto" (Ref04)
Ref04  placa de álbum + grade com espaço preto ─► dentro do bloco (Ref02)
Ref03  setas externas + trilha rígida ─► carrosséis de fotos (integrantes, shows)
Ref02  marginália 2.125:1 ─► índice de capítulos/integrantes, com tratamento de imagem Ref04
```

---

## 4. Nova linguagem visual: "Arquivo Anatômico"

**[PROPOSTA]**: nome de trabalho.

### 4.1 Premissa

O site se comporta como um **arquivo guardado no escuro**: um atlas onde cada época, álbum e integrante é uma **lâmina catalogada**. As imagens **emergem da escuridão** como num filme e recebem **anotações técnicas** como num atlas científico. A linguagem vem do universo do Tool sem recorrer aos seus símbolos óbvios:
- **anatomia e transparência**: camadas sobrepostas como pranchas anatômicas;
- **matemática** (proporção, sequência);
- **matéria orgânica** (veios, membranas, luz pulsando sob a superfície).

### 4.2 Três registros que se alternam

| Registro | Origem | Como se apresenta | Densidade |
|---|---|---|---|
| **1. Coluna de arquivo** | Ref02 (estrutura) + Ref01 (contenção) | Bloco de 70vw sobre o fundo; coluna principal + **veio dourado vertical** + marginália; textos, entradas, legendas | alta |
| **2. Placa** | Ref04 (composição de álbum) + Ref01 (abertura) | Imagem nítida isolada sobre a **própria atmosfera** desfocada; legenda técnica; pode romper o bloco para largura total | baixa |
| **3. Janela** | Ref04 (fundo fixo) | O bloco **se abre**: o fundo fixo aparece inteiro por ~60–80vh, com no máximo uma linha de texto | mínima |

O ritmo **coluna → placa → janela** dá a sensação **cinematográfica** (cortes de plano) e **editorial** (diagramação de revista/atlas).

### 4.3 Como cada exigência do projeto é atendida

| Exigência | Resposta [PROPOSTA] |
|---|---|
| Atmosfera sombria | Base quase preta; tudo termina nela; o fundo fica a ≤ 10% de luminância |
| Cinematográfico | Placas em **2.39:1** (formato de cinema) na abertura e nos cortes; fundo fixo com a página "passando" por cima; grão de filme sutil |
| Orgânico/biomórfico | (a) imagens que se **dissolvem** por máscaras elípticas assimétricas em vez de molduras retas; (b) linhas douradas tratadas como **veios**, com pulsos de luz irregulares; (c) fonte display com formas suaves; (d) no máximo **um** movimento lento e contínuo por tela |
| Surreal | **Desproporção deliberada de escala**: títulos enormes ao lado de rótulos de 11–12px; **três planos** que se movem em velocidades diferentes (fundo fixo, bloco que rola, imagem com zoom) |
| Imagens integradas ao ambiente | Toda foto recebe atmosfera ou vinheta; nenhuma foto "flutua" sobre um retângulo de cor |
| Forte presença de fotografia | Fotos de show e de integrantes como placas e janelas; capas como únicos elementos 100% nítidos |
| Editorial/experimental | Coluna + marginália; legendas numeradas ("FIG. 04"); metadados em fonte mono; títulos que quebram o grid |
| Estrutura de site antigo | Largura limitada, coluna + barra lateral, índice de miniaturas com legenda de uma linha, metadados de post, divisórias em linha. **Sem pastiche** (sem fontes pixel, GIFs, contadores) |
| Evitar "site gótico" | Sem blackletter, caveiras, sangue, fumaça, molduras ornamentais ou paleta vermelho/preto como base |
| Evitar excesso de ocultismo | Geometria sagrada só como **documento catalogado** (com legenda), nunca como ornamento, ícone ou padrão de fundo (ver princípio 14) |
| Evitar template moderno | Sem hero com dois botões, sem gradientes vibrantes, sem cards com sombra/raio, sem ícones decorativos, sem grids "bento" |
| Evitar cards e caixas | Agrupamento por **alinhamento, espaço e linha**. As únicas molduras são as das capas e da grade de álbuns (justificadas pelo objeto: capa = quadrado físico) |

### 4.4 Paleta conceitual

- **Base:** preto quase neutro.
- **Texto:** "osso/cinza" quente (derivado do bege da Ref01, mais acinzentado).
- **Acento:** **um único** acento material, o dourado em veios finos (Ref04).
- **Cor de verdade:** vem das **próprias imagens**, pela atmosfera de cada álbum (carmim do Undertow, gelo do Ænima, carne e violeta do Lateralus, cinza-violeta do 10,000 Days, aço azul do Fear Inoculum) [OBSERVADO nos assets]. A interface em si é quase monocromática.

---

## 5. O que será aproveitado de cada referência

| Elemento | Referência | O que será aproveitado | Adaptação necessária |
|---|---|---|---|
| Estrutura do conteúdo | 02 | Bloco de 70vw centralizado; principal 10fr + secundária 4fr; espaço simétrico de ~3% do bloco em volta da divisória | Responsivo novo (a referência não tem); bloco com superfície própria de bordas esfumadas [PROPOSTA] |
| Marginália | 02 | Miniatura 2.125:1 + uma linha truncada; itens de altura uniforme; relação 3:1 entre espaço entre itens e espaço imagem-texto | Vira **índice** (capítulos, integrantes, álbuns); miniaturas com tratamento da Ref04; destaque do item ativo no scroll [PROPOSTA] |
| Ritmo vertical | 02 | Espaço entre entradas ≈ 5–6× o espaço interno | Valores escalados (96px / 16–24px) [PROPOSTA] |
| Metadados em linha | 02 | "Rótulo à esquerda · valor à direita" | Em fonte mono, com hairline [PROPOSTA] |
| Header | 01 | Fixo; transparente → sólido após 50px em 0.3s; simetria com marca central | 2 + 2 links, wordmark central, linha dourada na base, **menu de tela cheia no mobile** [PROPOSTA] |
| Sistema de hover | 01 + 03 | Opacidade em links e ícones | Unificado em 0.65 / 0.3s ease [PROPOSTA] |
| Abertura (hero) | 01 | Largura total + degradê da imagem para o fundo + título fluido | Imagem (não há vídeo nos assets), 2.39:1 ou altura de tela, degradê de ~25%, título em `clamp()` legível (nunca preto sobre imagem) [PROPOSTA] |
| Raio 0, monocromia quente | 01 | Contenção e tom do texto | Tom osso mais acinzentado [PROPOSTA] |
| Botões | 01 + 04 | Contorno quadrado (01) + colchetes nos cantos (04) | Colchetes que **se fecham** no hover [PROPOSTA] |
| Setas e carrossel | 03 | Chevron 45° arredondado, 1:1.75; fora do quadro; área 50×50; opacidade 0.6 no hover; trilha rígida; circular | Cor osso; 450ms; botões focáveis, teclado; tamanho em `clamp()` [PROPOSTA] |
| Fundo fixo e janelas | 04 | Imagem fixa na viewport revelada por seções transparentes; luminância ≤ ~10% | Visível também nas margens do bloco; versões escurecidas dos assets do projeto [PROPOSTA] |
| Emenda em preto | 04 | Toda imagem termina na cor base | Implementado por degradês/máscaras para a cor base, não gravado no arquivo [PROPOSTA] |
| Placa de álbum | 04 | Atmosfera da mesma arte (ampliada ~1.4×, brilho −40%, blur leve) + capa nítida + nome fino + botão | Camadas HTML separadas; nome em mono fina [PROPOSTA] |
| Álbum principal + grade | 04 | 1 destaque largo + 4 células iguais, espaço preto de 12px, borda 1px `#111` | Dentro do bloco de 70vw (não full-bleed); 5 álbuns de estúdio = 1 + 4 [PROPOSTA] |
| Zoom | 04 | 1.03, 0.5s ease, origem central, dentro da moldura | Também nas fotos de integrantes (+ leve aumento de brilho) [PROPOSTA] |
| Entrada no scroll | 04 | 20px + fade, `cubic-bezier(0,0,.3,1)`, cascata de 75ms | 0.7s; uma vez por elemento [PROPOSTA] |
| Linha dourada | 04 | `#e2ad3a`, 2px, degradê horizontal com realce branco | Realces **irregulares e não simultâneos**; versão vertical de 1px entre colunas [PROPOSTA] |
| Separação de itens | 04 | Espaço preto em vez de linhas | Regra global: preto entre itens, dourado entre zonas |

---

## 6. O que deve ser evitado

### 6.1 Elementos que não entram

- Formulário de newsletter, lista de turnê, loja, carrinho, preços, ícones sociais em destaque (01, 04).
- Terceira coluna, banners intercalados, barras de comentário/curtir, paginação numérica tradicional (02).
- Overlays de letras com troca de faixa (01).
- Botão de "play" sobre miniaturas e player embutido como padrão (03).
- Imagens com texto/botão embutidos no arquivo (04).
- Troca de imagem por GIF animado no hover (04).

### 6.2 Padrões que tornariam o site genérico

- Hero com título + subtítulo + **dois botões** centralizados.
- Grade de cards com **sombra, raio e fundo próprio**; grids "bento".
- Gradientes coloridos, brilhos neon, glassmorphism com blur forte.
- Ícones decorativos ao lado de cada título; seções "features" em três colunas.
- Animações de entrada diferentes em cada seção; parallax em JS em tudo; cursores customizados.
- Paleta **vermelho + preto** como base (clichê de "site de metal").
- Fontes blackletter, góticas, de "terror" ou sci-fi (Orbitron e similares).

### 6.3 Associações fortes demais com uma referência

- Bege exato `#decec0`, fonte display demo e título fluido por contagem de letras **em preto** (01).
- Dourado tipográfico em Verdana, textura marrom, largura de 842px (02).
- Ícone de seta branco puro com tamanho só em `vw` (03).
- Fonte de títulos da loja, composições promocionais, uso do dourado em títulos e no logo (04), que são **identidade oficial da banda**.

### 6.4 Símbolos

- Pentagrama/heptagrama, ouroboros, Metatron, Flor da Vida e Árvore da Vida **não** viram ornamento, ícone, padrão de fundo ou divisor.
- Se aparecerem, é como **peça documentada** na página Arquivo, com legenda.
- **Olhos múltiplos**, mãos espalmadas e chamas não devem ser repetidos como motivo gráfico da interface (já estão nas imagens).

### 6.5 Tecnologias sem importância visual

CMS, temas, frameworks de grid, bibliotecas de carrossel, bibliotecas de ícones, analytics, pixels, tag managers, consentimento de cookies, SEO estruturado e APIs de terceiros. Nenhuma faz parte do design. Os comportamentos visuais extraídos devem ser implementados com HTML/CSS/JS próprios.

---

## 7. Princípios visuais

Todos **[PROPOSTA]**, salvo a origem indicada.

1. **Uma cor de base absoluta.** Fundo, degradês, vinhetas e espaços entre itens usam o mesmo token de base (`--c-base`). Nenhuma imagem toca o fundo com borda dura, exceto capas de álbum e células de grade, que têm moldura de 1px quase preta. *(Origem: Ref04)*

2. **O conteúdo vive num bloco de 70vw.** O bloco é centralizado, com 15% de margem de cada lado em ≥ 1200px, e as margens mostram o fundo fixo da página. O bloco tem superfície escura com as **bordas laterais esfumadas** em ~48px (sem aresta reta) e largura máxima de ~1440px. *(Origem: Ref02 + Ref04)*

3. **Dentro do bloco: 10fr | veio dourado | 4fr.** O espaço em volta do veio é simétrico, `clamp(16px, 2.1vw, 40px)`. O veio é vertical, com 1px, e ocupa a altura toda da área de colunas. A coluna da direita é sempre **marginália**: índice, ficha técnica ou relacionados, nunca conteúdo principal. *(Origem: Ref02)*

4. **Alternância de registros.** Coluna de arquivo → placa → janela. Nenhuma página tem mais de ~2 alturas de tela seguidas de coluna sem uma placa ou janela. Janelas ocupam 60–80vh e têm no máximo **uma** linha de texto.

5. **Hierarquia de luminância em 4 níveis.**
   - Fundo fixo: luminância média ≤ 10%.
   - Superfície do bloco: ≈ 3–5%.
   - Atmosferas de imagem: 40–60% do brilho original.
   - Imagem de foco (capa, retrato ativo): 100%, **sem filtro**.

   Só o elemento de foco é nítido. *(Origem: Ref04)*

6. **Dois separadores, duas funções.**
   - **Espaço** (preto) entre itens de um mesmo conjunto: 12px na grade, 96px entre entradas.
   - **Veio dourado** entre zonas: header/conteúdo, coluna/marginália, fim de capítulo, conteúdo/rodapé.
   - Hairline osso a 12–14% de opacidade só para metadados.
   - No máximo **uma** linha dourada horizontal visível por tela.

   *(Origem: Ref04)*

7. **Nada de caixas flutuantes.** `border-radius: 0` global. Sem `box-shadow` externa em componentes. Sem fundos de "card" destacados do bloco. Agrupamento por alinhamento, espaço e linhas. *(Origem: Ref01/02/04 convergentes)*

8. **Três papéis tipográficos fixos.**
   - **Display:** títulos e números grandes.
   - **Leitura:** corpo, em caixa normal, ~68 caracteres por linha.
   - **Rótulo (mono):** nav, botões, datas, durações, legendas, nomes de álbum; sempre em caixa alta com tracking de 0.12–0.22em.

   Nenhum texto corrido em caixa alta. Nenhum título em fonte de rótulo, exceto nomes de álbum.

9. **Dois hovers apenas.**
   - Texto e ícones: opacidade 1 → 0.65 em 300ms `ease`.
   - Imagens: escala 1 → 1.03 em 500ms `ease`, dentro de moldura com `overflow: hidden`, sem mover a moldura.

   Nenhuma transição de hover abaixo de 200ms ou acima de 600ms; sem bounce, sem rotação. *(Origem: Ref01 + Ref03 + Ref04)*

10. **Entrada única e contida.** Elementos entram uma vez, ao aparecer na tela: subida de 16–20px + fade, 700ms `cubic-bezier(0, 0, .3, 1)`, cascata de 75ms entre irmãos. Tudo é desligado com `prefers-reduced-motion`. *(Origem: Ref04)*

11. **Navegação lateral por trilha rígida.**
    - Os itens deslizam juntos, sem fade nem escala, deslocamento = largura do item + espaço, ~450ms.
    - Setas **fora** do quadro, com área de 50×50px, circulares (nunca desativadas).
    - Operáveis por teclado (←/→) e com rótulo acessível.

    *(Origem: Ref03)*

12. **Fotos heterogêneas recebem um tratamento único.** Retratos e fotos de show são unificados por duotone/dessaturação (preto → osso), contraste normalizado e grão de 4–6%. **Capas de álbum nunca recebem esse tratamento**: são o único elemento em cor original.

13. **Imagens pequenas nunca são esticadas nítidas.** Nenhuma imagem é exibida nítida acima de ~1.25× sua largura nativa. Para preencher áreas grandes, usar a imagem como **atmosfera** (ampliada, desfocada, escurecida) com uma versão nítida menor em primeiro plano. *(Origem: Ref04 + [OBSERVADO] nos assets)*

14. **Simbologia sob controle.** Geometria sagrada/ocultista aparece apenas como **documento catalogado** (imagem com legenda na página Arquivo). Nunca como ícone, ornamento, divisor, padrão de fundo ou loader. No máximo **uma** referência matemática como recurso gráfico: a proporção áurea/sequência de Fibonacci em espaçamentos, que é estrutura e não símbolo.

15. **Acessível por padrão.**
    - Foco visível em todo elemento interativo (outline 1px na cor dourada, offset 3px).
    - Contraste mínimo de 4.5:1 para texto.
    - Menu e carrosséis operáveis por teclado.
    - Nenhum texto essencial dentro de imagens.

    Corrige falhas observadas nas Ref01, Ref03 e Ref04.

---

## 8. Estrutura proposta do site

**[PROPOSTA]**: 5 páginas. As 4 primeiras cumprem o mínimo; a 5ª organiza o material visual e permite uma navegação simétrica 2 + 2 em volta da marca.

### Componentes globais

- **Header:**
  - desktop: `HISTÓRIA · DISCOGRAFIA ┊ TOOL ┊ INTEGRANTES · ARQUIVO`;
  - a marca central leva à Início; filetes dourados curtos e verticais (~12px) flanqueiam a marca;
  - veio dourado de 2px fecha o header;
  - transparente sobre a abertura, sólido após 50px;
  - mobile: marca à esquerda + "MENU" (rótulo mono) à direita, abrindo uma tela cheia com os itens em fonte display grande.
- **Fundo fixo:** imagem escurecida por página, sempre visível nas margens do bloco e nas janelas.
- **Rodapé:** veio dourado em cima; uma linha de rótulos mono (créditos, fontes das imagens, natureza do projeto, voltar ao topo); sem colunas de links.

### 8.1 Início

```
[header transparente]
████████ ABERTURA (placa largura total, ~100vh ou 2.39:1) ████████
   foto de show escurecida + grão · título display gigante · rótulo mono
   degradê inferior (~25%) para a base
═══════════════ veio dourado ═══════════════
   ┌ BLOCO 70vw ───────────────────────────────┐
   │ Entrada: texto curto de apresentação  ┊ ÍNDICE      │
   │ Placa do álbum mais recente           ┊ [miniatura] │
   │ (atmosfera + capa + nome + botão)     ┊ História    │
   │                                       ┊ [miniatura] │
   │                                       ┊ Discografia │ …
   └────────────────────────────────────────────┘
░░░░░░░░ JANELA: fundo fixo inteiro, uma frase ░░░░░░░░
   ┌ BLOCO ─────────────────────────────────────┐
   │ AO VIVO: carrossel de fotos de show      ┊ Discografia em lista │
   │ ‹ [ placa 3:2 ] ›                        ┊ ano · nome (mono)    │
   └────────────────────────────────────────────┘
═══════════════ veio dourado ═══════════════
[rodapé]
```

- **Relação com o background:** a abertura cobre o fundo; o bloco o deixa nas margens; a janela o revela inteiro.
- **Hierarquia:** título da abertura → placa do álbum → índice → carrossel.
- **Componentes:** header, placa de abertura, entrada, placa de álbum, marginália-índice, janela, carrossel com setas, veios.
- **Interações:** header escurecendo; entrada em cascata; zoom nas placas; colchetes se fechando nos botões; carrossel por setas e teclado.

### 8.2 História

- **Estrutura:**
  - cabeçalho de capítulo **dentro da coluna principal** (título display + rótulo "CRONOLOGIA · 1990–HOJE"), como na Ref02;
  - a marginália começa no topo, ao lado.
- **Coluna principal:**
  - **entradas por era** (ex.: formação e Undertow; Ænima; Lateralus; 10,000 Days; hiato e Fear Inoculum);
  - cada entrada: linha de metadados (era à esquerda, anos à direita), texto e figuras;
  - figuras: pôsteres, fotos de época em 100% da coluna, legendas numeradas "FIG. 07 · Pôster de turnê, 2019".
- **Marginália:** **linha do tempo-índice** fixa durante a rolagem. Itens com miniatura 2.125:1 + ano (mono) + título de uma linha; o item da era visível fica ativo (realce dourado).
- **Background:** 2–3 **janelas** entre eras, cada uma com um fundo fixo diferente (troca de "época").
- **Interações:** realce da marginália conforme o scroll; rolagem suave ao clicar num ano; entrada em cascata das figuras.

### 8.3 Discografia

- **Estrutura:**
  - placa do **álbum principal** (Fear Inoculum, o mais recente) na largura do bloco, 2.667:1 no desktop e 1:1 no mobile: atmosfera da capa + capa nítida à esquerda (~32% da largura) + nome (mono fina), ano e botão à direita;
  - 12px de preto;
  - **grade de 4** (Undertow, Ænima, Lateralus, 10,000 Days), células 1:1.367 com espaço preto de 12px e borda de 1px.
- **Abaixo:** uma **entrada por álbum** (âncoras).
  - Coluna principal: texto, **lista de faixas** (número e duração em mono, hairlines entre faixas).
  - Marginália: ficha técnica (ano, duração, gravadora, produção) em metadados mono + links "anterior/próximo".
- **Background:** o fundo fixo pode **assumir a atmosfera do álbum** em foco (troca com fade de ~600ms). [PROPOSTA opcional]
- **Interações:** zoom 1.03 nas placas; colchetes; clique na placa → rolagem até a entrada.

### 8.4 Integrantes

- **Estrutura:**
  - topo: **grade de 4 retratos** (4:5, duotone, espaço preto de 12px) como índice;
  - abaixo, uma **entrada por integrante** (Maynard James Keenan, Adam Jones, Justin Chancellor, Danny Carey).
- **Coluna principal de cada entrada:**
  - nome em display + função em rótulo mono;
  - **carrossel das 3 fotos** (setas externas, trilha rígida) em proporção fixa 4:5;
  - biografia.
- **Marginália:** ficha (instrumento, anos na banda, outros projetos) + "outros integrantes" (miniaturas 2.125:1 + nome), que funciona como navegação.
- **Background:** fundo fixo neutro (textura de palco escurecida); uma janela entre integrantes é opcional.
- **Interações:** hover nos retratos (zoom 1.03 + brilho 0.75 → 0.95, duotone se abrindo levemente para a cor) [PROPOSTA]; carrossel por setas e teclado.

### 8.5 Arquivo

Recomendada; pode ser cortada se o escopo exigir.

- **Estrutura:** coluna principal com três seções (**Pôsteres**, **Arte**, **Ao vivo**). Cada uma é uma grade com espaço preto e células de proporção uniforme por seção. Cada peça leva um rótulo de catálogo mono ("AQ-014 · PÔSTER · 2019").
- **Marginália:** índice das seções + contagem de peças.
- **Papel:** é o **único** lugar onde a arte visionária e a geometria sagrada aparecem, como documentos catalogados.
- **Interações:** clique abre visualização ampliada (placa em tela cheia sobre a base, com setas da Ref03 para navegar entre peças e Esc para fechar).

---

## 9. Sistema visual preliminar

Valores provisórios. Tudo é **[PROPOSTA]**, exceto onde indicado.

### 9.1 Cores

| Token | Valor | Uso | Procedência |
|---|---|---|---|
| `--c-base` | `#050505` | Fundo absoluto, espaços da grade, destino de todos os degradês | [PROPOSTA] entre `#010101` (01) e `#000` (04) |
| `--c-surface` | `rgba(6, 6, 5, 0.9)` | Superfície do bloco central. Deixa o fundo fixo **transparecer de leve** (efeito de lâmina sobreposta) | [PROPOSTA] |
| `--c-surface-2` | `#11100f` | Linha ativa da lista de faixas, campo de busca/menu | [PROPOSTA] |
| `--c-text` | `#d9d1c5` (osso) | Texto principal: ≈ 13.5:1 sobre a base | [PROPOSTA] derivado de `#decec0` (01) |
| `--c-text-2` | `#8a8277` | Texto secundário, legendas: ≈ 5.3:1 | [PROPOSTA] |
| `--c-text-3` | `#4a453f` | Só decorativo (numerações grandes de fundo), **nunca** texto essencial | [PROPOSTA] |
| `--c-gold` | `#e2ad3a` | Veios, foco, item ativo | [EXTRAÍDO] (04) |
| `--c-gold-hi` | `#ffffff` | Realces dos veios | [EXTRAÍDO] (04) |
| `--c-hairline` | `rgba(217, 209, 197, 0.14)` | Linhas de metadados e entre faixas | [PROPOSTA] |
| `--c-frame` | `#111111` | Moldura de 1px de capas e células | [EXTRAÍDO] (04) |
| Interação | opacidade 0.65 (hover); dourado (foco/ativo) | — | [PROPOSTA] unificando 01/03 |
| Overlay de imagem | `linear-gradient(to bottom, transparent 55%, var(--c-base))` | Base das placas e da abertura | [PROPOSTA] (01: 15% → aqui ~25–45%) |
| Vinheta | `radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,5,5,.85) 100%)` | Fundos fixos e janelas | [PROPOSTA] equivalente à vinheta gravada da 04 |
| Atmosferas de álbum | cor vinda da própria capa (não é token) | Placas | [OBSERVADO] nos assets |

### 9.2 Tipografia

Candidatas, todas gratuitas no Google Fonts. **[PROPOSTA]**, a validar na próxima etapa.

| Papel | Família | Fallback | Observação |
|---|---|---|---|
| **Display** | **Fraunces** (variável: peso, tamanho óptico, eixo *soft*) | `"Times New Roman", serif` | Serifa editorial com eixo de suavidade que dá **organicidade**. Usar peso 300–400 e *soft* 50–100. Alternativa: Cormorant Garamond |
| **Leitura** | **Mulish** (antiga "Muli", herdada da Ref01) | `system-ui, sans-serif` | Sans humanista legível em fundo escuro; peso 300–400 |
| **Rótulo** | **IBM Plex Mono** | `ui-monospace, monospace` | Tom de arquivo/atlas técnico; peso 200–400. Substitui a fonte geométrica fina dos nomes de álbum da Ref04 |

| Nível | Família / peso | Tamanho | Line-height | Tracking | Caixa |
|---|---|---|---|---|---|
| Display XL (abertura) | Display 300 | `clamp(56px, 9vw, 160px)` | 0.95 | −0.01em | normal |
| H1 (página) | Display 300 | `clamp(44px, 5.5vw, 88px)` | 1.0 | −0.01em | normal |
| H2 (seção/era) | Display 400 | `clamp(30px, 3vw, 48px)` | 1.1 | 0 | normal |
| H3 (entrada) | Display 400 | 24–28px | 1.2 | 0 | normal |
| Corpo | Leitura 300/400 | 17px | 1.7 | 0 | normal; máx. ~68ch |
| Corpo pequeno | Leitura 400 | 15px | 1.6 | 0 | normal |
| Rótulo / kicker | Mono 400 | 12px | 1.4 | 0.2em | MAIÚSCULAS |
| Navegação | Mono 400 | 12px | 1 | 0.22em | MAIÚSCULAS (01 usava ~0.29em) |
| Botão | Mono 400 | 12–13px | 1 | 0.2em | MAIÚSCULAS |
| Nome de álbum | Mono 200–300 | `clamp(18px, 2vw, 30px)` | 1.1 | 0.12em | MAIÚSCULAS, centralizado (características de [OBSERVADO] 04) |
| Legenda / FIG. | Mono 400 | 11–12px | 1.5 | 0.1em | MAIÚSCULAS no prefixo |

### 9.3 Layout

| Item | Valor | Procedência |
|---|---|---|
| Bloco central | `width: 70vw; max-width: 1440px`; centralizado | [EXTRAÍDO] 70% (02, pedido) · máx. [PROPOSTA] |
| Margens externas | 15% de cada lado (≥ 1200px) | [EXTRAÍDO] (02, pedido) |
| Bordas do bloco | esfumado lateral de ~48px (máscara) | [PROPOSTA] |
| Colunas | `10fr 4fr` | [EXTRAÍDO] (02, pedido) |
| Espaço em volta do veio | `clamp(16px, 2.1vw, 40px)` de cada lado | [INFERIDO] da razão 25/842 ≈ 3% (02) |
| Marginália: miniatura | 100% da coluna, 2.125:1 (17:8); legenda de 1 linha | [EXTRAÍDO] (02) |
| Escala de espaçamento | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px | [PROPOSTA] |
| Ritmo vertical | entre entradas 96px · interno 16–24px · título → conteúdo 32–48px | [PROPOSTA] com a razão ~5.5:1 da 02 |
| Grade de álbuns | 4 colunas; espaço 12px (6px no mobile); células 1:1.367; borda 1px | [EXTRAÍDO] (04) |
| Álbum principal | largura do bloco; 2.667:1 (desktop), 1:1 (mobile) | [EXTRAÍDO] proporções (04) · largura [PROPOSTA] |
| Placas cinematográficas | 2.39:1 ou 100vh na abertura; largura total | [PROPOSTA] |
| Janelas | 60–80vh, largura total, bloco transparente | [PROPOSTA] sobre a técnica [EXTRAÍDO] (04) |
| Header | altura ~64–72px; veio de 2px na base | [PROPOSTA] |

**Responsivo:**

| Faixa | Bloco | Colunas | Veio entre colunas | Grade de álbuns |
|---|---|---|---|---|
| ≥ 1200px | 70vw | 10fr \| 4fr | vertical | 4 colunas |
| 960–1199px | ~84vw | 10fr \| 4fr | vertical | 4 colunas |
| 768–959px | ~90vw | 10fr \| 4fr ou empilhado | vertical/horizontal | 2×2 |
| < 768px | 100% − 2 × 16–24px | empilhado; a marginália vira faixa rolável horizontal ou lista | **horizontal** | 2×2, espaço 6px |

Faixas [EXTRAÍDO] da adaptação proposta na extraction2 + [EXTRAÍDO] (04) para a grade.

### 9.4 Imagens

| Tipo | Tratamento | Proporção | Procedência |
|---|---|---|---|
| **Fundo fixo** | brilho 0.22–0.30, saturação 0.6, contraste 1.05, blur 0–2px, vinheta para a base; fixo na viewport (com técnica que funcione em iOS) | cobre a viewport | [PROPOSTA] com faixa-alvo de luminância [OBSERVADO] (04: média ~3–10%) |
| **Atmosfera de álbum** | mesma capa, `cover`, escala 1.4×, **blur 2px**, **brilho 0.6** (−40%), saturação 0.9, degradê para a base a partir de ~55% da altura | preenche a placa | [OBSERVADO] (04: −46%, blur leve) + [EXTRAÍDO] intenção −40% |
| **Capa** | **sem filtro**; moldura 1px `#111`; sombra suave só por escurecimento local (não `box-shadow` de card) | 1:1; 73% da largura da célula; ~32% da largura do banner | [OBSERVADO] (04) |
| **Retratos** | duotone `#050505 → #d9d1c5` (ou cinza + 15% de cor), contraste normalizado, grão de 5%; brilho 0.75 em repouso | 4:5 | [PROPOSTA] |
| **Fotos de show** | brilho 0.55–0.7, grão, vinheta; cor preservada parcialmente | 3:2 no carrossel; 2.39:1 em placas | [PROPOSTA] |
| **Documentos (pôsteres, arte)** | sem filtro; moldura de 1px; legenda | proporção nativa | [PROPOSTA] |
| **Grão global** | camada fixa de ruído a 4–6% de opacidade, sem animação | — | [PROPOSTA] |
| **Integração orgânica** | máscara elíptica **assimétrica** nas fotos de placa/janela, para que se dissolvam na base em vez de terminar em retângulo | — | [PROPOSTA] |

### 9.5 Animações

| Token | Valor | Uso | Procedência |
|---|---|---|---|
| `--ease-standard` | `ease` = `cubic-bezier(.25,.1,.25,1)` | Hover, zoom | [EXTRAÍDO] (03, 04) |
| `--ease-out-slow` | `cubic-bezier(0,0,.3,1)` | Entradas | [EXTRAÍDO] (04) |
| `--ease-in-out-sine` | `cubic-bezier(.37,0,.63,1)` | Rolagem, carrossel, troca de fundo | [INFERIDO] (01) |
| Hover de texto/ícone | opacidade 1 → 0.65, 300ms, standard | links, nav, setas | [PROPOSTA] unificando 01 (0.75/0.2s) e 03 (0.6/0.3s) |
| Zoom de imagem | escala 1 → 1.03, 500ms, standard, origem central | placas, células, retratos | [EXTRAÍDO] (04) |
| Botão de colchetes | os segmentos dos cantos crescem até se encontrar (300ms) e o fundo preenche em osso com texto na cor base (200ms, com 100ms de atraso) | botões | [PROPOSTA] sobre 01 + 04 |
| Header | fundo transparente → base após 50px, 300ms ease-in-out | header | [EXTRAÍDO] (01) |
| Entrada no scroll | 16–20px + fade, 700ms, out-slow, cascata de 75ms | blocos, células, figuras | [EXTRAÍDO] (04) com duração [PROPOSTA] |
| Carrossel | trilha rígida, 450ms, in-out-sine | integrantes, ao vivo, arquivo | [PROPOSTA] (03 usava 250ms ease) |
| Rolagem para âncora | 600ms, in-out-sine | índice, nav | [INFERIDO] (01) |
| Troca de fundo fixo | cross-fade de 600–800ms | discografia (opcional), eras da História | [PROPOSTA] |
| Veios dourados | realces irregulares estáticos; opcionalmente um deslocamento lento (10–14s por ciclo, in-out-sine, atrasos diferentes por linha) | veios | [PROPOSTA] (04 é estático) |
| Movimento reduzido | todas as animações e transições de movimento desligadas; troca de fundo instantânea | global | [PROPOSTA] |

---

## 10. Procedência das decisões-chave (resumo)

| Decisão | Classificação |
|---|---|
| Bloco de 70vw, colunas 10:4, divisória vertical | [EXTRAÍDO]: proporções pedidas e registradas na extraction2 |
| Espaço simétrico de ~3% do bloco em torno da divisória | [INFERIDO] da Ref02 |
| Fundo fixo revelado por janelas; tudo termina no preto | [EXTRAÍDO] / [OBSERVADO] na Ref04 |
| Superfície do bloco translúcida com bordas esfumadas | [PROPOSTA] |
| Três registros (coluna / placa / janela) | [PROPOSTA] |
| Dourado `#e2ad3a` em 2px | [EXTRAÍDO] (04) |
| Realces brancos irregulares e não simultâneos | [PROPOSTA] (pedido seu; não existe na 04) |
| Hover por opacidade | [EXTRAÍDO] (01, 03), unificado em [PROPOSTA] |
| Zoom 1.03 / 0.5s | [EXTRAÍDO] (04) |
| Setas externas + trilha rígida | [EXTRAÍDO] (03); duração de 450ms é [PROPOSTA] |
| Atmosfera de álbum com −40% de brilho e blur leve | [OBSERVADO] (04: −46%) + intenção pedida |
| Três famílias (Fraunces / Mulish / IBM Plex Mono) | [PROPOSTA] |
| Duotone nos retratos, grão global | [PROPOSTA] |
| Cinco páginas, incluindo Arquivo | [PROPOSTA] |
| Geometria sagrada só como documento catalogado | [PROPOSTA] |

---

## 11. Próxima etapa

Decisões que precisam ser fechadas antes de escrever o `DESIGN.md` definitivo:

1. **Tipografia final.**
   - Confirmar Fraunces / Mulish / IBM Plex Mono ou escolher alternativas.
   - Testar legibilidade do corpo em `#d9d1c5` sobre `#050505` em 17px.
   - Fixar os valores do eixo *soft* da display.
   - Decidir se o nome dos álbuns fica em mono ou ganha uma quarta família.
2. **Marca no header.** Usar o logo oficial (em monocromia osso) ou um **wordmark tipográfico** próprio. A segunda opção evita copiar a identidade oficial.
3. **Dourado.**
   - Manter `#e2ad3a` exato ou deslocá-lo levemente (mais "latão", menos o dourado oficial de 2019).
   - Definir a espessura do veio vertical (1px ou 2px).
   - Escolher entre realces estáticos e animados.
   - Fixar o número de realces por linha e a regra de distribuição (posições fixas por linha ou geradas).
4. **Superfície do bloco.** Translúcida (`0.9`) ou opaca; bordas esfumadas ou retas. Testar com os fundos reais.
5. **Seleção de imagens por papel.**
   - Definir qual asset vira o fundo fixo de cada página.
   - Definir quais fotos viram placas e janelas.
   - Decidir se o escurecimento é **pré-processado** nos arquivos (mais leve, controlável) ou feito por filtros CSS.
6. **Tratamento dos retratos.** Duotone total, P&B ou cor dessaturada; testar com as 12 fotos, que variam muito em época, cor e resolução (`Chancellor3.jpeg` tem 252×350).
7. **Arquitetura final.**
   - Confirmar as 5 páginas (ou cortar "Arquivo", resolvendo a simetria do menu).
   - Decidir se cada álbum ganha página própria ou seção-âncora.
   - Decidir se Opiate (EP), ausente nos assets, entra.
   - Decidir se Paul D'Amour aparece só na História.
8. **Conteúdo textual.** Textos em português para História, álbuns (faixas, durações, ficha) e integrantes; fontes das informações.
9. **Direitos e créditos.** Arte visionária, pôsteres e fotos têm autores. Definir a forma de crédito nas legendas e no rodapé.
10. **Componentes opcionais.** Incluir ou não: newsletter (composição da Ref01), vídeos (clique-para-tocar), troca do fundo conforme o álbum, linha do tempo fixa na História.
11. **Abertura da Início.** Qual imagem (só `show4.jpg` é paisagem; 1200px), altura (100vh × 2.39:1) e texto do título. Considerar se haverá vídeo.
12. **Restrições técnicas.**
    - Confirmar HTML/CSS/JS puros, sem frameworks.
    - Fontes via Google Fonts.
    - Navegadores-alvo.
    - Técnica de fundo fixo compatível com iOS.
    - Orçamento de peso das imagens.
13. **Saneamento de assets.**
    - Renomear `Fear Inhumanity.jpeg` → Fear Inoculum.
    - Escolher entre as duas versões de 10,000 Days.
    - Descartar `canvas.png` (aparentemente vazio).
    - Evitar como fundo os pôsteres com logo impresso.
