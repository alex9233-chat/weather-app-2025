"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('weather-app-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('weather-app-theme', newTheme)
  }

  const themes = {
    dark: {
      background: '#1E1E1E',
      rightSection: '#222831',
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.8)',
        muted: 'rgba(255, 255, 255, 0.6)'
      },
      overlay: 'rgba(0, 0, 0, 0.3)',
      card: 'rgba(255, 255, 255, 0.1)'
    },
    light: {
      background: '#F5F7FA',
      rightSection: '#FFFFFF',
      text: {
        primary: '#1E1E1E',
        secondary: 'rgba(30, 30, 30, 0.8)',
        muted: 'rgba(30, 30, 30, 0.6)'
      },
      overlay: 'rgba(255, 255, 255, 0.4)',
      card: 'rgba(0, 0, 0, 0.1)'
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
