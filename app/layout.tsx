import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontSerif = Cinzel({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Aura Essences',
  description: 'Luxury perfumes — whole bottles and decants'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={cn('h-full antialiased', fontSans.variable, fontSerif.variable)}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  )
}
