import { useEffect, useRef } from 'react'
import styles from './Map.module.css'

// Coordenadas de Rúa Juan Flórez 72, A Coruña
const LAT = 43.3677
const LNG = -8.4064

export default function Map() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return

    import('leaflet').then(L => {
      // Fix default marker icons broken by bundlers
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })

      // Tiles monocromáticos que encajan con la paleta beige/gris
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map)

      // Marker personalizado con el color accent del proyecto
      const icon = L.divIcon({
        className: '',
        html: `<div class="${styles.pin}"><span>H</span></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      })

      L.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>Hera The Beauty Studio</strong><br/>Rúa Juan Flórez 72 Bajo<br/>A Coruña`,
          { className: styles.popup }
        )

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className={styles.map} />
}
