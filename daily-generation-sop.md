# SOP: generación diaria de una actividad SLP nueva + hoja de trabajo PDF

Este es el procedimiento (prompt) que ejecuta la tarea programada diaria. Se usa tal cual como instrucción de la scheduled task.

## Reglas fijas (nunca romper)

1. **Nunca** copiar, parafrasear de cerca, ni reproducir texto, instrucciones, wording, mascota/personaje, iconos/line-art, ni diseño de "The SLP Curriculum" ni de ningún otro material con derechos de autor (incluidos los PDFs de ejemplo que el usuario compró para uso personal). Solo se pueden usar los nombres genéricos de habilidades/categorías que están en `slp-topic-coverage-map.json`, y la **idea de formato genérica** (nombre + fecha, línea de instrucción, grid de casillas, marco de oración al final) — esas son ideas de dominio común, no expresión protegida.
2. Todo el contenido (actividad Y hoja de trabajo) debe ser **100% redactado/diseñado desde cero** por el agente. Nunca subir, copiar ni redistribuir ningún PDF comprado o de terceros — solo se referencian sus nombres de categoría genéricos.
3. Revisar `activities.json` antes de generar, para no repetir un `id` ni una actividad casi idéntica a una ya existente (mismo título/mismos materiales/misma mecánica).
4. Todo el contenido debe estar en **inglés** (igual que el resto de actividades y juegos del sitio).

## Paso A — Crear la actividad (igual que antes)

1. Leer `slp-topic-coverage-map.json` (todas las categorías y habilidades) y `activities.json` (actividades ya publicadas), ambos en esta misma carpeta (`F:\SLP WEBSITE`).
2. Elegir una categoría/habilidad a cubrir hoy — priorizar las que tengan menos actividades ya generadas, para que la cobertura sea pareja entre las 5 categorías.
3. Buscar en internet (WebSearch) 1-2 referencias sobre técnicas basadas en evidencia para esa habilidad específica en terapia del habla infantil, para inspirar (no copiar) el diseño de la actividad.
4. Redactar una actividad nueva y completa con esta estructura exacta (mismo formato que las actividades existentes en `activities.json`):
   - `id`: slug único en inglés, formato `categoria-tema-nombre-corto-00N`
   - `title`
   - `category` (debe coincidir con una clave de `slp-topic-coverage-map.json`)
   - `skill`
   - `ageRange`
   - `groupSize`
   - `goal` (objetivo medible, con criterio de dominio si aplica, ej. "80% accuracy")
   - `materials` (array, materiales simples y accesibles — nada que requiera comprar algo caro)
   - `instructions` (array, pasos claros y accionables para el terapeuta)
   - `extension` (una idea para subir la dificultad)
   - `dateAdded` (fecha de hoy, formato YYYY-MM-DD)
   - `source`: `"original-ai-generated"`
5. Verificar que el `id` no exista ya en `activities.json`.

## Paso B — Generar la hoja de trabajo PDF con Canva (nuevo)

El objetivo es que cada actividad tenga un documento imprimible que la terapista pueda entregar directamente al estudiante — no solo texto explicativo. Se genera con el conector MCP de Canva (`generate-design`, `create-design-from-candidate`, `get-export-formats`, `export-design`).

1. Redactar el contenido específico de la hoja (nombres de casillas, línea de instrucción, marco de oración) desde cero, en inglés, apropiado para la edad/habilidad de la actividad de hoy. Nunca usar la mascota, los iconos exactos, ni el wording del material con copyright — solo el formato genérico.
2. Llamar a `generate-design` con `design_type: "document"` y un `query` detallado y específico (no genérico) que describa layout completo, por ejemplo siguiendo esta plantilla:
   > "A printable A4/Letter speech therapy worksheet for kids titled '<título original>'. Layout: header banner in teal (#1f5f6b) with the worksheet title; a 'Name: ____  Date: ____' line; one instruction line: '<instrucción original>'; then a grid of N rows/boxes with <descripción del contenido original de cada casilla — íconos genéricos tipo flat-illustration originales, NO copiar de ninguna fuente>; a fill-in-the-blank sentence at the bottom: '<marco de oración original>'; footer text 'SLP Activities Hub — for personal educational use'. Bright, friendly, kid-appropriate flat illustration style, large clear icons, generous spacing."
3. Elegir uno de los candidatos generados (`create-design-from-candidate`).
4. Confirmar formato exportable con `get-export-formats` y exportar con `export-design` (`type: "pdf"`, `size: "letter"`).
5. Guardar la URL de descarga temporal que devuelve `export-design` (expira en unas horas) y el `edit_url`/`view_url` del diseño en Canva.
6. Definir el nombre de archivo final: `worksheets/<id-de-la-actividad>.pdf` (mismo slug que el `id` de la actividad).
7. Agregar el campo `"worksheetPdf": "worksheets/<id>.pdf"` al objeto de la actividad antes de guardarlo en `activities.json`.

## Paso C — Publicar el cambio

1. Agregar el nuevo objeto (con su campo `worksheetPdf`) al array de `activities.json` (mantener los anteriores intactos) usando Edit/Write sobre `F:\SLP WEBSITE\activities.json`.
2. **Publicar `activities.json`:**
   - Si hay acceso a terminal/git configurado con un token de GitHub: hacer commit y push automáticamente.
   - Si no hay acceso a terminal: dejar `activities.json` actualizado en `F:\SLP WEBSITE` para que el usuario lo suba manualmente (ver `README.md`).
3. **Publicar el PDF de la hoja de trabajo (`worksheets/<id>.pdf`):**
   - Si hay acceso a terminal con capacidad de descargar archivos binarios de una URL (ej. `curl`/`requests`) y push a git: descargar el PDF de la URL de exportación de Canva, guardarlo en `F:\SLP WEBSITE\worksheets\<id>.pdf`, y subirlo junto con `activities.json`.
   - Si NO hay acceso a terminal (caso más común en este entorno): **no intentar** copiar el PDF — en su lugar, entregarle al usuario en el reporte final el enlace de descarga temporal (`export-design` URL) y el `edit_url` de Canva, indicándole el nombre exacto de archivo (`worksheets/<id>.pdf`) que debe usar al guardarlo antes de subirlo a GitHub junto con el `activities.json` actualizado.
4. Reportar en un mensaje corto: título de la actividad nueva, categoría, si `activities.json` se publicó automáticamente o quedó pendiente, y si el PDF quedó pendiente de descarga manual (con su enlace) o se publicó automáticamente.

## Frecuencia sugerida

Una actividad nueva (con su hoja de trabajo) por día es suficiente para crecer el sitio de forma sostenida sin saturar de contenido de baja calidad.
