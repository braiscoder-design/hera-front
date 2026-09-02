import { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
import { IconWhatsapp, IconCalendar, IconChevronDown } from '../../icons'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { id: 'nav.home',     href: '#hero' },
  { id: 'nav.about',    href: '#about' },
  { id: 'nav.services', href: '#services' },
  { id: 'nav.gallery',  href: '#gallery' },
  { id: 'nav.contact',  href: '#contact' },
]

export default function Header() {
  const { formatMessage } = useIntl()
  const { locale, toggleLocale } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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

  const handleNav = (href) => {
    setMenuOpen(false)
    setBookOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={`${styles.inner} container`}>
        <a href="#hero" className={styles.logo} onClick={() => handleNav('#hero')}>
          <img src="/logo/LOGO_V1-N.svg" alt="Hera The Beauty Studio" className={styles.logoImg} />
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={item.href}
              className={styles.navLink}
              onClick={() => handleNav(item.href)}
            >
              {formatMessage({ id: item.id })}
            </a>
          ))}
          <div className={styles.bookWrapper} ref={bookRef}>
            <button
              type="button"
              className={`btn btn--primary ${styles.navBook}`}
              onClick={() => setBookOpen(v => !v)}
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
        </nav>

        <div className={`${styles.actions} ${menuOpen ? styles.actionsOpen : ''}`}>
          <button className={styles.langToggle} onClick={toggleLocale}>
            {locale === 'es' ? 'GL' : 'ES'}
          </button>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
