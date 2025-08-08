import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react'

export const WeatherIcon = ({ condition, className = "w-16 h-16" }) => {
  const iconMap = {
    sunny: <Sun className={`${className} text-yellow-400`} />,
    cloudy: <Cloud className={`${className} text-gray-400`} />,
    rainy: <CloudRain className={`${className} text-blue-400`} />,
    snowy: <CloudSnow className={`${className} text-blue-200`} />,
    default: <Sun className={`${className} text-yellow-400`} />
  }
  
  return iconMap[condition.toLowerCase()] || iconMap.default
}
