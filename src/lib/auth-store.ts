import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  avatar?: string | null
}

interface AuthState {
  user: AuthUser | null
  showAdmin: boolean
  setUser: (user: AuthUser | null) => void
  setShowAdmin: (show: boolean) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      showAdmin: false,
      setUser: (user) => set({ user }),
      setShowAdmin: (show) => set({ showAdmin: show }),
      logout: async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        set({ user: null, showAdmin: false })
      },
      checkAuth: async () => {
        try {
          const res = await fetch('/api/auth/me')
          if (res.ok) {
            const data = await res.json()
            set({ user: data.user })
          } else {
            set({ user: null })
          }
        } catch {
          set({ user: null })
        }
      },
    }),
    { name: 'katana-auth' }
  )
)
