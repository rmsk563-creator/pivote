// Smoke test en el dominio real (Release): Chrome por CDP, sin proxy ni iframes.
// Por página y ancho: estado HTTP, imágenes sin decodificar, desborde horizontal, <base> y hoja de estilos aplicada.
// Uso: node _qa/produccion-cdp.mjs   (Node 24: WebSocket y fetch nativos)
import { spawn } from 'node:child_process';
const CH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const B = process.env.URL || 'https://rmsk563-creator.github.io/pivote/';
const PAGINAS = ['', 'servicios.html', 'proyectos.html', 'proyectos', 'proyectos/botica-de-barrio.html', 'proyectos/floreria-en-barranco.html',
  'proyectos/barberia-con-espera-a-la-vista.html', 'proyectos/cafeteria-de-paso.html', 'como-trabajamos.html', 'estudio.html', 'sobre.html',
  'privacidad.html', 'cotizar.html?nueva=1', '404.html', 'proyectos/', 'proyectos/no-existe/otra', 'a/b/c'];
const ANCHOS = (process.env.ANCHOS || '320 390 768 1024 1440').split(' ').map(Number);
const chrome = spawn(CH, ['--headless=new', '--disable-gpu', '--remote-debugging-port=9333', '--user-data-dir=/tmp/pv-cdp', 'about:blank'], { stdio: 'ignore' });
const espera = ms => new Promise(r => setTimeout(r, ms));
let ws; for (let i = 0; i < 50 && !ws; i++) { try { const l = await (await fetch('http://127.0.0.1:9333/json')).json(); const p = l.find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch { await espera(200); } }
await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}, eventos = [];
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } else eventos.push(d); };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const evaluar = async expr => (await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;
await cdp('Page.enable'); await cdp('Network.enable'); await cdp('Network.setCacheDisabled', { cacheDisabled: false });
let fallos = 0, lineas = 0;
for (const w of ANCHOS) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 600 });
  for (const p of PAGINAS) {
    eventos.length = 0;
    await cdp('Page.navigate', { url: B + p });
    for (let t = 0; t < 150 && !eventos.some(e => e.method === 'Page.loadEventFired'); t++) await espera(100);
    const estado = eventos.find(e => e.method === 'Network.responseReceived' && e.params.type === 'Document')?.params.response.status;
    const r = await evaluar(`(async () => {
      const imgs = [...document.images]; imgs.forEach(i => i.loading = 'eager');
      const t0 = Date.now(); while (!imgs.every(i => i.complete) && Date.now() - t0 < 15000) await new Promise(r => setTimeout(r, 100));
      await document.fonts.ready;
      return { rotas: imgs.filter(i => !i.naturalWidth).map(i => i.getAttribute('src')), sw: document.documentElement.scrollWidth,
        base: document.querySelector('base')?.getAttribute('href') || '', css: getComputedStyle(document.body).backgroundColor,
        fuente: document.fonts.check('16px Archivo'), h1: document.querySelector('h1')?.textContent.trim().slice(0, 40) };
    })()`);
    const mal = !r || r.rotas.length || r.sw > w || r.css === 'rgba(0, 0, 0, 0)' || !r.fuente;
    if (mal) fallos++; lineas++;
    if (mal || w === 1440) console.log(`${mal ? '✗' : '✓'} ${w} /pivote/${p} → ${estado} · h1 «${r?.h1}» · base ${r?.base || '—'} · sw ${r?.sw} · fondo ${r?.css} · Archivo ${r?.fuente}${r?.rotas.length ? ' · ROTAS ' + r.rotas.join(', ') : ''}`);
  }
}
console.log(`RESUMEN: ${lineas - fallos}/${lineas} combinaciones sin problemas (${PAGINAS.length} rutas × ${ANCHOS.length} anchos)`);
ws.close(); chrome.kill(); process.exit(0);
