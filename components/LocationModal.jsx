import { useState } from 'react'
import { Navigation, Search, Loader2, MapPin, AlertTriangle, Lightbulb } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export const LocationModal = ({ 
  isOpen, 
  onOpenChange, 
  onLocationChange, 
  onUseMyLocation, 
  geolocationSupport, 
  error, 
  isLoading 
}) => {
  const [newLocation, setNewLocation] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleLocationSubmit = () => {
    if (newLocation.trim()) {
      onLocationChange(newLocation)
      setNewLocation("")
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLocationSubmit()
    }
  }

  const handleInputChange = (e) => {
    setNewLocation(e.target.value)
    // Show suggestions if there was an error and user is typing
    if (error && e.target.value.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const popularCities = [
    "New York", "London", "Tokyo", "Paris", "Sydney", 
    "Los Angeles", "Chicago", "Toronto", "Berlin", "Mumbai"
  ]

  const handleSuggestionClick = (city) => {
    setNewLocation(city)
    setShowSuggestions(false)
    onLocationChange(city)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          className="w-full text-white border-0 transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, #90D9E0 0%, #5460E6 100%)'
          }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Change Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">City Not Found</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {geolocationSupport?.canUseLocation && (
            <>
              <Button 
                onClick={onUseMyLocation}
                className="w-full mb-3"
                variant="outline"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use My Current Location
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or search city</span>
                </div>
              </div>
            </>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name (e.g., New York, London)..."
              value={newLocation}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleLocationSubmit}
              disabled={isLoading || !newLocation.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* City suggestions */}
          {(showSuggestions || error) && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Try these popular cities:</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {popularCities.slice(0, 6).map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSuggestionClick(city)}
                    className="text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>💡 <strong>Tips for better results:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>Use major city names (e.g., "New York" instead of "NYC")</li>
              <li>Include country for smaller cities (e.g., "Cambridge, UK")</li>
              <li>Check spelling carefully</li>
              <li>Try the nearest major city if your location isn't found</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
