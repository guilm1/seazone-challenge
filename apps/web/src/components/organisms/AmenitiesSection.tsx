import AmenityItem from '../molecules/AmenityItem'
import SectionTitle from '../atoms/SectionTitle'

interface AmenitiesSectionProps {
  amenities: Record<string, boolean>
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const available = Object.entries(amenities).filter(([, value]) => value)

  if (available.length === 0) return null

  return (
    <section className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
      <SectionTitle title="Comodidades" subtitle="O que está disponível no imóvel" />
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
        {available.map(([key]) => (
          <AmenityItem key={key} amenityKey={key} available />
        ))}
      </div>
    </section>
  )
}
