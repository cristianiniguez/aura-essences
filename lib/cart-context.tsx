'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

export type CartItem = {
  id: string
  perfumeId: string
  name: string
  imageUrl: string | null
  type: 'bottle' | 'decant'
  capacity?: number
  price: number
  quantity: number
}

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD_ITEM', item: Omit<CartItem, 'quantity'> } |
  { type: 'REMOVE_ITEM', id: string } |
  { type: 'UPDATE_QUANTITY', id: string, quantity: number } |
  { type: 'CLEAR_CART' } |
  { type: 'LOAD', items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD':
      return { items: action.items }
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { items: state.items.filter(i => i.id !== action.id) }
      }
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        )
      }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'aura-essences-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) dispatch({ type: 'LOAD', items: JSON.parse(stored) })
    }
    catch {
      // Ignore JSON parse errors or localStorage issues
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: item => dispatch({ type: 'ADD_ITEM', item }),
        removeItem: id => dispatch({ type: 'REMOVE_ITEM', id }),
        updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
