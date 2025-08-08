"use client"

import { Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from '../contexts/ThemeContext'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600" />
      )}
    </Button>
  )
}
