import { useState, useEffect } from 'react'
import { useStore } from '../../../domain/useStore'
import { Screen } from '../../components/Screen'
import { Card } from '../../components/primitives'
import { RankingsSection } from '../../components/RankingsSection'
import { CommunityDetailModal } from '../../components/CommunityDetailModal'
import { WelcomePopup } from '../../components/WelcomePopup'
import type { Community } from '../../../domain/types'
import './CommunitiesScreen.css'

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <button className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span className="notification-badge">2</span>
    </button>
  )
}

export function CommunitiesScreen() {
  const communities = useStore((s) => s.communities)
  const joinCommunity = useStore((s) => s.joinCommunity)
  const leaveCommunity = useStore((s) => s.leaveCommunity)
  
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [addedFriends, setAddedFriends] = useState<string[]>([])
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenCommunitiesWelcome = sessionStorage.getItem('hasSeenCommunitiesWelcome')
    if (!hasSeenCommunitiesWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    sessionStorage.setItem('hasSeenCommunitiesWelcome', 'true')
  }

  // Mock friends data for search
  const mockFriends = [
    { id: '1', name: 'María González', username: '@mariagonzalez', sport: '🏃‍♀️ Running', city: 'Buenos Aires', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Carlos Rodríguez', username: '@carlosr', sport: '🚴‍♂️ Ciclismo', city: 'Santiago', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Ana Martínez', username: '@anamtz', sport: '🏊‍♀️ Natación', city: 'Ciudad de México', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '4', name: 'Luis Fernández', username: '@luisf', sport: '⚽ Fútbol', city: 'Bogotá', avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: '5', name: 'Sofía López', username: '@sofialopez', sport: '🏃‍♀️ Running', city: 'Lima', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '6', name: 'Diego Ramírez', username: '@diegor', sport: '🏋️‍♂️ Gym', city: 'Montevideo', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: '7', name: 'Valentina Torres', username: '@valentinatorres', sport: '🧘‍♀️ Yoga', city: 'Quito', avatar: 'https://i.pravatar.cc/150?img=20' },
    { id: '8', name: 'Javier Castro', username: '@javierc', sport: '🚴‍♂️ Ciclismo', city: 'Asunción', avatar: 'https://i.pravatar.cc/150?img=52' },
  ]

  const handleCommunityClick = (community: Community) => {
    setSelectedCommunity(community)
    setDetailOpen(true)
  }

  const handleAddFriend = (friendId: string) => {
    setAddedFriends(prev => [...prev, friendId])
  }

  const handleToggleJoin = () => {
    if (!selectedCommunity) return
    
    if (selectedCommunity.isJoined) {
      leaveCommunity(selectedCommunity.id)
    } else {
      joinCommunity(selectedCommunity.id)
    }
    
    // Update local state
    setSelectedCommunity({
      ...selectedCommunity,
      isJoined: !selectedCommunity.isJoined,
      members: selectedCommunity.isJoined 
        ? selectedCommunity.members - 1 
        : selectedCommunity.members + 1
    })
  }

  return (
    <Screen 
      title="Comunidades"
      action={
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <NotificationBell />
          <button className="search-btn" onClick={() => setShowSearchModal(true)}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      }
    >
      {showWelcome && (
        <WelcomePopup
          title="Comunidades"
          description="Encuentra y únete a grupos de deportistas que comparten tus pasiones"
          features={[
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
              title: 'Grupos por Deporte',
              text: 'Comunidades especializadas: running, ciclismo, natación, triatlón y más.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
              title: 'Búsqueda de Amigos',
              text: 'Encuentra y agrega amigos, ve su progreso y entrena juntos.'
            },
            {
              icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
              title: 'Rankings y Logros',
              text: 'Compite sanamente con rankings semanales y logros destacados.'
            }
          ]}
          onClose={handleCloseWelcome}
        />
      )}
      <div className="communities-container">
        {/* Rankings Section */}
        <RankingsSection />
        
        {/* Communities Intro */}
        <h2 className="communities-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m16-13a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Comunidades
        </h2>
        <p className="communities-intro">
          Únete a comunidades de deportistas con tus mismos intereses
        </p>
        
        {/* Communities List */}
        <div className="communities-list">
          {communities.map((community) => (
            <Card 
              key={community.id} 
              onClick={() => handleCommunityClick(community)}
            >
              <div
                className="community-cover"
                style={{ 
                  backgroundImage: community.cover.startsWith('http') 
                    ? `url(${community.cover})` 
                    : undefined,
                  background: community.cover.startsWith('linear-gradient') || community.cover.startsWith('http') === false
                    ? community.cover 
                    : undefined 
                }}
              />
              <div className="community-content">
                <h3 className="community-name">{community.name}</h3>
                <p className="community-description">{community.description}</p>
                <div className="community-meta">
                  <span className="community-members">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m16-13a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {community.members.toLocaleString()} miembros
                  </span>
                  <button 
                    className={`community-badge-btn ${community.isJoined ? 'joined' : ''}`}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation()
                      if (community.isJoined) {
                        leaveCommunity(community.id)
                      } else {
                        joinCommunity(community.id)
                      }
                    }}
                  >
                    {community.isJoined ? 'Unido ✓' : 'Unirse +'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <CommunityDetailModal
        community={selectedCommunity}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onToggleJoin={handleToggleJoin}
      />

      {/* Search Friends Modal */}
      {showSearchModal && (
        <div className="search-modal-overlay" onClick={() => setShowSearchModal(false)}>
          <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h2>Buscar Amigos</h2>
              <button className="search-modal-close" onClick={() => setShowSearchModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="search-modal-input-wrapper">
              <svg className="search-modal-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-modal-input"
                placeholder="Buscar por nombre, deporte o ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className="search-modal-results">
              {searchQuery === '' ? (
                <div className="search-modal-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>Comienza a buscar amigos deportistas</p>
                </div>
              ) : (
                <>
                  {mockFriends
                    .filter(f =>
                      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      f.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      f.city.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(friend => (
                      <div key={friend.id} className="search-friend-card">
                        <img src={friend.avatar} alt={friend.name} className="search-friend-avatar" />
                        <div className="search-friend-info">
                          <h3 className="search-friend-name">{friend.name}</h3>
                          <p className="search-friend-username">{friend.username}</p>
                          <div className="search-friend-meta">
                            <span>{friend.sport}</span>
                            <span>•</span>
                            <span>{friend.city}</span>
                          </div>
                        </div>
                        <button
                          className={`search-friend-btn ${addedFriends.includes(friend.id) ? 'added' : ''}`}
                          onClick={() => handleAddFriend(friend.id)}
                          disabled={addedFriends.includes(friend.id)}
                        >
                          {addedFriends.includes(friend.id) ? (
                            <>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Agregado
                            </>
                          ) : (
                            <>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Agregar
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  {mockFriends.filter(f =>
                    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    f.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    f.city.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="search-modal-empty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>No se encontraron resultados</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Screen>
  )
}
