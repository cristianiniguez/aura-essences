'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useT } from '@/app/i18n/client'

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
  const { t } = useT()
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
        <span className='text-sm font-medium text-foreground'>{t('addToCart.selectOption')}</span>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant={selection === 'bottle' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setSelection('bottle')}
          >
            {t('addToCart.wholeBottle', { price: bottlePrice })}
          </Button>

          {decants?.map(d => (
            <Button
              key={d.capacity}
              variant={selection === d.capacity ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelection(d.capacity)}
            >
              {t('addToCart.decantOption', { capacity: d.capacity, price: d.price })}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={handleAddToCart} className='w-full sm:w-auto px-8'>
        {added ? t('addToCart.added') : t('addToCart.addToCart')}
      </Button>
    </div>
  )
}
