import { Community, User } from '../../domain/types'
import './CommunityDetailModal.css'

interface CommunityDetailModalProps {
  community: Community | null
  isOpen: boolean
  onClose: () => void
  onToggleJoin: () => void
}

// Mock members data
const generateMembers = (count: number): User[] => {
  const names = [
    'Juan Pérez', 'María González', 'Carlos Rodríguez', 'Ana López', 'Pedro Sánchez',
    'Laura Fernández', 'Diego Martínez', 'Sofía Torres', 'Roberto Paz', 'Valentina Costa',
    'Martín Silva', 'Camila Romero', 'Lucas Benítez', 'Florencia Vega', 'Santiago Díaz'
  ]
  const avatars = ['👨‍🦱', '👩‍🦰', '👨‍🦲', '👩‍🦱', '👨', '👩', '👨‍🦳', '👩‍🦳', '🧔', '👱‍♀️']
  const cities = ['Buenos Aires', 'La Plata', 'Córdoba', 'Rosario', 'Mendoza']
  
  return Array.from({ length: Math.min(count, 15) }, (_, i) => ({
    id: `member-${i}`,
    name: names[i % names.length],
    username: `@${names[i % names.length].toLowerCase().replace(' ', '_')}`,
    avatar: avatars[i % avatars.length],
    city: cities[i % cities.length],
    totalKm: Math.floor(Math.random() * 500) + 100,
    totalActivities: Math.floor(Math.random() * 50) + 10,
    level: ['beginner', 'intermediate', 'advanced', 'elite'][Math.floor(Math.random() * 4)] as any,
  }))
}

export function CommunityDetailModal({ community, isOpen, onClose, onToggleJoin }: CommunityDetailModalProps) {
  if (!isOpen || !community) return null

  const members = generateMembers(community.members)
  const recentActivities = [
    { user: 'María G.', activity: 'Corrió 10.5 km', time: 'Hace 2h' },
    { user: 'Carlos R.', activity: 'Ciclismo 42 km', time: 'Hace 3h' },
    { user: 'Ana L.', activity: 'Natación 2.1 km', time: 'Hace 5h' },
    { user: 'Pedro S.', activity: 'Running 8.5 km', time: 'Hace 6h' },
  ]

  return (
    <div className="community-detail-overlay" onClick={onClose}>
      <div className="community-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div 
          className="community-detail-header"
          style={{ 
            backgroundImage: community.cover.startsWith('http') 
              ? `url(${community.cover})` 
              : undefined,
            background: community.cover.startsWith('linear-gradient') 
              ? community.cover 
              : undefined 
          }}
        >
          <button className="community-detail-back" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5m7 7l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="community-detail-header-overlay">
            <h2 className="community-detail-name">{community.name}</h2>
            <div className="community-detail-members-count">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m16-13a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {community.members.toLocaleString()} miembros
            </div>
          </div>
        </div>

        <div className="community-detail-content">
          {/* Action Button */}
          <button 
            className={`community-join-btn ${community.isJoined ? 'joined' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleJoin()
            }}
          >
            {community.isJoined ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unido
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m11-11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 11v-6m-3 3h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unirse al grupo
              </>
            )}
          </button>

          {/* Description */}
          <div className="community-section">
            <h3 className="community-section-title">Acerca de</h3>
            <p className="community-description-full">{community.description}</p>
          </div>

          {/* Recent Activity */}
          <div className="community-section">
            <h3 className="community-section-title">Actividad reciente</h3>
            <div className="community-recent-list">
              {recentActivities.map((item, i) => (
                <div key={i} className="community-recent-item">
                  <div className="community-recent-dot"></div>
                  <div className="community-recent-text">
                    <span className="community-recent-user">{item.user}</span> {item.activity}
                  </div>
                  <div className="community-recent-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="community-section">
            <h3 className="community-section-title">
              Miembros destacados
              <span className="community-section-count">{members.length}</span>
            </h3>
            <div className="community-members-grid">
              {members.map((member) => (
                <div key={member.id} className="community-member-card">
                  <div className="community-member-avatar">{member.avatar}</div>
                  <div className="community-member-info">
                    <div className="community-member-name">{member.name}</div>
                    <div className="community-member-stats">
                      {member.totalKm}km • {member.totalActivities} actividades
                    </div>
                  </div>
                  <div className={`community-member-badge ${member.level}`}>
                    {member.level === 'elite' && '⭐'}
                    {member.level === 'advanced' && '🔥'}
                    {member.level === 'intermediate' && '💪'}
                    {member.level === 'beginner' && '🌱'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
