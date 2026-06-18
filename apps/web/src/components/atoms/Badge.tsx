type BadgeVariant = 'blue' | 'green' | 'red' | 'gray' | 'coral'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  blue: 'bg-sea-light text-sea-medium',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
  coral: 'bg-orange-100 text-coral',
}

export default function Badge({ label, variant = 'blue' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
