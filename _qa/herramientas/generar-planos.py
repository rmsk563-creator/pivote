#!/usr/bin/env python3
"""Genera los planos esquemáticos (D-040) como SVG con clases CSS.
Reproduce las coordenadas de los componentes «Esquema / …» de Figma › 05 (sección
«Esquemas de casos · componentes»). Herramienta de autoría: el sitio no la necesita
para funcionar. Si cambia un esquema en Figma, se actualiza aquí y se vuelve a pegar
el SVG en la página del caso."""
import os
X0, Y0, W, H, DOOR = 10, 10, 306, 206, (150, 40)
def fmt(v): return ('%g' % v)
class P:
    def __init__(s): s.e = []
    def rect(s, x, y, w, h, cls, sw=1.5):
        if cls in ('pl-mueble',):  # borde interior de 1.5
            s.e.append(f'<rect class="{cls}" x="{fmt(x+sw/2)}" y="{fmt(y+sw/2)}" width="{fmt(w-sw)}" height="{fmt(h-sw)}"/>')
        else:
            s.e.append(f'<rect class="{cls}" x="{fmt(x)}" y="{fmt(y)}" width="{fmt(w)}" height="{fmt(h)}"/>')
    def label(s, t, x, y): s.e.append(f'<text class="pl-etiqueta" x="{fmt(x)}" y="{fmt(y+12.5)}">{t}</text>')
    def path(s, d): s.e.append(f'<path class="pl-circulacion" d="{d}"/>')
    def circle(s, x, y, d, cls): s.e.append(f'<circle class="{cls}" cx="{fmt(x+d/2)}" cy="{fmt(y+d/2)}" r="{fmt(d/2-0.75)}"/>')
    def marker(s, n, x, y):
        s.e.append(f'<g class="pl-punto"><rect x="{fmt(x+0.75)}" y="{fmt(y+0.75)}" width="22.5" height="22.5"/><text x="{fmt(x+4.5)}" y="{fmt(y+16.5)}">{n:02d}</text></g>')
    def walls(s, vitrina=None):
        s.rect(X0, Y0, W, 3, 'pl-muro'); s.rect(X0, Y0, 3, H, 'pl-muro'); s.rect(X0+W-3, Y0, 3, H, 'pl-muro')
        dx, dw = DOOR
        segs = [(X0, dx)]
        if vitrina:
            segs = [(X0, vitrina[0]), (vitrina[0]+vitrina[1], dx)]
            s.e.append(f'<rect class="pl-vitrina" x="{vitrina[0]+0.5}" y="{Y0+H-3+0.5}" width="{vitrina[1]-1}" height="2"/>')
        for a, b in segs:
            if b > a: s.rect(a, Y0+H-3, b-a, 3, 'pl-muro')
        s.rect(dx+dw, Y0+H-3, X0+W-(dx+dw), 3, 'pl-muro')
        s.label('Entrada', dx-6, Y0+H+6)
        if vitrina: s.label('Vitrina', vitrina[0]+8, Y0+H+6)
F = 'pl-mueble'
def botica_antes(p):
    p.walls(); p.rect(16,40,18,150,F); p.label('Góndola',40,110); p.rect(70,22,190,22,F); p.label('Mostrador',132,48)
    p.rect(292,40,18,150,F); p.label('Cuidado personal',160,88); p.rect(210,150,60,24,F); p.label('Caja',226,154)
    p.path('M180 208V186H208'); p.label('Cola',142,178)
def botica_despues(p):
    p.walls(); p.rect(16,40,18,150,F); p.label('Góndola',40,60); p.rect(150,22,160,22,F); p.rect(288,22,22,112,F)
    p.label('Dispensación',160,48); p.label('Caja',250,112); p.rect(60,160,70,14,F); p.rect(150,160,70,14,F); p.label('Góndolas bajas',20,192)
    p.path('M140 208V100H236V146'); p.marker(1,256,52); p.marker(2,176,88); p.marker(3,226,160)
def floreria_antes(p):
    p.walls(); p.rect(110,150,110,22,F); p.label('Mostrador',135,176); p.rect(30,60,60,30,F); p.rect(30,110,60,30,F)
    p.label('Exhibición',30,40); p.rect(220,22,90,40,F); p.label('Almacén',236,66); p.label('Sin espacio de taller',120,96)
def floreria_despues(p):
    p.walls((16,120)); p.rect(16,26,28,150,F); p.label('Mesa de armado',52,150); p.rect(290,60,20,130,F); p.label('Exhibición',208,150)
    p.rect(110,16,150,40,F); p.label('Almacén frío',140,30); p.path('M110 64H260'); p.label('Panel corredizo',128,70)
    p.marker(1,52,40); p.marker(2,262,110); p.marker(3,266,52)
def barberia_antes(p):
    p.walls(); p.rect(200,16,110,36,F); p.label('Espera',232,58); p.rect(30,60,40,30,F); p.rect(120,100,40,30,F); p.rect(60,150,40,30,F)
    p.label('Puestos',100,74); p.rect(220,110,60,30,F); p.label('Lavado',228,146)
def barberia_despues(p):
    p.walls((16,120)); p.rect(20,150,110,40,F); p.label('Espera',50,162)
    for i in range(4): p.rect(280,30+i*42,30,26,F); p.circle(262,38+i*42,10,'pl-luz')
    p.label('Puestos',206,184); p.rect(30,20,120,30,F); p.label('Lavado',66,56); p.marker(1,136,138); p.marker(2,222,114); p.marker(3,232,24)
def cafeteria_antes(p):
    p.walls(); p.rect(160,120,140,26,F); p.label('Barra: pedido y recojo',150,98)
    for x,y in [(40,40),(110,56),(50,110),(110,150)]: p.circle(x,y,24,'pl-mesa')
    p.path('M176 208L206 152'); p.label('Cola',214,176)
def cafeteria_despues(p):
    p.walls((16,120)); p.rect(210,34,100,24,F); p.label('Pedido',238,39); p.rect(210,104,100,24,F); p.label('Recojo',238,109)
    p.path('M204 46H190V116H204'); p.rect(20,194,112,10,F); p.label('Repisa de pie',20,176)
    for x,y in [(34,26),(84,26),(34,76),(84,76)]: p.circle(x,y,24,'pl-mesa')
    p.label('Mesas',120,48); p.marker(1,176,68); p.marker(2,140,176); p.marker(3,120,76)
PLANOS = {'botica-antes':botica_antes,'botica-despues':botica_despues,'floreria-antes':floreria_antes,'floreria-despues':floreria_despues,
          'barberia-antes':barberia_antes,'barberia-despues':barberia_despues,'cafeteria-antes':cafeteria_antes,'cafeteria-despues':cafeteria_despues}
if __name__ == '__main__':
    raiz = os.path.join(os.path.dirname(__file__), '..', '..', 'assets', 'planos')
    for nombre, fn in PLANOS.items():
        p = P(); fn(p)
        svg = '<svg class="plano__svg" viewBox="0 0 326 244" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + ''.join(p.e) + '</svg>\n'
        open(os.path.join(raiz, nombre + '.svg'), 'w', encoding='utf-8').write(svg)
        print(nombre, len(svg))
