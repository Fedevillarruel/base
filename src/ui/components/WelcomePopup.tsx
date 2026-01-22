import './WelcomePopup.css'

type WelcomePopupProps = {
  title: string
  description: string
  features: Array<{
    icon: React.ReactNode
    title: string
    text: string
  }>
  onClose: () => void
}

export function WelcomePopup({ title, description, features, onClose }: WelcomePopupProps) {
  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="welcome-features">
          {features.map((feature, idx) => (
            <div key={idx} className="welcome-feature">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="welcome-close-btn" onClick={onClose}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Entendido
        </button>

        <a 
          href="https://fedini.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="welcome-credit"
        >
          Demo by Fedini
        </a>
      </div>
    </div>
  )
}
