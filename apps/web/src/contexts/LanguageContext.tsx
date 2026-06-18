'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { type Lang, getTranslation } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    const stored = localStorage.getItem('sz-lang')
    if (stored === 'pt' || stored === 'en' || stored === 'es') {
      setLangState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang =
      lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('sz-lang', l)
  }, [])

  const t = useCallback((key: string) => getTranslation(lang, key), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
