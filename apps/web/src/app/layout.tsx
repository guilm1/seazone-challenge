import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navbar from '@/components/organisms/Navbar'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Guia do Hóspede | Seazone',
  description: 'Seu guia digital de estadia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} font-sans antialiased bg-sea-foam`}>
        <LanguageProvider>
          <Navbar />
          <div className="pt-10">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
