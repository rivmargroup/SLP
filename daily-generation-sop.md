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

## Paso B — Generar la hoja de actividad PDF con Canva (actualizado)

El objetivo es que cada actividad tenga una página imprimible que el niño pueda **hacer** en la sesión — colorear, recortar, pegar, unir con líneas, buscar palabras o encontrar diferencias — no un documento "de oficina" con banners corporativos y bloques de texto informativo. La página misma ES la actividad: casi sin texto, mayormente dibujo/puzzle.

**Estilo visual obligatorio para todos los formatos:**
- Line-art doodle simple, tipo libro de colorear para niños: contornos negros gruesos, sin relleno de color, sin sombreado, sin ilustración "corporativa" ni estilo infografía.
- Nada de banners de color a todo el ancho, nada de pie de página con copyright/marca, nada de logos.
- Un título pequeño y casual (estilo escritura a mano) arriba, máximo 1 línea de instrucción corta debajo, y el resto de la página es la actividad visual.
- Nunca copiar iconos, mascota, wording exacto, combinaciones de color-key, ni layout de "The SLP Curriculum" ni de ningún material con copyright — solo la idea genérica del formato (grid, casillas para colorear, columnas para emparejar, etc., que son ideas de dominio común).

**Rotación de 6 formatos** (elegir uno por actividad nueva, rotando para que no se repita el mismo formato dos días seguidos — revisar `worksheetPdf` de las últimas actividades en `activities.json` para saber cuál tocó la última vez):

1. **Colorear (Coloring)** — dibujos grandes y simples en línea negra para que el niño coloree, relacionados con la habilidad (formas, animales, objetos, escena de una historia, etc.). Casi sin texto.
2. **Recortar y pegar (Cut-and-paste)** — tarjetitas pequeñas con líneas de corte punteadas en la parte inferior, y 2+ zonas de "pegar" arriba con contorno punteado, para clasificar/ordenar las tarjetas según la habilidad.
3. **Emparejar (Matching)** — dos columnas de dibujos simples en orden mezclado; el niño traza una línea conectando cada par relacionado.
4. **Ordenar/clasificar (Sorting)** — grupos o filas de dibujos simples (cantidades, categorías, tamaños) que el niño debe contar, circular, o clasificar coloreando/marcando.
5. **Busca las diferencias (Find-the-differences)** — dos escenas casi idénticas en línea simple con 4-6 diferencias pequeñas para que el niño encuentre y circule.
6. **Sopa de letras (Word search)** — grid de letras 8x10 a 10x10 con 6-8 palabras de vocabulario de la actividad escondidas horizontal/vertical/diagonal, más el banco de palabras debajo. (Usar solo para actividades de niños que ya leen, aprox. 5-8 años; para niños más chicos usar otro formato de la lista.)

Pasos técnicos (iguales para cualquier formato):

1. Redactar el contenido específico de la hoja (título casual, 1 línea de instrucción, elementos del dibujo/puzzle) desde cero, en inglés, apropiado para la edad/habilidad de la actividad de hoy.
2. Llamar a `generate-design` con `design_type: "document"` y un `query` detallado que describa el layout exacto siguiendo el estilo visual obligatorio de arriba y el formato elegido de la rotación (ver ejemplos ya usados en `activities.json` / historial de la tarea para referencia de redacción de `query`).
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
