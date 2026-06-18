import type { Attraction } from '@seazone/shared'
import Badge from '../atoms/Badge'

interface AttractionCardProps {
  attraction: Attraction
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sea-deep text-sm leading-snug">{attraction.name}</h3>
        <Badge label={attraction.distance} variant="green" />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{attraction.description}</p>
    </div>
  )
}
