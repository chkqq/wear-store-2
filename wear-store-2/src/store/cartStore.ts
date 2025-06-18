import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useAuthStore } from './authStore'
import { CartItem } from '@/types/interface'

interface CartState {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, size: string) => void
  clearCart: () => void
  syncCartWithUser: () => void
  getTotalItems: () => number
  isSynced: boolean
  updateLocalCart: (cartItems: CartItem[]) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isSynced: false,

      addToCart: (product) => {
        const authStore = useAuthStore.getState()
        
        if (authStore.currentUser) {
          authStore.addToUserCart(product)
          set({ cartItems: authStore.getUserCart() })
        } else {
          set((state) => {
            const existingItem = state.cartItems.find(
              item => item.id === product.id && item.size === product.size
            )
            
            const newCartItems = existingItem
              ? state.cartItems.map(item =>
                  item.id === product.id && item.size === product.size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...state.cartItems, { ...product, quantity: 1 }]
            
            return { cartItems: newCartItems }
          })
        }
      },

      removeFromCart: (id, size) => {
        const authStore = useAuthStore.getState()
        
        if (authStore.currentUser) {
          authStore.removeFromUserCart(id, size)
          set({ cartItems: authStore.getUserCart() })
        } else {
          set((state) => ({
            cartItems: state.cartItems.filter(
              item => item.id !== id || item.size !== size
            )
          }))
        }
      },

      clearCart: () => {
        const authStore = useAuthStore.getState()
        if (authStore.currentUser) {
          authStore.clearUserCart()
        }
        set({ cartItems: [], isSynced: false })
      },

      syncCartWithUser: () => {
        const authStore = useAuthStore.getState()
        const { isSynced, cartItems } = get()
        
        if (authStore.currentUser) {
          if (!isSynced && cartItems.length > 0) {
            // Первая синхронизация - объединяем корзины
            authStore.mergeCarts(cartItems)
            set({ cartItems: authStore.getUserCart(), isSynced: true })
          } else {
            // Последующие обновления
            set({ cartItems: authStore.getUserCart(), isSynced: true })
          }
        }
      },

      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0)
      },

      updateLocalCart: (cartItems) => {
        set({ cartItems })
      }
    }),
    {
      name: 'wear-shop-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        isSynced: state.isSynced
      }),
      version: 1
    }
  )
)