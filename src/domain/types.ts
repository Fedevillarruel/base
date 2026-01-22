export type Sport = 'running' | 'cycling' | 'swim' | 'strength' | 'triathlon' | 'yoga' | 'gym'

export type Effort = 'easy' | 'moderate' | 'hard' | 'max'

export type User = {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'elite'
  city?: string
  totalKm?: number
  totalActivities?: number
  followers?: number
  following?: number
  isPro?: boolean
}

export type Activity = {
  id: string
  sport: Sport
  title: string
  note?: string
  createdAt: string
  startAt: string
  durationMin?: number
  distanceKm?: number
  avgPaceMinPerKm?: number
  elevationM?: number
  effort?: Effort
  photo?: { kind: 'gradient'; a: string; b: string } | { kind: 'url'; url: string }
  author: User
  likes?: number
  comments?: number
  isLiked?: boolean
}

export type Community = {
  id: string
  name: string
  sport: Sport
  description: string
  members: number
  cover: string
  isJoined?: boolean
}

export type Message = {
  id: string
  from: User
  to: User
  text: string
  timestamp: string
  read?: boolean
}

export type TrainingPlan = {
  id: string
  date: string // YYYY-MM-DD
  workouts: Workout[]
}

export type Workout = {
  id: string
  time: string // HH:mm
  sport: Sport
  title: string
  description: string
  durationMin: number
  intensity: Effort
  completed?: boolean
}

export type Recipe = {
  id: string
  title: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'recovery'
  image: string
  prepTime: number
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
  steps: string[]
  author: string
}

export type OnboardingData = {
  goal: 'health' | 'performance' | 'weight' | 'social'
  level: 'beginner' | 'intermediate' | 'advanced' | 'elite'
  sports: Sport[]
  city: string
  age?: number
  weight?: number
  weeklyHours?: number
}

export type Goal = {
  id: string
  type: 'distance' | 'time' | 'weight' | 'event'
  target: number
  current: number
  unit: string
  deadline?: string
}
