/* Estimador del rango orientativo (HANDOFF §7.4 · CONTENT §8, fórmula congelada).
   Función pura, sin DOM. Entrada: { area, rubro, servicio, estado, cierre, centroComercial }.
   Salida: { tipo, min, max, cifra, explica, minParaAviso }. */
var Estimador = (function () {
  'use strict';

  var RUBRO = { tienda: 1.00, botica: 1.10, otro: 1.10, salon: 1.15, cafeteria: 1.30 };
  var ESTADO = { funcionamiento: 1.00, vacio: 1.10 };
  var CIERRE = { total: 1.00, noche: 1.12, abierto: 1.20 };      // sin respuesta = 1.00
  var MALL = { no: 1.00, si: 1.08 };
  var TOPE = { hasta20: 20000, '20a50': 50000, '50a100': 100000 }; // «más de 100,000» y «nd» no avisan

  var TXT_RUBRO = { cafeteria: 'cafetería', tienda: 'tienda', botica: 'botica', salon: 'salón o barbería', otro: 'otro rubro' };
  var TXT_ESTADO = { vacio: 'local vacío', funcionamiento: 'en funcionamiento' };
  var TXT_CIERRE = { total: 'cierre total', noche: 'obra de noche', abierto: 'local abierto durante la obra' };
  var REFERENCIA = 'Es una referencia, no un presupuesto: el monto final sale de la visita y del proyecto.';

  /* Redondeo al más cercano: a 100 por debajo de 10,000; a 500 hasta 20,000; a 1,000 por encima */
  function redondear(x) {
    if (x < 10000) return Math.round(x / 100) * 100;
    if (x <= 20000) return Math.round(x / 500) * 500;
    return Math.round(x / 1000) * 1000;
  }
  /* Coma de miles fija; no se usa toLocaleString porque depende del navegador */
  function miles(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function formatoRango(min, max) { return 'S/ ' + miles(min) + ' – ' + miles(max); }
  function formatoArea(a) { return (Math.round(a * 10) / 10).toString(); }

  function diagnostico(A) {
    return { min: redondear(Math.max(900, A * 20)), max: redondear(Math.max(1300, A * 28)) };
  }
  function proyecto(A, r) {
    return { min: Math.max(3500, A * 70 * r), max: Math.max(5000, A * 110 * r) };
  }
  function disenoMasObra(A, r, e, c, m) {
    var d = proyecto(A, r), f = r * e * c * m;
    return { min: redondear(d.min + A * 950 * f), max: redondear(d.max + A * 1450 * f) };
  }

  function estimar(entrada) {
    var s = entrada.servicio;
    var rubro = RUBRO[entrada.rubro] ? entrada.rubro : 'otro';
    var r = RUBRO[rubro];
    var conObra = s === 'obra' || s === 'nose';

    // Aún no tengo local (con obra): referencia por m², sin área
    if (entrada.estado === 'sinlocal' && conObra) {
      var a = Math.round(1020 * r / 10) * 10, b = Math.round(1560 * r / 10) * 10;
      return {
        tipo: 'm2', min: 0, max: 0, minParaAviso: 0,
        cifra: 'S/ ' + miles(a) + ' – ' + miles(b) + ' por m²',
        explica: 'Mientras eliges local, como referencia: diseño + obra para ' + TXT_RUBRO[rubro] + ' suele estar entre S/ ' + miles(a) + ' y S/ ' + miles(b) + ' por m². Con el área del local te damos un rango.'
      };
    }

    var A = typeof entrada.area === 'number' && isFinite(entrada.area) ? entrada.area : null;
    if (A === null || A < 10) {
      return { tipo: 'sin-area', min: 0, max: 0, minParaAviso: 0, cifra: null, explica: 'Para calcular un rango necesitamos el área aproximada.' };
    }
    if (A > 1000) {
      return { tipo: 'area-grande', min: 0, max: 0, minParaAviso: 0, cifra: null, explica: 'Para más de 1,000 m² preferimos conversarlo.' };
    }

    var At = formatoArea(A);
    if (s === 'diagnostico') {
      var dg = diagnostico(A);
      return { tipo: 'rango', min: dg.min, max: dg.max, minParaAviso: dg.min, cifra: formatoRango(dg.min, dg.max),
        explica: 'Calculado con ' + At + ' m² × diagnóstico. Si después contratas el proyecto, descontamos el diagnóstico.' };
    }
    if (s === 'proyecto') {
      var p = proyecto(A, r), pmin = redondear(p.min), pmax = redondear(p.max);
      return { tipo: 'rango', min: pmin, max: pmax, minParaAviso: pmin, cifra: formatoRango(pmin, pmax),
        explica: 'Calculado con ' + At + ' m² × proyecto de diseño × ' + TXT_RUBRO[rubro] + '. ' + REFERENCIA };
    }

    // Diseño + obra, o «Aún no lo sé» (la cifra es la de diseño + obra)
    var estado = ESTADO[entrada.estado] ? entrada.estado : 'funcionamiento';
    var c = CIERRE[entrada.cierre] || 1.00;
    var enMall = entrada.centroComercial === 'si';
    var o = disenoMasObra(A, r, ESTADO[estado], c, enMall ? MALL.si : MALL.no);
    var cifra = formatoRango(o.min, o.max);
    if (s === 'nose') {
      var pp = proyecto(A, r);
      return { tipo: 'rango', min: o.min, max: o.max, minParaAviso: o.min, cifra: cifra,
        explica: 'Si incluye la obra: el rango de arriba. Si solo es el proyecto de diseño: ' + formatoRango(redondear(pp.min), redondear(pp.max)) + '. ' + REFERENCIA };
    }
    return { tipo: 'rango', min: o.min, max: o.max, minParaAviso: o.min, cifra: cifra,
      explica: 'Calculado con ' + At + ' m² × diseño + obra × ' + TXT_RUBRO[rubro] + ' × ' + TXT_ESTADO[estado] + ' × ' +
        (TXT_CIERRE[entrada.cierre] || 'cierre por definir') + (enMall ? ' × centro comercial' : '') + '. ' + REFERENCIA +
        ' No incluye equipos' + (rubro === 'cafeteria' ? ' de cocina' : '') + ' ni mercadería.' };
  }

  function avisoPresupuesto(presupuesto, minParaAviso) {
    var tope = TOPE[presupuesto];
    return !!(tope && minParaAviso > 0 && tope < minParaAviso);
  }

  return { estimar: estimar, redondear: redondear, formatoRango: formatoRango, avisoPresupuesto: avisoPresupuesto };
})();
