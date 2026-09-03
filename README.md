# Hera The Beauty Studio — Web

SPA informativa para **Hera The Beauty Studio**, salón de estética especializado en extensiones de pestañas, diseño de cejas, manicura y pedicura ubicado en A Coruña.

## Stack

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19 | UI |
| Vite | 6 | Bundler / dev server |
| react-router-dom | 7 | Enrutado (Home + una ruta por servicio) |
| react-intl | 10 | Internacionalización (ES / GL / EN) |
| Swiper | 14 | Carrusel de servicios (solo desktop) |
| Leaflet | 1.9 | Mapa de ubicación en Contacto |
| CSS Modules | — | Estilos por componente |
| ESLint | 10 | Linting |
| pnpm | — | Gestión de dependencias |

> Requiere **Node.js ≥ 20** (Vite 6 admite 18.x, pero Node 18 dejó de recibir soporte en abril de 2025 — se recomienda 20 o 22).

## Inicio rápido

```bash
pnpm install
pnpm start
```

La aplicación arranca en `http://localhost:5173`.

## Scripts

```bash
pnpm start     # Servidor de desarrollo
pnpm build     # Build de producción → dist/
pnpm preview   # Preview del build
pnpm lint      # Linting con ESLint
```

## Estructura

```
src/
├── components/
│   ├── Header/             # Nav sticky: hamburguesa, dropdown de reserva (BookDropdown)
│   │                        # y selector de idioma de 3 vías (LangDropdown)
│   ├── Footer/              # Pie de página con links y datos de contacto
│   ├── Map/                 # Mapa de ubicación (Leaflet)
│   ├── SEO/                 # Meta tags, Open Graph, JSON-LD, canonical por idioma
│   ├── Accordion/           # Acordeón reutilizable (usado en las páginas de servicio)
│   ├── ServiceIcon/         # Mapa clave→icono compartido entre Home y ServicePage
│   └── sections/            # Secciones de la Home
│       ├── Hero/
│       ├── About/
│       ├── Services/        # Grid de 10 servicios; en desktop es un carrusel
│       │                     # (Swiper) con tarjeta centrada + paginación,
│       │                     # en tablet/móvil es una rejilla plana
│       ├── Values/
│       ├── Gallery/
│       └── Contact/
├── data/
│   └── services.js          # Fuente única de los 10 servicios (usada por Home,
│                              # Header, Footer y las rutas de servicio)
├── hooks/
│   ├── useInView.js         # Animaciones reveal-on-scroll
│   └── useMediaQuery.js     # Render condicional por breakpoint (p. ej. carrusel)
├── icons/                   # SVGs a mano, uno por archivo + barrel (index.js)
├── i18n/
│   ├── es.json               # Traducciones en castellano
│   ├── gl.json                # Traducciones en gallego
│   ├── en.json                 # Traducciones en inglés
│   └── IntlProvider.jsx        # Contexto de idioma (useLang / LangProvider)
├── pages/
│   ├── Home.jsx               # Hero + About + Services + Values + Gallery + Contact
│   └── ServicePage.jsx          # Página de detalle genérica, una por servicio
├── styles/
│   └── global.css              # Tokens de diseño, reset y utilidades
├── App.jsx                      # Rutas ("/" y "/:slug" por cada servicio) + SEO
└── main.jsx
```

Cada componente que tiene datos planos (arrays, listas de claves i18n, coordenadas, etc.) los guarda en un archivo hermano `<componente>-constants.js` en vez de mezclarlos en el JSX — la norma completa está documentada en `CLAUDE.md`.

## Internacionalización

La página soporta tres idiomas: **castellano** (ES), **gallego** (GL) e **inglés** (EN). El idioma activo se controla desde el `Header` mediante `LangDropdown`, que actualiza el `LangProvider` (`src/i18n/IntlProvider.jsx`).

Los textos se almacenan en `src/i18n/es.json`, `gl.json` y `en.json` con estructura clave-valor plana; las tres tienen siempre las mismas claves.

`src/i18n/es.json`:
```json
{
  "hero.tagline": "Less drama, more lashes.",
  "services.manicure.title": "Manicura"
}
```

## Diseño

Paleta basada en tonos beige, gris cálido y dorado suave, sin saturación excesiva.

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#F7F3EE` | Fondo principal |
| `--color-bg-alt` | `#EFE9E1` | Fondo secciones alternas |
| `--color-bg-dark` | `#2A2520` | Secciones oscuras |
| `--color-accent` | `#C9A96E` | Dorado — detalles y etiquetas |
| `--color-blush` | `#E8D5CE` | Rosa pastel suave |
| `--font-serif` | Cormorant Garamond | Títulos |
| `--font-sans` | Inter | Cuerpo y UI |

## Contacto del negocio

- **Dirección:** Calle Juan Flórez 72 Bajo, 15005 A Coruña
- **Teléfono:** 698 119 786
- **Email:** herathebeautystudio@gmail.com
- **Instagram:** [@herathebeautystudio](https://www.instagram.com/herathebeautystudio/)
- **Horario:** L–V 10:00–20:00 · S 10:00–14:00
