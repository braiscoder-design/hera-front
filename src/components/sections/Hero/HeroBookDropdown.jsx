import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { IconWhatsapp, IconCalendar, IconChevronDown } from '../../../icons'
import styles from './Hero.module.css'

/**
 * Desplegable de reserva del Hero (WhatsApp / Koibox). Mismas dos opciones
 * que BookDropdown (Header), pero con tratamiento visual propio — cristal
 * translúcido + entrada en cascada — que de momento solo vive aquí; el
 * Header conserva su desplegable actual hasta que se valore llevarlo
 * también allí.
 */
export default function HeroBookDropdown() {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className={styles.bookWrapper} ref={ref}>
      <button
        type="button"
        className="btn btn--outline"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {formatMessage({ id: 'hero.book' })}
        <IconChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open && (
        <div className={styles.bookMenu} role="menu">
          <a
            href="https://wa.me/34698119786"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookOption}
            role="menuitem"
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            <IconCalendar width={16} height={16} strokeWidth={1.6} style={{ stroke: 'var(--color-accent)' }} />
            {formatMessage({ id: 'contact.koibox' })}
          </a>
        </div>
      )}
    </div>
  )
}
