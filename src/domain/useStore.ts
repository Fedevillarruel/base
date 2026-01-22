import { create } from 'zustand'
import type { User, Activity, Community, Message, TrainingPlan, Recipe, OnboardingData, Goal } from './types'
import { MOCK_ACTIVITIES, MOCK_COMMUNITIES, MOCK_RECIPES, MOCK_GOALS, MOCK_TRAINING_PLANS } from './mockData'

type AppState = {
  // Auth
  currentUser: User | null
  isAuthenticated: boolean
  hasCompletedOnboarding: boolean
  
  // Navigation
  currentTab: 'feed' | 'communities' | 'calendar' | 'nutrition' | 'profile'
  
  // Feed
  activities: Activity[]
  
  // Communities
  communities: Community[]
  
  // Messages
  conversations: Message[]
  unreadCount: number
  
  // Calendar
  trainingPlans: TrainingPlan[]
  calendarView: 'day' | 'week' | 'month'
  selectedDate: Date
  
  // Nutrition
  recipes: Recipe[]
  
  // Profile
  goals: Goal[]
  profile: User
  
  // Onboarding
  onboardingData: OnboardingData | null
  
  // Actions
  login: (user: User) => void
  logout: () => void
  setCurrentTab: (tab: AppState['currentTab']) => void
  addActivity: (activity: Activity) => void
  toggleLike: (activityId: string) => void
  addComment: (activityId: string) => void
  shareActivity: (activityId: string) => void
  joinCommunity: (communityId: string) => void
  leaveCommunity: (communityId: string) => void
  addMessage: (message: Message) => void
  markMessageRead: (messageId: string) => void
  setCalendarView: (view: AppState['calendarView']) => void
  setSelectedDate: (date: Date) => void
  completeWorkout: (planId: string, workoutId: string) => void
  completeOnboarding: (data: OnboardingData) => void
  updateGoal: (goalId: string, current: number) => void
}

// Usuario por defecto
const DEFAULT_USER: User = {
  id: 'demo-1',
  name: 'Usuario Demo',
  username: '@demo_user',
  city: 'Buenos Aires, Argentina',
  avatar: '👤',
}

export const useStore = create<AppState>((set) => ({
  // Initial state con datos mock
  currentUser: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  currentTab: 'feed',
  activities: MOCK_ACTIVITIES,
  communities: MOCK_COMMUNITIES,
  conversations: [],
  unreadCount: 0,
  trainingPlans: MOCK_TRAINING_PLANS,
  calendarView: 'week',
  selectedDate: new Date(),
  recipes: MOCK_RECIPES,
  goals: MOCK_GOALS,
  profile: DEFAULT_USER,
  onboardingData: null,
  
  // Actions
  login: (user) => {
    set({ currentUser: user, isAuthenticated: true })
    // Guardar en localStorage
    const existingSession = localStorage.getItem('base-session')
    let onboardingCompleted = false
    let onboardingData = null
    
    if (existingSession) {
      try {
        const parsed = JSON.parse(existingSession)
        onboardingCompleted = parsed.onboardingCompleted || false
        onboardingData = parsed.onboardingData || null
        
        // Si ya había completado el onboarding, restaurarlo
        if (onboardingCompleted && onboardingData) {
          set({ 
            hasCompletedOnboarding: true,
            onboardingData: onboardingData,
            profile: {
              ...DEFAULT_USER,
              city: onboardingData.city,
            }
          })
        }
      } catch (e) {
        console.error('Error parsing session:', e)
      }
    }
    
    const session = {
      user,
      onboardingCompleted,
      onboardingData,
    }
    localStorage.setItem('base-session', JSON.stringify(session))
  },
  
  logout: () => {
    set({ 
      currentUser: null, 
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      onboardingData: null 
    })
    localStorage.removeItem('base-session')
  },
  
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  addActivity: (activity) => set((state) => ({ 
    activities: [activity, ...state.activities] 
  })),
  
  toggleLike: (activityId) => set((state) => ({
    activities: state.activities.map((a) =>
      a.id === activityId
        ? { 
            ...a, 
            isLiked: !a.isLiked,
            likes: (a.likes || 0) + (a.isLiked ? -1 : 1)
          }
        : a
    ),
  })),

  addComment: (activityId) => set((state) => ({
    activities: state.activities.map((a) =>
      a.id === activityId
        ? { ...a, comments: (a.comments || 0) + 1 }
        : a
    ),
  })),

  shareActivity: (activityId) => {
    // Mock de compartir - en producción abriría share dialog
    console.log('Compartiendo actividad:', activityId)
    alert('¡Actividad compartida! (Demo)')
  },
  
  joinCommunity: (communityId) => set((state) => ({
    communities: state.communities.map((c) =>
      c.id === communityId
        ? { ...c, isJoined: true, members: c.members + 1 }
        : c
    ),
  })),
  
  leaveCommunity: (communityId) => set((state) => ({
    communities: state.communities.map((c) =>
      c.id === communityId
        ? { ...c, isJoined: false, members: c.members - 1 }
        : c
    ),
  })),
  
  addMessage: (message) => set((state) => ({
    conversations: [...state.conversations, message],
    unreadCount: state.unreadCount + 1,
  })),
  
  markMessageRead: (messageId) => set((state) => ({
    conversations: state.conversations.map((m) =>
      m.id === messageId ? { ...m, read: true } : m
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  
  setCalendarView: (view) => set({ calendarView: view }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  completeWorkout: (planId, workoutId) => set((state) => ({
    trainingPlans: state.trainingPlans.map((p) =>
      p.id === planId
        ? {
            ...p,
            workouts: p.workouts.map((w) =>
              w.id === workoutId ? { ...w, completed: true } : w
            ),
          }
        : p
    ),
  })),
  
  completeOnboarding: (data) => {
    set({ 
      onboardingData: data,
      hasCompletedOnboarding: true,
      profile: {
        ...DEFAULT_USER,
        city: data.city,
      }
    })
    
    // Actualizar localStorage manteniendo la sesión existente
    const savedSession = localStorage.getItem('base-session')
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        session.onboardingCompleted = true
        session.onboardingData = data
        localStorage.setItem('base-session', JSON.stringify(session))
        console.log('Onboarding completado y guardado:', session)
      } catch (e) {
        console.error('Error updating session:', e)
      }
    }
  },
  
  updateGoal: (goalId, current) => set((state) => ({
    goals: state.goals.map((g) =>
      g.id === goalId ? { ...g, current } : g
    ),
  })),
}))
