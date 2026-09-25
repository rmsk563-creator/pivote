// Bugfix FAQ (v1.0.2): Chrome por CDP en tiempo real, sin iframe, con clics y teclas reales.
// Por página × ancho: abre todas / abre-cierra-reabre una a una / resize con respuestas abiertas /
// teclado (Enter y Espacio) / zoom 200 % / prefers-reduced-motion. En cada respuesta abierta comprueba:
// texto completo dentro del <details>, primera y última línea visibles, la pregunta siguiente empieza
// después, sin scroll interno, signo + / − centrado con la pregunta y altura final = altura natural.
// Uso: node _qa/acordeones-cdp.mjs   (URL=… para otro origen; por defecto el servidor local 8123)
import { spawn } from 'node:child_process';
const B = process.env.URL || 'http://127.0.0.1:8123/';
const ANCHOS = (process.env.ANCHOS || '1440 1280 1024 834 768 390 360 320').split(' ').map(Number);
const PAGINAS = ['index.html', 'como-trabajamos.html'];
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + (process.env.PUERTO || 9336), '--user-data-dir=/tmp/pv-cdp-' + (process.env.PUERTO || 9336), 'about:blank'], { stdio: 'ignore' });
const espera = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 50 && !ws; i++) { try { const p = (await (await fetch('http://127.0.0.1:' + (process.env.PUERTO || 9336) + '/json')).json()).find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch { await espera(200); } }
await new Promise(r => ws.onopen = r); let id = 0; const pend = {};
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d); };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await cdp('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
const tamaño = (w, escala = 1) => cdp('Emulation.setDeviceMetricsOverride', { width: Math.round(w / escala), height: 900, deviceScaleFactor: escala, mobile: w < 600 });
async function clic(i) {
  const r = await ev(`(() => { const s = document.querySelectorAll('.acordeon summary')[${i}]; s.scrollIntoView({ block: 'center', behavior: 'instant' });
    const b = s.getBoundingClientRect(); return { x: b.left + 20, y: b.top + b.height / 2 }; })()`);
  await espera(60);
  for (const type of ['mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: r.x, y: r.y, button: 'left', clickCount: 1 });
}
async function tecla(i, key) {
  await ev(`document.querySelectorAll('.acordeon summary')[${i}].focus()`);
  const code = key === ' ' ? 'Space' : 'Enter', kc = key === ' ' ? 32 : 13;
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: kc, text: key === ' ' ? ' ' : '\r' });
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: kc });
}
const MEDIR = `(() => {
  document.documentElement.style.scrollBehavior = 'auto'; const out = [];
  document.querySelectorAll('.acordeon[open]').forEach((a, i) => {
    a.scrollIntoView({ block: 'center', behavior: 'instant' });
    const s = a.querySelector('summary'), p = a.querySelector('.acordeon__respuesta'), sg = a.querySelector('.acordeon__signo');
    const ra = a.getBoundingClientRect(), rs = s.getBoundingClientRect(), g = document.createRange(); g.selectNodeContents(p);
    const L = g.getClientRects(), l0 = L[0], lN = L[L.length - 1], x = l0.left + 4, pb = [];
    if (lN.bottom > ra.bottom + 0.5) pb.push('texto fuera del acordeón ' + Math.round(lN.bottom - ra.bottom) + 'px');
    // Cada línea, completa: se comprueba 2 px por dentro de su borde superior y del inferior (un recorte de 10 px no pasa)
    const cortadas = [...L].filter(l => l.width > 4).filter(l => [l.top + 2, l.bottom - 2].some(y => !p.contains(document.elementFromPoint(l.left + 2, y)))).length;
    if (cortadas) pb.push(cortadas + ' línea(s) recortada(s)');
    const sig = a.nextElementSibling; if (sig && sig.classList.contains('acordeon') && sig.getBoundingClientRect().top < lN.bottom) pb.push('la siguiente pregunta se solapa');
    if (p.scrollHeight > p.clientHeight + 1) pb.push('scroll interno');
    if (a.getAnimations().length || a.style.height || a.style.overflow) pb.push('animación o estilo en línea sin terminar');
    const txt = s.firstChild, gr = document.createRange(); gr.selectNodeContents(txt); const r1 = gr.getClientRects()[0], rg = sg.getBoundingClientRect();
    if (Math.abs((rg.top + rg.bottom) / 2 - (rs.top + rs.bottom) / 2) > 3) pb.push('signo desalineado');
    if (getComputedStyle(sg, '::before').content !== '"−"') pb.push('signo no es −');
    if (pb.length) out.push('«' + s.textContent.trim().slice(0, 28) + '»: ' + pb.join(', '));
  });
  document.querySelectorAll('.acordeon:not([open])').forEach(a => { const c = getComputedStyle(a.querySelector('.acordeon__signo'), '::before').content; if (c !== '"+"') out.push('cerrado con signo ' + c); });
  return { abiertos: document.querySelectorAll('.acordeon[open]').length, total: document.querySelectorAll('.acordeon').length, out };
})()`;
let ok = 0, mal = 0; const ver = (n, r, extra = '') => { const bien = r.out.length === 0; bien ? ok++ : mal++; if (!bien || process.env.VERBOSO) console.log(`${bien ? '✓' : '✗'} ${n} · abiertos ${r.abiertos}/${r.total}${extra}${r.out.length ? ' · ' + r.out.join(' | ') : ''}`); };
const cargar = async p => { await cdp('Page.navigate', { url: B + p + '?c=' + Math.random() }); await espera(1200); };
await cdp('Page.enable');
for (const movimiento of ['no-preference', 'reduce']) {
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: movimiento }] });
  const anchos = movimiento === 'reduce' ? [1440, 390] : ANCHOS;
  for (const pag of PAGINAS) for (const w of anchos) for (const escala of (movimiento === 'reduce' || ![1440, 1280, 390].includes(w) ? [1] : [1, 2])) {
    const et = `${movimiento === 'reduce' ? '[reducido] ' : ''}${pag} ${w}${escala === 2 ? ' zoom200%' : ''}`;
    await tamaño(w, escala); await cargar(pag);
    const n = await ev(`document.querySelectorAll('.acordeon').length`);
    // 1) Abrir todas (la primera ya viene abierta)
    for (let i = 0; i < n; i++) if (!(await ev(`document.querySelectorAll('.acordeon')[${i}].open`))) { await clic(i); await espera(40); }
    await espera(450); let r = await ev(MEDIR); ver(et + ' · todas abiertas', r, r.abiertos !== n ? ' ✗FALTAN' : '');
    // 2) Resize con todas abiertas (a otro ancho y vuelta)
    await tamaño(w > 700 ? 360 : 1280, 1); await espera(300); ver(et + ' · resize a ' + (w > 700 ? 360 : 1280), await ev(MEDIR));
    await tamaño(w, escala); await espera(300); ver(et + ' · resize de vuelta', await ev(MEDIR));
    // 3) Cerrar todas, luego abrir-cerrar-reabrir una a una
    for (let i = 0; i < n; i++) { await clic(i); await espera(30); } await espera(450);
    r = await ev(MEDIR); ver(et + ' · todas cerradas', r, r.abiertos ? ' ✗QUEDAN ' + r.abiertos : '');
    for (let i = 0; i < n; i++) {
      await clic(i); await espera(350); await clic(i); await espera(350); await clic(i); await espera(350);
      r = await ev(MEDIR); ver(et + ` · #${i + 1} reabierta`, r, r.abiertos !== 1 ? ' ✗abiertos≠1' : '');
      await clic(i); await espera(350);
    }
    // 4) Interrupción: doble clic rápido (abre y cierra a mitad) + triple (termina abierta)
    await clic(1); await espera(80); await clic(1); await espera(400);
    r = await ev(MEDIR); ver(et + ' · interrumpida → cerrada', r, r.abiertos ? ' ✗' : '');
    await clic(1); await espera(80); await clic(1); await espera(80); await clic(1); await espera(450);
    r = await ev(MEDIR); ver(et + ' · interrumpida ×2 → abierta', r, r.abiertos !== 1 ? ' ✗' : ''); await clic(1); await espera(400);
    // 5) Teclado: Enter abre, Espacio cierra; foco sigue en la pregunta
    await tecla(2, 'Enter'); await espera(400); r = await ev(MEDIR);
    const foco = await ev(`document.activeElement === document.querySelectorAll('.acordeon summary')[2] && getComputedStyle(document.activeElement).outlineStyle !== 'none'`);
    ver(et + ' · Enter abre', r, (r.abiertos !== 1 ? ' ✗' : '') + (foco ? '' : ' ✗foco'));
    await tecla(2, ' '); await espera(400); r = await ev(MEDIR); ver(et + ' · Espacio cierra', r, r.abiertos ? ' ✗' : '');
  }
}
console.log(`RESUMEN: ${ok}/${ok + mal}`); ws.close(); chrome.kill(); process.exit(0);
