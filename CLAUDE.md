# CLAUDE.md

Guía de contexto y convenciones del proyecto **hera-front** para trabajar con Claude Code / Claude en Cowork.

## Proyecto

SPA informativa para **Hera The Beauty Studio** (salón de estética, A Coruña). React 19 + Vite 5, react-router-dom, react-intl (ES/GL), CSS Modules, pnpm. Ver `README.md` para detalle de stack, estructura y diseño.

## Convenciones

### Iconos SVG

No se escriben `<svg>` inline dentro de los componentes. Todos los iconos viven como componentes React en `src/icons/`, uno por archivo (`IconNombre.jsx`), y se re-exportan desde `src/icons/index.js`.

- Cada icono acepta props libres (`{...props}`) para poder sobreescribir `width`, `height`, `strokeWidth`, `stroke`, `className`, `style`, etc. desde donde se use.
- Import siempre desde el barrel: `import { IconWhatsapp, IconCalendar } from '../../icons'` (ajustar la ruta relativa según la profundidad del componente).
- Si se necesita un icono nuevo: crear `src/icons/IconX.jsx` siguiendo el mismo patrón y añadirlo a `src/icons/index.js`. No pegar el SVG directamente en el JSX del componente que lo usa.

Motivo: mantener los componentes de sección/UI centrados en estructura y lógica, sin mezclar marcado gráfico extenso.

### Constantes de datos

Toda variable de nivel de módulo que sea puramente datos estáticos (arrays, objetos, strings de configuración: listas de items, claves i18n, coordenadas, metadatos SEO, etc.) no se declara dentro del archivo del componente que la usa. Se extrae a un archivo hermano, a la misma altura en el árbol de ficheros que el componente, con el nombre `nombre-del-componente-constants.js` (kebab-case del nombre del componente + sufijo `-constants`), y se importa desde ahí.

- Ejemplo: `NAV_ITEMS` de `Header.jsx` vive en `src/components/Header/header-constants.js` y se importa con `import { NAV_ITEMS } from './header-constants'`.
- Aplica también a componentes anidados en carpetas de sección: `ITEMS`/`MOSAIC`/`DELAYS` de `Gallery.jsx` viven en `src/components/sections/Gallery/gallery-constants.js`.
- Excepción: si la variable mezcla datos con elementos JSX o es un valor calculado a partir de otro import (p. ej. un mapa `{ clave: <IconX /> }`, o un array derivado con `.map()` sobre datos importados), se queda en el propio componente — no es una constante de datos plana.
- Si el dato ya vive en `src/data/` (fuente compartida entre varios componentes, como `services.js`), no se duplica en un `-constants.js`; el patrón `-constants.js` es para configuración propia de un único componente.

Motivo: igual que con los iconos, mantener los componentes centrados en estructura/lógica y separar los datos que no cambian con el render, para que sean fáciles de localizar y editar sin bucear en el JSX.
