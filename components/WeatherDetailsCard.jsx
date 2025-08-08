import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from '../contexts/ThemeContext'

export const WeatherDetailsCard = ({ icon: Icon, label, value }) => {
  const { colors } = useTheme()

  return (
    <Card 
      className="backdrop-blur-sm border-white/20"
      style={{ backgroundColor: colors.card }}
    >
      <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3 justify-evenly">
        <Icon className="w-8 h-8" style={{ color: colors.text.secondary }} />
        <div>
          <p className="text-sm" style={{ color: colors.text.muted }}>{label}</p>
          <p className="text-xl font-semibold" style={{ color: colors.text.primary }}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
