'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useT } from '@/app/i18n/client'
import { useParams } from 'next/navigation'

export function CartNavButton() {
  const { totalItems } = useCart()
  const { t } = useT()
  const params = useParams()
  const locale = params?.locale ?? 'es'

  return (
    <Button variant='ghost' size='icon' asChild className='relative'>
      <Link href={`/${locale}/cart`}>
        <ShoppingBag className='w-5 h-5' />
        {totalItems > 0 && (
          <Badge className='absolute -top-1 -right-1 size-4 px-0 text-[10px] flex items-center justify-center'>
            {totalItems}
          </Badge>
        )}
        <span className='sr-only'>{t('cart.ariaLabel', { count: totalItems })}</span>
      </Link>
    </Button>
  )
}
