import { useState } from 'react'
import { useIntl } from 'react-intl'
import { IconPlus } from '../../icons'
import styles from './SubsectionList.module.css'

/**
 * Listado de subservicios de una sección (extraídos de koibox), bien
 * visible en la parte central de la página de servicio. Cada fila muestra
 * nombre + duración + precio siempre visibles; si koibox ofrece
 * descripción para ese subservicio, la fila es desplegable (cada una de
 * forma independiente, no acordeón de uno solo).
 *
 * @param {{ serviceKey: string, items: Array<{id: string, duration: number|null, price: number, desc: boolean}> }} props
 */
export default function SubsectionList({ serviceKey, items }) {
  const { formatMessage } = useIntl()
  const [openIds, setOpenIds] = useState(() => new Set())

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const name = formatMessage({ id: `services.${serviceKey}.sub.${item.id}.name` })
        const isOpen = openIds.has(item.id)

        const meta = (
          <span className={styles.meta}>
            {item.duration ? <span className={styles.pill}>{item.duration} min</span> : null}
            <span className={styles.pill}>{item.price} €</span>
          </span>
        )

        if (!item.desc) {
          return (
            <div key={item.id} className={`${styles.row} ${styles.plainRow}`}>
              <span className={styles.name}>{name}</span>
              {meta}
            </div>
          )
        }

        const description = formatMessage({ id: `services.${serviceKey}.sub.${item.id}.desc` })

        return (
          <div key={item.id} className={styles.row}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span className={styles.name}>{name}</span>
              {meta}
              <IconPlus className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
            </button>
            <div className={styles.panel} style={{ maxHeight: isOpen ? '400px' : '0px' }}>
              <p className={styles.desc}>{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
