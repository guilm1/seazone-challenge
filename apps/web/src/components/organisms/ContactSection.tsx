import type { Property } from '@seazone/shared'
import SectionTitle from '../atoms/SectionTitle'
import Icon from '../atoms/Icon'

interface ContactSectionProps {
  property: Property
}

function formatBrazilianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return phone
}

export default function ContactSection({ property }: ContactSectionProps) {
  const { host, address } = property
  const formattedPhone = formatBrazilianPhone(host.phone)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}`
  )}`

  return (
    <section className="rounded-xl bg-white border border-gray-200 p-6 shadow-card">
      <SectionTitle title="Contato e Localização" icon="phone" />

      <div className="mt-4 space-y-4">
        {/* Host contact */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sea-light">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sea-deep flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {host.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sea-deep text-sm">{host.name}</p>
            <a
              href={`tel:${host.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 text-sea-medium text-sm hover:underline"
            >
              <Icon name="phone" size={13} />
              {formattedPhone}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 text-sea-medium">
            <Icon name="map-pin" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              {address.street}, {address.number}
              {address.complement && ` - ${address.complement}`}
              <br />
              {address.neighborhood}, {address.city} - {address.state}
              <br />
              CEP: {address.postal_code}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sea-medium text-sm font-medium hover:underline"
            >
              <Icon name="map-pin" size={14} />
              Ver no mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
