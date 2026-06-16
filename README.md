# Hera The Beauty Studio — Web

SPA informativa para **Hera The Beauty Studio**, salón de estética especializado en extensiones de pestañas, diseño de cejas, manicura y pedicura ubicado en A Coruña.

## Stack

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19 | UI |
| Vite | 5 | Bundler / dev server |
| react-router-dom | 7 | Enrutado |
| react-intl | 10 | Internacionalización (ES / GL) |
| CSS Modules | — | Estilos por componente |
| ESLint | 10 | Linting |
| pnpm | 11 | Gestión de dependencias |

> Requiere **Node.js ≥ 18**.

## Inicio rápido

```bash
pnpm install
pnpm dev
```

La aplicación arranca en `http://localhost:5173`.

## Scripts

```bash
pnpm dev       # Servidor de desarrollo
pnpm build     # Build de producción → dist/
pnpm preview   # Preview del build
pnpm lint      # Linting con ESLint
```

## Estructura

```
src/
├── components/
│   ├── Header/             # Navegación sticky con toggle de idioma y menú móvil
│   ├── Footer/             # Pie de página con links y datos de contacto
│   └── sections/
│       ├── Hero/           # Sección principal con tagline y CTAs
│       ├── About/          # Historia y valores del estudio
│       ├── Services/       # Grid de servicios (pestañas, cejas, manicura, pedicura)
│       ├── Gallery/        # Galería de trabajos
│       └── Contact/        # Dirección, horario y acceso directo a WhatsApp
├── i18n/
│   ├── es.json             # Traducciones en castellano
│   ├── gl.json             # Traducciones en gallego
│   └── IntlProvider.jsx    # Contexto de idioma
├── pages/
│   └── Home.jsx
├── styles/
│   └── global.css          # Tokens de diseño, reset y utilidades
├── App.jsx
└── main.jsx
```

## Internacionalización

La página soporta dos idiomas: **castellano** (ES) y **gallego** (GL). El idioma activo se controla desde el `Header` mediante un botón de toggle que actualiza el `IntlProvider`.

Los textos se almacenan en `src/i18n/es.json` y `src/i18n/gl.json` con estructura clave-valor plana.

```json
// es.json
{
  "hero.tagline": "Less drama, more lashes.",
  "services.lashes.title": "Pestañas"
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

- **Dirección:** Rúa Juan Flórez 72 Bajo, 15005 A Coruña
- **Teléfono:** 698 119 786
- **Email:** herathebeautystudio@gmail.com
- **Instagram:** [@herathebeautystudio](https://www.instagram.com/herathebeautystudio/)
- **Horario:** L–V 10:00–20:00 · S 10:00–14:00
