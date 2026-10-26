# Coach Gon

App de entrenamiento para la Media Maratón de Zaragoza (14 de marzo de 2027): plan de 20 semanas, registro de sesiones, actividades extra y temporizador de intervalos.

App: https://lll6626.github.io/coach-gon/

## Cómo actualizarla
1. Edita `_fuente/src.html` (diseño y lógica) o `_fuente/plan_media_maraton.json` (el plan).
2. Ejecuta `python3 _fuente/build.py` y copia el `index.html` generado a la raíz.
3. Sube `APP_VERSION` en `src.html` y `VERSION` en `sw.js` para que los móviles detecten la versión nueva.

Los datos de cada persona se guardan solo en su propio móvil.
