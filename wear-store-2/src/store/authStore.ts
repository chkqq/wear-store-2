import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem } from '@/types/interface'

interface User {
  login: string
  password: string
  cartItems: CartItem[]
}

interface AuthState {
  currentUser: string | null
  users: User[]
  register: (login: string, password: string) => void
  login: (login: string, password: string) => boolean
  logout: () => void
  addToUserCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromUserCart: (id: number, size: string) => void
  getUserCart: () => CartItem[]
  mergeCarts: (localCart: CartItem[]) => void
  clearUserCart: () => void
  updateUserCart: (cartItems: CartItem[]) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      register: (login, password) => {
        set((state) => {
          if (state.users.some(user => user.login === login)) {
            throw new Error('Пользователь с таким логином уже существует')
          }
          return {
            users: [...state.users, { login, password, cartItems: [] }],
            currentUser: login
          }
        })
      },

      login: (login, password) => {
        const { users } = get()
        const user = users.find(u => u.login === login && u.password === password)
        
        if (user) {
          set({ currentUser: login })
          return true
        }
        return false
      },

      logout: () => {
        set({ currentUser: null })
      },

      addToUserCart: (product) => {
        const { currentUser } = get()
        if (!currentUser) return

        set((state) => ({
          users: state.users.map(user => {
            if (user.login === currentUser) {
              const existingItem = user.cartItems.find(
                item => item.id === product.id && item.size === product.size
              )

              if (existingItem) {
                return {
                  ...user,
                  cartItems: user.cartItems.map(item =>
                    item.id === product.id && item.size === product.size
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                }
              }

              return {
                ...user,
                cartItems: [...user.cartItems, { ...product, quantity: 1 }]
              }
            }
            return user
          })
        }))
      },

      removeFromUserCart: (id, size) => {
        const { currentUser } = get()
        if (!currentUser) return

        set((state) => ({
          users: state.users.map(user => 
            user.login === currentUser
              ? {
                  ...user,
                  cartItems: user.cartItems.filter(
                    item => item.id !== id || item.size !== size
                  )
                }
              : user
          )
        }))
      },

      getUserCart: () => {
        const { currentUser, users } = get()
        if (!currentUser) return []
        const user = users.find(u => u.login === currentUser)
        return user ? user.cartItems : []
      },

      mergeCarts: (localCart) => {
        const { currentUser } = get()
        if (!currentUser) return

        set((state) => ({
          users: state.users.map(user => {
            if (user.login === currentUser) {
              const mergedCart = [...user.cartItems]
              
              localCart.forEach(localItem => {
                const existingItem = mergedCart.find(
                  item => item.id === localItem.id && item.size === localItem.size
                )
                
                if (existingItem) {
                  existingItem.quantity += localItem.quantity
                } else {
                  mergedCart.push(localItem)
                }
              })
              
              return { ...user, cartItems: mergedCart }
            }
            return user
          })
        }))
      },

      clearUserCart: () => {
        const { currentUser } = get()
        if (!currentUser) return

        set((state) => ({
          users: state.users.map(user => 
            user.login === currentUser
              ? { ...user, cartItems: [] }
              : user
          )
        }))
      },

      updateUserCart: (cartItems) => {
        const { currentUser } = get()
        if (!currentUser) return

        set((state) => ({
          users: state.users.map(user => 
            user.login === currentUser
              ? { ...user, cartItems }
              : user
          )
        }))
      }
    }),
    {
      name: 'wear-shop-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser
      }),
      version: 1
    }
  )
)