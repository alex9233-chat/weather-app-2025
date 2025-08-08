import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from '../contexts/ThemeContext'
import { WeatherIcon } from './WeatherIcon'

export const ForecastCard = ({ day }) => {
  const { colors } = useTheme()
  
  return (
    <Card 
      className="backdrop-blur-sm border-white/20"
      style={{ backgroundColor: colors.card }}
    >
      <CardContent className="p-1 text-center">
        <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>
          {day.day}
        </p>
        <div className="flex justify-center my-2">
          <WeatherIcon condition={day.condition} className="w-8 h-8" />
        </div>
        <div style={{ color: colors.text.primary }}>
          <span className="font-semibold">{day.high}°</span>
          <span className="ml-1" style={{ color: colors.text.muted }}>
            {day.low}°
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
