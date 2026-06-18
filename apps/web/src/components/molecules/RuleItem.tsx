interface RuleItemProps {
  label: string
  value: boolean | string
  allowedText?: string
  notAllowedText?: string
}

export default function RuleItem({
  label,
  value,
  allowedText = 'Permitido',
  notAllowedText = 'Não permitido',
}: RuleItemProps) {
  const isString = typeof value === 'string'

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700 font-medium">{label}</span>
      {isString ? (
        <span className="text-sm font-semibold text-sea-deep">{value}</span>
      ) : (
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
            value ? 'text-green-600' : 'text-red-500'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}
          />
          {value ? allowedText : notAllowedText}
        </span>
      )}
    </div>
  )
}
