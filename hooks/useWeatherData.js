import { useState, useEffect } from 'react'
import { 
  fetchWeatherData, 
  fetchForecastData, 
  getCurrentLocation, 
  fetchWeatherByCoords, 
  checkGeolocationSupport, 
  getLocationByIP 
} from '../components/weather-api'

// Fallback mock data
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

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState("")
  const [locationStatus, setLocationStatus] = useState("requesting")
  const [geolocationSupport, setGeolocationSupport] = useState(null)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      const support = checkGeolocationSupport()
      setGeolocationSupport(support)
      
      console.log('App initialization - Geolocation support:', support)
      
      if (support.canUseLocation) {
        await requestUserLocationWithFallbacks()
      } else {
        console.log('Geolocation not available, loading default location')
        setLocationStatus("unsupported")
        await loadDefaultLocation()
      }
    } catch (error) {
      console.error('Error initializing app:', error)
      await loadDefaultLocation()
    }
  }

  const requestUserLocationWithFallbacks = async () => {
    try {
      setIsInitialLoading(true)
      setLocationStatus("requesting")
      setError("")
      
      console.log("Attempting to get user's location...")
      
      // First try: GPS geolocation
      try {
        const coords = await getCurrentLocation()
        setLocationStatus("granted")
        console.log("GPS location successful")
        await loadWeatherByCoords(coords.lat, coords.lon)
        return
      } catch (gpsError) {
        console.log("GPS location failed:", gpsError.message)
        
        // Second try: IP-based location
        try {
          console.log("Trying IP-based location...")
          const ipLocation = await getLocationByIP()
          setLocationStatus("ip_location")
          console.log("IP location successful:", ipLocation.city)
          await loadWeatherByCoords(ipLocation.lat, ipLocation.lon)
          return
        } catch (ipError) {
          console.log("IP location failed:", ipError.message)
        }
        
        throw gpsError
      }
      
    } catch (locationError) {
      console.error("All location methods failed:", locationError)
      setLocationStatus("denied")
      
      const errorMsg = locationError.message || "Could not determine your location"
      setError(`${errorMsg}. Using default location.`)
      
      await loadDefaultLocation()
      
    } finally {
      setIsInitialLoading(false)
    }
  }

  const loadWeatherByCoords = async (lat, lon) => {
    try {
      console.log(`Loading weather for coordinates: ${lat}, ${lon}`)
      const weather = await fetchWeatherByCoords(lat, lon)
      const forecast = await fetchForecastData(weather.location.split(',')[0])
      
      setWeatherData({
        ...weather,
        forecast: forecast
      })
      
      console.log("Weather data loaded successfully for:", weather.location)
    } catch (error) {
      console.error('Error loading weather by coordinates:', error)
      throw error
    }
  }

  const loadDefaultLocation = async () => {
    try {
      console.log("Loading default location (New York)...")
      
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
      
      if (!API_KEY) {
        console.log("No API key found, using mock data")
        setWeatherData(mockWeatherData)
        setError("API key not configured. Using sample data.")
        return
      }
      
      const weather = await fetchWeatherData('New York')
      const forecast = await fetchForecastData('New York')
      
      setWeatherData({
        ...weather,
        forecast: forecast
      })
      
      console.log("Default weather data loaded successfully")
      
    } catch (error) {
      console.error('Failed to load default weather data:', error)
      console.log("Using mock data as final fallback")
      setWeatherData(mockWeatherData)
      setError("Unable to load live weather data. Using sample data.")
    } finally {
      setIsInitialLoading(false)
    }
  }

  const handleLocationChange = async (newLocation) => {
    if (!newLocation.trim()) return
    
    setIsLoading(true)
    setError("")
    
    try {
      const weather = await fetchWeatherData(newLocation)
      const forecast = await fetchForecastData(newLocation)
      
      setWeatherData({
        ...weather,
        forecast: forecast
      })
      
      setLocationStatus("manual")
      // Clear any previous errors on success
      setError("")
    } catch (error) {
      console.error('Error fetching weather:', error)
      
      // Set specific error message based on the error type
      let errorMessage = error.message
      
      // If it's a generic error, make it more user-friendly
      if (errorMessage.includes('Weather data not found')) {
        errorMessage = `"${newLocation}" not found. Please check the spelling or try a different city name.`
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseMyLocation = async () => {
    await requestUserLocationWithFallbacks()
  }

  return {
    weatherData,
    isLoading,
    isInitialLoading,
    error,
    locationStatus,
    geolocationSupport,
    handleLocationChange,
    handleUseMyLocation
  }
}
