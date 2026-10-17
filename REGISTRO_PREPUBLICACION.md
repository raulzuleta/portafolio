# Registro de prepublicación

Fecha de apertura: 16 de octubre de 2026.

## Alcance

Este registro distingue cuatro entornos:

- **Local:** copia de trabajo donde se revisan y preparan los cambios.
- **GitHub:** repositorio remoto y su historial; todavía privado al abrir este registro.
- **Prueba:** despliegue temporal para validación pública antes de asignar el dominio definitivo.
- **Público:** versión aprobada accesible mediante el dominio definitivo.

Ningún cambio en el entorno local implica por sí solo que GitHub, el despliegue de prueba o el sitio público hayan sido modificados.

## Estado de partida

- Rama canónica: `main`.
- Commit auditado: `e8cbcaf` (`Cierra auditoría final de traducción`).
- El checkout estaba limpio y la referencia local `origin/main` coincidía con `main`.
- La versión aprobada se sirve directamente desde `dist`, sin instalación ni compilación.
- El formulario de contacto es un prototipo: valida campos, pero no envía ni almacena información.
- No se ha configurado ni comprobado un servidor de prueba, sitio público, dominio, DNS o HTTPS.

## Limpieza previa a publicación

### Retirado de `dist`

- `favicon-preview.html`: página de comparación utilizada durante la elección del favicon.
- `assets/favicon-open-circle.svg`: alternativa de favicon descartada y utilizada solo por la página anterior.
- `assets/cencosud/prototipo-gastos.png`: versión no utilizada, sustituida en el sitio por `prototipo-gastos-recortado.png`.
- `assets/pedagogia/cadenas-conclusiones.png`: imagen no referenciada por ninguna página o script aprobado.
- `assets/pedagogia/encuentro-2024-captura.jpeg`: imagen no referenciada por ninguna página o script aprobado.

### Conservado

- La secuencia fotográfica de Huerto se conserva: sus imágenes se cargan dinámicamente desde `assets/project.js`.
- `assets/viejito-perro/carcasa-nodo-02-v02.scad` se conserva provisionalmente. No es utilizado por la interfaz, pero puede definirse posteriormente como archivo fuente descargable.
- Los certificados y documentos académicos se conservan mientras se revisa su exposición de datos personales.

## Auditoría previa a hacer público el repositorio

### Historial y secretos

- Se revisaron 862 objetos alcanzables desde todas las referencias Git locales.
- No se detectaron claves privadas, tokens conocidos ni asignaciones de contraseñas o secretos de alto riesgo.
- No se encontraron nombres de archivo característicos de credenciales dentro del historial alcanzable.

Esta comprobación reduce el riesgo, pero no sustituye la revisión de datos personales contenidos en documentos e imágenes.

### Ramas remotas

La referencia local de `origin` registra, además de `main`, doce ramas de trabajo o experimentación. Si el repositorio se hace público, esas ramas y sus historiales también serán accesibles. No se ha eliminado ninguna rama remota.

Decisión pendiente: eliminar de GitHub las ramas experimentales ya integradas o aceptar expresamente su publicación antes de cambiar la visibilidad del repositorio.

### PDF y datos personales

- Los 29 PDF actuales no están cifrados.
- No se observaron secretos técnicos en sus metadatos.
- Tres certificados contienen patrones de identificación personal extraíbles: dos presentan un identificador con formato de RUT y uno presenta ese formato junto con otra secuencia numérica que debe verificarse visualmente.
- La revisión visual confirmó que el certificado del diplomado en experiencia de cliente expone el RUT, un código de validación y un código QR. Estos elementos no deberían publicarse sin una decisión expresa.
- La revisión visual de los certificados de Consumer Psychology y del curso de curatoria no mostró identificadores personales adicionales evidentes, aparte del nombre.
- Varios certificados son imágenes sin texto extraíble; por ello, una búsqueda automática no permite descartar que contengan RUT, códigos de verificación u otros datos personales visibles.
- Algunos PDF conservan metadatos de autor, título, aplicación creadora y fechas. Los datos observados son mayormente descriptivos, pero conviene normalizarlos si se decide ofrecer copias públicas definitivas.

Decisión del 16 de octubre de 2026: publicar los certificados íntegros. Raúl acepta expresamente la exposición de los identificadores, códigos de validación y otros datos personales visibles en ellos. No se crearán copias censuradas antes de la publicación.

## Alojamiento

Hipótesis actual: GitHub Pages desde un repositorio público, publicando exclusivamente el contenido de `dist`. No se ha activado Pages ni cambiado la visibilidad del repositorio.

El formulario se conecta a Formspree porque GitHub Pages no procesa ni almacena envíos. La hipótesis de alojamiento quedará lista para aprobación después de comprobar el formulario en un despliegue de prueba.

## Formulario de contacto

Decisión del 16 de octubre de 2026:

- servicio receptor: Formspree, plan gratuito;
- endpoint público configurado en las versiones española e inglesa;
- destino y alternativa visible ante errores: `razuletac@uc.cl`;
- envío asíncrono sin abandonar el portafolio;
- confirmación visible solo después de una respuesta exitosa del servicio;
- conservación de los campos y enlace de correo alternativo cuando el envío falla;
- campo señuelo `_gotcha` y futura restricción al dominio público;
- sin copia adicional inicial en el servidor `viejito-perro`; el correo recibido actuará como archivo.

Configuración antispam informada: reCAPTCHA de Formspree con la clave secreta personalizada en blanco. Se asume que corresponde al reCAPTCHA predeterminado administrado por Formspree; esta suposición debe comprobarse mediante un envío controlado en el despliegue de prueba. No se incorporará ninguna clave secreta al repositorio.

## Próximo punto de decisión

Comprobar reCAPTCHA y ejecutar un envío real controlado desde el despliegue de prueba antes de publicar.

No continuar con la publicación definitiva o el DNS hasta comprobar el formulario y reCAPTCHA en el despliegue de prueba.
