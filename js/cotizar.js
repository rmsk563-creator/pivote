/* Cotizar: vistas por hash, estado en sessionStorage, validación, resumen y envío simulado
   (HANDOFF §7). La lógica pura vive en cotizar-logica.js y el rango en estimador.js. */
(function () {
  'use strict';
  var L = window.CotizarLogica, E = window.Estimador;
  var form = document.querySelector('[data-cotizar]');
  if (!form || !L || !E) return;

  var VISTAS = ['paso-1', 'paso-2', 'paso-3', 'paso-4', 'resumen', 'confirmacion'];
  var NOMBRES = { 'paso-1': 'Paso 1 de 4 · Rubro', 'paso-2': 'Paso 2 de 4 · Tu local', 'paso-3': 'Paso 3 de 4 · Plazo y presupuesto', 'paso-4': 'Paso 4 de 4 · Contacto', resumen: 'Revisa tu solicitud', confirmacion: 'Solicitud preparada correctamente' };
  var TITULO_BASE = 'Cotiza tu local — Pivote';
  var ETIQUETAS = { rubro: '¿Qué tipo de negocio es?', servicio: '¿Qué necesitas?', area: 'Área aproximada', distrito: 'Distrito', estado: 'Estado del local', fecha: '¿Cuándo quieres abrir?', nombre: 'Tu nombre', telefono: 'WhatsApp o teléfono', correo: 'Correo', privacidad: 'Política de privacidad' };
  var estado, vistaActual = null, intentado = {}, enviando = false;

  /* ---------- Estado ---------- */
  function guardar() { try { sessionStorage.setItem(L.CLAVE, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento: sigue en memoria */ } }
  function cargar() {
    try { var s = sessionStorage.getItem(L.CLAVE); if (s) return Object.assign(L.estadoInicial(), JSON.parse(s)); } catch (e) {}
    return L.estadoInicial();
  }
  function borrar() { estado = L.estadoInicial(); intentado = {}; try { sessionStorage.removeItem(L.CLAVE); } catch (e) {} }
  function hayDatos() {
    var i = L.estadoInicial();
    return Object.keys(i).some(function (k) { return k !== 'enviado' && JSON.stringify(estado[k]) !== JSON.stringify(i[k]); });
  }

  /* Parámetros de entrada: ?nueva, ?servicio=…, ?rubro=… (siempre empiezan de cero) */
  function leerParametros() {
    var q = new URLSearchParams(location.search);
    if (!q.has('nueva') && !q.has('servicio') && !q.has('rubro')) return false;
    borrar();
    if (L.SERVICIOS[q.get('servicio')]) estado.servicio = q.get('servicio');
    if (L.RUBROS[q.get('rubro')]) estado.rubro = q.get('rubro');
    guardar();
    history.replaceState(null, '', location.pathname + '#paso-1');
    return true;
  }

  /* ---------- Formulario ⇄ estado ---------- */
  function campo(nombre) { return form.elements[nombre]; }
  function pintarFormulario() {
    ['rubro', 'servicio', 'estado', 'centroComercial', 'cierre', 'presupuesto', 'preferencia'].forEach(function (n) {
      form.querySelectorAll('input[name="' + n + '"]').forEach(function (r) { r.checked = r.value === estado[n]; });
    });
    ['rubroOtro', 'area', 'distrito', 'fecha', 'nombre', 'negocio', 'telefono', 'correo'].forEach(function (n) { if (campo(n)) campo(n).value = estado[n] || ''; });
    campo('sinFecha').checked = !!estado.sinFecha;
    campo('privacidad').checked = !!estado.privacidad;
    marcarSelectVacio();
    mostrarOtroRubro();
    pintarArchivo();
  }
  function leerCampo(el) {
    var n = el.name;
    if (!n || n === 'archivo') return;
    if (el.type === 'radio') { if (el.checked) estado[n] = el.value; }
    else if (el.type === 'checkbox') estado[n] = el.checked;
    else estado[n] = el.value;
    if (n === 'sinFecha' && el.checked) { estado.fecha = ''; campo('fecha').value = ''; }
    if (n === 'fecha' && el.value) { estado.sinFecha = false; campo('sinFecha').checked = false; }
    if (n === 'rubro') mostrarOtroRubro();
    if (n === 'distrito') marcarSelectVacio();
    guardar();
    pintarPanel();
  }
  function marcarSelectVacio() { campo('distrito').classList.toggle('vacio', !campo('distrito').value); }
  function mostrarOtroRubro() { form.querySelector('[data-otro-rubro]').hidden = estado.rubro !== 'otro'; }

  /* ---------- Carga de archivo (solo el nombre, no se lee ni se guarda) ---------- */
  var zona = form.querySelector('[data-carga-zona]');
  function pintarArchivo() {
    var hay = !!estado.archivo;
    form.querySelector('[data-carga-archivo]').hidden = !hay;
    zona.hidden = hay;
    form.querySelector('[data-carga-nombre]').textContent = hay ? estado.archivo + ' · se adjuntaría a tu solicitud' : '';
  }
  campo('archivo').addEventListener('change', function () {
    var f = this.files && this.files[0];
    estado.archivo = f ? f.name : null; this.value = '';
    guardar(); pintarArchivo();
    if (f) form.querySelector('[data-carga-quitar]').focus();
  });
  form.querySelector('[data-carga-quitar]').addEventListener('click', function () {
    estado.archivo = null; guardar(); pintarArchivo(); campo('archivo').focus();
  });
  ['dragenter', 'dragover'].forEach(function (t) { zona.addEventListener(t, function () { zona.classList.add('arrastrando'); }); });
  ['dragleave', 'drop'].forEach(function (t) { zona.addEventListener(t, function () { zona.classList.remove('arrastrando'); }); });

  /* ---------- Panel «Tu solicitud» y resumen plegable ---------- */
  function pintarPanel() {
    var p = L.panel(estado);
    ['rubro', 'servicio', 'local'].forEach(function (k) { form.querySelector('[data-panel="' + k + '"]').textContent = p[k]; });
    form.querySelector('[data-plegable-rubro]').textContent = p.rubro;
  }
  var plegable = form.querySelector('[data-plegable]'), panelEl = form.querySelector('#panel-solicitud');
  plegable.addEventListener('click', function () {
    var abierto = plegable.getAttribute('aria-expanded') !== 'true';
    plegable.setAttribute('aria-expanded', String(abierto));
    panelEl.classList.toggle('abierto', abierto);
  });

  /* ---------- Errores ---------- */
  function vistaDePaso(n) { return form.querySelector('[data-vista="paso-' + n + '"]'); }
  function fijarError(nombre, mensaje) {
    var err = form.querySelector('#error-' + nombre);
    if (err) { err.hidden = !mensaje; err.querySelector('span').textContent = mensaje || ''; }
    var cont = form.querySelector('[data-campo="' + nombre + '"]');
    if (cont) cont.classList.toggle('campo--error', !!mensaje);
    var grupo = form.querySelector('[data-grupo="' + nombre + '"]');
    if (grupo) grupo.classList.toggle('grupo--error', !!mensaje);
    form.querySelectorAll('[name="' + nombre + '"]').forEach(function (el) { if (mensaje) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); });
    var casilla = form.querySelector('[data-casilla]');
    if (nombre === 'privacidad' && casilla) casilla.classList.toggle('casilla--error', !!mensaje);
  }
  function fijarAviso(nombre, mensaje) {
    var av = form.querySelector('#aviso-' + nombre);
    if (av) { av.hidden = !mensaje; av.textContent = mensaje || ''; }
  }
  function pintarValidacion(n, mostrarResumen) {
    var v = L.validar(n, estado);
    var campos = { 1: ['rubro', 'servicio'], 2: ['area', 'distrito', 'estado'], 3: ['fecha'], 4: ['nombre', 'telefono', 'correo', 'privacidad'] }[n];
    campos.forEach(function (c) { fijarError(c, v.errores[c]); });
    ['area', 'fecha'].forEach(function (c) { if (campos.indexOf(c) >= 0) fijarAviso(c, v.errores[c] ? null : v.avisos[c]); });
    var resumen = vistaDePaso(n).querySelector('[data-resumen-errores]');
    var claves = Object.keys(v.errores);
    if (!claves.length) { resumen.hidden = true; return v; }
    if (mostrarResumen || !resumen.hidden) {
      resumen.querySelector('[data-titulo]').textContent = L.tituloResumenErrores(claves.length);
      var texto = resumen.querySelector('[data-texto]');
      texto.hidden = n !== 2; texto.textContent = n === 2 ? L.MENSAJES.resumenPaso2 : '';
      var ul = resumen.querySelector('ul'); ul.innerHTML = '';
      claves.forEach(function (c) {
        var li = document.createElement('li'), a = document.createElement('a');
        a.href = '#campo-' + c; a.textContent = ETIQUETAS[c];
        a.addEventListener('click', function (ev) { ev.preventDefault(); var d = form.querySelector('#campo-' + c); if (d) d.focus(); });
        li.appendChild(a); ul.appendChild(li);
      });
      resumen.hidden = false;
    }
    return v;
  }

  /* ---------- Resumen y confirmación ---------- */
  function pintarResumen() {
    var f = L.filasResumen(estado);
    Object.keys(f).forEach(function (k) { form.querySelector('[data-fila="' + k + '"]').textContent = f[k]; });
    var r = E.estimar(L.entradaEstimador(estado));
    form.querySelector('[data-rango-cifra]').textContent = r.cifra || 'S/ —';
    form.querySelector('[data-rango-explica]').textContent = r.explica;
    form.querySelector('[data-aviso-presupuesto]').hidden = !E.avisoPresupuesto(estado.presupuesto, r.minParaAviso);
  }
  function pintarConfirmacion() {
    var r = E.estimar(L.entradaEstimador(estado));
    form.querySelector('[data-resumen-corto]').textContent = L.resumenCorto(estado);
    form.querySelector('[data-confirmacion-rango]').textContent = r.cifra || '—';
  }

  /* ---------- Vistas ---------- */
  function primerPasoIncompleto() {
    for (var n = 1; n <= 4; n++) if (Object.keys(L.validar(n, estado).errores).length) return n;
    return null;
  }
  function vistaPermitida(v) {
    if (v === 'confirmacion') return estado.enviado ? v : (primerPasoIncompleto() ? 'paso-' + primerPasoIncompleto() : 'resumen');
    if (estado.enviado) return 'confirmacion';
    var objetivo = v === 'resumen' ? 5 : parseInt(v.split('-')[1], 10);
    for (var n = 1; n < objetivo; n++) if (Object.keys(L.validar(n, estado).errores).length) return 'paso-' + n;
    return v;
  }
  function mostrar(v, conFoco) {
    var permitida = vistaPermitida(v);
    if (permitida !== v) { history.replaceState(null, '', '#' + permitida); v = permitida; }
    VISTAS.forEach(function (id) { form.querySelector('[data-vista="' + id + '"]').hidden = id !== v; });
    var enPasos = v.indexOf('paso-') === 0;
    form.querySelector('[data-panel-zona]').hidden = !enPasos;
    form.querySelector('[data-rejilla]').classList.toggle('cotizar__rejilla--sin-panel', !enPasos);
    document.querySelector('[data-accion="salir"]').hidden = v === 'confirmacion';
    if (v === 'resumen') pintarResumen();
    if (v === 'confirmacion') pintarConfirmacion();
    if (enPasos) { var n = parseInt(v.split('-')[1], 10); if (intentado[n]) pintarValidacion(n, false); }
    document.title = NOMBRES[v] + ' — ' + TITULO_BASE;
    var cambio = vistaActual !== null && vistaActual !== v;
    vistaActual = v;
    if (cambio || conFoco) {
      window.scrollTo(0, 0);
      var h1 = form.querySelector('#h-' + v); if (h1) h1.focus({ preventScroll: true });
      var anuncio = form.querySelector('[data-anuncio]'); anuncio.textContent = ''; setTimeout(function () { anuncio.textContent = NOMBRES[v]; }, 50);
    }
  }
  function ir(v) { if (location.hash === '#' + v) mostrar(v, true); else location.hash = v; }
  window.addEventListener('hashchange', function () {
    var v = location.hash.slice(1);
    mostrar(VISTAS.indexOf(v) >= 0 ? v : 'paso-1');
  });

  /* ---------- Acciones ---------- */
  function continuar(n) {
    intentado[n] = true;
    var v = pintarValidacion(n, true);
    if (Object.keys(v.errores).length) {
      var resumen = vistaDePaso(n).querySelector('[data-resumen-errores]');
      resumen.scrollIntoView({ block: 'center' }); resumen.focus({ preventScroll: true });
      return;
    }
    ir(n < 4 ? 'paso-' + (n + 1) : 'resumen');
  }
  function enviar(boton) {
    if (enviando) return;
    enviando = true;
    boton.disabled = true; boton.setAttribute('aria-busy', 'true');
    boton.querySelector('[data-etiqueta-enviar]').textContent = 'Enviando…';
    setTimeout(function () {
      estado.enviado = true; guardar();
      enviando = false; boton.disabled = false; boton.removeAttribute('aria-busy');
      boton.querySelector('[data-etiqueta-enviar]').textContent = 'Enviar solicitud';
      ir('confirmacion');
    }, 1000);
  }
  var dialogo = document.getElementById('dialogo-salir');
  function salirAlInicio() { borrar(); location.href = 'index.html'; }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-accion]');
    if (!b) return;
    var a = b.getAttribute('data-accion');
    if (a === 'continuar' || a === 'revisar') { ev.preventDefault(); continuar(parseInt(vistaActual.split('-')[1], 10)); }
    else if (a === 'enviar') { ev.preventDefault(); enviar(b); }
    else if (a === 'inicio') salirAlInicio();
    else if (a === 'nueva') { borrar(); pintarFormulario(); pintarPanel(); guardar(); ir('paso-1'); }
    else if (a === 'salir') {
      if (!hayDatos() || typeof dialogo.showModal !== 'function') { salirAlInicio(); return; }
      dialogo.showModal();
    }
  });
  if (dialogo) {
    dialogo.querySelectorAll('[data-dialogo-cerrar]').forEach(function (b) { b.addEventListener('click', function () { dialogo.close(); }); });
    dialogo.querySelector('[data-salir-confirmar]').addEventListener('click', salirAlInicio);
    dialogo.addEventListener('click', function (ev) { if (ev.target === dialogo) dialogo.close(); });
  }
  var como = form.querySelector('[data-como]');
  como.addEventListener('click', function () {
    var abierto = como.getAttribute('aria-expanded') !== 'true';
    como.setAttribute('aria-expanded', String(abierto));
    form.querySelector('#como-calculamos').hidden = !abierto;
  });

  form.addEventListener('input', function (ev) { leerCampo(ev.target); });
  form.addEventListener('change', function (ev) {
    leerCampo(ev.target);
    var n = vistaActual && vistaActual.indexOf('paso-') === 0 ? parseInt(vistaActual.split('-')[1], 10) : null;
    if (n && intentado[n]) pintarValidacion(n, false);
  });
  form.addEventListener('focusout', function (ev) {
    var n = vistaActual && vistaActual.indexOf('paso-') === 0 ? parseInt(vistaActual.split('-')[1], 10) : null;
    if (n && intentado[n] && ev.target.name) pintarValidacion(n, false);
  });
  form.addEventListener('submit', function (ev) { ev.preventDefault(); });
  // Enter en un campo de texto equivale a «Continuar»
  form.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ['text', 'tel', 'email', 'month'].indexOf(ev.target.type) >= 0) {
      ev.preventDefault();
      if (vistaActual && vistaActual.indexOf('paso-') === 0) continuar(parseInt(vistaActual.split('-')[1], 10));
    }
  });

  /* ---------- Inicio ---------- */
  estado = cargar();
  leerParametros();
  campo('fecha').min = L.mesActual();
  pintarFormulario();
  pintarPanel();
  var inicial = location.hash.slice(1);
  mostrar(VISTAS.indexOf(inicial) >= 0 ? inicial : 'paso-1');
  if (!location.hash) history.replaceState(null, '', '#' + vistaActual);
})();
