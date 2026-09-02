import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
import { IconWhatsapp, IconCalendar, IconChevronDown } from '../../icons'
import { SERVICES } from '../../data/services'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { id: 'nav.home',     href: '/#hero' },
  { id: 'nav.about',    href: '/#about' },
  { id: 'nav.services', services: true },
  { id: 'nav.gallery',  href: '/#gallery' },
  { id: 'nav.contact',  href: '/#contact' },
]

export default function Header() {
  const { formatMessage } = useIntl()
  const { toggleLocale } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const bookRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!bookOpen) return
    const handleOutside = (e) => {
      if (bookRef.current && !bookRef.current.contains(e.target)) setBookOpen(false)
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setBookOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [bookOpen])

  // El menú a pantalla completa siempre resetea el submenú de Servicios al cerrarse
  useEffect(() => {
    if (!menuOpen) setServicesOpen(false)
  }, [menuOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setBookOpen(false)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={`${styles.inner} container`}>
        <Link to="/" className={styles.logo} onClick={closeAll}>
          <img src="/logo/LOGO_V1-N.svg" alt="Hera The Beauty Studio" className={styles.logoImg} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map((item) => {
            if (item.services) {
              return (
                <div key={item.id} className={styles.navServices}>
                  <button
                    type="button"
                    className={styles.navServicesToggle}
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                  >
                    {formatMessage({ id: item.id })}
                    <IconChevronDown className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ''}`} />
                  </button>
                  <div
                    className={`${styles.navServicesMenu} ${servicesOpen ? styles.navServicesMenuOpen : ''}`}
                    aria-hidden={!servicesOpen}
                  >
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/${s.slug}`}
                        className={styles.navSubLink}
                        tabIndex={servicesOpen ? 0 : -1}
                        onClick={closeAll}
                      >
                        {formatMessage({ id: `services.${s.key}.title` })}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <Link
                key={item.id}
                to={item.href}
                className={styles.navLink}
                onClick={closeAll}
              >
                {formatMessage({ id: item.id })}
              </Link>
            )
          })}

          <button className={styles.navLangToggle} onClick={toggleLocale}>
            {formatMessage({ id: 'lang.switch' })}
          </button>
        </nav>

        <div className={styles.actions}>
          <div className={styles.bookWrapper} ref={bookRef}>
            <button
              type="button"
              className={`btn btn--primary ${styles.navBook}`}
              onClick={() => setBookOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={bookOpen}
            >
              {formatMessage({ id: 'nav.book' })}
              <IconChevronDown className={`${styles.chevron} ${bookOpen ? styles.chevronOpen : ''}`} />
            </button>

            {bookOpen && (
              <div className={styles.bookMenu} role="menu">
                <a
                  href="https://wa.me/34698119786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookOption}
                  role="menuitem"
                  onClick={() => setBookOpen(false)}
                >
                  <IconWhatsapp width={16} height={16} strokeWidth={1.6} stroke="#25D366" />
                  {formatMessage({ id: 'contact.whatsapp' })}
                </a>
                <a
                  href="https://reservas.koibox.cloud/por-definir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookOption}
                  role="menuitem"
                  onClick={() => setBookOpen(false)}
                >
                  <IconCalendar width={16} height={16} strokeWidth={1.6} style={{ stroke: 'var(--color-accent)' }} />
                  {formatMessage({ id: 'contact.koibox' })}
                </a>
              </div>
            )}
          </div>

          <span className={styles.navSeparator} aria-hidden="true" />

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
