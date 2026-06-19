import { create } from 'zustand'

export type PageView = 'home' | 'all-activities' | 'all-news' | 'all-struktur'

interface ViewState {
  view: PageView
  setView: (view: PageView) => void
  goHome: () => void
}

export const useView = create<ViewState>()((set) => ({
  view: 'home',
  setView: (view) => {
    set({ view })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  },
  goHome: () => {
    set({ view: 'home' })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  },
}))
