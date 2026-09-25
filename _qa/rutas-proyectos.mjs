// v1.0.1: comprueba /proyectos y /proyectos/ (misma página única), casos, 404 dentro de /proyectos/,
// «Volver al inicio», filtros, tarjetas y «Siguiente caso», con Chrome por CDP sobre la URL indicada.
// Uso: node _qa/rutas-proyectos.mjs   · con el emulador de Pages (python3 _qa/servidor-pages.py 8124):
//   RESOLVER='MAP rmsk563-creator.github.io 127.0.0.1:8124' URL=http://rmsk563-creator.github.io/pivote/ node _qa/rutas-proyectos.mjs
import { spawn } from 'node:child_process';
const B = process.env.URL || 'https://rmsk563-creator.github.io/pivote/';
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--remote-debugging-port=9335', '--user-data-dir=/tmp/pv-cdp3', ...(process.env.RESOLVER ? ['--host-resolver-rules=' + process.env.RESOLVER] : []), 'about:blank'], { stdio: 'ignore' });
const espera = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 50 && !ws; i++) { try { const p = (await (await fetch('http://127.0.0.1:9335/json')).json()).find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch { await espera(200); } }
await new Promise(r => ws.onopen = r); let id = 0; const pend = {};
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d); };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await cdp('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
const ir = async u => { await cdp('Page.navigate', { url: u }); await espera(2500); };
let ok = 0, mal = 0; const ver = (nombre, cond, info) => { cond ? ok++ : mal++; console.log(`${cond ? '✓' : '✗'} ${nombre}${info ? ' · ' + info : ''}`); };
const estado = `({ url: location.href, h1: document.querySelector('h1')?.textContent.trim(), robots: document.querySelector('meta[name=robots]')?.content,
  css: getComputedStyle(document.body).backgroundColor, rotas: [...document.images].filter(i => i.complete && !i.naturalWidth).length })`;
for (const [ruta, sufijo] of [['proyectos', ''], ['proyectos/', ''], ['proyectos/?rubro=botica', '?rubro=botica'], ['proyectos/index.html', '']]) {
  await ir(B + ruta); const s = await ev(estado);
  ver(`/${ruta} → proyectos.html${sufijo}`, s.h1 === 'Casos contados como decisiones' && /\/pivote\/proyectos(\.html)?$/.test(s.url.split('#')[0].split('?')[0]) && s.url.split('#')[0].endsWith(sufijo) && s.css !== 'rgba(0, 0, 0, 0)' && !s.rotas && s.robots === 'noindex, nofollow', s.url.replace(B, '/pivote/'));
}
await ir(B + 'proyectos/?rubro=botica');
ver('?rubro=botica se conserva y filtra', await ev(`[...document.querySelectorAll('li[data-rubro]')].filter(l => !l.hidden).map(l => l.dataset.rubro).join()`) === 'botica');
await ir(B + 'proyectos/');
await ev(`document.querySelector('[data-filtro="tienda"]').click()`); await espera(300);
ver('Filtro «Tiendas» muestra solo tiendas', await ev(`[...document.querySelectorAll('li[data-rubro]')].filter(l => !l.hidden).map(l => l.dataset.rubro).join()`) === 'tienda');
const tarjetas = await ev(`[...document.querySelectorAll('.tarjeta__enlace')].map(a => a.href)`);
for (const t of tarjetas) { const r = await fetch(t); ver('Tarjeta → ' + t.replace(B, '/pivote/'), r.status === 200); }
await ir(B + 'proyectos/botica-de-barrio.html');
let vistos = [];
for (let i = 0; i < 4; i++) { vistos.push(await ev(`document.querySelector('h1').textContent.trim()`)); const sig = await ev(`[...document.querySelectorAll('a')].find(a => /Siguiente caso/.test(a.textContent) || a.closest('.siguiente, [class*=siguiente]'))?.href`); await ir(sig); }
ver('«Siguiente caso» recorre los 4 y vuelve a Botica', new Set(vistos).size === 4 && (await ev(`document.querySelector('h1').textContent.trim()`)) === vistos[0], vistos.join(' → '));
for (const r of ['proyectos/botica.html', 'proyectos/no-existe/otra']) {
  await ir(B + r); const s = await ev(estado);
  ver(`/${r} → 404 con estilos`, s.h1 === 'Esta página no existe' && s.css !== 'rgba(0, 0, 0, 0)' && !s.rotas, `base ${await ev(`document.querySelector('base')?.getAttribute('href')`)}`);
  await ev(`[...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Volver al inicio').click()`); await espera(2500);
  const f = await ev(estado); ver(`   «Volver al inicio» desde /${r}`, /Locales pensados/.test(f.h1), f.url.replace(B, '/pivote/'));
}
await ir(B + 'proyectos/'); ver('Navegación: «Proyectos» marcado en la cabecera', await ev(`document.querySelector('.cabecera__enlaces a[aria-current="page"]')?.textContent.trim()`) === 'Proyectos');
console.log(`RESUMEN: ${ok}/${ok + mal}`); ws.close(); chrome.kill(); process.exit(0);
