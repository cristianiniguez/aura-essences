'use client'

import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger
} from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'
import { useT } from '@/app/i18n/client'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export function CartSheet() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart()
  const { t } = useT()

  function buildWhatsAppUrl() {
    const lines = items.map(item => {
      const variant = item.type === 'bottle'
        ? t('whatsApp.wholeBottle')
        : t('whatsApp.decant', { capacity: item.capacity })
      return `• ${item.name} (${variant}) x${item.quantity} — Bs. ${item.price * item.quantity}`
    })
    const message = [
      t('whatsApp.greeting'),
      '',
      ...lines,
      '',
      `*${t('whatsApp.total')}: Bs. ${subtotal}*`
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <ShoppingBag className='w-5 h-5' />
          {totalItems > 0 && (
            <Badge className='absolute -top-1 -right-1 size-4 px-0 text-[10px] flex items-center justify-center'>
              {totalItems}
            </Badge>
          )}
          <span className='sr-only'>{t('cart.ariaLabel', { count: totalItems })}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='flex flex-col p-0 gap-0'>
        <SheetHeader className='border-b border-border px-4 py-4'>
          <SheetTitle className='text-base font-semibold'>
            {t('cart.title')} {totalItems > 0 && <span className='text-muted-foreground font-normal'>({totalItems})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0
          ? (
              <div className='flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center'>
                <ShoppingBag className='w-12 h-12 text-muted-foreground/40' />
                <p className='text-muted-foreground text-sm'>{t('cart.empty')}</p>
              </div>
            )
          : (
              <>
                <ul className='flex-1 overflow-y-auto divide-y divide-border'>
                  {items.map(item => (
                    <li key={item.id} className='flex items-center gap-3 px-4 py-3'>
                      <div className='relative w-14 h-14 overflow-hidden bg-muted shrink-0'>
                        {item.imageUrl
                          ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className='object-cover'
                                sizes='56px'
                              />
                            )
                          : <div className='w-full h-full bg-muted' />}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-sm text-foreground truncate'>{item.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {item.type === 'bottle'
                            ? t('cart.wholeBottle')
                            : t('cart.decant', { capacity: item.capacity })}
                          {' · '}Bs. {item.price}
                        </p>
                        <div className='flex items-center gap-1.5 mt-1.5'>
                          <Button
                            variant='outline'
                            size='icon-sm'
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={t('cart.decreaseQuantity')}
                          >
                            <Minus />
                          </Button>
                          <span className='w-5 text-center text-sm font-medium'>{item.quantity}</span>
                          <Button
                            variant='outline'
                            size='icon-sm'
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={t('cart.increaseQuantity')}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>

                      <div className='flex flex-col items-end gap-2 shrink-0'>
                        <p className='text-sm font-semibold text-foreground'>Bs. {item.price * item.quantity}</p>
                        <Button
                          variant='ghost'
                          size='icon-sm'
                          onClick={() => removeItem(item.id)}
                          aria-label={t('cart.removeItem')}
                          className='text-muted-foreground hover:text-destructive'
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <SheetFooter className='border-t border-border px-4 py-4 gap-3'>
                  <div className='flex justify-between items-center w-full'>
                    <span className='text-sm text-muted-foreground'>{t('cart.subtotal')}</span>
                    <span className='text-lg font-bold text-foreground'>Bs. {subtotal}</span>
                  </div>
                  <Button
                    className='w-full gap-2'
                    asChild
                  >
                    <a
                      href={buildWhatsAppUrl()}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MessageCircle className='w-4 h-4' />
                      {t('cart.orderViaWhatsApp')}
                    </a>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={clearCart}
                    className='w-full text-muted-foreground'
                  >
                    {t('cart.clearCart')}
                  </Button>
                </SheetFooter>
              </>
            )}
      </SheetContent>
    </Sheet>
  )
}
