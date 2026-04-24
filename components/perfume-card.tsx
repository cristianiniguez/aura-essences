import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

type Decant = { capacity: number, price: number }

type PerfumeCardProps = {
  _id: string
  name: string
  slug: { current: string }
  image?: { asset?: { _ref: string } }
  bottlePrice: number
  decants?: Decant[]
}

export function PerfumeCard({ name, slug, image, bottlePrice, decants }: PerfumeCardProps) {
  const imageUrl = image ? urlFor(image).width(600).height(600).fit('crop').url() : null

  const decantPriceRange = decants && decants.length > 0
    ? (() => {
        const prices = decants.map(d => d.price)
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        return min === max ? `Bs. ${min}` : `Bs. ${min} – ${max}`
      })()
    : null

  return (
    <Link
      href={`/perfumes/${slug.current}`}
      className='group flex flex-col rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:shadow-lg transition-shadow duration-200'
    >
      <div className='relative aspect-square bg-zinc-50'>
        {imageUrl
          ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
            )
          : (
              <div className='w-full h-full flex items-center justify-center text-zinc-300 text-sm'>
                No image
              </div>
            )}
      </div>

      <div className='flex flex-col gap-1 p-4'>
        <h2 className='font-semibold text-zinc-900 leading-snug line-clamp-2'>{name}</h2>
        <p className='text-sm text-zinc-500'>Bottle — Bs. {bottlePrice}</p>
        {decantPriceRange && (
          <p className='text-sm text-zinc-500'>Decant — {decantPriceRange}</p>
        )}
      </div>
    </Link>
  )
}
