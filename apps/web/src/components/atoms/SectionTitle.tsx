import Icon from './Icon'

interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: string
}

export default function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-sea-medium">
            <Icon name={icon as Parameters<typeof Icon>[0]['name']} size={22} />
          </span>
        )}
        <h2 className="text-xl font-bold text-sea-deep">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  )
}
