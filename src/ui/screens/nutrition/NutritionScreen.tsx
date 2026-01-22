import { useState, useEffect } from 'react'
import { Screen } from '../../components/Screen'
import { Input } from '../../components/primitives'
import { WelcomePopup } from '../../components/WelcomePopup'
import { useStore } from '../../../domain/useStore'
import './NutritionScreen.css'

type WorkoutType = 'strength' | 'cardio' | 'rest' | 'none'
type RecipeCategory = 'pre-workout' | 'post-workout' | 'anti-inflammatory' | 'sleep' | 'all'
type UserGoal = 'muscle-gain' | 'fat-loss' | 'maintenance'

type Recipe = {
  id: string
  title: string
  category: RecipeCategory
  image: string
  prepTime: number
  baseMacros: {
    calories: number
    protein: number
    carbs: number
    fats: number
  }
  ingredients: Array<{
    name: string
    baseAmount: number
    unit: string
    multiplier: { [key in UserGoal]: number }
  }>
  instructions: string[]
  tags: string[]
  expertNote?: string
}

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Tortitas de Avena y Plátano',
    category: 'pre-workout',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    prepTime: 10,
    baseMacros: { calories: 320, protein: 18, carbs: 52, fats: 6 },
    ingredients: [
      { name: 'Avena', baseAmount: 60, unit: 'g', multiplier: { 'muscle-gain': 1.3, 'fat-loss': 0.8, 'maintenance': 1 } },
      { name: 'Plátano maduro', baseAmount: 1, unit: 'unidad', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.8, 'maintenance': 1 } },
      { name: 'Huevos', baseAmount: 2, unit: 'unidades', multiplier: { 'muscle-gain': 1, 'fat-loss': 1, 'maintenance': 1 } },
      { name: 'Canela', baseAmount: 1, unit: 'cdta', multiplier: { 'muscle-gain': 1, 'fat-loss': 1, 'maintenance': 1 } },
    ],
    instructions: ['Mezcla todos los ingredientes', 'Cocina en sartén 2-3 min por lado', 'Sirve caliente'],
    tags: ['Bajo en fibra', 'Carbos rápidos', 'Energía inmediata'],
    expertNote: 'Ideal 45-60min antes del entreno. Los carbos simples del plátano dan energía rápida sin causar molestias digestivas.'
  },
  {
    id: '2',
    title: 'Bowl de Pollo y Arroz',
    category: 'post-workout',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    prepTime: 25,
    baseMacros: { calories: 520, protein: 45, carbs: 58, fats: 10 },
    ingredients: [
      { name: 'Pechuga de pollo', baseAmount: 150, unit: 'g', multiplier: { 'muscle-gain': 1.33, 'fat-loss': 0.8, 'maintenance': 1 } },
      { name: 'Arroz blanco cocido', baseAmount: 150, unit: 'g', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.7, 'maintenance': 1 } },
      { name: 'Brócoli', baseAmount: 100, unit: 'g', multiplier: { 'muscle-gain': 1, 'fat-loss': 1.5, 'maintenance': 1 } },
      { name: 'Aceite de oliva', baseAmount: 5, unit: 'ml', multiplier: { 'muscle-gain': 1, 'fat-loss': 0.6, 'maintenance': 1 } },
    ],
    instructions: ['Cocina el pollo a la plancha', 'Hierve el arroz', 'Saltea el brócoli', 'Mezcla y sirve'],
    tags: ['Alta proteína', 'Recarga glucógeno', 'Recuperación'],
    expertNote: 'Consumir en la primera hora post-entreno. Alta densidad proteica para reparación muscular y carbos de índice glucémico medio-alto para reponer reservas.'
  },
  {
    id: '3',
    title: 'Salmón con Cúrcuma y Quinoa',
    category: 'anti-inflammatory',
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    prepTime: 30,
    baseMacros: { calories: 480, protein: 36, carbs: 38, fats: 20 },
    ingredients: [
      { name: 'Filete de salmón', baseAmount: 140, unit: 'g', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.9, 'maintenance': 1 } },
      { name: 'Quinoa cocida', baseAmount: 100, unit: 'g', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.8, 'maintenance': 1 } },
      { name: 'Cúrcuma', baseAmount: 1, unit: 'cdta', multiplier: { 'muscle-gain': 1, 'fat-loss': 1, 'maintenance': 1 } },
      { name: 'Espinaca', baseAmount: 80, unit: 'g', multiplier: { 'muscle-gain': 1, 'fat-loss': 1.5, 'maintenance': 1 } },
    ],
    instructions: ['Cocina el salmón con cúrcuma', 'Prepara la quinoa', 'Saltea las espinacas', 'Combina y disfruta'],
    tags: ['Omega-3', 'Antioxidantes', 'Reduce agujetas'],
    expertNote: 'Rico en Omega-3 y cúrcuma antiinflamatoria. Perfecto después de entrenamientos intensos para reducir el dolor muscular y acelerar la recuperación.'
  },
  {
    id: '4',
    title: 'Yogur Griego con Nueces y Miel',
    category: 'sleep',
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    prepTime: 5,
    baseMacros: { calories: 280, protein: 22, carbs: 26, fats: 12 },
    ingredients: [
      { name: 'Yogur griego', baseAmount: 200, unit: 'g', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.8, 'maintenance': 1 } },
      { name: 'Nueces', baseAmount: 20, unit: 'g', multiplier: { 'muscle-gain': 1, 'fat-loss': 0.7, 'maintenance': 1 } },
      { name: 'Miel', baseAmount: 10, unit: 'g', multiplier: { 'muscle-gain': 1.2, 'fat-loss': 0.5, 'maintenance': 1 } },
      { name: 'Plátano', baseAmount: 0.5, unit: 'unidad', multiplier: { 'muscle-gain': 1, 'fat-loss': 0.8, 'maintenance': 1 } },
    ],
    instructions: ['Mezcla el yogur con la miel', 'Añade las nueces troceadas', 'Decora con plátano', 'Listo para disfrutar'],
    tags: ['Triptófano', 'Magnesio', 'Mejor descanso'],
    expertNote: 'El triptófano del yogur y el magnesio de las nueces mejoran la calidad del sueño. Ideal consumir 1-2h antes de dormir para optimizar la recuperación nocturna.'
  },
]

export function NutritionScreen() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('all')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  // Obtener datos del usuario desde el store
  const onboardingData = useStore((state) => state.onboardingData)
  
  // Detectar objetivo del usuario basado en onboarding
  const userGoal: UserGoal = 
    onboardingData?.goal === 'performance' || onboardingData?.goal === 'health' ? 'muscle-gain' :
    onboardingData?.goal === 'weight' ? 'fat-loss' : 
    'maintenance'

  // Detectar tipo de entreno de hoy basado en deportes del usuario
  // En producción esto vendría del historial de entrenamientos
  const todayWorkout: WorkoutType = 
    onboardingData?.sports?.includes('strength') || onboardingData?.sports?.includes('gym') ? 'strength' :
    onboardingData?.sports?.includes('running') || onboardingData?.sports?.includes('cycling') ? 'cardio' :
    'rest'

  // Mostrar welcome popup solo la primera vez
  useEffect(() => {
    const hasSeenNutritionWelcome = sessionStorage.getItem('hasSeenNutritionWelcome')
    if (!hasSeenNutritionWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    sessionStorage.setItem('hasSeenNutritionWelcome', 'true')
  }

  // Filtrar recetas
  const filteredRecipes = MOCK_RECIPES.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Calcular macros ajustados según objetivo
  const calculateAdjustedMacros = (recipe: Recipe) => {
    const multiplier = userGoal === 'muscle-gain' ? 1.2 : userGoal === 'fat-loss' ? 0.8 : 1
    return {
      calories: Math.round(recipe.baseMacros.calories * multiplier),
      protein: Math.round(recipe.baseMacros.protein * multiplier),
      carbs: Math.round(recipe.baseMacros.carbs * multiplier),
      fats: Math.round(recipe.baseMacros.fats * multiplier),
    }
  }

  // Recomendación inteligente según entreno de hoy (future feature)
  // const getSmartRecommendation = () => {
  //   if (todayWorkout === 'strength') return 'pre-workout'
  //   if (todayWorkout === 'cardio') return 'post-workout'
  //   if (todayWorkout === 'rest') return 'anti-inflammatory'
  //   return 'all'
  // }

  return (
    <Screen title="Nutrición">
      <div className="nutrition-container">
        
        {/* Welcome Popup */}
        {showWelcome && (
          <WelcomePopup
            title="Nutrición Inteligente"
            description="Tu plan nutricional se adapta automáticamente a tus entrenamientos y objetivos"
            features={[
              {
                icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: 'Sincronización Automática',
                text: 'Las recetas se ajustan según tu actividad del día: fuerza, cardio o descanso.'
              },
              {
                icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: 'Porciones Dinámicas',
                text: `Tus ingredientes se calculan automáticamente para ${userGoal === 'muscle-gain' ? 'ganar músculo' : userGoal === 'fat-loss' ? 'perder grasa' : 'mantenimiento'}.`
              },
              {
                icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: 'Validado por Expertos',
                text: 'Cada receta tiene el aval de nutricionistas deportivos con fundamento científico.'
              }
            ]}
            onClose={handleCloseWelcome}
          />
        )}

        {/* Banner de Estado del Usuario */}
        <div className="nutrition-smart-system">
          <div className="smart-header">
            <div className="smart-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="smart-text">
              <h3>Nutrición Adaptativa</h3>
              <p>Basado en tu perfil: {onboardingData?.sports?.join(', ') || 'Running'}</p>
            </div>
          </div>

          {/* Recomendación Inteligente */}
          <div className="smart-recommendation">
            <svg className="rec-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div className="rec-text">
              {todayWorkout === 'strength' && <p><strong>Perfil de Fuerza:</strong> Recetas optimizadas con alta proteína y carbohidratos complejos para construcción muscular</p>}
              {todayWorkout === 'cardio' && <p><strong>Perfil Cardio:</strong> Recetas con carbohidratos de fácil digestión para energía y recuperación rápida</p>}
              {todayWorkout === 'rest' && <p><strong>Día de Recuperación:</strong> Recetas antiinflamatorias y ricas en fibra para maximizar tu descanso</p>}
            </div>
          </div>
        </div>

        {/* Categorías por Función Fisiológica */}
        <div className="category-filters">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span className="cat-icon">🍽️</span>
            <span className="cat-label">Todas</span>
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'pre-workout' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('pre-workout')}
          >
            <span className="cat-icon">⚡</span>
            <span className="cat-label">Pre-Entreno</span>
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'post-workout' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('post-workout')}
          >
            <span className="cat-icon">🔋</span>
            <span className="cat-label">Post-Entreno</span>
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'anti-inflammatory' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('anti-inflammatory')}
          >
            <span className="cat-icon">🧬</span>
            <span className="cat-label">Anti-inflamatorias</span>
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'sleep' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('sleep')}
          >
            <span className="cat-icon">🌙</span>
            <span className="cat-label">Sueño</span>
          </button>
        </div>

        <Input
          placeholder="Buscar recetas..."
          value={search}
          onChange={setSearch}
          icon={<span>🔍</span>}
        />

        <div className="recipes-list">
          {filteredRecipes.map((recipe) => {
            const adjustedMacros = calculateAdjustedMacros(recipe)
            
            return (
              <div key={recipe.id} className="recipe-card" onClick={() => setSelectedRecipe(recipe)}>
                <div
                  className="recipe-image"
                  style={{ background: recipe.image }}
                >
                  <span className="recipe-time">⏱️ {recipe.prepTime} min</span>
                  <div className="recipe-tags">
                    {recipe.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="recipe-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  
                  {/* Gráfico de Macros */}
                  <div className="macros-chart">
                    <div className="macro-donut">
                      <svg viewBox="0 0 36 36" className="donut-svg">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1a1a2e20" strokeWidth="3" />
                        <circle 
                          cx="18" cy="18" r="15.5" fill="none" 
                          stroke="#667eea" strokeWidth="3"
                          strokeDasharray={`${(adjustedMacros.protein / (adjustedMacros.protein + adjustedMacros.carbs + adjustedMacros.fats)) * 100} 100`}
                          transform="rotate(-90 18 18)"
                        />
                        <circle 
                          cx="18" cy="18" r="15.5" fill="none" 
                          stroke="#f093fb" strokeWidth="3"
                          strokeDasharray={`${(adjustedMacros.carbs / (adjustedMacros.protein + adjustedMacros.carbs + adjustedMacros.fats)) * 100} 100`}
                          strokeDashoffset={`-${(adjustedMacros.protein / (adjustedMacros.protein + adjustedMacros.carbs + adjustedMacros.fats)) * 100}`}
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="donut-center">
                        <span className="donut-cals">{adjustedMacros.calories}</span>
                        <span className="donut-label">kcal</span>
                      </div>
                    </div>
                    <div className="macros-breakdown">
                      <div className="macro-item">
                        <span className="macro-color" style={{ background: '#667eea' }}></span>
                        <span className="macro-name">P</span>
                        <span className="macro-value">{adjustedMacros.protein}g</span>
                      </div>
                      <div className="macro-item">
                        <span className="macro-color" style={{ background: '#f093fb' }}></span>
                        <span className="macro-name">C</span>
                        <span className="macro-value">{adjustedMacros.carbs}g</span>
                      </div>
                      <div className="macro-item">
                        <span className="macro-color" style={{ background: '#4facfe' }}></span>
                        <span className="macro-name">G</span>
                        <span className="macro-value">{adjustedMacros.fats}g</span>
                      </div>
                    </div>
                  </div>

                  {/* Nota del Experto */}
                  {recipe.expertNote && (
                    <div className="expert-note">
                      <div className="expert-badge">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Nutricionista
                      </div>
                      <p>{recipe.expertNote}</p>
                    </div>
                  )}

                  {/* Ajuste Dinámico de Porciones */}
                  <div className="portion-indicator">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span>
                      {userGoal === 'muscle-gain' && 'Porciones aumentadas para ganancia muscular'}
                      {userGoal === 'fat-loss' && 'Porciones reducidas para déficit calórico'}
                      {userGoal === 'maintenance' && 'Porciones estándar para mantenimiento'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal de Receta Detallada */}
        {selectedRecipe && (
          <div className="recipe-modal-overlay" onClick={() => setSelectedRecipe(null)}>
            <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedRecipe(null)}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="modal-header" style={{ background: selectedRecipe.image }}>
                <h2>{selectedRecipe.title}</h2>
                <div className="modal-tags">
                  {selectedRecipe.tags.map(tag => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="modal-body">
                <h3>Ingredientes (ajustados a tu objetivo: {userGoal === 'muscle-gain' ? 'Ganar músculo' : userGoal === 'fat-loss' ? 'Perder grasa' : 'Mantenimiento'})</h3>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((ing, idx) => {
                    const adjustedAmount = Math.round(ing.baseAmount * ing.multiplier[userGoal] * 10) / 10
                    return (
                      <li key={idx}>
                        <span className="ing-amount">{adjustedAmount} {ing.unit}</span>
                        <span className="ing-name">{ing.name}</span>
                      </li>
                    )
                  })}
                </ul>

                <h3>Preparación</h3>
                <ol className="instructions-list">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>

                <button className="start-cooking-btn">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Empezar a cocinar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer y Créditos */}
        <div className="nutrition-footer">
          <div className="disclaimer">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Las recomendaciones son orientativas. Consulta con un profesional si tienes alergias, intolerancias o condiciones médicas.</p>
          </div>
          <p className="nutrition-credit">
            Recetas by <strong>@memimandaa</strong> • Validado por nutricionistas deportivos
          </p>
        </div>
      </div>
    </Screen>
  )
}
