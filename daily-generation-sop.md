# SOP: generación diaria de una actividad SLP nueva

Este es el procedimiento (prompt) que ejecuta la tarea programada diaria. Se usa tal cual como instrucción de la scheduled task.

## Reglas fijas (nunca romper)

1. **Nunca** copiar, parafrasear de cerca, ni reproducir texto, instrucciones, wording o diseño de "The SLP Curriculum" ni de ningún otro material con derechos de autor. Solo se pueden usar los nombres genéricos de habilidades/categorías que están en `slp-topic-coverage-map.json` — esos son ideas de dominio común, no expresión protegida.
2. Todo el contenido debe ser **100% redactado desde cero** por el agente.
3. Revisar `activities.json` antes de generar, para no repetir un `id` ni una actividad casi idéntica a una ya existente (mismo título/mismos materiales/misma mecánica).

## Pasos

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
6. Agregar el nuevo objeto al array de `activities.json` (mantener los anteriores intactos) usando Edit/Write sobre `F:\SLP WEBSITE\activities.json`.
7. Publicar el cambio:
   - Si hay acceso a terminal/git configurado con un token de GitHub: hacer commit y push automáticamente del `activities.json` actualizado al repositorio del sitio.
   - Si no hay acceso a terminal: dejar `activities.json` actualizado en `F:\SLP WEBSITE` y notificar al usuario con un resumen de 1-2 líneas de la actividad nueva, recordándole que debe pegar el `activities.json` actualizado en GitHub (ver `README.md`).
8. Reportar en un mensaje corto: título de la actividad nueva, categoría, y si se publicó automáticamente o si quedó pendiente de que el usuario la suba.

## Frecuencia sugerida

Una actividad nueva por día es suficiente para crecer el sitio de forma sostenida sin saturar de contenido de baja calidad.
