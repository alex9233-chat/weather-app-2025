import { useTheme } from '../contexts/ThemeContext'
import { ForecastCard } from './ForecastCard'

export const ForecastSection = ({ forecast }) => {
  const { colors } = useTheme()

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
        3-Day Forecast
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {forecast.map((day, index) => (
          <ForecastCard key={index} day={day} />
        ))}
      </div>
    </div>
  )
}
