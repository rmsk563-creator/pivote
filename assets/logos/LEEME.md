# Logo Pivote — archivos finales (D2 aprobado, 2026-09-24)

## svg/ — 4 versiones × 4 tonos, texto convertido a trazado
| Versión | Uso |
|---|---|
| `pivote-logotipo-*` | Principal: cabecera, documentos |
| `pivote-logotipo-descriptor-*` | Firma: pie, OG, PDF de cotización |
| `pivote-horizontal-*` | Presentaciones, portada de caso |
| `pivote-monograma-*` | Avatar, sello de caso, ícono |

Tonos: `positivo` (tinta + pilar azul), `negativo` (papel + pilar azul claro, sobre verde botella o tinta), `mono-positivo`, `mono-negativo`.

## png/ — fondo transparente
Logotipo y logotipo + descriptor a 1200 px de ancho, horizontal a 1600 px y monograma a 512 px, en positivo y negativo.

## favicon/
- `favicon.svg`: fondo propio que cambia con el modo claro u oscuro del sistema; nunca transparente.
- `favicon.ico`: 16 + 24 + 32, dibujados a mano sobre la cuadrícula de píxeles.
- `favicon-16/24/32.png` y sus versiones `-oscuro`.
- `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (margen del 30 %).
- `site.webmanifest`.

Etiquetas sugeridas para el `<head>` (rutas relativas):
```html
<link rel="icon" href="assets/logos/favicon/favicon.ico" sizes="any">
<link rel="icon" href="assets/logos/favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/logos/favicon/apple-touch-icon.png">
<link rel="manifest" href="assets/logos/favicon/site.webmanifest">
```

## Reglas (resumen de MARCA.md)
- **Área de protección:** la altura de x alrededor del logotipo; 0,25 del lado alrededor del monograma.
- **Tamaños mínimos en pantalla:** logotipo 80 px; logotipo + descriptor 200 px; horizontal 320 px; monograma 16 px.
- **Tamaño mínimo impreso:** logotipo 20 mm.
- **No hacer:**
  - arcos alrededor del pilar;
  - inclinar, deformar o poner en cursiva;
  - contenedor redondeado de app;
  - la P sobre un recuadro azul;
  - cambiar el color del pilar a verde o latón;
  - animar el pilar en bucle.
