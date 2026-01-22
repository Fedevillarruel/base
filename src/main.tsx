import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/App'
import './index.css'

// Inicializar datos mock
import { useStore } from './domain/useStore'
import { id } from './domain/ids'

// Datos iniciales de demostración
const initializeMockData = () => {
  const store = useStore.getState()
  
  // Mock communities
  store.communities = [
    {
      id: id('com'),
      name: 'Running Buenos Aires',
      sport: 'running',
      description: 'Comunidad de corredores de Buenos Aires',
      members: 1247,
      cover: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400',
      isJoined: true,
    },
    {
      id: id('com'),
      name: 'Triatletas Argentina',
      sport: 'triathlon',
      description: 'Para amantes del triatlón',
      members: 523,
      cover: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400',
      isJoined: false,
    },
  ]

  // Mock recipes
  store.recipes = [
    {
      id: id('rec'),
      title: 'Bowl de Quinoa y Pollo',
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      prepTime: 25,
      calories: 450,
      protein: 35,
      carbs: 45,
      fats: 12,
      ingredients: ['Quinoa', 'Pechuga de pollo', 'Vegetales'],
      steps: ['Cocinar quinoa', 'Grillar pollo', 'Mezclar'],
      author: '@memimandaa',
    },
  ]

  // Mock goals
  store.goals = [
    {
      id: id('goal'),
      type: 'distance',
      target: 1000,
      current: 847,
      unit: 'km',
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

initializeMockData()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
