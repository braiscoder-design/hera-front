// Fuente única de verdad para los servicios: usada por la sección Services
// de Home, el desplegable "Servicios" del Header y las rutas de App.jsx.
// `key` referencia las claves i18n `services.<key>.*`.
// `slug` es el segmento de ruta (sin acentos, seguro para URL).

export const SERVICES = [
  { key: 'lashes',   slug: 'pestanas',    img: '/images/service-lashes.jpg' },
  { key: 'brows',    slug: 'cejas',       img: '/images/service-brows.jpg' },
  { key: 'manicure', slug: 'manicura',    img: '/images/service-manicure.jpg' },
  { key: 'pedicure', slug: 'pedicura',    img: '/images/service-pedicure.jpg' },
  { key: 'training', slug: 'formaciones', img: '/images/service-formaciones.jpg' },
]
