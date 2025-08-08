import { Loader2, Navigation, Shield, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export const LoadingScreen = ({ locationStatus, geolocationSupport }) => {
  const { colors } = useTheme()

  const getLoadingContent = () => {
    switch (locationStatus) {
      case "requesting":
        return {
          icon: <Navigation className="w-12 h-12 animate-pulse mx-auto mb-4" style={{ color: colors.text.secondary }} />,
          title: "Getting Your Location",
          description: "Trying to access your precise location..."
        }
      case "ip_location":
        return {
          icon: <Globe className="w-12 h-12 animate-pulse mx-auto mb-4" style={{ color: colors.text.secondary }} />,
          title: "Finding Your Area",
          description: "Using your approximate location..."
        }
      default:
        return {
          icon: <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: colors.text.secondary }} />,
          title: "Loading Weather Data",
          description: "Loading weather data..."
        }
    }
  }

  const content = getLoadingContent()

  return (
    <div 
      className="min-h-screen font-['Montserrat'] flex items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <div className="text-center max-w-md mx-auto p-6" style={{ color: colors.text.primary }}>
        <div className="mb-6">
          {content.icon}
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
        <p style={{ color: colors.text.secondary }}>{content.description}</p>
      </div>
    </div>
  )
}
