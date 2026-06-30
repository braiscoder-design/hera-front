import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import styles from './Hero.module.css'

export default function Hero() {
  const { formatMessage } = useIntl()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const cls = (base, delay) =>
    `${base} reveal reveal--up${loaded ? ' is-visible' : ''} reveal--${delay}`

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.videoBg} aria-hidden="true">
        <video autoPlay muted loop playsInline>
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <span className={cls(styles.label, 'd1')}>
            {formatMessage({ id: 'nav.home' })} · A Coruña
          </span>
          <h1 className={cls(styles.tagline, 'd2')}>
            {formatMessage({ id: 'hero.tagline' })}
          </h1>
          <p className={cls(styles.subtitle, 'd3')}>
            {formatMessage({ id: 'hero.subtitle' })}
          </p>
          <div className={cls(styles.ctas, 'd4')}>
            <a href="#services" className="btn btn--primary">
              {formatMessage({ id: 'hero.cta' })}
            </a>
            <a
              href="https://wa.me/34698119786"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              {formatMessage({ id: 'hero.book' })}
            </a>
          </div>
        </div>

        <div className={`${styles.visual} reveal reveal--right reveal--slow${loaded ? ' is-visible' : ''} reveal--d3`}>
          <div className={styles.imageStack}>
            <img
              src="/images/hero-bg.jpg"
              alt="Hera The Beauty Studio — detalle de mirada"
              className={styles.imageMain}
            />
            <div className={styles.imageCard}>
              <div className={styles.logoCircle} aria-hidden="true">
                <span>H</span>
                <svg className={styles.circleText} viewBox="0 0 120 120">
                  <path id="circle-path" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                  <text fontSize="9.5" letterSpacing="3.2" fill="currentColor">
                    <textPath href="#circle-path">THE BEAUTY STUDIO · A CORUÑA · </textPath>
                  </text>
                </svg>
              </div>
              <div className={styles.cardTag}>
                <span>Less drama,</span>
                <em>more lashes.</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
