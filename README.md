# Sitio personal de Raúl Zuleta

Sitio personal dedicado a investigaciones, proyectos y materiales que articulan antropología, pedagogía y experimentación material. Se sirve directamente desde la carpeta `dist` y no requiere instalación ni compilación.

## Estado

- La rama `main` contiene la versión aprobada del contenido y del layout.
- El contenido español es la fuente canónica y la traducción inglesa terminó su auditoría final.
- La ronda final de layout, accesibilidad y revisión visual está cerrada.
- Los documentos, imágenes, audios, permisos y atribuciones incorporados al sitio fueron revisados durante la ronda de contenidos.
- El sitio público aprobado está disponible en `https://razc.cl` y se aloja en GitHub Pages.
- GitHub Actions publica exclusivamente la carpeta `dist` después de cada cambio enviado a `main`.
- Cloudflare administra el DNS y Turnstile; Formspree recibe el formulario de contacto.

## Procedimiento de actualización

1. Editar y revisar los archivos de `dist` en el entorno local.
2. Comprobar los cambios localmente y revisar `git diff` antes de confirmar.
3. Crear un commit descriptivo y enviarlo a la rama `main` de GitHub.
4. Verificar que el workflow **Deploy static content to Pages** termine correctamente en la pestaña **Actions**.
5. Revisar el resultado en `https://razc.cl`, incluida la versión móvil cuando el cambio afecte la interfaz.
6. Registrar en `REGISTRO_PREPUBLICACION.md` cualquier cambio de infraestructura, seguridad o servicio externo.

No se debe subir al repositorio la clave secreta de Turnstile ni ninguna credencial. Los cambios de DNS se realizan en Cloudflare; el dominio se administra en NIC Chile; el dominio personalizado y HTTPS se administran en GitHub Pages; y el destino, la protección y las restricciones del formulario se administran en Formspree.

## Pendientes de mantenimiento

- Comprobar periódicamente que el formulario siga enviando y notificando correctamente.
- Mantener vigente la inscripción de `razc.cl` en NIC Chile.
- Revisar enlaces y documentos después de cambios importantes de contenido.
- Evaluar URL estáticas por proyecto solo si se requiere posicionamiento individual en buscadores.

El avance y las decisiones de esta fase se registran en `REGISTRO_PREPUBLICACION.md`.
