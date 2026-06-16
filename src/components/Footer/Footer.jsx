import { useIntl } from 'react-intl'
import styles from './Footer.module.css'

export default function Footer() {
  const { formatMessage } = useIntl()

  return (
    <footer className={`${styles.footer} section--dark`}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>H</div>
          <p className={styles.tagline}>{formatMessage({ id: 'footer.tagline' })}</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/herathebeautystudio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://wa.me/34698119786" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Servicios</span>
            <a href="#services">Pestañas</a>
            <a href="#services">Cejas</a>
            <a href="#services">Manicura</a>
            <a href="#services">Pedicura</a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Estudio</span>
            <a href="#about">{formatMessage({ id: 'nav.about' })}</a>
            <a href="#gallery">{formatMessage({ id: 'nav.gallery' })}</a>
            <a href="#contact">{formatMessage({ id: 'nav.contact' })}</a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Contacto</span>
            <a href="tel:+34698119786">698 119 786</a>
            <a href="mailto:herathebeautystudio@gmail.com">herathebeautystudio@gmail.com</a>
            <span>Rúa Juan Flórez, 72 Bajo<br />15005 · A Coruña</span>
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
