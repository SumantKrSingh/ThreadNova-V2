import { useState, useEffect, createContext } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getInitialTheme = (): 'light' | 'dark' => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored
    } catch (error) {
      console.log(error)
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      localStorage.setItem('theme', theme)
    } catch (err) {
      console.log(err)
    }
  }, [theme])

  const toggleTheme = (): void => {
    document.body.classList.add('theme-fade')

    setTimeout(() => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
      document.body.classList.remove('theme-fade')
    }, 150)
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
