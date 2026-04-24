'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartNavButton() {
  const { totalItems } = useCart()

  return (
    <Link href='/cart' className='relative inline-flex items-center gap-1 p-2 text-zinc-700 hover:text-zinc-900 transition-colors'>
      <ShoppingBag className='w-5 h-5' />
      {totalItems > 0 && (
        <span className='absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-zinc-900 text-white text-[10px] font-bold px-1'>
          {totalItems}
        </span>
      )}
      <span className='sr-only'>Cart ({totalItems} items)</span>
    </Link>
  )
}
