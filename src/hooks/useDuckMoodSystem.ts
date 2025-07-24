import { useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { ducks } from '../data/ducks'
import { Duck } from '../types/duck'

// Hook to manage duck moods and pricing
export function useDuckMoodSystem() {
  const [lastMoodUpdate, setLastMoodUpdate] = useKV<string>('last-mood-update', '')
  
  useEffect(() => {
    const updateMoods = () => {
      const now = new Date().toISOString()
      const lastUpdate = lastMoodUpdate ? new Date(lastMoodUpdate) : new Date(0)
      const timeDiff = Date.now() - lastUpdate.getTime()
      
      // Update moods every 30 minutes
      if (timeDiff > 30 * 60 * 1000) {
        ducks.forEach(duck => {
          // Random mood changes
          const moods: Array<Duck['mood']['current']> = ['happy', 'focused', 'grumpy', 'excited', 'sleepy']
          const newMood = moods[Math.floor(Math.random() * moods.length)]
          
          // Price modifiers based on mood
          const priceModifiers = {
            happy: 0.9,
            focused: 1.0,
            grumpy: 1.2,
            excited: 0.85,
            sleepy: 1.1
          }
          
          // Availability bonuses
          const availabilityBonuses = {
            happy: true,
            focused: true,
            grumpy: false,
            excited: true,
            sleepy: false
          }
          
          duck.mood = {
            current: newMood,
            priceModifier: priceModifiers[newMood],
            availabilityBonus: availabilityBonuses[newMood],
            lastUpdated: now
          }
        })
        
        setLastMoodUpdate(now)
      }
    }

    // Update moods on mount
    updateMoods()
    
    // Set up interval to check for mood updates
    const interval = setInterval(updateMoods, 5 * 60 * 1000) // Check every 5 minutes
    
    return () => clearInterval(interval)
  }, [lastMoodUpdate, setLastMoodUpdate])

  const getMoodDescription = (mood: Duck['mood']['current']) => {
    switch (mood) {
      case 'happy':
        return "In a great mood! Offering discounted rates and extra enthusiasm."
      case 'focused':
        return "Laser-focused and ready for serious debugging work."
      case 'grumpy':
        return "A bit grumpy today. Rates are higher but still delivers quality work."
      case 'excited':
        return "Super excited and energetic! Great discounts available."
      case 'sleepy':
        return "Feeling a bit sleepy. May take longer to respond but still reliable."
      default:
        return "In a normal mood."
    }
  }

  return { getMoodDescription }
}