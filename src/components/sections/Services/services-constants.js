// Constantes de datos de Services, separadas del componente siguiendo la
// norma de CLAUDE.md (ver "Constantes de datos"). El derivado SERVICES se
// queda en Services.jsx porque mezcla datos importados con un cálculo
// (.map()), no es una constante de datos plana.

// Solo hay animaciones reveal--d1..d6 definidas; con más de 6 tarjetas se
// recicla el ciclo (ver uso con `DELAYS[i % DELAYS.length]`).
export const DELAYS = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']
