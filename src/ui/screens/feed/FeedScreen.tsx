import { useMemo, useState, useEffect } from 'react'
import { Screen } from '../../components/Screen'
import { ActivityCard } from '../../components/ActivityCard'
import { Button, Modal } from '../../components/primitives'
import { WelcomePopup } from '../../components/WelcomePopup'
import { useStore } from '../../../domain/useStore'
import type { Activity, Sport } from '../../../domain/types'
import { id } from '../../../domain/ids'
import './FeedScreen.css'

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <button className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span className="notification-badge">3</span>
    </button>
  )
}

const SPORT_CHOICES: { sport: Sport; title: string; note: string; emoji: string }[] = [
  {
    sport: 'running',
    title: 'Running',
    note: 'Carreras y entrenamientos de running',
    emoji: '🏃',
  },
  {
    sport: 'cycling',
    title: 'Ciclismo',
    note: 'Salidas en bicicleta',
    emoji: '🚴',
  },
  {
    sport: 'swim',
    title: 'Natación',
    note: 'Entrenamientos de natación',
    emoji: '🏊',
  },
  {
    sport: 'strength',
    title: 'Fuerza',
    note: 'Entrenamiento de fuerza y gimnasio',
    emoji: '💪',
  },
  {
    sport: 'triathlon',
    title: 'Triatlón',
    note: 'Entrenamiento combinado',
    emoji: '🏊🚴🏃',
  },
  {
    sport: 'yoga',
    title: 'Yoga',
    note: 'Sesión de yoga y movilidad',
    emoji: '🧘',
  },
]

function makeShareActivity(sport: Sport, me: Activity['author']): Activity {
  const now = new Date()
  const duration = sport === 'strength' ? 45 : sport === 'yoga' ? 60 : 52
  const distanceKm = sport === 'running' ? 10.2 : sport === 'cycling' ? 35.8 : sport === 'swim' ? 2.5 : undefined

  return {
    id: id('act'),
    sport,
    title: SPORT_CHOICES.find((x) => x.sport === sport)?.title ?? 'Entrenamiento',
    note: '¡Gran sesión de entrenamiento! Me sentí muy bien hoy 💪',
    createdAt: now.toISOString(),
    startAt: now.toISOString(),
    durationMin: duration,
    distanceKm,
    avgPaceMinPerKm: sport === 'running' ? 5.2 : undefined,
    elevationM: sport === 'cycling' ? 320 : sport === 'running' ? 85 : undefined,
    effort: 'moderate',
    photo: { kind: 'gradient', a: '#ff4d32', b: '#0a0e17' },
    author: me,
    likes: 0,
    comments: 0,
    isLiked: false,
  }
}

export function FeedScreen() {
  const activitiesState = useStore((s: any) => s.activities)
  const profile = useStore((s: any) => s.profile)
  const addActivity = useStore((s: any) => s.addActivity)
  const toggleLike = useStore((s: any) => s.toggleLike)

  const [shareOpen, setShareOpen] = useState(false)
  const [commentOpen, setCommentOpen] = useState<Activity | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenFeedWelcome = sessionStorage.getItem('hasSeenFeedWelcome')
    if (!hasSeenFeedWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    sessionStorage.setItem('hasSeenFeedWelcome', 'true')
  }

  const activities = useMemo(() => {
    return [...activitiesState].sort((a, b) => +new Date(b.startAt) - +new Date(a.startAt))
  }, [activitiesState])

  const me: Activity['author'] = profile

  return (
    <Screen 
      title="Feed"
      action={<NotificationBell />}
    >
      {showWelcome && (
        <WelcomePopup
          title="Feed de Actividades"
          description="Comparte tus entrenamientos y conéctate con tu comunidad"
          features={[
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
              title: 'Minimalista y Enfocado',
              text: 'Lo importante es la sesión, la intención y la consistencia. Sin distracciones.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>,
              title: 'Reacciones Auténticas',
              text: 'Dale like y comenta las actividades de tu comunidad para motivar.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
              title: 'Comparte tu Progreso',
              text: 'Publica tus entrenamientos con foto, datos y contexto de cada sesión.'
            }
          ]}
          onClose={handleCloseWelcome}
        />
      )}
      <div className="vStack">
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)' }}>Hoy</div>
              <div style={{ fontSize: 18, fontWeight: 820, letterSpacing: -0.2 }}>Actividad y contexto</div>
            </div>
            <Button variant="primary" onClick={() => setShareOpen(true)}>
              Compartir actividad
            </Button>
          </div>
          <div className="helper">
            Un feed limpio: lo importante es la sesión, la intención y la consistencia.
          </div>
        </div>

        <div className="vStack" style={{ gap: 12 }}>
          {activities.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              onLike={() => {
                toggleLike(a.id)
              }}
              onComment={() => setCommentOpen(a)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={shareOpen} title="Compartir actividad" onClose={() => setShareOpen(false)}>
        <div className="helper">Elegí un deporte. BASE completa el resto con un formato coherente.</div>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {SPORT_CHOICES.map((x) => (
            <button
              key={x.sport}
              className="btn"
              onClick={() => {
                addActivity(makeShareActivity(x.sport, me))
                setShareOpen(false)
              }}
              style={{ height: 'auto', padding: 14, justifyContent: 'space-between' }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 760 }}>{x.title}</div>
                <div className="helper" style={{ marginTop: 4 }}>
                  {x.note}
                </div>
              </div>
              <div style={{ opacity: 0.9, fontSize: 18 }}>+</div>
            </button>
          ))}
        </div>
      </Modal>

      <Modal
  isOpen={!!commentOpen}
  title={commentOpen ? `Comentarios · ${commentOpen.author.username}` : 'Comentarios'}
        onClose={() => setCommentOpen(null)}
      >
        <div className="helper">
          Comentarios simulados. El contenido se siente real, sin ruido ni spam.
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          <div className="card" style={{ padding: 12, borderRadius: 16, background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontWeight: 740 }}>@clarissebermudez</div>
            <div className="helper" style={{ marginTop: 6 }}>
              Bien medido. Lo que más me gusta: no te fuiste de ritmo cuando te sentías bien.
            </div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 16, background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontWeight: 740 }}>@memimandaa</div>
            <div className="helper" style={{ marginTop: 6 }}>
              Si hoy fue Z2 real, mañana vas a dormir mejor. Y eso también suma.
            </div>
          </div>
        </div>
      </Modal>
    </Screen>
  )
}
