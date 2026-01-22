import { useState } from 'react'
import './CommentsModal.css'

interface Comment {
  id: string
  author: string
  avatar: string
  text: string
  time: string
  likes: number
  isLiked: boolean
}

interface CommentsModalProps {
  isOpen: boolean
  onClose: () => void
  activityId: string
  activityAuthor: string
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'Ana López',
    avatar: '👩‍🦱',
    text: '¡Increíble sesión! Me encanta tu constancia 💪',
    time: 'Hace 2h',
    likes: 5,
    isLiked: false,
  },
  {
    id: '2',
    author: 'Carlos Rodríguez',
    avatar: '👨‍🦲',
    text: '¿Qué zapatillas usaste? Estoy buscando unas nuevas',
    time: 'Hace 4h',
    likes: 2,
    isLiked: true,
  },
  {
    id: '3',
    author: 'María González',
    avatar: '👩‍🦰',
    text: 'Súper motivador! Mañana salgo a correr también 🏃‍♀️',
    time: 'Hace 6h',
    likes: 8,
    isLiked: false,
  },
]

export function CommentsModal({ isOpen, onClose }: CommentsModalProps) {
  const [comments, setComments] = useState(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Usuario Demo',
      avatar: '👤',
      text: newComment,
      time: 'Ahora',
      likes: 0,
      isLiked: false,
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const toggleLike = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, isLiked: !c.isLiked, likes: c.likes + (c.isLiked ? -1 : 1) }
        : c
    ))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comments-header">
          <h3>Comentarios</h3>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">{comment.avatar}</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <button 
                  className={`comment-like ${comment.isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(comment.id)}
                >
                  <svg viewBox="0 0 24 24" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5"/>
                  </svg>
                  {comment.likes > 0 && <span>{comment.likes}</span>}
                </button>
              </div>
            </div>
          ))}
        </div>

        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment-input-wrapper">
            <input
              type="text"
              placeholder="Añade un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button 
              type="submit" 
              className="send-btn"
              disabled={!newComment.trim()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
