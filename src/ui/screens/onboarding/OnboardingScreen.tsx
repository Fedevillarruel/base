import { useState, useEffect } from 'react'
import { Button, Input, Card } from '../../components/primitives'
import { useStore } from '../../../domain/useStore'
import { LATAM_CITIES } from '../../../domain/mockData'
import type { Sport, OnboardingData } from '../../../domain/types'
import './OnboardingScreen.css'

const GOALS = [
  { id: 'health', label: 'Salud y bienestar', icon: '❤️', description: 'Mantenerme activo y saludable' },
  { id: 'performance', label: 'Rendimiento', icon: '🏆', description: 'Mejorar mis tiempos y marcas' },
  { id: 'weight', label: 'Control de peso', icon: '⚖️', description: 'Alcanzar mi peso ideal' },
  { id: 'social', label: 'Social', icon: '👥', description: 'Entrenar con amigos' },
]

const LEVELS = [
  { id: 'beginner', label: 'Principiante', icon: '🌱', description: 'Empezando mi camino' },
  { id: 'intermediate', label: 'Intermedio', icon: '💪', description: 'Entreno regularmente' },
  { id: 'advanced', label: 'Avanzado', icon: '🔥', description: 'Atleta experimentado' },
  { id: 'elite', label: 'Elite', icon: '⭐', description: 'Nivel competitivo' },
]

const SPORTS = [
  { id: 'running', label: 'Running', icon: '🏃' },
  { id: 'cycling', label: 'Ciclismo', icon: '🚴' },
  { id: 'swim', label: 'Natación', icon: '🏊' },
  { id: 'triathlon', label: 'Triatlón', icon: '🏊🚴🏃' },
  { id: 'strength', label: 'Fuerza', icon: '💪' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
]

export function OnboardingScreen() {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState<OnboardingData['goal']>('health')
  const [level, setLevel] = useState<OnboardingData['level']>('beginner')
  const [sports, setSports] = useState<Sport[]>(['running'])
  const [city, setCity] = useState('')
  const [cityPlaceholder, setCityPlaceholder] = useState('Buenos Aires, Argentina')

  const completeOnboarding = useStore((s) => s.completeOnboarding)

  // Simular detección de ciudad por IP
  useEffect(() => {
    const randomCity = LATAM_CITIES[Math.floor(Math.random() * LATAM_CITIES.length)]
    setCityPlaceholder(randomCity)
  }, [])

  const handleFinish = () => {
    const finalCity = city || cityPlaceholder
    completeOnboarding({
      goal,
      level,
      sports,
      city: finalCity,
      weeklyHours: level === 'beginner' ? 3 : level === 'intermediate' ? 6 : level === 'advanced' ? 10 : 15,
    })
  }

  const toggleSport = (sport: Sport) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    )
  }

  return (
    <div className="onboarding-screen">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <span className="progress-text">Paso {step} de 3</span>
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">¿Cuál es tu objetivo principal?</h1>
            <p className="onboarding-subtitle">
              Esto nos ayudará a personalizar tu experiencia en BASE
            </p>
            <div className="options-grid">
              {GOALS.map((item) => (
                <Card key={item.id} onClick={() => setGoal(item.id as any)}>
                  <div className={`option-card ${goal === item.id ? 'option-selected' : ''}`}>
                    <span className="option-icon">{item.icon}</span>
                    <h3 className="option-label">{item.label}</h3>
                    <p className="option-description">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="primary" fullWidth size="lg" onClick={() => setStep(2)}>
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">¿Cuál es tu nivel de experiencia?</h1>
            <p className="onboarding-subtitle">
              Selecciona el nivel que mejor te describa
            </p>
            <div className="options-grid">
              {LEVELS.map((item) => (
                <Card key={item.id} onClick={() => setLevel(item.id as any)}>
                  <div className={`option-card ${level === item.id ? 'option-selected' : ''}`}>
                    <span className="option-icon">{item.icon}</span>
                    <h3 className="option-label">{item.label}</h3>
                    <p className="option-description">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="button-group">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button variant="primary" onClick={() => setStep(3)}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">¿Qué deportes practicas?</h1>
            <p className="onboarding-subtitle">
              Puedes seleccionar varios
            </p>
            <div className="sports-grid">
              {SPORTS.map((sport) => (
                <button
                  key={sport.id}
                  className={`sport-btn ${sports.includes(sport.id as Sport) ? 'sport-selected' : ''}`}
                  onClick={() => toggleSport(sport.id as Sport)}
                >
                  <span className="sport-icon">{sport.icon}</span>
                  <span className="sport-label">{sport.label}</span>
                </button>
              ))}
            </div>
            <Input
              label="¿En qué ciudad entrenas?"
              placeholder={cityPlaceholder}
              value={city}
              onChange={setCity}
            />
            <div className="button-group">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button variant="primary" onClick={handleFinish} disabled={sports.length === 0}>
                Finalizar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
