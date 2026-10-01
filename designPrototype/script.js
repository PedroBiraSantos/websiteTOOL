/* Protótipo visual do DESIGN.md: comportamento. Descartável. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var corpo = document.body;
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Modo rosa (?rosa): imagens viram blocos #FFC0CB ---------- */
  if (/[?&]rosa\b/.test(location.search)) raiz.classList.add('modo-rosa');

  /* ---------- 9.2  Carga: Fundo fixo + sequência da abertura ---------- */
  function carregar() { raiz.classList.add('carregado'); }
  if (document.readyState === 'complete') carregar();
  else {
    window.addEventListener('load', carregar);
    setTimeout(carregar, 2500); // não deixa a página escura se alguma imagem demorar
  }

  /* ---------- Vídeo da abertura: surge quando o primeiro quadro está pronto ---------- */
  var abertura = document.querySelector('.abertura');
  var video = abertura && abertura.querySelector('.abertura__video');
  if (video) {
    var mostrarVideo = function () { abertura.classList.add('video-pronto'); };
    if (reduzido) {
      // movimento reduzido: mostra o primeiro quadro parado, sem reprodução
      video.removeAttribute('autoplay');
      video.pause();
    }
    if (video.readyState >= 2) mostrarVideo();
    else video.addEventListener('loadeddata', mostrarVideo, { once: true });
    // alguns navegadores ignoram o autoplay do atributo; tenta de novo (mudo é permitido)
    if (!reduzido) {
      var tocar = video.play();
      if (tocar && tocar.catch) tocar.catch(function () {});
    }
    video.addEventListener('error', function () { console.warn('Vídeo da abertura não carregou:', video.currentSrc); }, true);
  }

  /* ---------- 6.2  Header: transparente sobre a abertura até 50px ---------- */
  var header = document.querySelector('.header');
  var temAbertura = corpo.hasAttribute('data-abertura');
  function atualizarHeader() {
    if (!temAbertura) { header.classList.remove('header--transparente'); return; }
    header.classList.toggle('header--transparente', window.scrollY <= 50);
  }

  /* ---------- 6.4  Menu de tela cheia ---------- */
  var botaoMenu = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu');
  var linksMenu = Array.prototype.slice.call(menu.querySelectorAll('a'));

  function abrirMenu() {
    menu.classList.add('aberto');
    menu.setAttribute('aria-hidden', 'false');
    corpo.classList.add('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', 'true');
    botaoMenu.textContent = 'Fechar';
    linksMenu[0].focus();
  }
  function fecharMenu(devolverFoco) {
    menu.classList.remove('aberto');
    menu.setAttribute('aria-hidden', 'true');
    corpo.classList.remove('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.textContent = 'Menu';
    if (devolverFoco) botaoMenu.focus();
  }
  botaoMenu.addEventListener('click', function () {
    menu.classList.contains('aberto') ? fecharMenu(true) : abrirMenu();
  });
  linksMenu.forEach(function (a) { a.addEventListener('click', function () { fecharMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('aberto')) return;
    if (e.key === 'Escape') { e.preventDefault(); fecharMenu(true); return; }
    if (e.key === 'Tab') { // foco preso: botão + links do menu
      var focaveis = [botaoMenu].concat(linksMenu);
      var i = focaveis.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); focaveis[focaveis.length - 1].focus(); }
      else if (!e.shiftKey && i === focaveis.length - 1) { e.preventDefault(); focaveis[0].focus(); }
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 960 && menu.classList.contains('aberto')) fecharMenu(false);
  });

  /* ---------- 9.2  Entrada no scroll (uma vez, cascata de 75ms) ---------- */
  var revelaveis = document.querySelectorAll('[data-revelar]');
  if (reduzido || !('IntersectionObserver' in window)) {
    revelaveis.forEach(function (el) { el.classList.add('revelado'); });
  } else {
    var obsRevelar = new IntersectionObserver(function (entradas) {
      var contadorPorPai = new Map();
      entradas
        .filter(function (en) { return en.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })
        .forEach(function (en) {
          var el = en.target;
          var pai = el.parentElement;
          var n = contadorPorPai.get(pai) || 0;
          contadorPorPai.set(pai, n + 1);
          el.style.setProperty('--atraso', Math.min(n, 5) * 75 + 'ms'); // máx. 6 irmãos
          el.classList.add('revelado');
          obsRevelar.unobserve(el);
        });
    }, { threshold: 0.15 });
    revelaveis.forEach(function (el) { obsRevelar.observe(el); });
  }

  /* ---------- 8.4 · 8.12  Marginália-índice rastreada + marcador no Veio ---------- */
  var blocoIndice = document.querySelector('[data-indice-rastreado]');
  var atualizarIndice = function () {};
  if (blocoIndice) {
    var entradasIdx = Array.prototype.slice.call(blocoIndice.querySelectorAll('[data-entrada]'));
    var itensIdx = Array.prototype.slice.call(blocoIndice.querySelectorAll('.item[data-alvo]'));
    var marcador = blocoIndice.querySelector('.indice-fixo__marcador');
    var faixa = blocoIndice.querySelector('.indice-fixo');
    var ativoAtual = null;

    atualizarIndice = function () {
      var r = blocoIndice.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var centro = window.innerHeight / 2;
      var ativo = null;
      entradasIdx.forEach(function (en) { if (en.getBoundingClientRect().top <= centro) ativo = en; });
      if (!ativo) ativo = entradasIdx[0];
      if (ativo === ativoAtual) return;
      ativoAtual = ativo;
      itensIdx.forEach(function (it) {
        var sim = it.getAttribute('data-alvo') === ativo.id;
        it.classList.toggle('ativo', sim);
        if (sim) {
          it.setAttribute('aria-current', 'true');
          // marcador: pulso de 120px alinhado ao centro do item (desliza 700ms via CSS)
          marcador.style.top = (it.parentElement.offsetTop + it.offsetHeight / 2 - 60) + 'px';
          marcador.classList.add('visivel');
          // faixa horizontal no mobile: traz o item ativo para a vista
          if (faixa.scrollWidth > faixa.clientWidth) {
            faixa.scrollTo({ left: it.parentElement.offsetLeft - 20, behavior: reduzido ? 'auto' : 'smooth' });
          }
        } else {
          it.removeAttribute('aria-current');
        }
      });
    };
  }

  /* ---------- Scroll (rAF) ---------- */
  var agendado = false;
  function aoRolar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () {
      agendado = false;
      atualizarHeader();
      atualizarIndice();
    });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);
  atualizarHeader();
  atualizarIndice();

  /* ---------- 6.5  Âncoras: 600ms easeInOutSine, deslocamento de 96px ---------- */
  function rolarAte(y) {
    if (reduzido) { window.scrollTo(0, y); return; }
    var inicio = window.scrollY, delta = y - inicio, t0 = null, dur = 600;
    function passo(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      window.scrollTo(0, inicio + delta * (0.5 - Math.cos(Math.PI * p) / 2));
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; } // links placeholder
    var alvo = document.getElementById(href.slice(1));
    if (!alvo) return;
    e.preventDefault();
    var y = Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - 96);
    rolarAte(y);
    history.replaceState(null, '', href);
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    alvo.focus({ preventScroll: true });
  });

  /* ---------- 8.13  Carrossel: trilha rígida, circular, 450ms ---------- */
  document.querySelectorAll('[data-carrossel]').forEach(function (car) {
    var trilha = car.querySelector('.trilha');
    var originais = Array.prototype.slice.call(trilha.children);
    var n = originais.length;
    var legenda = car.querySelector('.carrossel__legenda');
    var contador = car.querySelector('.carrossel__contador');

    // clones nas pontas permitem a volta invisível (navegação circular)
    var cloneFim = originais[n - 1].cloneNode(true);
    var cloneIni = originais[0].cloneNode(true);
    [cloneFim, cloneIni].forEach(function (c) { c.setAttribute('aria-hidden', 'true'); });
    trilha.insertBefore(cloneFim, originais[0]);
    trilha.appendChild(cloneIni);
    trilha.querySelectorAll('img').forEach(function (img) { img.draggable = false; });

    var i = 1;
    var animando = false;

    function posicionar(comTransicao) {
      if (!comTransicao) trilha.classList.add('sem-transicao');
      trilha.style.transform = 'translateX(calc(' + (-i) + ' * (100% + 24px)))';
      if (!comTransicao) { void trilha.offsetWidth; trilha.classList.remove('sem-transicao'); }
    }
    function normalizar() {
      if (i === 0) { i = n; posicionar(false); }
      else if (i === n + 1) { i = 1; posicionar(false); }
    }
    function atualizarTexto() {
      var real = ((i - 1) % n + n) % n;
      legenda.textContent = originais[real].getAttribute('data-legenda') || '';
      contador.textContent = String(real + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    }
    function ir(delta) {
      var proximo = i + delta;
      if (proximo < 0 || proximo > n + 1) return; // evita passar dos clones durante a animação
      i = proximo;
      if (reduzido) { posicionar(false); normalizar(); }
      else { animando = true; posicionar(true); }
      atualizarTexto();
    }
    trilha.addEventListener('transitionend', function (e) {
      if (e.target !== trilha || e.propertyName !== 'transform') return;
      animando = false;
      normalizar();
    });

    car.querySelector('.seta--ant').addEventListener('click', function () { ir(-1); });
    car.querySelector('.seta--prox').addEventListener('click', function () { ir(1); });
    car.addEventListener('keydown', function (e) {
      if (e.target !== car) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(1); }
    });

    // arraste/swipe com limiar de 40px
    var janela = car.querySelector('.carrossel__janela');
    var x0 = null;
    janela.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    janela.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) >= 40) ir(dx < 0 ? 1 : -1);
    });
    janela.addEventListener('pointercancel', function () { x0 = null; });

    posicionar(false);
    atualizarTexto();
  });
})();
