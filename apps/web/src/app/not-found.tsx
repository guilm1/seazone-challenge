'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-sea-foam px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-sea-medium mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-sea-deep mb-2">{t('notFound.title')}</h2>
        <p className="text-gray-500">{t('notFound.desc')}</p>
      </div>
    </main>
  )
}
