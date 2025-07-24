export interface Duck {
  id: string
  name: string
  image: string
  location: string
  specialties: string[]
  personality: string
  hourlyRate: number
  rating: number
  reviewCount: number
  availability: 'available' | 'busy' | 'offline'
  description: string
  experience: string
  favoriteProblems: string[]
  mood: DuckMood
  chatPersonality: ChatPersonality
}

export interface DuckMood {
  current: 'happy' | 'focused' | 'grumpy' | 'excited' | 'sleepy'
  priceModifier: number // 0.8 to 1.3 multiplier
  availabilityBonus: boolean // affects availability chances
  lastUpdated: string
}

export interface ChatPersonality {
  greeting: string
  debuggingStyle: string
  catchPhrases: string[]
  responsePatterns: {
    encouragement: string[]
    confusion: string[]
    success: string[]
    frustration: string[]
  }
}

export interface Session {
  id: string
  duckId: string
  duckName: string
  type: 'debugging' | 'career' | 'existential'
  date: string
  duration: number
  status: 'upcoming' | 'active' | 'completed'
  notes?: string
  cost: number
  chatHistory?: ChatMessage[]
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'duck'
  content: string
  timestamp: string
  type?: 'greeting' | 'debugging' | 'encouragement' | 'success'
}

export type SessionType = 'debugging' | 'career' | 'existential'