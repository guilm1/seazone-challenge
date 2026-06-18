'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const amenityIcons: Record<string, string> = {
  wifi: '📶',
  tv: '📺',
  air_conditioning: '❄️',
  kitchen: '🍳',
  washing_machine: '🫧',
  elevator: '🛗',
  balcony: '🪟',
  bbq_grill: '🔥',
  dishwasher: '🍽️',
}

interface AmenityItemProps {
  amenityKey: string
  available: boolean
}

export default function AmenityItem({ amenityKey, available }: AmenityItemProps) {
  const { t } = useLanguage()
  if (!available) return null

  const label = t(`amenity.${amenityKey}`) !== `amenity.${amenityKey}`
    ? t(`amenity.${amenityKey}`)
    : amenityKey.replace(/_/g, ' ')
  const emoji = amenityIcons[amenityKey] ?? '✓'

  return (
    <div className="flex items-center gap-3 rounded-xl bg-sea-light px-4 py-3">
      <span className="text-xl" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-sm font-medium text-sea-deep">{label}</span>
    </div>
  )
}
