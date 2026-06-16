import { useIntl } from 'react-intl'
import { useInView } from '../../../hooks/useInView'
import styles from './About.module.css'

const VALUES = ['about.values.1', 'about.values.2', 'about.values.3']

export default function About() {
  const { formatMessage } = useIntl()
  const [imgRef, imgInView] = useInView()
  const [textRef, textInView] = useInView()

  return (
    <section id="about" className={`${styles.about} section section--alt`}>
      <div className={`${styles.inner} container`}>

        <div
          ref={imgRef}
          className={`${styles.imageCol} reveal reveal--left reveal--slow${imgInView ? ' is-visible' : ''}`}
        >
          <div className={styles.imageFrame}>
            <img
              src="/images/about.jpg"
              alt="Interior de Hera The Beauty Studio"
              className={styles.image}
            />
            <div className={styles.imageAccent} />
          </div>
        </div>

        <div ref={textRef} className={styles.textCol}>
          <span className={`label reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d1`}>
            {formatMessage({ id: 'about.label' })}
          </span>
          <div className={`divider reveal reveal--fade${textInView ? ' is-visible' : ''} reveal--d2`} />
          <h2 className={`${styles.title} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d2`}>
            {formatMessage({ id: 'about.title' })}
          </h2>
          <p className={`${styles.body} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d3`}>
            {formatMessage({ id: 'about.body' })}
          </p>
          <ul className={`${styles.values} reveal reveal--up${textInView ? ' is-visible' : ''} reveal--d4`}>
            {VALUES.map(key => (
              <li key={key} className={styles.value}>
                <span className={styles.valueDot} />
                {formatMessage({ id: key })}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
