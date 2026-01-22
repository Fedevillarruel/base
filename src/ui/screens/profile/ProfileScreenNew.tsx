import { useStore } from '../../../domain/useStore'
import { Screen } from '../../components/Screen'
import { Card, Avatar, Badge, Button } from '../../components/primitives'
import './ProfileScreenNew.css'

export function ProfileScreen() {
  const currentUser = useStore((s) => s.currentUser)
  const activities = useStore((s) => s.activities)
  const logout = useStore((s) => s.logout)

  if (!currentUser) return null

  const myActivities = activities.filter((a) => a.author.id === currentUser.id)
  const totalDistance = myActivities.reduce((sum, a) => sum + (a.distanceKm || 0), 0)
  const totalTime = myActivities.reduce((sum, a) => sum + (a.durationMin || 0), 0)

  return (
    <Screen title="Perfil">
      <div className="profile-container">
        <Card>
          <div className="profile-header">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" />
            <div className="profile-info">
              <h2 className="profile-name">{currentUser.name}</h2>
              <p className="profile-username">@{currentUser.username}</p>
              {currentUser.bio && <p className="profile-bio">{currentUser.bio}</p>}
              {currentUser.city && (
                <p className="profile-location">📍 {currentUser.city}</p>
              )}
              {currentUser.isPro && <Badge variant="warning">PRO</Badge>}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <div className="stat-value">{currentUser.followers}</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat">
              <div className="stat-value">{currentUser.following}</div>
              <div className="stat-label">Siguiendo</div>
            </div>
            <div className="stat">
              <div className="stat-value">{myActivities.length}</div>
              <div className="stat-label">Actividades</div>
            </div>
          </div>
        </Card>

        <div className="section-title">Progreso</div>
        <Card>
          <div className="progress-grid">
            <div className="progress-item">
              <span className="progress-icon">🏃</span>
              <div>
                <div className="progress-value">{totalDistance.toFixed(1)} km</div>
                <div className="progress-label">Distancia total</div>
              </div>
            </div>
            <div className="progress-item">
              <span className="progress-icon">⏱️</span>
              <div>
                <div className="progress-value">{Math.round(totalTime / 60)} h</div>
                <div className="progress-label">Tiempo total</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="section-title">Calculadora de ritmos</div>
        <Card>
          <p className="feature-description">
            Calcula tu ritmo objetivo para running, ciclismo y natación
          </p>
          <Button variant="secondary" fullWidth>
            Abrir calculadora
          </Button>
        </Card>

        <div className="section-title">Plan PRO</div>
        <Card onClick={() => {}}>
          <div className="pro-card">
            <div className="pro-header">
              <h3>Upgrade a PRO</h3>
              <Badge variant="warning">⭐ PRO</Badge>
            </div>
            <p className="pro-description">
              Entrena 1 a 1 con @clarissebermudez y lleva tu rendimiento al siguiente nivel
            </p>
            <ul className="pro-features">
              <li>✓ Plan de entrenamiento personalizado</li>
              <li>✓ Seguimiento semanal</li>
              <li>✓ Análisis de rendimiento</li>
              <li>✓ Ajustes en tiempo real</li>
            </ul>
            <Button variant="primary" fullWidth>
              Saber más
            </Button>
          </div>
        </Card>

        <div className="profile-actions">
          <Button variant="secondary" fullWidth>
            Editar perfil
          </Button>
          <Button variant="ghost" fullWidth onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Screen>
  )
}
