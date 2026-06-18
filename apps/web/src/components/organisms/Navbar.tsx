'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/translations'

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
]

export default function Navbar() {
  const { lang, setLang } = useLanguage()

  return (
    <header className="fixed top-0 left-0 w-full bg-sea-deep shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center">
        <Link href="/" className="flex items-center">
          <span className="font-sans text-sm font-bold text-white tracking-wide">
            se<span className="text-coral">a</span>zone
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          {LANGUAGES.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                lang === code
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label={label}
            >
              <span className="text-base leading-none">{flag}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
