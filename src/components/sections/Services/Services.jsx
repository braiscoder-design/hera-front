import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useInView } from '../../../hooks/useInView'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import ServiceIcon from '../../ServiceIcon/ServiceIcon'
import IconChevronDown from '../../../icons/IconChevronDown'
import { SERVICES as SERVICES_DATA } from '../../../data/services'
import { DELAYS } from './services-constants'
import styles from './Services.module.css'

const SERVICES = SERVICES_DATA.map((s) => ({
  ...s,
  imgZoom: s.key === 'pedicure',
}))

function ServiceCardContent({ formatMessage, service }) {
  const { key, slug, img, imgZoom } = service
  return (
    <>
      <div className={styles.cardImg}>
        {img ? (
          <img
            src={img}
            alt={formatMessage({ id: `services.${key}.title` })}
            loading="lazy"
            className={imgZoom ? styles.imgZoom : undefined}
          />
        ) : (
          <div className={styles.cardImgPlaceholder} aria-hidden="true">
            <ServiceIcon serviceKey={key} />
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardIcon}><ServiceIcon serviceKey={key} /></div>
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
    </>
  )
}

export default function Services() {
  const { formatMessage } = useIntl()
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView({ threshold: 0.05 })

  // El carrusel (Swiper) es solo para desktop: tarjeta activa centrada,
  // vecinas asomando a los lados, clic en una vecina la trae al frente
  // (slideToClickedSlide) y paginación por puntos — al estilo del ejemplo
  // que nos pasaron. En tablet/móvil se mantiene la rejilla plana de
  // siempre (sin carrusel), tal y como se pidió desde el principio.
  // Empieza en la segunda tarjeta (Pedicura) para que la primera
  // (Manicura) asome a la izquierda desde el arranque, en vez de dejar
  // un hueco en blanco donde no hay vecina previa que centrar.
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const swiperRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const updateEdges = (swiper) => {
    setAtStart(swiper.isBeginning)
    setAtEnd(swiper.isEnd)
  }

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

        {isDesktop ? (
          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label={formatMessage({ id: 'services.scrollPrev' })}
            >
              <IconChevronDown width={16} height={16} strokeWidth={2} />
            </button>

            <Swiper
              modules={[Pagination]}
              onSwiper={(swiper) => { swiperRef.current = swiper; updateEdges(swiper) }}
              onSlideChange={updateEdges}
              onResize={updateEdges}
              slidesPerView="auto"
              centeredSlides
              initialSlide={1}
              spaceBetween={28}
              speed={650}
              grabCursor
              slideToClickedSlide
              pagination={{ clickable: true, el: `.${styles.pagination}` }}
              className={styles.swiper}
            >
              {SERVICES.map((service) => (
                <SwiperSlide key={service.key} className={styles.card}>
                  <ServiceCardContent formatMessage={formatMessage} service={service} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label={formatMessage({ id: 'services.scrollNext' })}
            >
              <IconChevronDown width={16} height={16} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div ref={gridRef} className={styles.grid}>
            {SERVICES.map((service, i) => (
              <article
                key={service.key}
                className={`${styles.card} reveal reveal--up${gridInView ? ' is-visible' : ''} reveal--${DELAYS[i % DELAYS.length]}`}
              >
                <ServiceCardContent formatMessage={formatMessage} service={service} />
              </article>
            ))}
          </div>
        )}

        {isDesktop && <div className={styles.pagination} />}

      </div>
    </section>
  )
}
