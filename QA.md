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
| 3 | Correo de ejemplo con aspecto real (`ana@correo.pe`) | Figma › 03 Cotizar | `ana@ejemplo.com`. **Corregido en D-031:** `ejemplo.com` no es un dominio reservado; ahora es `nombre@example.com` | ✅ |
| 4 | WhatsApp descrito como función con mensaje prellenado | `PROJECT_PROFILE`, `SCOPE` | Reescrito según D-023: visible, deshabilitado, conectable | ✅ |
| 5 | La página Estudio y «Sobre este proyecto» no reflejaban D-025 y D-026 | `SCOPE`, Figma › 02 | Actualizados | ✅ |
| 6 | UI Kit v0.1 en decisiones y roadmap | `DECISIONS`, `ROADMAP` | D-028 (v1.0) sustituye a D-021 | ✅ |
| 7 | Estado de la portada desactualizado | Figma › 00 | Actualizado | ✅ |
| 8 | Colores sin variable en componentes | Figma › 04 | 0 encontrados | ✅ |
| 9 | «Nexo» y «Vértice» en documentos | `PROJECT_PROFILE` | Solo como historia (nombre del archivo de Figma y página de archivo). Correcto | ✅ |
| 10 | «arquitectura interior» en CONTENT §3.2 («planos de arquitectura interior») | `CONTENT.md` | Es contenido secundario, permitido por D-022 | ✅ sin cambio |
| 11 | Nombre del archivo de Figma («Nexo Arquitectura — Web») | Figma | Renombrado por el usuario a «Pivote — Estudio de espacios comerciales» (confirmado el 2026-09-24). La API no expone el nombre del archivo, así que no se pudo verificar | ✅ |
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
| 6 | El resumen de errores del paso 2 no mencionaba el estado del local, que es obligatorio | Contenido | Texto corregido. DC-002 resuelto: obligatorio, con ayuda breve y mensaje de error propio del grupo (variable `err/estado`) |
| 7 | Las tarjetas de servicio tenían alturas desiguales | Visual | Altura igualada (445 px) |
| 8 | Mini-planos en gris de wireframe | Visual | Componente `Mini-plano` con 5 plantas de línea |
| 9 | «Después de un tiempo» configurado en segundos (1.2 / 6), pero Figma lo guarda en **milisegundos**: «Enviando…» y el aviso de contacto se habrían cerrado al instante | Interacción | Corregido a 1200 ms y 6000 ms. Verificado en la documentación de `Trigger`. Las transiciones sí van en segundos |

### Limitaciones conocidas del prototipo (no son defectos del diseño)
- Los campos de texto no aceptan escritura en Figma: se completan con un valor de ejemplo al tocarlos.
- El estimador usa A = 48 m² fijo; los demás factores sí responden a lo que se elige.
- No se puede anidar un condicional dentro de otro. Por eso el rango y los textos del resumen se calculan también cuando la validación falla; no se ven hasta llegar al resumen.
- Los hovers de botones con interacción propia no se ven en Present, porque la interacción de la instancia reemplaza la del componente. Las variantes Hover existen en el kit.
- La tablet de Inicio no tiene flujo conectado (es referencia de maquetación). Cotizar tablet = composición móvil (D-029).
- «Ver proyectos» desde la confirmación vuelve al inicio de Inicio (no hay página de Proyectos en esta fase).

### Pruebas manuales en Present (ronda 1 — sustituida por la lista de HIGH-FI UX REFINEMENT)
**Flujo «Escritorio · Inicio → Cotizar»** (en «Móvil · Inicio → Cotizar» se repite lo mismo):
1. En Inicio, «Servicios», «Proyectos» y «Cómo trabajamos» del menú desplazan a su sección.
2. «Ver proyectos» (hero) y cada tarjeta de rubro desplazan a Proyectos.
3. «Escríbenos por WhatsApp» y «WhatsApp · Correo · Instagram» del pie muestran el aviso de contacto, que se cierra solo a los ~6 s.
4. Abrir y cerrar varias preguntas frecuentes.
5. «Cotizar este servicio» en *Diseño + obra* abre el paso 1 con ese servicio ya marcado.
6. Paso 1: pulsar Continuar sin elegir → aparece el resumen de errores. Elegir rubro y servicio → el panel «Tu solicitud» se actualiza → Continuar.
7. Paso 2: Continuar sin nada → área y distrito en rojo y «Elige el estado del local para continuar.» bajo sus opciones. Tocar área y distrito, elegir estado (el mensaje desaparece) → «Local» se actualiza en el panel → Continuar.
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

### Verificación tras DC-002 (2026-09-24)
- ✅ Paso 2 (escritorio y móvil): ayuda visible bajo «Estado del local»; el error aparece solo si se intenta continuar sin elegir y desaparece al elegir una opción.
- ✅ 13 listas de reinicio (entradas a Cotizar desde Inicio, servicios, CTA final y menú móvil) incluyen `err/estado = false`.
- ✅ 192 interacciones, 0 destinos rotos, ningún modo de revisión aplicado a los frames.

### Estado de la ronda 1
Probada por el usuario en Present. No se aprobó el freeze: se abrió la ronda HIGH-FI UX REFINEMENT (D-031).

---

## HIGH-FI UX REFINEMENT · 2026-09-24 (D-031)
**Origen:** prueba manual del usuario en Present.
**Alcance:** Figma › 04 UI Kit y 05 High Fidelity (38 frames), 03 Wireframes (datos de prueba) y 06 Prototipo (instrucciones).

### Problemas encontrados
| # | Problema | Tipo | Corrección |
|---|---|---|---|
| 1 | **El estimador perdía casi todas sus ramas.** Figma solo admite condicionales «si / si no»: al guardar, los bloques «si no, si» se descartaron sin error. *Diseño + obra* mostraba el rango del proyecto de diseño (S/ 4,400 – 6,900). La QA anterior no lo detectó porque se hizo con el modo «Revisión · completo», que ya traía el valor correcto | Lógica · crítico | 375 condicionales planos de un solo bloque por botón «Revisar». Verificados desde el archivo |
| 2 | Cotizar en escritorio: formulario de 680 px pegado a la izquierda, panel suelto y 180 px vacíos a la derecha. Opciones con anchos distintos (335 frente a 139 px) | Layout | Contenedor de 1200 px centrado, tarjeta de 768 + panel de 400 alineados arriba, opciones en cuadrícula |
| 3 | Frames de escritorio recortados a 1000 px de alto: el contenido que creciera quedaba oculto | Layout | Alto automático (mínimo 1000) y scroll |
| 4 | Textos funcionales de 11–14 px al 100 % | Legibilidad | Escala subida (ver la tabla de tamaños) |
| 5 | La Opción crecía 2 px al seleccionarla (el borde de 2 px contaba en el layout) y el botón Secundario medía 46 px frente a los 44 del Primario | Visual | Bordes fuera del layout; Opción de 52 px y Botón de 48 px en todos los estados |
| 6 | «Tu local» se cortaba («Tu loca») en la Fila de resumen tras subir la escala | Legibilidad | Etiqueta de ancho automático en las 16 instancias |
| 7 | El campo «¿Cuándo quieres abrir?» mostraba la ayuda del área («Aproximado está bien.») | Contenido | Ayuda oculta (CONTENT no define ayuda para la fecha) |
| 8 | Datos de contacto con apariencia real: «Ana Quispe», «999 000 000», `ana@ejemplo.com`, `tu@correo.com` (dominio real) | Realismo | Nombres de pila de ejemplo, teléfono enmascarado «9•• ••• •••», `nombre@example.com` |
| 9 | Los campos se autocompletaban siempre con el mismo valor | Prototipo | Selectores con varias respuestas, algunas con error |
| 10 | «Enviando…» era una pantalla propia y se percibía como permanente | Flujo | El botón del resumen cambia a «Enviando…» durante 1 s y lleva a la confirmación |
| 11 | Los hovers no se veían en los botones con interacción | Interacción | Hover definido en el componente: las instancias lo heredan junto a su clic (verificado en el archivo) |
| 12 | La cabecera se iba con el scroll | Navegación | Cabecera fija en las 3 vistas de Inicio y en todo Cotizar |

### Auditoría de tamaños (al 100 %)
| Elemento | Antes | Ahora | Mínimo de referencia |
|---|---|---|---|
| Cuerpo (Body/M · Body/S) | 16 · 14 px | 16 · **15** px | ≥ 15 px para texto de lectura |
| Etiquetas de campo | 13 px (Label/S) | **16 px** (Label/M) | legibles sin zoom |
| Ayudas y errores | 14 px | **15 px** | — |
| Etiquetas de opción y botón | 15 px | **16 px** | — |
| Antetítulos en mono | 12 px | **13 px** | — |
| Datos técnicos en mono (XS) | 11 px | **12 px** | ningún texto funcional < 12 px |
| Enlaces del menú | 14 px | **15 px** | — |
| Botón | 44 / 46 px | **48 px** | WCAG 2.5.5 (AAA) 44 px |
| Enlace (botón de texto) | 28 px | **34 px** | WCAG 2.5.8 (AA) 24 px |
| Opción | 46 / 48 px | **52 px**, radio de 20 px | 44 px |
| Campo (caja) | 50 px | **52 px** | 44 px |
| Casilla | 18 px, fila de 20 px | caja de **22 px**, fila de **44 px** | 44 px |
| «Salir ✕», «Editar» | texto de 14 px | **Handoff:** área de toque ≥ 44 × 44 px con relleno | 24 px (AA) |

### Revisión técnica de conexiones (leída desde el archivo, no desde los scripts)
| Comprobación | Resultado |
|---|---|
| Frames en 05 | 38: 3 de Inicio, 6 + 6 de Cotizar, 5 overlays, 10 selectores, 2 de espera de envío, 2 de la demo de la cabecera y 4 de revisión responsive |
| Nodos con interacción | 274 · 4935 acciones |
| Destinos rotos | **0** |
| `SET_VARIABLE` hacia variables inexistentes | **0** |
| Condicionales sin condición | **0** |
| Controles de Cotizar (Op, Campo, Btn, Casilla) sin clic | **0** |
| Flujos | Escritorio · Inicio → Cotizar · Móvil · Inicio → Cotizar · Demo · Cabecera al desplazar |
| Tiempos | Espera de envío 1000 ms (×2) · aviso de contacto 6000 ms (×2) · demo 1500 ms (×2) |
| Estimador | 48 m² · cafetería · diseño + obra · vacío · noche · calle → **S/ 77,000 – 118,000** (igual a CONTENT §7.5). Otras muestras: diagnóstico 48 m² → S/ 1,000 – 1,300 · tienda de 30 m² en funcionamiento con cierre total → S/ 32,000 – 49,000 · «aún sin local» en cafetería → S/ 1,330 – 2,030 por m² |
| Reinicios | 13 listas de entrada a Cotizar + «Volver al inicio» y «Nueva cotización» incluyen `val/area`, `btn/enviar`, `k/serv` y `k/clave` |
| Frames de revisión | sin interacciones (son referencias estáticas) |
| Desbordes | 0 frames de alto fijo con contenido que no entra; 0 textos cortados |
| Modos de variables | Ningún frame del flujo tiene aplicado un modo de revisión |

### Limitaciones del prototipo (actualizadas)
- **Scroll:** Figma no cambia la cabecera según la posición del scroll. En Present se ve siempre el estado Desplazada; el cambio se muestra en la demo. En código se hace con `IntersectionObserver` (`MOVIMIENTO.md` §3).
- **Offset de las anclas:** Figma no tiene offset para desplazarse a una sección. Las secciones a las que llevan los enlaces (Proyectos, Servicios, Cómo trabajamos, FAQ) tienen ≥ 72 px de padding superior; la cabecera fija mide 69 px (escritorio) o 65 px (tablet y móvil), así que no tapa los títulos. En móvil se subió ese padding de 56 a 72 px. En código: `scroll-margin-top`.
- **Aparición al hacer scroll:** Figma no la soporta. Documentada para el código.
- **Cambios por variable** (selección, errores, panel, resumen plegable): son instantáneos en Figma. Las transiciones están en `MOVIMIENTO.md`.
- **Tablet de Inicio:** sigue sin flujo propio. Los frames de revisión de Cotizar son estáticos.
- **Hover sobre una Opción:** solo en código. En Figma chocaría con el estado enlazado a la variable.
- **«Ver proyectos»:** ya no está en la confirmación; los enlaces a páginas fuera de alcance siguen sin navegar.

### Prueba manual en Present (pendiente, del usuario)
Abre Present desde **05 High Fidelity** a 100 %. Haz la prueba en escritorio (ventana ≥ 1440 px) y después repítela con el flujo móvil.

**A. Cabecera y navegación**
1. En Inicio, al bajar, la cabecera queda fija arriba, es legible sobre todo el contenido y no tapa los títulos de las secciones.
2. Los enlaces del menú desplazan de forma animada a Servicios, Proyectos y Cómo trabajamos.
3. El flujo **Demo · Cabecera al desplazar** alterna Arriba ↔ Desplazada cada 1,5 s. ¿Se nota el cambio sin ser llamativo?
4. Pasa el cursor por los botones, las tarjetas de rubro, las tarjetas de proyecto y los chips: se ve el hover.

**B. Cotizar en escritorio (legibilidad y composición)**
5. El formulario y el panel «Tu solicitud» se leen como un bloque centrado, sin vacíos grandes a los lados.
6. Etiquetas, ayudas, opciones y botones se leen sin acercarte a la pantalla.
7. Las opciones tienen el mismo alto; al seleccionar una, nada salta de tamaño.

**C. Simulación de campos** (actualizada en D-032: ver la comprobación rápida más abajo)

**D. Validación y persistencia**
13. Continuar sin completar muestra el resumen de errores y los mensajes por campo, incluido «Elige el estado del local para continuar.».
14. Atrás y «Editar» conservan todas las respuestas.
15. El panel «Tu solicitud» se actualiza al avanzar.

**E. Resumen, envío y confirmación**
16. El rango cambia según lo que elijas. Prueba al menos estos casos:
    - 48 m² · cafetería · diseño + obra · vacío · noche → S/ 77,000 – 118,000;
    - diagnóstico → S/ 1,000 – 1,300;
    - «Aún no tengo local» → rango por m²;
    - «Aún no lo sé» → la explicación incluye el rango del proyecto de diseño.
17. Con un presupuesto «Hasta S/ 20,000» y diseño + obra aparece el aviso de presupuesto.
18. El resumen muestra **«Enviar solicitud»** normal. Al tocarlo cambia a **«Enviando…»** y a los ~1 s aparece la confirmación. Un segundo toque durante la espera no hace nada.
19. La confirmación muestra:
    - «Cotización · Confirmación»;
    - «Solicitud preparada correctamente»;
    - el agradecimiento;
    - el resumen corto con el rango;
    - el aviso de concepto.
    No debe parecer un error.
20. «Nueva cotización» empieza de cero, con el botón de envío normal. «Volver al inicio» lleva a Inicio.
21. «Salir sin enviar» en cualquier paso: prueba «Seguir», ✕, tocar el fondo y «Salir».

**F. Solo en móvil**
22. La cabecera y la barra de acciones quedan fijas y no tapan el contenido al final del scroll.
23. Las listas desplegables se abren bajo el campo, se leen bien a 390 px y no las tapa la barra fija.
24. «Tu solicitud» se abre y se cierra.
25. El menú ☰ entra desde arriba; prueba ✕ y los enlaces.
26. El aviso de contacto entra desde abajo y se cierra solo a los ~6 s.
27. Revisa a ojo los frames de revisión de 360, 768, 834 y 1024 (sección «Cotizar · Revisión responsive»): nada cortado, sin scroll horizontal y sin textos diminutos.

### Estado
Probada por el usuario: todo funcionó. Pidió cambiar los diálogos de selección por selectores contextuales (D-032).

---

## Ajuste de selectores · 2026-09-24 (D-032)
**Cambio:** los 10 diálogos de selección se sustituyen por listas desplegables pegadas al campo. Nombre y teléfono pasan a «tocar para escribir». Nada más cambia.

### Qué se verificó (leído desde el archivo)
| Comprobación | Resultado |
|---|---|
| Frames en 05 | 28 (se retiraron 10 overlays de selección) |
| Nodos con interacción · acciones | 248 · 5362 |
| Destinos rotos (incluidos los que apuntaban a los overlays retirados) | **0** |
| Variables inexistentes · condicionales sin condición | **0 · 0** |
| Controles de Cotizar sin clic (incluidas las 28 opciones de lista) | **0** |
| Listas desplegables | 6 (área, distrito y fecha × escritorio y móvil). Visibilidad enlazada a `dd/<campo>`; cada opción, enlazada a `lista/<campo>/<valor>` |
| Reinicios | 17 listas incluyen `dd/*` = false y `lista/*` = Default |
| Estimador | Sin cambios; sigue usando `val/area` |
| Layout | Corregido: en escritorio, el campo Área envuelto quedaba con alto fijo y su ayuda de dos líneas pisaba «Estado del local». Ahora se adapta al contenido. Capturas con las listas abiertas en 1440 y 390: la lista queda sobre el contenido siguiente, sin cortes |

### Limitaciones
- La lista se abre sin animación en Figma: los cambios por variable son instantáneos. La animación de 150 ms está en `MOVIMIENTO.md`.
- «Tocar fuera» cierra la lista en casi toda la pantalla. Sobre la cabecera fija y sobre el título del paso, el toque no cierra la lista, porque esas capas quedan por encima de la capa de cierre.
- El teclado (↑ ↓ Enter Esc) no se puede simular en Present: está especificado para el código.

### Comprobación rápida en Present (usuario)
1. **Paso 2 · Distrito:**
   - la lista se abre justo debajo, con anillo de foco en el campo;
   - el hover marca la opción;
   - al elegir, se cierra y el campo muestra el valor;
   - al reabrir, la opción elegida lleva ✓.
2. **Paso 2 · Área:**
   - aparecen los valores de ejemplo bajo el campo;
   - «8 m²» muestra el error y no deja continuar;
   - otro valor lo corrige.
3. **Cerrar sin elegir:** tocar fuera y tocar el propio campo otra vez.
4. **Paso 3 · Fecha:** misma lista. «Aún no tengo fecha» sigue como opción visible y vacía la fecha.
5. **Paso 4 · Nombre y teléfono:**
   - un toque escribe «Rosa» y «9•• ••• •••»; otro toque los borra;
   - con los campos vacíos, «Revisar solicitud» muestra los errores.
6. **Opciones visibles:** rubro, servicio, estado, centro comercial, cierre, presupuesto y preferencia de contacto siguen como opciones visibles.
7. **Flujo completo:** resumen con el rango correcto → Enviar → Enviando → Confirmación.
8. **Móvil:** repetir 1, 2 y 4; ninguna lista queda tapada por la barra fija.

### Resultado de la comprobación final (usuario, 2026-09-24)
| # | Prueba | Resultado |
|---|---|---|
| 1 | Dropdown de Distrito | ✅ |
| 2 | Área con valor inválido y válido | ✅ |
| 3 | Fecha y «Aún no tengo fecha» | ✅ |
| 4 | Nombre y teléfono | ✅ |
| 5 | Errores al intentar continuar | ✅ |
| 6 | Flujo completo hasta la confirmación | ✅ |
| 7 | Versión móvil | ✅ |
| 8 | Ninguna lista tapada por la barra fija | ✅ |

### Estado
✅ **HIGH-FI FREEZE aprobado por el usuario (D-033).** Esta sección queda como referencia de la última comprobación del diseño. La QA del código se hará contra `HANDOFF.md` §12.

---

## Cobertura completa del diseño · ronda 1 · 2026-09-24 (D-034)
**Alcance:**
- **Wireframes** de escritorio de 8 plantillas (Figma › 03).
- **HF** en 1440 y 390 de Servicios, Proyectos, Cómo trabajamos, Estudio, Sobre este proyecto, Privacidad y 404 (Figma › 05, secciones «Páginas · Escritorio» y «Páginas · Móvil», 14 frames).
- **Imagen OG.**
- **Navegación** de todo el sitio.
- Los **4 casos** quedan fuera: bloqueados por contenido (ver DECISIONS D-034).

### Cómo se construyeron
Solo con componentes y tokens congelados:
- cabecera fija (estado Desplazada);
- pie, antetítulo, botón, ícono, chip de filtro, tarjeta de proyecto, cota y acordeón;
- el CTA final y las preguntas frecuentes, clonados de Inicio;
- colores enlazados a `Color`;
- textos con estilos tipográficos y modo por frame (Escritorio / Móvil).

Único cambio en el kit: el **Pie** tiene ahora un texto por enlace (D-034).

### Revisión técnica (leída desde el archivo)
| Comprobación | Resultado |
|---|---|
| Frames en 05 | 43 |
| Nodos con interacción · acciones | 520 · 10,187 |
| Destinos rotos · variables inexistentes · condicionales vacíos | **0 · 0 · 0** |
| Controles sin clic en las páginas | Solo el enlace a la propia página en el pie (Figma no permite navegar a sí mismo) y las 4 tarjetas de Proyectos (esperan las páginas de caso) |
| Filtro de Proyectos | 5 chips enlazados a `chip/*`; visibilidad de las tarjetas enlazada a `vis/caso/*`. Las tarjetas de rubro de Inicio abren Proyectos ya filtrado; los enlaces de navegación a Proyectos restablecen «Todos» |
| Íconos | Corregido durante la construcción: los ✓ de Servicios no se veían, porque el trazo de una capa de instancia se pinta con el valor base (blanco) y no con el de la variable enlazada. Ahora se guarda el color resuelto junto al enlace |
| Símbolos | «↗» caía en una fuente de respaldo (cuadro); se cambió por «→» |
| Imagen OG | 1200 × 630, PNG de 36 KB en `assets/og/pivote-og.png`; antetítulo a 22 px para que se lea en la vista previa |

### Prueba manual en Present (páginas terminadas)
Flujos **Escritorio · Inicio → Cotizar** y **Móvil · Inicio → Cotizar** (ahora recorren todo el sitio), **Escritorio · 404** y **Móvil · 404**.
1. **Cabecera:** desde Inicio, Servicios, Proyectos, Cómo trabajamos y Estudio abren su página. El logo vuelve a Inicio. «Cotizar mi local» abre el paso 1 vacío.
2. **Pie:** en cada página, Servicios, Proyectos, Cómo trabajamos, Estudio, Cotizar, Sobre este proyecto y Privacidad funcionan. WhatsApp, Correo e Instagram muestran el aviso de contacto.
3. **Servicios:**
   - cada «Cotizar este servicio» abre el paso 1 con ese servicio ya marcado;
   - la nota del diagnóstico descontable se ve solo en Diagnóstico.
4. **Proyectos:**
   - los chips filtran (un caso por rubro) y «Todos» vuelve a mostrar los 4;
   - desde Inicio, cada tarjeta de rubro abre Proyectos con su filtro activo.
5. **Cómo trabajamos:** tabla de 5 fases legible; 8 preguntas que se abren y cierran; «Escríbenos por WhatsApp» muestra el aviso.
6. **Estudio:** «Sobre este proyecto →» abre esa página.
7. **Sobre este proyecto:** cada «Ver en Unsplash →» abre la foto original en una pestaña nueva. No hay enlace de portafolio.
8. **Privacidad y 404:** en la 404, «Volver al inicio» y «Cotizar mi local» funcionan.
9. **Móvil:**
   - el menú ☰ lleva a cada página;
   - los chips de Proyectos se desplazan en horizontal;
   - no hay textos cortados ni scroll horizontal.
10. **Legibilidad:** revisa al 100 % que los textos y los controles se lean como en Inicio y Cotizar.

### Estado
🟡 **Pendiente:**
- la decisión de contenido de los casos;
- el HF de los 4 casos;
- la revisión del usuario de estas páginas.

---

## Cobertura completa del diseño · QA final · 2026-09-24 (D-034, D-040)
### Cobertura del sitemap
| Página | Escritorio 1440 | Móvil 390 | Tablet |
|---|---|---|---|
| Inicio | ✅ | ✅ | ✅ 834 (HF) |
| Servicios | ✅ | ✅ | ✅ revisión 834 |
| Proyectos | ✅ | ✅ | ✅ revisión 834 |
| Caso · Botica de barrio | ✅ | ✅ | ✅ revisión 834 (plantilla de los 4 casos) |
| Caso · Florería en Barranco | ✅ | ✅ | misma plantilla |
| Caso · Barbería con espera a la vista | ✅ | ✅ | misma plantilla |
| Caso · Cafetería de paso | ✅ | ✅ | misma plantilla |
| Cómo trabajamos | ✅ | ✅ | ✅ revisión 834 |
| Estudio | ✅ | ✅ | regla de una columna con márgenes de 40 px (§4 del handoff) |
| Cotizar (7 vistas) | ✅ | ✅ | ✅ revisión 1024 / 834 / 768 / 360 |
| Sobre este proyecto · Privacidad · 404 | ✅ | ✅ | regla de una columna (páginas de texto) |

**Sin diseño: ninguna página del sitemap** (SCOPE).

### Revisión técnica (leída desde el archivo)
| Comprobación | Resultado |
|---|---|
| Frames en 05 | 55 |
| Nodos con interacción · acciones | 668 · 14,071 |
| Destinos rotos · variables inexistentes · condicionales vacíos | **0 · 0 · 0** |
| «Siguiente caso» | Botica → Florería → Barbería → Cafetería → Botica, en escritorio y en móvil |
| Tarjetas de Proyectos → caso | 8/8 correctas |
| Inicio → casos | «Ver el caso» del caso destacado → Botica; las 3 tarjetas, a su caso (título verificado) |
| «← Todos los proyectos» | → Proyectos, con el filtro en «Todos» |
| «Cotizar un local parecido» | → paso 1, con el rubro del caso ya marcado y el resto del estado vacío |
| Página activa (escritorio) | Servicios, Proyectos (también en los 4 casos), Cómo trabajamos y Estudio subrayados; Inicio, Sobre, Privacidad y 404, ninguno. La altura de la cabecera no cambia (81 / 69 px) |
| Página activa (menú móvil) | 371 navegaciones fijan `nav/*` antes de navegar |
| Controles sin clic | Solo el enlace a la página actual (Figma no permite navegar a sí mismo) y la tablet de Inicio, que es referencia estática desde D-029 |
| Planos | «Esquema conceptual · no es un plano de obra» en cada plano, sin fotos «antes». Se corrigieron 4 solapes de marcadores y etiquetas antes de usarlos |
| Textos | Cada frase de un caso sale de CONTENT §4 (D-040). «Qué haríamos distinto» está en condicional; los materiales se presentan como «propuestos» |
| Tablet | Se corrigieron 2 desbordes al crear las revisiones de 834 (cuadrícula de Proyectos y planos lado a lado) |

### Prueba manual en Present (usuario)
Flujos **Escritorio · Inicio → Cotizar** y **Móvil · Inicio → Cotizar** (recorren todo el sitio).

1. **Cabecera activa:**
   - al entrar en Servicios, Proyectos, Cómo trabajamos y Estudio, su enlace aparece subrayado en azul, sin que la cabecera cambie de alto;
   - en un caso, se subraya «Proyectos»;
   - en Inicio, ninguno.
2. **Menú móvil:** abre ☰ en Servicios, Proyectos (o un caso), Cómo trabajamos y Estudio. El enlace de esa página está subrayado; en Inicio, ninguno.
3. **Proyectos → casos:** cada tarjeta abre su caso; en cada caso, «← Todos los proyectos» vuelve con el filtro en «Todos».
4. **Siguiente caso →:** desde Botica, recorre Florería, Barbería, Cafetería y vuelve a Botica, en escritorio y en móvil.
5. **Planos:**
   - «Antes» y «Después» se leen claramente como esquemas (con la etiqueta de esquema conceptual);
   - los puntos 01–03 del «Después» coinciden con las 3 decisiones de debajo.
6. **Textos del caso:** los materiales dicen «Materiales propuestos» y «Qué haríamos distinto» se lee como reflexión, no como una obra real.
7. **Cierre del caso:** «¿Tu local se parece a este?» + «Cotizar un local parecido» abre el paso 1 con el rubro del caso marcado (p. ej., Botica en la Botica). El panel «Tu solicitud» lo muestra.
8. **Desde Inicio:**
   - el caso destacado y las 3 tarjetas de proyecto abren su caso;
   - las tarjetas de rubro abren Proyectos filtrado.
9. **Regresión de lo ya aprobado:** un recorrido completo de Cotizar hasta la confirmación sigue funcionando (selectores, errores, rango, Enviar → Enviando → Confirmación).
10. **A ojo:** los frames de revisión de 834 («Páginas · Revisión tablet 834») no tienen cortes ni desbordes.

### Estado
### Resultado de la prueba final (usuario, 2026-09-24)
Los 10 puntos, correctos: navegación activa en escritorio y en el menú móvil, tarjetas → caso, «← Todos los proyectos», «Siguiente caso» circular, planos y puntos 01–03, «Cotizar un local parecido» con el rubro marcado, Inicio → casos y filtros, flujo completo de Cotizar y tablet sin cortes.

✅ **Design Coverage Gate y Freeze final aprobados (D-041).**

### Hallazgo posterior al freeze (revisión del contrato de implementación)
- **DC-003:** el caso destacado de Inicio compara la misma foto (desaturada) como «antes» y «después». Contradice D-040. Pendiente de decisión del usuario; ver DECISIONS.
