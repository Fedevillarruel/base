import { useState } from 'react'
import { Screen } from '../../components/Screen'
import { ActivityCard } from '../../components/ActivityCard'
import { Button, Modal, Card } from '../../components/primitives'
import { CommentsModal } from '../../components/CommentsModal'
import { ShareModal } from '../../components/ShareModal'
import { ActivityDetailModal } from '../../components/ActivityDetailModal'
import { StravaBanner } from '../../components/StravaBanner'
import { useStore } from '../../../domain/useStore'
import type { Sport } from '../../../domain/types'
import { id } from '../../../domain/ids'
import './FeedScreenNew.css'

const SPORT_CHOICES: { sport: Sport; title: string; emoji: string }[] = [
  { sport: 'running', title: 'Running', emoji: '🏃' },
  { sport: 'cycling', title: 'Ciclismo', emoji: '🚴' },
  { sport: 'swim', title: 'Natación', emoji: '🏊' },
  { sport: 'strength', title: 'Fuerza', emoji: '💪' },
  { sport: 'triathlon', title: 'Triatlón', emoji: '🏊🚴🏃' },
  { sport: 'yoga', title: 'Yoga', emoji: '🧘' },
]

export function FeedScreen() {
  const [shareOpen, setShareOpen] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [shareActivityOpen, setShareActivityOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const activities = useStore((s) => s.activities)
  const currentUser = useStore((s) => s.currentUser)
  const addActivity = useStore((s) => s.addActivity)
  const toggleLike = useStore((s) => s.toggleLike)

  const handleOpenComments = (activityId: string) => {
    setSelectedActivity(activityId)
    setCommentsOpen(true)
  }

  const handleOpenShare = (activityId: string) => {
    setSelectedActivity(activityId)
    setShareActivityOpen(true)
  }

  const handleOpenDetail = (activityId: string) => {
    setSelectedActivity(activityId)
    setDetailOpen(true)
  }

  const handleShareActivity = (sport: Sport) => {
    if (!currentUser) return

    const now = new Date()
    const duration = sport === 'strength' ? 45 : sport === 'yoga' ? 60 : 52
    const distanceKm = sport === 'running' ? 10.2 : sport === 'cycling' ? 35.8 : sport === 'swim' ? 2.5 : undefined

    const newActivity = {
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
      effort: 'moderate' as const,
      photo: { kind: 'gradient' as const, a: '#ff4d32', b: '#0a0e17' },
      author: currentUser,
      likes: 0,
      comments: 0,
      isLiked: false,
    }

    addActivity(newActivity)
    setShareOpen(false)
  }

  return (
    <Screen
      title="Feed"
      action={
        <button className="icon-btn" onClick={() => setShareOpen(true)}>
          ➕
        </button>
      }
    >
      <div className="feed-container">
        <StravaBanner />
        
        {activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏃‍♂️</div>
            <h3>Aún no hay actividades</h3>
            <p>Comparte tu primera actividad para comenzar</p>
            <Button variant="primary" onClick={() => setShareOpen(true)}>
              Compartir actividad
            </Button>
          </div>
        ) : (
          <div className="activities-list">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => handleOpenDetail(activity.id)}
                onLike={() => toggleLike(activity.id)}
                onComment={() => handleOpenComments(activity.id)}
                onShare={() => handleOpenShare(activity.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Compartir actividad"
      >
        <div className="share-modal">
          <p className="share-description">
            Selecciona el tipo de actividad que realizaste
          </p>
          <div className="sport-grid">
            {SPORT_CHOICES.map((choice) => (
              <Card key={choice.sport} onClick={() => handleShareActivity(choice.sport)}>
                <div className="sport-card">
                  <span className="sport-emoji">{choice.emoji}</span>
                  <span className="sport-title">{choice.title}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Modal>

      <CommentsModal
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        activityId={selectedActivity || ''}
        activityAuthor={activities.find(a => a.id === selectedActivity)?.author.name || ''}
      />

      <ShareModal
        isOpen={shareActivityOpen}
        onClose={() => setShareActivityOpen(false)}
        activityTitle={activities.find(a => a.id === selectedActivity)?.title || ''}
      />

      <ActivityDetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        activity={activities.find(a => a.id === selectedActivity) || null}
      />
    </Screen>
  )
}
