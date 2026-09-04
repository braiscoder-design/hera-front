import { useState } from 'react'
import { IconPlus } from '../../icons'
import styles from './Accordion.module.css'

/**
 * Lista desplegable simple (una "perla" abierta a la vez).
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <IconPlus className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
            </button>
            {/* maxHeight generoso en vez de medir contenido: hay listas de
                hasta ~20 sub-servicios (Manicura) que no caben en 400px. */}
            <div className={styles.panel} style={{ maxHeight: isOpen ? '2400px' : '0px' }}>
              {item.list ? (
                <ul className={styles.bodyList}>
                  {item.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.body}>{item.body}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
