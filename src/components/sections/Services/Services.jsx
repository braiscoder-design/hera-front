import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import styles from './Services.module.css'

const SERVICES = [
  {
    key: 'lashes',
    img: '/images/service-lashes.jpg',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 28 Q14 10 20 6 Q26 10 32 28" />
        <path d="M12 28 Q14 18 20 14 Q26 18 28 28" />
        <path d="M8 28 Q10 22 12 20" />
        <path d="M32 28 Q30 22 28 20" />
        <line x1="20" y1="6" x2="20" y2="4" />
        <line x1="14" y1="8" x2="13" y2="6" />
        <line x1="26" y1="8" x2="27" y2="6" />
      </svg>
    ),
  },
  {
    key: 'brows',
    img: '/images/service-brows.jpg',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 18 Q13 12 20 13 Q27 12 34 18" strokeLinecap="round" />
        <path d="M8 21 Q13 16 20 17 Q27 16 32 21" strokeLinecap="round" strokeOpacity="0.4" />
        <line x1="20" y1="22" x2="20" y2="34" strokeOpacity="0.2" />
      </svg>
    ),
  },
  {
    key: 'manicure',
    img: '/images/service-manicure.jpg',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14 32 L14 18 Q14 14 17 14 Q20 14 20 18 L20 32" />
        <path d="M20 32 L20 16 Q20 12 23 12 Q26 12 26 16 L26 32" />
        <path d="M26 32 L26 20 Q26 16 29 16 Q32 16 32 20 L32 32" />
        <path d="M8 32 L8 22 Q8 18 11 18 Q14 18 14 22 L14 32" />
        <rect x="6" y="32" width="28" height="3" rx="1.5" />
      </svg>
    ),
  },
  {
    key: 'pedicure',
    img: '/images/service-pedicure.jpg',
    imgZoom: true,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="20" cy="26" rx="12" ry="8" />
        <path d="M11 22 Q12 14 15 12 Q18 10 20 14" strokeLinecap="round" />
        <path d="M29 22 Q28 16 26 13 Q24 10 22 14" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
        <circle cx="24" cy="17" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      </svg>
    ),
  },
]

const DELAYS = ['d1', 'd2', 'd3', 'd4']

export default function Services() {
  const { formatMessage } = useIntl()
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView({ threshold: 0.05 })

  return (
    <section id="services" className={`${styles.services} section`}>
      <div className="container">

        <div ref={headerRef} className={styles.header}>
          <span className={`label reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d1`}>
            {formatMessage({ id: 'services.label' })}
          </span>
          <div className={`divider reveal reveal--fade${headerInView ? ' is-visible' : ''} reveal--d2`} />
          <h2 className={`${styles.title} reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d2`}>
            {formatMessage({ id: 'services.title' })}
          </h2>
          <p className={`${styles.subtitle} reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d3`}>
            {formatMessage({ id: 'services.subtitle' })}
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {SERVICES.map(({ key, icon, img, imgZoom }, i) => (
            <article
              key={key}
              className={`${styles.card} reveal reveal--up${gridInView ? ' is-visible' : ''} reveal--${DELAYS[i]}`}
            >
              <div className={styles.cardImg}>
                <img
                  src={img}
                  alt={formatMessage({ id: `services.${key}.title` })}
                  loading="lazy"
                  className={imgZoom ? styles.imgZoom : undefined}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardIcon}>{icon}</div>
                <h3 className={styles.cardTitle}>
                  {formatMessage({ id: `services.${key}.title` })}
                </h3>
                <p className={styles.cardDesc}>
                  {formatMessage({ id: `services.${key}.desc` })}
                </p>
                <p className={styles.cardItems}>
                  {formatMessage({ id: `services.${key}.items` })}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
