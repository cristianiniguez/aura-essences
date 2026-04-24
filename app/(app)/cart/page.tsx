'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { CartNavButton } from '@/components/cart-nav-button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-10 bg-card border-b border-border'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <Link href='/' className='text-xl font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors'>
            Aura Essences
          </Link>
          <CartNavButton />
        </div>
      </header>

      <main className='max-w-3xl mx-auto px-4 sm:px-6 py-12'>
        <h1 className='text-3xl font-bold text-foreground mb-8'>Your Cart</h1>

        {items.length === 0
          ? (
              <div className='flex flex-col items-center gap-4 py-20 text-center'>
                <p className='text-muted-foreground'>Your cart is empty.</p>
                <Button asChild className='rounded-full'>
                  <Link href='/'>Browse perfumes</Link>
                </Button>
              </div>
            )
          : (
              <div className='flex flex-col gap-6'>
                <ul className='flex flex-col divide-y divide-border bg-card rounded-2xl border border-border overflow-hidden'>
                  {items.map(item => (
                    <li key={item.id} className='flex items-center gap-4 p-4'>
                      <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0'>
                        {item.imageUrl
                          ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className='object-cover'
                                sizes='64px'
                              />
                            )
                          : (
                              <div className='w-full h-full bg-muted' />
                            )}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-card-foreground truncate'>{item.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {item.type === 'bottle' ? 'Whole Bottle' : `${item.capacity}ml Decant`}
                          {' · '}Bs. {item.price}
                        </p>
                      </div>

                      <div className='flex items-center gap-2 shrink-0'>
                        <Button
                          variant='outline'
                          size='icon-sm'
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label='Decrease quantity'
                        >
                          <Minus />
                        </Button>
                        <span className='w-6 text-center text-sm font-medium'>{item.quantity}</span>
                        <Button
                          variant='outline'
                          size='icon-sm'
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label='Increase quantity'
                        >
                          <Plus />
                        </Button>
                      </div>

                      <p className='w-20 text-right text-sm font-semibold text-card-foreground shrink-0'>
                        Bs. {item.price * item.quantity}
                      </p>

                      <Button
                        variant='ghost'
                        size='icon-sm'
                        onClick={() => removeItem(item.id)}
                        aria-label='Remove item'
                        className='text-muted-foreground hover:text-destructive'
                      >
                        <Trash2 />
                      </Button>
                    </li>
                  ))}
                </ul>

                <div className='flex flex-col gap-3 items-end'>
                  <div className='flex items-center gap-4'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span className='text-xl font-bold text-foreground'>Bs. {subtotal}</span>
                  </div>

                  <div className='flex gap-3'>
                    <Button variant='outline' onClick={clearCart} className='rounded-full'>
                      Clear cart
                    </Button>
                    <Button className='rounded-full'>
                      Proceed to checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
      </main>
    </div>
  )
}
