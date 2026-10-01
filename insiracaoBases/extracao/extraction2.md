# Reference 02: Extração de estrutura

Fonte analisada: `insiracaoBases/sites/reference02/` (`STACK.md`, `design-system.html`, CSS de layout em `assets/css/`, cópia salva do site original).
Nenhum arquivo da referência foi alterado. Escopo: **somente estrutura espacial**. Não foram extraídas cores, fontes, background, identidade visual, conteúdo nem tecnologia.

---

## 0. Convenções

| Marca | Significado |
|---|---|
| **[REF]** | Proporção/medida **observada na referência** (lida no código de layout ou na marcação da página) |
| **[PEDIDO]** | Proporção **solicitada para o seu projeto** (tem prioridade sobre a referência) |
| **[RESP-REF]** | Comportamento responsivo **observado** na referência |
| **[ADAPTAR]** | Comportamento que **precisa ser criado ou adaptado** para atender à estrutura pedida (não vem da referência) |
| **[INF]** | Inferência a partir da implementação |

> A página não foi renderizada num navegador. As medidas da referência vêm das regras de layout e dos tamanhos declarados das imagens.

### Princípio a preservar

```
background visível → bloco central largo → [ área principal | divisória vertical | área secundária ] → background visível
```

---

## 1. Estrutura principal (bloco central)

### 1.1 Referência original [REF]

| Aspecto | Valor |
|---|---|
| Largura do bloco | **842px fixos** (não proporcional) |
| Posição horizontal | centralizado (margens laterais automáticas e iguais) |
| Distância do topo / da base da página | 25px |
| Fundo próprio do bloco | **nenhum**. O background da página é contínuo atrás e ao redor do conteúdo; o "bloco" é percebido apenas pelas bordas retas do conteúdo (imagens e colunas alinhadas) [INF] |
| Padding interno do bloco | nenhum: o conteúdo encosta nas bordas do bloco |
| Organização interna | 3 colunas: principal (450px) · secundária com divisórias (222px) · terceira coluna estreita (120px) |

Como a largura é fixa, a proporção bloco/viewport muda com a tela:

| Viewport | Bloco | Cada margem lateral | Na analogia de 20 cm |
|---|---|---|---|
| 1920px | 43.9% | 28.1% (539px) | bloco 8.8 cm · margens 5.6 cm |
| 1440px | 58.5% | 20.8% (299px) | bloco 11.7 cm · margens 4.2 cm |
| 1280px | 65.8% | 17.1% (219px) | bloco 13.2 cm · margens 3.4 cm |
| 1024px | 82.2% | 8.9% (91px) | bloco 16.4 cm · margens 1.8 cm |
| ≤ 842px | 100% | 0 | sem margens; rolagem horizontal abaixo disso |

### 1.2 Especificação pedida [PEDIDO]

Analogia: viewport = 20 cm → **3 cm | 14 cm | 3 cm**.

| Aspecto | Valor |
|---|---|
| Largura do bloco | **70% da viewport** (14/20) |
| Margem externa (cada lado) | **15% da viewport** (3/20) |
| Posição | centralizado horizontalmente |
| Relação com o background | o background fica visível nos 15% de cada lateral |
| Natureza da largura | **proporcional** à viewport, não fixa |

Valores resultantes:

| Viewport | Bloco | Margem de cada lado |
|---|---|---|
| 1920px | 1344px | 288px |
| 1440px | 1008px | 216px |
| 1280px | 896px | 192px |
| 1024px | 717px | 154px |

**Comparação com a referência:** o bloco pedido é proporcionalmente **mais largo que o original em qualquer tela a partir de ~1200px** (é onde 842px = 70%). Em 1440px, por exemplo, ocupa 70% contra 58.5%. Abaixo de ~1200px, o original fixo passaria a ocupar mais que 70%, por isso a seção 5 define como as margens encolhem [INF].

### 1.3 Decisões em aberto [ADAPTAR]

- **Fundo do bloco:** na referência, o bloco não tem superfície própria. Se a ideia é o background aparecer *só* nas laterais, o bloco precisa de um fundo próprio. Se o background deve continuar por trás do conteúdo, como no original, o bloco fica transparente. É uma escolha visual sua.
- **Largura máxima (opcional):** em telas muito largas (2560px → bloco de 1792px), a coluna principal fica muito larga para leitura. Um limite como `max-width` de ~1400–1600px preserva os 70% nas telas comuns e só deixa as margens crescerem acima disso. Isso **não** faz parte do pedido; é uma salvaguarda sugerida.
- **Espaço vertical do bloco:** a referência deixa 25px no topo e na base. Para manter a proporção, use algo da ordem de 2–3% da largura do bloco.

---

## 2. Divisão interna do bloco

### 2.1 Referência original [REF]

```
|←———————— 450 ————————→|←25→┊←25→|←—— 222 ——→|←25→┊←25→|← 120 →|
       PRINCIPAL           gap  linha  gap  SECUNDÁRIA  gap linha gap  TERCEIRA
```

| Aspecto | Valor |
|---|---|
| Principal × secundária (só larguras de conteúdo) | 450 : 222 ≈ **2.03 : 1** |
| Principal × secundária (incluindo espaços e linha) | 475 : 299 → **61% / 39%** da parte de duas colunas |
| Divisória | linha vertical de **1px tracejada**, pertencente à coluna secundária (lado esquerdo) |
| Espaço divisória → conteúdo | **25px de cada lado**, simétrico (≈ 3% da largura do bloco) |
| Segunda divisória | sim: entre a secundária e a terceira coluna (fora do escopo pedido) |
| Altura da divisória | **acompanha apenas a altura da coluna secundária**. Se a principal for mais longa, a linha termina antes [INF] |
| Alinhamento vertical | as colunas começam juntas no topo do bloco; cada uma tem altura independente |
| Terceira coluna | as larguras somadas (894px) excedem o bloco (842px), então a terceira coluna provavelmente cai abaixo da secundária na renderização [INF]. Ignorada nesta extração |

### 2.2 Especificação pedida [PEDIDO]

Analogia: bloco = 14 cm → **principal 10 cm | divisória | secundária 4 cm**.

| Aspecto | Valor |
|---|---|
| Área principal | **10/14 = 71.4% do bloco** (= 50% da viewport) |
| Área secundária | **4/14 = 28.6% do bloco** (= 20% da viewport) |
| Relação principal : secundária | **2.5 : 1** (a secundária é proporcionalmente *mais estreita* que no original, onde a relação era 2.03:1) |
| Posição da divisória | exatamente no limite entre as áreas: **71.4% da largura do bloco**, a partir da esquerda (= 65% da viewport) |
| Divisória | linha vertical contínua ou tracejada, 1px (estilo livre) |
| Espaço divisória → conteúdo | **simétrico**, mantendo a razão da referência: **≈ 3% da largura do bloco** de cada lado (≈ 2.1vw) |

Larguras resultantes (espaço de 3% do bloco de cada lado da linha):

| Viewport | Faixa principal | Conteúdo principal | Faixa secundária | Conteúdo secundário | Espaço da linha |
|---|---|---|---|---|---|
| 1920px | 960px | ~920px | 384px | ~343px | 40px |
| 1440px | 720px | ~690px | 288px | ~257px | 30px |
| 1280px | 640px | ~613px | 256px | ~228px | 27px |
| 1024px | 512px | ~490px | 205px | ~182px | 21px |

### 2.3 Adaptações [ADAPTAR]

- **Divisória em altura total:** para separar "claramente" as áreas, faça a linha ocupar toda a altura do bloco, independente de qual coluna é mais longa. Isso difere da referência, onde a linha acaba junto com a coluna secundária.
- **Uma divisória só:** a estrutura pedida tem duas colunas; a segunda divisória e a terceira coluna da referência não entram.
- **Proporção fixa:** a relação 10:4 deve ser mantida em todas as larguras em que as colunas ficam lado a lado (seção 5).

---

## 3. Área principal

### 3.1 Posição e largura

| | Referência [REF] | Pedido [PEDIDO] |
|---|---|---|
| Posição | esquerda do bloco, encostada na borda | esquerda do bloco, encostada na borda |
| Largura | 450px fixos (53% do bloco de 842) | 71.4% do bloco |
| Padding interno | nenhum: o conteúdo vai de borda a borda da coluna | nenhum; o espaço à direita vem do espaço da divisória |

### 3.2 Organização vertical observada [REF]

```
┌ ÁREA PRINCIPAL ─────────────────────────────┐
│ [logo ··························· link ]     │ ← linha com um item em cada extremidade
│ [ BANNER largura total, 2.65:1          ]   │
│ [item · item · item · item ······· item]    │ ← linha de navegação, último item à direita
│                       ↕ 40px                │
│ ┌ POST ────────────────────────────────┐    │
│ │ título                               │    │
│ │ [faixa meta: autor ·········· data ] │    │
│ │ ↕ 1em                                │    │
│ │ [ MÍDIA largura total ]              │    │
│ │ ↕ 8px                                │    │
│ │ texto / legenda                      │    │
│ │ [ MÍDIA largura total ]              │    │
│ │ ↕ 20px                               │    │
│ │ rodapé: meta · [comentários 75%|25%] │    │
│ │ [ação · ação · ação]                 │    │
│ └──────────────────────────────────────┘    │
│                       ↕ 60px                │
│ ┌ POST ┐ …                                  │
│                       ↕ 60px                │
│ [ banner intercalado, largura total ]       │
│ …                                           │
│ [paginação ─────────────────── linha]       │
│ [rodapé: texto ················· texto]     │
└─────────────────────────────────────────────┘
```

| Relação | Valor na referência | Observação |
|---|---|---|
| Cabeçalho do site | **fica dentro da área principal**, não ocupa a largura toda. A secundária começa no topo, ao lado dele | padrão estrutural relevante [REF] |
| Cabeçalho → primeiro post | 40px | |
| Entre posts | **60px** (o último tem 30px) | |
| Entre blocos dentro de um post | **1em ≈ 11px** | |
| Abaixo de cada imagem | 8px | |
| Corpo → rodapé do post | 20px | |
| Abaixo da linha de ações | 25px | |
| Banners intercalados entre posts | 60px acima e abaixo | |
| Razão espaço entre posts : espaço interno | **≈ 5.5 : 1** | é o que separa visualmente um post do outro |
| Mídia (imagens, vídeos) | **100% da largura da coluna**, altura pela proporção nativa (1:1, 4:5, 2:3, 3:4, 4:3; banner 2.65:1) | sem mídia mais estreita que a coluna |
| Linhas internas | padrão recorrente "item à esquerda + item à direita" (logo/link, autor/data, rodapé) | |
| Faixa de comentários | bloco principal ~75% da largura + bloco menor ~25% à direita | |
| Rodapé da página | largura da coluna principal, abaixo do conteúdo, alinhado à esquerda | |

### 3.3 Modelo para o seu projeto [ADAPTAR]

- Pilha vertical única, com itens de conteúdo ocupando **100% da largura da área principal**.
- Mantenha a **hierarquia de espaços**, não os pixels: espaço entre itens ≈ 5–6× o espaço interno de um item.
  - Escalado para a coluna pedida (~690px a 1440px, ~1.5× a original): ≈ **90px entre itens**, ≈ **16–17px entre blocos internos**, ≈ **60px** do topo ao primeiro item. São valores derivados, não exatos.
- O cabeçalho do site pode, como na referência, viver dentro da área principal, deixando a secundária começar no topo do bloco. Ou pode ser uma faixa acima das duas colunas, mas isso se afasta da referência.

---

## 4. Área secundária

### 4.1 Referência original [REF]

| Aspecto | Valor |
|---|---|
| Largura do conteúdo | 222px |
| Divisória | 1px à esquerda, 25px de espaço até o conteúdo |
| Organização | pilha vertical: título de seção → bloco → título de seção → lista de destaques (50 itens) |
| Espaço acima dos títulos de seção | ~17–30px; abaixo ~25–31px |
| **Item de destaque** | imagem em cima, linha de texto embaixo; o item inteiro é uma única área clicável |
| Imagem do item | **170 × 80px** (proporção **2.125 : 1**, paisagem bem horizontal) |
| Imagem × largura da coluna | 170/222 = **76.6%**, alinhada à **esquerda** (sobra ~52px à direita) [INF] |
| Imagem × mídia da área principal | 170/450 = **37.8%** (a "escala menor") |
| Imagem → texto | **5px** |
| Texto | **uma única linha**, cortada com reticências se não couber; largura = largura da imagem; precedida por um pequeno marcador quadrado (7px + 5px de espaço) |
| Abaixo do texto | 7px |
| Altura do item | fixa: 107px (80 de imagem + ~27 de texto) |
| Entre itens | **15px** |
| Razão espaço entre itens : imagem→texto | **3 : 1** |
| Alinhamento | tudo à esquerda |

```
┊   [ imagem 2.125:1 ]
┊   ▪ texto curto numa linha…
┊          ↕ 15px
┊   [ imagem 2.125:1 ]
┊   ▪ texto curto numa linha…
┊          ↕ 15px
┊   [ imagem 2.125:1 ]
┊   ▪ texto curto numa linha…
```

### 4.2 Especificação pedida [PEDIDO] + derivações [ADAPTAR]

| Aspecto | Valor |
|---|---|
| Largura | **28.6% do bloco** (4/14), à direita |
| Divisória | à esquerda da coluna, no limite de 71.4% do bloco |
| Espaço divisória → conteúdo | ≈ 3% do bloco (mesmo valor do lado da área principal) |
| Estrutura do item | `[ imagem ]` + `[ texto curto ]` abaixo, repetido em pilha vertical |
| **Largura da imagem** | **100% da coluna**. Com as proporções pedidas, isso resulta em ~37% da largura da área principal, **reproduzindo a mesma relação de escala da referência (37.8%)** [INF] |
| Proporção da imagem | manter ~2.125:1 (horizontal). A 1440px: ~257 × 121px |
| Texto | 1 linha (ou no máximo 2), largura igual à da imagem, alinhado à esquerda |
| Espaços escalados (×1.5 a 1440px) | imagem→texto ≈ **8px** · entre itens ≈ **23px** (mantendo a razão 3:1) |
| Altura dos itens | uniforme (todos iguais), como na referência |
| Topo da coluna | alinhado ao topo do bloco / da área principal |

Se preferir manter a imagem a ~77% da coluna, como no original, ela fica menor (~29% da área principal) e com sobra à direita. Recomendo 100%, por preservar a relação de escala com a área principal.

---

## 5. Comportamento responsivo

### 5.1 Observado na referência [RESP-REF]

- **Não existe comportamento responsivo.** Não há regras por largura de tela nem configuração para telas móveis [REF].
- Largura fixa de 842px: em telas maiores, só as margens crescem; em telas menores que 842px, aparece **rolagem horizontal** [REF].
- Em celulares, o navegador renderiza a página numa largura virtual (~980px) e reduz tudo em escala; as colunas nunca se reorganizam [INF].
- A proporção entre as colunas nunca muda, e a coluna secundária nunca vai para baixo.

### 5.2 Comportamento a criar [ADAPTAR]

Prioridade: manter **bloco largo → principal maior → divisória → secundária menor** pelo maior intervalo de telas possível.

| Faixa de viewport | Bloco | Margens | Colunas | Divisória |
|---|---|---|---|---|
| **≥ 1200px** (desktop) | **70%** (pedido) | **15%** cada | lado a lado, **10 : 4** | vertical, altura total |
| *(opcional)* telas muito largas | trava num `max-width` (~1400–1600px) | crescem | 10 : 4 | vertical |
| **~960–1199px** (desktop pequeno / tablet horizontal) | sobe para ~80–85% | encolhem para ~7–10% | lado a lado, **10 : 4** | vertical |
| **~768–959px** (tablet) | ~90% | ~5% (mín. ~24px) | lado a lado, 10:4, *ou* empilhado (ver abaixo) | vertical ou horizontal |
| **< 768px** (celular) | 100% menos margem fixa de ~16–24px | fixas, pequenas | **empilhadas**: principal em cima, secundária embaixo | vira **linha horizontal** entre as duas áreas |

Pontos de mudança:

- **Quando a secundária deve mudar:** o conteúdo da secundária fica abaixo de ~170px (a largura da imagem de destaque da referência) a partir de ~950px de viewport, mantidos os 70%. Por isso as margens encolhem primeiro, para manter as duas colunas lado a lado por mais tempo. Abaixo de ~768px elas empilham.
- **Secundária empilhada:** os itens de destaque podem continuar em pilha vertical ou virar uma grade de 2 colunas (ou faixa horizontal com rolagem). A estrutura imagem + texto de cada item se mantém.
- **Divisória empilhada:** passa de vertical para horizontal, com o mesmo espaço simétrico acima e abaixo.
- **Escala dos espaços:** os espaços (divisória, entre itens, entre posts) podem acompanhar a largura do bloco, como na tabela da seção 2.2, com mínimos para não colapsar em telas pequenas.

---

## 6. Resumo da especificação para o seu projeto

```
VIEWPORT 100%
├─ margem 15%  (background visível)
├─ BLOCO 70%   centralizado
│   ├─ ÁREA PRINCIPAL      71.4% do bloco  (50% da viewport)
│   │    pilha vertical; mídia 100% da largura; espaço entre itens ≈ 5–6× espaço interno
│   ├─ espaço ≈ 3% do bloco
│   ├─ DIVISÓRIA vertical 1px, altura total, em 71.4% do bloco
│   ├─ espaço ≈ 3% do bloco
│   └─ ÁREA SECUNDÁRIA     28.6% do bloco  (20% da viewport)
│        pilha de [imagem 2.125:1 a 100%] + [texto curto]; espaço entre itens ≈ 3× imagem→texto
└─ margem 15%  (background visível)

< ~1200px: margens encolhem, proporção 10:4 mantida
< ~768px:  colunas empilham, divisória vira horizontal
```

Esqueleto estrutural sugerido (independente da referência):

```css
.layout {                       /* bloco central */
  width: 70vw;                  /* 14/20 */
  margin-inline: auto;          /* 15% de cada lado */
  display: grid;
  grid-template-columns: 10fr 4fr;
}
.layout__main      { padding-right: 2.1vw; }                 /* ≈ 3% do bloco */
.layout__secondary { padding-left: 2.1vw; border-left: 1px solid; }  /* divisória em altura total */
```

---

## 7. Fora do escopo

Não foram extraídos: CMS, tema, plugins, bibliotecas de script, renderização de títulos, fontes, cores, textura do background, slideshow (só o espaço do banner foi considerado), players de áudio e vídeo, widgets, botões e contadores sociais, busca, SEO, analytics, APIs, conteúdo dos posts e identidade visual.
