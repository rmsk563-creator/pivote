/* Filtro por rubro del índice de Proyectos (HANDOFF §6b). Lee y actualiza ?rubro= sin recargar. */
(function () {
  'use strict';
  var RUBROS = { todos: 'Todos', cafeteria: 'Cafeterías', tienda: 'Tiendas', botica: 'Boticas', salon: 'Salones' };
  function iniciar() {
    var chips = document.querySelectorAll('[data-filtro]');
    var casos = document.querySelectorAll('[data-casos] > [data-rubro]');
    var estado = document.querySelector('[data-filtro-estado]');
    if (!chips.length) return;
    function aplicar(rubro, anunciar) {
      if (!RUBROS[rubro]) rubro = 'todos';
      var visibles = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filtro') === rubro)); });
      casos.forEach(function (li) {
        var ver = rubro === 'todos' || li.getAttribute('data-rubro') === rubro;
        li.hidden = !ver;
        if (ver) visibles++;
      });
      var url = new URL(window.location.href);
      if (rubro === 'todos') url.searchParams.delete('rubro'); else url.searchParams.set('rubro', rubro);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      if (anunciar && estado) estado.textContent = RUBROS[rubro] + ': ' + visibles + (visibles === 1 ? ' caso' : ' casos');
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { aplicar(c.getAttribute('data-filtro'), true); });
    });
    aplicar(new URLSearchParams(window.location.search).get('rubro') || 'todos', false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else window.setTimeout(iniciar, 0);
})();
