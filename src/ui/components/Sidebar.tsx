import { useState } from 'react'
import { useStore } from '../../domain/useStore'
import './Sidebar.css'

const TABS = [
  { id: 'feed', label: 'Inicio', icon: 'home' },
  { id: 'communities', label: 'Comunidad', icon: 'users' },
  { id: 'calendar', label: 'Agenda', icon: 'calendar' },
  { id: 'nutrition', label: 'Nutrición', icon: 'apple' },
] as const

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const currentTab = useStore((s) => s.currentTab)
  const setCurrentTab = useStore((s) => s.setCurrentTab)
  const profile = useStore((s) => s.profile)

  const renderIcon = (iconName: string, isActive: boolean) => {
    const className = `sidebar-icon ${isActive ? 'active' : ''}`
    
    switch (iconName) {
      case 'home':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M9.5 21V15.5C9.5 14.9477 9.94772 14.5 10.5 14.5H13.5C14.0523 14.5 14.5 14.9477 14.5 15.5V21M4.5 10L12 3L19.5 10V19C19.5 19.5523 19.0523 20 18.5 20H5.5C4.94772 20 4.5 19.5523 4.5 19V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'users':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 4.5C17.1046 4.5 18 5.39543 18 6.5C18 7.60457 17.1046 8.5 16 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx="9" cy="16.5" rx="6" ry="3.5" stroke="currentColor" strokeWidth="2"/>
            <path d="M16.5 13.5C18.9853 13.5 21 14.7909 21 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'calendar':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.5 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16.5 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8.5" cy="14" r="1.2" fill="currentColor"/>
            <circle cx="12" cy="14" r="1.2" fill="currentColor"/>
            <circle cx="15.5" cy="14" r="1.2" fill="currentColor"/>
            <circle cx="8.5" cy="17.5" r="1.2" fill="currentColor"/>
            <circle cx="12" cy="17.5" r="1.2" fill="currentColor"/>
          </svg>
        )
      case 'apple':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M12 3C10.3431 3 9 4.34315 9 6V7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6C15 4.34315 13.6569 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 11C5 9.34315 6.34315 8 8 8H16C17.6569 8 19 9.34315 19 11V17C19 19.2091 17.2091 21 15 21H9C6.79086 21 5 19.2091 5 17V11Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'user':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 19.5C5 16.4624 7.46243 14 10.5 14H13.5C16.5376 14 19 16.4624 19 19.5V20.5H5V19.5Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {!isCollapsed && (
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#sidebarGradient)" />
                <path
                  d="M30 50h15l10-15 10 30 10-25h15"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="sidebarGradient" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#ff4d32" />
                    <stop offset="100%" stopColor="#ff6549" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="sidebar-brand-text">BASE</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`sidebar-item ${currentTab === tab.id ? 'sidebar-item-active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
            aria-label={tab.label}
            title={tab.label}
          >
            <div className="sidebar-item-icon">
              {renderIcon(tab.icon, currentTab === tab.id)}
            </div>
            {!isCollapsed && (
              <span className="sidebar-item-label">{tab.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className={`sidebar-profile ${isCollapsed ? 'collapsed' : ''} ${currentTab === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentTab('profile')}
          aria-label="Mi cuenta"
          title="Mi cuenta"
        >
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="sidebar-profile-avatar"
          />
          {!isCollapsed && (
            <div className="sidebar-profile-info">
              <div className="sidebar-profile-name">{profile.name}</div>
              <div className="sidebar-profile-username">@{profile.username}</div>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
