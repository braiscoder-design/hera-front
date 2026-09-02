import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SEO from './components/SEO/SEO'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { SERVICES } from './data/services'

// React Router no resetea el scroll al cambiar de ruta (a diferencia de una
// navegación tradicional). Sin esto, un <Link> pulsado a mitad de página
// (p. ej. "Ver más" en la sección Servicios) aterriza en la nueva ruta
// conservando el scrollY anterior, dejando la vista a mitad o al final.
//
// Los NAV_ITEMS del Header enlazan además a anclas absolutas ("/#about")
// para que funcionen desde otras rutas (páginas de servicio); al llegar por
// una navegación completa el navegador puede intentar desplazarse al hash
// antes de que React haya montado la sección, así que reintentamos el
// scroll una vez montado.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <SEO />
      <Header />
      <ScrollManager />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {SERVICES.map((service) => (
            <Route
              key={service.slug}
              path={`/${service.slug}`}
              element={<ServicePage service={service} />}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  )
}
