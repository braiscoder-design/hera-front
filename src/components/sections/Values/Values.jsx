import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import styles from './Values.module.css'

const ITEMS = ['values.tranquility', 'values.precision', 'values.beauty']

export default function Values() {
  const { formatMessage } = useIntl()
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <div ref={ref} className={styles.band}>
      <div className={styles.inner}>
        {ITEMS.map((key, i) => (
          <div
            key={key}
            className={`${styles.item} reveal reveal--up${inView ? ' is-visible' : ''} reveal--d${i + 1}`}
          >
            {i > 0 && <span className={styles.dot} aria-hidden="true">·</span>}
            <span className={styles.word}>
              {formatMessage({ id: key })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
