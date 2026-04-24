'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

type Decant = { _key?: string, capacity: number, price: number }

type AddToCartSectionProps = {
  perfumeId: string
  name: string
  imageUrl: string | null
  bottlePrice: number
  decants?: Decant[]
}

export function AddToCartSection({ perfumeId, name, imageUrl, bottlePrice, decants }: AddToCartSectionProps) {
  const { addItem } = useCart()
  const [selection, setSelection] = useState<'bottle' | number>('bottle')
  const [added, setAdded] = useState(false)

  const selectedDecant = typeof selection === 'number'
    ? decants?.find(d => d.capacity === selection)
    : null

  const price = selectedDecant ? selectedDecant.price : bottlePrice

  function handleAddToCart() {
    const id = selection === 'bottle'
      ? `${perfumeId}-bottle`
      : `${perfumeId}-decant-${selection}`

    addItem({
      id,
      perfumeId,
      name,
      imageUrl,
      type: selection === 'bottle' ? 'bottle' : 'decant',
      capacity: typeof selection === 'number' ? selection : undefined,
      price
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium text-zinc-700'>Select option</span>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => setSelection('bottle')}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selection === 'bottle'
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
            }`}
          >
            Whole Bottle — Bs. {bottlePrice}
          </button>

          {decants?.map(d => (
            <button
              key={d.capacity}
              onClick={() => setSelection(d.capacity)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selection === d.capacity
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
              }`}
            >
              {d.capacity}ml — Bs. {d.price}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className='w-full sm:w-auto px-8 py-3 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-700 transition-colors'
      >
        {added ? 'Added to cart!' : 'Add to cart'}
      </button>
    </div>
  )
}
