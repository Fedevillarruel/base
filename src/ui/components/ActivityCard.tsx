import type { Activity } from '../../domain/types'
import { Avatar, Badge } from './primitives'
import './ActivityCard.css'

const SPORT_EMOJI: Record<string, string> = {
  running: '🏃',
  cycling: '🚴',
  swim: '🏊',
  strength: '💪',
  triathlon: '🏊🚴🏃',
  yoga: '🧘',
  gym: '🏋️',
}

const EFFORT_LABEL: Record<string, string> = {
  easy: 'Suave',
  moderate: 'Moderado',
  hard: 'Intenso',
  max: 'Máximo',
}

const EFFORT_COLOR: Record<string, string> = {
  easy: 'success',
  moderate: 'info',
  hard: 'warning',
  max: 'danger',
}

export function ActivityCard({
  activity,
  onLike,
  onComment,
  onShare,
  onClick,
}: {
  activity: Activity
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onClick?: () => void
}) {
  const formatPace = (pace: number) => {
    const min = Math.floor(pace)
    const sec = Math.round((pace - min) * 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const formatDuration = (min: number) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  return (
    <div className="activity-card" onClick={onClick}>
      <div className="activity-card-header">
        <div className="activity-card-author">
          <Avatar src={activity.author.avatar} alt={activity.author.name} size="md" />
          <div>
            <div className="activity-card-name">{activity.author.name}</div>
            <div className="activity-card-time">
              {new Date(activity.createdAt).toLocaleDateString('es', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
        <div className="activity-card-sport">
          <span className="activity-sport-emoji">{SPORT_EMOJI[activity.sport]}</span>
        </div>
      </div>

      {activity.photo && (
        <div
          className="activity-card-photo"
          style={
            activity.photo.kind === 'gradient'
              ? { background: `linear-gradient(135deg, ${activity.photo.a}, ${activity.photo.b})` }
              : { backgroundImage: `url(${activity.photo.url})` }
          }
        >
          <div className="activity-card-overlay">
            <h3 className="activity-card-title">{activity.title}</h3>
          </div>
        </div>
      )}

      <div className="activity-card-stats">
        {activity.distanceKm && (
          <div className="activity-stat">
            <div className="activity-stat-value">{activity.distanceKm.toFixed(1)}</div>
            <div className="activity-stat-label">km</div>
          </div>
        )}
        {activity.durationMin && (
          <div className="activity-stat">
            <div className="activity-stat-value">{formatDuration(activity.durationMin)}</div>
            <div className="activity-stat-label">duración</div>
          </div>
        )}
        {activity.avgPaceMinPerKm && (
          <div className="activity-stat">
            <div className="activity-stat-value">{formatPace(activity.avgPaceMinPerKm)}</div>
            <div className="activity-stat-label">min/km</div>
          </div>
        )}
        {activity.elevationM && (
          <div className="activity-stat">
            <div className="activity-stat-value">{activity.elevationM}</div>
            <div className="activity-stat-label">m desnivel</div>
          </div>
        )}
      </div>

      {activity.effort && (
        <div className="activity-card-effort">
          <Badge variant={EFFORT_COLOR[activity.effort] as any}>
            {EFFORT_LABEL[activity.effort]}
          </Badge>
        </div>
      )}

      {activity.note && <p className="activity-card-note">{activity.note}</p>}

      <div className="activity-card-actions">
        <button
          className={`activity-action ${activity.isLiked ? 'activity-action-liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onLike?.()
          }}
        >
          <span className="activity-action-icon">{activity.isLiked ? '❤️' : '🤍'}</span>
          <span className="activity-action-count">{activity.likes || 0}</span>
        </button>
        <button 
          className="activity-action"
          onClick={(e) => {
            e.stopPropagation()
            onComment?.()
          }}
        >
          <span className="activity-action-icon">💬</span>
          <span className="activity-action-count">{activity.comments || 0}</span>
        </button>
        <button 
          className="activity-action"
          onClick={(e) => {
            e.stopPropagation()
            onShare?.()
          }}
        >
          <span className="activity-action-icon">🔗</span>
        </button>
      </div>
    </div>
  )
}
