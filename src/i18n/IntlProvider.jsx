import { createContext, useContext, useState } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import es from './es.json'
import gl from './gl.json'
import en from './en.json'

const messages = { es, gl, en }

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [locale, setLocale] = useState('es')

  return (
    <LangContext.Provider value={{ locale, setLocale }}>
      <ReactIntlProvider locale={locale} messages={messages[locale]} defaultLocale="es">
        {children}
      </ReactIntlProvider>
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
