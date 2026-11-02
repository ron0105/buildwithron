'use client'

import { createContext, useContext } from 'react'
import { dict, defaultLocale, type Dict, type Locale } from '@/lib/i18n'

interface LanguageContextType {
  lang: Locale
  setLang: (next: Locale) => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLocale,
  setLang: () => {},
  t: dict[defaultLocale],
})

/* English only since the Nov 2026 revamp: the switcher is gone and a saved
   language from before is ignored. Pages still read their strings through
   t until each one is rebuilt with its new copy. */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang: Locale = defaultLocale
  const setLang = () => {}

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
