# Movimiento e interacción — Pivote

Especificación para el código (D-031). En Figma se simula lo que Present permite; lo demás se documenta aquí.

**Principio:** el movimiento explica qué cambió y dónde. Es corto, sin rebotes, sin bucles y sin parallax. Si una animación no ayuda a entender el cambio, no se hace.

## 1. Tokens
| Token | Valor | Uso |
|---|---|---|
| `--dur-rapida` | 120 ms | hover, selección, cambio de color |
| `--dur-base` | 200 ms | acordeón, overlays, errores |
| `--dur-media` | 250 ms | cambio de paso, barra de progreso, cabecera |
| `--dur-lenta` | 320 ms | aparición al hacer scroll (máximo permitido) |
| `--ease-salida` | `cubic-bezier(0.2, 0, 0, 1)` | todo lo que entra o cambia |
| `--ease-entrada` | `cubic-bezier(0.4, 0, 1, 1)` | lo que sale (cierre de overlays) |

**Prohibido:**
- rebotes o `spring` con sobreimpulso;
- animaciones de más de 400 ms;
- loaders en bucle, salvo el estado «Enviando…»;
- animar el pilar del logo, salvo un giro único de entrada de ≤ 400 ms (MARCA §2);
- sacudir campos con error.

## 2. Reducción de movimiento
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

Con reducción activa:
- el contenido aparece sin desplazamiento (el reveal se desactiva y todo es visible desde el inicio);
- la navegación por anclas salta sin suavizado;
- «Enviando…» se mantiene 1 s, porque es feedback y no decoración.

## 3. Cabecera fija (sticky)
- `position: sticky; top: 0; z-index: 50`. Nunca tapa contenido: todas las secciones con ancla llevan `scroll-margin-top: var(--alto-cabecera-desplazada)` (escritorio 69 px, móvil 65 px; en Cotizar 57 px y 46 px).
- **Estados** (variantes `Scroll` del componente Cabecera en Figma):

| | Arriba (en el hero) | Desplazada (al pasar el hero) |
|---|---|---|
| Alto escritorio / móvil | 81 / 73 px (Cotizar 69 / 54) | 69 / 65 px (Cotizar 57 / 46) |
| Fondo | `--fondo-superficie` sólido | `--fondo-superficie` al 94 % + `backdrop-filter: blur(16px)` |
| Borde inferior | 1 px `--borde-sutil` | 1 px `--borde-sutil` |
| Sombra | ninguna | `0 4px 16px rgb(22 25 28 / 0.08)` |

- **Detección sin escuchar el scroll:** un `IntersectionObserver` sobre un centinela de 1 px al final del hero añade `data-scroll="desplazada"` a la cabecera cuando el centinela sale del viewport. En páginas sin hero (Cotizar), el centinela está a 8 px del inicio.
- Transición: `padding`, `background-color`, `box-shadow` en `--dur-media` `--ease-salida`. No se anima `height` directamente.
- Contraste: el texto de la cabecera siempre va sobre superficie clara (≥ 15.75:1). Sin soporte de `backdrop-filter`, el fondo pasa a opaco (`@supports not (backdrop-filter: blur(1px))`).

## 4. Interacciones
| Elemento | Qué pasa | Duración | En Figma |
|---|---|---|---|
| Botones, tarjetas, chips, contacto | hover: color de fondo o borde; `:active` baja 1 px (`translateY(1px)`) | 120 ms | ✅ variantes Hover (Smart Animate 150 ms) |
| Foco | anillo de 3 px `--foco-anillo`, solo con `:focus-visible`, sin transición | — | variantes Foco en el kit (Present no muestra el foco) |
| Opción (radio en tarjeta) | borde y fondo a seleccionado; el punto crece de `scale(.6)` a 1 | 120 ms | ✅ cambio de estado por variable (instantáneo) |
| Casilla | la marca aparece con opacidad 0 → 1 | 120 ms | ✅ instantáneo |
| Cambio de paso | el contenido nuevo entra con opacidad 0 → 1 y `translateY(8px)` → 0. El foco va al H1 del paso y se anuncia «Paso 2 de 4 · Tu local» | 250 ms | ✅ Smart Animate 250 ms |
| Barra de progreso | el tramo activo crece en ancho (`transform: scaleX`) | 250 ms | ✅ Smart Animate entre pasos |
| Errores | el resumen de errores y los mensajes aparecen con opacidad (sin sacudida). El foco va al resumen de errores | 150 ms | instantáneo (variables) |
| Panel «Tu solicitud» | el valor que cambia hace un fundido cruzado. El panel es `position: sticky; top: 88px` en escritorio | 150 ms | instantáneo (variables) |
| Resumen plegable (móvil y tablet) | se despliega con `grid-template-rows: 0fr → 1fr`; el chevron gira 180° | 200 ms | instantáneo (variable) |
| Acordeón (FAQ) | lo mismo que el resumen plegable, con `<details>/<summary>` o `aria-expanded` | 200 ms | ✅ Smart Animate 200 ms |
| Menú móvil | el panel baja desde arriba y el fondo se atenúa. El foco queda atrapado; se cierra con Esc | 250 ms | ✅ Move in desde arriba |
| Lista desplegable (distrito, fecha; área solo en el prototipo) | se abre pegada al campo (4 px debajo, mismo ancho): opacidad 0 → 1 y `translateY(-4px)` → 0. El campo muestra el anillo de foco y el chevron gira 180°. Cierre en 100 ms al elegir, al tocar fuera o con Esc; el foco vuelve al campo | 150 ms | apertura instantánea (cambio por variable) |
| Opción de lista | hover: fondo `--fondo-superficie-alt`; seleccionada: check azul y peso medio; foco de teclado: anillo interior de 2 px | 120 ms | ✅ variantes Hover (Smart Animate 120 ms), Seleccionada y Foco |
| Diálogos (solo «Salir sin enviar» y errores excepcionales) | el fondo aparece y el diálogo pasa de `scale(.98)` a 1 con opacidad. Cierre en 150 ms con `--ease-entrada` | 200 ms | ✅ fundido 200 ms |
| Hoja inferior (móvil, solo para listas largas; hoy ninguna) | sube desde abajo (`translateY(100%)` → 0) y el fondo se atenúa | 240 ms | — |
| Aviso de contacto | entra desde abajo y se cierra solo a los 6 s o con ✕ | 200 ms | ✅ Move in desde abajo |
| Enviar solicitud | el botón pasa a «Enviando…», queda deshabilitado con `aria-busy="true"` y muestra un indicador lineal discreto. Luego se reemplaza la vista por la confirmación | 1000 ms | ✅ variable `btn/enviar` + espera de 1000 ms |
| Confirmación | la marca de verificación y el título entran con opacidad y `translateY(8px)`. El foco va al H1 | 250 ms | ✅ fundido 300 ms |
| Comparador antes/después | arrastre directo del divisor (sin inercia) y flechas del teclado a pasos de 5 %. Sin animación salvo `--dur-rapida` al usar el teclado | 120 ms | variantes en código (el caso no está en HF) |
| Navegación por anclas | `scroll-behavior: smooth` (se desactiva con reducción de movimiento) | nativa | ✅ desplazamiento animado |
| Aparición al hacer scroll | secciones de Inicio: opacidad 0 → 1 y `translateY(12px)` → 0, una sola vez, con un `IntersectionObserver` al 15 % de visibilidad; en listas, retardo de 60 ms entre elementos (máximo 3). Nunca en el hero ni en el formulario | 320 ms | no se puede en Figma |

## 5. Reglas para el formulario (Cotizar)
- Los campos son reales: `inputmode="numeric"` en área y teléfono; `<select>` nativo para el distrito (43 distritos + Callao + Otro); `<input type="month">` para la fecha; `autocomplete="name"`, `tel-national` y `email`.
- **Selector personalizado** (solo si se estiliza en lugar del `<select>` nativo): patrón *combobox / listbox* de WAI-ARIA con `aria-expanded`, `aria-activedescendant` y `aria-selected`.
  - **Teclado:** ↑ ↓ mueven la opción activa, Inicio y Fin van a los extremos, Enter o Espacio eligen, Esc cierra sin cambiar y Tab cierra y sigue.
  - **Uso:** el foco vuelve al campo al cerrar. Clic o toque fuera cierra. En móvil se prefiere el `<select>` nativo.
- **Modales solo para interrupciones reales** (salir sin enviar, confirmaciones importantes, errores excepcionales). Nunca para elegir un valor.
- El estado vive en memoria y en `sessionStorage` (Atrás y Editar conservan las respuestas). No se envía nada (D-005).
- El doble envío se bloquea desde el primer toque de «Enviar solicitud».
