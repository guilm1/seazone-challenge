import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'sea-deep': 'hsl(220, 100%, 12%)',
        'sea-medium': 'hsl(220, 100%, 50%)',
        'sea-light': 'hsl(225, 70%, 95%)',
        'sea-foam': 'hsl(6, 100%, 98%)',
        coral: 'hsl(2, 97%, 66%)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      boxShadow: {
        card: '0 4px 25px -5px hsla(220, 100%, 50%, 0.1)',
        elevated: '0 10px 40px -10px hsla(220, 100%, 50%, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
