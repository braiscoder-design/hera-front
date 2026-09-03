import { useState, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useLang } from '../../i18n/IntlProvider'
import { LANGUAGES } from './lang-dropdown-constants'
import styles from './Header.module.css'

/**
 * Selector de idioma (ES / GL / EN). Mismo patrón de apertura/cierre que
 * BookDropdown: cada instancia lleva su propio estado y se cierra al hacer
 * clic fuera o pulsar Escape. Se usa tanto en el nav clásico de Home
 * (desktop) como en el overlay de hamburguesa.
 */
export default function LangDropdown({ triggerClassName = '' }) {
  const { formatMessage } = useIntl()
  const { locale, setLocale } = useLang()
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

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  return (
    <div className={styles.langWrapper} ref={ref}>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={formatMessage({ id: 'lang.select' })}
      >
        {current.abbr}
      </button>

      {open && (
        <div className={styles.langMenu} role="menu">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitemradio"
              aria-checked={l.code === locale}
              className={`${styles.langOption} ${l.code === locale ? styles.langOptionActive : ''}`}
              onClick={() => {
                setLocale(l.code)
                setOpen(false)
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
