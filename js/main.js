/* TOOL · Arquivo Anatômico: comportamento compartilhado por todas as páginas.
   Cada bloco só age se os elementos dele existirem na página. Ver DESIGN.md, seção 9. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var corpo = document.body;
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Carga: Fundo fixo e sequência da abertura ---------- */
  function carregar() { raiz.classList.add('carregado'); }
  if (document.readyState === 'complete') carregar();
  else {
    window.addEventListener('load', carregar);
    setTimeout(carregar, 2500); // não deixa a página escura se algum recurso demorar
  }

  /* ---------- Vídeo da abertura ---------- */
  var abertura = document.querySelector('.abertura');
  var video = abertura && abertura.querySelector('.abertura__video');
  if (video) {
    var mostrarVideo = function () { abertura.classList.add('video-pronto'); };
    if (reduzido) {
      // movimento reduzido: primeiro quadro parado, sem reprodução
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      var tocar = video.play();
      if (tocar && tocar.catch) tocar.catch(function () {});
    }
    if (video.readyState >= 2) mostrarVideo();
    else video.addEventListener('loadeddata', mostrarVideo, { once: true });
  }

  /* ---------- Header: transparente sobre a abertura até 50px (6.2) ---------- */
  var header = document.querySelector('.header');
  var temAbertura = corpo.hasAttribute('data-abertura');
  function atualizarHeader() {
    if (!header) return;
    header.classList.toggle('header--transparente', temAbertura && window.scrollY <= 50);
  }

  /* ---------- Menu de tela cheia (6.4) ---------- */
  var botaoMenu = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu');
  if (botaoMenu && menu) {
    var linksMenu = Array.prototype.slice.call(menu.querySelectorAll('a'));
    var abrirMenu = function () {
      menu.classList.add('aberto');
      menu.removeAttribute('inert');
      menu.setAttribute('aria-hidden', 'false');
      corpo.classList.add('menu-aberto');
      botaoMenu.setAttribute('aria-expanded', 'true');
      botaoMenu.textContent = 'Fechar';
      linksMenu[0].focus();
    };
    var fecharMenu = function (devolverFoco) {
      menu.classList.remove('aberto');
      menu.setAttribute('inert', '');
      menu.setAttribute('aria-hidden', 'true');
      corpo.classList.remove('menu-aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.textContent = 'Menu';
      if (devolverFoco) botaoMenu.focus();
    };
    botaoMenu.addEventListener('click', function () {
      if (menu.classList.contains('aberto')) fecharMenu(true); else abrirMenu();
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
  }

  /* ---------- Entrada no scroll: uma vez, cascata de 75ms (9.2) ---------- */
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
          var n = contadorPorPai.get(el.parentElement) || 0;
          contadorPorPai.set(el.parentElement, n + 1);
          el.style.setProperty('--atraso', Math.min(n, 5) * 75 + 'ms'); // máx. 6 irmãos
          el.classList.add('revelado');
          obsRevelar.unobserve(el);
        });
    }, { threshold: 0.15 });
    revelaveis.forEach(function (el) { obsRevelar.observe(el); });
  }

  /* ---------- Placa de vídeo do YouTube: clique para carregar (8.17) ---------- */
  document.querySelectorAll('[data-youtube]').forEach(function (placa) {
    var id = placa.getAttribute('data-youtube');
    var inicio = placa.getAttribute('data-inicio') || '0';
    var titulo = placa.getAttribute('data-titulo') || 'Vídeo do YouTube';
    var quadro = placa.querySelector('.placa-video__quadro');
    var capa = placa.querySelector('.placa-video__capa img');

    // miniatura em alta resolução; se não existir, cai para a versão padrão
    if (capa) {
      capa.addEventListener('error', function trocar() {
        capa.removeEventListener('error', trocar);
        capa.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      });
    }

    function carregarPlayer(e) {
      if (e) e.preventDefault();
      if (placa.classList.contains('tocando')) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?start=' + inicio + '&autoplay=1&rel=0';
      iframe.title = titulo;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      quadro.appendChild(iframe);
      placa.classList.add('tocando');
      iframe.focus();
    }
    placa.querySelectorAll('.placa-video__capa, .placa-video__acao').forEach(function (el) {
      el.addEventListener('click', carregarPlayer);
    });
  });

  /* ---------- Scroll (rAF) ---------- */
  var agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { agendado = false; atualizarHeader(); });
  }, { passive: true });
  atualizarHeader();

  /* ---------- Âncoras internas: 600ms easeInOutSine, deslocamento de 96px (6.5) ---------- */
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
    var alvo = href.length > 1 && document.getElementById(href.slice(1));
    if (!alvo) return;
    e.preventDefault();
    rolarAte(Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - 96));
    history.replaceState(null, '', href);
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    alvo.focus({ preventScroll: true });
  });
})();
