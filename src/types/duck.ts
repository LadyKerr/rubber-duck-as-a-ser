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
}

export type SessionType = 'debugging' | 'career' | 'existential'