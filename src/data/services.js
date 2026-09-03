// Fuente única de verdad para los servicios: usada por la sección Services
// de Home, el desplegable "Servicios" del Header, el Footer y las rutas de
// App.jsx.
// `key` referencia las claves i18n `services.<key>.*`.
// `slug` es el segmento de ruta (sin acentos, seguro para URL).
// `img` es null en los servicios que todavía no tienen foto propia — en su
// lugar se muestra un bloque de color con el icono del servicio en grande
// (ver ServiceIcon, Services.module.css y ServicePage.module.css).
//
// Lista oficial de las 9 secciones + Formaciones (servicio adicional).

export const SERVICES = [
  { key: 'manicure',          slug: 'manicura',            img: '/images/service-manicure.jpg' },
  { key: 'pedicure',          slug: 'pedicura',            img: '/images/service-pedicure.jpg' },
  { key: 'threading',         slug: 'depilacion-hilo',     img: null },
  { key: 'brows',             slug: 'cejas',               img: '/images/service-brows.jpg' },
  { key: 'lashLifting',       slug: 'lifting-pestanas',    img: '/images/service-lashes.jpg' },
  { key: 'lashExtensions',    slug: 'extensiones-pestanas', img: null },
  { key: 'lips',              slug: 'tratamiento-labios',  img: null },
  { key: 'micropigmentation', slug: 'micropigmentacion',   img: null },
  { key: 'pressotherapy',     slug: 'presoterapia',        img: null },
  { key: 'training',          slug: 'formaciones',         img: '/images/service-formaciones.jpg' },
]
