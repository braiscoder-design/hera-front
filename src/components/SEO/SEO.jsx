import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
import { SITE_URL, OG_IMAGE, OG_LOCALES, STRUCTURED_DATA } from './seo-constants'

export default function SEO() {
  const { formatMessage } = useIntl()
  const { locale } = useLang()

  const title = 'Hera The Beauty Studio | Pestañas, Cejas y Uñas en A Coruña'
  const description = formatMessage({ id: 'hero.subtitle' })
  const canonical = `${SITE_URL}${locale === 'es' ? '' : `?lang=${locale}`}`

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
      <meta property="og:locale" content={OG_LOCALES[locale]} />

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
