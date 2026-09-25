# Plan de Build — Pivote

**Estado:** propuesto el 2026-09-24, después del Freeze final (D-041). **Pendiente de la aprobación del usuario.** No se escribe código de la web hasta esa aprobación.

**Contrato:** `HANDOFF.md` (congelado). Este plan dice **cómo y en qué orden** se construye; **qué** se construye lo dice el handoff. Si algo del Build choca con el diseño, se abre un Decision Conflict y no se resuelve en el código.

---

## 0. Decisiones que necesito antes de empezar
| # | Tema | Propuesta | Alternativa | Por qué importa |
|---|---|---|---|---|
| **DC-003** | Caso destacado de Inicio: el comparador muestra la misma foto como «antes» y «después» | **A:** el plano esquemático «Después» de la Botica, con sus 3 puntos | B: foto de referencia · C: dejarlo (contradice D-040) | Solo bloquea ese bloque de Inicio; lo demás avanza |
| T-1 | Fuentes | **Alojarlas en el propio sitio** (`assets/fuentes/`, WOFF2 de Archivo 400/500/600 e IBM Plex Mono 400/500, licencia OFL, subconjunto latino) | Google Fonts, como dice HANDOFF §2 | Menos peticiones a terceros (coherente con Privacidad), sin depender de otro servidor y con mejor carga. Cambia una línea técnica de HANDOFF §2 |
| T-2 | Cabecera y pie repetidos en 13 páginas sin herramienta de build | **HTML estático repetido en cada página + una prueba en `_qa` que compara la cabecera y el pie de todas las páginas** (solo cambian `aria-current` y las rutas `../`) | Inyectarlos con JS (sin JS no hay navegación y además parpadea) | Es lo que mejor respeta «sin build» sin sacrificar accesibilidad |
| T-3 | `404.html` en GitHub Pages | **Rutas absolutas con el prefijo `/pivote/` solo en `404.html`**. GitHub sirve esa página en cualquier profundidad (p. ej. `/pivote/proyectos/x`), donde las rutas relativas se rompen | `<base href="/pivote/">` | Sin esto, la 404 sale sin estilos en rutas anidadas. Si algún día hay dominio propio, se cambia en un solo archivo |
| T-4 | Herramientas de QA | `_qa/pruebas.html` (pruebas propias, sin dependencias) + **axe-core por CDN solo dentro de `_qa`** + capturas con Chrome headless (script en `_qa/`) + Lighthouse desde Chrome DevTools | `npx lighthouse` fuera del repositorio, si lo autorizas | Nada de esto se publica: GitHub Pages (Jekyll) ignora las carpetas que empiezan con «_» |

Las decisiones T-1 a T-3 son técnicas: no cambian el diseño. Aun así, T-1 modifica el contrato (HANDOFF §2), así que se registrará en DECISIONS si la apruebas.

---

## 1. Arquitectura de archivos
```text
pivote/
├── index.html                 Inicio
├── servicios.html
├── proyectos.html             índice + filtro (?rubro=)
├── proyectos/
│   ├── botica-de-barrio.html
│   ├── floreria-en-barranco.html
│   ├── barberia-con-espera-a-la-vista.html
│   └── cafeteria-de-paso.html
├── como-trabajamos.html
├── estudio.html
├── cotizar.html               4 pasos + resumen + confirmación (vistas por hash)
├── sobre.html · privacidad.html · 404.html
├── css/
│   └── estilos.css            1 fuentes · 2 tokens · 3 base · 4 disposición · 5 componentes · 6 páginas · 7 movimiento · 8 utilidades
├── js/
│   ├── config.js              CONFIG.contacto y CONFIG.autor (la única configuración editable, D-023 / D-038)
│   ├── sitio.js               cabecera fija, menú móvil, aviso de contacto, aparición al hacer scroll, «Ver portafolio»
│   ├── proyectos.js           filtro por rubro y ?rubro=
│   ├── estimador.js           función pura del rango (sin DOM)
│   └── cotizar.js             estado, vistas, validación, panel, resumen, envío simulado
├── assets/
│   ├── fuentes/               WOFF2 (si se aprueba T-1)
│   ├── iconos/iconos.svg      sprite de Lucide con <symbol viewBox="0 0 24 24">
│   ├── planos/                8 esquemas + 5 mini-planos en SVG exportados de Figma
│   ├── fotos/                 JPG de 700 y 1400 px + CREDITOS.md
│   ├── logos/ · og/           (ya existen)
└── _qa/
    ├── pruebas.html           estimador, validación, persistencia, consistencia de cabecera y pie, enlaces
    ├── componentes.html       galería de componentes y estados, para compararlos con Figma › 04
    └── capturas.sh            Chrome headless en 320 · 360 · 390 · 768 · 834 · 1024 · 1280 · 1440
```
Nombres, identificadores y comentarios en español. Sin npm, sin build y sin módulos ES. Scripts propios sin `defer` al final del `<body>` (memoria de bugs recurrentes).

---

## 2. Orden de implementación
Cada bloque termina con su verificación y un commit. No se pasa al siguiente con fallos abiertos.

| # | Bloque | Qué incluye | Se verifica con |
|---|---|---|---|
| 0 | **Preparación de assets** | Fuentes (T-1); sprite de 14 íconos Lucide; 8 esquemas y 5 mini-planos exportados de Figma a SVG, con los colores pasados a variables CSS; fotos de 700 y 1400 px (`sips`) | Comparación visual SVG ↔ Figma; pesos de archivo |
| 1 | **Fundamentos CSS** | `@font-face`; los 27 tokens de color, espaciado, radio, sombras y capas; escala tipográfica con 3 cortes (≥ 1024 · 600–1023 · < 600); contenedor de 1200 con márgenes 16/40; `[hidden]{display:none!important}`; foco visible; `prefers-reduced-motion` | `_qa/componentes.html` con la escala y la paleta; contraste de los pares de MARCA §3 |
| 2 | **Componentes** | Botón (4 tipos, estados), antetítulo, etiqueta, cota, anotación, íconos, cabecera fija (Arriba/Desplazada, página activa), menú móvil (foco atrapado, Esc), pie (un enlace por destino), aviso de contacto (`role="status"`, 6 s), acordeón (`<details>`), tarjetas (un solo enlace), chip, diálogo (`<dialog>`), campo, opción, casilla, progreso, carga de archivo, rango, fila de resumen, panel, plano esquemático | Galería de componentes contra Figma › 04, estado por estado; teclado en cada control |
| 3 | **Inicio** | 8 secciones en orden (CONTENT §2), composición en los 3 cortes (HANDOFF §4.1), carrusel con scroll-snap en móvil. **El caso destacado espera DC-003** | Capturas a 1440 / 834 / 390 contra los frames HF; enlaces |
| 4 | **Páginas de contenido** | Servicios, Cómo trabajamos (tabla → fichas en móvil), Estudio, Sobre este proyecto («Ver portafolio» según `CONFIG.autor.url`), Privacidad y 404 (T-3) | Capturas contra los frames HF y los de revisión 834 |
| 5 | **Proyectos y casos** | Índice con filtro (`aria-pressed`, `?rubro=` con `history.replaceState`); 4 casos con foto, planos en línea en `<figure>`, decisiones, materiales, «Qué haríamos distinto», cierre y «Siguiente caso» circular; rutas `../` | Recorrido del filtro y del ciclo de casos; capturas |
| 6 | **Estimador** (primero las pruebas) | `estimarRango(entrada)` → `{tipo, min, max, texto, minParaAviso}`; redondeo; «Aún no lo sé»; «Aún sin local» por m²; área fuera de rango; formato sin `toLocaleString` | Los 9 casos de HANDOFF §7.4 + bordes (A = 10, 1,000, 1,001, sin cierre, centro comercial) |
| 7 | **Cotizar** | Vistas por hash (`#paso-1…#confirmacion`); estado en `sessionStorage` (HANDOFF §7.2); `?servicio=` y `?rubro=` al entrar; validación y mensajes exactos (CONTENT §7); campos reales (`<select>` de 43 distritos + Callao + Otro, `type="month"`, numéricos); panel «Tu solicitud» fijo; resumen plegable y barra fija en móvil; «Editar»; aviso de presupuesto; Enviar → «Enviando…» 1000 ms → confirmación; «Salir sin enviar»; «Nueva cotización» / «Volver al inicio» | Pruebas de validación y persistencia en `_qa`; recorrido solo con teclado; las listas de QA.md (HIGH-FI UX REFINEMENT y Ajuste de selectores) repetidas en el navegador |
| 8 | **Movimiento** | Tokens y transiciones de `MOVIMIENTO.md`: hover, cambio de paso, progreso, listas, acordeón, menú, diálogos, aviso, envío, confirmación; aparición al hacer scroll (`IntersectionObserver`, una vez, nunca en el hero ni en el formulario); cabecera Arriba → Desplazada con centinela | Revisión con reducción de movimiento activada y desactivada; ninguna animación > 400 ms |
| 9 | **SEO y metadatos** | `<title>` y descripción por página (CONTENT §1); `noindex, nofollow` (D-035); OG y Twitter con `pivote-og.png`; favicons y manifest; `lang="es-PE"` | Inspección del `<head>` de las 13 páginas en `_qa/pruebas.html` |
| 10 | **QA completa** | Definition of Done de HANDOFF §12 | Evidencia registrada en `QA.md` |
| 11 | **Release** (aprobación aparte) | Estrategia del §7 | Smoke test en producción |

**Por qué este orden:**
- los tokens y los componentes primero, porque todas las páginas los reutilizan;
- las páginas simples antes que las complejas;
- el estimador antes que Cotizar y con sus pruebas escritas primero, porque es la parte con más lógica y la que ya falló una vez en el prototipo.

---

## 3. Componentes (resumen de implementación)
- **CSS por componente** con clases en español (`.boton--primario`, `.opcion`, `.campo__caja`), sin valores sueltos: solo tokens.
- **Estados:**
  - `:hover` solo con `@media (hover: hover)`;
  - `:focus-visible` con el anillo de 3 px;
  - `[aria-pressed]`, `[aria-current]`, `[aria-invalid]` y `[aria-busy]` como selectores de estado, para que el estilo refleje la accesibilidad.
- **Opción (radio card):** el borde de selección con `box-shadow`, para que no cambie el tamaño (D-031).
- **Plano esquemático:** SVG en línea con clases `.plano__muro`, `.plano__mueble`, `.plano__circulacion` y `.plano__punto`, que toman los colores de los tokens.
- **Íconos:** `<svg><use href="…/iconos.svg#check"/></svg>`. El `viewBox` va en el `<symbol>` (evita el bug del ícono recortado).

## 4. Páginas
13 archivos HTML, uno por entrada del sitemap (HANDOFF §1). Cabecera y pie estáticos en cada uno (T-2), con `aria-current="page"` según la página. El copy se copia literal de CONTENT.md; cualquier texto que falte se propone antes de escribirlo.

## 5. Responsive
- Móvil primero: se escribe < 600 y se amplía con `@media (min-width: 600px)` y `(min-width: 1024px)`.
- Reglas de contenedor, márgenes y composición: HANDOFF §4 y la tabla de §6b.
- Cotizar: dos columnas desde 1024; entre 600 y 1023, una columna de 640 como máximo con resumen plegable.
- Se comprueba en 320 · 360 · 390 · 768 · 834 · 1024 · 1280 · 1440 sin scroll horizontal, y al 200 % de zoom.

## 6. Formulario, estimador, animaciones y accesibilidad
- **Formulario:** HANDOFF §7 completo. Sin red: el «envío» es un `setTimeout` de 1000 ms con el botón deshabilitado. Los datos viven solo en `sessionStorage` y se borran según §7.2.
- **Estimador:** HANDOFF §7.4 y CONTENT §8, como función pura probada por separado.
- **Animaciones:** `MOVIMIENTO.md`, con los tokens de duración y curva. Todo se apaga con `prefers-reduced-motion`, salvo la espera de «Enviando…».
- **Accesibilidad (WCAG 2.2 AA):**
  - HANDOFF §9;
  - enlace «Saltar al contenido»;
  - landmarks;
  - un `<h1>` por vista;
  - foco gestionado al cambiar de paso, al mostrar errores y en los diálogos;
  - `aria-live` en el rango;
  - objetivos táctiles ≥ 44 px (≥ 24 px en los enlaces de texto, con relleno);
  - `alt` según CONTENT §12.

## 7. QA y publicación
**QA (HANDOFF §12), con la evidencia en `QA.md`:**
- pruebas automáticas en `_qa/pruebas.html` (estimador, validación, persistencia, cabecera y pie consistentes, metadatos, enlaces internos);
- axe con 0 violaciones en las 13 páginas y en cada vista de Cotizar;
- recorrido solo con teclado;
- capturas en los 8 anchos;
- reducción de movimiento;
- Lighthouse en móvil (rendimiento ≥ 90; SEO afectado solo por `noindex`, que es lo esperado);
- regresión contra las pruebas manuales de Present.

**Publicación (Release, con aprobación aparte, D-039):**
1. Crear el repositorio `pivote` en tu cuenta habitual de GitHub y añadir el remoto. Se puede hacer al final del Build, pero sin publicar.
2. Hacer push de `main`, activar Pages desde `main`/raíz y esperar a que se despliegue.
3. **Smoke test en producción:**
   - las 13 páginas, la 404 en ruta anidada (T-3) y el formulario completo;
   - `noindex` presente;
   - la OG con la URL absoluta real (se fija en este paso).
4. Etiqueta `v1.0` y registro en `QA.md`, `ROADMAP.md` y `PROJECT_PROFILE.md`.
5. Pendiente para ti: la prueba en un teléfono real.

---

## 8. Qué NO incluye el Build
- Envío real del formulario, analítica y contacto activo (SCOPE › Deferred; `contacto.activo = false`).
- Cambios de diseño o de copy: cualquiera abre un Decision Conflict.
- La URL de autoría, hasta que la definas (D-038).
