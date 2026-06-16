import { createContext, useContext, useState } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import es from './es.json'
import gl from './gl.json'

const messages = { es, gl }

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [locale, setLocale] = useState('es')

  const toggleLocale = () => setLocale(prev => (prev === 'es' ? 'gl' : 'es'))

  return (
    <LangContext.Provider value={{ locale, toggleLocale }}>
      <ReactIntlProvider locale={locale} messages={messages[locale]} defaultLocale="es">
        {children}
      </ReactIntlProvider>
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
