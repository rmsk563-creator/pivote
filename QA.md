# QA — Pivote

## Consistency Gate · cierre de contenido y UI Kit · 2026-09-24
**Fuentes comparadas:** `PROJECT_PROFILE.md`, `DECISIONS.md`, `MARCA.md`, `CONTENT.md`, `SCOPE.md`, `ROADMAP.md` y Figma (páginas 00, 01, 02, 03 y 04).

**Método:**
- búsqueda automática de términos retirados en todas las páginas y documentos: nombres anteriores, el titular antiguo, «demo», datos de contacto inventados, «tienda de ropa»;
- recuento de pinturas sin variable en los componentes del UI Kit;
- lectura cruzada de las decisiones D-013 a D-028.

| # | Hallazgo | Dónde | Corrección | Estado |
|---|---|---|---|---|
| 1 | El H1 del wireframe seguía siendo «Arquitectura interior para negocios de calle.» | Figma › 03 (escritorio y móvil) | Reemplazado por el H1 aprobado (D-022) y la bajada de CONTENT §2.1 | ✅ |
| 2 | «Tienda de ropa» frente a «Tienda (florería)» en los casos | Figma › 02 y 03 | Unificado: rubro «Tienda», caso Florería | ✅ |
| 3 | Correo de ejemplo con aspecto real (`ana@correo.pe`) | Figma › 03 Cotizar | `ana@ejemplo.com` (dominio reservado para ejemplos) | ✅ |
| 4 | WhatsApp descrito como función con mensaje prellenado | `PROJECT_PROFILE`, `SCOPE` | Reescrito según D-023: visible, deshabilitado, conectable | ✅ |
| 5 | La página Estudio y «Sobre este proyecto» no reflejaban D-025 y D-026 | `SCOPE`, Figma › 02 | Actualizados | ✅ |
| 6 | UI Kit v0.1 en decisiones y roadmap | `DECISIONS`, `ROADMAP` | D-028 (v1.0) sustituye a D-021 | ✅ |
| 7 | Estado de la portada desactualizado | Figma › 00 | Actualizado | ✅ |
| 8 | Colores sin variable en componentes | Figma › 04 | 0 encontrados | ✅ |
| 9 | «Nexo» y «Vértice» en documentos | `PROJECT_PROFILE` | Solo como historia (nombre del archivo de Figma y página de archivo). Correcto | ✅ |
| 10 | «arquitectura interior» en CONTENT §3.2 («planos de arquitectura interior») | `CONTENT.md` | Es contenido secundario, permitido por D-022 | ✅ sin cambio |
| 11 | Nombre del archivo de Figma («Nexo Arquitectura — Web») | Figma | La API no permite renombrarlo: **acción manual del usuario** | ⏳ |
| 12 | URL de autoría | `CONTENT` §9 | Campo preparado y vacío (D-026) | ⏳ usuario |

**Excluido a propósito:** Figma › 01b (registro del naming), 01c (comparación cromática histórica) y 99 Archivo. Documentan decisiones pasadas y no se corrigen.

## Verificaciones técnicas del logo (2026-09-24)
- ✅ Favicon a 16, 24 y 32 px legible a tamaño real en pestañas claras y oscuras (Chrome headless, escala 1).
- ✅ PNG con canal alfa; tamaños correctos (180, 192, 512 y maskable 512).
- ✅ ICO válido con 3 imágenes (16, 24 y 32).
- ✅ 16 SVG con el texto convertido a trazado; renderizados sobre claro y verde sin errores.

## High-Fi QA · Inicio y Cotizar · 2026-09-24
**Alcance:** Figma › 05 High Fidelity (22 frames en 4 secciones) y su prototipo.
**Método:**
- conteo estructural desde el archivo (interacciones por frame, destinos existentes, controles sin interacción);
- capturas a tamaño real de cada pantalla y de sus estados, usando los modos «Revisión · errores» y «Revisión · completo», que luego se retiraron de los frames.

### Pantallas
| Grupo | Frames |
|---|---|
| Inicio | Escritorio 1440 · Tablet 834 · Móvil 390 |
| Cotizar · Escritorio | 1 Rubro · 2 Tu local · 3 Plazo y presupuesto · 4 Contacto · 5 Resumen · 6 Enviando · 7 Confirmación |
| Cotizar · Móvil | los mismos 7 (390 × 844, scroll, barra fija, resumen plegable) |
| Overlays | Salir sin enviar (escritorio y móvil) · Contacto inactivo (escritorio y móvil) · Menú móvil |

### Resultados
| Área | Resultado | Evidencia o nota |
|---|---|---|
| Consistencia visual | ✅ | Todas las pantallas se armaron con instancias del UI Kit; ningún componente duplicado |
| Tokens | ✅ | Colores del kit enlazados a `Color` (0 pinturas sueltas en componentes); tipografía con modo por frame (Escritorio, Tablet, Móvil) |
| Contraste | ✅ | Solo pares de tokens ya medidos (MARCA §3). Textos sobre foto siempre sobre superficie (Etiqueta, Anotación) |
| Objetivos táctiles | ✅ con notas | Botones de 44 px; opciones de 44–46 px a todo el ancho en móvil; Enlace subido a 28 px. **Handoff:** «Editar» y «Salir ✕» deben tener un área de toque ≥ 24 px con relleno en código |
| Foco | ✅ en el kit | Variantes de foco (anillo de 3 px) en botón, opción, chip, tarjeta y contacto. En Present no se ve (Figma no simula foco de teclado) |
| Etiquetas y errores | ✅ | Etiquetas visibles; mensaje de error debajo de cada campo; resumen de errores por paso |
| Responsive | ✅ | Reordenado real por ancho, no escalado (ver D-029). Móvil: hero apilado, rubros 2 × 2, carrusel de casos, servicios y pasos apilados, barra fija en Cotizar |
| Estados | ✅ | Opciones (normal / seleccionada), campos (normal / completo / error), casilla (sin marcar / marcada / error), carga (normal / archivo), aviso de presupuesto, botón «Enviando…», confirmación con aviso de concepto |
| Interacciones | ✅ | 192 nodos con interacción, 0 destinos rotos, 2 flujos de inicio |
| Navegación y Atrás | ✅ | Atrás explícito entre pasos; «Editar» del resumen vuelve al paso correspondiente |
| Persistencia | ✅ | Las selecciones viven en variables: Atrás y Editar las conservan. Se reinician solo al entrar a Cotizar desde Inicio o al salir sin enviar |
| Overlays | ✅ | Salir: Seguir, ✕ o tocar el fondo cierran; Salir vuelve a Inicio. Contacto: se cierra solo a los 6 s o al tocar. Menú móvil: ✕ cierra y los enlaces cierran y desplazan |

### Hallazgos corregidos durante el QA
| # | Problema | Tipo | Corrección |
|---|---|---|---|
| 1 | Botones anidados sin conectar (cabecera «Cotizar», «Cotizar este servicio», botones del diálogo, CTA del menú) | Interacción | Figma nombra las instancias anidadas como su componente («Botón»). Se recablearon por texto: 13 interacciones |
| 2 | En móvil, «Diseño + obra · 5 semanas» chocaba con «Ver el caso» en la tarjeta de proyecto | Responsive | Separación de 12 px y salto de línea en el componente |
| 3 | La pregunta larga del acordeón («…ITSE?») se cortaba en móvil | Responsive / legibilidad | Texto a ancho completo con alto automático en el componente |
| 4 | Enlaces con un objetivo de 20 px | Accesibilidad | Relleno de 4 px, objetivo de 28 px |
| 5 | El pie decía «Contacto (concepto)», que no coincide con CONTENT §1 | Contenido | «Contacto» |
| 6 | El resumen de errores del paso 2 no mencionaba el estado del local, que es obligatorio | Contenido | Texto corregido. Abierto DC-002 para confirmar si debe ser obligatorio |
| 7 | Los tarjetones de servicio tenían alturas desiguales | Visual | Altura igualada (445 px) |
| 8 | Mini-planos en gris de wireframe | Visual | Componente `Mini-plano` con 5 plantas de línea |

### Limitaciones conocidas del prototipo (no son defectos del diseño)
- Los campos de texto no aceptan escritura en Figma: se completan con un valor de ejemplo al tocarlos.
- El estimador usa A = 48 m² fijo; los demás factores sí responden a lo que se elige.
- No se puede anidar un condicional dentro de otro. Por eso el rango y los textos del resumen se calculan también cuando la validación falla; no se ven hasta llegar al resumen.
- Los hovers de botones con interacción propia no se ven en Present, porque la interacción de la instancia reemplaza la del componente. Las variantes Hover existen en el kit.
- La tablet de Inicio no tiene flujo conectado (es referencia de maquetación). Cotizar tablet = composición móvil (D-029).
- «Ver proyectos» desde la confirmación vuelve al inicio de Inicio (no hay página de Proyectos en esta fase).

### Pruebas manuales pendientes en Present
**Flujo «Escritorio · Inicio → Cotizar»** (en «Móvil · Inicio → Cotizar» se repite lo mismo):
1. En Inicio, «Servicios», «Proyectos» y «Cómo trabajamos» del menú desplazan a su sección.
2. «Ver proyectos» (hero) y cada tarjeta de rubro desplazan a Proyectos.
3. «Escríbenos por WhatsApp» y «WhatsApp · Correo · Instagram» del pie muestran el aviso de contacto, que se cierra solo a los ~6 s.
4. Abrir y cerrar varias preguntas frecuentes.
5. «Cotizar este servicio» en *Diseño + obra* abre el paso 1 con ese servicio ya marcado.
6. Paso 1: pulsar Continuar sin elegir → aparece el resumen de errores. Elegir rubro y servicio → el panel «Tu solicitud» se actualiza → Continuar.
7. Paso 2: Continuar sin nada → los campos se marcan en rojo con su mensaje. Tocar área y distrito, elegir estado → «Local» se actualiza en el panel → Continuar.
8. Paso 2: tocar la zona de archivos → aparece «plano-local.pdf»; tocar otra vez → vuelve.
9. Paso 3: elegir fecha o «Aún no tengo fecha», un horario de obra y un presupuesto de S/ 20,000 – 50,000.
10. Paso 4: Revisar sin datos → errores en nombre, celular y privacidad. Completar y marcar → Resumen.
11. Resumen: el rango coincide con CONTENT §8 (cafetería, diseño + obra, vacío, noche → **S/ 77,000 – 118,000**) y aparece el aviso de presupuesto bajo. Probar también *Proyecto de diseño* (sin aviso).
12. «Editar» en cada fila vuelve al paso correcto con las selecciones conservadas.
13. Enviar solicitud → «Enviando…» ~1 s → Confirmación con el resumen y el aviso de concepto.
14. «Salir sin enviar» en cualquier paso: probar Seguir, ✕, tocar el fondo y Salir.
15. **Solo en móvil:**
    - tocar «Tu solicitud» para abrir y cerrar el resumen;
    - comprobar que la barra de acciones queda fija al hacer scroll;
    - abrir el menú ☰, probar ✕ y los enlaces;
    - deslizar el carrusel de casos.
