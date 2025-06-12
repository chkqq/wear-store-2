import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  image1: string
}

interface CartState {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, size: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id && item.size === product.size
          )
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id && item.size === product.size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }
          
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }]
          }
        }),
      removeFromCart: (id, size) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== id || item.size !== size
          )
        }))
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true 
    }
  )
)