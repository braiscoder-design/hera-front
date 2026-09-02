import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LangProvider } from './i18n/IntlProvider'
import App from './App'
import './styles/global.css'
import './styles/animations.css'
import 'leaflet/dist/leaflet.css'

// El propio navegador intenta restaurar el scroll de cada entrada del
// historial (más agresivo/perceptible en Safari/Chrome móvil que en
// desktop), lo que compite con el reset manual que hace ScrollManager en
// App.jsx y ganaba la partida en móvil/tablet. Lo desactivamos para que
// solo mande nuestra lógica.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LangProvider>
          <App />
        </LangProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
