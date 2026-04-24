import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { allPerfumeSlugsQuery, perfumeBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { AddToCartSection } from '@/components/add-to-cart-section'
import { CartSheet } from '@/components/cart-sheet'

export async function generateStaticParams() {
  const perfumes = await client.fetch(allPerfumeSlugsQuery)
  return perfumes.map((p: { slug: string }) => ({ slug: p.slug }))
}

export default async function PerfumePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: perfume } = await sanityFetch({ query: perfumeBySlugQuery, params: { slug } })

  if (!perfume) notFound()

  const imageUrl = perfume.image
    ? urlFor(perfume.image).width(800).height(800).fit('crop').url()
    : null

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-10 bg-card border-b border-border'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <Link href='/' className='text-xl font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors'>
            Aura Essences
          </Link>
          <CartSheet />
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
        <Link href='/' className='text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block'>
          ← Back to all perfumes
        </Link>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
          <div className='relative aspect-square overflow-hidden bg-muted'>
            {imageUrl
              ? (
                  <Image
                    src={imageUrl}
                    alt={perfume.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                    priority
                  />
                )
              : (
                  <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                    No image
                  </div>
                )}
          </div>

          <div className='flex flex-col gap-6'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>{perfume.name}</h1>
              {perfume.description && (
                <p className='mt-3 text-muted-foreground leading-relaxed whitespace-pre-line'>
                  {perfume.description}
                </p>
              )}
            </div>

            <AddToCartSection
              perfumeId={perfume._id}
              name={perfume.name}
              imageUrl={imageUrl}
              bottlePrice={perfume.bottlePrice}
              decants={perfume.decants}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
