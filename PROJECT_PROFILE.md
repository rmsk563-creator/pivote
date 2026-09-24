# Project Profile — Pivote

## Identidad
**Pivote** · Estudio de espacios comerciales · web responsive de servicios (multipágina, estática) · **Reality Mode: Concept / Portfolio** · v0.1 · en diseño: Brand Gate, CONTENT v1.0 y UI Kit aprobados; **High Fidelity aprobado como base; prueba manual en Present pendiente** (2026-09-24).

## Objetivo
Presentar un estudio de diseño de espacios comerciales para negocios pequeños y medianos, y convertir visitas en **solicitudes de cotización**. Para Matías funciona como proyecto de portafolio, muestra de UX/UI y posible referencia para captar clientes reales.

## Público
Dueñas y dueños de negocios pequeños y medianos de Lima (cafeterías, tiendas, boticas, salones) que van a abrir o renovar su local. Les preocupa el costo, cuántos días cierran, los trámites y si el local va a vender.

## Propuesta central
Locales pensados para que la gente entre, se quede y compre, con presupuesto por partidas, plazos por fase y obra coordinada.

## Flujo principal
1. Llega a Inicio. 2. Se reconoce en su rubro. 3. Ve casos y el proceso con plazos. 4. Entra a Cotizar. 5. Completa 4 pasos. 6. Revisa el resumen con el rango orientativo. 7. Ve la confirmación con el aviso discreto de concepto.

## Arquitectura
Inicio · Servicios · Proyectos (índice + 4 casos) · Cómo trabajamos (+ FAQ) · Estudio · Cotizar · Sobre este proyecto · Privacidad · 404. Detalle en `SCOPE.md`.

## Dirección visual
- **Dirección:** A · Plano + calidez de C · Barrio.
- **Logo D2, aprobado y cerrado:** el pilar cuadrado es el eje y la P es concéntrica con él (archivos en `assets/logos/`).
- **Paleta V4 Fachada + Latón con jerarquía estricta:**
  - azul: acción y pilar;
  - verde botella: bloques de peso;
  - latón: solo barras de acento;
  - neutros: todo lo demás;
  - capa técnica en neutro.
- **Tipografía:** Archivo + IBM Plex Mono. Todo congelado (D-020).

Ver `MARCA.md`.

## Funciones principales
- Cotización en 4 pasos con validación, estados, resumen y rango orientativo → **simulada** (no envía ni guarda).
- Filtro de proyectos por rubro, comparador antes/después, plano con puntos anotados → planificados (Should).
- Contacto (WhatsApp, correo, Instagram) → **visible y deshabilitado en modo concepto**: al usarlo muestra un aviso discreto y no envía nada; se conecta a datos reales cambiando una configuración (D-023).

## Backend e integraciones
Ninguno. Hosting: GitHub Pages. Formulario simulado del lado del cliente. Contacto desactivado mediante la configuración `contacto.activo = false` (D-023). No hay analítica (diferida).

## Datos y realidad
- Estudio, casos, precios «desde» y plazos: **ficticios**, declarados en el pie y en «Sobre este proyecto».
- Fotos: Unsplash con créditos en `assets/fotos/CREDITOS.md`. Son interiores reales de terceros y se presentan como ilustración, nunca como obra propia.
- Rango orientativo: fórmula reproducible (`CONTENT.md` §8). Las tarifas de obra y diseño están dentro de rangos de mercado con fuente; los factores son supuestos del proyecto (§8.1).
- Contacto: sin números, correos, direcciones ni horarios inventados (D-023).
- Autoría: Pivote es una marca conceptual; diseño y desarrollo, Matías (D-026). URL pendiente.
- Nada de testimonios, logos de clientes, métricas de ventas ni «más vendido».

## Restricciones
- Publicable en GitHub Pages (sin build, rutas relativas). Todo en español.
- No debe parecer plantilla, beige minimalista, cafetería ni cliché de arquitectura.
- El logo no debe leerse como startup, app, marca deportiva ni símbolo de carga (D-014).
- Si el proyecto llega a clientes reales con obra, harán falta profesionales habilitados (el nombre ya no depende de «Arquitectura»).

## Decisiones relevantes
- Nombre: **Pivote** · «Estudio de espacios comerciales» (D-013; cierra DC-001).
- Reality Mode: Concept / Portfolio (D-003).
- Formulario simulado; el aviso de concepto solo aparece en la confirmación (D-005).
- Figma antes del código (D-006).
- Dirección A + C (D-007); logo D2 aprobado (D-017); paleta V4 con roles estrictos (D-018, D-019); Brand Gate congelado (D-020).
- Wireframes de Inicio y Cotizar aprobados como base (D-016); H1 aprobado (D-022).
- Contacto en concepto (D-023) · diagnóstico descontable (D-024) · Estudio sin personas (D-025) · autoría (D-026).

Historial completo en `DECISIONS.md`.

## Fuente de verdad
- Figma «Pivote — Estudio de espacios comerciales» (`bwWtTTnJSTklYl240LVNEZ`).
- Páginas: 00 Portada · 01 Identidad (Pivote, logo, favicon) · 01b Naming (cerrado) · 01c Color (comparación; se eligió V4) · 02 Arquitectura · 03 Wireframes · 04 UI Kit · 05 High Fidelity (con el prototipo) · 06 Prototipo (instrucciones) · 99 Archivo (exploración Nexo).

## Estado actual
- Último checkpoint aprobado: contenido, UI Kit, fotos y consistencia (2026-09-24).
- **Aprobado como base (D-030):** High Fidelity de Inicio (1440, 834, 390) y Cotizar (1440, 390) con prototipo de variables (Figma › 05). DC-002 cerrado (estado del local obligatorio).
- Siguiente gate: prueba manual del usuario en Present → High-Fi Freeze → handoff a código.

## Siguiente paso
El usuario prueba el prototipo en Present (lista en `QA.md`). Solo se corrigen bugs de interacción o presentación. Sin su confirmación no hay freeze ni handoff.

## Enlaces
- Figma: https://www.figma.com/design/bwWtTTnJSTklYl240LVNEZ
- Repo: `~/Downloads/pivote` (local, sin remoto)
- Dominio candidato: `pivote.pe` (libre según whois, 2026-09-24; no reservado)
- Staging / producción: —
