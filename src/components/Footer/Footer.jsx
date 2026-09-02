import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { IconInstagram, IconWhatsapp } from '../../icons'
import { SERVICES } from '../../data/services'
import styles from './Footer.module.css'

export default function Footer() {
  const { formatMessage } = useIntl()

  return (
    <footer className={`${styles.footer} section--dark`}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <img src="/logo/LOGO_V1-N.svg" alt="Hera The Beauty Studio" className={styles.logoMark} />
          <p className={styles.tagline}>{formatMessage({ id: 'footer.tagline' })}</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/herathebeautystudio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://wa.me/34698119786" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IconWhatsapp width={20} height={20} />
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Servicios</span>
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`}>
                {formatMessage({ id: `services.${s.key}.title` })}
              </Link>
            ))}
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Estudio</span>
            <Link to="/#about">{formatMessage({ id: 'nav.about' })}</Link>
            <Link to="/#gallery">{formatMessage({ id: 'nav.gallery' })}</Link>
            <Link to="/#contact">{formatMessage({ id: 'nav.contact' })}</Link>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Contacto</span>
            <a href="tel:+34698119786">698 119 786</a>
            <a href="mailto:herathebeautystudio@gmail.com">herathebeautystudio@gmail.com</a>
            <span>Calle Juan Flórez, 72 Bajo<br />15005 · A Coruña</span>
          </div>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <p>{formatMessage({ id: 'footer.rights' })}</p>
        <div className={styles.legal}>
          <a href="#">{formatMessage({ id: 'footer.legal' })}</a>
          <a href="#">{formatMessage({ id: 'footer.privacy' })}</a>
          <a href="#">{formatMessage({ id: 'footer.cookies' })}</a>
        </div>
      </div>
    </footer>
  )
}
