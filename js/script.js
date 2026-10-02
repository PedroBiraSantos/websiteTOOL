/* TOOL · Fã-clube: validação do formulário de inscrição e máscaras de entrada.
   Nada é enviado nem armazenado: quando tudo é válido, mostra uma mensagem de sucesso. */
(function () {
  'use strict';

  var form = document.getElementById('form-inscricao');
  if (!form) return;

  var sucesso = document.getElementById('form-sucesso');
  var SENHA_MINIMA = 8;

  /* ---------- Máscaras ---------- */

  // Reaplica a máscara mantendo o cursor depois do mesmo número de dígitos.
  function aplicarMascara(campo, formatar) {
    var cursor = campo.selectionStart;
    var digitosAntes = campo.value.slice(0, cursor).replace(/\D/g, '').length;
    var formatado = formatar(campo.value.replace(/\D/g, ''));
    campo.value = formatado;

    var pos = 0, contados = 0;
    while (pos < formatado.length && contados < digitosAntes) {
      if (/\d/.test(formatado[pos])) contados++;
      pos++;
    }
    if (document.activeElement === campo) campo.setSelectionRange(pos, pos);
  }

  // DD/MM/AAAA: as barras entram assim que há dígitos depois delas
  function formatarData(d) {
    d = d.slice(0, 8);
    if (d.length <= 2) return d;
    if (d.length <= 4) return d.slice(0, 2) + '/' + d.slice(2);
    return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
  }

  // (DD) 9XXXX-XXXX para celular (11 dígitos) ou (DD) XXXX-XXXX para fixo (10 dígitos)
  function formatarTelefone(d) {
    d = d.slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2) return '(' + d;
    var ddd = '(' + d.slice(0, 2) + ') ';
    var resto = d.slice(2);
    if (resto.length <= 4) return ddd + resto;
    if (d.length <= 10) return ddd + resto.slice(0, 4) + '-' + resto.slice(4);
    return ddd + resto.slice(0, 5) + '-' + resto.slice(5);
  }

  var campoData = form.elements.nascimento;
  var campoTelefone = form.elements.telefone;
  campoData.addEventListener('input', function () { aplicarMascara(campoData, formatarData); });
  campoTelefone.addEventListener('input', function () { aplicarMascara(campoTelefone, formatarTelefone); });

  /* ---------- Regras de validação ---------- */

  function dataValida(texto) {
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
    if (!m) return 'Informe a data completa no formato DD/MM/AAAA.';
    var dia = +m[1], mes = +m[2], ano = +m[3];
    var data = new Date(ano, mes - 1, dia);
    if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
      return 'Essa data não existe. Confira o dia e o mês.';
    }
    var hoje = new Date();
    if (data > hoje) return 'A data de nascimento não pode estar no futuro.';
    if (ano < 1900) return 'Informe um ano a partir de 1900.';
    return '';
  }

  var regras = {
    nome: function (v) {
      return v.trim() ? '' : 'Informe seu nome completo.';
    },
    email: function (v) {
      if (!v.trim()) return 'Informe seu e-mail.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.';
    },
    nascimento: function (v) {
      if (!v.trim()) return 'Informe sua data de nascimento.';
      return dataValida(v.trim());
    },
    telefone: function (v) {
      var d = v.replace(/\D/g, '');
      if (!d) return 'Informe seu telefone.';
      return d.length >= 10 ? '' : 'Informe o telefone com DDD, com 10 ou 11 dígitos.';
    },
    senha: function (v) {
      if (!v) return 'Crie uma senha.';
      return v.length >= SENHA_MINIMA ? '' : 'A senha precisa ter pelo menos ' + SENHA_MINIMA + ' caracteres.';
    },
    confirmacao: function (v) {
      if (!v) return 'Repita a senha para confirmar.';
      return v === form.elements.senha.value ? '' : 'As senhas não coincidem.';
    },
    termos: function (_, campo) {
      return campo.checked ? '' : 'Você precisa aceitar os termos de inscrição.';
    }
  };

  /* ---------- Exibição de erros ---------- */

  function validarCampo(nome) {
    var campo = form.elements[nome];
    var mensagem = regras[nome](campo.value, campo);
    var bloco = campo.closest('.campo');
    var erro = document.getElementById('erro-' + nome);

    erro.textContent = mensagem;
    bloco.classList.toggle('campo--erro', !!mensagem);
    if (mensagem) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
    return !mensagem;
  }

  // Depois da primeira tentativa de envio, cada campo é revalidado enquanto o usuário corrige.
  var tentouEnviar = false;
  Object.keys(regras).forEach(function (nome) {
    var campo = form.elements[nome];
    var evento = campo.type === 'checkbox' ? 'change' : 'input';
    campo.addEventListener(evento, function () {
      if (tentouEnviar || campo.closest('.campo').classList.contains('campo--erro')) validarCampo(nome);
      if (nome === 'senha' && form.elements.confirmacao.value) validarCampo('confirmacao');
    });
    campo.addEventListener('blur', function () {
      // checkbox sempre tem value "on": só conta depois de uma tentativa de envio
      var preenchido = campo.type === 'checkbox' ? false : !!campo.value;
      if (preenchido || tentouEnviar) validarCampo(nome);
    });
  });

  /* ---------- Envio ---------- */

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // nunca envia de verdade
    tentouEnviar = true;
    sucesso.hidden = true;

    var primeiroInvalido = null;
    Object.keys(regras).forEach(function (nome) {
      if (!validarCampo(nome) && !primeiroInvalido) primeiroInvalido = form.elements[nome];
    });

    if (primeiroInvalido) {
      primeiroInvalido.focus();
      return;
    }

    form.reset();
    tentouEnviar = false;
    form.querySelectorAll('.campo--erro').forEach(function (b) { b.classList.remove('campo--erro'); });
    form.querySelectorAll('.campo__erro').forEach(function (p) { p.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
    sucesso.hidden = false;
    sucesso.focus();
  });
})();
