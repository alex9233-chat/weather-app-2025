import { AlertCircle, Navigation, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"

export const ErrorBanner = ({ error, locationStatus, geolocationSupport, onRetry }) => {
  if (!error) return null

  // Determine the type of error and appropriate styling
  const isLocationError = locationStatus === "denied"
  const isCityNotFoundError = error.includes("not found") || error.includes("check the spelling")
  const isAPIError = error.includes("API key") || error.includes("service error")

  const getBannerStyle = () => {
    if (isAPIError) {
      return "bg-red-500/20 text-red-200 border-red-500/30"
    } else if (isCityNotFoundError) {
      return "bg-orange-500/20 text-orange-200 border-orange-500/30"
    } else {
      return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30"
    }
  }

  const getIcon = () => {
    if (isAPIError) {
      return <AlertCircle className="w-4 h-4" />
    } else if (isCityNotFoundError) {
      return <Info className="w-4 h-4" />
    } else {
      return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className={`${getBannerStyle()} p-3 text-center text-sm border-b`}>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {getIcon()}
        <span>{error}</span>
        {isLocationError && geolocationSupport?.canUseLocation && (
          <Button
            onClick={onRetry}
            size="sm"
            variant="outline"
            className="ml-2 text-xs bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30"
          >
            <Navigation className="w-3 h-3 mr-1" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
