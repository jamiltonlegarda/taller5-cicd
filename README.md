# taller5-cicd...

## ConfigCat

Configura la variable de entorno `CONFIGCAT_SDK_KEY` con el SDK Key del proyecto
en el entorno donde se ejecute la aplicación (por ejemplo, en las variables de
entorno del servicio de Render). No guardes la clave en el repositorio.

La ruta `GET /funcionalidad` evalúa el feature toggle `nueva-funcionalidad-x`.
Responde `Nueva funcionalidad` si está activado y `Funcionalidad antigua` si
está desactivado. Si no está configurada `CONFIGCAT_SDK_KEY`, responde HTTP 503....
