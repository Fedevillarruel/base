import { useState } from 'react'
import { Sport, User } from '../../domain/types'
import './RankingsSection.css'

interface RankingUser extends User {
  totalKm: number
  totalActivities: number
  rank: number
}

const MOCK_RANKINGS: Record<Sport, RankingUser[]> = {
  running: [
    { id: '1', rank: 1, name: 'Sofía Torres', username: '@sofi_mountains', avatar: '👩‍🦳', city: 'Quito, Ecuador', totalKm: 856, totalActivities: 142, level: 'elite' },
    { id: '2', rank: 2, name: 'Pedro Sánchez', username: '@pedros_run', avatar: '👨', city: 'Medellín, Colombia', totalKm: 742, totalActivities: 128, level: 'advanced' },
    { id: '3', rank: 3, name: 'Juan Pérez', username: '@juanp', avatar: '👨‍🦱', city: 'Buenos Aires, Argentina', totalKm: 685, totalActivities: 115, level: 'advanced' },
    { id: '4', rank: 4, name: 'Laura Fernández', username: '@laura_zen', avatar: '👩', city: 'Bogotá, Colombia', totalKm: 612, totalActivities: 98, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Diego Martínez', username: '@diegom', avatar: '👨‍🦱', city: 'Santiago, Chile', totalKm: 548, totalActivities: 89, level: 'intermediate' },
  ],
  cycling: [
    { id: '1', rank: 1, name: 'María González', username: '@mariag', avatar: '👩‍🦰', city: 'La Plata, Argentina', totalKm: 2456, totalActivities: 98, level: 'elite' },
    { id: '2', rank: 2, name: 'Roberto Paz', username: '@rober_bike', avatar: '👨‍🦲', city: 'Guadalajara, México', totalKm: 2187, totalActivities: 87, level: 'advanced' },
    { id: '3', rank: 3, name: 'Carlos Díaz', username: '@carlos_bike', avatar: '👨‍🦱', city: 'Montevideo, Uruguay', totalKm: 1965, totalActivities: 76, level: 'advanced' },
    { id: '4', rank: 4, name: 'Ana Silva', username: '@ana_cycling', avatar: '👩‍🦱', city: 'São Paulo, Brasil', totalKm: 1754, totalActivities: 68, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Luis Gómez', username: '@luisg_ride', avatar: '👨', city: 'Lima, Perú', totalKm: 1623, totalActivities: 62, level: 'intermediate' },
  ],
  swim: [
    { id: '1', rank: 1, name: 'Valentina Costa', username: '@vale_swim', avatar: '👩‍🦱', city: 'Rosario, Argentina', totalKm: 145, totalActivities: 78, level: 'elite' },
    { id: '2', rank: 2, name: 'Carlos Rodríguez', username: '@carlosr', avatar: '👨‍🦲', city: 'Montevideo, Uruguay', totalKm: 128, totalActivities: 65, level: 'advanced' },
    { id: '3', rank: 3, name: 'Marina López', username: '@marina_swim', avatar: '👩', city: 'Ciudad de México', totalKm: 112, totalActivities: 58, level: 'advanced' },
    { id: '4', rank: 4, name: 'Pablo Vega', username: '@pablo_pool', avatar: '👨‍🦱', city: 'Bogotá, Colombia', totalKm: 98, totalActivities: 52, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Julia Ríos', username: '@julia_swim', avatar: '👩‍🦰', city: 'Quito, Ecuador', totalKm: 87, totalActivities: 45, level: 'intermediate' },
  ],
  strength: [
    { id: '1', rank: 1, name: 'Ana López', username: '@anita_fit', avatar: '👩‍🦱', city: 'Lima, Perú', totalKm: 0, totalActivities: 156, level: 'elite' },
    { id: '2', rank: 2, name: 'Martín Silva', username: '@martin_strong', avatar: '👨‍🦲', city: 'Buenos Aires, Argentina', totalKm: 0, totalActivities: 142, level: 'advanced' },
    { id: '3', rank: 3, name: 'Camila Romero', username: '@cami_fit', avatar: '👩‍🦰', city: 'Santiago, Chile', totalKm: 0, totalActivities: 128, level: 'advanced' },
    { id: '4', rank: 4, name: 'Lucas Benítez', username: '@lucas_gym', avatar: '👨', city: 'Córdoba, Argentina', totalKm: 0, totalActivities: 115, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Florencia Vega', username: '@flor_fitness', avatar: '👩', city: 'Medellín, Colombia', totalKm: 0, totalActivities: 102, level: 'intermediate' },
  ],
  triathlon: [
    { id: '1', rank: 1, name: 'Santiago Díaz', username: '@santi_tri', avatar: '👨‍🦱', city: 'La Plata, Argentina', totalKm: 1245, totalActivities: 98, level: 'elite' },
    { id: '2', rank: 2, name: 'Isabella Torres', username: '@isa_triathlon', avatar: '👩‍🦳', city: 'Guadalajara, México', totalKm: 1187, totalActivities: 89, level: 'advanced' },
    { id: '3', rank: 3, name: 'Rodrigo Paz', username: '@rodri_tri', avatar: '👨‍🦲', city: 'Rosario, Argentina', totalKm: 1045, totalActivities: 76, level: 'advanced' },
    { id: '4', rank: 4, name: 'Valentina Ruiz', username: '@vale_tri', avatar: '👩‍🦱', city: 'Quito, Ecuador', totalKm: 967, totalActivities: 68, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Nicolás Gómez', username: '@nico_triathlete', avatar: '👨', city: 'Bogotá, Colombia', totalKm: 892, totalActivities: 62, level: 'intermediate' },
  ],
  yoga: [
    { id: '1', rank: 1, name: 'Laura Fernández', username: '@laura_zen', avatar: '👩', city: 'Bogotá, Colombia', totalKm: 0, totalActivities: 187, level: 'elite' },
    { id: '2', rank: 2, name: 'Sofía Mendoza', username: '@sofi_yoga', avatar: '👩‍🦰', city: 'Buenos Aires, Argentina', totalKm: 0, totalActivities: 165, level: 'advanced' },
    { id: '3', rank: 3, name: 'Carolina Blanco', username: '@caro_namaste', avatar: '👩‍🦱', city: 'Montevideo, Uruguay', totalKm: 0, totalActivities: 142, level: 'advanced' },
    { id: '4', rank: 4, name: 'Daniela Cruz', username: '@dani_flow', avatar: '👩‍🦳', city: 'Santiago, Chile', totalKm: 0, totalActivities: 128, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Lucía Ramos', username: '@lu_yogi', avatar: '👩', city: 'Lima, Perú', totalKm: 0, totalActivities: 115, level: 'intermediate' },
  ],
  gym: [
    { id: '1', rank: 1, name: 'Ana López', username: '@anita_fit', avatar: '👩‍🦱', city: 'Lima, Perú', totalKm: 0, totalActivities: 156, level: 'elite' },
    { id: '2', rank: 2, name: 'Martín Silva', username: '@martin_strong', avatar: '👨‍🦲', city: 'Buenos Aires, Argentina', totalKm: 0, totalActivities: 142, level: 'advanced' },
    { id: '3', rank: 3, name: 'Camila Romero', username: '@cami_fit', avatar: '👩‍🦰', city: 'Santiago, Chile', totalKm: 0, totalActivities: 128, level: 'advanced' },
    { id: '4', rank: 4, name: 'Lucas Benítez', username: '@lucas_gym', avatar: '👨', city: 'Córdoba, Argentina', totalKm: 0, totalActivities: 115, level: 'intermediate' },
    { id: '5', rank: 5, name: 'Florencia Vega', username: '@flor_fitness', avatar: '👩', city: 'Medellín, Colombia', totalKm: 0, totalActivities: 102, level: 'intermediate' },
  ],
}

const SPORT_LABELS: Record<Sport, string> = {
  running: 'Running',
  cycling: 'Ciclismo',
  swim: 'Natación',
  strength: 'Fuerza',
  triathlon: 'Triatlón',
  yoga: 'Yoga',
  gym: 'Gym',
}

const SPORT_ICONS: Record<Sport, string> = {
  running: '🏃',
  cycling: '🚴',
  swim: '🏊',
  strength: '💪',
  triathlon: '🏊🚴🏃',
  yoga: '🧘',
  gym: '🏋️',
}

export function RankingsSection() {
  const [selectedSport, setSelectedSport] = useState<Sport>('running')
  
  const rankings = MOCK_RANKINGS[selectedSport] || []
  const showDistance = selectedSport !== 'strength' && selectedSport !== 'yoga' && selectedSport !== 'gym'

  return (
    <div className="rankings-section">
      <h2 className="rankings-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Rankings por disciplina
      </h2>

      {/* Sport Tabs */}
      <div className="rankings-tabs">
        {(Object.keys(SPORT_LABELS) as Sport[]).map((sport) => (
          <button
            key={sport}
            className={`rankings-tab ${selectedSport === sport ? 'active' : ''}`}
            onClick={() => setSelectedSport(sport)}
          >
            <span className="rankings-tab-icon">{SPORT_ICONS[sport]}</span>
            <span className="rankings-tab-label">{SPORT_LABELS[sport]}</span>
          </button>
        ))}
      </div>

      {/* Rankings List */}
      <div className="rankings-list">
        {rankings.map((user) => (
          <div key={user.id} className={`ranking-item rank-${user.rank}`}>
            <div className="ranking-position">
              {user.rank === 1 && '🥇'}
              {user.rank === 2 && '🥈'}
              {user.rank === 3 && '🥉'}
              {user.rank > 3 && user.rank}
            </div>
            <div className="ranking-avatar">{user.avatar}</div>
            <div className="ranking-info">
              <div className="ranking-name">{user.name}</div>
              <div className="ranking-username">{user.username}</div>
            </div>
            <div className="ranking-stats">
              {showDistance ? (
                <>
                  <div className="ranking-stat-primary">{user.totalKm.toLocaleString()} km</div>
                  <div className="ranking-stat-secondary">{user.totalActivities} actividades</div>
                </>
              ) : (
                <>
                  <div className="ranking-stat-primary">{user.totalActivities} sesiones</div>
                  <div className="ranking-stat-secondary">{user.level}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
