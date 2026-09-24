# Marca — Pivote

**Brand Gate aprobado el 2026-09-24.** Congelados: naming, concepto y construcción del logo, tipografías y roles cromáticos (D-020). Cualquier cambio importante abre un Decision Conflict.

## 1. Nombre
- **Pivote** · descriptor: **Estudio de espacios comerciales** (D-013).
- **Concepto:** la puerta pivotante gira sobre un punto fijo. Un negocio que se renueva también gira sobre lo que ya es. Movimiento con un eje estable: cambiar el local sin perder el negocio.

## 2. Logo · dirección D2 (aprobada y cerrada, D-017)

### Construcción
- **Logotipo:** «pivote» en minúsculas, Archivo SemiBold, tracking −3 %. El punto de la «i» es un **pilar cuadrado** de lado *a* (el grosor del fuste), separado 0,55 *a* de la altura de x.
- **Monograma:** P sobre una retícula de 100 u.
  - fuste de 20 u;
  - cuerpo concéntrico con el pilar (radio exterior 32 u, interior 14 u);
  - banda del cuerpo igual al fuste;
  - pilar de 12 u en el centro de giro.
- **Azul solo en el pilar.**

### Versiones y archivos (`assets/logos/`, ver su LEEME.md)
| Versión | Uso | Mínimo en pantalla |
|---|---|---|
| Logotipo | Principal | 80 px de ancho |
| Logotipo + descriptor | Firma: pie, OG, PDF | 200 px |
| Horizontal | Presentaciones, portada de caso | 320 px (por debajo, logotipo solo) |
| Monograma | Favicon, avatar, sello | 16 px |

- **Impreso:** logotipo ≥ 20 mm.
- **Tonos:** positivo, negativo, mono positivo, mono negativo.
- **Formatos:** SVG con el texto convertido a trazado; PNG transparentes.

### Área de protección
- **Logotipo:** x = altura de x, libre en los cuatro lados.
- **Monograma:** 0,25 del lado.

### Favicon
- **Dibujo a mano por tamaño:** 16 px píxel a píxel (fuste de 3 px, bandas de 2 px, pilar de 2 × 2); 24 y 32 px con rectas en píxeles enteros.
- **Siempre con fondo propio:** un cuadrado de esquinas rectas, papel en modo claro y verde botella en oscuro. Motivo: el transparente desaparecía en pestañas oscuras.
- **Legibilidad comprobada** a tamaño real en pestañas claras y oscuras.

### Reglas de uso
- ✅ Sobre papel, blanco, verde botella, tinta o foto con velo oscuro (≥ 55 %).
- ✅ El pilar en azul (`#2A3FD6`), o en azul claro (`#C7D2FF`) sobre fondos oscuros; en mono, del color del logotipo.
- ❌ Arcos, órbitas o flechas alrededor del pilar (se lee como «cargando»).
- ❌ Inclinar, poner en cursiva, deformar o añadir trazos de velocidad (se lee como deporte).
- ❌ Contenedores redondeados tipo app.
- ❌ La P sobre un recuadro azul (se lee como señal de estacionamiento).
- ❌ Pilar en verde o latón; pilar redondo.
- ❌ Animar el pilar en bucle. Se permite un giro único de entrada, de 400 ms como máximo, y se desactiva con `prefers-reduced-motion`.

## 3. Color · V4 Fachada + Latón (aprobada, D-018 y D-019)

### Jerarquía estricta
| Rol | Color | Uso exclusivo |
|---|---|---|
| Acción | Azul cianotipo `#2A3FD6` · hover `#1F31B0` · sobre oscuro `#C7D2FF` | CTA principal, enlaces funcionales, estado seleccionado, barra de progreso, pilar del logo |
| Peso | Verde botella `#1E4B3E` | Bloques oscuros (proceso, pie, CTA final), superficies de fachada y materialidad |
| Acento | Latón `#C98A2B` | Solo barras cortas de 14 × 3 junto a antetítulos o etiquetas. Nunca texto, fondo, cuadrado ni borde |
| Estructura | Papel `#F3F2EE` · blanco `#FFFFFF` · verde yeso `#E3E8E2` · borde `#CBD0C9` · tinta `#16191C` · tinta media `#5A6066` · texto sobre verde `#A8B8B0` | Fondos, superficies, texto, líneas |
| Estados | Error `#B3261E` · éxito `#1F7A4D` | Solo validación y confirmación |

**Proporción orientativa por vista:**
- neutros ≈ 80 %;
- verde ≤ 15 %;
- azul ≤ 5 % (solo donde se actúa);
- latón puntual.

**Nunca** azul y verde en bloques grandes contiguos (se ve bancario), ni latón o crema como fondo (se ve cafetería).

**Capa técnica en neutro (D-019):** cotas, anotaciones y antetítulos en monoespaciada usan tinta media sobre claro y `#A8B8B0` sobre verde. Lo técnico lo da la forma (mono, cotas, líneas), no el color.

### Contrastes (WCAG, medidos)
| Par | Ratio |
|---|---|
| Tinta sobre papel | 15.75 |
| Tinta media sobre papel | 5.68 |
| Tinta media sobre verde yeso | 5.12 |
| Azul sobre papel | 6.74 |
| Blanco sobre azul | 7.55 |
| Papel sobre verde | 9.85 |
| `#A8B8B0` sobre verde | 4.76 |
| `#C7D2FF` sobre verde | 6.61 |
| Error sobre papel | 5.84 |

El latón sobre papel da 2.62: solo es decorativo.

### En Figma
- Colección `Color` (modo «Pivote», 27 tokens semánticos con alias a `Primitivos`).
- La colección «Color · Exploración A+C» es solo historial.

## 4. Tipografía (aprobada y congelada)
| Familia | Pesos | Uso |
|---|---|---|
| **Archivo** | 400 · 500 · 600 | Títulos, cuerpo, botones y base del logotipo |
| **IBM Plex Mono** | 400 · 500 | Cotas, anotaciones, antetítulos, datos técnicos (m², semanas), descriptor |

- **Enlace:** `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap`
- **Escala** (estilos de texto en Figma, escritorio): Display/L 56/60 · Heading/L 36/42 · M 28/34 · S 20/26 · Body/L 18/28 · M 16/24 · S 15/22 · Label/M 16/22 · S 14/20 · Mono/S 13/18 (mayúsculas) · Mono/XS 12/16.
- **Mínimos de legibilidad (D-031):** cuerpo ≥ 15 px; etiquetas de campo 16 px; ayudas y errores 15 px; antetítulos en mono 13 px; ningún texto funcional por debajo de 12 px. Las familias y los pesos siguen congelados (D-020); solo se subieron los tamaños pequeños tras la prueba al 100 %.

## 5. Tono de voz
**Tres adjetivos: claro, preciso, cercano.** Hablamos como la persona del estudio que mide tu local contigo, no como una agencia.

| Principio | Qué significa |
|---|---|
| **Claro** | Frases cortas. Una idea por frase. Palabras del negocio, no de la oficina de arquitectura: «distribución», no «layout»; «obra», no «fit-out»; «vereda», «mostrador», «caja», «almacén». |
| **Preciso** | Cifras con unidad (m², semanas, S/). Rangos cuando no hay certeza, y la razón. Nada de superlativos ni promesas que no dependen de nosotros (licencias, ventas). |
| **Cercano** | Tuteamos. Nombramos los miedos reales: cuánto cuesta, cuántos días cierro, si voy a pasar la inspección. Sin exclamaciones, sin emojis, sin «¡Hola!». |

**Formato:**
- Oraciones en minúscula, también en títulos y botones («Cotizar mi local»).
- Soles como «S/ 48,000»; rangos con guion corto («S/ 48,000 – 71,000»).
- Semanas en número («6 semanas»).
- Los botones empiezan con verbo y dicen qué pasa.

| En tono | Fuera de tono |
|---|---|
| «Diseñamos locales para que la gente entre y compre.» | «Transformamos espacios en experiencias únicas.» |
| «La obra se hace por fases para que cierres lo menos posible.» | «¡Olvídate de las preocupaciones!» |
| «Te damos un rango orientativo. El monto final sale de la visita.» | «Precios imbatibles garantizados.» |
| «Preparamos la documentación técnica que te piden para tramitar la licencia.» | «Nos encargamos de todos tus permisos.» |
| «Revisa 1 campo antes de continuar.» | «Error: formulario inválido.» |

**Palabras que no usamos:** experiencia única, soluciones integrales, llevar al siguiente nivel, innovador, disruptivo, sinergia, garantizado (salvo que sea literal), «¡».
