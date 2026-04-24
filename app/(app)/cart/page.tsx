'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CartNavButton } from '@/components/cart-nav-button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()

  return (
    <div className='min-h-screen bg-zinc-50'>
      <header className='sticky top-0 z-10 bg-white border-b border-zinc-200'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <Link href='/' className='text-xl font-semibold tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors'>
            Aura Essences
          </Link>
          <CartNavButton />
        </div>
      </header>

      <main className='max-w-3xl mx-auto px-4 sm:px-6 py-12'>
        <h1 className='text-3xl font-bold text-zinc-900 mb-8'>Your Cart</h1>

        {items.length === 0
          ? (
              <div className='flex flex-col items-center gap-4 py-20 text-center'>
                <p className='text-zinc-500'>Your cart is empty.</p>
                <Link
                  href='/'
                  className='px-6 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-700 transition-colors'
                >
                  Browse perfumes
                </Link>
              </div>
            )
          : (
              <div className='flex flex-col gap-6'>
                <ul className='flex flex-col divide-y divide-zinc-200 bg-white rounded-2xl border border-zinc-200 overflow-hidden'>
                  {items.map(item => (
                    <li key={item.id} className='flex items-center gap-4 p-4'>
                      <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0'>
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
                              <div className='w-full h-full bg-zinc-200' />
                            )}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-zinc-900 truncate'>{item.name}</p>
                        <p className='text-sm text-zinc-500'>
                          {item.type === 'bottle' ? 'Whole Bottle' : `${item.capacity}ml Decant`}
                          {' · '}Bs. {item.price}
                        </p>
                      </div>

                      <div className='flex items-center gap-2 shrink-0'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='w-7 h-7 flex items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-500 transition-colors'
                          aria-label='Decrease quantity'
                        >
                          <Minus className='w-3 h-3' />
                        </button>
                        <span className='w-6 text-center text-sm font-medium'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='w-7 h-7 flex items-center justify-center rounded-full border border-zinc-300 hover:border-zinc-500 transition-colors'
                          aria-label='Increase quantity'
                        >
                          <Plus className='w-3 h-3' />
                        </button>
                      </div>

                      <p className='w-20 text-right text-sm font-semibold text-zinc-900 shrink-0'>
                        Bs. {item.price * item.quantity}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className='text-zinc-400 hover:text-red-500 transition-colors'
                        aria-label='Remove item'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className='flex flex-col gap-3 items-end'>
                  <div className='flex items-center gap-4'>
                    <span className='text-zinc-600'>Subtotal</span>
                    <span className='text-xl font-bold text-zinc-900'>Bs. {subtotal}</span>
                  </div>

                  <div className='flex gap-3'>
                    <button
                      onClick={clearCart}
                      className='px-5 py-2.5 text-sm font-medium text-zinc-600 border border-zinc-300 rounded-full hover:border-zinc-500 transition-colors'
                    >
                      Clear cart
                    </button>
                    <button
                      className='px-6 py-2.5 text-sm font-medium bg-zinc-900 text-white rounded-full hover:bg-zinc-700 transition-colors'
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
      </main>
    </div>
  )
}
