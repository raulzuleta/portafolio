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

Decisión aplicada el 17 de octubre de 2026: GitHub Pages desde el repositorio público `raulzuleta/portafolio`, mediante GitHub Actions y publicando exclusivamente el contenido de `dist`.

El despliegue de prueba se verificó en `https://raulzuleta.github.io/portafolio/`. Tras asignar el dominio definitivo, esa dirección redirige al sitio público. El formulario se conecta a Formspree porque GitHub Pages no procesa ni almacena envíos.

## Dominio

- Dominio inscrito por Raúl el 16 de octubre de 2026: `razc.cl`.
- Proveedor DNS: Cloudflare, plan gratuito.
- Servidores autoritativos configurados en NIC Chile: `donovan.ns.cloudflare.com` y `lila.ns.cloudflare.com`.
- NIC Chile no se configuró como servidor secundario.
- Registros del dominio raíz: cuatro registros A de GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`), en modo DNS only.
- `www`: CNAME a `raulzuleta.github.io`, en modo DNS only.
- Dominio verificado en la cuenta de GitHub mediante el registro TXT `_github-pages-challenge-raulzuleta`; conservarlo permanentemente.
- Dominio personalizado de GitHub Pages: `razc.cl`, con comprobación DNS satisfactoria.
- HTTPS obligatorio activado el 17 de octubre de 2026.
- Comprobación pública: `https://razc.cl` responde correctamente y `https://www.razc.cl` redirige al dominio principal. Durante la activación persistió brevemente una respuesta HTTP previa en caché, pendiente de expirar.

## Metadatos y SEO básico

Implementado localmente el 16 de octubre de 2026:

- URL canónica y correspondencia `hreflang` para las páginas estáticas en español e inglés;
- metadatos Open Graph y Twitter con tarjeta social grande compartida;
- imagen social `assets/social-card.png` de 1200 × 630 px, coherente con la identidad visual aprobada;
- datos estructurados `Person` en las portadas;
- instrucciones de indexación, `robots.txt` y `sitemap.xml` asociados a `https://razc.cl`.

Las vistas de proyectos se construyen desde una sola página por idioma y cambian mediante el parámetro `id`. Por ahora se mantienen metadatos genéricos y se excluyen sus variantes del sitemap para no declarar URL canónicas incorrectas. Si se requiere posicionamiento individual de cada proyecto, será necesario generar una URL estática por proyecto o incorporar metadatos durante una fase de compilación.

La tarjeta social usa una única imagen bilingüe —nombre, ejes temáticos y dominio— para todas las páginas. Su visualización real en servicios externos deberá comprobarse después del despliegue de prueba, porque cada plataforma mantiene su propia caché.

## Formulario de contacto

Decisión del 16 de octubre de 2026:

- servicio receptor: Formspree, plan gratuito;
- endpoint público configurado en las versiones española e inglesa;
- destino de las notificaciones de Formspree: `raulzuleta1@gmail.com`;
- alternativa pública visible ante errores: `razuletac@uc.cl`;
- envío asíncrono sin abandonar el portafolio;
- confirmación visible solo después de una respuesta exitosa del servicio;
- conservación de los campos y enlace de correo alternativo cuando el envío falla;
- campo señuelo `_gotcha` y futura restricción al dominio público;
- sin copia adicional inicial en el servidor `viejito-perro`; el correo recibido actuará como archivo.

Prueba pública del 17 de octubre de 2026:

- el primer envío falló porque el CAPTCHA estándar de Formspree estaba activo, pero el formulario usa envío asíncrono y no incluía el token requerido;
- el intento fallido no apareció en Inbox ni en Spam;
- se desactivó temporalmente CAPTCHA en Formspree, manteniendo Formshield y el campo señuelo `_gotcha`;
- el segundo envío fue aceptado, mostró la confirmación, vació los campos, apareció en Submissions y generó correctamente una notificación a `raulzuleta1@gmail.com`;
- se eliminó del formulario la mención visible al proveedor, conservando el consentimiento sobre envío y almacenamiento de datos.

Decisión antispam pendiente: al configurar Cloudflare y el dominio definitivo, incorporar Cloudflare Turnstile con claves propias y restringir Formspree a `razc.cl`. Ninguna clave secreta deberá incorporarse al repositorio.

## Pruebas públicas de interfaz

Revisión manual realizada por Raúl el 17 de octubre de 2026 en escritorio, simulación móvil, Safari y teléfono real. Navegación, idiomas, enlaces, documentos, validación y formulario funcionaron correctamente. Se detectaron tres ajustes técnicos:

- restituir separación entre la barra superior y el primer campo del formulario después de eliminar el aviso de Formspree;
- reorganizar verticalmente y centrar las flechas del diagrama “Cómo funciona” de Viejito-Perro en móvil;
- forzar a una sola columna, a ancho completo, las imágenes del afiche y la introducción conceptual del caso de cadenas de valor en móvil.

Los tres ajustes fueron implementados, comprobados localmente a 390 px de ancho y publicados correctamente.

## Próximo punto de decisión

Configurar Cloudflare Turnstile para el formulario y restringir Formspree a `razc.cl`.

No considerar definitiva la protección antispam hasta comprobar Turnstile desde `razc.cl`.
