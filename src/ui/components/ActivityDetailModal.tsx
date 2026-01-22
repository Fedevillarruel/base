import { Activity } from '../../domain/types'
import './ActivityDetailModal.css'

interface ActivityDetailModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityDetailModal({ activity, isOpen, onClose }: ActivityDetailModalProps) {
  if (!isOpen || !activity) return null

  // Mock data for charts
  const paceData = [
    { km: 1, pace: 5.2, y: 30 },
    { km: 2, pace: 5.0, y: 45 },
    { km: 3, pace: 4.8, y: 60 },
    { km: 4, pace: 5.1, y: 48 },
    { km: 5, pace: 4.9, y: 52 },
    { km: 6, pace: 5.3, y: 25 },
    { km: 7, pace: 5.0, y: 45 },
    { km: 8, pace: 4.7, y: 68 },
    { km: 9, pace: 4.9, y: 52 },
    { km: 10, pace: 5.2, y: 30 },
  ]

  const elevationData = [
    { km: 0, elev: 0, y: 80 },
    { km: 1, elev: 15, y: 65 },
    { km: 2, elev: 35, y: 45 },
    { km: 3, elev: 28, y: 52 },
    { km: 4, elev: 42, y: 38 },
    { km: 5, elev: 60, y: 20 },
    { km: 6, elev: 55, y: 25 },
    { km: 7, elev: 72, y: 8 },
    { km: 8, elev: 65, y: 15 },
    { km: 9, elev: 50, y: 30 },
    { km: 10, elev: 45, y: 35 },
  ]

  const hrZones = [
    { zone: 'Z1', pct: 12, color: '#10b981' },
    { zone: 'Z2', pct: 35, color: '#22c55e' },
    { zone: 'Z3', pct: 28, color: '#eab308' },
    { zone: 'Z4', pct: 18, color: '#f97316' },
    { zone: 'Z5', pct: 7, color: '#ef4444' },
  ]

  const splits = [
    { km: 1, time: '5:12', pace: '5:12', hr: 142 },
    { km: 2, time: '10:12', pace: '5:00', hr: 148 },
    { km: 3, time: '15:00', pace: '4:48', hr: 155 },
    { km: 4, time: '20:06', pace: '5:06', hr: 152 },
    { km: 5, time: '24:60', pace: '4:54', hr: 158 },
    { km: 6, time: '30:18', pace: '5:18', hr: 145 },
    { km: 7, time: '35:18', pace: '5:00', hr: 150 },
    { km: 8, time: '40:00', pace: '4:42', hr: 162 },
    { km: 9, time: '44:54', pace: '4:54', hr: 160 },
    { km: 10, time: '50:06', pace: '5:12', hr: 148 },
  ]

  return (
    <div className="activity-detail-overlay" onClick={onClose}>
      <div className="activity-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="activity-detail-header">
          <button className="activity-detail-back" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5m7 7l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="activity-detail-title">{activity.title}</h2>
          <div className="activity-detail-spacer"></div>
        </div>

        <div className="activity-detail-content">
          {/* Hero Stats */}
          <div className="activity-hero">
            <div className="activity-hero-stat">
              <div className="activity-hero-label">Distancia</div>
              <div className="activity-hero-value">{activity.distanceKm ? `${activity.distanceKm.toFixed(2)} km` : '--'}</div>
            </div>
            <div className="activity-hero-stat">
              <div className="activity-hero-label">Tiempo</div>
              <div className="activity-hero-value">{activity.durationMin ? `${activity.durationMin} min` : '--'}</div>
            </div>
            <div className="activity-hero-stat">
              <div className="activity-hero-label">Ritmo</div>
              <div className="activity-hero-value">{activity.avgPaceMinPerKm ? `${activity.avgPaceMinPerKm.toFixed(1)}'/km` : '--'}</div>
            </div>
          </div>

          {/* Pace Chart */}
          <div className="activity-card">
            <h3 className="activity-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ritmo por kilómetro
            </h3>
            <div className="pace-chart">
              <div className="chart-grid">
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
              </div>
              <svg viewBox="0 0 400 120" className="chart-svg">
                {/* Area gradient */}
                <defs>
                  <linearGradient id="paceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d32" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#ff4d32" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
                
                {/* Area */}
                <path
                  d={`M 0 ${paceData[0].y} ${paceData.map((d, i) => `L ${i * 40 + 20} ${d.y}`).join(' ')} L ${paceData.length * 40} 120 L 0 120 Z`}
                  fill="url(#paceGradient)"
                />
                
                {/* Line */}
                <path
                  d={`M 20 ${paceData[0].y} ${paceData.map((d, i) => `L ${i * 40 + 20} ${d.y}`).join(' ')}`}
                  fill="none"
                  stroke="#ff4d32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Points */}
                {paceData.map((d, i) => (
                  <circle
                    key={i}
                    cx={i * 40 + 20}
                    cy={d.y}
                    r="4"
                    fill="#ff4d32"
                    stroke="#0a0e17"
                    strokeWidth="2"
                  />
                ))}
              </svg>
              <div className="chart-labels">
                {paceData.map((d, i) => (
                  <div key={i} className="chart-label">{d.km}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Elevation Chart */}
          <div className="activity-card">
            <h3 className="activity-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="m3 8 4-4 4 4 4-4 4 4v13H3V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Perfil de elevación
            </h3>
            <div className="elevation-chart">
              <div className="chart-grid">
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
              </div>
              <svg viewBox="0 0 440 100" className="chart-svg">
                <defs>
                  <linearGradient id="elevGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.08"/>
                  </linearGradient>
                </defs>
                
                <path
                  d={`M 0 100 ${elevationData.map((d, i) => `L ${i * 40} ${d.y}`).join(' ')} L 440 100 Z`}
                  fill="url(#elevGradient)"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
              </svg>
              <div className="elevation-stats">
                <div className="elevation-stat">
                  <div className="elevation-stat-icon">↗</div>
                  <div className="elevation-stat-value">245m</div>
                  <div className="elevation-stat-label">Ascenso</div>
                </div>
                <div className="elevation-stat">
                  <div className="elevation-stat-icon">↘</div>
                  <div className="elevation-stat-value">238m</div>
                  <div className="elevation-stat-label">Descenso</div>
                </div>
              </div>
            </div>
          </div>

          {/* HR Zones */}
          <div className="activity-card">
            <h3 className="activity-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zonas de frecuencia cardíaca
            </h3>
            <div className="hr-zones">
              {hrZones.map((zone) => (
                <div key={zone.zone} className="hr-zone">
                  <div className="hr-zone-header">
                    <span className="hr-zone-name">{zone.zone}</span>
                    <span className="hr-zone-pct">{zone.pct}%</span>
                  </div>
                  <div className="hr-zone-bar-container">
                    <div 
                      className="hr-zone-bar" 
                      style={{ 
                        width: `${zone.pct}%`, 
                        background: `linear-gradient(90deg, ${zone.color} 0%, ${zone.color}cc 100%)`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hr-summary">
              <div className="hr-summary-stat">
                <div className="hr-summary-value">156</div>
                <div className="hr-summary-label">Promedio</div>
              </div>
              <div className="hr-summary-stat">
                <div className="hr-summary-value">182</div>
                <div className="hr-summary-label">Máximo</div>
              </div>
            </div>
          </div>

          {/* Splits Table */}
          <div className="activity-card">
            <h3 className="activity-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                <path d="M3 9h18M9 21V9" strokeWidth="1.5"/>
              </svg>
              Parciales
            </h3>
            <div className="splits-table">
              <div className="splits-header">
                <div className="splits-col">Km</div>
                <div className="splits-col">Tiempo</div>
                <div className="splits-col">Ritmo</div>
                <div className="splits-col">FC</div>
              </div>
              {splits.map((split) => (
                <div key={split.km} className="splits-row">
                  <div className="splits-col splits-km">{split.km}</div>
                  <div className="splits-col">{split.time}</div>
                  <div className="splits-col splits-pace">{split.pace}/km</div>
                  <div className="splits-col splits-hr">{split.hr}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                  <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="metric-value">172</div>
              <div className="metric-label">Cadencia</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="metric-value">845</div>
              <div className="metric-label">Calorías</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v20M2 12h20" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="metric-value">1.2m</div>
              <div className="metric-label">Zancada</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 20V10M12 20V4M6 20v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="metric-value">320W</div>
              <div className="metric-label">Potencia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
