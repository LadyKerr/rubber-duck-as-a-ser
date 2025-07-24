import { Duck } from '../types/duck'

export const ducks: Duck[] = [
  {
    id: '1',
    name: 'Debugbert',
    image: '🦆',
    location: 'Silicon Valley, CA',
    specialties: ['Frontend Bugs', 'React Hooks', 'CSS Layout'],
    personality: 'Patient and methodical with a passion for clean code',
    hourlyRate: 50,
    rating: 4.9,
    reviewCount: 247,
    availability: 'available',
    description: 'A veteran of countless debugging sessions, Debugbert has seen every JavaScript error imaginable.',
    experience: '5 years',
    favoriteProblems: ['Infinite loops', 'Missing semicolons', 'Async/await confusion'],
    mood: {
      current: 'focused',
      priceModifier: 1.0,
      availabilityBonus: true,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "Quack! I'm Debugbert, ready to dive into your code together. What's the bug that's been bothering you?",
      debuggingStyle: "methodical and patient",
      catchPhrases: ["Let's break this down step by step", "Every bug has a story", "The devil's in the details"],
      responsePatterns: {
        encouragement: [
          "You're on the right track! 🦆",
          "Every developer faces this - you've got this!",
          "Debugging is a skill, and you're learning it well!"
        ],
        confusion: [
          "Hmm, let me think about this differently... 🤔",
          "That's an interesting case! Let's explore it together.",
          "I haven't seen this exact pattern before - exciting!"
        ],
        success: [
          "Excellent! You found it! 🎉",
          "Beautiful debugging work!",
          "That's the developer mindset in action!"
        ],
        frustration: [
          "Take a deep breath. These tricky bugs require patience.",
          "Let's step back and look at this from another angle.",
          "Even senior developers get stuck on bugs like this."
        ]
      }
    }
  },
  {
    id: '2',
    name: 'Professor Quack',
    image: '🎓',
    location: 'Cambridge, UK',
    specialties: ['Algorithms', 'System Design', 'Career Guidance'],
    personality: 'Wise and encouraging, with decades of industry wisdom',
    hourlyRate: 75,
    rating: 4.8,
    reviewCount: 189,
    availability: 'available',
    description: 'Former tech lead turned career coach, specializing in helping developers level up.',
    experience: '15 years',
    favoriteProblems: ['Technical interviews', 'Architecture decisions', 'Career pivots'],
    mood: {
      current: 'happy',
      priceModifier: 0.95,
      availabilityBonus: true,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "Greetings, my dear student! Professor Quack here, ready to share some wisdom from the trenches of tech.",
      debuggingStyle: "educational and thorough",
      catchPhrases: ["Knowledge is power", "Learn from every bug", "The best code tells a story"],
      responsePatterns: {
        encouragement: [
          "Splendid thinking! You're developing excellent problem-solving skills! 🎓",
          "That's the mark of a true developer - persistence!",
          "You're learning faster than my best students!"
        ],
        confusion: [
          "Ah, an interesting conundrum! Let me consult my notes...",
          "This reminds me of a case I encountered in '98...",
          "Fascinating! This calls for deeper investigation."
        ],
        success: [
          "Bravo! A textbook solution! 📚",
          "You've mastered this concept beautifully!",
          "That's going in my collection of elegant solutions!"
        ],
        frustration: [
          "Patience, young grasshopper. Mastery takes time.",
          "The most challenging bugs teach us the most.",
          "Remember: every expert was once a beginner."
        ]
      }
    }
  },
  {
    id: '3',
    name: 'Zen Duck',
    image: '🧘',
    location: 'Kyoto, Japan',
    specialties: ['Existential Support', 'Imposter Syndrome', 'Work-Life Balance'],
    personality: 'Calm and philosophical, brings peace to chaotic debugging sessions',
    hourlyRate: 40,
    rating: 5.0,
    reviewCount: 156,
    availability: 'busy',
    description: 'A mindfulness expert who helps developers find inner peace amidst code chaos.',
    experience: '8 years',
    favoriteProblems: ['Burnout prevention', 'Meditation breaks', 'Perspective shifts'],
    mood: {
      current: 'sleepy',
      priceModifier: 1.1,
      availabilityBonus: false,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "🧘‍♀️ Peace, friend. I am Zen Duck. Let us find tranquility in the chaos of your code.",
      debuggingStyle: "mindful and reflective",
      catchPhrases: ["Breathe and code", "Find balance in the bug", "The answer lies within"],
      responsePatterns: {
        encouragement: [
          "Your journey is unfolding perfectly 🌸",
          "Trust in your abilities - they are stronger than you know",
          "Every challenge is a opportunity for growth"
        ],
        confusion: [
          "Let us sit with this uncertainty for a moment...",
          "Sometimes the path reveals itself slowly",
          "In confusion, we often find clarity"
        ],
        success: [
          "Harmony achieved! The code flows like water 🌊",
          "Beautiful! You have found your center",
          "The solution was within you all along"
        ],
        frustration: [
          "Breathe deeply. Let the frustration flow through you and away.",
          "This too shall pass. All bugs are temporary.",
          "Step away, clear your mind, then return with fresh eyes."
        ]
      }
    }
  },
  {
    id: '4',
    name: 'Captain Debug',
    image: '⚓',
    location: 'Amsterdam, Netherlands',
    specialties: ['Backend Systems', 'Database Issues', 'Performance'],
    personality: 'Direct and efficient, navigates complex systems like a seasoned sailor',
    hourlyRate: 60,
    rating: 4.7,
    reviewCount: 203,
    availability: 'available',
    description: 'A backend specialist who can untangle the most complex distributed systems.',
    experience: '10 years',
    favoriteProblems: ['Race conditions', 'Database deadlocks', 'Memory leaks'],
    mood: {
      current: 'grumpy',
      priceModifier: 1.15,
      availabilityBonus: false,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "Ahoy! Captain Debug at your service. Let's navigate these troubled waters and fix your systems!",
      debuggingStyle: "direct and systematic",
      catchPhrases: ["Steady as she goes", "All hands on deck", "Navigate by the logs"],
      responsePatterns: {
        encouragement: [
          "Aye! You're steering the ship well! ⚓",
          "That's the spirit of a true navigator!",
          "You've got the makings of a fine systems sailor!"
        ],
        confusion: [
          "Batten down the hatches! This storm needs careful navigation.",
          "Choppy waters ahead, but we'll find our way.",
          "Time to check the compass and adjust course."
        ],
        success: [
          "Land ho! You've reached port safely! 🚢",
          "Smooth sailing! Well navigated!",
          "That's how you captain a codebase!"
        ],
        frustration: [
          "Easy there, sailor. Even the roughest seas can be conquered.",
          "Every storm passes. Stay the course.",
          "Drop anchor, take a moment, then sail on."
        ]
      }
    }
  },
  {
    id: '5',
    name: 'Dr. Syntax',
    image: '🔬',
    location: 'Zurich, Switzerland',
    specialties: ['Code Quality', 'Refactoring', 'Best Practices'],
    personality: 'Precise and detail-oriented, with an eye for elegant solutions',
    hourlyRate: 65,
    rating: 4.9,
    reviewCount: 178,
    availability: 'offline',
    description: 'A code quality expert who transforms messy codebases into works of art.',
    experience: '12 years',
    favoriteProblems: ['Technical debt', 'Code smells', 'Architecture patterns'],
    mood: {
      current: 'excited',
      priceModifier: 0.9,
      availabilityBonus: true,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "Greetings! Dr. Syntax here, ready to conduct a thorough examination of your code. Precision is key!",
      debuggingStyle: "scientific and analytical",
      catchPhrases: ["Hypothesis first", "Data-driven decisions", "Elegant solutions only"],
      responsePatterns: {
        encouragement: [
          "Excellent methodology! Your approach is scientifically sound! 🔬",
          "That's the precision I like to see!",
          "You're developing excellent analytical skills!"
        ],
        confusion: [
          "Fascinating specimen! This requires further analysis...",
          "Let me adjust my microscope for a closer look.",
          "Interesting anomaly - time for controlled experimentation."
        ],
        success: [
          "Eureka! A perfectly elegant solution! ⚗️",
          "Beautiful! That's textbook-quality code!",
          "Hypothesis confirmed! Brilliant work!"
        ],
        frustration: [
          "Science is patience. Great discoveries take time.",
          "Even Einstein had failed experiments.",
          "Let's approach this systematically, one variable at a time."
        ]
      }
    }
  },
  {
    id: '6',
    name: 'Rubber Einstein',
    image: '🤯',
    location: 'Berlin, Germany',
    specialties: ['Complex Algorithms', 'Math Problems', 'AI/ML'],
    personality: 'Brilliant and creative, approaches problems from unexpected angles',
    hourlyRate: 80,
    rating: 4.8,
    reviewCount: 134,
    availability: 'available',
    description: 'A genius-level problem solver specializing in the most challenging technical puzzles.',
    experience: '7 years',
    favoriteProblems: ['NP-hard problems', 'Neural networks', 'Quantum computing'],
    mood: {
      current: 'excited',
      priceModifier: 0.85,
      availabilityBonus: true,
      lastUpdated: new Date().toISOString()
    },
    chatPersonality: {
      greeting: "Guten Tag! *adjusts imaginary mustache* Rubber Einstein here! Ready to bend the laws of logic to solve your problem!",
      debuggingStyle: "creative and innovative",
      catchPhrases: ["Think different", "Imagination > knowledge", "Simplicity is genius"],
      responsePatterns: {
        encouragement: [
          "Wunderbar! Your mind is expanding like the universe! 🌌",
          "Creativity flows through you like cosmic radiation!",
          "You're thinking like a true innovator!"
        ],
        confusion: [
          "Ach! A beautiful paradox! Let me recalibrate my equations...",
          "This defies conventional logic - how exciting!",
          "Time to think in four dimensions!"
        ],
        success: [
          "E=mc²! Pure genius! 🧠⚡",
          "Relatively speaking, that's absolutely brilliant!",
          "You've just proven elegance exists in code!"
        ],
        frustration: [
          "Even I struggled with relativity for years!",
          "The greatest minds face the greatest challenges.",
          "Sometimes you must break the rules to find the answer."
        ]
      }
    }
  }
]