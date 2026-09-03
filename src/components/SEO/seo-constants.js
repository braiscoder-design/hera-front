// Constantes de datos de SEO (URL del sitio, imagen OG y JSON-LD),
// separadas del componente siguiendo la norma de CLAUDE.md
// (ver "Constantes de datos").

export const SITE_URL = 'https://herathebeautystudio.com'
export const OG_IMAGE = `${SITE_URL}/images/hero-bg.jpg`

// Mapeo de locale interno -> og:locale (formato idioma_PAÍS de Open Graph)
export const OG_LOCALES = { es: 'es_ES', gl: 'gl_ES', en: 'en_US' }

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Hera The Beauty Studio',
  description:
    'Especialistas en extensiones de pestañas, diseño de cejas, manicura y pedicura en A Coruña.',
  url: SITE_URL,
  telephone: '+34698119786',
  email: 'herathebeautystudio@gmail.com',
  image: OG_IMAGE,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rúa Juan Flórez 72 Bajo',
    addressLocality: 'A Coruña',
    postalCode: '15005',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.3677,
    longitude: -8.4064,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/herathebeautystudio/',
    'https://www.facebook.com/Herathebeautystudio/',
  ],
  hasMap: 'https://maps.google.com/?q=Rúa+Juan+Flórez+72+A+Coruña',
}
