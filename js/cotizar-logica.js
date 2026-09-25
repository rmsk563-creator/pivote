/* Lógica pura de Cotizar (sin DOM): estado inicial, validación, textos del resumen.
   Mensajes exactos de CONTENT §7; reglas de HANDOFF §7.2 y §7.3. */
var CotizarLogica = (function () {
  'use strict';

  var CLAVE = 'pivote.cotizacion';

  var RUBROS = { cafeteria: 'Cafetería', tienda: 'Tienda', botica: 'Botica', salon: 'Salón o barbería', otro: 'Otro' };
  var SERVICIOS = { diagnostico: 'Diagnóstico', proyecto: 'Proyecto de diseño', obra: 'Diseño + obra', nose: 'Aún no lo sé' };
  var ESTADOS = { vacio: 'local vacío', funcionamiento: 'en funcionamiento', sinlocal: 'aún sin local' };
  var MALL = { no: 'a la calle', si: 'en centro comercial' };
  var CIERRES = { total: 'cierre total', noche: 'obra de noche', abierto: 'sigue abierto' };
  var PRESUPUESTOS = { hasta20: 'hasta S/ 20,000', '20a50': 'S/ 20,000 – 50,000', '50a100': 'S/ 50,000 – 100,000', mas100: 'más de S/ 100,000', nd: 'presupuesto sin indicar' };
  var PREFERENCIAS = { whatsapp: 'WhatsApp', llamada: 'Llamada', correo: 'Correo' };
  var MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  var DISTRITOS = ['Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Cercado de Lima', 'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas',
    'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho (Chosica)', 'Lurín',
    'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac',
    'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres',
    'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador',
    'Villa María del Triunfo', 'Callao', 'Otro'];

  var MENSAJES = {
    rubro: 'Elige el tipo de negocio para continuar.',
    servicio: 'Elige qué necesitas. “Aún no lo sé” también vale.',
    areaVacia: 'Indica el área aproximada en m².',
    areaPequena: 'El área parece muy pequeña. Revisa el número (en m²).',
    areaGrande: 'Para más de 1,000 m² preferimos conversarlo. Puedes seguir sin rango.',
    distrito: 'Elige el distrito: cambia traslados y trámites.',
    estado: 'Elige el estado del local para continuar.',
    resumenPaso2: 'Completa el área, el distrito y el estado del local para continuar.',
    plazoCorto: 'Es un plazo corto para diseño + obra. Te diremos qué es posible en la visita.',
    nombre: 'Escribe tu nombre.',
    telefono: 'Escribe un celular de 9 dígitos que empiece con 9.',
    correo: 'Revisa el correo: falta la @ o el dominio.',
    privacidad: 'Acepta la política de privacidad para revisar tu solicitud.'
  };

  function estadoInicial() {
    return {
      rubro: null, rubroOtro: '', servicio: null,
      area: '', distrito: '', estado: null, centroComercial: 'no', archivo: null,
      fecha: '', sinFecha: false, cierre: null, presupuesto: null,
      nombre: '', negocio: '', telefono: '', correo: '', preferencia: 'whatsapp', privacidad: false,
      enviado: false
    };
  }

  /* Área: admite coma o punto decimal */
  function numeroArea(texto) {
    if (texto === null || texto === undefined) return null;
    var t = String(texto).trim().replace(',', '.');
    if (!t || !/^\d+(\.\d+)?$/.test(t)) return null;
    return parseFloat(t);
  }
  function soloDigitos(t) { return String(t || '').replace(/\D/g, ''); }
  function mesActual(hoy) { hoy = hoy || new Date(); return hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0'); }
  function textoMes(aaaamm) {
    if (!aaaamm) return '';
    var p = aaaamm.split('-');
    return MESES[parseInt(p[1], 10) - 1] + ' ' + p[0];
  }

  /* Devuelve { errores: {campo: mensaje}, avisos: {campo: mensaje} } para un paso */
  function validar(paso, e, hoy) {
    var errores = {}, avisos = {};
    if (paso === 1) {
      if (!RUBROS[e.rubro]) errores.rubro = MENSAJES.rubro;
      if (!SERVICIOS[e.servicio]) errores.servicio = MENSAJES.servicio;
    }
    if (paso === 2) {
      var a = numeroArea(e.area);
      if (a === null) errores.area = MENSAJES.areaVacia;
      else if (a < 10) errores.area = MENSAJES.areaPequena;
      else if (a > 1000) avisos.area = MENSAJES.areaGrande;
      if (!e.distrito) errores.distrito = MENSAJES.distrito;
      if (!ESTADOS[e.estado]) errores.estado = MENSAJES.estado;
    }
    if (paso === 3) {
      if (e.fecha && !e.sinFecha) {
        var actual = mesActual(hoy);
        if (e.fecha < actual) errores.fecha = 'Esa fecha ya pasó. Elige un mes a partir de ' + textoMes(actual) + '.';
        else if (e.servicio === 'obra') {
          hoy = hoy || new Date();
          var p = e.fecha.split('-'), inicio = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, 1);
          if ((inicio - new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) / 86400000 < 56) avisos.fecha = MENSAJES.plazoCorto;
        }
      }
    }
    if (paso === 4) {
      if (!String(e.nombre || '').trim()) errores.nombre = MENSAJES.nombre;
      var d = soloDigitos(e.telefono);
      if (!/^9\d{8}$/.test(d)) errores.telefono = MENSAJES.telefono;
      var c = String(e.correo || '').trim();
      if ((c || e.preferencia === 'correo') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) errores.correo = MENSAJES.correo;
      if (!e.privacidad) errores.privacidad = MENSAJES.privacidad;
    }
    return { errores: errores, avisos: avisos };
  }

  function tituloResumenErrores(n) { return 'Revisa ' + n + (n === 1 ? ' campo' : ' campos') + ' antes de continuar'; }

  function telefonoLegible(t) { var d = soloDigitos(t); return d.length === 9 ? d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6) : String(t || ''); }
  function areaLegible(t) { var a = numeroArea(t); return a === null ? '' : (Math.round(a * 10) / 10).toString(); }
  function rubroLegible(e) { return e.rubro === 'otro' && String(e.rubroOtro || '').trim() ? 'Otro (' + String(e.rubroOtro).trim() + ')' : (RUBROS[e.rubro] || '—'); }

  /* Textos de las filas del resumen (formato del prototipo, HANDOFF §7.5) */
  function filasResumen(e) {
    return {
      rubroServicio: rubroLegible(e) + ' · ' + (SERVICIOS[e.servicio] || '—'),
      local: areaLegible(e.area) + ' m² · ' + (e.distrito || '—') + ' · ' + (ESTADOS[e.estado] || '—') + ' · ' + MALL[e.centroComercial === 'si' ? 'si' : 'no'],
      plazo: (e.sinFecha || !e.fecha ? 'Sin fecha' : textoMes(e.fecha)) + ' · ' + (CIERRES[e.cierre] || 'cierre por definir') + ' · ' + (PRESUPUESTOS[e.presupuesto] || 'presupuesto sin indicar'),
      contacto: String(e.nombre || '').trim() + ' · ' + telefonoLegible(e.telefono) + ' · ' + PREFERENCIAS[e.preferencia || 'whatsapp']
    };
  }
  /* Resumen corto de la confirmación (CONTENT §7.6) */
  function resumenCorto(e) {
    return rubroLegible(e) + ' · ' + areaLegible(e.area) + ' m² · ' + (e.distrito || '—') + ' · ' + (SERVICIOS[e.servicio] || '—');
  }
  /* Datos para el panel «Tu solicitud» */
  function panel(e) {
    var a = areaLegible(e.area);
    return {
      rubro: RUBROS[e.rubro] ? rubroLegible(e) : '—',
      servicio: SERVICIOS[e.servicio] || '—',
      local: a || e.distrito ? [a ? a + ' m²' : '', e.distrito].filter(Boolean).join(' · ') : '—'
    };
  }
  function entradaEstimador(e) {
    return { area: numeroArea(e.area), rubro: e.rubro, servicio: e.servicio, estado: e.estado, cierre: e.cierre, centroComercial: e.centroComercial };
  }

  return {
    CLAVE: CLAVE, RUBROS: RUBROS, SERVICIOS: SERVICIOS, DISTRITOS: DISTRITOS, MENSAJES: MENSAJES,
    estadoInicial: estadoInicial, numeroArea: numeroArea, validar: validar, tituloResumenErrores: tituloResumenErrores,
    filasResumen: filasResumen, resumenCorto: resumenCorto, panel: panel, textoMes: textoMes, mesActual: mesActual,
    entradaEstimador: entradaEstimador
  };
})();
