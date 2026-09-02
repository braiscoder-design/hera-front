import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
import { IconChevronDown } from '../../icons'
import { SERVICES } from '../../data/services'
import { NAV_ITEMS } from './header-constants'
import BookDropdown from './BookDropdown'
import styles from './Header.module.css'

export default function Header() {
  const { formatMessage } = useIntl()
  const { locale, toggleLocale } = useLang()
  const langAbbr = locale === 'es' ? 'GL' : 'ES'
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [classicServicesOpen, setClassicServicesOpen] = useState(false)
  const classicServicesRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // El menú a pantalla completa siempre resetea el submenú de Servicios al cerrarse
  useEffect(() => {
    if (!menuOpen) setServicesOpen(false)
  }, [menuOpen])

  useEffect(() => {
    if (!classicServicesOpen) return
    const handleOutside = (e) => {
      if (classicServicesRef.current && !classicServicesRef.current.contains(e.target)) {
        setClassicServicesOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setClassicServicesOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [classicServicesOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setClassicServicesOpen(false)
  }

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''} ${isHome ? styles.showClassicNav : ''}`}
    >
      <div className={`${styles.inner} container`}>
        <Link to="/" className={styles.logo} onClick={closeAll}>
          <img src="/logo/LOGO_V1-N.svg" alt="Hera The Beauty Studio" className={styles.logoImg} />
        </Link>

        {/* ── Nav clásico: solo se renderiza en Home, solo se ve en desktop (CSS) ── */}
        {isHome && (
          <nav className={styles.classicNav}>
            <Link to="/#hero" className={styles.classicLink}>
              {formatMessage({ id: 'nav.home' })}
            </Link>
            <Link to="/#about" className={styles.classicLink}>
              {formatMessage({ id: 'nav.about' })}
            </Link>

            <div className={styles.classicServices} ref={classicServicesRef}>
              <button
                type="button"
                className={styles.classicServicesToggle}
                onClick={() => setClassicServicesOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={classicServicesOpen}
              >
                {formatMessage({ id: 'nav.services' })}
                <IconChevronDown className={`${styles.chevron} ${classicServicesOpen ? styles.chevronOpen : ''}`} />
              </button>
              {classicServicesOpen && (
                <div className={styles.classicServicesMenu} role="menu">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/${s.slug}`}
                      className={styles.classicServicesLink}
                      role="menuitem"
                      onClick={() => setClassicServicesOpen(false)}
                    >
                      {formatMessage({ id: `services.${s.key}.title` })}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/#gallery" className={styles.classicLink}>
              {formatMessage({ id: 'nav.gallery' })}
            </Link>
            <Link to="/#contact" className={styles.classicLink}>
              {formatMessage({ id: 'nav.contact' })}
            </Link>

            <BookDropdown triggerClassName={styles.classicBook} />
          </nav>
        )}

        {/* ── Overlay a pantalla completa: mobile/tablet siempre, desktop solo fuera de Home ── */}
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

          <span className={styles.navDivider} aria-hidden="true" />

          <button
            className={styles.navLangToggle}
            onClick={toggleLocale}
            aria-label={formatMessage({ id: 'lang.switch' })}
          >
            {langAbbr}
          </button>
        </nav>

        <div className={styles.actions}>
          <div className={styles.hamburgerActions}>
            <BookDropdown triggerClassName={styles.navBook} />

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

          {isHome && (
            <button
              className={styles.classicLangToggle}
              onClick={toggleLocale}
              aria-label={formatMessage({ id: 'lang.switch' })}
            >
              {langAbbr}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
