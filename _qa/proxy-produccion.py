#!/usr/bin/env python3
"""Smoke test en producción (Release): sirve /pivote/_qa/* desde el disco y todo lo demás
en vivo desde GitHub Pages, en un mismo origen. Así las pruebas, axe y el marco de desbordes
se ejecutan contra el sitio publicado (en headless, los iframes de otro origen se cuelgan).
Uso: python3 _qa/proxy-produccion.py 8125  y  BASE=http://127.0.0.1:8125/pivote _qa/ejecutar-pruebas.sh"""
import http.server, os, sys, urllib.request, urllib.error, mimetypes
QA = os.path.dirname(os.path.abspath(__file__)); PROD = 'https://rmsk563-creator.github.io'
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def responder(self, cuerpo):
        ruta = self.path.split('?')[0]
        if ruta.startswith('/pivote/_qa/'):
            f = os.path.join(QA, ruta[len('/pivote/_qa/'):])
            if not os.path.isfile(f): self.send_response(404); self.end_headers(); return
            datos, codigo, tipo = open(f, 'rb').read(), 200, (mimetypes.guess_type(f)[0] or 'text/plain') + '; charset=utf-8'
        else:
            try:
                r = urllib.request.urlopen(PROD + self.path); datos, codigo, tipo = r.read(), r.status, r.headers.get('Content-Type')
            except urllib.error.HTTPError as e:
                datos, codigo, tipo = e.read(), e.code, e.headers.get('Content-Type')
        self.send_response(codigo); self.send_header('Content-Type', tipo or 'application/octet-stream')
        self.send_header('Cache-Control', 'no-store'); self.end_headers()
        if cuerpo: self.wfile.write(datos)
    def do_GET(self): self.responder(True)
    def do_HEAD(self): self.responder(False)
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 8125), H).serve_forever()
