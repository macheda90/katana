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
  hasMounted: boolean
  setUser: (user: AuthUser | null) => void
  setShowAdmin: (show: boolean) => void
  setHasMounted: (v: boolean) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      showAdmin: false,
      hasMounted: false,
      setUser: (user) => set({ user }),
      setShowAdmin: (show) => set({ showAdmin: show }),
      setHasMounted: (v) => set({ hasMounted: v }),
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
    {
      name: 'katana-auth',
      // Skip auto-hydration to avoid SSR/client mismatch.
      // We manually rehydrate after mount via checkAuth().
      skipHydration: true,
      // Don't persist hasMounted (it's a runtime flag only)
      partialize: (state) => ({ user: state.user, showAdmin: state.showAdmin }),
    }
  )
)
