import { useState, useEffect } from 'react'
import { StravaOAuthModal } from './StravaOAuthModal'
import './StravaBanner.css'

export function StravaBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('strava-banner-dismissed')
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('strava-banner-dismissed', 'true')
  }

  const handleConnect = () => {
    setShowModal(true)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="strava-banner">
        <button className="strava-banner-close" onClick={handleDismiss} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="strava-banner-content">
          <div className="strava-banner-icon">
            <img 
              src="https://developers.strava.com/images/strava_logo_nav.png" 
              alt="Strava" 
              className="strava-logo"
            />
          </div>
          
          <div className="strava-banner-text">
            <h3 className="strava-banner-title">Conecta con Strava</h3>
            <p className="strava-banner-description">
              Sincroniza tus entrenamientos automáticamente y comparte tus logros en tiempo real
            </p>
          </div>
          
          <button className="strava-banner-cta" onClick={handleConnect}>
            <span>Conectar ahora</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14m-7-7l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <StravaOAuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  )
}
