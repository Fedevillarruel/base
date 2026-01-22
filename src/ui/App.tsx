import { useEffect } from 'react'
import { useStore } from '../domain/useStore'
import { AuthScreen } from './screens/auth/AuthScreen'
import { OnboardingScreen } from './screens/onboarding/OnboardingScreen'
import { FeedScreen } from './screens/feed/FeedScreenNew'
import { CommunitiesScreen } from './screens/communities/CommunitiesScreen'
import { CalendarScreen } from './screens/calendar/CalendarScreen'
import { NutritionScreen } from './screens/nutrition/NutritionScreen'
import { ProfileScreen } from './screens/profile/ProfileScreenNew'
import { BottomNav } from './components/BottomNav'
import { Sidebar } from './components/Sidebar'
import { DemoModal } from './components/DemoModal'
import './App.css'

export function App() {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const hasCompletedOnboarding = useStore((s) => s.hasCompletedOnboarding)
  const currentTab = useStore((s) => s.currentTab)
  const login = useStore((s) => s.login)
  const completeOnboarding = useStore((s) => s.completeOnboarding)

  // Cargar sesión desde localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem('base-session')
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        console.log('Cargando sesión:', session)
        
        if (session.user) {
          login(session.user)
          
          // Si el onboarding ya estaba completado, restaurarlo también
          if (session.onboardingCompleted && session.onboardingData) {
            completeOnboarding(session.onboardingData)
          }
        }
      } catch (e) {
        console.error('Error loading session:', e)
        localStorage.removeItem('base-session')
      }
    }
  }, [login, completeOnboarding])

  if (!isAuthenticated) {
    return (
      <>
        <AuthScreen />
        <DemoModal />
      </>
    )
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />
  }

  return (
    <>
      <div className="app">
        <Sidebar />
        <main className="app-main">
          {currentTab === 'feed' && <FeedScreen />}
          {currentTab === 'communities' && <CommunitiesScreen />}
          {currentTab === 'calendar' && <CalendarScreen />}
          {currentTab === 'nutrition' && <NutritionScreen />}
          {currentTab === 'profile' && <ProfileScreen />}
        </main>
        <BottomNav />
      </div>
      <DemoModal />
    </>
  )
}
