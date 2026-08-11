# SLP Activities Hub — sitio y pipeline de contenido

Sitio estático gratuito (GitHub Pages) que publica actividades originales de terapia del habla, generadas por un agente de IA usando `slp-topic-coverage-map.json` como checklist de temas.

## Archivos de esta carpeta

- `index.html`, `style.css`, `script.js` — el sitio (galería de tarjetas + modal de detalle).
- `activities.json` — la "base de datos" del sitio: actividades originales, listas para publicar. El agente le agrega una nueva cada día.
- `slp-topic-coverage-map.json` — mapa de categorías/habilidades (solo nombres genéricos, sin contenido con copyright) que el agente usa para saber qué temas existen y generar variedad sin duplicar.
- `daily-generation-sop.md` — el procedimiento que sigue el agente cada día para crear una actividad nueva.
- `games/` — juegos interactivos originales, 100% en inglés, jugables directamente en el navegador (sin descargas). Cada juego es un archivo HTML autocontenido (su propio CSS y JS embebidos, sin `fetch` externo) para que funcione tanto abierto localmente (`file://`) como en GitHub Pages.
  - `games/index.html` — página principal de juegos, con tarjetas hacia cada juego disponible.
  - `games/find-it.html` — juego de opción múltiple ("Find It!") con preguntas de las 5 categorías del sitio.
  - `games/race.html` — juego de carrera de tablero ("Board Race"), autocalificado por el clínico, para 1 o 2 jugadores.
  - `games/tic-tac-toe.html` — Tic-Tac-Toe: responde una pregunta de opción múltiple correctamente para reclamar tu casilla.
  - `games/connect-four.html` — Cuatro en línea: responde correctamente para soltar tu ficha; detecta 4 en línea horizontal, vertical y diagonal.

Esta carpeta (`F:\SLP WEBSITE`) es tu carpeta de trabajo permanente para este proyecto — el agente la reutiliza en cada ejecución programada, así que todo el contenido se acumula aquí de forma consistente.

## Paso 1 — Crear el repositorio en GitHub (una sola vez)

1. Si no tienes cuenta, crea una gratis en https://github.com/signup
2. Crea un repositorio nuevo, público, llamado por ejemplo `slp-activities-hub`.
3. Sube estos archivos y carpetas (`index.html`, `style.css`, `script.js`, `activities.json`, y la carpeta `games/` completa con sus 5 archivos: `index.html`, `find-it.html`, `race.html`, `tic-tac-toe.html`, `connect-four.html`) arrastrándolos a la página del repositorio ("Add file" → "Upload files").
4. Ve a **Settings → Pages**. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. En 1-2 minutos tu sitio estará en `https://<tu-usuario>.github.io/slp-activities-hub/`.

## Paso 2 — Cómo se agregará contenido nuevo cada día

Con una tarea programada diaria, el agente:
1. Lee `slp-topic-coverage-map.json` y `activities.json` para ver qué ya existe.
2. Investiga brevemente técnicas de terapia del habla basadas en evidencia.
3. Redacta **una actividad 100% original** (nunca copia "The SLP Curriculum" ni ningún material con copyright).
4. La agrega a `activities.json`, aquí en `F:\SLP WEBSITE`.

**Sobre la publicación automática:** el entorno del agente hoy no tiene acceso a terminal ni a un conector de GitHub, así que no puede hacer `git push` por sí mismo. Cada vez que genere una actividad nueva, te avisará y dejará `activities.json` actualizado en esta carpeta. Para publicarla:

- Ve a tu repo en GitHub → abre `activities.json` → clic en el lápiz (editar) → pega el contenido actualizado de tu archivo local → "Commit changes".

Esto toma menos de un minuto al día. Si más adelante se habilita la terminal o un conector de GitHub, puedo automatizar también este último paso.

## Licencia / originalidad

Todo el contenido en `activities.json` es redactado desde cero por el agente de IA. `slp-topic-coverage-map.json` contiene únicamente nombres genéricos de habilidades (de dominio común en terapia del habla), nunca texto, formato ni diseño de material con derechos de autor de terceros.
