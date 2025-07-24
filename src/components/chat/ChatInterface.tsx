import { useState, useRef, useEffect } from 'react'
import { Duck, ChatMessage, Session } from '../../types/duck'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { Send, MessageCircle } from '@phosphor-icons/react'
import { ducks } from '../../data/ducks'

interface ChatInterfaceProps {
  session: Session
  onUpdateSession: (session: Session) => void
}

export function ChatInterface({ session, onUpdateSession }: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const duck = ducks.find(d => d.id === session.duckId)
  const chatHistory = session.chatHistory || []

  useEffect(() => {
    // Initialize chat with greeting if no messages exist
    if (chatHistory.length === 0 && duck) {
      const greetingMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'duck',
        content: duck.chatPersonality.greeting,
        timestamp: new Date().toISOString(),
        type: 'greeting'
      }
      
      const updatedSession = {
        ...session,
        chatHistory: [greetingMessage]
      }
      onUpdateSession(updatedSession)
    }
  }, [duck, chatHistory.length, session, onUpdateSession])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatHistory])

  const generateDuckResponse = (userMessage: string): string => {
    if (!duck) return "Quack! I seem to have lost my voice..."

    const lowerMessage = userMessage.toLowerCase()
    const personality = duck.chatPersonality

    // Determine response type based on user message content
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('error')) {
      return personality.responsePatterns.encouragement[
        Math.floor(Math.random() * personality.responsePatterns.encouragement.length)
      ]
    }
    
    if (lowerMessage.includes('confused') || lowerMessage.includes("don't understand") || lowerMessage.includes('what')) {
      return personality.responsePatterns.confusion[
        Math.floor(Math.random() * personality.responsePatterns.confusion.length)
      ]
    }
    
    if (lowerMessage.includes('works') || lowerMessage.includes('fixed') || lowerMessage.includes('solved')) {
      return personality.responsePatterns.success[
        Math.floor(Math.random() * personality.responsePatterns.success.length)
      ]
    }
    
    if (lowerMessage.includes('frustrated') || lowerMessage.includes('angry') || lowerMessage.includes('hate')) {
      return personality.responsePatterns.frustration[
        Math.floor(Math.random() * personality.responsePatterns.frustration.length)
      ]
    }

    // Default responses with catchphrases
    const responses = [
      `${personality.catchPhrases[Math.floor(Math.random() * personality.catchPhrases.length)]}! Let's approach this with my ${personality.debuggingStyle} style.`,
      `Interesting! As someone who's ${personality.debuggingStyle}, I think we should explore this further.`,
      `That's a great question! My ${personality.debuggingStyle} approach suggests we break this down.`,
      personality.catchPhrases[Math.floor(Math.random() * personality.catchPhrases.length)]
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = async () => {
    if (!message.trim() || isTyping) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    }

    // Add user message immediately
    const updatedHistory = [...chatHistory, userMessage]
    onUpdateSession({
      ...session,
      chatHistory: updatedHistory
    })

    setMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const duckResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'duck',
        content: generateDuckResponse(message),
        timestamp: new Date().toISOString(),
        type: 'debugging'
      }

      onUpdateSession({
        ...session,
        chatHistory: [...updatedHistory, duckResponse]
      })
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!duck) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle />
            Chat Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Duck not found for this session.</p>
        </CardContent>
      </Card>
    )
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle />
            <span>Chat with {duck.name}</span>
            <span className="text-2xl">{duck.image}</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>{getMoodEmoji(duck.mood.current)}</span>
            <span className="capitalize">{duck.mood.current}</span>
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {duck.personality} • {duck.chatPersonality.debuggingStyle}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-xs text-muted-foreground ml-2">{duck.name} is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${duck.name}...`}
            disabled={isTyping}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!message.trim() || isTyping}
            size="icon"
          >
            <Send size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}