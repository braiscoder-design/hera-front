import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
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
          <a
            href="https://wa.me/34698119786"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--primary ${styles.navBook}`}
          >
            {formatMessage({ id: 'nav.book' })}
          </a>
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
