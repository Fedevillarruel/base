import './StravaOAuthModal.css'

interface StravaOAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StravaOAuthModal({ isOpen, onClose }: StravaOAuthModalProps) {
  if (!isOpen) return null

  return (
    <div className="oauth-modal-overlay" onClick={onClose}>
      <div className="oauth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="oauth-modal-header">
          <div className="oauth-modal-logo">
            <img 
              src="https://developers.strava.com/images/strava_logo_nav.png" 
              alt="Strava" 
              className="oauth-strava-logo"
            />
          </div>
          <button className="oauth-close-btn" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="oauth-modal-content">
          <h2 className="oauth-title">¡Redirigiendo a Strava!</h2>
          <p className="oauth-subtitle">(Demo)</p>
          
          <div className="oauth-info-box">
            <div className="oauth-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="oauth-info-text">
              En producción, esto abriría el flujo OAuth de Strava para autorizar de forma segura el acceso a tus datos.
            </p>
          </div>

          <div className="oauth-features">
            <h3 className="oauth-features-title">Beneficios de conectar</h3>
            <ul className="oauth-features-list">
              <li className="oauth-feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Sincronización automática de actividades</span>
              </li>
              <li className="oauth-feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Métricas detalladas en tiempo real</span>
              </li>
              <li className="oauth-feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Compartir logros al instante</span>
              </li>
            </ul>
          </div>

          <button className="oauth-btn" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
