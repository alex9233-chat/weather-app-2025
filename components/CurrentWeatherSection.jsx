import { MapPin, Navigation, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { WeatherIcon } from './WeatherIcon'

export const CurrentWeatherSection = ({ 
  weatherData, 
  currentDay, 
  currentDate, 
  locationStatus 
}) => {
  const { colors } = useTheme()

  return (
    <div 
      className="relative rounded-2xl overflow-hidden p-6"
      style={{
        backgroundImage: 'url(images/sunset-field.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Transparent overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-[1px]"
        style={{ backgroundColor: colors.overlay }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div style={{ color: colors.text.primary }}>
          <h1 className="text-2xl font-light mb-2 drop-shadow-lg">{currentDay}</h1>
          <div className="flex items-center gap-2 mb-1" style={{ color: colors.text.secondary }}>
            <MapPin className="w-4 h-4 drop-shadow-lg" />
            <span className="drop-shadow-lg">{weatherData.location}</span>
            {locationStatus === "granted" && (
              <div className="flex items-center gap-1 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                <Navigation className="w-3 h-3" />
                <span>GPS Location</span>
              </div>
            )}
            {locationStatus === "ip_location" && (
              <div className="flex items-center gap-1 text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                <Globe className="w-3 h-3" />
                <span>Approximate</span>
              </div>
            )}
          </div>
          <p className="drop-shadow-lg" style={{ color: colors.text.muted }}>{currentDate}</p>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div>
            <div 
              className="text-6xl md:text-7xl font-light mb-2 drop-shadow-lg"
              style={{ color: colors.text.primary }}
            >
              {weatherData.temperature}°
            </div>
            <p 
              className="text-lg capitalize drop-shadow-lg"
              style={{ color: colors.text.secondary }}
            >
              {weatherData.description || weatherData.condition}
            </p>
            {weatherData.feelsLike && (
              <p 
                className="text-sm drop-shadow-lg mt-1"
                style={{ color: colors.text.muted }}
              >
                Feels like {weatherData.feelsLike}°
              </p>
            )}
          </div>
          <div className="transform hover:scale-110 transition-transform duration-300">
            <WeatherIcon 
              condition={weatherData.condition} 
              className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
