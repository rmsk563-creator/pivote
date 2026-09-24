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
