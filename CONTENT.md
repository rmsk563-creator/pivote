# CONTENT.md — Pivote (v1.0 · cerrado el 2026-09-24)

**Estado:** ✅ aprobado para High Fidelity: tono, copy, CTA, FAQ, mensajes del formulario, casos, aviso de concepto, precios y fórmula (con fuentes y supuestos en §8.1). Los cambios posteriores se registran en `DECISIONS.md`.
- Tono según `MARCA.md` §5 (claro, preciso, cercano; tuteo; oraciones en minúscula; sin «¡»).
- Todo lo que figura como estudio, casos, precios y plazos es **ficticio** (Concept / Portfolio, D-003), con aviso global en el pie, en «Sobre este proyecto» y en la confirmación del formulario.
- Marcas: **[PENDIENTE]** = dato que aún falta (solo queda la URL de autoría).

---

## 0. Reglas de redacción
- **Moneda:** «S/ 48,000». Rangos con guion corto y espacios: «S/ 48,000 – 71,000». Siempre dicen «orientativo» o «desde».
- **Unidades:** «48 m²», «6 semanas». No se usa «aprox.»: se escribe «unos» o «≈».
- **Botones:** verbo + resultado («Cotizar mi local», «Ver el caso»). Nunca «Enviar» solo, «Aquí» o «Más info».
- **Enlaces:** dicen a dónde llevan («Ver proyectos de boticas →»).
- **Promesas prohibidas:** ventas garantizadas, licencias aseguradas, «sin sorpresas» como absoluto, plazos que dependan de terceros.

---

## 1. Global

### Navegación
Servicios · Proyectos · Cómo trabajamos · Estudio · **[Cotizar mi local]**
- En Cotizar: logo + «Salir sin enviar ✕» (en móvil, «Salir ✕»).
- Menú móvil: los mismos destinos + «Cotizar mi local» como botón al final.

### Pie
- Marca: logotipo + descriptor · «Lima, Perú».
- Sitio: Servicios · Proyectos · Cómo trabajamos · Estudio · Cotizar.
- Contacto: WhatsApp · Correo · Instagram (sin números ni direcciones visibles; comportamiento en §1.1).
- Este sitio: «Proyecto conceptual de portafolio · Sobre este proyecto · Privacidad».

### 1.1 Contacto en modo concepto (D-023)
**Qué se ve:**
- el botón «Escríbenos por WhatsApp» (sección de preguntas frecuentes y Servicios);
- el pie con WhatsApp, Correo e Instagram;
- en Cotizar, la preferencia de contacto.

Se ven como en un sitio real, **sin números, correos, direcciones ni horarios**.

**Al activarlos** (clic o Enter) no se abre WhatsApp ni el cliente de correo y no se envía nada. Junto al control aparece un aviso breve, sin la palabra «demo»:
- **Texto:** «El contacto directo no está activo en esta versión del sitio. Sobre este proyecto →»
- **Comportamiento:** se anuncia con `role="status"` y se cierra solo a los 6 s o con Esc. El foco se queda en el control.

**Preparado para producción:** todos los puntos leen de una sola configuración:
- `contacto.whatsapp`, `contacto.correo`, `contacto.instagram` = `null`;
- `contacto.activo` = `false`;
- `contacto.mensajePrellenado` = «Hola, quiero cotizar mi local ({rubro}, {m²} m²)».

Para pasar a producción basta completar esos valores y activar el indicador.

### Aviso de proyecto conceptual (solo 3 lugares)
1. **Pie** (discreto, siempre): «Pivote es un proyecto conceptual de portafolio. El estudio, los casos y los precios son ficticios.»
2. **Página «Sobre este proyecto»**: explicación completa (§9).
3. **Confirmación del formulario**: ver §7.7.

No se repite en tarjetas, precios ni casos (D-003).

### Metadatos (título · descripción)
| Página | `<title>` | Meta descripción |
|---|---|---|
| Inicio | Pivote — Estudio de espacios comerciales en Lima | Diseñamos locales para cafeterías, tiendas, boticas y salones: presupuesto por partidas, obra por fases y un rango orientativo en 3 minutos. |
| Servicios | Servicios — Pivote | Diagnóstico, proyecto de diseño o diseño + obra para tu local comercial. Qué incluye, plazos y precios desde. |
| Proyectos | Proyectos — Pivote | Casos de locales contados como decisiones: el problema, lo que cambiamos y por qué. |
| Cómo trabajamos | Cómo trabajamos — Pivote | De la primera visita a la apertura en 5 fases, con semanas y entregables claros. |
| Estudio | Estudio — Pivote | Cómo pensamos un local comercial: primero la operación, después los materiales. |
| Cotizar | Cotiza tu local — Pivote | 4 pasos, unos 3 minutos y un rango orientativo al final. |

---

## 2. Inicio

### 2.1 Hero
- **Antetítulo** (mono + barra de latón): `Estudio de espacios comerciales · Lima`
- **H1 (aprobado, D-022):** «Locales pensados para que la gente entre y compre.» El antetítulo dice qué somos y el H1 dice el beneficio.
- «Arquitectura interior para negocios de calle» ya no se usa como titular. Adaptada, puede aparecer en contenido secundario (por ejemplo, en la meta descripción de Estudio).
- **Bajada:** «Diseñamos cafeterías, tiendas, boticas y salones con presupuesto por partidas y obra por fases, para que cierres el menor tiempo posible.»
- **CTA primario:** «Cotizar mi local» · **secundario:** «Ver proyectos»
- **Rubros (mono):** `Cafeterías · Tiendas · Boticas · Salones`
- **Foto anotada:** cota «Frente 5.40 m» · anotación «01 · Mostrador corrido».

### 2.2 Para tu rubro
- **Antetítulo:** `Para tu rubro` · **H2:** «¿Qué tipo de negocio tienes?»

| Rubro | Línea | Enlace |
|---|---|---|
| Cafetería | Barra, flujo de pedidos y mesas que rotan. | Ver proyectos de cafeterías → |
| Tienda | Vitrina, exhibición y un recorrido que invita a tocar. | Ver proyectos de tiendas → |
| Botica | Mostrador, orden por categorías y requisitos sanitarios. | Ver proyectos de boticas → |
| Salón o barbería | Puestos, lavado, espera y una luz que favorece. | Ver proyectos de salones → |

### 2.3 Lo que resolvemos
- **Antetítulo:** `Lo que resolvemos`
- **H2:** «Un local que se ve bien no siempre vende. Uno que funciona, sí.»
- **Texto:** «Antes de elegir materiales ordenamos cómo se mueve la gente y cómo trabaja tu equipo.»

| # | Título | Línea |
|---|---|---|
| 01 | Circulación | Que el cliente recorra todo el local sin chocar con la cola de la caja. |
| 02 | Mostrador y caja | Dónde se atiende, se cobra y se espera, sin cuellos de botella. |
| 03 | Almacenaje | El stock a mano, sin que el local se vea desordenado. |
| 04 | Iluminación | Luz que muestra el producto y no cansa a quien trabaja 10 horas. |
| 05 | Vitrina y fachada | Lo que convence a alguien de entrar, desde la vereda. |

### 2.4 Proyectos destacados
- **Antetítulo:** `Proyectos` · **H2:** «Casos contados como decisiones»
- **Enlace:** «Ver todos los proyectos →»
- **Tarjetas:** usan el resumen de §4. Formato: `Rubro · m² · Distrito` / título / problema en una línea / «Ver el caso →».

### 2.5 Servicios (resumen)
- **Antetítulo:** `Servicios` · **H2:** «Tres formas de trabajar juntos»
- Tarjetas con nombre, para quién, 3 líneas de «incluye», plazo y precio «desde». El texto completo está en §3.
- **CTA de cada tarjeta:** «Cotizar este servicio» (abre Cotizar con el servicio preseleccionado).

### 2.6 Cómo trabajamos (resumen, bloque verde)
- **Antetítulo:** `Cómo trabajamos` · **H2:** «De la primera visita a la apertura.»
- **Cota:** `≈ 10–14 semanas en total (diseño + obra)`
- **Fases:** ver §5.1, con título y una línea cada una.
- **CTA inverso:** «Ver el proceso completo»

### 2.7 Preguntas frecuentes (6 en Inicio; el resto en Cómo trabajamos)
- **Antetítulo:** `Preguntas frecuentes` · **H2:** «Lo que todos preguntan antes de empezar»
- **Enlace:** «¿Otra duda? Escríbenos por WhatsApp →» (se comporta según §1.1).
- **Preguntas:** 1 a 6 de §5.3.

### 2.8 CTA final (bloque verde)
- **H2:** «¿Tienes un local en mente?»
- **Texto:** «Cuéntanos cómo es en 4 pasos. Toma unos 3 minutos y al final ves un rango orientativo.»
- **CTA:** «Cotizar mi local» (inverso sobre verde)

---

## 3. Servicios

**Intro:** «Puedes empezar por un diagnóstico y seguir después. No te pedimos decidir todo el primer día.»

### 3.1 Diagnóstico · desde S/ 900
- **Para quién:** «Tienes un local funcionando y algo no va: la cola estorba, el stock no entra o la gente no pasa del mostrador.»
- **Incluye:**
  - visita y medición (2 a 3 horas en horario de baja afluencia);
  - informe con 5 mejoras priorizadas por impacto y costo;
  - un plano de distribución propuesto.
- **Plazo:** 1–2 semanas.
- **No incluye:** planos de obra ni presupuesto de ejecución.
- **Nota (política permanente del estudio, D-024):** «Si después contratas el proyecto de diseño o diseño + obra, descontamos el valor del diagnóstico.» No es una promoción: siempre se muestra sin fechas ni urgencia.

### 3.2 Proyecto de diseño · desde S/ 3,500
- **Para quién:** «Vas a abrir o renovar, y ya tienes quién ejecute la obra.»
- **Incluye:**
  - distribución con 2 propuestas;
  - planos de arquitectura interior, mobiliario y luminarias;
  - lista de materiales;
  - presupuesto referencial por partidas;
  - documentación técnica para tramitar la licencia;
  - 2 visitas a obra.
- **Plazo:** 4–5 semanas.
- **Referencia de cálculo:** S/ 70–110 por m² según el rubro.

### 3.3 Diseño + obra · diseño + ejecución desde S/ 950 por m²
- **Para quién:** «Quieres un solo responsable, de la primera visita a la entrega de llaves.»
- **Incluye:** todo el proyecto de diseño, más coordinación y ejecución de la obra por fases, compras, supervisión, entrega y ajustes finales.
- **Plazo:** 10–14 semanas en total.
- **Referencia de cálculo:** obra de S/ 950–1,450 por m² con acabado comercial, según rubro, estado del local y horario de obra.
- **No incluye (en ningún servicio):**
  - equipos de cocina y maquinaria;
  - mercadería;
  - letreros luminosos de terceros;
  - tasas y derechos municipales;
  - mobiliario de marcas proveedoras (franquicias).

**Pie de sección:** «Los precios son orientativos y se ajustan tras la visita. En la cotización ves un rango calculado con tus datos.»

---

## 4. Proyectos (4 casos ficticios)

**Intro del índice:** «Cada caso cuenta el problema, lo que decidimos y por qué. No publicamos cifras de ventas de nuestros clientes.»

**Filtro:** Todos · Cafeterías · Tiendas · Boticas · Salones

| Caso | Datos (mono) | Problema | Decisiones clave | Servicio · plazo | Foto |
|---|---|---|---|---|---|
| **Botica de barrio** | Botica · 48 m² · Surquillo | La cola de caja tapaba la góndola de cuidado personal y el cliente no la recorría. | Mostrador en L que separa dispensación y caja; circulación en U; góndolas bajas al frente para que se vea todo desde la puerta. | Diseño + obra · 9 semanas, de noche | `botica-estante.jpg` |
| **Florería en Barranco** | Tienda · 32 m² · Barranco | Se vendía desde la vereda, pero adentro no cabían ni el taller ni la exhibición. | Mostrador corrido que funciona como mesa de armado; exhibición a la altura de la vista; almacén frío detrás de un panel corredizo. | Diseño + obra · 5 semanas | `floreria-mostrador.jpg` |
| **Barbería con espera a la vista** | Salón · 60 m² · San Borja | La espera estaba escondida y los clientes se iban al ver el local «lleno». | Espera junto a la vitrina; puestos en línea con lavado al fondo; iluminación puntual por puesto. | Proyecto de diseño · 4 semanas | `barberia-salon.jpg` |
| **Cafetería de paso** | Cafetería · 40 m² · Lince | Pedidos y recojo en el mismo punto: la barra se colapsaba a las 8 a. m. | Barra partida (pedido / recojo), repisa de pie hacia la ventana y mesas solo al fondo. | Diseño + obra · 11 semanas | `cafeteria-barra.jpg` |

Las fotos son de contexto (Unsplash, con crédito en «Sobre este proyecto»); no son obras de Pivote. El pie de foto de cada caso dice «Foto de referencia».

**Estructura de cada caso (actualizada en D-040):**
1. «← Todos los proyectos».
2. Datos, título y servicio · plazo.
3. Foto con el pie «Foto de referencia».
4. El problema.
5. **Lo que decidimos:** plano esquemático «Antes» y «Después». El «Después» lleva 3 puntos numerados, explicados debajo.
6. Materiales propuestos.
7. Qué haríamos distinto.
8. Cierre «¿Tu local se parece a este?» + «Cotizar un local parecido».
9. «Siguiente caso →».

**Planos esquemáticos (D-040):**
- Dibujos neutros hechos para el caso, no fotos ni planos de obra.
- Cada uno lleva la etiqueta «Esquema conceptual · no es un plano de obra».
- Se comparan uno junto al otro, en escritorio, o uno debajo del otro, en móvil. No se usa el comparador de fotos, porque no existen imágenes «antes» (no se simulan).

**Contenido por caso (D-040)** — las decisiones son las de la tabla de arriba, numeradas 01–03:

| Caso | Materiales propuestos | Qué haríamos distinto |
|---|---|---|
| Botica de barrio | Melamina de alto tránsito en góndolas · Mostrador con tablero de cuarzo · Piso vinílico en rollo · Luz LED lineal de 4000 K | «Dejaríamos más espacio para el stock de temporada: en un local así, el almacén suele llenarse antes de lo previsto.» |
| Florería en Barranco | Mostrador de pino tratado · Cemento pulido con sellador · Panel corredizo de policarbonato · Repisas de acero negro | «Pondríamos un segundo punto de agua cerca de la vitrina: con uno solo, todo el armado depende de ese punto.» |
| Barbería con espera a la vista | Espejos con luz perimetral · Porcelanato antideslizante · Tapiz vinílico lavable en la espera · Luminarias dirigibles por puesto | «Separaríamos antes los circuitos de luz: con uno compartido, apagar la espera también apagaría un puesto.» |
| Cafetería de paso | Frente de barra en ladrillo · Tablero de granito en pedidos · Repisa de madera maciza hacia la ventana · Luz cálida de 3000 K | «Haríamos la repisa de la ventana 10 cm más profunda: en una cafetería de paso, la gente también la usa para trabajar.» |

- **Materiales:** se presentan como «Materiales propuestos» (decisiones del proyecto conceptual), no como especificación ejecutada.
- **Qué haríamos distinto:** redactado como reflexión de diseño en condicional (D-040). No afirma que el local se construyó.
- **Cierre:** H2 «¿Tu local se parece a este?» + botón «Cotizar un local parecido» (abre Cotizar con el rubro del caso ya marcado).
- **Siguiente caso →** (circular): Botica → Florería → Barbería → Cafetería → Botica.

---

## 5. Cómo trabajamos

### 5.1 Fases
| # | Fase | Semanas | Qué hacemos | Qué necesitas tener | Qué recibes |
|---|---|---|---|---|---|
| 01 | Visita y medición | 1 | Medimos, fotografiamos y vemos cómo opera tu negocio (o cómo operará). | Acceso al local y 1 hora para conversar. | Levantamiento del local. |
| 02 | Distribución | 2–3 | Planta, circulación y mostrador. | Tu lista de productos o servicios y cuánta gente trabaja. | 2 propuestas de distribución para elegir. |
| 03 | Proyecto y presupuesto | 4–5 | Planos, materiales y luminarias. | Aprobar una distribución. | Planos, presupuesto por partidas y cronograma de obra. |
| 04 | Obra por fases | 6–12 | Coordinamos a cada especialidad y supervisamos. | Autorización del propietario si el local es alquilado. | Avance semanal con fotos. |
| 05 | Entrega | 13–14 | Revisión final, ajustes y limpieza. | Tu visita de conformidad. | Planos finales y documentación técnica. |

Si solo contratas el proyecto de diseño, el proceso termina en la fase 03.

### 5.2 Garantías honestas (texto corto)
«Te decimos qué depende de nosotros y qué no. El plazo de obra lo cumplimos; los tiempos de la municipalidad o del centro comercial, no los controlamos, pero los consideramos en el cronograma.»

### 5.3 Preguntas frecuentes
1. **¿Cuánto cuesta diseñar mi local?** — Depende de los m², del rubro y de si incluye obra. Como referencia: un diagnóstico empieza en S/ 900, un proyecto de diseño en S/ 3,500 y una obra con acabado comercial suele estar entre S/ 950 y S/ 1,450 por m². En la cotización ves un rango con tus datos.
2. **¿Cuántos días tengo que cerrar?** — En un local de 40 a 60 m², la obra dura de 4 a 7 semanas. Si necesitas seguir abierto, trabajamos de noche o por sectores: toma más tiempo y el costo sube entre 12 y 20 %.
3. **¿Me ayudan con la licencia y la inspección técnica (ITSE)?** — Preparamos los planos y la documentación técnica que te piden, y diseñamos siguiendo el Reglamento Nacional de Edificaciones (normas A.070 de comercio y A.130 de seguridad). El trámite y la inspección los resuelve tu municipalidad; no podemos garantizar sus plazos.
4. **¿Trabajan con el presupuesto que tengo?** — Sí, si es realista para lo que necesitas. Si no alcanza, te proponemos fases: primero lo que más impacta (distribución, mostrador, luz) y después lo demás.
5. **¿Y si el local es alquilado?** — Necesitas la autorización escrita del propietario para la obra. Diseñamos pensando en qué te puedes llevar si te mudas (mobiliario) y qué se queda.
6. **¿Hacen solo el diseño o también la obra?** — Las dos cosas. Puedes contratar solo el proyecto y ejecutarlo con tu contratista, o encargarnos todo.
7. **¿Trabajan en centros comerciales?** — Sí. Tienen reglas propias de diseño, horarios de obra nocturnos y seguros; lo sumamos al cronograma y al presupuesto (≈ 8 % más).
8. **¿Qué no incluye el precio?** — Equipos de cocina, maquinaria, mercadería, letreros de terceros y tasas municipales.

---

## 6. Estudio
- **H1:** «Primero la operación. Después los materiales.»
- **Texto:** «Pivote diseña locales para negocios pequeños y medianos. Empezamos por cómo trabajas: cuánta gente atiende, dónde se forma la cola, qué se vende más. Con eso decidimos la distribución, y solo después los acabados.»
- **Cómo decidimos (5 principios):**
  1. **La distribución manda.** Un buen material no arregla una mala circulación.
  2. **Presupuesto por partidas.** Sabes cuánto cuesta cada cosa y puedes priorizar.
  3. **Obra por fases.** Para que cierres lo menos posible.
  4. **Materiales que aguantan el uso.** Un local se limpia todos los días.
  5. **Todo queda documentado.** Planos finales y lista de materiales para cuando necesites mantener o ampliar.
- **Lo que no hacemos:** «No diseñamos viviendas ni oficinas corporativas. No vendemos mobiliario de catálogo.»
- **Capacidades (D-025, sin personas):**
  | Capacidad | Qué cubre |
  |---|---|
  | Distribución y diseño | Planta, circulación, mostradores, mobiliario a medida, iluminación. |
  | Presupuesto y compras | Partidas, alternativas de material, cotizaciones a proveedores. |
  | Obra y supervisión | Coordinación de especialidades, fases, control de calidad y entrega. |
  | Documentación | Planos finales, memoria técnica para trámites, fichas de mantenimiento. |
- **Cómo abordamos un proyecto:** «Una persona de contacto de principio a fin, visitas programadas y un avance por escrito cada semana.»
- **Enlace discreto al final:** «Sobre este proyecto →»

---

## 7. Cotizar (flujo simulado, D-005)

### 7.0 Intro y encabezado
- **Cabecera:** logo + «Salir sin enviar ✕»
- **Confirmación al salir** (si hay datos): «¿Salir sin enviar? Tus respuestas se borrarán.» · [Seguir completando] [Salir]
- **Panel lateral «Tu solicitud»** (vacío): «Tus respuestas aparecen aquí a medida que avanzas.»
- **Qué pasa después:**
  1. «Ves un rango orientativo al terminar.»
  2. «Coordinamos una visita para medir.»
  3. «Recibes la propuesta con presupuesto por partidas.»

### 7.1 Paso 1 · Rubro
- **Progreso:** `Paso 1 de 4 · Rubro`
- **H1:** «Cuéntanos sobre tu negocio» · **Bajada:** «Son 4 pasos cortos. Puedes volver atrás sin perder nada.»
- **¿Qué tipo de negocio es?** Cafetería o restaurante · Tienda o retail · Botica o farmacia · Salón o barbería · Otro
  - Si es «Otro», aparece el campo «¿Cuál?» (placeholder: «Ej.: óptica, librería»).
- **¿Qué necesitas?** Diagnóstico de un local que ya funciona · Proyecto de diseño · Diseño + obra · Aún no lo sé, ayúdenme a decidir
- **Errores:**
  - «Elige el tipo de negocio para continuar.»
  - «Elige qué necesitas. “Aún no lo sé” también vale.»
- **Botón:** «Continuar»

### 7.2 Paso 2 · Tu local
- **Progreso:** `Paso 2 de 4 · Tu local` · **H1:** «¿Cómo es tu local?»
- **Área aproximada (m²)** · ayuda: «Aproximado está bien. Si no lo sabes: frente × fondo.»
  - vacío: «Indica el área aproximada en m².»
  - < 10: «El área parece muy pequeña. Revisa el número (en m²).»
  - > 1,000: «Para más de 1,000 m² preferimos conversarlo. Puedes seguir sin rango.»
- **Distrito** (lista de los 43 distritos de Lima + «Callao» + «Otro») · error: «Elige el distrito: cambia traslados y trámites.»
  - En el prototipo de Figma la lista desplegable muestra solo Miraflores, Barranco, Surco, San Isidro y Otro (D-032).
- **Estado del local (obligatorio, DC-002):** Local vacío · En funcionamiento · Aún no tengo local
  - ayuda, debajo del título: «El estado actual del local influye en el alcance y el costo estimado de la intervención.»
  - error, si se intenta continuar sin elegir: «Elige el estado del local para continuar.»
- **¿Está dentro de un centro comercial?** Sí · No
- **Fotos o planos (opcional)** · «Arrastra fotos o planos · JPG, PNG o PDF» · al elegir, se muestra solo el nombre del archivo: «plano-local.pdf · se adjuntaría a tu solicitud».
- **Resumen de errores** (arriba, con enlace a cada campo): «Revisa 1 campo antes de continuar» / «Revisa 2 campos antes de continuar»
  - Texto del resumen en el paso 2: «Completa el área, el distrito y el estado del local para continuar.»
- **Obligatorios del paso 2:** área, distrito y estado del local. Centro comercial viene con «No» preseleccionado; fotos o planos son opcionales.
- **Botones:** «← Atrás» · «Continuar»

### 7.3 Paso 3 · Plazo y presupuesto
- **Progreso:** `Paso 3 de 4 · Plazo y presupuesto`
- **H1:** «Plazo y presupuesto» · **Bajada:** «Sirve para proponerte algo realista. Nada de esto te compromete.»
- **¿Cuándo quieres abrir?** (mes y año) + opción «Aún no tengo fecha»
  - fecha pasada: «Esa fecha ya pasó. Elige un mes a partir de {mes actual}.»
  - fecha a menos de 8 semanas con diseño + obra: aviso (no bloquea): «Es un plazo corto para diseño + obra. Te diremos qué es posible en la visita.»
- **¿Puedes cerrar durante la obra?** Sí · Solo de noche o domingos · No, debe seguir abierto
- **Presupuesto aproximado para todo (diseño + obra):** Hasta S/ 20,000 · S/ 20,000 – 50,000 · S/ 50,000 – 100,000 · Más de S/ 100,000 · Prefiero no decirlo
- **Botones:** «← Atrás» · «Continuar»

### 7.4 Paso 4 · Contacto
- **Progreso:** `Paso 4 de 4 · Contacto` · **H1:** «¿Cómo te contactamos?»
- **Tu nombre** · error: «Escribe tu nombre.»
- **Nombre del negocio (opcional)**
- **WhatsApp o teléfono** (prefijo +51) · error: «Escribe un celular de 9 dígitos que empiece con 9.»
- **Correo** (opcional; obligatorio si eliges «Correo» como preferencia) · placeholder: «nombre@example.com» (dominio reservado para ejemplos, RFC 2606) · error: «Revisa el correo: falta la @ o el dominio.»
- **¿Cómo prefieres que te contactemos?** WhatsApp · Llamada · Correo
- **☐ Acepto la política de privacidad** (enlace) · error: «Acepta la política de privacidad para revisar tu solicitud.»
- **Botones:** «← Atrás» · «Revisar solicitud»

### 7.5 Resumen
- **Antetítulo:** `Revisión final` · **H1:** «Revisa tu solicitud»
- **Bloque del rango orientativo:**
  - etiqueta: `Rango orientativo`
  - cifra: «S/ 77,000 – 118,000» (ejemplo: cafetería de 48 m², diseño + obra, local vacío, obra de noche)
  - explicación: «Calculado con 48 m² × diseño + obra × cafetería × local vacío × obra de noche. Es una referencia, no un presupuesto: el monto final sale de la visita y del proyecto. No incluye equipos de cocina ni mercadería.»
  - enlace: «¿Cómo lo calculamos?» (abre la explicación de §8 en un panel)
- **Si el presupuesto elegido es menor que el rango** (aviso informativo, no error): «Tu presupuesto está por debajo de este rango. Podemos empezar por un diagnóstico o hacer la obra por fases. Lo vemos en la visita.»
- **Casos sin rango:**
  - sin m² válido: «Para calcular un rango necesitamos el área aproximada.» · [Agregar el área]
  - «Aún no tengo local»: «Mientras eliges local, como referencia: diseño + obra para tu rubro suele estar entre S/ {a} y S/ {b} por m².»
  - «Aún no lo sé» (servicio): se muestran dos rangos, «Si solo es el proyecto» y «Si incluye la obra».
- **Filas editables:** Rubro y servicio · Tu local · Plazo y presupuesto · Contacto, cada una con «Editar».
- **Botones:** «← Atrás» · «Enviar solicitud»
- **Botón:** «Enviar solicitud» en su estado normal. Solo al tocarlo pasa a **«Enviando…»** (deshabilitado, ~1 s, simulado) y después a la confirmación, que es una pantalla aparte (D-031).
- **Error inesperado:** «No pudimos preparar tu solicitud. Inténtalo otra vez.» · [Reintentar]

### 7.6 Confirmación (actualizada en D-031)
- **Antetítulo:** `Cotización · Confirmación`
- **H1:** «Solicitud preparada correctamente»
- **Texto:** «Gracias por contarnos sobre tu local.»
- **Resumen corto** (bloque neutro): `Tu solicitud` · «{rubro} · {m²} m² · {distrito} · {servicio}» · «Rango orientativo» · {rango}
- **Botones:** «Volver al inicio» (primario) · «Nueva cotización» (secundario)
- Tono de éxito: marca de verificación en verde de estado. Nada de rojo ni de lenguaje de error.

### 7.7 Aviso de concepto (solo aquí, tono informativo)
«Como Pivote es un proyecto conceptual de portafolio, esta solicitud no se envió ni se almacenó.»

---

## 8. Estimador · fórmula (reproducible)

**Entradas:** A = m² · servicio · rubro · estado · cierre · centro comercial.

| Factor | Valores |
|---|---|
| Rubro (r) | Tienda 1.00 · Botica 1.10 · Otro 1.10 · Salón 1.15 · Cafetería 1.30 |
| Estado (e) | En funcionamiento 1.00 · Local vacío 1.10 |
| Cierre (c) | Sí 1.00 · Solo de noche o domingos 1.12 · No, debe seguir abierto 1.20 |
| Centro comercial (m) | No 1.00 · Sí 1.08 |

**Cálculo por servicio:**
- **Diagnóstico:** mín. = máx(900, A × 20); máx. = máx(1,300, A × 28)
- **Proyecto de diseño:** mín. = máx(3,500, A × 70 × r); máx. = máx(5,000, A × 110 × r)
- **Diseño + obra:** diseño (fila anterior) + obra; obra mín. = A × 950 × r × e × c × m; obra máx. = A × 1,450 × r × e × c × m

**Redondeo:** a S/ 100 por debajo de S/ 10,000, a S/ 500 hasta S/ 20,000 y a S/ 1,000 por encima.

**Validez:** 10 ≤ A ≤ 1,000. Fuera de ese rango no se muestra cifra (§7.5).

### 8.1 Fuentes y supuestos (antes de congelar)
**Datos de mercado** (consultados el 2026-09-24; son referencias, no cotizaciones):

| Dato | Valor publicado | Fuente | Cómo se usa |
|---|---|---|---|
| Remodelación en Lima por m² | S/ 600–1,500 (básico 600–800 · medio 900–1,200 · integral 1,300–1,500+) | Priser Perú, «Precio m2 de remodelación 2026» (06-05-2026) — priserperu.com/blog/cual-es-el-precio-de-remodelacion-por-metro-cuadrado/ | Tarifa de obra S/ 950–1,450 por m²: dentro de los tramos medio e integral |
| Remodelación y rehabilitación por m² | S/ 600–2,000; variación de ±20–40 % según la obra | OneMake, «Costo de construcción por m² en Perú 2026» — onemake.ai/blog/costo-construccion-por-m2-peru | Confirma el rango y justifica presentar un **rango** y no una cifra |
| Honorarios de diseño de interiores | S/ 50–150 por m²; S/ 2,000–10,000 por proyecto | Business Empresarial, «Cómo cobra un diseñador de interiores» (19-07-2024) — businessempresarial.com.pe/como-cobra-un-disenador-interiores/ | Honorarios S/ 70–110 por m² y mínimo S/ 3,500–5,000: dentro de ambos rangos |
| Honorarios de diseño (fuente discrepante) | S/ 200–1,000 por m² | Patapam, «Costo por m² de diseño de interiores en Perú» (2025) | No se usa: probablemente incluye implementación; se registra la discrepancia |
| Cifra no verificada | «Acabado comercial S/ 1,000–1,500 por m²» (Habitar 360º) | habitar.com.pe (la página dio error 500) | No se cita como fuente |

**Supuestos del proyecto** (decisiones del negocio conceptual, **no** datos de mercado):
- Diagnóstico: S/ 20–28 por m², mínimo S/ 900–1,300.
- Factores de rubro: cafetería 1.30, salón 1.15, botica y otro 1.10, tienda 1.00. Razón cualitativa: instalaciones sanitarias, eléctricas y de extracción.
- Estado del local: vacío 1.10.
- Horario de obra: de noche 1.12; abierto 1.20. Coincide con el «12 a 20 %» de las FAQ.
- Recargo de centro comercial: 1.08.
- Redondeo a S/ 100, 500 o 1,000.
- Plazos por fase (semanas), incluido «40–60 m² → 4–7 semanas de obra».
- Descuento del diagnóstico (D-024).

Cualquier cifra de la web que venga de esta lista se presenta como «orientativa» y nunca como dato de mercado.

**Casos de prueba** (verificados con script):
| Entrada | Rango |
|---|---|
| 48 m² · cafetería · diseño + obra · vacío · noche | S/ 77,000 – 118,000 |
| 48 m² · botica · proyecto de diseño | S/ 3,700 – 5,800 |
| 32 m² · tienda · diseño + obra · en funcionamiento · sigue abierto | S/ 40,000 – 61,000 |
| 60 m² · salón · diseño + obra · vacío · centro comercial | S/ 83,000 – 126,000 |
| 40 m² · tienda · diagnóstico | S/ 900 – 1,300 |
| 120 m² · cafetería · diagnóstico | S/ 2,400 – 3,400 |

**Texto de «¿Cómo lo calculamos?»:** «Multiplicamos tus m² por una tarifa de referencia según el servicio y la ajustamos por rubro (una cafetería necesita más instalaciones que una tienda), por el estado del local, por el horario de obra y por si está en un centro comercial. Es un rango, no un presupuesto.»

---

## 9. Sobre este proyecto
- **H1:** «Sobre este proyecto»
- **Texto:** «Pivote es un proyecto conceptual de portafolio: un estudio de espacios comerciales que no existe, diseñado y desarrollado para mostrar un proceso completo de UX/UI y desarrollo web.»
- **Qué es real y qué no:**
  - el diseño, el código y el proceso son reales;
  - el estudio, los casos, los precios, los plazos y los contactos son ficticios;
  - el formulario no envía ni guarda datos.
- **Fotos:** créditos de Unsplash por foto (autor + enlace). Son interiores reales de otros autores y se usan como ilustración, no como obra del estudio.
- **Autoría (D-026):** «Pivote es una marca conceptual. Diseño y desarrollo: Matías.»
  - Enlace «Ver portafolio →» **[PENDIENTE: URL]**. No se muestra mientras el campo `autor.url` esté vacío; no se inventa.

## 10. Privacidad (versión para el concepto)
«Este sitio no usa cookies de seguimiento ni analítica. El formulario de cotización es una simulación: lo que escribes solo existe en esta pestaña y se borra al cerrarla o al salir del formulario. No se envía a ningún servidor.»

## 11. 404
- **H1:** «Esta página no existe»
- **Texto:** «Puede que el enlace esté mal escrito o que la página se haya movido.»
- **Botones:** «Volver al inicio» · «Cotizar mi local»

---

## 11b. Textos derivados usados en las páginas nuevas (D-034, pendientes de revisión)
No hay copy nuevo inventado. Estos textos reutilizan frases aprobadas o etiquetas de estructura de este documento:
- **H1 de Servicios:** «Tres formas de trabajar juntos» (H2 de §2.5).
- **H1 de Proyectos:** «Casos contados como decisiones» (H2 de §2.4).
- **H1 de Cómo trabajamos:** «De la primera visita a la apertura.» (H2 de §2.6), con la cota «≈ 10–14 semanas en total (diseño + obra)».
- **Antetítulos** tomados de la navegación o de las etiquetas de §3 y §6:
  - «Servicios», «Proyectos», «Cómo trabajamos» y «Estudio»;
  - «No incluye en ningún servicio», «Cómo decidimos», «Capacidades», «Cómo abordamos un proyecto» y «Lo que no hacemos».
- **Servicios:** el plazo se muestra como «Plazo · 1–2 semanas».
- **Cómo trabajamos:**
  - la columna de semanas se muestra como «Semana 1» / «Semanas 2–3»;
  - §5.2 («Garantías honestas») se compone con la primera frase como título y el resto como texto, sin cambiar las palabras.
- **Sobre este proyecto:**
  - subtítulos «Qué es real y qué no», «Fotos» y «Autoría» (etiquetas de §9);
  - introducción de fotos: «Fotos de Unsplash. Son interiores reales de otros autores y se usan como ilustración, no como obra del estudio.»;
  - 5 créditos (autor + dónde se usa + «Ver en Unsplash →», con el enlace de `assets/fotos/CREDITOS.md`). La foto de reserva no se usa, así que no se acredita.
- **Privacidad:** H1 «Privacidad» (nombre del enlace del pie).
- **404:** sin antetítulo.

## 12. Textos alternativos (D-037)
| Archivo | Dónde | `alt` |
|---|---|---|
| `interior-madera-continua.jpg` | Hero de Inicio | «Local revestido de madera clara, con repisas iluminadas y un mueble curvo; una persona lo cruza caminando.» |
| `botica-estante.jpg` | Caso Botica (foto principal) | «Una persona con camisa blanca toma una caja de un estante de medicamentos ordenado por categorías.» |
| `floreria-mostrador.jpg` | Caso Florería | «Mostrador de madera con vitrina, flores secas y un balde de flores frescas en primer plano.» |
| `barberia-salon.jpg` | Caso Barbería | «Barbería con sillones en fila e iluminación puntual en el techo; una persona barre el piso.» |
| `cafeteria-barra.jpg` | Caso Cafetería | «Barra de café con máquina de espresso y molinos frente a ventanales altos, en un local de ladrillo.» |
| `boutique-repisas.jpg` | Reserva | «Tienda con repisas blancas flotantes, accesorios en exhibición y un perchero de ropa clara.» |

- **Tarjetas de proyecto** (Inicio y Proyectos): la foto lleva `alt=""`, porque el título y los datos de la tarjeta ya la describen y todo lleva al mismo enlace.
- **Mini-planos, barras de latón, íconos y el pilar del logo:** decorativos (`alt=""` o `aria-hidden="true"`).
- **Logo:** `alt="Pivote"` (en el pie, «Pivote · Estudio de espacios comerciales»).
- **Imagen OG:** no se muestra en la página; `og:image:alt` = «Pivote · Estudio de espacios comerciales. Locales pensados para que la gente entre y compre.»

---

## Estado de cierre
- ✅ **Resuelto:**
  - H1 (D-022);
  - contacto en modo concepto (D-023);
  - diagnóstico descontable (D-024);
  - Estudio sin personas (D-025);
  - autoría (D-026);
  - fotos de botica y cafetería (D-027);
  - fuentes y supuestos del estimador (§8.1).
- ⏳ **Pendientes:**
  - URL de autoría (`autor.url`, D-038);
  - contenido de los casos que CONTENT no define (materiales, «Qué haríamos distinto», imágenes antes/después): pendiente de decisión del usuario (D-034).
