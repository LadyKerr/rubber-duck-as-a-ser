import { Duck } from '../../types/duck'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Star, MapPin } from '@phosphor-icons/react'

interface DuckCardProps {
  duck: Duck
  onSelect: (duck: Duck) => void
}

export function DuckCard({ duck, onSelect }: DuckCardProps) {
  const getAvailabilityColor = (availability: Duck['availability']) => {
    switch (availability) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'focused': return '🎯'
      case 'grumpy': return '😤'
      case 'excited': return '🤩'
      case 'sleepy': return '😴'
      default: return '🦆'
    }
  }

  const getAvailabilityText = (availability: Duck['availability']) => {
    switch (availability) {
      case 'available': return 'Available'
      case 'busy': return 'In Session'
      case 'offline': return 'Offline'
    }
  }

  return (
    <Card className="duck-float hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => onSelect(duck)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="text-4xl md:text-6xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            {duck.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-base md:text-lg truncate">{duck.name}</h3>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getAvailabilityColor(duck.availability)}`} />
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <span>{getMoodEmoji(duck.mood.current)}</span>
                <span className="capitalize">{duck.mood.current}</span>
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span className="truncate">{duck.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} weight="fill" className="text-yellow-500" />
                <span>{duck.rating}</span>
                <span>({duck.reviewCount})</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {duck.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {duck.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {duck.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{duck.specialties.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold text-primary">${getActualPrice()}</span>
                <span className="text-sm text-muted-foreground">/hour</span>
                {duck.mood.priceModifier !== 1.0 && (
                  <Badge variant={duck.mood.priceModifier < 1.0 ? "default" : "destructive"} className="text-xs">
                    {duck.mood.priceModifier < 1.0 ? "Discount!" : "Premium"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <Badge variant={duck.availability === 'available' ? 'default' : 'secondary'} className="text-xs">
                  {getAvailabilityText(duck.availability)}
                </Badge>
                <Button 
                  size="sm" 
                  disabled={duck.availability !== 'available'}
                  className="text-xs md:text-sm"
                >
                  <span className="hidden sm:inline">Book Session</span>
                  <span className="sm:hidden">Book</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}