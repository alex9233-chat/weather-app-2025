import { Navigation } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { LocationModal } from './LocationModal'

export const LocationButtons = ({ 
  locationStatus, 
  geolocationSupport, 
  onUseMyLocation, 
  onLocationChange, 
  isLocationModalOpen, 
  setIsLocationModalOpen, 
  error, 
  isLoading 
}) => {
  return (
    <div className="space-y-3">
      {(locationStatus !== "granted" && locationStatus !== "ip_location") && geolocationSupport?.canUseLocation && (
        <Button 
          onClick={onUseMyLocation}
          className="w-full text-white border-0 transition-all duration-300 mb-2"
          style={{
            background: 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)'
          }}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Use My Current Location
        </Button>
      )}
      
      <LocationModal
        isOpen={isLocationModalOpen}
        onOpenChange={setIsLocationModalOpen}
        onLocationChange={onLocationChange}
        onUseMyLocation={onUseMyLocation}
        geolocationSupport={geolocationSupport}
        error={error}
        isLoading={isLoading}
      />
    </div>
  )
}
