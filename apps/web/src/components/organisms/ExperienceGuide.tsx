'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ExperienceGuide as ExperienceGuideType } from '@seazone/shared'
import { fetchGuide, generateGuide } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import Spinner from '../atoms/Spinner'
import SectionTitle from '../atoms/SectionTitle'
import RestaurantCard from '../molecules/RestaurantCard'
import AttractionCard from '../molecules/AttractionCard'
import EssentialCard from '../molecules/EssentialCard'
import Button from '../atoms/Button'

interface ExperienceGuideProps {
  propertyCode: string
}

export default function ExperienceGuide({ propertyCode }: ExperienceGuideProps) {
  const { lang, t } = useLanguage()
  const [guide, setGuide] = useState<ExperienceGuideType | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'generating' | 'ready' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const loadGuide = useCallback(async () => {
    setStatus('loading')
    setGuide(null)
    const response = await fetchGuide(propertyCode, lang)

    if (response.status === 'ready') {
      setGuide(response.guide)
      setStatus('ready')
      return
    }

    if (response.status === 'not_found') {
      setStatus('generating')
      const genResponse = await generateGuide(propertyCode, lang)
      if (genResponse.status === 'ready') {
        setGuide(genResponse.guide)
        setStatus('ready')
        return
      }
      if (genResponse.status === 'generating') {
        setStatus('generating')
        return
      }
      if (genResponse.status === 'error') {
        setErrorMessage(genResponse.error)
        setStatus('error')
        return
      }
    }

    if (response.status === 'generating') {
      setStatus('generating')
      return
    }

    if (response.status === 'error') {
      setErrorMessage(response.error)
      setStatus('error')
    }
  }, [propertyCode, lang])

  useEffect(() => {
    loadGuide()
  }, [loadGuide])

  useEffect(() => {
    if (status !== 'generating') return

    const interval = setInterval(async () => {
      const response = await fetchGuide(propertyCode, lang)
      if (response.status === 'ready') {
        setGuide(response.guide)
        setStatus('ready')
        clearInterval(interval)
      } else if (response.status === 'error') {
        setErrorMessage(response.error)
        setStatus('error')
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [status, propertyCode, lang])

  if (status === 'loading' || status === 'idle') {
    return (
      <section className="rounded-xl bg-white border border-gray-200 p-8 shadow-card flex items-center justify-center">
        <Spinner size="lg" />
      </section>
    )
  }

  if (status === 'generating') {
    return (
      <section className="rounded-xl bg-white border border-gray-200 p-8 shadow-card flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-gray-500 text-center">
          {t('guide.generating')}
          <br />
          <span className="text-xs">{t('guide.generatingNote')}</span>
        </p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="rounded-xl bg-white border border-gray-200 p-8 shadow-card flex flex-col items-center gap-4">
        <p className="text-sm text-red-500 text-center">{errorMessage || t('guide.error')}</p>
        <Button variant="secondary" onClick={loadGuide}>
          {t('guide.retry')}
        </Button>
      </section>
    )
  }

  if (!guide) return null

  return (
    <section className="space-y-6">
      {/* Welcome message */}
      <div className="rounded-xl bg-sea-deep p-6 text-white shadow-elevated">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">👋</span>
          <h2 className="text-lg font-bold">{t('guide.welcome')}</h2>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{guide.welcome_message}</p>
      </div>

      {/* Restaurants */}
      <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
        <SectionTitle
          title={t('guide.restaurants')}
          subtitle={t('guide.restaurantsSubtitle')}
          icon="utensils"
        />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guide.restaurants.map((restaurant, i) => (
            <RestaurantCard key={i} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Attractions */}
      <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
        <SectionTitle
          title={t('guide.attractions')}
          subtitle={t('guide.attractionsSubtitle')}
          icon="landmark"
        />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guide.attractions.map((attraction, i) => (
            <AttractionCard key={i} attraction={attraction} />
          ))}
        </div>
      </div>

      {/* Essentials */}
      <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
        <SectionTitle
          title={t('guide.essentials')}
          subtitle={t('guide.essentialsSubtitle')}
          icon="hospital"
        />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guide.essentials.map((essential, i) => (
            <EssentialCard key={i} essential={essential} />
          ))}
        </div>
      </div>

      {/* Seasonal tip */}
      <div className="rounded-xl bg-sea-light border border-sea-medium/20 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🌤️</span>
          <h3 className="font-semibold text-sea-deep text-sm">{t('guide.seasonalTip')}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{guide.seasonal_tips}</p>
      </div>
    </section>
  )
}
