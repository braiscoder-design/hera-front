// Constantes de datos de ServicePage, separadas del componente siguiendo la
// norma de CLAUDE.md (ver "Constantes de datos").

export const ACCORDION_KEYS = ['duration', 'includes', 'aftercare', 'faq']

// Servicios para los que ya tenemos el listado real de sub-servicios
// (extraído de Koibox) en `services.<key>.subsections` — un string con un
// sub-servicio por línea (separados por "\n"). Para el resto (de momento
// micropigmentation, training) el acordeón "Qué incluye la sesión" sigue
// mostrando el texto de ejemplo genérico.
export const SUBSECTIONS_SERVICE_KEYS = [
  'manicure',
  'pedicure',
  'threading',
  'brows',
  'lashLifting',
  'lashExtensions',
  'lips',
  'pressotherapy',
]
