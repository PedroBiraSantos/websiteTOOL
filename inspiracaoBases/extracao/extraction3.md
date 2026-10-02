# Reference 03: Setas de navegação e animações

Fonte analisada: `insiracaoBases/sites/reference03/` (`STACK.md`, `design-system.html`, `assets/css/video.css`, `assets/css/music.css`, `assets/js/video-carousel.js`, `assets/js/music-carousel.js`, ícones SVG e código do carrossel na cópia salva).
Nenhum arquivo da referência foi alterado. Escopo: **apenas as setas laterais das seções Vídeos e Música e a transição entre conteúdos**.

---

## 0. Convenções

| Marca | Significado |
|---|---|
| **[OBS]** | Observado diretamente no material visual da referência |
| **[CÓD]** | Valor exato identificado no código/arquivos |
| **[INF]** | Inferido a partir da implementação |
| **[EST]** | Estimativa calculada (depende da largura da tela ou de métricas não medidas) |

> A página não foi renderizada num navegador. A forma da seta foi lida dos arquivos SVG; posições e tempos vêm das regras de estilo e da configuração do carrossel. As medidas em `vw` foram projetadas para uma tela de **1920px** (o ícone mede exatamente sua largura nativa nessa largura), então os valores em px abaixo usam 1920px como referência principal.

---

## 1. Resumo rápido

| | Vídeos | Música |
|---|---|---|
| Ícone | mesmo chevron branco | mesmo chevron branco |
| Tamanho do ícone | 1.1339vw (≈ 21.8 × 38.1px a 1920) | 1.1302vw (≈ 21.7 × 37.9px a 1920), **visualmente idêntico** |
| Área clicável | **círculo invisível de 50×50px** com o ícone centralizado | **só o próprio ícone** |
| Vertical | **centro exato** do vídeo | **34% da altura do slide**, pouco acima do centro da capa |
| Distância seta → conteúdo (1920px) | ≈ 41px | ≈ 45px |
| Hover | opacidade 1 → 0.6, **fade de 0.3s ease** | opacidade 1 → 0.6, **instantâneo** |
| Transição do conteúdo | deslizamento horizontal, 250ms, ease | idêntica |
| Espaço entre slides | 30px | 40px (30px abaixo de 1024px) |
| Extremidades | carrossel infinito; setas sempre ativas | idem |

São **essencialmente o mesmo sistema**: mesma seta, mesmo hover (opacidade 0.6) e mesma animação. As diferenças são de implementação local: área clicável, presença de fade no hover, ancoragem vertical e espaço entre slides. A seção 5 detalha cada uma.

---

## 2. A seta

### 2.1 Formato [CÓD]

- **Chevron de ângulo reto** (estilo "seta de iOS"): dois braços a **45°** que se encontram numa ponta, formando um "‹" / "›" alto e estreito.
- Construído como forma preenchida com **extremidades e vértice arredondados**: raio ≈ 2.7 unidades, o que dá braços com espessura de ≈ 5.4 unidades, cerca de **25% da largura** do ícone [EST, a partir do desenho do caminho].
- Caixa nativa do ícone: **21.772 × 38.079** → proporção **1 : 1.749** (alta e estreita).
- Sem círculo, fundo, borda ou sombra: **só o traço da seta**.

```
  ╱        ╲
 ╱          ╲
 ╲          ╱
  ╲        ╱
 prev      next
```

### 2.2 Cor [CÓD]

- Preenchimento **branco `#fff`**, sólido, sem gradiente nem contorno.
- Fundo da área clicável: nenhum (transparente). A seta aparece direto sobre o background da seção.

### 2.3 Esquerda × direita [CÓD]

- O **mesmo desenho**, girado +90° (anterior, aponta para a esquerda) e −90° (próxima, aponta para a direita). São **espelhos exatos**: mesmo tamanho, espessura, cor e comportamento.
- A única diferença é o lado e a direção do movimento que disparam (seção 3).

---

## 3. Posição em relação ao conteúdo

### 3.1 Vídeos [CÓD] + [EST]

```
          ←—— 66.77vw (largura do vídeo) ——→
   (◁)  ┌──────────────────────────────────┐  (▷)
  50×50 │            vídeo 16:9            │  50×50
        └──────────────────────────────────┘
   ↑ centro vertical exato do vídeo
```

| Propriedade | Valor |
|---|---|
| Conteúdo | um vídeo por vez, largura **66.7708vw**, centralizado, proporção 16:9 |
| Faixa das setas | sobreposta ao carrossel, largura total, **centralizada verticalmente** (50% / −50%); as setas ficam nas pontas |
| Área de cada seta | **50 × 50px**, circular (sem fundo, invisível), com o ícone centralizado |
| Deslocamento para fora | a área clicável é empurrada **4vw para fora** de cada borda do vídeo |
| Tamanho do ícone | largura **1.1339vw**, altura proporcional (×1.749) |
| Alinhamento vertical | centro do ícone = centro vertical do vídeo |

Valores resultantes [EST]:

| Viewport | Ícone (L × A) | Espaço ícone → borda do vídeo | Ícone → borda da tela |
|---|---|---|---|
| 1920px | 21.8 × 38.1px | ≈ 41px | ≈ 256px |
| 1440px | 16.3 × 28.6px | ≈ 24px | ≈ 199px |
| 1280px | 14.5 × 25.4px | ≈ 19px | ≈ 179px |

O espaço até o vídeo mistura uma unidade proporcional (4vw) com uma fixa (metade dos 50px), por isso **encolhe mais rápido que a tela**. Em ~1024px, a área clicável já invade ~9px do vídeo [INF].

### 3.2 Música [CÓD] + [EST]

```
             ←— 36.56vw —→
            ┌─────────────┐
            │             │
     ‹      │  capa ~1:1  │      ›     ← topo da seta a 34% da altura total do slide
            │             │
            └─────────────┘
               TÍTULO
              subtítulo
             [ BOTÃO ]
```

| Propriedade | Valor |
|---|---|
| Conteúdo | um álbum por vez: capa quase quadrada (766×780) + título + subtítulo + botão; largura **36.5625vw**, centralizado |
| Posição horizontal | seta anterior começa **3.5vw à esquerda** da borda do slide; a próxima termina **3.5vw à direita** |
| Tamanho | largura **1.1302vw**, altura proporcional; a área clicável é o próprio ícone |
| Posição vertical | **topo da seta a 34% da altura total do slide** (capa + textos + botão) |
| Alinhamento vertical resultante | aproximadamente na metade da **capa**, ≈ 1.4vw acima do centro dela [EST: depende da altura dos textos] |

Valores resultantes [EST]:

| Viewport | Ícone (L × A) | Espaço ícone → borda da capa | Ícone → borda da tela |
|---|---|---|---|
| 1920px | 21.7 × 37.9px | ≈ 45px (2.37vw) | ≈ 542px |
| 1440px | 16.3 × 28.5px | ≈ 34px | ≈ 406px |
| 1280px | 14.5 × 25.3px | ≈ 30px | ≈ 361px |

Aqui o espaço é **totalmente proporcional** (2.37vw): a relação seta–capa se mantém em qualquer largura.

### 3.3 Telas em retrato (≤ 1024px, orientação vertical) [CÓD] + [EST]

| | Vídeos | Música |
|---|---|---|
| Largura do conteúdo | 89.87vw | 89.87vw |
| Ícone | 2.4507vw (≈ 9.6 × 16.7px a 390px) | 2.4507vw (idem) |
| Deslocamento para fora | 9.5vw (área de 50px) | 4vw |
| Espaço ícone → conteúdo a 390px | ≈ 7px | ≈ 6px |
| Ícone → borda da tela a 390px | ≈ 3px | ≈ 4px |

No vídeo, a combinação de −9.5vw com a área fixa de 50px faz o ícone **sair da tela** em retratos com mais de ~440px de largura (ex.: tablet a 768px) [INF]. Esse efeito não deve ser reproduzido.

---

## 4. Interação com o mouse

### 4.1 Estados

| Estado | Vídeos | Música | Origem |
|---|---|---|---|
| Normal | opacidade 1, branco | opacidade 1, branco | [CÓD] |
| **Hover** | **opacidade 0.6** | **opacidade 0.6** | [CÓD] |
| Cor | não muda | não muda | [CÓD] |
| Escala / tamanho | não muda | não muda | [CÓD] |
| Posição | não muda | não muda | [CÓD] |
| Sublinhado, fundo, borda, sombra | nenhum | nenhum | [CÓD] |
| Cursor | mãozinha (pointer) | mãozinha (pointer) | [CÓD] |
| Pressionado (active) | sem estilo próprio, igual ao hover | idem | [CÓD] |
| Foco por teclado | as setas **não recebem foco** (não são botões) | idem | [INF] |
| Seleção de texto | desativada nas setas | idem | [CÓD] |

### 4.2 Transição do hover

| | Vídeos | Música |
|---|---|---|
| Duração | **0.3s** | **0s (instantâneo)** |
| Curva | `ease` = `cubic-bezier(0.25, 0.1, 0.25, 1)` | — |
| Propriedade animada | todas (na prática, só a opacidade muda) | — |

### 4.3 Antes → durante → depois [INF]

1. **Antes:** seta branca a 100%.
2. **Mouse entra:** escurece para 60% (vídeos: fade de 0.3s; música: troca seca).
3. **Clique:** sem efeito de "pressionar". O conteúdo começa a deslizar imediatamente, e a seta continua a 60% enquanto o mouse estiver sobre ela.
4. **Durante a animação:** a seta **não se move** nem muda de estado; fica fixa enquanto o conteúdo desliza por baixo/ao lado.
5. **Mouse sai:** volta a 100% (vídeos: 0.3s ease; música: instantâneo).

---

## 5. Animação ao navegar

### 5.1 Mecânica visual [CÓD] + [INF]

Os conteúdos ficam numa **trilha horizontal contínua**: todos lado a lado, separados por um espaço fixo. Uma "janela" com a largura de um único item mostra só o conteúdo atual; o resto fica cortado.

```
            janela visível
          ┌───────────────┐
 … [ A ] ␣│[     B     ]  │␣ [ C ] …      ← trilha (␣ = espaço entre itens)
          └───────────────┘
 clique "→": a trilha inteira desliza para a ESQUERDA uma posição
          ┌───────────────┐
 … [ B ] ␣│[     C     ]  │␣ [ D ] …
          └───────────────┘
```

| Aspecto | Valor |
|---|---|
| Tipo | **deslizamento horizontal** (translação) de toda a trilha |
| Direção ao avançar (→) | conteúdo se move **da direita para a esquerda**: o atual sai pela esquerda, o novo entra pela direita |
| Direção ao voltar (←) | o inverso: o atual sai pela direita, o anterior entra pela esquerda |
| Distância | **largura de 1 item + espaço entre itens**. Vídeos: 66.77vw + 30px (≈ 1312px a 1920). Música: 36.56vw + 40px (≈ 742px a 1920) |
| Duração | **250ms** por passo |
| Curva | **`ease`** (`cubic-bezier(0.25, 0.1, 0.25, 1)`): arranque rápido, desaceleração longa |
| Fade | **nenhum**; opacidade sempre 1 |
| Escala | **nenhuma** |
| Sobreposição | **nenhuma**. Saída e entrada são **simultâneas e contíguas**: os dois itens se movem juntos, à mesma velocidade, como uma peça rígida |
| Espaço visível durante o movimento | sim: a faixa entre itens (30 ou 40px) atravessa a janela, mostrando o background da seção |
| Corte nas bordas | o conteúdo é cortado exatamente nas bordas da janela; nada aparece fora dela |
| Atraso entre saída e entrada | **nenhum** |
| Avançar × voltar | idênticos em tempo, curva e distância; só a direção muda |
| Velocidade percebida | o vídeo percorre ~1.8× mais distância no mesmo tempo, então **parece mais rápido** que a música [INF] |

### 5.2 Fim da lista [CÓD] + [INF]

- **Os dois carrosséis são infinitos.** Depois do último item vem o primeiro, e antes do primeiro vem o último.
- A volta é **invisível**: o salto de posição acontece sem animação antes do deslizamento, e o usuário só vê o mesmo movimento de sempre.
- Por isso **as setas nunca ficam desativadas** nem mudam de aparência nas extremidades.
- Vídeos: 14 itens; Música: 8 itens. Com um único item, as setas seriam ocultadas automaticamente [INF].

### 5.3 Cliques rápidos [INF]

Um novo clique durante a animação **não espera** o fim: o movimento é redirecionado a partir da posição atual, com nova duração de 250ms. O resultado é um deslizamento contínuo, sem fila de animações nem "pulo".

### 5.4 Comportamentos associados (fora das setas) [CÓD]

- Arrastar com o mouse ou deslizar o dedo também troca de item, com o mesmo deslizamento de 250ms.
- Vídeos: ao iniciar uma troca, qualquer vídeo em reprodução é **pausado**. O player permanece no slide, que sai de cena normalmente.
- Vídeos: no carregamento, o carrossel inteiro aparece com **fade de 0.4s ease-in-out** (0 → 1). A música não tem esse fade.

---

## 6. Estrutura do componente

```
┌───────────────────────── componente ──────────────────────────┐
│                                                               │
│  [←]   ┌──────────── janela (largura de 1 item) ───────────┐   [→] │
│  fora  │  trilha: [item] gap [item atual] gap [item] …     │  fora │
│  da    │  overflow cortado                                 │  da   │
│  janela└───────────────────────────────────────────────────┘ janela│
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

| Elemento | Comportamento |
|---|---|
| Janela | largura de **um item**, centralizada na seção, corta o que estiver fora |
| Trilha | todos os itens em linha, com espaço fixo entre eles; é ela que se move |
| Setas | camada acima da janela, **fora** dela na horizontal (sobre o background), **fixas** durante a animação; não bloqueiam cliques no conteúdo |
| Área do componente | largura = janela + as duas projeções laterais das setas (vídeo: +4vw de cada lado; música: +3.5vw) |
| Seta ↔ conteúdo | a seta "aponta" para o conteúdo atual, separada dele por um respiro de ~2–3% da largura da tela |
| Próximo conteúdo | fica imediatamente à direita da janela, oculto, e entra deslizando |
| Sem anterior/próximo | não ocorre: a navegação é circular (seção 5.2) |

---

## 7. Especificação para recriar

### 7.1 Valores-base recomendados (síntese da referência)

| Item | Valor |
|---|---|
| Ícone | chevron 45° de pontas arredondadas, proporção 1 : 1.75, branco, sem fundo |
| Tamanho do ícone | ≈ 1.13vw de largura (≈ 22px a 1920px) |
| Área clicável | 50 × 50px com o ícone centralizado (padrão do vídeo; melhor que a área mínima da música) |
| Posição | fora do conteúdo, um em cada lado; centralizado na vertical em relação à mídia principal |
| Espaço seta → conteúdo | ≈ 2.4vw (relação proporcional da música; estável em todas as larguras) |
| Hover | opacidade 1 → 0.6, `0.3s ease` (versão com fade do vídeo) |
| Troca de conteúdo | trilha horizontal, deslocamento = largura do item + espaço, **250ms `ease`**, sem fade e sem escala |
| Espaço entre itens | 30–40px |
| Extremidades | navegação circular, setas sempre ativas |

### 7.2 Diferenças a decidir

- **Música:** escolha entre o hover instantâneo (música) e o fade de 0.3s (vídeo). Recomendo unificar com o fade.
- **Área clicável pequena na música:** só o ícone (~16 × 28px a 1440px). Prefira a área de 50 × 50px.
- **Âncora vertical:** "centro da mídia" (vídeo) é mais previsível que "34% da altura total" (música), que muda conforme o texto abaixo da capa.
- **Acessibilidade (não vem da referência):** use botões focáveis por teclado, com rótulo ("anterior" / "próximo"), um estado de foco visível e suporte às setas do teclado.
- **Retrato (vídeo):** não reproduza o deslocamento de 9.5vw, que joga a seta para fora da tela em tablets.

---

## 8. Fora do escopo

Não foram extraídos: CMS, biblioteca de carrossel, bibliotecas de script, reset de estilos, fontes e ícones de redes sociais, player de vídeo como tecnologia, agenda de shows, formulário de e-mail, consentimento de cookies, analytics e tags de marketing, SEO, APIs, nem o restante do design das seções (títulos, botões, backgrounds).
