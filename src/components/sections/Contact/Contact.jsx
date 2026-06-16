import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import Map from '../../Map/Map'
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p>{formatMessage({ id: 'contact.address' })}</p>
                <p>{formatMessage({ id: 'contact.city' })}</p>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.6h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
              <a href={`tel:+34${formatMessage({ id: 'contact.phone' }).replace(/\s/g, '')}`}>
                {formatMessage({ id: 'contact.phone' })}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
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
            <a
              href="https://wa.me/34698119786"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
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
