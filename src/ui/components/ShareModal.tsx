import './ShareModal.css'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  activityTitle: string
}

const SHARE_OPTIONS = [
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    color: '#25D366',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    color: '#E4405F',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    color: '#1877F2',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
  },
  { 
    id: 'twitter', 
    name: 'X (Twitter)', 
    color: '#000000',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg'
  },
  { 
    id: 'telegram', 
    name: 'Telegram', 
    color: '#0088cc',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
  },
  { 
    id: 'copy', 
    name: 'Copiar enlace', 
    color: '#6366f1',
    icon: null // Will use SVG
  },
]

export function ShareModal({ isOpen, onClose, activityTitle }: ShareModalProps) {
  if (!isOpen) return null

  const handleShare = (platform: string) => {
    // Mock de compartir
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado!')
    } else {
      alert(`Compartiendo en ${platform} (Demo)`)
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-header">
          <h3>Compartir actividad</h3>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className="share-title">{activityTitle}</p>

        <div className="share-options">
          {SHARE_OPTIONS.map((option) => (
            <button
              key={option.id}
              className="share-option"
              onClick={() => handleShare(option.id)}
              style={{ '--share-color': option.color } as React.CSSProperties}
            >
              <div className="share-icon">
                {option.icon ? (
                  <img src={option.icon} alt={option.name} className="share-icon-img" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="share-name">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
