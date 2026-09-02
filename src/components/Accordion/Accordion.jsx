import { useState } from 'react'
import { IconPlus } from '../../icons'
import styles from './Accordion.module.css'

/**
 * Lista desplegable simple (una "perla" abierta a la vez).
 * items: [{ title: string, body: string }]
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
            <div className={styles.panel} style={{ maxHeight: isOpen ? '400px' : '0px' }}>
              <p className={styles.body}>{item.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
