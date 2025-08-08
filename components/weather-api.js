// Weather API utility functions for real OpenWeatherMap data

export const fetchWeatherData = async (city) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please add NEXT_PUBLIC_WEATHER_API_KEY to your environment variables.')
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling or try a different city name.`)
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your weather API configuration.')
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again in a few minutes.')
      } else {
        throw new Error(`Weather service error (${response.status}). Please try again later.`)
      }
    }

    const data = await response.json()
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like)
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export const fetchForecastData = async (city) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please add NEXT_PUBLIC_WEATHER_API_KEY to your environment variables.')
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Forecast data not available for "${city}". Please check the city name.`)
      } else if (response.status === 401) {
        throw new Error('Invalid API key for forecast data.')
      } else if (response.status === 429) {
        throw new Error('Too many forecast requests. Please try again later.')
      } else {
        throw new Error(`Forecast service error (${response.status}). Please try again later.`)
      }
    }

    const data = await response.json()
    
    // Group forecast by days and get daily min/max
    const dailyForecasts = {}
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000)
      const dayKey = date.toDateString()
      
      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = {
          date: date,
          temps: [],
          conditions: [],
          main: item.weather[0].main
        }
      }
      
      dailyForecasts[dayKey].temps.push(item.main.temp)
      dailyForecasts[dayKey].conditions.push(item.weather[0].main)
    })
    
    // Convert to array and get next 3 days
    const forecastArray = Object.values(dailyForecasts)
      .slice(1, 4) // Skip today, get next 3 days
      .map(day => ({
        day: day.date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        condition: mapWeatherCondition(day.main)
      }))
    
    return forecastArray
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    throw error
  }
}

export const mapWeatherCondition = (condition) => {
  const conditionMap = {
    'Clear': 'sunny',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'rainy',
    'Snow': 'snowy',
    'Mist': 'cloudy',
    'Fog': 'cloudy',
    'Haze': 'cloudy'
  }
  
  return conditionMap[condition] || 'sunny'
}

// Simplified and more reliable geolocation function
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // First check if geolocation is available
    if (!navigator || !navigator.geolocation) {
      console.log('Geolocation not supported')
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    // Check for secure context (HTTPS or localhost)
    const isSecureContext = window.isSecureContext || 
                           window.location.protocol === 'https:' || 
                           window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1'
    
    if (!isSecureContext) {
      console.log('Insecure context - geolocation requires HTTPS')
      reject(new Error('Geolocation requires a secure connection (HTTPS)'))
      return
    }

    console.log('Starting geolocation request...')

    // Set up timeout manually
    let timeoutId
    let resolved = false

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    const handleSuccess = (position) => {
      if (resolved) return
      resolved = true
      cleanup()
      
      console.log('Geolocation success:', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      })
      
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    }

    const handleError = (error) => {
      if (resolved) return
      resolved = true
      cleanup()
      
      console.log('Geolocation error details:', {
        error: error,
        code: error?.code,
        message: error?.message,
        type: typeof error,
        keys: error ? Object.keys(error) : 'no keys'
      })
      
      // Create a meaningful error message
      let errorMessage = 'Location access failed'
      let errorCode = 'UNKNOWN'
      
      if (error && typeof error.code === 'number') {
        switch(error.code) {
          case 1:
            errorMessage = 'Location access denied by user'
            errorCode = 'PERMISSION_DENIED'
            break
          case 2:
            errorMessage = 'Location information unavailable'
            errorCode = 'POSITION_UNAVAILABLE'
            break
          case 3:
            errorMessage = 'Location request timed out'
            errorCode = 'TIMEOUT'
            break
          default:
            errorMessage = `Location error (code: ${error.code})`
            errorCode = `CODE_${error.code}`
        }
      } else if (error && error.message) {
        errorMessage = error.message
        errorCode = 'CUSTOM_MESSAGE'
      } else {
        // Handle completely empty error objects
        errorMessage = 'Location service unavailable - please check browser settings'
        errorCode = 'EMPTY_ERROR'
      }
      
      console.log('Processed error:', { errorMessage, errorCode })
      
      const locationError = new Error(errorMessage)
      locationError.code = errorCode
      locationError.originalError = error
      reject(locationError)
    }

    // Set manual timeout (browsers sometimes don't respect the timeout option)
    timeoutId = setTimeout(() => {
      if (!resolved) {
        console.log('Manual timeout triggered')
        handleError({ code: 3, message: 'Request timed out after 10 seconds' })
      }
    }, 10000)

    // Configure geolocation options
    const options = {
      enableHighAccuracy: false, // Faster response
      timeout: 8000, // 8 seconds
      maximumAge: 300000 // 5 minutes cache
    }

    try {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      )
    } catch (syncError) {
      console.log('Synchronous geolocation error:', syncError)
      handleError(syncError)
    }
  })
}

// Fetch weather by coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  
  if (!API_KEY) {
    throw new Error('Weather API key not found')
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error('Weather data not found for your location')
    }

    const data = await response.json()
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like)
    }
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error)
    throw error
  }
}

// Check if geolocation is available and permissions
export const checkGeolocationSupport = () => {
  const isSupported = !!(navigator && navigator.geolocation)
  const isSecureContext = window.isSecureContext || 
                         window.location.protocol === 'https:' || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1'
  
  console.log('Geolocation support check:', {
    isSupported,
    isSecureContext,
    userAgent: navigator.userAgent,
    protocol: window.location.protocol,
    hostname: window.location.hostname
  })
  
  return {
    isSupported,
    isSecureContext,
    canUseLocation: isSupported && isSecureContext
  }
}

// Alternative: Try to get location using IP-based geolocation as fallback
export const getLocationByIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city,
        country: data.country_name
      }
    }
    throw new Error('IP location data incomplete')
  } catch (error) {
    console.error('IP geolocation failed:', error)
    throw new Error('Could not determine location from IP')
  }
}
