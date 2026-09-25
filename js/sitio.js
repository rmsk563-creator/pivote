/* Comportamiento común a todas las páginas: cabecera fija, menú móvil, aviso de contacto,
   enlace de autoría y aparición al hacer scroll (MOVIMIENTO.md). Sin dependencias. */
(function () {
  'use strict';

  var reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cabecera: Arriba → Desplazada con un centinela y IntersectionObserver (MOVIMIENTO §3) */
  function iniciarCabecera() {
    var cabecera = document.querySelector('[data-cabecera]');
    if (!cabecera) return;
    var centinela = document.querySelector('[data-centinela]');
    if (!centinela) {
      centinela = document.createElement('div');
      centinela.setAttribute('data-centinela', '');
      centinela.setAttribute('aria-hidden', 'true');
      centinela.style.cssText = 'position:absolute;top:8px;left:0;width:1px;height:1px;pointer-events:none;';
      document.body.appendChild(centinela);
    }
    function fijar(desplazada) { cabecera.setAttribute('data-scroll', desplazada ? 'desplazada' : 'arriba'); }
    if (!('IntersectionObserver' in window)) { fijar(false); return; }
    new IntersectionObserver(function (entradas) {
      var e = entradas[0];
      fijar(!e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(centinela);
  }

  /* Menú móvil (<dialog>): foco atrapado y Esc los da el navegador */
  function iniciarMenu() {
    var menu = document.getElementById('menu-movil');
    var abrir = document.querySelector('[data-abrir-menu]');
    if (!menu || !abrir || typeof menu.showModal !== 'function') return;
    abrir.addEventListener('click', function () {
      menu.showModal();
      abrir.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('close', function () { abrir.setAttribute('aria-expanded', 'false'); });
    menu.querySelectorAll('[data-cerrar-menu]').forEach(function (b) {
      b.addEventListener('click', function () { menu.close(); });
    });
    menu.addEventListener('click', function (ev) { if (ev.target === menu) menu.close(); });
  }

  /* Contacto en modo concepto (D-023): muestra el aviso y no envía nada */
  var temporizadorAviso = null;
  function mostrarAviso() {
    var aviso = document.querySelector('[data-aviso-contacto]');
    if (!aviso) return;
    var texto = aviso.querySelector('[data-aviso-texto]');
    aviso.hidden = false;
    // Se vuelve a escribir el texto para que el lector de pantalla lo anuncie cada vez
    var original = texto.getAttribute('data-texto');
    texto.textContent = '';
    window.setTimeout(function () { texto.textContent = original; }, 30);
    window.clearTimeout(temporizadorAviso);
    temporizadorAviso = window.setTimeout(ocultarAviso, 6000);
  }
  function ocultarAviso() {
    var aviso = document.querySelector('[data-aviso-contacto]');
    if (aviso) aviso.hidden = true;
    window.clearTimeout(temporizadorAviso);
  }
  function destinoContacto(canal) {
    var c = window.CONFIG && CONFIG.contacto;
    if (!c || !c.activo) return null;
    if (canal === 'whatsapp' && c.whatsapp) return 'https://wa.me/' + c.whatsapp;
    if (canal === 'correo' && c.correo) return 'mailto:' + c.correo;
    if (canal === 'instagram' && c.instagram) return c.instagram;
    return null;
  }
  function iniciarContacto() {
    document.querySelectorAll('[data-contacto]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var url = destinoContacto(boton.getAttribute('data-contacto'));
        if (url) { window.open(url, '_blank', 'noopener'); return; }
        mostrarAviso();
      });
    });
    var cerrar = document.querySelector('[data-cerrar-aviso]');
    if (cerrar) cerrar.addEventListener('click', ocultarAviso);
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') ocultarAviso(); });
  }

  /* Autoría (D-038): el enlace solo aparece si CONFIG.autor.url tiene valor */
  function iniciarAutor() {
    var url = window.CONFIG && CONFIG.autor && CONFIG.autor.url;
    document.querySelectorAll('[data-autor-enlace]').forEach(function (a) {
      if (url) { a.href = url; a.hidden = false; } else { a.hidden = true; }
    });
  }

  /* Aparición al hacer scroll: una vez, nunca en el hero ni en formularios */
  function iniciarAparicion() {
    var grupos = document.querySelectorAll('[data-aparece]');
    if (!grupos.length || reducirMovimiento || !('IntersectionObserver' in window)) return;
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    grupos.forEach(function (g) {
      var hijos = g.hasAttribute('data-aparece-lista') ? Array.prototype.slice.call(g.children) : [g];
      hijos.forEach(function (h, i) {
        // Solo aparece lo que todavía está por debajo del viewport
        if (h.getBoundingClientRect().top < window.innerHeight) return;
        h.classList.add('aparece');
        if (g.hasAttribute('data-aparece-lista')) h.style.transitionDelay = Math.min(i, 2) * 60 + 'ms';
        observador.observe(h);
      });
    });
  }

  function iniciar() {
    iniciarCabecera();
    iniciarMenu();
    iniciarContacto();
    iniciarAutor();
    iniciarAparicion();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else window.setTimeout(iniciar, 0);
})();
