import type { Restaurant } from '@seazone/shared'
import Badge from '../atoms/Badge'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sea-deep text-sm leading-snug">{restaurant.name}</h3>
        <Badge label={restaurant.distance} variant="blue" />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{restaurant.description}</p>
    </div>
  )
}
