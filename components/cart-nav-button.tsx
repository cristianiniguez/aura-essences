'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

export function CartNavButton() {
  const { totalItems } = useCart()

  return (
    <Button variant='ghost' size='icon' asChild className='relative'>
      <Link href='/cart'>
        <ShoppingBag className='w-5 h-5' />
        {totalItems > 0 && (
          <Badge className='absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center'>
            {totalItems}
          </Badge>
        )}
        <span className='sr-only'>Cart ({totalItems} items)</span>
      </Link>
    </Button>
  )
}
