# Design Handoff — Pivote

**Estado:** preparado tras el High-Fi Freeze (D-033, 2026-09-24). **Pendiente de la revisión del usuario.** El Build no empieza hasta que lo apruebe y decida las cuestiones abiertas del §14.

**Para quién es:** quien construya el sitio (la sesión de Build) y el usuario, que lo revisa antes de autorizar el código.

---

## 0. Fuentes de verdad y prioridad
Si dos fuentes chocan, manda la primera de esta lista y se registra el conflicto en `DECISIONS.md`. No se resuelve en silencio.

1. **Decisiones aprobadas:** `DECISIONS.md`, hasta D-033.
2. **Copy:** `CONTENT.md` v1.0, con los cambios de D-031 y D-032. Todo texto visible sale de ahí; este documento no repite el copy, lo referencia.
3. **Diseño congelado:** Figma «Pivote — Estudio de espacios comerciales» (`bwWtTTnJSTklYl240LVNEZ`), páginas 04 UI Kit y 05 High Fidelity. El prototipo está en 05 (mapa en el §15).
4. **Marca:** `MARCA.md` (logo, paleta, roles, contrastes, tipografía y tono).
5. **Movimiento e interacción:** `MOVIMIENTO.md`.
6. **Este documento:** traduce todo lo anterior a decisiones de construcción.

**Regla del freeze:** el código no cambia pantallas, flujo, jerarquía, componentes ni copy aprobados. Las diferencias previstas entre el prototipo y el producto están en el §13 y no cuentan como cambios.

---

## 1. Qué se construye
Una web estática y responsive de un estudio conceptual (Reality Mode **Concept / Portfolio**, D-003) cuya acción principal es **cotizar un local**. El formulario es una simulación: valida, calcula un rango orientativo y confirma, pero **no envía ni guarda nada fuera de la pestaña** (D-005).

| Página | Diseño aprobado | Fuente del copy |
|---|---|---|
| Inicio | ✅ HF 1440 / 834 / 390 | CONTENT §2 |
| Cotizar (4 pasos + resumen + confirmación) | ✅ HF escritorio y móvil + revisión 1024 / 834 / 768 / 360 | CONTENT §7, §8 |
| Sobre este proyecto · Privacidad · 404 | ⚠️ Sin frames: son páginas de texto que se arman con componentes del kit | CONTENT §9, §10, §11 |
| Servicios · Proyectos (índice + 4 casos) · Cómo trabajamos · Estudio | ❌ **Sin wireframe ni HF** | CONTENT §3–§6 |

**Qué hacer con las páginas sin diseño → decisión abierta (§14.1).**

---

## 2. Stack y restricciones
- **HTML, CSS y JS planos, sin build, sin npm y sin módulos ES** (tu convención de siempre). Nombres de archivo, identificadores y comentarios en español.
- **Varias páginas HTML**, no un solo `index.html` con router por hash. Es una web pública y cada página necesita su `<title>`, su descripción y su OG. Es la misma excepción a tu convención que en Sereno.
- **Publicación:** GitHub Pages desde `main`/raíz. Todas las rutas relativas y `404.html` en la raíz.
- **Sin dependencias en tiempo de ejecución.** Solo Google Fonts: `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap`, con `preconnect`.
- **Sin analítica, cookies ni envío de datos** (SCOPE › Deferred). El estado del formulario vive en memoria y en `sessionStorage`.
- **Servidor local:** `python3 -m http.server 8080` (el manifest no funciona con `file://`).

### Estructura propuesta
```text
pivote/
├── index.html · cotizar.html · sobre.html · privacidad.html · 404.html
├── (según §14.1) servicios.html · proyectos.html · proyectos/<caso>.html · como-trabajamos.html · estudio.html
├── css/estilos.css      # 1 tokens · 2 base · 3 componentes · 4 páginas · 5 utilidades
├── js/config.js         # contacto y autor (D-023, D-026): la única configuración editable
├── js/sitio.js          # cabecera fija, menú móvil, acordeón, aviso de contacto, aparición al hacer scroll
├── js/estimador.js      # función pura del rango (§7.4), sin DOM
├── js/cotizar.js        # estado, pasos, validación, resumen, envío simulado
├── assets/logos/ · assets/fotos/   # ya existen (§11)
└── _qa/pruebas.html     # pruebas del estimador y de la validación, como en Sereno
```

---

## 3. Tokens (CSS custom properties)
Los nombres coinciden con la sintaxis de código ya cargada en las variables de Figma. **Ningún valor suelto en los componentes:** si falta algo, falta un token.

### 3.1 Color (colección `Color`, 27 tokens semánticos)
| Token | Valor | Token | Valor |
|---|---|---|---|
| `--color-fondo-pagina` | `#F3F2EE` | `--color-accion-primaria` | `#2A3FD6` |
| `--color-fondo-superficie` | `#FFFFFF` | `--color-accion-primaria-hover` | `#1F31B0` |
| `--color-fondo-superficie-alt` | `#E3E8E2` | `--color-accion-sobre-primaria` | `#FFFFFF` |
| `--color-fondo-oscuro` | `#1E4B3E` | `--color-accion-enlace` | `#2A3FD6` |
| `--color-texto-principal` | `#16191C` | `--color-accion-enlace-sobre-oscuro` | `#C7D2FF` |
| `--color-texto-secundario` | `#5A6066` | `--color-accion-inversa` | `#F3F2EE` |
| `--color-texto-inverso` | `#F3F2EE` | `--color-tecnico-linea` | `#5A6066` |
| `--color-texto-inverso-secundario` | `#A8B8B0` | `--color-tecnico-linea-sobre-oscuro` | `#A8B8B0` |
| `--color-borde-sutil` | `#CBD0C9` | `--color-marca-tinta` | `#16191C` |
| `--color-borde-control` | `#5A6066` | `--color-marca-pilar` | `#2A3FD6` |
| `--color-material-acento` | `#C98A2B` (solo barras de 14 × 3) | `--color-marca-tinta-sobre-oscuro` | `#F3F2EE` |
| `--color-estado-error` | `#B3261E` | `--color-marca-pilar-sobre-oscuro` | `#C7D2FF` |
| `--color-estado-exito` | `#1F7A4D` | `--color-foco-anillo` | `#16191C` |
| | | `--color-foco-anillo-sobre-oscuro` | `#F3F2EE` |

Los roles son estrictos (MARCA §3):
- azul solo para acción, enlaces funcionales, estado seleccionado y el pilar del logo;
- verde solo en bloques de peso;
- latón solo en barras decorativas;
- nunca bloques grandes de azul y verde contiguos.

### 3.2 Espaciado y radio
- `--esp-4 … --esp-128`: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128.
- `--radio-0: 0` · `--radio-control: 2px` · `--radio-tarjeta: 4px`. No hay radios mayores: nada de «contenedores de app».

### 3.3 Tipografía (colección `Tipografía`, modos por ancho)
| Estilo | Familia y peso | Escritorio ≥ 1024 | Tablet 600–1023 | Móvil < 600 | Tracking | Caja |
|---|---|---|---|---|---|---|
| Display/L | Archivo 600 | 56/60 | 48/52 | 36/40 | −2.5 % | — |
| Heading/L | Archivo 600 | 36/42 | 32/38 | 28/34 | −1.5 % | — |
| Heading/M | Archivo 600 | 28/34 | 26/32 | 24/30 | −1 % | — |
| Heading/S | Archivo 600 | 20/26 | 20/26 | 18/24 | −0.5 % | — |
| Body/L | Archivo 400 | 18/28 | 18/28 | 17/26 | 0 | — |
| Body/M | Archivo 400 | 16/24 | 16/24 | 16/24 | 0 | — |
| Body/S | Archivo 400 | 15/22 | 15/22 | 15/22 | 0 | — |
| Label/M | Archivo 500 | 16/22 | 16/22 | 16/22 | 0 | — |
| Label/S | Archivo 500 | 14/20 | 14/20 | 14/20 | 0 | — |
| Mono/S | IBM Plex Mono 500 | 13/18 | 13/18 | 13/18 | +4 % | MAYÚSCULAS |
| Mono/XS | IBM Plex Mono 400 | 12/16 | 12/16 | 12/16 | +2 % | — |

Mínimos de D-031: ningún texto funcional por debajo de 12 px; etiquetas de campo en Label/M. Los tamaños cambian con media queries en los tres cortes. No hace falta `clamp()`, porque Figma define valores discretos.

### 3.4 Efectos, capas y movimiento
- `--sombra-dialogo: 0 12px 32px rgb(22 25 28 / .18), 0 2px 6px rgb(22 25 28 / .08)` (estilo `Elevación/Diálogo`: diálogos y listas desplegables).
- `--sombra-cabecera: 0 4px 16px rgb(22 25 28 / .08)` (solo la cabecera desplazada).
- **Capas:** cabecera 50 · barra fija de Cotizar 40 · lista desplegable 30 · menú móvil y diálogos 100 · aviso de contacto 110.
- **Duraciones y curvas:** `MOVIMIENTO.md` §1.

---

## 4. Layout y cortes
| Corte | Ancho | Márgenes laterales | Contenedor |
|---|---|---|---|
| Móvil | < 600 | 16 px | fluido |
| Tablet | 600–1023 | 40 px | fluido |
| Escritorio | ≥ 1024 | 40 px hasta 1279; desde 1280, centrado | máximo 1200 px |

- Hay que comprobarlo sin scroll horizontal desde 320 px.
- **Referencias HF:** Inicio en 1440, 834 y 390; Cotizar en 1440, 1024, 834, 768, 390 y 360.

### 4.1 Inicio: ritmo vertical (padding superior / inferior de cada sección)
| Sección | Escritorio | Tablet | Móvil | Fondo |
|---|---|---|---|---|
| 01 Hero | 72 / 96 | 40 / 64 | 28 / 48 | página |
| 02 Para tu rubro | 40 / 96 | 16 / 72 | 8 / 56 | página |
| 03 Lo que resolvemos | 96 / 96 | 72 / 72 | 72 / 56 | superficie (blanco) |
| 04 Proyectos | 96 / 96 | 72 / 72 | 72 / 56 | página |
| 05 Servicios | 96 / 96 | 72 / 72 | 72 / 56 | superficie (blanco) |
| 06 Cómo trabajamos | 96 / 96 | 72 / 72 | 72 / 56 | oscuro (verde) |
| 07 Preguntas frecuentes | 96 / 96 | 72 / 72 | 72 / 56 | página |
| 08 CTA final | 80 / 80 | 64 / 64 | 48 / 48 | superficie-alt, verde yeso (D-029 §2) |

- **Separación entre el encabezado de sección y su contenido:** 40 px en escritorio, 32 en tablet y 24 en móvil.
- **Composición por sección** (escritorio → tablet → móvil):
  - **Hero:** 2 columnas separadas 72 px → una columna con la foto debajo → igual, con los botones apilados.
  - **Rubros:** 4 tarjetas separadas 24 px → 2 × 2 con 16 px → 2 × 2 con 12 px.
  - **Lo que resolvemos:** 2 columnas separadas 96 px → lista → lista.
  - **Proyectos:**
    - escritorio: caso destacado a 2 columnas (48 px) + 3 tarjetas separadas 24 px;
    - tablet: comparador antes/después + lista + tarjetas en 2 columnas;
    - móvil: comparador + carrusel horizontal con scroll-snap.
  - **Servicios:** 3 tarjetas de igual alto → 2 + 1 → apiladas.
  - **Cómo trabajamos:** 5 pasos en fila → 2 o 3 por fila → apilados.
  - **FAQ:** 2 columnas separadas 96 px → una columna.
- **Anclas** (ids propuestos para las secciones a las que salta el menú en el prototipo): `#servicios`, `#proyectos`, `#como-trabajamos`, `#preguntas`. Todas con `scroll-margin-top` igual al alto de la cabecera desplazada.

### 4.2 Cotizar (D-031 §1)
- **≥ 1024:**
  - contenedor de 1200 como máximo;
  - tarjeta del formulario (768 px en 1440; flexible en 1024) + panel «Tu solicitud» (400 px; 320 en 1024) alineados arriba, con 32 px entre ellos (24 en 1024);
  - la tarjeta tiene padding de 48 (40 en 1024), fondo de superficie, borde sutil y radio de tarjeta;
  - el panel es `position: sticky; top: 88px`.
- **600–1023:** una columna de 640 como máximo, centrada. El resumen «Tu solicitud» es plegable bajo la cabecera y la barra de acciones queda fija abajo.
- **< 600:** lo mismo con márgenes de 16. El contenido deja espacio bajo la barra fija (padding inferior de 96).
- **Opciones visibles:** cuadrícula de 3 columnas si la etiqueta es corta (≤ 16 caracteres y cada celda mide ≥ 210 px), 2 si es media y 1 si es larga. Todas del mismo alto; en móvil, siempre una columna.
- **Acciones del paso:** separadas por una línea superior, con «Atrás» a la izquierda y la acción principal a la derecha. En móvil, en la barra fija: «Atrás» + la acción principal a todo el ancho restante.

### 4.3 Cabecera
| | Arriba | Desplazada |
|---|---|---|
| Sitio escritorio / móvil | 81 / 73 px | 69 / 65 px |
| Cotizar escritorio / móvil | 69 / 54 px | 57 / 46 px |

- Comportamiento completo en `MOVIMIENTO.md` §3: sticky, detección con `IntersectionObserver` y alternativa sin `backdrop-filter`.
- **En Cotizar:** logo + «Salir sin enviar ✕» («Salir ✕» en móvil). En la confirmación, el enlace de salir se oculta.

---

## 5. Componentes (Figma › 04 UI Kit → HTML)
Estados de referencia: Default, Hover, Foco, Deshabilitado y los específicos de cada componente. **El foco es siempre un anillo de 3 px `--color-foco-anillo` con `:focus-visible`** (el claro sobre fondo oscuro).

| Componente | Elemento / ARIA | Estados y notas |
|---|---|---|
| Botón (Primario, Secundario, Inverso, Enlace) | `<a>` si navega, `<button>` si actúa | 48 px de alto (Enlace: 34). Cargando = «Enviando…», `disabled` + `aria-busy`. Ícono opcional a la derecha |
| Campo (texto / selector) | `<label>` visible + `<input>` / `<select>`; ayuda y error con `aria-describedby` | Caja de 52 px. En error, `aria-invalid="true"` y mensaje debajo en `--color-estado-error` con ícono de alerta. Sufijo «m²» dentro de la caja |
| Opción (radio card) | `<fieldset>` + `<legend>` + `<input type="radio">` visualmente oculto | 52 px, radio de 20 px, sin cambio de tamaño al seleccionar (borde con `box-shadow` o `outline`, no con `border-width`). Seleccionada: borde y punto en azul, fondo superficie-alt |
| **Opción de lista** / **Lista desplegable** (D-032) | `<select>` nativo (recomendado) o combobox/listbox WAI-ARIA | 44 px por opción, ✓ azul en la seleccionada, hover en superficie-alt. Se abre 4 px bajo la caja con el mismo ancho. Teclado en `MOVIMIENTO.md` §5 |
| Casilla | `<input type="checkbox">` + `<label>` | Caja de 22 px, fila de 44 px, estado de error |
| Progreso | `<ol>` con `aria-current="step"` + texto «Paso 2 de 4 · Tu local» | 4 tramos; el activo, en azul |
| Carga de archivo | `<input type="file" accept=".jpg,.jpeg,.png,.pdf">` | Solo muestra «nombre · se adjuntaría a tu solicitud». No lee el archivo ni lo guarda |
| Panel «Tu solicitud» | `<aside aria-label="Tu solicitud">` | Filas de rubro, servicio y local + «Qué pasa después» |
| Fila de resumen | `<dl>` con «Editar» (`<a>` al paso) | Sección, valor, Editar |
| Rango orientativo | `<section>` con `aria-live="polite"` en la cifra | Cifra en Display, explicación y «¿Cómo lo calculamos?» (panel con el texto de CONTENT §8.1) |
| Aviso (Errores, Presupuesto, Concepto) · Aviso breve | Errores: `role="alert"` + enlaces a cada campo. Presupuesto y concepto: texto informativo | El resumen de errores recibe el foco al intentar continuar |
| Diálogo | `<dialog>` con `showModal()` | Solo «Salir sin enviar», confirmaciones importantes y errores excepcionales (D-032). Esc y tocar el fondo cierran; el foco vuelve al disparador |
| Contacto (en concepto) | `<button>` que abre el aviso (D-023) | Aviso `role="status"`, se cierra a los 6 s o con Esc; el foco no se mueve |
| Cabecera · Menú móvil | `<header>` + `<nav>`; el menú, con `aria-expanded` y foco atrapado | Variantes Arriba y Desplazada |
| Pie | `<footer>` | Aviso de concepto discreto (CONTENT §1) |
| Antetítulo · Etiqueta · Cota · Anotación | `<p>` / `<span>` con estilo Mono. La barra de latón es decorativa (`aria-hidden`) | La anotación usa un cuadrado hueco en tinta, nunca el cuadrado azul |
| Tarjeta de rubro · de servicio · de proyecto | `<article>` con un único enlace que cubre la tarjeta | Todo lo clicable lleva al mismo destino. Tarjetas de servicio de igual alto |
| Fila de problema + Mini-plano | `<li>` + SVG en línea (`aria-hidden`) | 5 mini-planos |
| Paso de proceso | `<li>` en `<ol>` | Sobre verde: textos inversos |
| Acordeón | `<details>/<summary>` | Animación en `MOVIMIENTO.md` |
| Comparador antes/después | `<input type="range">` sobre dos imágenes | Teclado a pasos del 5 % |
| Chip de filtro | `<button aria-pressed>` | Página Proyectos (§14.1) |
| Ícono | SVG en línea de Lucide 1.48 (ISC), `viewBox="0 0 24 24"`, `aria-hidden` | Trazo `currentColor`. WhatsApp usa el ícono «mensaje»; sin logos de marca |
| Logo | SVG de `assets/logos/svg/` | Logotipo ≥ 80 px de ancho; con descriptor ≥ 200 px |

---

## 6. Inicio
- **Copy:** CONTENT §2.1–§2.8, en ese orden. El `<h1>` es el titular aprobado (D-022).
- **Interacciones** (las mismas que el prototipo):

| Elemento | Destino o acción |
|---|---|
| «Cotizar mi local» (cabecera, hero, CTA final) | `cotizar.html`, con el estado de Cotizar vacío |
| «Cotizar este servicio» | `cotizar.html?servicio=diagnostico\|proyecto\|obra` (servicio preseleccionado) |
| «Ver proyectos» y tarjetas de rubro | `#proyectos` hasta que exista la página Proyectos (§14.1). Después: `proyectos.html?rubro=…` |
| Menú (Servicios, Proyectos, Cómo trabajamos) | anclas del §4.1 hasta que existan sus páginas |
| WhatsApp, correo, Instagram, «¿Otra duda?» | aviso de contacto (D-023) |
| FAQ | acordeón; varias preguntas pueden estar abiertas a la vez |

---

## 7. Cotizar
### 7.1 Flujo
Paso 1 Rubro → 2 Tu local → 3 Plazo y presupuesto → 4 Contacto → Resumen → *Enviando…* (1000 ms) → Confirmación.

- Cada vista lleva un hash (`#paso-1 … #paso-4`, `#resumen`, `#confirmacion`) para que el botón Atrás del navegador funcione.
- **Al cambiar de vista:** foco en el `<h1>` y `document.title` actualizado.
- **«Salir sin enviar»:** abre el diálogo de CONTENT §7.0 solo si hay datos. «Salir» borra el estado y vuelve a Inicio.

### 7.2 Estado (espejo de las variables del prototipo)
```js
// sessionStorage['pivote.cotizacion']
{
  rubro: null,            // 'cafeteria' | 'tienda' | 'botica' | 'salon' | 'otro'
  rubroOtro: '',          // campo «¿Cuál?» cuando rubro === 'otro'
  servicio: null,         // 'diagnostico' | 'proyecto' | 'obra' | 'nose'
  area: null,             // número en m²
  distrito: null,         // uno de los 43 distritos de Lima, 'Callao' u 'Otro'
  estado: null,           // 'vacio' | 'funcionamiento' | 'sinlocal'  (obligatorio, DC-002)
  centroComercial: 'no',  // 'si' | 'no'  (preseleccionado, D-029 §4)
  fecha: null,            // 'AAAA-MM', o null con sinFecha
  sinFecha: false,
  cierre: null,           // 'total' | 'noche' | 'abierto'  (sin respuesta = c 1.00)
  presupuesto: null,      // 'hasta20' | '20a50' | '50a100' | 'mas100' | 'nd'
  archivo: null,          // solo el nombre
  nombre: '', negocio: '', telefono: '', correo: '',
  preferencia: 'whatsapp',// 'whatsapp' | 'llamada' | 'correo'
  privacidad: false
}
```
- **Se borra** al pulsar «Salir», al entrar desde un CTA de Inicio, al pulsar «Nueva cotización» y al cerrar la pestaña (CONTENT §10). Atrás y Editar lo conservan.

### 7.3 Validación (mensajes exactos en CONTENT §7.1–§7.4)
| Paso | Obligatorio | Reglas |
|---|---|---|
| 1 | rubro, servicio | «Otro» muestra «¿Cuál?» (opcional) |
| 2 | área, distrito, estado | Área: vacía → error; < 10 → error; > 1,000 → aviso que **no bloquea** (se sigue sin rango). Solo números; se admiten decimales con coma o punto |
| 3 | — | Fecha pasada → error. Menos de 8 semanas con diseño + obra → aviso que no bloquea |
| 4 | nombre, teléfono, privacidad | Teléfono: 9 dígitos que empiezan con 9 (se ignoran espacios; prefijo +51 fijo). Correo obligatorio solo si la preferencia es «Correo», con formato válido |

- **Momento:** se valida al intentar continuar; después de un primer error, también al salir de cada campo.
- **Resumen de errores:** arriba del paso, con enlaces a cada campo y el texto del paso 2 de DC-002.

### 7.4 Estimador (`js/estimador.js`, función pura)
Fórmula, factores y fuentes en **CONTENT §8** (congelada).

**Redondeo** (mínimo y máximo por separado, al más cercano): x < 10,000 → a 100; x ≤ 20,000 → a 500; si no, a 1,000.

**Casos especiales:**
- **«Aún no lo sé»:** la cifra es la de diseño + obra; la explicación añade «Si solo es el proyecto de diseño: S/ x – y».
- **Estado «Aún no tengo local»** (con diseño + obra o «Aún no lo sé»): referencia por m²: `S/ redondeo10(1020·r) – redondeo10(1560·r) por m²`. Son las tarifas de diseño + obra de CONTENT §8, tal como se aprobaron en el prototipo.
- **Área fuera de 10–1,000:** sin cifra, con el texto de CONTENT §7.5.
- **Cierre sin respuesta:** c = 1.00.
- **Aviso de presupuesto:** si el tope del presupuesto elegido (20,000 / 50,000 / 100,000) es menor que el mínimo del rango. «Más de 100,000» y «Prefiero no decirlo» nunca lo muestran.

**Pruebas obligatorias en `_qa/pruebas.html`** (valores de CONTENT §8.1 y del prototipo):
| Entrada | Esperado |
|---|---|
| 48 · cafetería · diseño + obra · vacío · noche · calle | S/ 77,000 – 118,000 |
| 48 · botica · proyecto de diseño | S/ 3,700 – 5,800 |
| 32 · tienda · diseño + obra · en funcionamiento · abierto | S/ 40,000 – 61,000 |
| 60 · salón · diseño + obra · vacío · centro comercial | S/ 83,000 – 126,000 |
| 40 · tienda · diagnóstico | S/ 900 – 1,300 |
| 120 · cafetería · diagnóstico | S/ 2,400 – 3,400 |
| 30 · tienda · diseño + obra · en funcionamiento · cierre total | S/ 32,000 – 49,000 |
| 90 · salón · diseño + obra · vacío · abierto · centro comercial | S/ 147,000 – 225,000 |
| cafetería · aún sin local | S/ 1,330 – 2,030 por m² |

**Formato:** `S/ 77,000 – 118,000` (coma de miles, guion corto con espacios). No usar `toLocaleString` sin fijar el locale, porque cambia según el navegador.

### 7.5 Resumen, envío y confirmación
- **Filas del resumen** (formato del prototipo):
  - «Cafetería · Diseño + obra»;
  - «48 m² · Miraflores · local vacío · a la calle»;
  - «Marzo 2027 · obra de noche · S/ 20,000 – 50,000» («Sin fecha · …» si no hay fecha);
  - «{nombre} · {teléfono} · {preferencia}».
- **«Enviar solicitud»:** al primer toque se deshabilita, muestra «Enviando…» y bloquea el doble envío. A los 1000 ms reemplaza la vista por la confirmación. No hay petición de red.
- **Confirmación:** CONTENT §7.6–§7.7, con el resumen corto «{rubro} · {m²} m² · {distrito} · {servicio}» y el rango. Botones:
  - «Volver al inicio»: `index.html`, borra el estado;
  - «Nueva cotización»: paso 1, borra el estado.
- **Error inesperado** (CONTENT §7.5): no se simula, pero el componente existe por si un día hay envío real.

---

## 8. Movimiento e interacción
Todo en `MOVIMIENTO.md`: tokens, `prefers-reduced-motion`, cabecera fija, tabla de interacciones, listas desplegables y teclado. **Máximo 400 ms, sin rebotes ni bucles**; la aparición al hacer scroll nunca afecta al hero ni al formulario.

---

## 9. Accesibilidad (objetivo WCAG 2.2 AA)
- Solo pares de color medidos en MARCA §3. El latón nunca lleva texto.
- **Objetivos táctiles:** botones de 48, opciones de 52, casilla de 44 y enlaces de ≥ 34. «Salir ✕», «Editar» y los enlaces del pie, con relleno para llegar a ≥ 44 × 44.
- Un `<h1>` por vista; landmarks `header`, `nav`, `main`, `aside`, `footer`; enlace «Saltar al contenido».
- **Formularios:** etiquetas visibles, `autocomplete` (`name`, `organization`, `tel-national`, `email`), `inputmode="numeric"` en área y teléfono, errores enlazados con `aria-describedby`.
- **Foco:** visible siempre. Se gestiona al cambiar de paso, al mostrar errores, al abrir y cerrar diálogos y al llegar a la confirmación.
- **Anuncios:** «Paso 2 de 4 · Tu local» al cambiar de paso; la cifra del rango en una región `aria-live`; el aviso de contacto con `role="status"`.
- **Reducción de movimiento** y **zoom al 200 %** sin pérdida de contenido; sin scroll horizontal desde 320 px.
- Todas las imágenes de contenido con `alt` (§11.2); las decorativas, con `alt=""`.

---

## 10. Contenido, configuración y SEO
- **Copy:** `CONTENT.md`. Si hace falta un texto que no está ahí, se propone y se aprueba antes (regla del freeze).
- **`js/config.js`** (D-023, D-026):
  ```js
  const CONFIG = {
    contacto: { activo: false, whatsapp: null, correo: null, instagram: null,
                mensajePrellenado: 'Hola, quiero cotizar mi local ({rubro}, {m²} m²)' },
    autor: { nombre: 'Matías', url: '' }   // «Ver portafolio →» solo se muestra si url no está vacío
  };
  ```
  Pasar a Client o Production = completar estos datos y poner `activo: true`, sin tocar componentes.
- **Aviso de concepto solo en 3 lugares** (CONTENT §1): pie, «Sobre este proyecto» y confirmación. Sin etiquetas «demo».
- **SEO:**
  - `<title>` y meta descripción de CONTENT §1 (Metadatos);
  - `lang="es-PE"`, `canonical` relativo al dominio final, Open Graph y Twitter Card;
  - favicons y `site.webmanifest` de `assets/logos/favicon/`;
  - la indexación y la imagen OG son decisiones abiertas (§14.2 y §14.3).

---

## 11. Assets
### 11.1 Logos
`assets/logos/` (ver su `LEEME.md`):
- 16 SVG con el texto convertido a trazado (logotipo, con descriptor, horizontal y monograma, en positivo, negativo y mono);
- PNG de 512–1600 px;
- `favicon.ico` (16/24/32), `favicon.svg` con fondo propio, `apple-touch-icon.png`, íconos 192/512 y maskable;
- `site.webmanifest`.

**Uso:**
- cabecera: logotipo SVG en positivo;
- pie sobre verde: logotipo + descriptor en negativo;
- no animar el pilar (MARCA §2).

### 11.2 Fotos
`assets/fotos/`: 6 JPG de 1400 px de ancho y 148–576 KB. Créditos en `CREDITOS.md`, que se muestran en «Sobre este proyecto».

- **Para el Build:** generar versiones de 700 y 1400 px (`sips -Z`), servir con `srcset`/`sizes`, `loading="lazy"` salvo la del hero (`fetchpriority="high"`), y `width`/`height` explícitos para no mover el layout.
- **Pie de foto de los casos:** «Foto de referencia» (CONTENT §4).
- **Texto alternativo — PROPUESTA, requiere aprobación** (CONTENT no lo define):

| Archivo | `alt` propuesto |
|---|---|
| `interior-madera-continua.jpg` (hero) | «Local revestido de madera clara, con repisas iluminadas y un mueble curvo; una persona lo cruza caminando.» |
| `botica-estante.jpg` | «Una farmacéutica toma una caja de un estante de medicamentos ordenado por categorías.» |
| `floreria-mostrador.jpg` | «Mostrador de madera con vitrina, flores secas y un balde de flores frescas en primer plano.» |
| `barberia-salon.jpg` | «Barbería con sillones en fila e iluminación puntual en el techo; un trabajador barre el piso.» |
| `cafeteria-barra.jpg` | «Barra de café con máquina de espresso y molinos frente a ventanales altos, en un local de ladrillo.» |
| `boutique-repisas.jpg` (reserva) | «Tienda con repisas blancas flotantes, accesorios en exhibición y un perchero de ropa clara.» |

---

## 12. QA del Build (Definition of Done)
1. **Responsive:** sin desbordes ni textos cortados en 320, 360, 390, 768, 834, 1024, 1280 y 1440. Comparación a ojo contra los frames de Figma › 05.
2. **Pruebas automáticas** en `_qa/pruebas.html`: los 9 casos del estimador, las reglas de validación del §7.3 y la persistencia (Atrás, Editar, Salir, Nueva cotización).
3. **axe:** 0 violaciones en todas las páginas. Recorrido completo del formulario **solo con teclado**.
4. **Lighthouse (móvil):** rendimiento ≥ 90; accesibilidad, buenas prácticas y SEO = 100 (salvo la penalización de SEO por `noindex`, si se elige, §14.2).
5. **Reducción de movimiento** activada: no hay desplazamientos y el contenido es visible.
6. **Contenido:** ningún número, correo, dirección ni teléfono inventado. El aviso de concepto aparece solo en los 3 lugares. No hay `toLocaleString` sin locale.
7. **Enlaces:** 0 rotos; `404.html` probado en GitHub Pages.
8. **Regresión con el prototipo:** se repiten en el navegador las pruebas de `QA.md` (HIGH-FI UX REFINEMENT y Ajuste de selectores).
9. **Registro:** `QA.md` guarda la evidencia de cada punto: qué se ejecutó y su resultado.

---

## 13. Diferencias previstas entre prototipo y producto (no son cambios)
| En el prototipo de Figma | En el producto |
|---|---|
| Área: lista de valores de ejemplo | `<input>` numérico con las reglas del §7.3 |
| Distrito: 5 opciones | `<select>` con los 43 distritos de Lima + Callao + Otro |
| Fecha: 4 meses | `<input type="month">` con mínimo en el mes actual |
| Nombre y teléfono: un toque escribe un valor de prueba | inputs reales |
| «Otro» (rubro) no abre un campo | abre «¿Cuál?» (CONTENT §7.1) |
| Cabecera siempre en estado Desplazada | Arriba → Desplazada al pasar el hero |
| Cambios de estado instantáneos (selección, errores, listas, panel) | transiciones de `MOVIMIENTO.md` |
| Sin aparición al hacer scroll ni teclado | los dos implementados |
| Estimador precalculado para 4 áreas | función con cualquier área válida |
| Enlaces a páginas fuera del HF no navegan | navegan a sus páginas cuando existan (§14.1) |

---

## 14. Cuestiones abiertas (decide el usuario antes del Build)
1. **Páginas sin diseño** (Servicios, Proyectos + 4 casos, Cómo trabajamos, Estudio). D-006 dice «Figma antes del código».
   - **A.** Wireframe + HF en Figma antes de construirlas (fiel a D-006; más tiempo).
   - **B.** Construirlas en código con los componentes congelados y aprobarlas en el navegador.
   - **C — recomendada.** Build en dos tramos. Primero Inicio, Cotizar, Sobre, Privacidad y 404, que tienen diseño o son solo texto; los enlaces a las demás páginas apuntan a las anclas de Inicio. En paralelo, diseñar en Figma las 4 plantillas que faltan (Servicios, índice de Proyectos, caso y Cómo trabajamos/Estudio) y construirlas después de aprobarlas.
2. **Indexación:**
   - `noindex` mientras sea un concepto (**recomendado**: evita que un negocio real encuentre un estudio que no existe al buscar servicios en Lima; Sereno usó `noindex`);
   - o indexable, con el aviso actual.
3. **Imagen OG (1200 × 630):** no está diseñada. Propuesta: fondo papel + logotipo horizontal + H1, generada desde un frame nuevo en Figma. Requiere aprobación.
4. **Textos alternativos** del §11.2: aprobar o corregir.
5. **URL de autoría:** sigue pendiente. El enlace no se muestra mientras esté vacía (D-026).
6. **Publicación:** repositorio y URL. Propuesta: repositorio público `pivote` en tu cuenta de GitHub, como Sereno. Publicar se aprueba aparte, después del Build.
7. **Nombre del archivo de Figma:** sigue siendo «Nexo…». Hay que renombrarlo a mano; la API no puede.

---

## 15. Mapa de Figma
Archivo: https://www.figma.com/design/bwWtTTnJSTklYl240LVNEZ — página **05 High Fidelity**.

| Sección | Frames (id) |
|---|---|
| Inicio · Escritorio, Tablet, Móvil | 1440 `36:2` · 834 `39:635` · 390 `38:340` |
| Cotizar · Escritorio | 1 Rubro `40:946` · 2 Tu local `40:1023` · 3 Plazo y presupuesto `40:1112` · 4 Contacto `40:1195` · 5 Resumen `41:1168` · 7 Confirmación `41:1273` |
| Cotizar · Móvil | 1 `42:1315` · 2 `42:1395` · 3 `42:1485` · 4 `42:1570` · 5 `42:1653` · 7 `42:1756` |
| Overlays | Salir sin enviar `43:1550` / `43:1565` · Contacto inactivo `43:1580` / `43:1588` · Menú móvil `43:1596` |
| Overlays · Envío | Espera de 1 s, escritorio `69:1789` y móvil `69:1791` |
| Cabecera (demo) | Arriba `73:2066` · Desplazada `73:2084` |
| Cotizar · Revisión responsive | 1024 · 834 · 768 · 360 (estáticos) |

- **Flujos de Present:** «Escritorio · Inicio → Cotizar», «Móvil · Inicio → Cotizar» y «Demo · Cabecera al desplazar».
- **UI Kit** (página 04): 30 componentes (el Logo está en la página 01), incluidos «Opción de lista» `80:104` y «Lista desplegable» `80:106`.
- **Variables:** `Color`, `Espaciado`, `Radio` y `Tipografía` (tokens del producto); `Prototipo`, que es solo la lógica del prototipo y no se traslada tal cual.
