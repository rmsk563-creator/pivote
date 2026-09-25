#!/usr/bin/env python3
"""Fija la URL pública absoluta que usan las etiquetas og:image (D-042 · T-3).
Es la única URL absoluta del sitio: las redes sociales no aceptan rutas relativas.
Uso: python3 _qa/herramientas/url-publica.py https://usuario.github.io/pivote/
     (o el dominio propio). Cambia las 13 páginas y lo comprueba _qa/pruebas.html."""
import os, re, sys
if len(sys.argv) != 2 or not sys.argv[1].startswith('https://'):
    sys.exit('Indica la URL pública con https://, terminada en «/».')
base = sys.argv[1].rstrip('/') + '/'
raiz = os.path.join(os.path.dirname(__file__), '..', '..')
cambiadas = 0
for carpeta, _, archivos in os.walk(raiz):
    if '/_qa' in carpeta or '/.git' in carpeta: continue
    for a in archivos:
        if not a.endswith('.html'): continue
        ruta = os.path.join(carpeta, a); t = open(ruta, encoding='utf-8').read()
        n = re.sub(r'(<meta property="og:image" content=")[^"]+(")', r'\g<1>' + base + r'assets/og/pivote-og.png\2', t)
        if n != t: open(ruta, 'w', encoding='utf-8').write(n); cambiadas += 1
print(f'og:image → {base}assets/og/pivote-og.png en {cambiadas} páginas')
