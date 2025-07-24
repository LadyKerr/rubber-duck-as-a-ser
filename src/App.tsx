import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Duck, Session, SessionType } from './types/duck'
import { ducks } from './data/ducks'
import { DuckCard } from './components/duck/DuckCard'
import { DuckProfile } from './components/duck/DuckProfile'
import { BookingModal } from './components/booking/BookingModal'
import { SessionDashboard } from './components/sessions/SessionDashboard'
import { DuckFilters } from './components/filters/DuckFilters'
import { Button } from './components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { toast } from 'sonner'
import { Toaster } from './components/ui/sonner'
import { useDuckMoodSystem } from './hooks/useDuckMoodSystem'

function App() {
  const [sessions, setSessions] = useKV<Session[]>('user-sessions', [
    // Demo active session to showcase chat interface
    {
      id: 'demo-session-1',
      duckId: '1',
      duckName: 'Debugbert',
      type: 'debugging',
      date: new Date().toISOString(),
      duration: 1,
      status: 'active',
      notes: 'Demo session to test chat interface',
      cost: 50,
      chatHistory: []
    }
  ])
  const [selectedDuck, setSelectedDuck] = useState<Duck | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingSessionType, setBookingSessionType] = useState<SessionType | null>(null)
  const [activeTab, setActiveTab] = useState('marketplace')

  // Initialize mood system
  useDuckMoodSystem()

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null)
  const [availabilityFilter, setAvailabilityFilter] = useState<Duck['availability'] | null>(null)
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number] | null>(null)

  const handleDuckSelect = (duck: Duck) => {
    setSelectedDuck(duck)
    setShowProfile(true)
  }

  const handleBookSession = (duck: Duck, sessionType: SessionType) => {
    if (duck.availability !== 'available') {
      toast.error(`${duck.name} is currently ${duck.availability}. Please try again later.`)
      return
    }
    
    setSelectedDuck(duck)
    setBookingSessionType(sessionType)
    setShowProfile(false)
    setShowBooking(true)
  }

  const handleBookingConfirm = (bookingData: any) => {
    const newSession: Session = {
      id: Date.now().toString(),
      duckId: bookingData.duckId,
      duckName: bookingData.duckName,
      type: bookingData.sessionType,
      date: `${bookingData.date}T${bookingData.time}:00`,
      duration: bookingData.duration,
      status: 'upcoming',
      notes: bookingData.description,
      cost: bookingData.cost
    }

    setSessions((currentSessions) => [...currentSessions, newSession])
    setShowBooking(false)
    setBookingSessionType(null)
    setSelectedDuck(null)
    setActiveTab('sessions')
    
    toast.success(`🦆 Session booked with ${bookingData.duckName}! Check your sessions dashboard.`)
  }

  const handleJoinSession = (session: Session) => {
    toast.success(`🎉 Joining session with ${session.duckName}! Get ready to debug!`)
  }

  // Filter ducks based on current filters
  const filteredDucks = ducks.filter(duck => {
    const matchesSearch = !searchQuery || 
      duck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      duck.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      duck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      duck.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSpecialty = !specialtyFilter || duck.specialties.includes(specialtyFilter)
    const matchesAvailability = !availabilityFilter || duck.availability === availabilityFilter
    const matchesPrice = !priceRangeFilter || 
      (Math.round(duck.hourlyRate * duck.mood.priceModifier) >= priceRangeFilter[0] && 
       (priceRangeFilter[1] === 999 || Math.round(duck.hourlyRate * duck.mood.priceModifier) <= priceRangeFilter[1]))

    return matchesSearch && matchesSpecialty && matchesAvailability && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🦆</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">RDaaS</h1>
                <p className="text-sm md:text-base text-muted-foreground">Rubber Duck as a Service</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-muted-foreground">Debug with confidence</p>
              <p className="text-xs text-muted-foreground">Premium debugging companions worldwide</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto md:mx-0">
            <TabsTrigger value="marketplace" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Duck Marketplace</span>
              <span className="sm:hidden">Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">My Sessions ({sessions.length})</span>
              <span className="sm:hidden">Sessions ({sessions.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-4 md:space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">Find Your Perfect Debugging Companion</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Browse our global network of specialized rubber ducks, each with unique personalities 
                and expertise to help you solve any coding challenge.
              </p>
            </div>

            <DuckFilters
              onSearch={setSearchQuery}
              onFilterSpecialty={setSpecialtyFilter}
              onFilterAvailability={setAvailabilityFilter}
              onFilterPriceRange={setPriceRangeFilter}
              activeFilters={{
                specialty: specialtyFilter,
                availability: availabilityFilter,
                priceRange: priceRangeFilter
              }}
            />

            <div className="grid gap-4 md:gap-6 lg:grid-cols-1 xl:grid-cols-2">
              {filteredDucks.map((duck) => (
                <DuckCard
                  key={duck.id}
                  duck={duck}
                  onSelect={handleDuckSelect}
                />
              ))}
            </div>

            {filteredDucks.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold mb-2">No ducks match your criteria</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessions">
            <SessionDashboard 
              sessions={sessions}
              onJoinSession={handleJoinSession}
              onUpdateSession={(updatedSession) => {
                setSessions((currentSessions) => 
                  currentSessions.map(s => s.id === updatedSession.id ? updatedSession : s)
                )
              }}
            />
          </TabsContent>
        </Tabs>
      </main>

      <DuckProfile
        duck={selectedDuck}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onBookSession={handleBookSession}
      />

      <BookingModal
        duck={selectedDuck}
        sessionType={bookingSessionType}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onConfirm={handleBookingConfirm}
      />

      <Toaster />
    </div>
  )
}

export default App