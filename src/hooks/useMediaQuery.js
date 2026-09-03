import { useEffect, useState } from 'react'

/**
 * Suscribe un componente a un media query. Se usa para decidir en JS (no
 * solo en CSS) qué versión de un componente renderizar según el ancho de
 * pantalla — por ejemplo, el carrusel de Services solo existe en desktop;
 * en tablet/móvil se renderiza la rejilla plana en su lugar.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
