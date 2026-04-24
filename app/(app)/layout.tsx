import { CartProvider } from '@/lib/cart-context'
import { SanityLive } from '@/sanity/lib/live'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <SanityLive />
    </CartProvider>
  )
}
