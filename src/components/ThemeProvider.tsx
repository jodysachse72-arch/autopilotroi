'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('autopilotroi-theme') as Theme | null
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('autopilotroi-theme', next) } catch {}
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
