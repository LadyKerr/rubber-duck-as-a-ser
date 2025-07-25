import { useState } from 'react'
import { Session } from '../../types/duck'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Calendar, Clock, DollarSign, User, MessageCircle } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { ChatInterface } from '../chat/ChatInterface'

interface SessionDashboardProps {
  sessions: Session[]
  onJoinSession: (session: Session) => void
  onUpdateSession?: (session: Session) => void
}

export function SessionDashboard({ sessions, onJoinSession, onUpdateSession }: SessionDashboardProps) {
  const [chatSession, setChatSession] = useState<Session | null>(null)
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming')
  const activeSessions = sessions.filter(s => s.status === 'active')
  const completedSessions = sessions.filter(s => s.status === 'completed')

  const getSessionTypeColor = (type: Session['type']) => {
    switch (type) {
      case 'debugging': return 'bg-blue-500'
      case 'career': return 'bg-green-500'
      case 'existential': return 'bg-purple-500'
    }
  }

  const handleJoinSession = (session: Session) => {
    // Start the session and open chat
    const updatedSession = { ...session, status: 'active' as const }
    onUpdateSession?.(updatedSession)
    setChatSession(updatedSession)
    onJoinSession(updatedSession)
  }

  const handleChatSession = (session: Session) => {
    setChatSession(session)
  }

  const handleUpdateChatSession = (updatedSession: Session) => {
    onUpdateSession?.(updatedSession)
    setChatSession(updatedSession)
  }

  const handleEndSession = (session: Session) => {
    const completedSession = { ...session, status: 'completed' as const }
    onUpdateSession?.(completedSession)
    setChatSession(null)
  }

  const getSessionTypeLabel = (type: Session['type']) => {
    switch (type) {
      case 'debugging': return 'Debug'
      case 'career': return 'Career'
      case 'existential': return 'Support'
    }
  }

  const renderSession = (session: Session) => (
    <Card key={session.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User size={20} />
            {session.duckName}
          </CardTitle>
          <Badge 
            className={`${getSessionTypeColor(session.type)} text-white self-start sm:self-auto`}
          >
            {getSessionTypeLabel(session.type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{format(new Date(session.date), 'PPP')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{session.duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>${session.cost}</span>
            </div>
          </div>

          {session.notes && (
            <div className="text-sm">
              <span className="font-medium">Notes: </span>
              <span className="text-muted-foreground">{session.notes}</span>
            </div>
          )}

          <div className="flex justify-end gap-2">
            {session.status === 'upcoming' && (
              <Button size="sm" onClick={() => handleJoinSession(session)} className="text-xs sm:text-sm">
                Join Session
              </Button>
            )}
            {session.status === 'active' && (
              <>
                <Button size="sm" variant="outline" onClick={() => handleChatSession(session)} className="text-xs sm:text-sm">
                  <MessageCircle size={14} className="mr-1" />
                  Chat
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleEndSession(session)} className="text-xs sm:text-sm">
                  End Session
                </Button>
              </>
            )}
            {session.status === 'completed' && (
              <>
                <Button size="sm" variant="outline" onClick={() => handleChatSession(session)} className="text-xs sm:text-sm">
                  <MessageCircle size={14} className="mr-1" />
                  Review Chat
                </Button>
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                  View Details
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-bold">My Debugging Sessions</h2>
        <div className="text-sm text-muted-foreground">
          {sessions.length} total sessions
        </div>
      </div>

      {activeSessions.length > 0 && (
        <Card className="bg-accent/10 border-accent">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-accent-foreground">Ready to Debug!</h3>
              <span className="text-muted-foreground">
                Click "Chat" on your active sessions to start debugging with your duck.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Upcoming ({upcomingSessions.length})</span>
            <span className="sm:hidden">Up ({upcomingSessions.length})</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Active ({activeSessions.length})</span>
            <span className="sm:hidden">Act ({activeSessions.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Completed ({completedSessions.length})</span>
            <span className="sm:hidden">Done ({completedSessions.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No upcoming sessions.</p>
              </CardContent>
            </Card>
          ) : (
            upcomingSessions.map(renderSession)
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeSessions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No active sessions.</p>
              </CardContent>
            </Card>
          ) : (
            activeSessions.map(renderSession)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedSessions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No completed sessions yet.</p>
              </CardContent>
            </Card>
          ) : (
            completedSessions.map(renderSession)
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!chatSession} onOpenChange={() => setChatSession(null)}>
        <DialogContent className="max-w-4xl h-[90vh] sm:h-[80vh] w-[95vw] sm:w-auto flex flex-col p-0">
          <DialogHeader className="p-4 pb-2 border-b">
            <DialogTitle className="text-base sm:text-lg">
              Chat with {chatSession?.duckName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 p-4">
            {chatSession && (
              <ChatInterface
                session={chatSession}
                onUpdateSession={handleUpdateChatSession}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}