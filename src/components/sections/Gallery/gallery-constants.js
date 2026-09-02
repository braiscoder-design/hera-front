// Constantes de datos de Gallery, separadas del componente siguiendo la
// norma de CLAUDE.md (ver "Constantes de datos").

export const ITEMS = [
  // Fila 1-3: mosaico original
  { type: 'video', mp4: '/videos/gallery-manicure.mp4', webm: '/videos/gallery-manicure.webm', alt: 'Manicura terminada' },
  { src: '/images/gallery-extension-pestanas.jpg', alt: 'Extensión de pestañas' },
  { type: 'video', mp4: '/videos/gallery-lashes.mp4', webm: '/videos/gallery-lashes.webm', alt: 'Lifting de pestañas' },
  { src: '/images/gallery-hydralips.jpg',           alt: 'Hydralips' },
  { src: '/images/gallery-kit-cejas.jpg',           alt: 'Diseño de cejas' },
  { src: '/images/gallery-manicure-proceso.jpg',    alt: 'Proceso de manicura' },
  // Fila 4: nuevos
  { src: '/images/blue-eyes.jpg',                   alt: 'Detalle de mirada' },
  { src: '/images/store-logo.jpg',                  alt: 'Hera The Beauty Studio' },
  { type: 'video', mp4: '/videos/lashes-result.mp4', alt: 'Resultado lifting de pestañas' },
]

// Mosaico: tall | square | tall / square | wide(2col) / square | square | square
export const MOSAIC = ['tall', 'square', 'tall', 'square', 'square', 'wide', 'square', 'square', 'square']
export const DELAYS = ['d1', 'd2', 'd3', 'd2', 'd3', 'd4', 'd1', 'd2', 'd3']
