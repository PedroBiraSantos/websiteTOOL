# DESIGN.md: Tool · Arquivo Anatômico

**Status:** documento oficial de design do projeto. Fonte única de verdade visual a partir de 2026-10-01 (v1.0).
**Escopo:** website não oficial sobre a banda Tool, construído em HTML, CSS e JavaScript.
**Precedência:** este documento substitui `design-synthesis.md` e as extrações (`extraction*.md`) em qualquer decisão. Esses arquivos ficam como histórico de pesquisa e **não** devem ser usados como especificação.

---

## 0. Como usar este documento

- Todos os valores em px assumem `1rem = 16px`.
- Quando um valor aparece como intervalo `clamp(mín, fluido, máx)`, implemente exatamente essa relação.
- Cores, fontes, durações e espaçamentos devem existir como **tokens nomeados** na implementação, com os nomes usados aqui.
- Se algo não estiver definido, aplique os princípios (seção 1) e a prioridade das regras (seção 14), **nunca** uma convenção de template.

### 0.1 Glossário (vocabulário obrigatório do projeto)

| Termo | Significado |
|---|---|
| **Abismo** | A cor de base absoluta (`#050505`). Destino de todo degradê, vinheta e emenda |
| **Fundo fixo** | Imagem escurecida presa à viewport, atrás de tudo, em todas as páginas |
| **Lâmina** | A superfície escura e levemente translúcida sobre a qual o conteúdo fica. Não é um card: é um plano contínuo |
| **Bloco** | A faixa central de conteúdo (70vw no desktop), sobre a Lâmina |
| **Bloco largo** | Variante mais larga do Bloco (84vw) para galerias e álbuns |
| **Coluna** | A área principal do Bloco (10 de 14 partes) |
| **Marginália** | A coluna estreita à direita (4 de 14 partes): índice, ficha, relacionados. Nunca conteúdo principal |
| **Veio** | Linha dourada separadora, com pulsos de luz irregulares |
| **Placa** | Imagem isolada como protagonista, em largura total ou da Coluna, integrada ao ambiente |
| **Janela** | Trecho em que a Lâmina se abre e uma imagem fixa aparece inteira, com no máximo uma linha de texto |
| **Dissolução** | Transição por degradê ou máscara para o Abismo. Onde há Dissolução, não há Veio |
| **Corte** | Transição seca entre planos. Todo Corte é marcado por um Veio |
| **Atmosfera** | Versão ampliada, escurecida e desfocada de uma imagem, usada como fundo de si mesma |
| **Membrana** | Máscara elíptica assimétrica que dissolve as bordas de uma foto no ambiente |
| **Documento** | Imagem mostrada como artefato catalogado (pôster, arte, capa), sem tratamento, com legenda |

---

## 1. Princípios de design

Estes 15 princípios valem para qualquer página ou componente, inclusive os que ainda não existem.

1. **Três registros, sempre alternados.** Toda página é composta por trechos de **Coluna de arquivo** (texto denso sobre a Lâmina), **Placa** (imagem protagonista) e **Janela** (fundo revelado). Nas páginas de leitura (Início, História, Integrantes), nunca deixe mais de **200vh** seguidos de Coluna sem uma Placa ou Janela.

2. **O fundo nunca está vazio e o conteúdo nunca flutua.** Toda página tem um Fundo fixo. O conteúdo sempre fica sobre a Lâmina. Nenhum componente tem fundo próprio destacado; as únicas superfícies são a Lâmina, o Abismo (emendas de grade) e os overlays de tela cheia.

3. **Corte = Veio; Dissolução = sem Veio.**
   - Onde dois planos se encontram com borda seca (header × conteúdo, conteúdo × rodapé, capítulo × capítulo), existe um Veio.
   - Onde se encontram por degradê ou máscara (abertura × Bloco, Lâmina × Janela, Placa × Bloco), **não** existe Veio.

4. **Luminância em camadas.**
   - Fundo fixo: luminância média ≤ 10%.
   - Lâmina: ≈ 3%.
   - Atmosferas: 60% do brilho original.
   - Elemento de foco (capa, retrato ativo): 100%, sem filtro.

   **Somente o elemento de foco é nítido.**

5. **Cor plena apenas nas capas de álbum.** Retratos ficam em monocromia quente; fotos de show, dessaturadas; a interface, praticamente monocromática. A cor intensa do site vem exclusivamente das capas e de suas Atmosferas.

6. **Imagens fazem parte do espaço, não de caixas.**
   - Placas, Janelas e fotos de cena se dissolvem no Abismo por degradê ou Membrana.
   - Só **capas, Documentos, células de grade e a janela do carrossel** têm borda reta, sempre com moldura de 1px `#111111`.

7. **Nenhuma imagem nítida é ampliada acima de 1.25× sua largura nativa.** Para cobrir áreas maiores, use a imagem como Atmosfera (desfocada e escurecida) e uma versão nítida menor em primeiro plano.

8. **Três papéis tipográficos, sem exceção.**
   - **Display** (Fraunces): títulos.
   - **Leitura** (Mulish): texto corrido.
   - **Rótulo** (IBM Plex Mono): navegação, botões, datas, legendas, nomes de álbum.

   Caixa alta existe **apenas** em Rótulo e no wordmark.

9. **Três tipos de hover, e apenas três.**
   - Texto/ícone: opacidade 1 → 0.65.
   - Imagem: zoom 1.03 dentro da moldura.
   - Botão: os colchetes se fecham.

   Nenhum outro efeito de hover é permitido.

10. **Movimento lento e único.**
    - Transições entre 300 e 800ms; nada de bounce, rotação ou escala acima de 1.03.
    - O único movimento contínuo do site são os **pulsos de luz dos Veios**.
    - Nenhum outro elemento se move sem ação do usuário ou do scroll.

11. **Raio zero, sem sombra externa.** `border-radius` é 0 em todo o site. Componentes não têm `box-shadow`. A única exceção é o **halo** escuro atrás das capas de álbum (seção 7.6).

12. **Coluna 10 : Marginália 4.** Quando o Bloco tem duas áreas, a proporção é sempre 10:4, separadas por um Veio vertical que ocupa a altura toda. A Marginália **apoia** a Coluna (índice, ficha, relacionados) e nunca carrega o conteúdo principal.

13. **Simbologia como documento.**
    - Geometria sagrada e símbolos ocultistas aparecem **somente** como Documentos catalogados, na seção Arte da página Arquivo, no máximo 4 peças.
    - Nunca como ícone, ornamento, padrão de fundo, divisor ou loader.

14. **Antigo sem pastiche.**
    - A influência de websites antigos vem da estrutura: coluna + marginália com miniaturas e legenda de uma linha, metadados de entrada, numeração de catálogo, largura limitada.
    - Proibidos: fontes pixel, GIFs, contadores de visita, molduras biseladas, fundos com padrão repetido.

15. **Legível e operável sempre.**
    - Texto com contraste mínimo de 4.5:1.
    - Foco visível em todo elemento interativo.
    - Menu, carrosséis e visualizador operáveis por teclado.
    - Nenhum texto essencial dentro de imagens.
    - Animações desligadas com `prefers-reduced-motion`.

---

## 2. Direção artística

### 2.1 Conceito: "Arquivo Anatômico"

O site é um **arquivo guardado no escuro**: um atlas em que cada época, álbum e integrante é uma lâmina catalogada. As imagens **emergem da escuridão** como num filme e recebem **anotações técnicas** como num atlas científico. A linguagem vem do universo da banda (anatomia, transparência em camadas, matemática, matéria orgânica) sem recorrer aos seus símbolos óbvios nem à sua identidade visual oficial.

### 2.2 Atributos

| Atributo | Como se manifesta |
|---|---|
| **Atmosfera** | Escura e silenciosa. Abismo quase preto; Fundo fixo com no máximo 10% de luminância média; nenhuma área clara grande |
| **Linguagem visual** | Editorial-científica: títulos serifados suaves, anotações em mono, legendas numeradas ("FIG. 04"), fichas técnicas |
| **Fotografia × interface** | A fotografia **é** o ambiente: Fundo fixo, Janelas, Placas. A interface é fina e recua: linhas de 1–2px, texto pequeno em mono, nada de blocos coloridos |
| **Conteúdo × espaço vazio** | Alternância de densidade: Coluna e Marginália são densas (texto pequeno, metadados); Placas e Janelas são quase vazias (uma imagem, uma linha) |
| **Fundo × interface** | O Fundo fixo fica sempre visível nas margens do Bloco (desktop) e inteiro nas Janelas. A Lâmina deixa o fundo transparecer de leve (88% de opacidade), como uma placa de vidro sobre um espécime |
| **Contraste** | Alto para texto (13.5:1 no texto principal); **baixo dentro das imagens** (realces de fundo ≤ 29%); o único brilho intenso são as capas e os pulsos brancos dos Veios |
| **Densidade** | Média-alta na leitura, mínima nos registros de imagem. Nunca densidade de vitrine |
| **Profundidade** | Quatro planos que se movem em velocidades diferentes: Fundo fixo (parado) → Lâmina e conteúdo (rolam) → imagem com zoom (responde ao mouse) → grão (sobre tudo, parado) |
| **Textura** | Grão fotográfico global, estático, a 4.5% de opacidade. Nenhuma outra textura (sem papel, couro ou ruído colorido) |
| **Orgânico/biomórfico** | (1) Membranas assimétricas dissolvendo fotos; (2) Veios com luz pulsando em ritmos diferentes, como fluxo sob a pele; (3) serifa display com formas suaves (eixo *soft* da Fraunces); (4) bordas laterais da Lâmina esfumadas, sem aresta reta |
| **Surreal** | Desproporção deliberada de escala (títulos de até 160px ao lado de rótulos de 12px); o Fundo fixo parado enquanto todo o resto passa; citações isoladas flutuando sobre imagens inteiras |
| **Antigo × contemporâneo** | Estrutura de site antigo (coluna + marginália, índice com miniaturas, metadados) com execução contemporânea (tipografia variável, máscaras, movimento suave, responsividade completa) |

### 2.3 O que o design NÃO deve parecer

- **Site gótico ou de metal genérico:** blackletter, caveiras, sangue, fumaça, chamas, texturas de pedra, molduras ornamentais, vermelho + preto como base.
- **Site esotérico:** mandalas, olhos e geometria sagrada como decoração, brilhos místicos, roxo/dourado "cósmico".
- **Landing page moderna:** hero centralizado com dois botões, cards com sombra e raio, ícones de "features", grids bento, gradientes vibrantes, glassmorphism.
- **Site corporativo limpo:** fundo branco, muito respiro uniforme, ilustrações vetoriais, tipografia neutra em todos os níveis.
- **Loja ou portal oficial da banda:** sem o logo oficial na interface, sem o dourado como cor de títulos ou fundos, sem composições promocionais com texto embutido.
- **Mashup das referências:** nenhum componente deve ser reconhecível como cópia de um site específico.

---

## 3. Sistema de cores

### 3.1 Paleta

| Nome | Token | HEX / valor | Função | Usar em | NÃO usar em |
|---|---|---|---|---|---|
| **Abismo** | `--c-abismo` | `#050505` | Base absoluta | Fundo do `body`, emendas de grade, header sólido, rodapé, destino de todos os degradês e vinhetas | Texto; superfícies "elevadas" |
| **Lâmina** | `--c-lamina` | `rgba(9, 8, 7, 0.88)` (opaco equivalente: `#090807`) | Superfície do Bloco | A área sob a Coluna e a Marginália | Componentes individuais; cards |
| **Lâmina 2** | `--c-lamina-2` | `#12100e` | Superfície secundária | Fundo do estado pressionado de botões; fundo da faixa de índice fixa no mobile | Áreas grandes; destaques de seção |
| **Véu** | `--c-veu` | `rgba(5, 5, 5, 0.94)` | Overlays opacos | Header após scroll, menu de tela cheia, visualizador | Sobre imagens de conteúdo |
| **Osso** | `--c-osso` | `#d9d1c5` | Texto principal | Títulos, corpo, nav, ícones, contornos de botão (100%) | Áreas preenchidas grandes |
| **Cinza quente** | `--c-cinza` | `#8a8277` | Texto secundário | Legendas, rótulos secundários, itens inativos da Marginália, metadados | Texto corrido longo |
| **Sombra de texto** | `--c-sombra` | `#4a453f` | Decorativo | Numerais grandes de fundo, marcas decorativas | **Qualquer texto que precise ser lido** (contraste 2.1:1) |
| **Veio** | `--c-veio` | `#e2ad3a` | Acento único | Veios, anel de foco, marcador do item ativo, sublinhado da página atual | Texto, títulos, fundos, ícones, preenchimento de botões |
| **Luz** | `--c-luz` | `#ffffff` | Realce | **Apenas** dentro dos pulsos dos Veios | Texto, fundos, bordas, qualquer outro lugar |
| **Moldura** | `--c-moldura` | `#111111` | Moldura de objeto | Borda de 1px em capas, Documentos e células de grade | Divisórias de layout |
| **Hairline** | `--c-hairline` | `rgba(217, 209, 197, 0.14)` | Linha fina neutra | Linha de metadados, linhas da lista de faixas, sublinhado de links no corpo | Separar zonas (isso é o Veio) |
| **Contorno de botão** | `--c-colchete` | `rgba(217, 209, 197, 0.55)` | Colchetes em repouso | Botão colchete | Outros contornos |

### 3.2 Interação e estados por cor

| Estado | Regra |
|---|---|
| Hover | **Não muda cor.** Usa opacidade (texto/ícone), zoom (imagem) ou colchetes (botão) |
| Pressionado (`:active`) | Texto/ícone: opacidade 0.45, sem transição. Botão: fundo `--c-lamina-2` |
| Foco (`:focus-visible`) | Contorno de 1px sólido `--c-veio`, afastado 4px do elemento |
| Atual / ativo | Página atual na nav: sublinhado de 1px `--c-veio`, 6px abaixo do texto. Item ativo da Marginália: texto `--c-osso` + marcador de luz no Veio vertical |
| Inativo (Marginália) | Texto `--c-cinza`; miniatura com brilho 0.55 |

### 3.3 Overlays e transparências

| Nome | Valor | Uso |
|---|---|---|
| **Dissolução inferior** | degradê vertical: Abismo 0% de 0% a 55% da altura → Abismo 100% em 100% | Base de Placas, Atmosferas de álbum, abertura |
| **Dissolução superior** | degradê vertical: Abismo 100% em 0% → 0% em 10% da altura | Topo de Placas cinematográficas |
| **Vinheta** | elipse 75% × 70% centrada em 50% / 45%: transparente até 35% do raio → Abismo a 90% na borda | Sobre o Fundo fixo e as imagens de Janela |
| **Véu lateral de leitura** | degradê horizontal: Abismo a 70% na borda esquerda → 0% a 60% da largura | Sobre a abertura da Início, atrás do título |
| **Véu de texto do álbum** | degradê horizontal: 0% até 30% da largura → Abismo a 70% na borda direita | Placa de álbum principal (lado do texto) |
| **Lâmina** | Abismo/`#090807` a 88% | Ver 3.1 |
| **Véu** | Abismo a 94% | Ver 3.1. **Sem** `backdrop-filter` |

### 3.4 Pares de contraste verificados

| Texto | Sobre | Contraste | Mínimo de uso |
|---|---|---|---|
| Osso `#d9d1c5` | Abismo / Lâmina | ≈ 13.5:1 | qualquer tamanho |
| Cinza quente `#8a8277` | Abismo / Lâmina | ≈ 5.3:1 | 12px+ |
| Veio `#e2ad3a` (só para foco e marcadores) | Abismo | ≈ 10.3:1 | — |
| Sombra `#4a453f` | Abismo | ≈ 2.1:1 | **nunca para texto legível** |

---

## 4. Tipografia

### 4.1 Famílias

Todas disponíveis gratuitamente no Google Fonts.

| Papel | Família | Fallback | Pesos e estilos carregados | Onde aparece |
|---|---|---|---|---|
| **Display** | **Fraunces** (variável: `opsz`, `wght`, `SOFT`, `WONK`) | `"Iowan Old Style", Georgia, "Times New Roman", serif` | `wght` 300–400, normal e itálico; `SOFT` 0–100; `WONK` 0 | Títulos (Display XL, H1, H2, H3), citações de Janela, wordmark, itens do menu de tela cheia. **Em nenhum outro lugar** |
| **Leitura** | **Mulish** | `"Segoe UI", system-ui, -apple-system, Arial, sans-serif` | 300, 400 e itálico 400 | Corpo, lead, texto pequeno, títulos de faixa, títulos de item na Marginália |
| **Rótulo** | **IBM Plex Mono** | `ui-monospace, "Cascadia Mono", Consolas, "Courier New", monospace` | 300, 400, 500 | Nav, botões, kickers, legendas, metadados, datas, durações, numeração, nomes de álbum |

- **Alternativa se a Fraunces não puder ser usada:** Cormorant Garamond 300/400, com tamanhos display +8% e `SOFT` ignorado.
- **Configuração da Fraunces:** `opsz` automático pelo tamanho; `SOFT 100` em Display XL, H1, wordmark e citação; `SOFT 50` em H2 e H3; `WONK 0` sempre.
- **Algarismos:** em Plex Mono, sempre tabulares. Na Mulish, proporcionais.

### 4.2 Escala

| Token | Família | Peso | Tamanho | Line-height | Letter-spacing | Transformação | Uso |
|---|---|---|---|---|---|---|---|
| `t-display-xl` | Fraunces | 300 | `clamp(56px, 8.5vw, 160px)` | 0.92 | −0.02em | nenhuma (frase) | Título da abertura da Início. Máx. 6 palavras, 2 linhas |
| `t-h1` | Fraunces | 300 | `clamp(44px, 5.5vw, 88px)` | 0.98 | −0.015em | nenhuma | Título de página |
| `t-h2` | Fraunces | 400 | `clamp(30px, 3vw, 48px)` | 1.08 | −0.01em | nenhuma | Título de entrada principal (era, álbum, integrante) |
| `t-h3` | Fraunces | 400 | `clamp(22px, 1.8vw, 28px)` | 1.2 | 0 | nenhuma | Subtítulo dentro de entrada |
| `t-citacao` | Fraunces itálico | 300 | `clamp(28px, 3.6vw, 56px)` | 1.15 | −0.01em | nenhuma | Única linha de texto de uma Janela. Máx. 22 caracteres por linha (`22ch`) |
| `t-lead` | Mulish | 300 | `clamp(19px, 1.4vw, 22px)` | 1.55 | 0 | nenhuma | Parágrafo de abertura de página/entrada. Máx. 60ch |
| `t-corpo` | Mulish | 400 | 17px (16px no mobile) | 1.7 (1.65 no mobile) | 0.005em | nenhuma | Texto corrido. Largura máx. 66ch |
| `t-pequeno` | Mulish | 400 | 15px | 1.6 | 0 | nenhuma | Notas, ficha técnica descritiva, títulos de faixa |
| `t-item` | Mulish | 400 | 14px | 1.4 | 0 | nenhuma | Título de item da Marginália (1 linha, reticências) |
| `t-rotulo` | Plex Mono | 400 | 12px | 1.4 | 0.2em | MAIÚSCULAS | Kickers, rótulos de metadados, contadores |
| `t-nav` | Plex Mono | 400 | 12px | 1 | 0.22em | MAIÚSCULAS | Links do header e do rodapé |
| `t-botao` | Plex Mono | 500 | 12px | 1 | 0.2em | MAIÚSCULAS | Botão colchete |
| `t-album` | Plex Mono | 300 | `clamp(18px, 1.6vw, 28px)` (placa principal: `clamp(28px, 2.6vw, 44px)`) | 1.1 | 0.14em | MAIÚSCULAS | Nome de álbum em placas e células. Sempre centralizado nas células |
| `t-legenda` | Plex Mono | 400 | 12px | 1.5 | 0.04em | prefixo em MAIÚSCULAS ("FIG. 07"); resto em frase | Legendas de figura e de Documento |
| `t-numero` | Plex Mono | 400 | 13px | 1.4 | 0.04em | nenhuma | Números de faixa, durações, anos em listas |
| `t-wordmark` | Fraunces | 400 | 22px (18px no mobile) | 1 | 0.42em | MAIÚSCULAS | Wordmark "TOOL" no header e no rodapé |
| `t-menu` | Fraunces | 300 | `clamp(40px, 9vw, 64px)` | 1.1 | −0.01em | nenhuma | Itens do menu de tela cheia |

**Tamanho mínimo absoluto:** 12px. Nada menor que isso.

### 4.3 Regras de uso

- **Hierarquia por família e escala, não por peso:** nada acima de 400 em Display e Leitura; o 500 existe só no botão.
- Corpo e lead nunca em caixa alta.
- Títulos (Display) nunca em caixa alta, exceto o wordmark.
- **Itálico** só em:
  - citações de Janela (Fraunces itálico);
  - ênfase e nomes de álbum/faixa dentro do texto corrido (Mulish itálico 400).
- **Convenções de texto:**
  - Separador em rótulos: ` · ` (ponto médio com espaços).
  - Intervalo de anos em rótulos: `1990 — 2019`; no corpo: `1990–2019`.
  - Figuras: `FIG. 01` sequencial por página.
  - Peças do Arquivo: `AQ-001`.
- **Espaçamento tipográfico:**
  - Kicker → título: 12px.
  - H1 → lead: 24px (16px no mobile).
  - H2 → corpo: 24px.
  - Parágrafo → parágrafo: 1em.
  - Lead → corpo: 32px.
- Texto corrido alinhado **à esquerda**, nunca justificado e nunca centralizado no nível da página.

---

## 5. Grid e layout

### 5.1 Anatomia da viewport (desktop ≥ 1200px)

```
│← 15% →│←──────────────── BLOCO 70vw (máx. 1440px) ────────────────→│← 15% →│
│ fundo │░░ Lâmina (esfuma 48px para fora de cada lado do Bloco) ░░░░│ fundo │
│ fixo  │  COLUNA 10fr               ┊ veio 1px ┊   MARGINÁLIA 4fr   │ fixo  │
│       │  conteúdo principal  ←gut→ ┊          ┊ ←gut→  índice/ficha │       │
```

### 5.2 Larguras

| Elemento | ≥ 1200px | 960–1199px | 768–959px | < 768px |
|---|---|---|---|---|
| **Bloco** | 70vw (máx. 1440px) | 84vw | 90vw | 100vw − 40px (20px de cada lado) |
| **Bloco largo** | 84vw (máx. 1680px) | 92vw | 92vw | 100vw − 24px (12px de cada lado) |
| **Esfumado lateral da Lâmina** | 48px para fora do Bloco | 32px | 24px | 0: a Lâmina cobre a largura toda |
| **Colunas** | 10fr \| 4fr | 10fr \| 4fr | 10fr \| 4fr | empilhadas |
| **Gutter (cada lado do Veio vertical)** | `clamp(16px, 2.1vw, 40px)` | idem | idem | — (48px acima e abaixo do Veio horizontal) |
| **Largura do texto corrido** | máx. 66ch | máx. 66ch | máx. 66ch | 100% |

Valores de referência:

| Viewport | Bloco | Coluna (conteúdo) | Marginália (conteúdo) |
|---|---|---|---|
| 1920px | 1344px | ≈ 920px | ≈ 343px |
| 1440px | 1008px | ≈ 690px | ≈ 257px |
| 1024px | 860px | ≈ 593px | ≈ 223px |
| 800px | 720px | ≈ 497px | ≈ 188px |

### 5.3 Regiões e larguras permitidas

Uma página é uma **sequência vertical de regiões**. Cada região usa exatamente uma largura:

| Região | Largura | Lâmina | Uso |
|---|---|---|---|
| **Região de Bloco** | Bloco | sim | Coluna + Marginália (padrão) ou só Coluna |
| **Região de Bloco largo** | Bloco largo | sim | Placa de álbum principal + grade de álbuns; grade de retratos |
| **Placa de largura total** | 100vw | não | Abertura, Placa cinematográfica |
| **Janela** | 100vw | não (a Lâmina se abre) | Revelação do fundo |

- **Troca de largura entre regiões = Dissolução:** a Lâmina se desfaz em 96px (64px no mobile) antes do fim de uma região e se refaz na mesma distância no início da próxima. Nunca há degrau visível de largura.
- **Composição livre:**
  - uma região de Bloco pode usar só a Coluna (sem Marginália) quando não houver conteúdo de apoio;
  - a Coluna pode, dentro dela, alternar texto e figuras como quiser;
  - páginas diferentes **podem** ter sequências diferentes de regiões.
- O que **não** varia: as larguras, a proporção 10:4 e as regras de transição.

### 5.4 Espaçamento

**Escala** (únicos valores permitidos para margens, paddings e gaps): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` px.

| Relação vertical | Desktop | Mobile |
|---|---|---|
| Padding interno da Lâmina (topo/base de uma região de Bloco) | 96 | 64 |
| Entre entradas (artigos) na Coluna | 96 | 64 |
| Cabeçalho de capítulo → primeira entrada | 64 | 48 |
| Veio de capítulo: espaço acima e abaixo | 64 | 48 |
| Corpo → figura e figura (com legenda) → corpo | 32 | 24 |
| Figura → legenda | 12 | 12 |
| Metadados → título da entrada | 16 | 12 |
| Título da entrada → corpo | 24 | 16 |
| Marginália: rótulo de grupo → primeiro item | 16 | 16 |
| Marginália: entre itens | 24 | 16 |
| Marginália: miniatura → texto | 8 | 8 |
| Grade: gap horizontal e vertical | 12 | 6 |
| Placa de álbum principal → grade | 12 | 6 |

**Razões que devem ser preservadas** em qualquer escala:
- espaço entre entradas ≈ **4–6×** o espaço interno;
- espaço entre itens da Marginália = **3×** o espaço miniatura → texto.

### 5.5 Alinhamento

- Todo texto de nível de página alinha **à esquerda**, na borda esquerda do Bloco ou da Coluna. Títulos, abertura e citações de Janela também.
- **Centralização é permitida apenas** dentro de células de álbum, da Placa de álbum principal no mobile e de rótulos sobre células de retrato.
- Citações de Janela alinham na borda esquerda do Bloco **ou** no início da Marginália (65% da viewport no desktop), nunca no centro.
- O conteúdo do header alinha nas bordas do **Bloco** (não do Bloco largo), em todas as páginas.

### 5.6 Planos (ordem de empilhamento)

| Plano | Elemento |
|---|---|
| 0 | Fundo fixo + Vinheta |
| 1 | Imagens fixas de Janela |
| 2 | Lâmina |
| 3 | Conteúdo (texto, imagens, Placas) |
| 4 | Veios (e pulsos) |
| 5 | Grão global |
| 6 | Header |
| 7 | Overlays de tela cheia (menu, visualizador) |
| 8 | Link "pular para o conteúdo" |

---

## 6. Header e navegação

### 6.1 Estrutura (≥ 960px)

```
┌──────────────────────────── 100vw, altura 72px ─────────────────────────────┐
│ [borda do Bloco]                                                             │
│  HISTÓRIA    DISCOGRAFIA          ╎   T O O L   ╎          INTEGRANTES    ARQUIVO │
└─══════════════ Veio 2px (padrão A), extremidades esmaecidas ════════════════─┘
```

| Propriedade | Valor |
|---|---|
| Posição | fixo no topo, largura 100vw, plano 6 |
| Altura | 72px (≥ 960px) · 60px (< 960px) |
| Área interna | largura do **Bloco** da faixa de viewport atual, centralizada |
| Distribuição | 3 colunas (1fr · auto · 1fr): grupo esquerdo encostado na borda esquerda do Bloco; wordmark no centro exato; grupo direito encostado na borda direita |
| Links | História, Discografia (esquerda) · Integrantes, Arquivo (direita); a página Início é acessada pelo wordmark |
| Espaço entre links do mesmo grupo | 48px |
| Tipografia dos links | `t-nav`, cor Osso |
| Wordmark | texto "TOOL" em `t-wordmark`, cor Osso. **O logo oficial da banda não é usado na interface** |
| Filetes do wordmark | dois traços verticais de 1px × 14px em `--c-veio` a 70%, a 32px de cada lado do wordmark, centralizados na altura |
| Veio inferior | Veio horizontal de 2px, padrão A, largura 100vw, com 6% de esmaecimento em cada ponta |
| Altura total ocupada | 74px; âncoras rolam com deslocamento de 96px (header + 22px) |

### 6.2 Comportamento no scroll

| Situação | Fundo do header | Veio inferior |
|---|---|---|
| Página que começa com Placa de largura total (Início) e `scrollY ≤ 50px` | transparente | opacidade 0.5 |
| Qualquer outro caso | Véu `rgba(5,5,5,0.94)` | opacidade 1 |
| Transição | fundo e opacidade do Veio em 300ms `--ease-in-out` | |

- O header **não** encolhe, não se esconde ao rolar e não muda de altura.

### 6.3 Estados dos links

| Estado | Visual |
|---|---|
| Normal | Osso, opacidade 1 |
| Hover | opacidade 0.65, 300ms `--ease-standard` |
| Pressionado | opacidade 0.45, sem transição |
| Foco (`:focus-visible`) | contorno 1px `--c-veio`, afastado 4px |
| Página atual | Osso, opacidade 1, sublinhado de 1px `--c-veio` a 6px abaixo da linha de base, com a largura do texto (excluído o tracking final) |
| Wordmark | sem hover (só foco); leva à Início |

### 6.4 Mobile e tablet (< 960px)

- **Linha do header:** wordmark à esquerda (na borda do Bloco); à direita o botão de texto "MENU" (`t-nav`, área clicável mínima de 44 × 44px). Veio inferior igual ao desktop.
- **Menu de tela cheia:**

| Propriedade | Valor |
|---|---|
| Fundo | Véu (Abismo a 94%) sobre toda a viewport, plano 7 |
| Conteúdo | lista vertical alinhada à esquerda do Bloco, começando a 128px do topo: Início, História, Discografia, Integrantes, Arquivo |
| Item | número em `t-rotulo` Cinza ("01"…"05") + nome em `t-menu` Osso; 24px entre itens |
| Página atual | traço de 24px × 1px em `--c-veio` à esquerda do número |
| Fechar | o "MENU" vira "FECHAR" no mesmo lugar; Esc também fecha |
| Abrir | fundo em fade de 300ms; itens sobem 12px com fade, cascata de 60ms |
| Fechar (animação) | fade de 250ms do conjunto |
| Acessibilidade | foco preso dentro do menu; ao fechar, o foco volta para "MENU"; rolagem da página travada enquanto aberto |

### 6.5 Navegação secundária

- **Link "Pular para o conteúdo":** `t-rotulo`, invisível até receber foco; aparece no canto superior esquerdo, com fundo Abismo e contorno Veio.
- **Rodapé:** repete os links da nav em `t-nav` (ver 8.15).
- **Âncoras internas** (Marginália, placas de álbum): rolagem suave de 600ms `--ease-sine` com deslocamento de 96px; a URL recebe o hash.

---

## 7. Imagens e backgrounds

### 7.1 Papéis e tratamentos

Toda imagem do site tem **exatamente um papel**. O papel define o tratamento.

| Papel | Filtro | Escala | Bordas / integração | Proporção | Onde |
|---|---|---|---|---|---|
| **Fundo fixo** | brilho 0.28 · saturação 0.55 · contraste 1.05 · blur 2px | 1.06 (esconde bordas do blur) | Vinheta por cima; preso à viewport | cobre a viewport | Todas as páginas, plano 0 |
| **Janela** | brilho 0.38 · saturação 0.6 · contraste 1.05 · blur 1px | 1.04 | Vinheta; preso à viewport, visível só dentro da Janela | cobre a viewport | Janelas |
| **Abertura** | brilho 0.5 · saturação 0.7 · contraste 1.1 · blur 1px | 1.04 | Dissolução inferior (de 50% a 100%) + véu lateral de leitura | 100vw × 100svh | Início |
| **Placa cinematográfica** | brilho 0.6 · saturação 0.6 · contraste 1.05 | 1 | Dissolução superior (10%) e inferior (18%) | 2.39:1 (≥ 768px) · 4:5 (< 768px) | Cortes de ritmo nas páginas de leitura |
| **Atmosfera de álbum** | brilho 0.6 · saturação 0.9 · blur 2px | 1.4, centralizada | Dissolução inferior (de 55% a 100%) | a da placa ou célula | Placas e células de álbum |
| **Capa** | **nenhum** | 1 | Moldura 1px `#111111` + halo | 1:1 | Placas e células de álbum, entradas de álbum |
| **Retrato** | escala de cinza 1 · sépia 0.2 · brilho 0.78 · contraste 1.08 | 1 | Moldura 1px `#111111` (grade/carrossel) ou Membrana (figura) | 4:5 | Integrantes |
| **Cena** (foto de show) | saturação 0.5 · brilho 0.7 · contraste 1.05 | 1 | Membrana (na Coluna) ou retângulo com moldura (no carrossel) | 3:2 | Carrossel "Ao vivo", figuras |
| **Documento** (pôster, arte) | **nenhum** | 1 | Moldura 1px `#111111`; sempre com legenda | proporção nativa (na grade: 3:4 com corte) | História (figuras), Arquivo |
| **Miniatura de Marginália** | brilho 0.55 (inativa) · 0.75 (hover) · 0.85 (ativa); demais filtros do papel de origem | 1 | Moldura 1px `#111111` | 17:8 (2.125:1) | Marginália |

### 7.2 Máscaras e degradês

- **Membrana:**
  - máscara elíptica de 70% × 80% centrada em 47% / 45% (levemente fora do centro, de propósito);
  - imagem opaca até 58% do raio, transparente na borda;
  - uso: fotos de Cena e Retratos usados como figura na Coluna.
- **Dissoluções:** ver 3.3. Sempre para o Abismo, nunca para outra cor.
- **Halo das capas:**
  - sombra difusa de 24px na cor Abismo a 70%, sem deslocamento, atrás da capa;
  - é a **única** sombra permitida no site.

### 7.3 Grão global

- Ruído monocromático estático em tile de 128 × 128px, opacidade 4.5%, fixo na viewport, plano 5, sem interação com o mouse.
- **Nunca animado.**
- É a única textura do site.

### 7.4 Crop e ponto focal

- Retratos 4:5 com o rosto no terço superior; ponto focal definido por imagem (posição do objeto em %).
- Cenas 3:2 com o palco ou o músico centralizado.
- Placas cinematográficas 2.39:1 com o assunto na faixa central; no mobile (4:5), o ponto focal é reposicionado por imagem.
- Documentos na grade do Arquivo: 3:4 com corte ancorado no **topo**. A versão completa aparece no visualizador.

### 7.5 Resolução

- **Regra de 1.25×:** nenhuma imagem nítida (Capa, Retrato, Cena, Documento) é exibida acima de 1.25× sua largura nativa. Se o espaço exigir mais, reduza o espaço (largura máxima no componente) ou use a imagem como Atmosfera.
- Papéis com blur e escurecimento (Fundo fixo, Janela, Abertura, Atmosfera) podem ser ampliados livremente.
- Imagens abaixo de 300px de largura só podem ser miniaturas de Marginália.

### 7.6 Critérios de escolha

| Papel | Critério obrigatório |
|---|---|
| Fundo fixo e Janela | Sem texto nem logo impresso; assunto orgânico (corpo, mãos, matéria, palco); sem fundo branco; sem geometria sagrada; largura nativa ≥ 800px |
| Abertura e Placa cinematográfica | Paisagem; sem texto impresso; leitura forte mesmo escurecida; largura nativa ≥ 1000px |
| Atmosfera de álbum | A própria arte do álbum; **usar a versão sem texto** quando houver |
| Documento | Qualquer peça, desde que com legenda (título · ano · autor quando conhecido) |
| Proibido em qualquer papel | Imagens com fundo predominantemente branco fora do Arquivo; geometria sagrada fora da seção Arte do Arquivo |

O mapa inicial de quais arquivos cumprem cada papel está no **Apêndice A**.

---

## 8. Componentes

Cada componente lista: estrutura · proporções · espaçamento · tipografia · cores · bordas · comportamento · estados · relação com o fundo.

### 8.1 Lâmina e Bloco (contêiner)

- **Estrutura:** superfície Lâmina sob a região; dentro, o Bloco com Coluna + Veio vertical + Marginália (ou só Coluna).
- **Proporções:** larguras da seção 5.2; colunas 10fr | 4fr.
- **Espaçamento:** padding vertical interno de 96px (64px no mobile); gutter de `clamp(16px, 2.1vw, 40px)` de cada lado do Veio.
- **Cores:** Lâmina a 88%.
- **Bordas:**
  - laterais esfumadas 48px para fora do Bloco (sem aresta);
  - topo e base: aresta seca quando encostam no header ou no rodapé (marcada por Veio); Dissolução de 96px quando encostam numa Placa, Janela ou região de outra largura.
- **Comportamento:** rola com a página; o Fundo fixo transparece 12%.
- **Estados:** nenhum.
- **Relação com o fundo:** nas margens laterais (desktop) o Fundo fixo aparece inteiro; sob a Lâmina, quase oculto.

### 8.2 Entrada de arquivo (artigo)

- **Estrutura:**
  1. linha de metadados;
  2. título (`t-h2`);
  3. lead opcional (`t-lead`);
  4. corpo;
  5. figuras intercaladas;
  6. fim (sem rodapé de entrada).
- **Linha de metadados:**
  - rótulo à esquerda e valor à direita (ex.: `ERA · 03` ··· `1996 — 1998`), em `t-rotulo` Cinza;
  - hairline de 1px abaixo, 8px de distância.
- **Espaçamento:** seção 5.4. Entradas separadas apenas por espaço (96px); nunca por caixa ou fundo.
- **Bordas:** nenhuma além da hairline de metadados.
- **Relação com o fundo:** sobre a Lâmina.

### 8.3 Cabeçalho de capítulo

- **Estrutura:**
  - kicker (`t-rotulo`, Cinza);
  - H1 (`t-h1`, Osso);
  - lead (`t-lead`, máx. 60ch).

  Fica **dentro da Coluna**, no topo da primeira região de Bloco; a Marginália começa na mesma altura, ao lado.
- **Espaçamento:** kicker → H1 12px; H1 → lead 24px; lead → primeira entrada 64px.
- **Uso:** abertura de todas as páginas internas (História, Discografia, Integrantes, Arquivo). Não usar Placa de abertura nessas páginas.

### 8.4 Marginália

Três tipos de conteúdo:

1. **Índice:** lista de itens que levam a âncoras ou páginas.
   - **Item:** miniatura 17:8 com 100% da largura da Marginália → 8px → linha com ano/número (`t-rotulo`) e título (`t-item`, 1 linha, reticências).
   - Todos os itens com a mesma altura.
   - **Estados:**
     - inativo: texto Cinza, miniatura brilho 0.55;
     - hover: zoom 1.03 da miniatura + brilho 0.75, título com opacidade 0.65;
     - ativo: texto Osso, miniatura brilho 0.85 e **marcador de luz** no Veio vertical alinhado ao item (ver 8.12).
   - **Comportamento:** em História, Integrantes e Arquivo, a Marginália-índice é **fixa durante a rolagem** (topo a 74px + 32px; altura máxima = viewport − 138px; rolagem interna se necessário). O item ativo acompanha a entrada que ocupa o centro da viewport.
2. **Ficha:** pares rótulo/valor empilhados.
   - Rótulo em `t-rotulo` Cinza; valor em `t-pequeno` Osso; 16px entre pares; hairline entre grupos.
   - Não fica fixa.
3. **Lista simples:** linhas `t-numero` + `t-item` (ex.: `1993 · Undertow`), 12px entre linhas, sem miniaturas.

- **Rótulo de grupo:** `t-rotulo` Osso, 16px acima do primeiro item; grupos separados por 48px.
- **Relação com o fundo:** sobre a Lâmina, à direita do Veio vertical.

### 8.5 Placa (largura total)

- **Variantes:**
  - **Abertura** (100vw × 100svh; mín. 560px, máx. 1080px);
  - **Placa cinematográfica** (100vw, 2.39:1 no desktop, 4:5 no mobile).
- **Conteúdo sobreposto:**
  - Abertura: kicker + `t-display-xl` + até 20 palavras em `t-lead`, alinhados à borda esquerda do Bloco, com a base do bloco de texto a 18% da altura da placa (12% no mobile); largura máx. 60% do Bloco (100% no mobile).
  - Placa cinematográfica: só uma legenda `t-legenda`, a 24px da base, alinhada à borda esquerda do Bloco.
  - **Placas nunca têm botões.**
- **Tratamento:** seção 7.1.
- **Bordas:** nenhuma. As dissoluções fazem a transição para as regiões vizinhas (sem Veio).
- **Estados:** nenhum (não é clicável).

### 8.6 Janela

- **Estrutura:**
  - região de 100vw × 70vh (mín. 420px, máx. 760px; 60vh no mobile) sem Lâmina;
  - imagem fixa à viewport visível só dentro da região;
  - uma única citação (`t-citacao`, Osso, máx. 22ch) + atribuição opcional (`t-rotulo`, Cinza, 24px abaixo).
- **Posição do texto:** centralizado na vertical; alinhado à borda esquerda do Bloco ou ao início da Marginália.
- **Transição:** a Lâmina se desfaz em 96px antes e se refaz em 96px depois (sem Veio).
- **Imagem:** papel Janela (7.1). Sem imagem própria, a Janela revela o Fundo fixo da página.
- **Frequência:** 0–3 por página; nunca duas seguidas sem uma região de Bloco entre elas.

### 8.7 Figura (imagem + legenda)

- **Estrutura:** imagem com 100% da largura da Coluna → 12px → legenda `t-legenda` Cinza.
  - Formato da legenda: `FIG. 07 — Descrição curta · crédito`.
- **Integração por papel:**
  - Documento: retângulo + moldura de 1px, proporção nativa, altura máx. 80vh (centralizada se mais estreita);
  - Cena e Retrato: Membrana, proporção 3:2 ou 4:5.
- **Variante díptico:**
  - imagem (4/10 da Coluna) + texto (6/10), gap de 32px, topo alinhado;
  - no mobile empilha (imagem primeiro);
  - uso: abertura de entrada de integrante e de álbum.
- **Estados:** figuras não são clicáveis, exceto no Arquivo (abrem o visualizador; ver 8.14).

### 8.8 Grade com emendas (álbuns, retratos, arquivo)

- **Estrutura:** células de tamanho idêntico; fundo da grade em **Abismo opaco**, de modo que os gaps leiam como emendas escuras.
- **Gap:** 12px (6px no mobile), horizontal e vertical.
- **Célula:** moldura 1px `#111111`, overflow oculto, `border-radius` 0.
- **Colunas:**

| Grade | ≥ 960px | 768–959px | < 768px |
|---|---|---|---|
| Álbuns | 4 | 2 | 2 |
| Retratos | 4 | 2 | 2 |
| Arquivo | 3 (dentro da Coluna) | 3 | 2 |

- **Rótulos:**
  - grade do Arquivo: rótulo `t-legenda` abaixo de cada célula (`AQ-014 · PÔSTER · 2019`, 8px de distância), e o gap vertical sobe para 24px;
  - álbuns e retratos: rótulos dentro da célula.
- **Comportamento:** a célula inteira é o link; hover de imagem (zoom 1.03 das camadas de imagem, 500ms).

### 8.9 Placa de álbum (célula)

```
┌──────────────────┐  proporção 1 : 1.367 (768 × 1050)
│   ↑ 9.5%         │
│  ┌────────────┐  │  capa: 73% da largura, quadrada, centralizada, halo
│  │    CAPA    │  │
│  └────────────┘  │
│   ↕ 11%          │
│     NOME         │  t-album, Osso, centralizado
│     1996         │  t-rotulo, Cinza, 8px abaixo
└──────────────────┘
```

- **Camadas (de trás para frente):**
  1. Atmosfera do álbum;
  2. Dissolução inferior;
  3. Capa;
  4. nome + ano.
- **Bordas:** moldura de 1px `#111111` na célula.
- **Hover/foco (≥ 960px):** Atmosfera e Capa fazem zoom de 1.03 juntas, a partir do centro, 500ms `--ease-standard`; o texto não escala.
- **Foco:** contorno Veio a 4px, ao redor da célula.
- **Pressionado:** sem efeito adicional.
- **Ação:** rola até a entrada do álbum na mesma página.

### 8.10 Placa de álbum principal

- **Proporção:** 2.667:1 (≥ 768px) · 1:1 (< 768px). Ocupa a largura do Bloco largo.
- **Variante de Coluna** (usada na Início): ocupa a largura da Coluna, com as mesmas proporções internas; no mobile segue a versão 1:1.
- **Desktop:**
  - Capa quadrada com 80% da altura, centralizada na vertical, com seu centro a 30% da largura.
  - Bloco de texto começando a 56% da largura, com largura máx. de 36%, centralizado na vertical:
    - kicker `t-rotulo` Cinza ("ÁLBUM MAIS RECENTE · 2019");
    - nome em `t-album` (versão grande), **alinhado à esquerda**;
    - 1–2 linhas de `t-lead`;
    - botão colchete "VER ÁLBUM".
  - Espaços: kicker → nome 12px; nome → lead 16px; lead → botão 32px.
- **Mobile:** Capa com 58% da largura, centralizada, a 8% do topo; abaixo, os mesmos textos **centralizados**.
- **Camadas:** Atmosfera + Dissolução inferior + véu de texto do álbum (lado direito) + Capa (halo) + texto.
- **Hover:** zoom de 1.03 em Atmosfera e Capa, 500ms.
- **Seguida de:** emenda de 12px (Abismo) e a grade de álbuns.

### 8.11 Botão colchete

```
 ┌─            ─┐     repouso: laterais inteiras, topo e base com 12px só nos cantos
 │  VER ÁLBUM   │
 └─            ─┘
 ┌──────────────┐     hover/foco: os segmentos crescem até se encontrar no centro
 │  VER ÁLBUM   │
 └──────────────┘
```

- **Tipografia:** `t-botao`, Osso.
- **Medidas:** altura mínima de 44px; padding 0 × 28px; largura definida pelo texto.
- **Linhas:** 1px em `--c-colchete` (Osso a 55%).
- **Estados:**

| Estado | Visual |
|---|---|
| Repouso | colchetes; segmentos de topo/base de 12px em cada canto |
| Hover | segmentos crescem até se encontrar (fecham o retângulo) em 300ms `--ease-standard`; linhas passam para Osso 100% |
| Foco | igual ao hover + contorno Veio a 4px |
| Pressionado | fundo Lâmina 2, instantâneo |

- **Uso:** no máximo **um botão visível por viewport**. Apenas para ações de navegação ("Ver álbum", "Ver discografia"). Nunca em Placas de largura total.
- **Relação com o fundo:** sem preenchimento em repouso: o ambiente aparece através dele.

### 8.12 Separadores

| Separador | Espessura | Cor | Onde | Comprimento |
|---|---|---|---|---|
| **Veio horizontal** | 2px | Veio + pulsos de Luz | Base do header, topo do rodapé, entre capítulos dentro da Coluna (Cortes) | header/rodapé: 100vw; capítulo: largura da Coluna |
| **Veio vertical** | 1px | Veio a 55% + pulsos | Entre Coluna e Marginália | altura total da região de Bloco |
| **Hairline** | 1px | `--c-hairline` | Linha de metadados, linhas da lista de faixas, entre grupos de ficha | largura do conteúdo |
| **Emenda** | 12px (6px no mobile) | Abismo | Entre células de grade; entre a placa principal e a grade | — |

**Veio horizontal, especificação:**
- Base: dourado `#e2ad3a` sólido; 6% de esmaecimento para transparente em cada ponta.
- **Pulsos:** 3 pontos de luz por Veio. Cada pulso é uma rampa simétrica dourado → mistura com branco → dourado. A intensidade é a porcentagem de branco no pico.
- **Padrões fixos** (posição do centro · largura total · intensidade · período · atraso):

| Padrão | Pulso 1 | Pulso 2 | Pulso 3 |
|---|---|---|---|
| **A** | 14% · 10% · 1.0 · 9s · 0s | 52% · 6% · 0.7 · 13s · −4s | 81% · 16% · 0.85 · 11s · −8s |
| **B** | 27% · 14% · 0.9 · 11s · −2s | 63% · 8% · 1.0 · 9s · −6s | 92% · 6% · 0.6 · 13s · −1s |
| **C** | 8% · 6% · 0.75 · 13s · −5s | 39% · 18% · 1.0 · 11s · 0s | 71% · 10% · 0.65 · 9s · −3s |

- **Atribuição:** header = A; rodapé = C; Veios de capítulo alternam B → C → A → B…, sem dois Veios consecutivos com o mesmo padrão.
- **Animação do pulso:** a intensidade oscila entre 20% e 100% do valor do padrão, com o período e o atraso indicados, curva `--ease-sine`, vai-e-volta infinito. Como os períodos são diferentes, **o branco nunca acende em todos os pontos ao mesmo tempo**.

**Veio vertical, especificação:**
- Base: Veio a 55%; 96px de esmaecimento no topo e na base.
- Dois pulsos fixos de 160px de comprimento, a 25% e 70% da altura, intensidade 0.6, períodos de 15s e 17s.
- **Marcador ativo:** quando a Marginália é um índice, um pulso extra de 120px com intensidade 1.0 (sem oscilar) fica alinhado ao item ativo e desliza até o novo item em 700ms `--ease-sine`.

**Regras:**
- No máximo **um** Veio horizontal visível por viewport além do Veio do header.
- A última entrada antes do rodapé **não** termina com Veio de capítulo: o Veio do rodapé já marca esse Corte.
- Nunca Veio entre itens de uma mesma lista ou grade.
- Nunca Veio onde há Dissolução.

### 8.13 Carrossel com setas

- **Estrutura:**
  - janela de 1 item (corta o resto);
  - trilha horizontal com todos os itens, gap de 24px;
  - duas setas **fora** da janela, centralizadas na vertical em relação à imagem;
  - abaixo: legenda à esquerda (`t-legenda`) e contador à direita (`t-rotulo`, "02 / 03").
- **Proporções:**
  - Integrantes: janela 4:5, largura = mín(Coluna − 112px, 460px), centralizada na Coluna.
  - Ao vivo: janela 3:2, largura = mín(Coluna − 112px, 620px), centralizada na Coluna.
  - 56px de zona de seta de cada lado.
- **Seta:**
  - chevron de braços a 45°, pontas e vértice arredondados, traço de 2px, proporção 1:1.75;
  - ícone de `clamp(12px, 1vw, 18px)` de largura, Osso, sem fundo;
  - área clicável de 50 × 50px; rótulo acessível "Anterior" / "Próximo".
- **Estados da seta:** hover com opacidade 0.65 em 300ms; pressionado 0.45; foco com contorno Veio a 4px. As setas **nunca ficam desativadas** (navegação circular).
- **Transição:**
  - a trilha inteira desliza uma posição (largura do item + gap) em **450ms `--ease-sine`**;
  - sem fade, sem escala; o item que sai e o que entra se movem juntos.
  - Avançar: conteúdo vai da direita para a esquerda; voltar, o inverso.
  - Cliques durante a animação redirecionam o movimento a partir da posição atual (sem fila).
- **Entrada:** teclas ← → quando o carrossel tem foco; arraste/swipe com limiar de 40px.
- **Imagens:** moldura 1px `#111111`, tratamento do papel (Retrato ou Cena).
- **Mobile (< 768px):** janela com 100% da Coluna; setas descem para uma linha de controles abaixo da imagem: `[‹]  02 / 03  [›]`.
- **Movimento reduzido:** troca instantânea.

### 8.14 Visualizador (Arquivo)

- **Estrutura:** overlay de tela cheia em Véu (plano 7):
  - imagem inteira (`contain`), sem filtro, moldura de 1px, até 86vw × 78vh, centralizada;
  - legenda `t-legenda` 16px abaixo;
  - contador `t-rotulo` no canto superior esquerdo;
  - "FECHAR" (`t-nav`) no canto superior direito;
  - setas como no carrossel, a 24px das bordas da viewport.
- **Comportamento:**
  - abre com fade de 300ms; fecha com fade de 250ms;
  - navega com a mesma trilha rígida de 450ms;
  - Esc fecha; ← → navegam;
  - foco preso; ao fechar, o foco volta à célula de origem.

### 8.15 Rodapé

- **Estrutura:**
  - faixa de 100vw, fundo Abismo opaco;
  - Veio horizontal (padrão C) no topo;
  - área interna com a largura do Bloco;
  - padding de 64px no topo e 48px na base.
- **Linha 1:** à esquerda, wordmark (`t-wordmark` 16px); à direita, os links da nav (`t-nav`, 32px entre eles) + "TOPO ↑".
- **Linha 2** (24px abaixo): `t-legenda` Cinza: "Projeto acadêmico não oficial. Imagens pertencem a seus autores; créditos nas legendas."
- **Mobile:** tudo empilhado, alinhado à esquerda; links em coluna com 16px entre eles.

### 8.16 Lista de faixas

- **Linha:** número (`t-numero`, Cinza, coluna de 40px) · título (`t-pequeno`, Osso) · duração (`t-numero`, Cinza, alinhada à direita).
- **Medidas:** padding vertical de 12px por linha; hairline entre linhas; última linha sem hairline.
- **Total:** linha final em `t-rotulo` ("TOTAL · 79:00"), 16px acima.
- Não interativa.

### 8.17 Componentes que NÃO existem neste projeto

| Componente | Decisão | Motivo |
|---|---|---|
| Formulário / newsletter | não existe | Site informativo, sem backend; um formulário sem função é ornamento |
| Player de áudio/vídeo | não existe na v1 | Sem assets de mídia. Se for adicionado, deve ser uma Placa cinematográfica com clique-para-carregar e o tratamento de Cena |
| Cards com sombra, raio ou fundo próprio | proibido | Princípios 2 e 11 |
| Ícones sociais, contadores, badges, tooltips, toasts, modais de aviso | não existem | Sem função no projeto |
| Hero com botões, faixas de "features", depoimentos, FAQ | proibido | Padrões de landing page |

---

## 9. Interações e animações

### 9.1 Tokens

| Token | Valor |
|---|---|
| `--ease-standard` | `cubic-bezier(.25, .1, .25, 1)` |
| `--ease-out-slow` | `cubic-bezier(0, 0, .3, 1)` |
| `--ease-sine` | `cubic-bezier(.37, 0, .63, 1)` |
| `--ease-in-out` | `cubic-bezier(.42, 0, .58, 1)` |
| `--dur-hover` | 300ms |
| `--dur-fechar` | 250ms |
| `--dur-slide` | 450ms |
| `--dur-zoom` | 500ms |
| `--dur-scroll` | 600ms |
| `--dur-entrada` | 700ms |
| `--dur-fundo` | 800ms |

### 9.2 Comportamentos

| Comportamento | Propriedade | Valores | Duração · curva |
|---|---|---|---|
| Hover de texto/ícone | opacidade | 1 → 0.65 | 300ms · standard |
| Pressionado (texto/ícone) | opacidade | → 0.45 | instantâneo |
| Hover de imagem (só imagens clicáveis) | escala (camadas de imagem, dentro da moldura) | 1 → 1.03, origem central. Retratos e miniaturas de Marginália também sobem +0.2 de brilho (máx. 0.95); Atmosferas e Capas não mudam de brilho | 500ms · standard |
| Hover de botão | comprimento dos segmentos + cor da linha | 12px → 50% · Osso 55% → 100% | 300ms · standard |
| Foco | contorno | 1px Veio, afastado 4px | instantâneo |
| Header ao rolar | fundo e opacidade do Veio | transparente → Véu · 0.5 → 1 | 300ms · in-out |
| Entrada no scroll | opacidade + translação Y | 0 → 1 · 16px → 0 | 700ms · out-slow; cascata de 75ms entre irmãos (máx. 6; atraso total ≤ 450ms) |
| Disparo da entrada | — | quando 15% do elemento entra na viewport; **uma vez** | — |
| Abertura da Início | fundo da placa + textos | imagem 0 → 1 (800ms); depois kicker, título e lead sobem 16px com cascata de 150ms, começando em 300ms | 800ms · sine / 700ms · out-slow |
| Carga de página | Fundo fixo | Abismo → imagem (opacidade 0 → 1) | 800ms · sine |
| Troca do Fundo fixo (Discografia) | opacidade cruzada | imagem atual → próxima | 800ms · sine |
| Carrossel / visualizador | translação X da trilha | −(item + gap) por passo | 450ms · sine |
| Marcador ativo no Veio vertical | posição Y | até o item ativo | 700ms · sine |
| Pulsos dos Veios | intensidade do branco | 20% ↔ 100% do padrão | 9–17s · sine, infinito |
| Abrir menu/visualizador | opacidade (+ itens: Y 12px → 0) | 0 → 1 | 300ms · standard (itens: cascata de 60ms) |
| Fechar menu/visualizador | opacidade | 1 → 0 | 250ms · standard |
| Âncora | rolagem | até o alvo − 96px | 600ms · sine |

### 9.3 Regras de movimento

- **Nunca:** bounce, mola, rotação, escala acima de 1.03, parallax por JavaScript, cursor customizado, texto que digita, contadores animados, loaders decorativos.
- **Saídas:** nada sai da tela ao rolar (sem "desaparecer ao subir"). Só overlays têm animação de saída.
- **Rolagem:** o único efeito ligado ao scroll é o Fundo fixo parado (o conteúdo passa por cima) e as entradas de uma vez.
- **`prefers-reduced-motion: reduce`:**
  - sem translação, escala, slide ou pulsos;
  - os Veios ficam estáticos na intensidade do padrão;
  - trocas de carrossel e de fundo instantâneas;
  - entradas aparecem sem movimento;
  - hovers de opacidade mantidos em 150ms.

---

## 10. Responsividade

### 10.1 Breakpoints

| Nome | Faixa |
|---|---|
| Mobile | < 768px |
| Tablet | 768–959px |
| Desktop P | 960–1199px |
| Desktop | ≥ 1200px (a partir de 2058px o Bloco atinge 1440px e só as margens crescem) |

### 10.2 O que se preserva

1. A ordem **fundo → Lâmina → conteúdo** e a regra de Dissolução/Corte.
2. A proporção **10:4** e o Veio vertical sempre que as colunas estão lado a lado (≥ 768px).
3. A Marginália como apoio: no mobile ela vai **depois** da Coluna, nunca antes (exceto o índice de anos da História; ver 10.3).
4. As três famílias tipográficas e seus papéis; tamanho mínimo de 12px.
5. Os três tipos de hover e as durações.
6. Os papéis e tratamentos de imagem.

### 10.3 O que muda

| Elemento | Desktop | Tablet / Desktop P | Mobile |
|---|---|---|---|
| Bloco | 70vw, margens com o fundo visível | 84–90vw | 100vw − 40px; **a Lâmina cobre a largura toda**: o fundo só aparece nas Janelas |
| Colunas | 10:4 | 10:4 | empilhadas; Veio vertical vira **Veio horizontal** (2px, 48px acima e abaixo) |
| Marginália-índice (História, Integrantes) | fixa ao lado | fixa ao lado | vira **faixa de índice fixa** abaixo do header: 44px de altura, fundo Lâmina 2, rótulos `t-rotulo` em rolagem horizontal, sem miniaturas; item ativo com sublinhado Veio de 1px |
| Marginália-ficha | ao lado | ao lado | depois da Coluna |
| Header | links + wordmark | MENU (< 960px) | MENU |
| Tipografia display | máximo dos `clamp` | intermediário | mínimo dos `clamp`; corpo 16px / 1.65 |
| Espaçamentos | coluna "Desktop" da 5.4 | Desktop | coluna "Mobile" da 5.4 |
| Grades | 4 / 3 colunas, gap 12px | 2 / 3 colunas | 2 colunas, gap 6px |
| Placa de álbum principal | 2.667:1, texto à direita | 2.667:1 | 1:1, texto abaixo, centralizado |
| Placa cinematográfica | 2.39:1 | 2.39:1 | 4:5, ponto focal reposicionado |
| Janela | 70vh | 70vh | 60vh; citação alinhada à esquerda do Bloco |
| Carrossel | setas fora da imagem | setas fora da imagem | setas abaixo, na linha do contador |
| Hover de imagem | sim (≥ 960px) | sim (≥ 960px) | não (dispositivos de toque); o estado ativo do índice continua |
| Fundo fixo | camada fixa de viewport | idem | idem. Deve funcionar em iOS: camada de posição fixa, **não** fundo com anexação fixa |

---

## 11. Estrutura das páginas

Cinco páginas. Todas compartilham header, Fundo fixo, grão e rodapé.

### 11.1 Início

- **Objetivo:** apresentar o tom do site e distribuir o visitante para as quatro seções.
- **Fundo fixo:** padrão global.
- **Sequência:**
  1. **Abertura** (Placa de 100svh): foto de show tratada; kicker "ARQUIVO · 1990 — HOJE"; título `t-display-xl` (máx. 6 palavras); uma frase em `t-lead`. Header transparente por cima.
  2. **Região de Bloco** (entra por Dissolução):
     - **Coluna:** kicker "ENTRADA"; texto de apresentação (`t-lead` + até 120 palavras de corpo); figura de Cena com Membrana; Placa de álbum principal em versão de Coluna (2.667:1 na largura da Coluna), levando à Discografia.
     - **Marginália:** índice "Seções" com 4 itens (História, Discografia, Integrantes, Arquivo) e miniaturas.
  3. **Janela:** citação curta sobre a imagem de Janela da Início.
  4. **Região de Bloco:**
     - **Coluna:** kicker "AO VIVO" + H2; carrossel de Cenas (3:2).
     - **Marginália:** lista simples "Discografia" (`1993 · Undertow` … `2019 · Fear Inoculum`), cada linha levando à entrada do álbum.
  5. **Rodapé.**
- **Hierarquia:** título da abertura → placa do álbum → índice → carrossel.
- **Interações:** sequência de abertura; header escurecendo; entradas no scroll; hover nos itens do índice; carrossel.

### 11.2 História

- **Objetivo:** narrar a trajetória da banda como um arquivo cronológico.
- **Fundo fixo:** padrão global; as Janelas usam imagens de época (Apêndice A).
- **Sequência:**
  1. **Região de Bloco:**
     - cabeçalho de capítulo (kicker "CRONOLOGIA · 1990 — HOJE", H1 "História", lead);
     - **Marginália-índice fixa** com uma entrada por era (miniatura + anos + título).
  2. **Entradas por era**, na Coluna:
     1. 1990–1992 · Formação e *Opiate*
     2. 1993–1995 · *Undertow*
     3. 1996–1998 · *Ænima*
     4. 1999–2002 · *Lateralus*
     5. 2003–2007 · *10,000 Days*
     6. 2008–2019 · Hiato e *Fear Inoculum*
     7. 2020–hoje
  3. **Entre eras:** Veio de capítulo (Corte) por padrão. **Duas Janelas** substituem o Veio: depois de 3 (*Ænima*) e depois de 5 (*10,000 Days*). Ao final de cada Janela, uma nova região de Bloco retoma a Marginália-índice.
  4. **Figuras:** pôsteres e fotos de época como Documentos ou Cenas, com `FIG.` numerado.
  5. **Rodapé.**
- **Hierarquia:** H1 → H2 de cada era → figuras → Marginália.
- **Interações:**
  - item ativo do índice segue a era no centro da viewport, com o marcador de luz no Veio vertical;
  - clique no índice rola até a era;
  - entradas de figuras no scroll.
- **Ex-integrante:** Paul D'Amour (baixo, 1990–1995) aparece aqui, só em texto.

### 11.3 Discografia

- **Objetivo:** apresentar os cinco álbuns de estúdio como objetos centrais do site.
- **Fundo fixo:** começa com a Atmosfera de *Fear Inoculum*; troca para a Atmosfera do álbum cuja entrada ocupa o centro da viewport (fade cruzado de 800ms).
- **Sequência:**
  1. **Região de Bloco:** cabeçalho de capítulo (kicker "DISCOGRAFIA · 1992 — 2019", H1, lead); sem Marginália.
  2. **Região de Bloco largo** (entra por Dissolução):
     - Placa de álbum principal (*Fear Inoculum*, 2019);
     - emenda de 12px;
     - grade de 4 células em ordem cronológica: *Undertow* (1993), *Ænima* (1996), *Lateralus* (2001), *10,000 Days* (2006);
     - abaixo, linha `t-rotulo` Cinza: "TAMBÉM · OPIATE (EP, 1992)", sem placa (sem capa disponível).
  3. **Regiões de Bloco**, uma entrada por álbum em ordem cronológica (*Undertow* → *Fear Inoculum*):
     - **Coluna:** díptico (Capa 4/10 + título e lead 6/10), texto e lista de faixas.
     - **Marginália:** ficha (ano, duração, gravadora, produção) + lista simples "Anterior / Próximo".
     - Entradas separadas por Veios de capítulo.
  4. **Rodapé.**
- **Hierarquia:** placa principal → grade → entradas.
- **Interações:** zoom nas placas; clique leva à entrada; troca do Fundo fixo por álbum; botão colchete "VER ÁLBUM" na placa principal.

### 11.4 Integrantes

- **Objetivo:** apresentar os quatro integrantes atuais.
- **Fundo fixo:** padrão global.
- **Sequência:**
  1. **Região de Bloco:** cabeçalho de capítulo (kicker "INTEGRANTES · 4", H1, lead); sem Marginália.
  2. **Região de Bloco largo:** grade de 4 retratos (4:5, papel Retrato); sobre a base de cada célula, nome (`t-rotulo` Osso) e instrumento (`t-rotulo` Cinza), alinhados à esquerda a 16px da borda, sobre a Dissolução inferior. Cada célula leva à entrada.
  3. **Regiões de Bloco**, uma entrada por integrante: Maynard James Keenan, Adam Jones, Justin Chancellor, Danny Carey.
     - **Coluna:** metadados (`INSTRUMENTO` ··· `DESDE 1990`), H2 com o nome, carrossel de fotos (4:5), biografia.
     - **Marginália:**
       - ficha (instrumento, anos na banda, outros projetos);
       - índice "Integrantes", fixo, com o item ativo.
     - Uma **Janela** entre o 2º e o 3º integrante.
  4. **Rodapé.**
- **Interações:** hover nos retratos (zoom + brilho 0.78 → 0.95); carrossel; índice ativo.

### 11.5 Arquivo

- **Objetivo:** catalogar pôsteres, arte e fotos ao vivo como documentos; é o único lugar da arte visionária e da geometria sagrada.
- **Fundo fixo:** padrão global.
- **Sequência:**
  1. **Região de Bloco:**
     - cabeçalho de capítulo (kicker "ARQUIVO · NN PEÇAS", H1, lead);
     - **Marginália-índice** fixa: Pôsteres, Arte, Ao vivo, com a contagem de cada uma.
  2. **Coluna:** três seções (H2 + grade de 3 colunas, células 3:4, rótulo de catálogo abaixo de cada célula). Seções separadas por Veios de capítulo.
     - **Pôsteres:** todos os pôsteres de turnê.
     - **Arte:** arte visionária + no máximo 4 peças de geometria sagrada.
     - **Ao vivo:** fotos de show.
  3. **Rodapé.**
- **Interações:** hover de imagem; clique abre o visualizador; navegação por setas e teclado dentro de cada seção.

---

## 12. Regras de consistência

### 12.1 Fixas em todas as páginas

| Área | Regra |
|---|---|
| Espaçamento | Só os valores da escala da seção 5.4; ritmo vertical da tabela 5.4 |
| Tipografia | Três famílias; tokens da seção 4.2; nenhum tamanho, peso ou tracking fora da tabela |
| Cores | Só os tokens da seção 3.1; o dourado nunca vira texto ou fundo; branco puro só nos pulsos |
| Imagens | Cada imagem tem um papel da seção 7.1, com o tratamento dele; regra de 1.25× |
| Animações | Tokens da seção 9.1; três tipos de hover; entrada única |
| Botões | Só o botão colchete; máx. um por viewport |
| Separadores | Veio = Corte; Dissolução = sem Veio; Emenda entre itens de grade; hairline só para metadados |
| Alinhamento | Texto de página à esquerda; centralização só dentro de células de álbum |
| Densidade | Coluna/Marginália densas; Placas/Janelas com no máximo uma linha de texto (abertura: kicker + título + uma frase) |
| Backgrounds | Todo Fundo fixo segue o tratamento 7.1 (luminância média ≤ 10%) e os critérios 7.6 |
| Header e rodapé | Idênticos em todas as páginas (só muda o estado "página atual") |
| Bordas | Raio 0; moldura de 1px `#111111` só em capas, Documentos, células de grade e janela do carrossel |

### 12.2 O que pode variar entre páginas

- A imagem do Fundo fixo (respeitando os critérios).
- A sequência e a quantidade de regiões (Bloco, Bloco largo, Placa, Janela).
- A presença ou ausência de Marginália numa região.
- O tipo de Marginália (índice, ficha, lista).
- A quantidade de Janelas (0–3) e qual imagem cada uma usa.
- O número de colunas das grades, dentro da tabela 8.8.
- A abertura: Placa de 100svh só na Início; cabeçalho de capítulo nas demais.
- O padrão do Veio de capítulo, seguindo a ordem de alternância.

---

## 13. Anti-patterns

O que **não** deve aparecer no projeto:

1. **Cards:** caixas com fundo próprio, sombra ou raio para agrupar conteúdo. Agrupe com espaço, alinhamento e linhas.
2. **Sombras genéricas:** `box-shadow` em qualquer componente. A única sombra é o halo das capas.
3. **Bordas arredondadas:** em qualquer elemento, incluindo imagens, botões e campos.
4. **Gradientes decorativos:** degradês coloridos, "mesh", brilhos. Degradês só existem como Dissolução para o Abismo e dentro dos Veios.
5. **Glassmorphism:** `backdrop-filter` com blur em header, menu ou painéis.
6. **Hero de landing page:** título centralizado + subtítulo + dois botões; setas animadas de "role para baixo".
7. **Estética gótica genérica:** blackletter, caveiras, sangue, fumaça, chamas, molduras ornamentais, vermelho como cor de interface.
8. **Simbologia decorativa:** mandalas, olhos, heptagramas, Flor da Vida, Metatron, ouroboros como ícone, fundo, divisor ou marca d'água.
9. **Identidade oficial:** logo oficial na interface, dourado em títulos ou grandes áreas, composições de álbum com texto embutido.
10. **Imagens em caixa sem motivo:** fotos de cena e retratos em figura com retângulo seco e fundo cinza. Use Membrana ou Dissolução.
11. **Imagens esticadas:** fotos pequenas ampliadas nítidas (regra de 1.25×).
12. **Animações de template:** fade-in diferente por seção, slide lateral de blocos, zoom de entrada, bounce, parallax por JS, contadores, texto que digita.
13. **Excesso de dourado:** mais de um Veio horizontal por tela além do header; Veios entre itens de lista; ícones dourados.
14. **Branco:** fundos brancos, texto branco puro, imagens de fundo branco fora do Arquivo.
15. **Layout de SaaS:** seções de largura igual empilhadas com título centralizado, grids de "features" em três colunas, depoimentos, FAQ em acordeão.
16. **Componentes desconectados do fundo:** qualquer elemento com fundo opaco próprio que esconda o Fundo fixo fora da Lâmina, do header e do rodapé.
17. **Tipografia fora do sistema:** fontes extras, caixa alta em corpo ou títulos, negrito como hierarquia, texto abaixo de 12px.
18. **Ícones decorativos:** ícones ao lado de títulos, de links ou de itens de lista. Os únicos ícones do site são as setas (chevron) e "↑" no rodapé.
19. **Pastiche retrô:** fontes pixel, GIFs, contadores de visita, molduras biseladas, fundos com padrão repetido.

---

## 14. Prioridade das regras

Quando duas regras entram em conflito, vale a mais alta desta lista:

1. **Legibilidade e acessibilidade:** contraste, tamanho mínimo, foco visível, operação por teclado, movimento reduzido.
2. **Identidade visual:** princípios (seção 1) e direção artística (seção 2).
3. **Composição e layout:** registros, Bloco, proporção 10:4, Dissolução e Corte.
4. **Hierarquia de conteúdo:** o que é foco (capa, título, retrato) continua sendo foco.
5. **Consistência entre páginas** (seção 12).
6. **Desempenho:** peso de imagens, suavidade das animações.
7. **Detalhes decorativos:** pulsos dos Veios, grão, halo, filetes do wordmark.

Exemplos de aplicação:
- Uma citação de Janela ilegível sobre uma imagem clara → **escureça a imagem** (1 vence 7), nunca aumente a citação.
- Uma imagem pequena demais para a Placa → **mude o papel para Atmosfera** ou troque a imagem (2 vence 3).
- Um pulso de Veio distrai sobre um título → **troque o padrão do Veio** ou remova a animação daquele Veio (1 vence 7).
- Detalhes vindos das referências de pesquisa **nunca** justificam quebrar uma regra deste documento.

---

## Apêndice A: Mapa inicial de assets

Atribuição de partida. Pode ser trocada desde que o substituto cumpra os critérios da seção 7.6. Caminhos relativos a `insiracaoBases/`.

### A.1 Álbuns

| Álbum | Ano | Capa (papel Capa) | Atmosfera | Observação |
|---|---|---|---|---|
| Undertow | 1993 | `albuns/Undertow.jpg` (1200²) | a mesma | — |
| Ænima | 1996 | `albuns/Ænima.jpg` (512²) | a mesma | Capa nunca acima de 640px |
| Lateralus | 2001 | `albuns/Lateralus.jpg` (770²) | `imagens/4956b08c27e82846f8b574d02ed316d2.jpg` (arte sem logo) | — |
| 10,000 Days | 2006 | `albuns/10,000 Days.jpg` (1200 × 1216, corte quadrado central) | `albuns/10,000 Days1.jpg` (sem texto) | — |
| Fear Inoculum | 2019 | `albuns/Fear Inhumanity.jpeg` (640²); **renomear para Fear Inoculum** | a mesma | Capa nunca acima de 800px |
| Opiate (EP) | 1992 | — | — | Sem capa: só texto |

### A.2 Fundos, Janelas e Placas

| Uso | Arquivo |
|---|---|
| Fundo fixo padrão (todas as páginas, exceto Discografia) | `imagens/7721fac7992819d5571d78e0ac1fa66c.jpg` |
| Abertura da Início | `imagens/show4.jpg` |
| Janela da Início | `imagens/4956b08c27e82846f8b574d02ed316d2.jpg` |
| Janelas da História | após *Ænima*: revela o Fundo fixo padrão (sem imagem própria) · após *10,000 Days*: `imagens/5b277abdbb7c49eed65d56d998af0d01.jpg` |
| Janela de Integrantes | `integrantes/AdamJones2.jpg` |
| Miniaturas do índice da Início | História: `imagens/1e70b73fa0c9cf8d2375a94ed056b8a1.jpg` · Discografia: `albuns/Lateralus.jpg` · Integrantes: `integrantes/DannyCarey3.jpg` · Arquivo: `imagens/ced314abb6d534d0afc1575f47b1ccbe.jpg` (cortes 17:8 sem o logo impresso) |

### A.3 Integrantes (papel Retrato)

| Integrante | Grade de retratos | Carrossel | Excluir do carrossel |
|---|---|---|---|
| Maynard James Keenan | `Maynard1.jpg` | `Maynard1.jpg`, `Maynard2.jpg`, `Maynard3.jpg` | — |
| Adam Jones | `AdamJones1.jpg` | `AdamJones1.jpg`, `AdamJones3.jpg` | `AdamJones2.jpg` (é a Janela desta página) |
| Justin Chancellor | `Chancellor1.jpg` | `Chancellor1.jpg`, `Chancellor2.jpg` | `Chancellor3.jpeg` (252px: só como miniatura) |
| Danny Carey | `DannyCarey3.jpg` | `DannyCarey1.jpg`, `DannyCarey2.jpg`, `DannyCarey3.jpg` | — |

### A.4 Ao vivo (papel Cena)

- Carrossel da Início: `imagens/show1.jpg`, `imagens/show2.jpg`, `integrantes/AdamJones2.jpg`.
- **Repetição:**
  - uma mesma imagem pode aparecer em páginas diferentes;
  - na mesma página, só pode repetir como **miniatura de índice** (grade de retratos, Marginália) de algo que aparece grande;
  - nunca duas vezes em tamanho grande na mesma página.

### A.5 Arquivo (papel Documento)

- **Pôsteres:** `013f0207…`, `03391e7b…`, `1e70b73f…`, `293f274d…`, `2a83b312…`, `34b1a4e8…`, `94f0570d…`, `a7388f38…`, `be57900a…`, `c3692a26…`, `ced314ab…`, `de18d8ff…`, `ecd64b71…`.
- **Arte:** `netOfBeing.jpeg`, `Theologue.jpeg`, `5582d48a…`, `5b277abd…`, `9c74e0cc…` + até 4 de geometria: `073be17a…` (espiral áurea), `doubleMandala.png`, `Metatron2.jpg`, `treeOfLife1.jpg`.
- **Ao vivo:** `show1.jpg`, `show2.jpg`, `show3.jpeg`, `show4.jpg`.

### A.6 Não usar

| Arquivo | Motivo |
|---|---|
| `imagens/canvas.png` | Aparentemente vazio (300 × 150, 570 bytes) |
| `imagens/Tool_Logo_(2019).png` | Logo oficial: a interface usa wordmark próprio |
| `imagens/f18f005ef73c7968e54774ba083d9e6f.jpg` | Flor da Vida em arco-íris: decorativa e fora da paleta |
| `imagens/Metatron1.jpg` | Fundo branco |
| `imagens/ouroboros.jpg` | Heptagrama: simbologia sem função documental |
| `imagens/t64dt01kq0n21.png` | Geometria sagrada além do limite de 4 peças |

---

## Apêndice B: Restrições de implementação

- **Tecnologia:** HTML, CSS e JavaScript sem frameworks nem bibliotecas de carrossel. Um arquivo HTML por página.
- **Fontes:** Google Fonts (Fraunces com eixos `opsz`, `wght`, `SOFT`, `WONK`; Mulish; IBM Plex Mono), com troca de fonte sem bloquear a renderização e os fallbacks da seção 4.1.
- **Navegadores:** duas últimas versões de Chrome, Edge, Firefox e Safari (incluindo iOS).
- **Fundo fixo:** camada com posição fixa na viewport (compatível com iOS); nunca anexação de fundo fixa.
- **Imagens:** peso alvo ≤ 300KB por arquivo exibido; `loading` preguiçoso para tudo abaixo da primeira viewport; dimensões declaradas para não haver salto de layout.
- **Tokens:** todos os valores das seções 3, 4, 5 e 9 como variáveis nomeadas.
- **Acessibilidade:** marcação semântica (header, nav, main, article, aside, footer, figure/figcaption); textos alternativos descritivos em português; rótulos acessíveis em setas, menu e visualizador.

---

## Apêndice C: Checklist de revisão de uma página

- [ ] Há Fundo fixo tratado (luminância média ≤ 10%) e ele aparece nas margens do Bloco no desktop?
- [ ] A página alterna registros (sem mais de 200vh seguidos de Coluna nas páginas de leitura)?
- [ ] Todo Corte tem Veio e nenhuma Dissolução tem Veio?
- [ ] Há no máximo um Veio horizontal visível por tela além do header?
- [ ] Toda imagem tem papel definido, tratamento correto e respeita a regra de 1.25×?
- [ ] Só as capas estão em cor plena?
- [ ] Só existem os três hovers, com as durações dos tokens?
- [ ] Nenhum texto abaixo de 12px; nenhum texto em Sombra (`#4a453f`)?
- [ ] Texto de página alinhado à esquerda; centralização só em células de álbum?
- [ ] Foco visível em tudo; menu, carrosséis e visualizador operáveis por teclado?
- [ ] Com movimento reduzido, nada se move?
- [ ] Nenhum item da seção 13 aparece?
