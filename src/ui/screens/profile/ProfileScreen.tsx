import { useState, useEffect } from 'react'
import { Screen } from '../../components/Screen'
import { WelcomePopup } from '../../components/WelcomePopup'
import { useStore } from '../../../domain/useStore'
import './ProfileScreen.css'

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <button className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span className="notification-badge">1</span>
    </button>
  )
}

function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="settings-btn" onClick={onClick}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  )
}

export function ProfileScreen() {
  const p = useStore((s: any) => s.profile)
  const mine = useStore((s: any) => s.activities).filter((a: any) => a.author.username === p.username)
  const logout = useStore((s: any) => s.logout)

  const [showWelcome, setShowWelcome] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const hasSeenProfileWelcome = sessionStorage.getItem('hasSeenProfileWelcome')
    if (!hasSeenProfileWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    sessionStorage.setItem('hasSeenProfileWelcome', 'true')
  }

  return (
    <Screen 
      title="Mi Cuenta"
      action={
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <NotificationBell />
          <SettingsButton onClick={() => setShowSettings(true)} />
        </div>
      }
    >
      {showWelcome && (
        <WelcomePopup
          title="Tu Perfil"
          description="Tu espacio personal para ver progreso, rutinas y configuración"
          features={[
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
              title: 'Estadísticas Personales',
              text: 'Ve tus actividades totales, tiempo acumulado y progreso.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
              title: 'Rutinas de Fuerza',
              text: 'Accede a bloques progresivos de entrenamiento adaptados a ti.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              title: 'Configuración',
              text: 'Personaliza tu perfil, vincula Strava y gestiona integraciones.'
            }
          ]}
          onClose={handleCloseWelcome}
        />
      )}

      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-header-top">
            <div className="profile-avatar">
              {p.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{p.name}</h2>
              <p className="profile-meta">{p.username} · {p.city}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-value">{mine.length}</div>
              <div className="stat-label">Actividades</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">
                {Math.round(mine.reduce((a: number, x: any) => a + (x.durationMin ?? 0), 0))}
                <span className="stat-unit">min</span>
              </div>
              <div className="stat-label">Tiempo total</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">
                {Math.round(mine.reduce((a: number, x: any) => a + (x.distanceKm ?? 0), 0))}
                <span className="stat-unit">km</span>
              </div>
              <div className="stat-label">Distancia</div>
            </div>
          </div>
        </div>

        <div className="profile-section-card">
          <div className="section-header">
            <h3 className="section-title">Rutinas de Fuerza</h3>
            <p className="section-subtitle">Bloques progresivos adaptados a tu nivel</p>
          </div>
          <div className="routines-list">
            {[
              { t: 'Base pierna + core', d: '35–40 min', rpe: 'RPE 6–7', icon: '🦵' },
              { t: 'Tren superior + estabilidad', d: '30–35 min', rpe: 'RPE 6', icon: '💪' },
              { t: 'Full body + movilidad', d: '40–45 min', rpe: 'RPE 7', icon: '🏋️' },
            ].map((x) => (
              <div key={x.t} className="routine-item">
                <div className="routine-icon">{x.icon}</div>
                <div className="routine-info">
                  <div className="routine-title">{x.t}</div>
                  <div className="routine-meta">{x.d} · {x.rpe}</div>
                </div>
                <button className="routine-btn">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section-card">
          <div className="section-header">
            <h3 className="section-title">Acciones Rápidas</h3>
          </div>
          <div className="quick-actions">
            <button className="action-button" onClick={() => setShowSettings(true)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Editar Perfil</span>
            </button>
            <button className="action-button" onClick={() => setShowSettings(true)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>Vincular Strava</span>
            </button>
            <button className="action-button" onClick={logout}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="settings-modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h2>Configuración</h2>
              <button className="modal-close-btn" onClick={() => setShowSettings(false)}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="settings-modal-body">
              <div className="settings-section">
                <h3 className="settings-section-title">Perfil</h3>
                <div className="settings-options">
                  <button className="settings-option">
                    <div className="option-icon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="option-content">
                      <div className="option-title">Editar información personal</div>
                      <div className="option-desc">Nombre, ciudad, biografía</div>
                    </div>
                    <svg className="option-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button className="settings-option">
                    <div className="option-icon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div className="option-content">
                      <div className="option-title">Cambiar contraseña</div>
                      <div className="option-desc">Actualiza tu contraseña de acceso</div>
                    </div>
                    <svg className="option-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Integraciones</h3>
                <div className="settings-options">
                  <button className="settings-option highlight">
                    <div className="option-icon strava">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                      </svg>
                    </div>
                    <div className="option-content">
                      <div className="option-title">Conectar con Strava</div>
                      <div className="option-desc">Sincroniza automáticamente tus actividades</div>
                    </div>
                    <svg className="option-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button className="settings-option">
                    <div className="option-icon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="option-content">
                      <div className="option-title">Otras integraciones</div>
                      <div className="option-desc">Garmin, Polar, Suunto, etc.</div>
                    </div>
                    <svg className="option-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Notificaciones</h3>
                <div className="settings-options">
                  <div className="settings-toggle-option">
                    <div className="option-content">
                      <div className="option-title">Notificaciones push</div>
                      <div className="option-desc">Recibe alertas de actividad</div>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-option">
                    <div className="option-content">
                      <div className="option-title">Email semanal</div>
                      <div className="option-desc">Resumen de tu semana</div>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Screen>
  )
}
