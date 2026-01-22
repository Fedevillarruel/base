import { useState } from 'react'
import { Button, Input } from '../../components/primitives'
import { useStore } from '../../../domain/useStore'
import { id } from '../../../domain/ids'
import './AuthScreen.css'

export function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useStore((s) => s.login)

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    // Mock login
    const mockUser = {
      id: id('user'),
      name: provider === 'apple' ? 'Juan Pérez' : 'María González',
      username: provider === 'apple' ? 'juanp' : 'mariag',
      avatar: `https://i.pravatar.cc/150?u=${provider}`,
      bio: 'Apasionado del running y triatlón 🏃‍♂️🚴‍♂️🏊‍♂️',
      level: 'intermediate' as const,
      city: 'Buenos Aires',
      totalKm: 847,
      totalActivities: 92,
      followers: 234,
      following: 189,
      isPro: false,
    }
    login(mockUser)
  }

  const handleEmailLogin = () => {
    const mockUser = {
      id: id('user'),
      name: name || 'Atleta BASE',
      username: email.split('@')[0],
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      bio: 'Nuevo en BASE 💪',
      level: 'beginner' as const,
      city: 'Buenos Aires',
      totalKm: 0,
      totalActivities: 0,
      followers: 0,
      following: 0,
      isPro: false,
    }
    login(mockUser)
  }

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo">
            <svg viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#brandGradient)" />
              <path
                d="M30 50h15l10-15 10 30 10-25h15"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#ff4d32" />
                  <stop offset="100%" stopColor="#ff6549" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="auth-title">BASE</h1>
          <p className="auth-subtitle">Tu entrenamiento integral</p>
        </div>

        <div className="auth-form">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'auth-tab-active' : ''}`}
              onClick={() => setMode('login')}
            >
              Iniciar sesión
            </button>
            <button
              className={`auth-tab ${mode === 'register' ? 'auth-tab-active' : ''}`}
              onClick={() => setMode('register')}
            >
              Registrarse
            </button>
          </div>

          <div className="auth-social">
            <Button
              variant="secondary"
              fullWidth
              icon={<AppleIcon />}
              onClick={() => handleSocialLogin('apple')}
            >
              Continuar con Apple
            </Button>
            <Button
              variant="secondary"
              fullWidth
              icon={<GoogleIcon />}
              onClick={() => handleSocialLogin('google')}
            >
              Continuar con Google
            </Button>
          </div>

          <div className="auth-divider">
            <span>o continuar con email</span>
          </div>

          {mode === 'register' && (
            <Input
              label="Nombre completo"
              placeholder="Tu nombre"
              value={name}
              onChange={setName}
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={setEmail}
          />

          <div className="password-field-wrapper">
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
            />
            <button 
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {mode === 'login' && (
            <a href="#" className="auth-forgot">
              ¿Olvidaste tu contraseña?
            </a>
          )}

          <Button variant="primary" fullWidth size="lg" onClick={handleEmailLogin}>
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </Button>

          <p className="auth-terms">
            Al continuar, aceptas nuestros{' '}
            <a href="#">Términos de servicio</a> y{' '}
            <a href="#">Política de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
