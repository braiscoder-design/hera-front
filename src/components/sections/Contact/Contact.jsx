import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import Map from '../../Map/Map'
import { IconMapPin, IconPhone, IconMail, IconWhatsapp, IconCalendar } from '../../../icons'
import styles from './Contact.module.css'

export default function Contact() {
  const { formatMessage } = useIntl()
  const [textRef, textInView] = useInView()
  const [mapRef, mapInView] = useInView()

  return (
    <section id="contact" className={`${styles.contact} section section--dark`}>
      <div className={`${styles.inner} container`}>

        <div ref={textRef} className={styles.textCol}>
          <span
            className={`label reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d1`}
            style={{ color: 'var(--color-accent)' }}
          >
            {formatMessage({ id: 'contact.label' })}
          </span>
          <div className={`divider reveal reveal--fade${textInView ? ' is-visible' : ''} reveal--d2`} />
          <h2 className={`${styles.title} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d2`}>
            {formatMessage({ id: 'contact.title' })}
          </h2>

          <div className={`${styles.info} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d3`}>
            <div className={styles.infoBlock}>
              <IconMapPin />
              <div>
                <p>{formatMessage({ id: 'contact.address' })}</p>
                <p>{formatMessage({ id: 'contact.city' })}</p>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <IconPhone />
              <a href={`tel:+34${formatMessage({ id: 'contact.phone' }).replace(/\s/g, '')}`}>
                {formatMessage({ id: 'contact.phone' })}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <IconMail />
              <a href={`mailto:${formatMessage({ id: 'contact.email' })}`}>
                {formatMessage({ id: 'contact.email' })}
              </a>
            </div>
          </div>

          <div className={`${styles.hours} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d4`}>
            <p className={styles.hoursTitle}>{formatMessage({ id: 'contact.hours.title' })}</p>
            <p>{formatMessage({ id: 'contact.hours.weekdays' })}</p>
            <p>{formatMessage({ id: 'contact.hours.saturday' })}</p>
          </div>

          <div className={`${styles.actions} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d5`}>
            <div className={styles.reserveGroup}>
              <div className={styles.topRow}>
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
                  href="https://maps.google.com/?q=Rúa+Juan+Flórez+72+A+Coruña"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  style={{ color: 'rgba(247,243,238,0.6)' }}
                >
                  {formatMessage({ id: 'contact.directions' })} →
                </a>
              </div>

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
        </div>

        <div
          ref={mapRef}
          className={`${styles.mapCol} reveal reveal--right reveal--slow${mapInView ? ' is-visible' : ''} reveal--d2`}
        >
          <Map />
        </div>

      </div>
    </section>
  )
}
