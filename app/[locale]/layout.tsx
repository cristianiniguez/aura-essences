import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import { notFound } from 'next/navigation'
import { CartProvider } from '@/lib/cart-context'
import { SanityLive } from '@/sanity/lib/live'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { getT } from '@/app/i18n'
import { locales, type Locale } from '@/app/i18n/settings'
import '../globals.css'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontSerif = Cinzel({ subsets: ['latin'], variable: '--font-serif' })

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT()
  return {
    title: t('metadata.homeTitle'),
    description: t('metadata.homeDescription')
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  return (
    <html
      lang={locale}
      className={cn('h-full antialiased', fontSans.variable, fontSerif.variable)}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <SanityLive />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
