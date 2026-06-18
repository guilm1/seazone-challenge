import type { Property } from '@seazone/shared'
import Image from 'next/image'
import Badge from '../atoms/Badge'
import Icon from '../atoms/Icon'

interface PropertyHeaderProps {
  property: Property
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const heroImage = property.images[0]

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden">
      {heroImage ? (
        <Image
          src={heroImage}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-sea-deep" />
      )}
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, hsla(220,100%,12%,0.4) 0%, hsla(220,100%,12%,0.8) 100%)',
        }}
      />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 md:px-10 md:pb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge label={property.property_type} variant="blue" />
          <span className="text-white/80 text-sm">
            {property.address.city}, {property.address.state}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
          {property.name}
        </h1>
        {/* Stats row */}
        <div className="flex items-center gap-4 md:gap-6 text-white/90 text-sm mb-3">
          <div className="flex items-center gap-1.5">
            <span>🛏</span>
            <span>
              {property.bedroom_quantity} {property.bedroom_quantity === 1 ? 'quarto' : 'quartos'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🚿</span>
            <span>
              {property.bathroom_quantity} {property.bathroom_quantity === 1 ? 'banheiro' : 'banheiros'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="users" size={16} />
            <span>
              {property.guest_capacity} {property.guest_capacity === 1 ? 'hóspede' : 'hóspedes'}
            </span>
          </div>
        </div>
        {/* Host info */}
        <div className="flex items-center gap-1.5 text-white/80 text-sm">
          <Icon name="phone" size={14} />
          <span>
            Anfitrião: {property.host.name} · {property.host.phone}
          </span>
        </div>
      </div>
    </div>
  )
}
