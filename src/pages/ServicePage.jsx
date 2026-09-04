import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
// Acordeón "Más información" (duración/precio, incluye, cuidados, FAQ):
// oculto temporalmente (ver sección comentada más abajo) hasta que se
// decida si se va a usar. No se borra por si se retoma más adelante.
// import Accordion from '../components/Accordion/Accordion'
import ServiceIcon from '../components/ServiceIcon/ServiceIcon'
import SubsectionList from '../components/SubsectionList/SubsectionList'
import { IconWhatsapp, IconCalendar } from '../icons'
// import { ACCORDION_KEYS } from './service-page-constants'
import { SUBSECTIONS_SERVICE_KEYS } from './service-page-constants'
import { SERVICE_SUBSECTIONS } from './service-subsections-data'
import styles from './ServicePage.module.css'

export default function ServicePage({ service }) {
  const { formatMessage } = useIntl()
  const [heroRef, heroInView] = useInView()
  const [introRef, introInView] = useInView()
  // const [infoRef, infoInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  const { key, img } = service

  const hasSubsections = SUBSECTIONS_SERVICE_KEYS.includes(key)

  // Contenido del acordeón "Más información", oculto temporalmente junto
  // con la sección de abajo.
  // const accordionItems = ACCORDION_KEYS.map((k) => {
  //   const title = formatMessage({ id: `servicePage.accordion.${k}.title` })
  //   // "Qué incluye la sesión": si ya tenemos el listado real de
  //   // sub-servicios (extraído de Koibox) para este servicio, se muestra
  //   // como lista en vez del texto de ejemplo genérico.
  //   if (k === 'includes' && hasSubsections) {
  //     const list = formatMessage({ id: `services.${key}.subsections` }).split('\n')
  //     return { title, list }
  //   }
  //   return { title, body: formatMessage({ id: `servicePage.accordion.${k}.body` }) }
  // })

  return (
    <>
      <section
        ref={heroRef}
        className={`${styles.hero} ${!img ? styles.heroNoImage : ''}`}
        style={img ? { backgroundImage: `url(${img})` } : undefined}
      >
        {img ? (
          <div className={styles.heroOverlay} />
        ) : (
          <div className={styles.heroIconBg} aria-hidden="true">
            <ServiceIcon serviceKey={key} />
          </div>
        )}
        <div className={`${styles.heroInner} container`}>
          <Link
            to="/#services"
            className={`${styles.back} reveal reveal--up${heroInView ? ' is-visible' : ''} reveal--d1`}
          >
            ← {formatMessage({ id: 'servicePage.back' })}
          </Link>
          <h1 className={`${styles.title} reveal reveal--up${heroInView ? ' is-visible' : ''} reveal--d2`}>
            {formatMessage({ id: `services.${key}.title` })}
          </h1>
          <p className={`${styles.tagline} reveal reveal--up${heroInView ? ' is-visible' : ''} reveal--d3`}>
            {formatMessage({ id: `services.${key}.tagline` })}
          </p>
        </div>
      </section>

      <p className={styles.pendingNotice}>
        {formatMessage({ id: 'servicePage.pending' })}
      </p>

      <section ref={introRef} className="section">
        <div className="container">
          <div className={`${styles.intro} reveal reveal--up${introInView ? ' is-visible' : ''} reveal--d1`}>
            <p className={styles.introText}>
              {formatMessage({ id: `services.${key}.desc` })}
            </p>
            {!hasSubsections && (
              <p className={styles.introItems}>
                {formatMessage({ id: `services.${key}.items` })}
              </p>
            )}
          </div>
          {/* Listado real de sub-servicios (nombre + duración + precio,
              descripción en desplegable) extraído de koibox, en vez del
              resumen corto de "items" de arriba. */}
          {hasSubsections && (
            <div className={`${styles.subsectionsWrap} reveal reveal--up${introInView ? ' is-visible' : ''} reveal--d2`}>
              <SubsectionList serviceKey={key} items={SERVICE_SUBSECTIONS[key]} />
            </div>
          )}
        </div>
      </section>

      {/* Sección "Más información" (acordeón duración/incluye/cuidados/FAQ):
          oculta temporalmente, no se sabe todavía si se va a usar. No se
          borra por si se retoma más adelante — para reactivarla, descomentar
          esto y también el import de Accordion, ACCORDION_KEYS, infoRef/
          infoInView y accordionItems de arriba. */}
      {/* <section ref={infoRef} className="section section--alt">
        <div className="container">
          <div className={`${styles.infoHeader} reveal reveal--up${infoInView ? ' is-visible' : ''} reveal--d1`}>
            <span className="label">{formatMessage({ id: 'servicePage.infoLabel' })}</span>
            <div className="divider" />
            <h2 className={styles.infoTitle}>
              {formatMessage({ id: 'servicePage.infoTitle' })}
            </h2>
          </div>
          <div className={`${styles.accordionWrap} reveal reveal--up${infoInView ? ' is-visible' : ''} reveal--d2`}>
            <Accordion items={accordionItems} />
          </div>
        </div>
      </section> */}

      <section ref={ctaRef} className="section section--dark">
        <div className={`${styles.cta} container reveal reveal--up${ctaInView ? ' is-visible' : ''} reveal--d1`}>
          <h2 className={styles.ctaTitle}>
            {formatMessage({ id: 'servicePage.ctaTitle' })}
          </h2>
          <p className={styles.ctaBody}>
            {formatMessage({ id: 'servicePage.ctaBody' })}
          </p>
          <div className={styles.ctaActions}>
            <a
              href="https://wa.me/34698119786"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              <IconWhatsapp />
              {formatMessage({ id: 'contact.whatsapp' })}
            </a>
            <a
              href="https://reservas.koibox.cloud/por-definir"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnKoibox}
            >
              <IconCalendar />
              {formatMessage({ id: 'contact.koibox' })}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
