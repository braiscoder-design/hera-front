import { useIntl } from 'react-intl'
import { IconInstagram, IconWhatsapp } from '../../icons'
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
