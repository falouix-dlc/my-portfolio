// app/components/ThemeProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(savedTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}