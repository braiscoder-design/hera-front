import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'

const SITE_URL = 'https://herathebeautystudio.com'
const OG_IMAGE = `${SITE_URL}/images/hero-bg.jpg`

const STRUCTURED_DATA = {
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

export default function SEO() {
  const { formatMessage } = useIntl()
  const { locale } = useLang()

  const title = 'Hera The Beauty Studio | Pestañas, Cejas y Uñas en A Coruña'
  const description = formatMessage({ id: 'hero.subtitle' })
  const canonical = `${SITE_URL}${locale === 'gl' ? '?lang=gl' : ''}`

  return (
    <Helmet>
      {/* Basics */}
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hera The Beauty Studio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1400" />
      <meta property="og:image:height" content="933" />
      <meta property="og:locale" content={locale === 'gl' ? 'gl_ES' : 'es_ES'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(STRUCTURED_DATA)}
      </script>
    </Helmet>
  )
}
