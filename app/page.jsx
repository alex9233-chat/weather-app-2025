"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, MapPin, Search, Loader2, Navigation, AlertCircle, Shield, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { LoadingScreen } from '../components/LoadingScreen'
import { ErrorBanner } from '../components/ErrorBanner'
import { CurrentWeatherSection } from '../components/CurrentWeatherSection'
import { WeatherDetailsSection } from '../components/WeatherDetailsSection'
import { useWeatherData } from '../hooks/useWeatherData'

const WeatherIcon = ({ condition, className = "w-16 h-16" }) => {
  const iconMap = {
    sunny: <Sun className={`${className} text-yellow-400`} />,
    cloudy: <Cloud className={`${className} text-gray-400`} />,
    rainy: <CloudRain className={`${className} text-blue-400`} />,
    snowy: <CloudSnow className={`${className} text-blue-200`} />,
    default: <Sun className={`${className} text-yellow-400`} />
  }
  
  return iconMap[condition.toLowerCase()] || iconMap.default
}

const ForecastCard = ({ day }) => {
  const { colors } = useTheme()
  
  return (
    <Card 
      className="backdrop-blur-sm border-white/20"
      style={{ backgroundColor: colors.card }}
    >
      <CardContent className="p-1 text-center">
        <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>{day.day}</p>
        <div className="flex justify-center my-2">
          <WeatherIcon condition={day.condition} className="w-8 h-8" />
        </div>
        <div style={{ color: colors.text.primary }}>
          <span className="font-semibold">{day.high}°</span>
          <span className="ml-1" style={{ color: colors.text.muted }}>{day.low}°</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Fallback mock data for when API is not available
const mockWeatherData = {
  location: "New York, NY",
  temperature: 27,
  condition: "sunny",
  humidity: 39,
  windSpeed: 13,
  description: "clear sky",
  forecast: [
    { day: "Tomorrow", high: 27, low: 16, condition: "sunny" },
    { day: "Thursday", high: 30, low: 22, condition: "sunny" },
    { day: "Friday", high: 31, low: 23, condition: "cloudy" }
  ]
}

const WeatherAppContent = () => {
  const { colors } = useTheme()
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [currentDay, setCurrentDay] = useState("")

  const {
    weatherData,
    isLoading,
    isInitialLoading,
    error,
    locationStatus,
    geolocationSupport,
    handleLocationChange,
    handleUseMyLocation
  } = useWeatherData()

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }))
    setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }))
  }, [])

  const onLocationChange = (newLocation) => {
    handleLocationChange(newLocation)
    setIsLocationModalOpen(false)
  }

  const onUseMyLocation = () => {
    setIsLocationModalOpen(false)
    handleUseMyLocation()
  }

  // Loading screen
  if (isInitialLoading) {
    return (
      <LoadingScreen 
        locationStatus={locationStatus} 
        geolocationSupport={geolocationSupport} 
      />
    )
  }

  // Error screen
  if (!weatherData) {
    return (
      <div 
        className="min-h-screen font-['Montserrat'] flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center" style={{ color: colors.text.primary }}>
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.text.secondary }} />
          <p className="mb-4">Unable to load weather data.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen font-['Montserrat'] transition-all duration-500 ease-in-out"
      style={{ backgroundColor: colors.background }}
    >
      <ThemeSwitcher />
      
      <ErrorBanner 
        error={error}
        locationStatus={locationStatus}
        geolocationSupport={geolocationSupport}
        onRetry={handleUseMyLocation}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
          {/* Left Section - Current Weather */}
          <CurrentWeatherSection
            weatherData={weatherData}
            currentDay={currentDay}
            currentDate={currentDate}
            locationStatus={locationStatus}
          />

          {/* Right Section - Details and Forecast */}
          <WeatherDetailsSection
            weatherData={weatherData}
            locationStatus={locationStatus}
            geolocationSupport={geolocationSupport}
            onUseMyLocation={onUseMyLocation}
            onLocationChange={onLocationChange}
            isLocationModalOpen={isLocationModalOpen}
            setIsLocationModalOpen={setIsLocationModalOpen}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default function WeatherApp() {
  return (
    <ThemeProvider>
      <WeatherAppContent />
    </ThemeProvider>
  )
}
