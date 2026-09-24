import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIntl } from 'react-intl'
import { format, isValid, parse } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { DayPicker } from '@daypicker/react'
import '@daypicker/react/style.css'
import styles from './BirthDatePicker.module.css'

const DISPLAY_FORMAT = 'dd/MM/yyyy'
const ISO_FORMAT = 'yyyy-MM-dd'

function toDate(isoValue) {
  if (!isoValue) return undefined
  const parsed = parse(isoValue, ISO_FORMAT, new Date())
  return isValid(parsed) ? parsed : undefined
}

/**
 * Selector de fecha de nacimiento: un botón que muestra la fecha elegida
 * (o el formato de ejemplo) y abre, al pulsarlo, un calendario (DayPicker)
 * dentro de un <dialog> nativo — el mismo patrón de accesibilidad que
 * recomienda la propia librería (daypicker.dev/guides/input-fields).
 *
 * De cara al resto del formulario, el valor sigue siendo un string
 * "yyyy-MM-dd" (igual que el <input type="date"> nativo al que sustituye),
 * así que no hace falta tocar la validación existente.
 */
export default function BirthDatePicker({ id, label, value, onChange, error, ariaRequired }) {
  const { locale: appLocale } = useIntl()
  // date-fns no tiene locale propio para gallego: usamos el español como
  // aproximación más cercana para los nombres de mes en ese idioma.
  const dateFnsLocale = appLocale === 'en' ? enUS : es

  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)
  const headerId = useId()
  const errorId = `${id}-error`

  const today = new Date()
  const selected = toDate(value)
  const [month, setMonth] = useState(() => selected ?? new Date(today.getFullYear() - 25, today.getMonth()))

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (open) {
      if (selected) setMonth(selected)
      document.body.style.overflow = 'hidden'
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      document.body.style.overflow = ''
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleSelect = (date) => {
    if (date) onChange(format(date, ISO_FORMAT))
    setOpen(false)
  }

  const monthLabel = format(month, 'MMMM yyyy', { locale: dateFnsLocale })

  return (
    <>
      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${error ? styles.triggerError : ''}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-required={ariaRequired}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      >
        <span className={selected ? styles.value : styles.placeholder}>
          {selected ? format(selected, DISPLAY_FORMAT) : DISPLAY_FORMAT.toLowerCase()}
        </span>
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
          />
        </svg>
      </button>

      {createPortal(
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-labelledby={headerId}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onClick={(e) => {
            if (e.target === dialogRef.current) setOpen(false)
          }}
        >
          <div className={styles.dialogHeader}>
            <h4 id={headerId} className={styles.dialogTitle}>
              {label}
            </h4>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={formatCloseLabel(appLocale)}
            >
              ×
            </button>
          </div>

          <DayPicker
            autoFocus
            role="application"
            aria-label={monthLabel}
            mode="single"
            locale={dateFnsLocale}
            captionLayout="dropdown"
            startMonth={new Date(today.getFullYear() - 90, 0)}
            endMonth={today}
            disabled={{ after: today }}
            month={month}
            onMonthChange={setMonth}
            selected={selected}
            onSelect={handleSelect}
            className={styles.calendar}
          />
        </dialog>,
        document.body
      )}

      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </>
  )
}

function formatCloseLabel(appLocale) {
  if (appLocale === 'en') return 'Close'
  if (appLocale === 'gl') return 'Pechar'
  return 'Cerrar'
}
