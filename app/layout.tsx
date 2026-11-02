import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import PageTransition from '@/components/ui/PageTransition'
import Reveal from '@/components/ui/Reveal'
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithron.com'),
  title: {
    default: 'Rohan Tiwarekar · Building in public',
    template: '%s',
  },
  description:
    'I build things and figure it out in public. Co-founder of The Adda Labs in Mumbai. Live sessions, honest notes, and the parts that break.',
  alternates: {
    types: { 'application/rss+xml': [{ url: '/notes/rss.xml', title: 'Notes · Rohan Tiwarekar' }] },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased overflow-x-hidden">
        <LanguageProvider>
          <PageTransition>{children}</PageTransition>
        </LanguageProvider>
        <Reveal />
        <Analytics />
      </body>
    </html>
  )
}
