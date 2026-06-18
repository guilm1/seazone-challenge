import type { Essential } from '@seazone/shared'
import Badge from '../atoms/Badge'

interface EssentialCardProps {
  essential: Essential
}

const typeVariant = (type: string): 'green' | 'red' | 'blue' | 'gray' => {
  const t = type.toLowerCase()
  if (t.includes('farmácia') || t.includes('farmacia') || t.includes('pharmacy')) return 'green'
  if (t.includes('hospital') || t.includes('emergência') || t.includes('emergencia') || t.includes('pronto')) return 'red'
  if (t.includes('mercado') || t.includes('supermercado') || t.includes('supermarket')) return 'blue'
  return 'gray'
}

const typeLabel = (type: string): string => {
  const t = type.toLowerCase()
  if (t.includes('farmácia') || t.includes('farmacia') || t.includes('pharmacy')) return 'Farmácia'
  if (t.includes('hospital') || t.includes('emergência') || t.includes('emergencia')) return 'Hospital'
  if (t.includes('pronto')) return 'Pronto-Socorro'
  if (t.includes('supermercado') || t.includes('supermarket')) return 'Supermercado'
  if (t.includes('mercado')) return 'Mercado'
  return type
}

export default function EssentialCard({ essential }: EssentialCardProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sea-deep text-sm leading-snug">{essential.name}</h3>
        <div className="flex flex-col items-end gap-1">
          <Badge label={typeLabel(essential.type)} variant={typeVariant(essential.type)} />
          <Badge label={essential.distance} variant="gray" />
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{essential.description}</p>
    </div>
  )
}
