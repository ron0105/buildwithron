'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { dict, defaultLocale, isLocale, type Dict, type Locale } from '@/lib/i18n'

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(defaultLocale)

  /* Server renders English, the client corrects it on mount. Same shape as
     ThemeContext. A saved non-English choice shows one frame of English first;
     the alternative is a hydration mismatch, which is worse. */
  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (isLocale(saved) && saved !== defaultLocale) {
      setLangState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = useCallback((next: Locale) => {
    setLangState(next)
    document.documentElement.lang = next
    localStorage.setItem('lang', next)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
