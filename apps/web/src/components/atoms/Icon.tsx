type IconName =
  | 'wifi'
  | 'key'
  | 'car'
  | 'clock'
  | 'dog'
  | 'no-smoking'
  | 'users'
  | 'phone'
  | 'map-pin'
  | 'star'
  | 'utensils'
  | 'landmark'
  | 'hospital'
  | 'send'
  | 'chevron-down'
  | 'x'
  | 'arrow-left'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

const icons: Record<IconName, React.ReactNode> = {
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </>
  ),
  car: (
    <>
      <path d="M19 17H5v-1.5A1.5 1.5 0 0 1 6.5 14h11a1.5 1.5 0 0 1 1.5 1.5V17Z" />
      <path d="M14 10H6l-1.5 4h15L18 10h-4Z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  dog: (
    <>
      <path d="M10 5.172C10 3.345 8.023 2 5.5 2c-2.22 0-3.5 1.024-3.5 2.357C2 6 4.536 8 7 9c0 .583-.152 1.069-.442 1.369" />
      <path d="M14.267 5.172c0-1.827 1.977-3.172 4.5-3.172 2.22 0 3.5 1.024 3.5 2.357C22.267 6 19.731 8 17.267 9" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 20A2 2 0 0 1 4 18.93l-.05-.12A2 2 0 0 1 4 17l.09-.15A2 2 0 0 1 6 16h12a2 2 0 0 1 1.91 1.41l.04.14A2 2 0 0 1 20 19v1.13A2 2 0 0 1 18 22H6a2 2 0 0 1-1.58-.77Z" />
    </>
  ),
  'no-smoking': (
    <>
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" />
      <path d="M22 13v2a1 1 0 0 1-1 1h-5" />
      <path d="M17.2 9.2 19 9" />
      <path d="M22 9.4V8.5c0-2-1.6-3.5-3.5-3.5" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.82V16.92Z" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  star: (
    <>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </>
  ),
  utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </>
  ),
  landmark: (
    <>
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </>
  ),
  hospital: (
    <>
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </>
  ),
  send: (
    <>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </>
  ),
  'chevron-down': (
    <>
      <polyline points="6 9 12 15 18 9" />
    </>
  ),
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  'arrow-left': (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}
