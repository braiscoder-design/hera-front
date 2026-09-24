import { useState } from 'react'
import { useIntl } from 'react-intl'
import {
  TRAINING_FORM_FIELDS,
  YES_NO_OPTIONS,
  ROLE_OPTIONS,
  MOTIVATION_OPTIONS,
} from './training-booking-form-constants'
import BirthDatePicker from './BirthDatePicker'
import styles from './TrainingBookingForm.module.css'

const OPTIONS_BY_GROUP = {
  yesNo: YES_NO_OPTIONS,
  role: ROLE_OPTIONS,
  motivation: MOTIVATION_OPTIONS,
}

// Formato de teléfono nacional español: 9 dígitos, empezando por 6/7
// (móvil) u 8/9 (fijo). Se admite que la persona escriba espacios o
// guiones para leerlo mejor, pero no prefijo internacional (+34, etc.):
// eso queda fuera a propósito, según lo pedido.
const PHONE_REGEX = /^[6789]\d{8}$/

// Tope de la fecha de nacimiento: hoy (no tiene sentido una fecha futura).
// Formato YYYY-MM-DD, el mismo que produce/consume BirthDatePicker.
function getTodayISODate() {
  return new Date().toISOString().slice(0, 10)
}

function initialFormState() {
  const state = {}
  for (const field of TRAINING_FORM_FIELDS) state[field.id] = ''
  return state
}

// Un campo con "dependsOn" solo se muestra (y es obligatorio) cuando el
// campo del que depende tiene la respuesta indicada, p.ej. "En caso
// afirmativo, ¿cómo se llama el centro?" solo si hasSalon === 'yes'.
function isFieldVisible(field, values) {
  if (!field.dependsOn) return true
  return values[field.dependsOn.field] === field.dependsOn.equals
}

/**
 * Formulario de reserva de plaza para Formaciones, con los mismos campos
 * que el formulario de referencia (eia-studio.com/formaciones), quitando
 * la sección de precio/pago (Hera no tiene todavía fechas ni modalidades
 * concretas anunciadas) y generalizando la pregunta de "experiencia
 * previa" para no asumir una técnica concreta.
 *
 * Sin backend propio todavía: al validar correctamente, se muestra un
 * mensaje de confirmación en la propia página, pero el envío no llega a
 * ningún sitio real — falta decidir a dónde debe llegar (email, WhatsApp,
 * un servicio de formularios, etc.) para conectarlo de verdad.
 */
export default function TrainingBookingForm() {
  const { formatMessage } = useIntl()
  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const setField = (id, value) => {
    setValues((prev) => {
      const next = { ...prev, [id]: value }
      // Si este campo es la "pregunta madre" de algún campo condicional y
      // la nueva respuesta ya no cumple la condición, limpiamos ese campo
      // dependiente para no dejar una respuesta huérfana oculta.
      for (const f of TRAINING_FORM_FIELDS) {
        if (f.dependsOn?.field === id && value !== f.dependsOn.equals) {
          next[f.id] = ''
        }
      }
      return next
    })
    if (attempted) {
      setErrors((prev) => {
        const next = validateField(id, value, prev)
        for (const f of TRAINING_FORM_FIELDS) {
          if (f.dependsOn?.field === id && value !== f.dependsOn.equals) {
            delete next[f.id]
          }
        }
        return next
      })
    }
  }

  const validateField = (id, rawValue, prevErrors) => {
    const next = { ...prevErrors }
    const field = TRAINING_FORM_FIELDS.find((f) => f.id === id)

    if (field && !isFieldVisible(field, values)) {
      delete next[id]
      return next
    }

    const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue

    if (!value) {
      next[id] = formatMessage({ id: 'trainingForm.errors.required' })
      return next
    }

    if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      next[id] = formatMessage({ id: 'trainingForm.errors.email' })
      return next
    }

    if (id === 'phone') {
      const digits = value.replace(/\D/g, '')
      if (!PHONE_REGEX.test(digits)) {
        next[id] = formatMessage({ id: 'trainingForm.errors.phone' })
        return next
      }
    }

    if (field?.kind === 'date' && value > getTodayISODate()) {
      next[id] = formatMessage({ id: 'trainingForm.errors.birthDate' })
      return next
    }

    delete next[id]
    return next
  }

  const validateAll = () => {
    let next = {}
    for (const field of TRAINING_FORM_FIELDS) {
      next = validateField(field.id, values[field.id], next)
    }
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAttempted(true)
    const nextErrors = validateAll()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    } else {
      const firstErrorId = TRAINING_FORM_FIELDS.find((f) => nextErrors[f.id])?.id
      if (firstErrorId) {
        document.getElementById(`trainingForm-${firstErrorId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }

  if (submitted) {
    return (
      <div className={styles.wrap}>
        <div className={styles.success}>
          <h3 className={styles.successTitle}>
            {formatMessage({ id: 'trainingForm.success.title' })}
          </h3>
          <p className={styles.successBody}>
            {formatMessage({ id: 'trainingForm.success.body' })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h3 className={styles.title}>{formatMessage({ id: 'trainingForm.title' })}</h3>

        {TRAINING_FORM_FIELDS.map((field) => {
          if (!isFieldVisible(field, values)) return null

          const inputId = `trainingForm-${field.id}`
          const label = formatMessage({ id: `trainingForm.fields.${field.id}.label` })
          const error = errors[field.id]

          if (field.kind === 'radio') {
            const options = OPTIONS_BY_GROUP[field.optionsGroup]
            return (
              <fieldset key={field.id} className={styles.field}>
                <legend className={styles.label}>
                  {label} <span className={styles.required} aria-hidden="true">*</span>
                </legend>
                <div className={styles.radioRow} id={inputId}>
                  {options.map((opt) => (
                    <label key={opt} className={styles.radioOption}>
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={values[field.id] === opt}
                        onChange={() => setField(field.id, opt)}
                        aria-invalid={Boolean(error)}
                        aria-required="true"
                      />
                      {formatMessage({ id: `trainingForm.options.${field.optionsGroup}.${opt}` })}
                    </label>
                  ))}
                </div>
                {error && <span className={styles.error}>{error}</span>}
              </fieldset>
            )
          }

          if (field.kind === 'date') {
            return (
              <div key={field.id} className={styles.field}>
                <label htmlFor={inputId} className={styles.label}>
                  {label} <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <BirthDatePicker
                  id={inputId}
                  label={label}
                  value={values[field.id]}
                  onChange={(isoValue) => setField(field.id, isoValue)}
                  error={error}
                  ariaRequired="true"
                />
              </div>
            )
          }

          if (field.kind === 'phone') {
            return (
              <div key={field.id} className={styles.field}>
                <label htmlFor={inputId} className={styles.label}>
                  {label} <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <input
                  id={inputId}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder={formatMessage({ id: 'trainingForm.fields.phone.placeholder' })}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  value={values.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-required="true"
                  aria-describedby={error ? `${inputId}-error` : undefined}
                />
                {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
              </div>
            )
          }

          if (field.kind === 'textarea') {
            return (
              <div key={field.id} className={styles.field}>
                <label htmlFor={inputId} className={styles.label}>
                  {label} <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <textarea
                  id={inputId}
                  rows={3}
                  className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
                  value={values[field.id]}
                  onChange={(e) => setField(field.id, e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-required="true"
                  aria-describedby={error ? `${inputId}-error` : undefined}
                />
                {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
              </div>
            )
          }

          return (
            <div key={field.id} className={styles.field}>
              <label htmlFor={inputId} className={styles.label}>
                {label} <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                id={inputId}
                type={field.kind === 'email' ? 'email' : 'text'}
                inputMode={field.inputMode}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={values[field.id]}
                onChange={(e) => setField(field.id, e.target.value)}
                aria-invalid={Boolean(error)}
                aria-required="true"
                aria-describedby={error ? `${inputId}-error` : undefined}
              />
              {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
            </div>
          )
        })}

        <button type="submit" className={styles.submit}>
          {formatMessage({ id: 'trainingForm.submit' })}
        </button>
      </form>
    </div>
  )
}
