import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import styles from './Gallery.module.css'

const ITEMS = [
  // Fila 1-3: mosaico original
  { type: 'video', mp4: '/videos/gallery-manicure.mp4', webm: '/videos/gallery-manicure.webm', alt: 'Manicura terminada' },
  { src: '/images/gallery-extension-pestanas.jpg', alt: 'Extensión de pestañas' },
  { type: 'video', mp4: '/videos/gallery-lashes.mp4', webm: '/videos/gallery-lashes.webm', alt: 'Lifting de pestañas' },
  { src: '/images/gallery-hydralips.jpg',           alt: 'Hydralips' },
  { src: '/images/gallery-kit-cejas.jpg',           alt: 'Diseño de cejas' },
  { src: '/images/gallery-manicure-proceso.jpg',    alt: 'Proceso de manicura' },
  // Fila 4: nuevos
  { src: '/images/blue-eyes.jpg',                   alt: 'Detalle de mirada' },
  { src: '/images/store-logo.jpg',                  alt: 'Hera The Beauty Studio' },
  { type: 'video', mp4: '/videos/lashes-result.mp4', alt: 'Resultado lifting de pestañas' },
]

// Mosaico: tall | square | tall / square | wide(2col) / square | square | square
const MOSAIC = ['tall', 'square', 'tall', 'square', 'square', 'wide', 'square', 'square', 'square']
const DELAYS = ['d1', 'd2', 'd3', 'd2', 'd3', 'd4', 'd1', 'd2', 'd3']

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
              {item.type === 'video' ? (
                <video
                  className={styles.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={item.alt}
                >
                  {item.webm && <source src={item.webm} type="video/webm" />}
                  <source src={item.mp4} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt={item.alt} className={styles.img} loading="lazy" />
              )}
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
