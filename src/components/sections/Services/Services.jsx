import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { useInView } from '../../../hooks/useInView'
import { IconLashes, IconBrows, IconManicure, IconPedicure } from '../../../icons'
import { SERVICES as SERVICES_DATA } from '../../../data/services'
import styles from './Services.module.css'

const ICONS = {
  lashes: <IconLashes />,
  brows: <IconBrows />,
  manicure: <IconManicure />,
  pedicure: <IconPedicure />,
}

const SERVICES = SERVICES_DATA.map((s) => ({
  ...s,
  icon: ICONS[s.key],
  imgZoom: s.key === 'pedicure',
}))

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
          {SERVICES.map(({ key, slug, icon, img, imgZoom }, i) => (
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
                <Link to={`/${slug}`} className={`btn ${styles.cardMore}`}>
                  {formatMessage({ id: 'services.viewMore' })}
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
