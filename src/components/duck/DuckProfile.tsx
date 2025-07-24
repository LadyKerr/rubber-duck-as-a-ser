import { Duck, SessionType } from '../../types/duck'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Star, MapPin, Clock, User, Heart, Brain } from '@phosphor-icons/react'

interface DuckProfileProps {
  duck: Duck | null
  isOpen: boolean
  onClose: () => void
  onBookSession: (duck: Duck, sessionType: SessionType) => void
}

export function DuckProfile({ duck, isOpen, onClose, onBookSession }: DuckProfileProps) {
  if (!duck) return null

  const getSessionTypeIcon = (type: SessionType) => {
    switch (type) {
      case 'debugging': return <Brain size={20} />
      case 'career': return <User size={20} />
      case 'existential': return <Heart size={20} />
    }
  }

  const getSessionTypeDescription = (type: SessionType) => {
    switch (type) {
      case 'debugging': return 'Technical problem solving and code review sessions'
      case 'career': return 'Career guidance, interview prep, and professional development'
      case 'existential': return 'Dealing with imposter syndrome, burnout, and work-life balance'
    }
  }

  const getSessionTypePrice = (type: SessionType) => {
    const multiplier = type === 'career' ? 1.2 : type === 'existential' ? 0.8 : 1
    return Math.round(duck.hourlyRate * multiplier)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-4xl">{duck.image}</span>
            <div>
              <h2 className="text-2xl font-bold">{duck.name}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{duck.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} weight="fill" className="text-yellow-500" />
                  <span>{duck.rating} ({duck.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{duck.experience} experience</span>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="book">Book Session</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">About {duck.name}</h3>
              <p className="text-muted-foreground">{duck.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Personality</h3>
              <p className="text-muted-foreground">{duck.personality}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Favorite Problems to Solve</h3>
              <div className="flex flex-wrap gap-2">
                {duck.favoriteProblems.map((problem) => (
                  <Badge key={problem} variant="outline">
                    {problem}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specialties" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Areas of Expertise</h3>
              <div className="grid gap-3">
                {duck.specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-3 p-3 rounded-lg border">
                    <Badge variant="secondary">{specialty}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="book" className="space-y-4">
            <div className="grid gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => onBookSession(duck, 'debugging')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getSessionTypeIcon('debugging')}
                    Debugging Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    {getSessionTypeDescription('debugging')}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${getSessionTypePrice('debugging')}/hour
                    </span>
                    <Button>Book Now</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onBookSession(duck, 'career')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getSessionTypeIcon('career')}
                    Career Counseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    {getSessionTypeDescription('career')}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${getSessionTypePrice('career')}/hour
                    </span>
                    <Button>Book Now</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onBookSession(duck, 'existential')}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getSessionTypeIcon('existential')}
                    Existential Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    {getSessionTypeDescription('existential')}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${getSessionTypePrice('existential')}/hour
                    </span>
                    <Button>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}