#!/bin/bash
# Ejecuta _qa/pruebas.html en Chrome headless e imprime el resumen y los fallos.
# Requiere el servidor local en el puerto 8123. Uso: _qa/ejecutar-pruebas.sh [--movimiento-reducido]
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
EXTRA=""; [ "${1:-}" = "--movimiento-reducido" ] && EXTRA="--force-prefers-reduced-motion"
"$CH" --headless=new --disable-gpu $EXTRA --window-size=1280,900 --virtual-time-budget=60000 --dump-dom "http://127.0.0.1:8123/_qa/pruebas.html" 2>/dev/null > /tmp/pv-pruebas.html
python3 - <<'PY'
import re, html
s = open('/tmp/pv-pruebas.html', encoding='utf-8').read()
m = re.search(r'<p id="resumen"[^>]*>(.*?)</p>', s, re.S)
print('RESUMEN:', html.unescape(m.group(1)) if m else '¿sin resumen?')
for f in re.findall(r'<div class="fallo">(.*?)</div>', s, re.S): print('  ' + html.unescape(f))
PY
