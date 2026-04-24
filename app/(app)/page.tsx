import { sanityFetch } from '@/sanity/lib/live'
import { allPerfumesQuery } from '@/sanity/lib/queries'
import { PerfumeCard } from '@/components/perfume-card'
import { CartNavButton } from '@/components/cart-nav-button'

export default async function HomePage() {
  const { data: perfumes } = await sanityFetch({ query: allPerfumesQuery })

  return (
    <div className='min-h-screen bg-zinc-50'>
      <header className='sticky top-0 z-10 bg-white border-b border-zinc-200'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <span className='text-xl font-semibold tracking-tight text-zinc-900'>Aura Essences</span>
          <CartNavButton />
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
        <h1 className='text-3xl font-bold text-zinc-900 mb-8'>Our Perfumes</h1>

        {perfumes.length === 0
          ? (
              <p className='text-zinc-500'>No perfumes available yet. Check back soon.</p>
            )
          : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {perfumes.map((perfume: any) => (
                  <PerfumeCard key={perfume._id} {...perfume} />
                ))}
              </div>
            )}
      </main>
    </div>
  )
}
