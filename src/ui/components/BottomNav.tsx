import { useStore } from '../../domain/useStore'
import './BottomNav.css'

const TABS = [
  { id: 'feed', label: 'Inicio', icon: 'home' },
  { id: 'communities', label: 'Comunidad', icon: 'users' },
  { id: 'calendar', label: 'Agenda', icon: 'calendar' },
  { id: 'nutrition', label: 'Nutrición', icon: 'apple' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
] as const

export function BottomNav() {
  const currentTab = useStore((s) => s.currentTab)
  const setCurrentTab = useStore((s) => s.setCurrentTab)
  const unreadCount = useStore((s) => s.unreadCount)

  const renderIcon = (iconName: string, isActive: boolean) => {
    const className = `nav-icon-svg ${isActive ? 'active' : ''}`
    
    switch (iconName) {
      case 'home':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M9.5 21V15.5C9.5 14.9477 9.94772 14.5 10.5 14.5H13.5C14.0523 14.5 14.5 14.9477 14.5 15.5V21M4.5 10L12 3L19.5 10V19C19.5 19.5523 19.0523 20 18.5 20H5.5C4.94772 20 4.5 19.5523 4.5 19V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'users':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 4.5C17.1046 4.5 18 5.39543 18 6.5C18 7.60457 17.1046 8.5 16 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="9" cy="16.5" rx="6" ry="3.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16.5 13.5C18.9853 13.5 21 14.7909 21 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'calendar':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.5 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16.5 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8.5" cy="14" r="1" fill="currentColor"/>
            <circle cx="12" cy="14" r="1" fill="currentColor"/>
            <circle cx="15.5" cy="14" r="1" fill="currentColor"/>
            <circle cx="8.5" cy="17.5" r="1" fill="currentColor"/>
            <circle cx="12" cy="17.5" r="1" fill="currentColor"/>
          </svg>
        )
      case 'apple':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M12 3C10.3431 3 9 4.34315 9 6V7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6C15 4.34315 13.6569 3 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 11C5 9.34315 6.34315 8 8 8H16C17.6569 8 19 9.34315 19 11V17C19 19.2091 17.2091 21 15 21H9C6.79086 21 5 19.2091 5 17V11Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'user':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 19.5C5 16.4624 7.46243 14 10.5 14H13.5C16.5376 14 19 16.4624 19 19.5V20.5H5V19.5Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${currentTab === tab.id ? 'nav-item-active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
            aria-label={tab.label}
            title={tab.label}
          >
            <span className="nav-icon">
              {renderIcon(tab.icon, currentTab === tab.id)}
              {tab.id === 'profile' && unreadCount > 0 && (
                <span className="nav-badge">{unreadCount}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
