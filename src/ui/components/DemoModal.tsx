import { useState, useEffect } from 'react'
import './DemoModal.css'

export function DemoModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('base-demo-modal-seen')
    if (!hasSeenModal) {
      setShow(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('base-demo-modal-seen', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="demo-modal-overlay">
      <div className="demo-modal">
        <button className="demo-modal-close" onClick={handleClose}>
          ✕
        </button>
        
        <div className="demo-modal-header">
          <div className="demo-modal-icon">
            <img 
              src="https://jtujtceemarxedagazge.supabase.co/storage/v1/object/public/business-photos/app-icon-logos/logo3.png" 
              alt="BASE Logo"
              className="demo-modal-logo"
            />
          </div>
          <h2 className="demo-modal-title">
            ✨ Versión Demo del Proyecto
          </h2>
        </div>

        <div className="demo-modal-content">
          <p className="demo-modal-intro">
            Este sitio es una <strong>demostración técnica</strong> del proyecto BASE. 
            Todos los textos, imágenes, colores y funcionalidades son{' '}
            <strong className="highlight">100% personalizables</strong> según las 
            necesidades reales de tu empresa.
          </p>

          <p className="demo-modal-subtitle">
            El contenido actual es ilustrativo y será reemplazado con información 
            auténtica en la versión final.
          </p>

          <div className="demo-features">
            <div className="demo-feature">
              <span className="demo-feature-icon">T</span>
              <span className="demo-feature-text">Textos editables</span>
            </div>
            <div className="demo-feature">
              <span className="demo-feature-icon">🎨</span>
              <span className="demo-feature-text">Imágenes personalizables</span>
            </div>
            <div className="demo-feature">
              <span className="demo-feature-icon">🎨</span>
              <span className="demo-feature-text">Colores ajustables</span>
            </div>
            <div className="demo-feature">
              <span className="demo-feature-icon">⚙️</span>
              <span className="demo-feature-text">Funciones configurables</span>
            </div>
          </div>
        </div>

        <button className="demo-modal-button" onClick={handleClose}>
          Entendido
        </button>

        <div className="demo-modal-footer">
          powered by <strong>Fedini</strong>
        </div>
      </div>
    </div>
  )
}
