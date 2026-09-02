import { useEffect, useRef } from 'react'
import { LAT, LNG } from './map-constants'
import styles from './Map.module.css'

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
        attributionControl: true,
      })

      map.attributionControl.setPrefix(false)

      // Tiles monocromáticos (Esri Light Gray Canvas) que encajan con la paleta
      // beige/gris. CartoDB dejó de servir "light_all" en anónimo (ahora exige
      // API key), así que usamos el servicio gratuito de Esri: capa base +
      // capa de referencia con los nombres de calle.
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16, attribution: 'Tiles &copy; Esri' }
      ).addTo(map)

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16 }
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
