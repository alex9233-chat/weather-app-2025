import { Wind, Droplets } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { WeatherDetailsCard } from './WeatherDetailsCard'
import { ForecastSection } from './ForecastSection'
import { LocationButtons } from './LocationButtons'

export const WeatherDetailsSection = ({ 
  weatherData, 
  locationStatus, 
  geolocationSupport, 
  onUseMyLocation, 
  onLocationChange, 
  isLocationModalOpen, 
  setIsLocationModalOpen, 
  error, 
  isLoading 
}) => {
  const { colors } = useTheme()

  return (
    <div 
      className="space-y-6 p-6 rounded-2xl h-fit lg:h-full flex flex-col justify-between transition-all duration-500"
      style={{ backgroundColor: colors.rightSection }}
    >
      {/* Current Conditions */}
      <div className="grid grid-cols-2 gap-4">
        <WeatherDetailsCard
          icon={Wind}
          label="Wind Speed"
          value={`${weatherData.windSpeed} km/h`}
        />
        <WeatherDetailsCard
          icon={Droplets}
          label="Humidity"
          value={`${weatherData.humidity}%`}
        />
      </div>

      {/* 3-Day Forecast */}
      <ForecastSection forecast={weatherData.forecast} />

      {/* Location Buttons */}
      <LocationButtons
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
  )
}
