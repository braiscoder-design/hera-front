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
  // Al cerrar no desmontamos el menú de golpe: lo dejamos montado un
  // instante más (`closing`) para que pueda reproducir la cascada al
  // revés (bookMenuHide / bookOptionCascadeOut). Se desmonta de verdad en
  // el onAnimationEnd de .bookMenu, así que la duración no se duplica
  // como número mágico en JS: siempre coincide con lo que dure el CSS.
  const [closing, setClosing] = useState(false)
  const ref = useRef(null)

  const closeMenu = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setOpen(false)
    if (reducedMotion) return
    setClosing(true)
  }

  const handleMenuAnimationEnd = (e) => {
    if (e.target === e.currentTarget && e.animationName === 'bookMenuHide') {
      setClosing(false)
    }
  }

  useEffect(() => {
    if (!open) return
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) closeMenu()
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu()
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
        onClick={() => {
          if (open) {
            closeMenu()
          } else {
            // Por si se reabre a media animación de cierre (clic rápido):
            // cancelamos el "closing" para que no arrastre esas clases al
            // volver a abrir.
            setClosing(false)
            setOpen(true)
          }
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {formatMessage({ id: 'hero.book' })}
        <IconChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {(open || closing) && (
        <div
          className={`${styles.bookMenu} ${closing ? styles.closing : ''}`}
          role="menu"
          onAnimationEnd={handleMenuAnimationEnd}
        >
          <a
            href="https://wa.me/34698119786"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.bookOption} ${closing ? styles.optionClosing : ''}`}
            role="menuitem"
            onClick={closeMenu}
          >
            <IconWhatsapp width={16} height={16} strokeWidth={1.6} stroke="#25D366" />
            {formatMessage({ id: 'contact.whatsapp' })}
          </a>
          <a
            href="https://reservas.koibox.cloud/por-definir"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.bookOption} ${closing ? styles.optionClosing : ''}`}
            role="menuitem"
            onClick={closeMenu}
          >
            <IconCalendar width={16} height={16} strokeWidth={1.6} style={{ stroke: 'var(--color-accent)' }} />
            {formatMessage({ id: 'contact.koibox' })}
          </a>
        </div>
      )}
    </div>
  )
}
