import { useState, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { IconWhatsapp, IconCalendar, IconChevronDown } from '../../icons'
import styles from './Header.module.css'

/**
 * Selector de reserva (WhatsApp / Koibox). Se usa tanto en el nav clásico de
 * Home (desktop) como en la barra de acciones del modo hamburguesa, por eso
 * vive como componente aparte: cada instancia lleva su propio estado de
 * apertura y cierre por clic fuera / Escape.
 */
export default function BookDropdown({ triggerClassName = '' }) {
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
        className={`btn btn--primary ${triggerClassName}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {formatMessage({ id: 'nav.book' })}
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
