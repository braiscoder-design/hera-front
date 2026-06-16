import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import styles from './Gallery.module.css'

const ITEMS = [
  { src: '/images/gallery-lashes-1.jpg', alt: 'Extensiones de pestañas' },
  { src: '/images/gallery-brows-1.jpg',  alt: 'Diseño de cejas' },
  { src: '/images/gallery-nails-1.jpg',  alt: 'Nail art' },
  { src: '/images/gallery-lashes-2.jpg', alt: 'Lifting de pestañas' },
  { src: '/images/gallery-mood.jpg',     alt: 'Ambiente del estudio' },
  { src: '/images/gallery-nails-2.jpg',  alt: 'Manicura gel' },
]

// Mosaico: tall | square | tall / square | wide(2col)
const MOSAIC = ['tall', 'square', 'tall', 'square', 'square', 'wide']
const DELAYS = ['d1', 'd2', 'd3', 'd2', 'd3', 'd4']

export default function Gallery() {
  const { formatMessage } = useIntl()
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView({ threshold: 0.05 })

  return (
    <section id="gallery" className={`${styles.gallery} section section--alt`}>
      <div className="container">

        <div ref={headerRef} className={styles.header}>
          <span className={`label reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d1`}>
            {formatMessage({ id: 'gallery.label' })}
          </span>
          <div className={`divider reveal reveal--fade${headerInView ? ' is-visible' : ''} reveal--d2`} />
          <h2 className={`${styles.title} reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d2`}>
            {formatMessage({ id: 'gallery.title' })}
          </h2>
          <p className={`${styles.subtitle} reveal reveal--up${headerInView ? ' is-visible' : ''} reveal--d3`}>
            {formatMessage({ id: 'gallery.subtitle' })}
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${styles[MOSAIC[i]]} reveal reveal--scale${gridInView ? ' is-visible' : ''} reveal--${DELAYS[i]}`}
            >
              <img src={item.src} alt={item.alt} className={styles.img} loading="lazy" />
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal reveal--up${gridInView ? ' is-visible' : ''} reveal--d5`}>
          <a
            href="https://www.instagram.com/herathebeautystudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            {formatMessage({ id: 'gallery.cta' })}
          </a>
        </div>

      </div>
    </section>
  )
}
