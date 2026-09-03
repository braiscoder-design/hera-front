import {
  IconManicure,
  IconPedicure,
  IconThreading,
  IconBrows,
  IconLashes,
  IconLashExtensions,
  IconLips,
  IconMicropigmentation,
  IconPressotherapy,
  IconTraining,
} from '../../icons'

// Mapa key de servicio -> componente de icono. Vive aquí (no en un
// -constants.js) porque son referencias a componentes, no datos planos —
// misma excepción que el mapa ICONS de Services.jsx (ver CLAUDE.md,
// "Constantes de datos").
const ICONS = {
  manicure: IconManicure,
  pedicure: IconPedicure,
  threading: IconThreading,
  brows: IconBrows,
  lashLifting: IconLashes,
  lashExtensions: IconLashExtensions,
  lips: IconLips,
  micropigmentation: IconMicropigmentation,
  pressotherapy: IconPressotherapy,
  training: IconTraining,
}

/**
 * Icono de un servicio a partir de su `key` (la misma que usan las claves
 * i18n `services.<key>.*`). Centraliza el mapeo para que tanto la sección
 * Services (Home) como ServicePage puedan mostrar el mismo icono sin
 * duplicar el mapa en los dos sitios.
 */
export default function ServiceIcon({ serviceKey, ...props }) {
  const Icon = ICONS[serviceKey]
  return Icon ? <Icon {...props} /> : null
}
