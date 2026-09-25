#!/usr/bin/env python3
"""Emula GitHub Pages (Project Page) para probar la ruta base (D-042 · T-3/T-4):
- sirve el sitio bajo /pivote/;
- lo que no existe responde 404.html con estado 404, en cualquier profundidad;
- no publica carpetas que empiezan con «_» ni «.» (Jekyll las excluye).
Uso: python3 _qa/servidor-pages.py 8124  y en Chrome:
  --host-resolver-rules="MAP rmsk563-creator.github.io 127.0.0.1:8124"  →  http://rmsk563-creator.github.io/pivote/"""
import http.server, os, sys, posixpath, urllib.parse
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PREFIJO = '/pivote/'
class Manejador(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=RAIZ, **k)
    def log_message(self, *a): pass
    def no_encontrada(self):
        cuerpo = open(os.path.join(RAIZ, '404.html'), 'rb').read()
        self.send_response(404); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.send_header('Content-Length', str(len(cuerpo))); self.end_headers()
        if self.command != 'HEAD': self.wfile.write(cuerpo)
    def do_GET(self):
        ruta = urllib.parse.urlparse(self.path).path
        if ruta == '/pivote': self.send_response(301); self.send_header('Location', PREFIJO); self.end_headers(); return
        if not ruta.startswith(PREFIJO): return self.no_encontrada()
        rel = urllib.parse.unquote(ruta[len(PREFIJO):])
        if any(p.startswith('_') or p.startswith('.') for p in rel.split('/') if p): return self.no_encontrada()
        destino = os.path.join(RAIZ, rel)
        if os.path.isdir(destino): destino = os.path.join(destino, 'index.html')
        if not os.path.isfile(destino): return self.no_encontrada()
        self.path = '/' + os.path.relpath(destino, RAIZ).replace(os.sep, '/')
        return super().do_GET()
    do_HEAD = do_GET
if __name__ == '__main__':
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8124
    http.server.ThreadingHTTPServer(('127.0.0.1', puerto), Manejador).serve_forever()
