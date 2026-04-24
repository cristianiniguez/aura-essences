import { sanityFetch } from '@/sanity/lib/live'
import { allPerfumesQuery } from '@/sanity/lib/queries'
import { PerfumeCard } from '@/components/perfume-card'
import { CartSheet } from '@/components/cart-sheet'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { getT } from '@/app/i18n'

export default async function HomePage() {
  const { data: perfumes } = await sanityFetch({ query: allPerfumesQuery })
  const { t, locale } = await getT()

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-10 bg-card border-b border-border'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <span className='text-xl font-semibold tracking-tight text-foreground'>Aura Essences</span>
          <div className='flex items-center gap-2'>
            <LocaleSwitcher />
            <CartSheet />
          </div>
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
        <h1 className='text-3xl font-bold text-foreground mb-8'>{t('home.heading')}</h1>

        {perfumes.length === 0
          ? (
              <p className='text-muted-foreground'>{t('home.empty')}</p>
            )
          : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {perfumes.map((perfume: any) => (
                  <PerfumeCard key={perfume._id} locale={locale} {...perfume} />
                ))}
              </div>
            )}
      </main>
    </div>
  )
}
