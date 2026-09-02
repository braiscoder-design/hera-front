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
