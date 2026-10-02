# Reference 04: Background, álbuns e divisórias

Fonte analisada: `insiracaoBases/sites/reference04/` (`STACK.md`, `design-system.html`, CSS em `assets/css/` e na cópia salva, imagens dos álbuns). Para observar o background principal, as **texturas de fundo das seções** (referenciadas no CSS, mas ausentes na cópia salva) foram baixadas do CDN público para uma pasta temporária, fora do projeto, e analisadas por pixel.
Nenhum arquivo da referência foi alterado.

---

## 0. Convenções

| Marca | Significado |
|---|---|
| **[OBS]** | Observado diretamente nas imagens da referência (inspeção visual e medição de pixels) |
| **[CÓD]** | Valor exato identificado no código/arquivos |
| **[INF]** | Inferido a partir da implementação |
| **[EST]** | Estimativa (medição aproximada ou cálculo dependente de viewport) |
| **[PEDIDO]** | Característica solicitada por você que **difere ou não existe** na referência |

> **Unidade:** o site usa `1rem = 10px`, porque a raiz está em 62.5%. Todo valor em rem abaixo já vem convertido.
>
> **Descoberta central:** os cards de álbum **não são montados em HTML**. Cada álbum é **uma única imagem pré-composta** que já contém o fundo desfocado e escurecido, a capa, o nome e o "botão". O desfoque, o brilho, a tipografia e o botão vieram, portanto, de **medição das imagens**, não do código. O mesmo vale para o background principal: o escurecimento está **gravado nos arquivos de imagem**, sem filtro aplicado via código.

---

## 1. Background principal

### 1.1 Não existe um fundo único: são texturas por seção sobre preto

| Camada | Valor | Origem |
|---|---|---|
| Fundo base da página | **preto `#000`** sólido, fixo na viewport | [CÓD] |
| Textura A ("New arrivals") | imagem 1920×900 (mobile: 768×1135), **largura 100%, altura proporcional**, ancorada **embaixo e ao centro**, **rola com a página** | [CÓD] |
| Textura B ("Destaques"): o "background principal" | imagem 1920×1230 (mobile: 768×1230), **largura 100% da viewport, altura proporcional**, ancorada **no topo e ao centro**, **fixa na viewport** (não rola) | [CÓD] |
| Textura do rodapé | imagem 1920×715 (mobile: versão própria), largura 100%, ancorada no topo, rola | [CÓD] |
| Filtros, overlays, opacidade via código | **nenhum**. Todo escurecimento está gravado nas imagens | [CÓD] |

### 1.2 Tratamento visual gravado nas imagens [OBS] (medição de pixels)

| Imagem | Luminância média | Luminância máxima | Descrição |
|---|---|---|---|
| Textura B (fundo principal) | **≈ 3% (7.4/255)** | ≈ 29% (75/255) | Ilustração anatômica de figura com vários braços, em tons de bronze e marrom, **quase preta**. Borda superior, bordas laterais e base **chegam a preto puro (0)** |
| Textura A | ≈ 1% (3.1/255) | ≈ 22% (56/255) | Textura de padrão metálico apenas nas **laterais** (~0–20% e ~80–100% da largura); **centro de ~22% a 78% preto puro**; base desaparece em preto |
| Rodapé | ≈ 3% (7.7/255) | ≈ 29% | Textura escura no mesmo estilo |

- **Escurecimento:** as imagens funcionam como se tivessem **~70–75% de redução de brilho**. Nenhum pixel passa de ~29% de luminância [EST].
- **Contraste:** baixo dentro da imagem (altas luzes ≤ 29%), mas suficiente para o desenho ser lido sobre o preto.
- **Vinheta:** todas terminam em **preto absoluto nas bordas** (topo, base e laterais na Textura B), o que permite emendar com qualquer área preta sem costura visível [OBS].

### 1.3 Comportamento no scroll [CÓD] + [INF]

- **Textura B (fixa):** a imagem fica **parada em relação à tela** enquanto a seção rola por cima. A seção funciona como uma **janela** que revela a imagem imóvel: ao entrar na tela, a borda da seção "descobre" a figura; ao sair, a borda a "cobre" de novo.
  - Escala: largura = largura da viewport; altura = 64% da largura (1440px → 922px de altura).
  - Em janelas mais altas que isso, a área abaixo da imagem aparece preta (sem costura, porque a base da imagem já é preta).
- **Textura A (rolando):** acompanha a seção, presa à base dela. Se a seção for mais alta que a imagem (47% da largura), o topo fica preto.
- Em iPhone/iPad, o navegador costuma ignorar o fundo fixo, que passa a rolar normalmente [INF].

### 1.4 Onde o fundo fica oculto ou visível, e como é a transição

| Trecho (desktop, de cima para baixo) | Fundo |
|---|---|
| Barra de anúncio + header | **oculto**: preto opaco |
| Hero (banners) | **oculto**: imagem de largura total |
| "New arrivals" | **parcialmente visível**: o centro (~56% da largura) é preto e as laterais mostram textura. É isso que dá a impressão de um **"bloco central escuro" com fundo nas laterais** |
| Grade de categorias | **oculto**: preto liso |
| **"Destaques"** | **totalmente visível**: Textura B fixa em toda a largura, com o conteúdo transparente por cima |
| Banner do álbum principal + grade de álbuns | **oculto**: imagens e preto |
| Rodapé | textura própria |

**Não existe** bloco central opaco que "abre": as seções têm **largura total**. O "bloco central" é **pintado na própria imagem** (centro preto da Textura A) [OBS]/[CÓD].

**Transição entre estados** [CÓD]/[OBS]:
- **Sem fade e sem transparência gradual** no código: as bordas das seções são cortes secos.
- A continuidade vem de três fatores:
  1. Todas as texturas chegam a **preto puro nas bordas**.
  2. As seções vizinhas são **pretas**, então a emenda é preto com preto.
  3. Na Textura B, o fundo fixo cria uma **revelação pelo scroll**: a imagem não se move, só a janela.
- A saída da seção "Destaques" é marcada por uma **linha dourada** (seção 8).
- O **conteúdo** de cada seção entra com animação ao aparecer na tela (subida de 20px + fade, 0.6s); ver 6.3.

---

## 2. Estrutura das seções sobre o background

### 2.1 Relação fundo → seção → conteúdo [CÓD]

```
FUNDO DA PÁGINA  #000 (fixo)
└─ SEÇÃO (largura total, sem espaço entre seções)
   ├─ textura própria da seção (opcional), largura 100%
   └─ CONTEÚDO
       ├─ título: coluna centralizada, máx. 1200px, laterais 50px (15px no mobile)
       └─ grade/linha de itens: largura quase total, itens transparentes sobre a textura
```

| Propriedade | Valor | Origem |
|---|---|---|
| Espaço entre seções | **0** (seções encostadas) | [CÓD] |
| Coluna de conteúdo | máx. **1200px**, centralizada; laterais **50px** (≥750px) / **15px** (<750px) | [CÓD] |
| Padding vertical das seções com textura | **60px** (≥750px) / **45px** (<750px), em cima e embaixo | [CÓD] |
| Grade de categorias | **80% da largura**, centralizada, 2 colunas, espaço 12px, padding vertical 60px | [CÓD] |
| Seção da grade de álbuns | largura **total**, sem laterais; padding vertical **12px** (9px no mobile) | [CÓD] |
| Cards de produto sobre a textura | **fundo transparente**: as imagens recortadas flutuam direto sobre o background | [CÓD] |
| Altura das seções | definida pelo conteúdo + padding (não usa altura de tela) | [CÓD] |

### 2.2 Para o seu projeto [PEDIDO] + [INF]

Para obter um **bloco central próprio** que, em certos momentos, deixa o fundo aparecer por completo, há duas formas de recriar o efeito:

1. **Como na referência:** imagens de fundo por seção já compostas com **centro preto (~55% da largura)** e textura nas laterais.
2. **Com um bloco real:** fundo preto opaco de ~55–60% da largura, com bordas laterais em degradê para transparente (equivalente ao *falloff* de ~15–25% observado), e seções sem esse bloco onde o fundo deve aparecer inteiro.

Nos dois casos, mantenha as bordas de topo e base das texturas **terminando em preto** para emendas invisíveis.

---

## 3. Estrutura de apresentação dos álbuns

### 3.1 Composição [CÓD]

```
┌──────────────────────── ÁLBUM PRINCIPAL (largura total, 2.667:1) ────────────────────────┐
│   [ capa ]                              NOME                                              │
│                                         subtítulo                                         │
│                                         [ botão ]                                         │
└───────────────────────────────────────────────────────────────────────────────────────────┘
                              ↕ 12px (preto)
┌────────────┐ 12px ┌────────────┐ 12px ┌────────────┐ 12px ┌────────────┐
│ álbum 1    │ preto│ álbum 2    │ preto│ álbum 3    │ preto│ álbum 4    │   ← 4 células iguais
│ 1 : 1.367  │      │            │      │            │      │            │
└────────────┘      └────────────┘      └────────────┘      └────────────┘
                              ↕ 12px (preto)
══════════════════════════════ linha dourada 2px ══════════════════════════════
```

### 3.2 Álbum principal

| Propriedade | Valor | Origem |
|---|---|---|
| Largura | **100% da viewport** (sem margens) | [CÓD] |
| Proporção | **2.667 : 1** (altura = **37.5%** da largura). A 1440px: 1440 × 540 | [CÓD] |
| Composição interna | capa à **esquerda** (centro em ~33% da largura, ~32% da largura do banner, ~86% da altura) e bloco de texto à **direita** (centro em ~74%): nome, subtítulo e botão empilhados e centralizados | [OBS] |
| Mobile (< 750px) | troca para versão **quadrada (1:1)**: capa centralizada em cima (~58% da largura), nome, subtítulo e botão abaixo | [CÓD]/[OBS] |

### 3.3 Grade de álbuns secundários

| Propriedade | Valor | Origem |
|---|---|---|
| Colunas | **4** (≥ 990px) · **2** (< 990px, formando 2×2) | [CÓD] |
| Largura de cada célula | `(100% − 3 × 12px) / 4`: a 1440px = **351px** | [CÓD]/[EST] |
| Proporção da célula | **1 : 1.367** (retrato; 3200×4375) | [CÓD] |
| Altura da célula | a 1440px ≈ **480px** | [EST] |
| Espaço horizontal | **12px** (≥ 750px) · **6px** (< 750px) | [CÓD] |
| Espaço vertical | **12px** (≥ 750px) · **6px** (< 750px) | [CÓD] |
| Margens externas | **0** em ≥ 990px (encosta nas bordas da tela) · **50px** em 750–989px · **15px** em < 750px | [CÓD] |
| Uniformidade | todas as células com tamanho idêntico | [CÓD] |
| Alinhamento | conteúdo centralizado em cada célula | [CÓD] |

### 3.4 Relação entre o principal e a grade [EST]

- O principal tem **4× a largura** de uma célula e **altura ≈ 1.1×** a de uma célula (540 × 480px a 1440px). Visualmente, ele é uma "faixa" com a mesma altura da grade.
- A capa do principal é **~1.8× maior** que a capa de uma célula (≈ 463px × ≈ 256px a 1440px).
- Separação entre os dois: **12px de preto** (padding da seção da grade).

### 3.5 Responsivo [CÓD]

| Faixa | Principal | Grade |
|---|---|---|
| ≥ 990px | versão larga 2.667:1 | 4 colunas, sem margens laterais, espaço 12px, zoom no hover |
| 750–989px | versão larga 2.667:1 | **2 colunas** (2×2), laterais 50px, espaço 12px, **sem zoom** |
| < 750px | versão **quadrada** | 2 colunas (2×2), laterais 15px, espaço **6px**, sem zoom |

---

## 4. Apresentação individual do álbum (card)

Tudo nesta seção foi medido na imagem de 768 × 1050px [OBS]/[EST]. As porcentagens referem-se à **largura do card**, salvo indicação.

### 4.1 Geometria

```
┌────────────────────────────┐  ↑ 9.5% da altura (~100px)
│   ┌────────────────────┐   │
│   │                    │   │  capa: 73% da largura, quadrada, centralizada
│   │       CAPA         │   │  sombra escura suave ao redor (~10–15px)
│   │                    │   │
│   └────────────────────┘   │
│                            │  ↕ ~11% (≈ 87px)
│          N O M E           │  altura das maiúsculas ~6.8%; largura do texto ~47%
│                            │  ↕ ~9% (≈ 69px)
│  ┌─      BOTÃO       ─┐    │  73.7% × 10.4% (≈ 566 × 80px); cantos em colchete
│  └─                  ─┘    │
│                            │  ↓ ~10% da altura (~105px)
└────────────────────────────┘
```

| Elemento | Medida em 768px | Relativo |
|---|---|---|
| Margem superior → capa | ~100px | 9.5% da altura |
| Capa | ~560 × 557px, x ≈ 105–665 | **73% da largura**, centralizada |
| Sombra da capa | escurecimento de ~25% numa faixa de ~10–15px ao redor | [EST] |
| Capa → nome | ~87px | 11.3% |
| Nome (altura das maiúsculas) | ~52px; texto de x 198–558 (~360px) | 6.8% · 47% da largura |
| Nome → botão | ~69px | 9% |
| Botão | x 106–672, ~566 × 80px | 73.7% × 10.4%, **mesma largura da capa** |
| Botão → base | ~105px | 10% da altura |

### 4.2 Tipografia do nome do álbum (cor excluída, conforme pedido)

| Propriedade | Valor | Origem |
|---|---|---|
| Família | sans **geométrica, de formas quadradas/técnicas, traço fino**. Visualmente consistente com **Dekar** (Regular), a fonte de títulos declarada pelo site, com fallback `sans-serif` | [OBS] + [INF]; declaração [CÓD] |
| Peso | **fino/light** (traço ≈ 6% da altura das maiúsculas) | [EST] |
| Transformação | **MAIÚSCULAS** | [OBS] |
| Espaçamento entre letras | **amplo**, ≈ 0.10–0.15em | [EST] |
| Tamanho | altura das maiúsculas ≈ 6.8% da largura do card → num card de 351px ≈ 24px de maiúscula ≈ **font-size 32–35px** | [EST] |
| Line-height | não aplicável (linha única); use `1`–`1.1` | [INF] |
| Alinhamento | **centralizado** | [OBS] |
| Linhas | **uma** | [OBS] |

Equivalentes em texto real declarados no site para a mesma fonte [CÓD]:
- Títulos de seção: Dekar 400, maiúsculas, `letter-spacing: 5px`, centralizados.
- Menus e botões: Dekar 400, maiúsculas, `letter-spacing: 2.5px`.
- Nomes de produto: Dekar 400, maiúsculas, **15px**, `letter-spacing: 2.5px`.

### 4.3 Botão abaixo do nome [OBS]/[EST]

- Retângulo de **contorno fino (1px)**, sem preenchimento.
- **Laterais verticais completas**, mas as linhas de **topo e base existem só nos cantos** (~46–50px de cada lado, ≈ 8% da largura do botão), formando **colchetes** `[ ]`.
- Contorno cinza discreto (luminância ~20–30%).
- Texto em maiúsculas, mesma família do nome, mais **claro (branco)** e menor (altura das maiúsculas ≈ 2.5% da largura do card ≈ 19px em 768). O trecho do nome do álbum dentro do botão aparece em *itálico*.
- Não é um botão interativo: faz parte da imagem. O card inteiro é o link.

---

## 5. Background individual do álbum

### 5.1 Observado [OBS]/[EST] (gravado na imagem)

| Aspecto | Valor |
|---|---|
| Imagem usada | **a própria arte do álbum**, ampliada (~1.4–1.9× a escala da capa) e preenchendo todo o card |
| Posição | centralizada atrás da capa; a parte visível são as bordas da arte ampliada (topo, laterais e base) |
| Desfoque | **leve**: formas e detalhes continuam reconhecíveis, sem textura fina. A nitidez relativa medida é ~10–38% da capa, combinando ampliação e blur |
| Brilho | **mais escuro que a capa**: no álbum em que a comparação é mais confiável (mesma arte, densa), o fundo tem **≈ 54% do brilho da capa → redução de ≈ 46%** |
| Base do card | escurece progressivamente até quase **preto** na faixa do nome e do botão (a luminância cai para ~1–5%) |
| Contraste | reduzido em relação à capa |
| Overlay | nenhum separável (tudo gravado); há uma **sombra escura suave em volta da capa** |
| Relação com a capa | a capa é **nítida, com brilho total e bordas definidas**; o fundo é **a mesma arte, maior, escura e suave**, como uma "atmosfera" |

O valor de brilho **não pode ser lido do código**. A medição (~46% de redução) é compatível com a sua intenção de 40%.

### 5.2 Especificação para recriar [PEDIDO] + [EST]

| Camada (de trás para frente) | Valor sugerido |
|---|---|
| 1. Fundo | mesma arte da capa, `object-fit: cover`, **escala 1.3–1.5×**, centralizada |
| 2. Filtro do fundo | **`brightness(0.6)`** (redução de 40%, conforme pedido) + **`blur(1.5–3px)`** (blur extremamente leve) |
| 3. Degradê inferior | transparente → preto a partir de ~60% da altura, para a área do nome/botão (como na referência) |
| 4. Capa | 73% da largura, nítida, sem filtro, com sombra suave (ex.: `0 0 15px rgba(0,0,0,.5)`) |
| 5. Nome e botão | sobre a área escurecida |

---

## 6. Zoom ao passar o mouse

### 6.1 Cards da grade [CÓD]

| Aspecto | Valor |
|---|---|
| Escala inicial | `1` |
| Escala no hover | **`1.03`** (+3%) |
| Origem | **centro** (padrão) |
| Duração | **0.5s** |
| Curva | **`ease`** = `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Saída do hover | mesma transição, de volta a `1` em 0.5s |
| O que escala | **a imagem inteira do card**: fundo, capa, nome e botão juntos, porque são uma imagem só |
| O que não escala | a **moldura** do card: a imagem cresce **dentro** dela e é cortada nas bordas (o tamanho da célula, a borda de 1px e os espaços não mudam) |
| Efeitos simultâneos | **nenhum**: sem mudança de brilho, opacidade, sombra ou cor |
| Disparo | mouse sobre a área do card |
| Disponível em | **telas ≥ 990px**; abaixo disso, sem zoom |

### 6.2 Álbum principal [CÓD]

- Mesmo comportamento: **scale(1.03)**, **0.5s ease**, a partir do centro, com a imagem cortada nas bordas do banner [INF].
- Ativo só na versão larga; a versão quadrada (mobile) não tem zoom.

### 6.3 Para recriar com o fundo separado [PEDIDO] + [INF]

Na referência, o fundo individual **também amplia**, porque está na mesma imagem. Ao separar as camadas, para reproduzir o mesmo resultado aplique o zoom ao **conjunto** (fundo + capa) dentro de uma moldura que corta o excesso. Se quiser um efeito mais sutil, aplique só na capa. Isso foge da referência.

### 6.4 Animação de entrada (associada) [CÓD]

- Ao entrarem na tela, os cards sobem **20px → 0** e vão de **opacidade 0 → 1** em **0.6s** `cubic-bezier(0, 0, 0.3, 1)` (desaceleração forte).
- Cada card começa **75ms depois** do anterior (75 / 150 / 225 / 300ms).
- O banner principal faz só o fade, com a mesma duração e curva.
- Essas animações são desativadas quando o usuário prefere movimento reduzido.

---

## 7. Separação entre os álbuns (divisórias pretas)

| Aspecto | Valor | Origem |
|---|---|---|
| Natureza | **estrutural**: não são linhas desenhadas, e sim o **espaço vazio** entre as células, que deixa ver o fundo **preto `#000`** da seção | [CÓD] |
| Espessura | **12px** (≥ 750px) · **6px** (< 750px), igual na horizontal e na vertical | [CÓD] |
| Moldura de cada célula | borda **1px sólida `#111`** (quase preta) em volta da imagem, parte da própria célula | [CÓD] |
| Faixa superior e inferior da grade | 12px de preto (9px no mobile) | [CÓD] |
| Consistência | idêntica entre todas as células | [CÓD] |
| Sobreposição ao grid | **não existe**: as divisórias pertencem à estrutura (espaço da grade + borda da célula) | [CÓD] |
| Mesmo padrão em outro lugar | a grade de categorias usa o mesmo sistema (12px + borda 1px `#111`) | [CÓD] |

---

## 8. Linha dourada

### 8.1 Valores exatos [CÓD]

| Aspecto | Valor |
|---|---|
| Cor base (dourado) | **`#e2ad3a`** = `rgb(226, 173, 58)` = `hsl(41°, 74%, 56%)` |
| Realce | **`#ffffff`** |
| Gradiente | **horizontal (90°, da esquerda para a direita)**: dourado sólido **0–35%** → clareia até **branco puro em 50%** → volta ao dourado em **65%** → dourado sólido **65–100%** |
| Tons intermediários | contínuos; no meio de cada rampa (42.5% / 57.5%) ≈ `#f1d69d` (dourado claro) |
| Quantidade de variações | **2 cores-chave** (dourado + branco) e **1 único ponto branco**, centralizado e simétrico |
| Espessura | **2px** |
| Largura | **100%** do elemento que a linha encerra |
| Textura, brilho extra, sombra, blur | **nenhum** |
| Contraste com o preto | ≈ **10.3 : 1** (dourado) e 21 : 1 (ponto branco) |
| **Animação** | **nenhuma: é estática**. Não há transição, keyframe nem script envolvido |

```
0%            35%        50%        65%            100%
████████████████▓▓▒▒░░  ⬜  ░░▒▒▓▓████████████████████
   dourado       rampa   branco   rampa     dourado
```

### 8.2 Onde aparece [CÓD]

A linha é posicionada **logo abaixo** do elemento, como uma faixa de 2px na base:
- da barra de anúncio (topo do site);
- da linha de menu do header (logo e ícones ficam na linha de cima; a linha dourada **fecha o header** logo abaixo da navegação);
- dos banners do hero;
- da seção "Destaques", a que tem o **fundo fixo totalmente visível**;
- do fim do conteúdo principal, **entre a grade de álbuns e o rodapé**;
- do cabeçalho das páginas de coleção (fora da home).

Ou seja: a linha dourada marca a **troca de zona**, nunca a separação entre itens de uma mesma grade (essa é feita pelo preto).

### 8.3 Branco irregular e não simultâneo [PEDIDO]: não existe na referência

- Na referência, o branco aparece **num único ponto central, igual em todas as linhas e sempre ao mesmo tempo** (estático) [CÓD].
- O comportamento pedido (branco distribuído de forma irregular, sem acender em todos os pontos ao mesmo tempo) **precisa ser criado**.

Proposta de reprodução, mantendo a cor e a espessura da referência:

| Aspecto | Proposta |
|---|---|
| Base | dourado `#e2ad3a` sólido, 2px |
| Realces | 2–4 pontos de branco por linha, em **posições irregulares** (ex.: ~12%, ~47%, ~83%), com **larguras diferentes** (6–20% da linha) e **intensidades diferentes** (60–100% de branco), cada um em rampa suave a partir do dourado (como a rampa de 15% da referência) |
| Variação entre linhas | posições e intensidades diferentes em cada linha, para não haver dois realces alinhados |
| Versão estática | já atende "não aparece simultaneamente em todos os pontos" no espaço |
| Versão animada (opcional) | realces deslizando ou pulsando **lentamente** (8–14s por ciclo, `ease-in-out`), com **atrasos diferentes** por linha e por realce, para que o branco nunca acenda em todos os pontos de uma vez. Respeite a preferência por movimento reduzido |

Os valores da proposta são sugestões de design, **não medições**.

---

## 9. Relação entre os elementos

### 9.1 Camadas (de trás para frente)

| Nível | Elemento | Papel |
|---|---|---|
| 0 | Preto `#000` da página | **fundo absoluto**; emenda tudo |
| 1 | Texturas de seção (escuras, ~3% de luminância média, bordas pretas) | **fundo atmosférico**; aparecem só em algumas seções, uma delas fixa |
| 2 | "Bloco central" (centro preto da textura) e seções pretas | **fundo de leitura**; escondem a textura |
| 3 | Background individual do álbum (arte ampliada, escura, desfocada) | **fundo do card**; atmosfera local |
| 4 | Capa do álbum (nítida, brilho total) | **primeiro plano**; foco visual |
| 5 | Nome e botão do álbum | **primeiro plano secundário**; informação |
| — | Espaços pretos de 12px + borda `#111` | **separadores estruturais** dentro de uma mesma grade |
| — | Linha dourada de 2px | **separador de zona**; o único elemento de cor quente e brilho alto do sistema |

### 9.2 Princípios que mantêm a coerência

1. **Escala de luminância:** fundo da página (0%) < texturas (≤ 29%) < fundo do card (~40–60% da capa) < capa (100%). Cada camada é visivelmente mais escura que a da frente.
2. **Preto como cola:** tudo termina em preto (bordas das texturas, base dos cards, espaços da grade), então nenhuma emenda aparece.
3. **Nitidez como hierarquia:** só a capa é nítida; tudo atrás é suave.
4. **Movimento contido:** zoom de apenas 3% em 0.5s, dentro da moldura; fundo fixo que revela em vez de se mover.
5. **Dois separadores com funções distintas:** preto (espaço) **entre itens**; dourado (linha) **entre zonas**.
6. **Monocromia + um acento:** o sistema é preto/cinza, e o dourado com seu realce branco é o único brilho quente.

---

## 10. Fora do escopo

Não foram extraídos: plataforma de loja, tema, componentes de script, carrinho, checkout e meios de pagamento, controle de acesso, limites de quantidade, avaliações, contador regressivo, seletor de região, busca, formulário de e-mail, analytics, pixels, cookies, SEO, dados estruturados e APIs. Também ficaram de fora o conteúdo comercial das seções e a troca de imagem por GIF da grade de categorias.
