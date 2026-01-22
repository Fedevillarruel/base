# BASE - App de Entrenamiento Deportivo

## 🏃‍♂️ Descripción

**BASE** es una aplicación web demo de entrenamiento deportivo integral, diseñada para running, ciclismo, natación, triatlón y más. Combina lo mejor de apps como Strava, Adidas Running y Training Peaks en una experiencia moderna y profesional.

## ✨ Características Principales

### 🔐 Autenticación
- Login con Apple / Google
- Registro con email
- Diseño mobile-first profesional

### 📱 Pantallas Principales

1. **Feed Social**
   - Posteos de actividades deportivas
   - Sistema de likes y comentarios
   - Compartir diferentes tipos de entrenamientos
   - Visualización de estadísticas (distancia, tiempo, ritmo, desnivel)

2. **Comunidades**
   - Clubes de running, ciclismo, triatlón
   - Sistema de membresías
   - Similar a fan pages de Facebook

3. **Calendario**
   - Vista día/semana/mes
   - Planificación de entrenamientos
   - Registro de rutinas completadas
   - Horarios y turnos específicos

4. **Nutrición**
   - Buscador de recetas fit
   - Recetas by @memimandaa
   - Información nutricional completa
   - Tips de alimentación saludable

5. **Perfil**
   - Estadísticas de progreso
   - Contador de kilómetros
   - Calculadora de tiempos de carrera
   - Plan PRO con entrenadora @clarissebermudez
   - Listado de actividades registradas

### 🎯 Onboarding
- 3 pasos de configuración inicial
- Objetivos de entrenamiento
- Nivel de experiencia
- Deportes preferidos
- Ciudad y datos personales

### 💎 Plan PRO
- Entrenamiento personalizado 1 a 1
- Coach profesional
- Plan anual generado por IA

## 🎨 Diseño

- **Mobile First**: Optimizado para dispositivos móviles
- **Profesional**: Sin apariencia de IA, diseño pulido y moderno
- **Dark Theme**: Paleta de colores oscura y elegante
- **Animaciones**: Transiciones suaves y microinteracciones
- **Iconos**: Emojis nativos para mejor compatibilidad

## 🛠️ Tecnologías

- **React 18** + TypeScript
- **Zustand** para manejo de estado
- **Vite** como bundler
- **date-fns** para manejo de fechas
- **CSS Modules** y CSS Variables

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:3000`

## 📂 Estructura del Proyecto

```
src/
├── domain/          # Lógica de negocio y estado
│   ├── types.ts     # Tipos TypeScript
│   ├── useStore.ts  # Store global con Zustand
│   └── ids.ts       # Generador de IDs
├── ui/              # Interfaz de usuario
│   ├── components/  # Componentes reutilizables
│   ├── screens/     # Pantallas principales
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── feed/
│   │   ├── communities/
│   │   ├── calendar/
│   │   ├── nutrition/
│   │   └── profile/
│   ├── App.tsx      # Componente principal
│   └── App.css
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales
```

## 🎯 Flujo de Usuario

1. **Login/Registro** → Autenticación con Apple/Google o email
2. **Onboarding** → 3 pasos de configuración personalizada
3. **Dashboard** → Acceso a todas las funcionalidades:
   - Feed de actividades
   - Comunidades deportivas
   - Calendario de entrenamientos
   - Recetas de nutrición
   - Perfil y estadísticas

## 💡 Características Técnicas

- **Mock Data**: Todos los datos son simulados (sin base de datos real)
- **State Management**: Zustand para estado global eficiente
- **Responsive**: Adaptado a todos los tamaños de pantalla
- **PWA Ready**: Preparado para ser Progressive Web App
- **TypeScript**: Tipado estático completo
- **Performance**: Optimizado para carga rápida

## 🎨 Paleta de Colores

- **Primary (Brand)**: `#ff4d32` - Naranja/Rojo vibrante
- **Background**: `#0a0e17` - Azul oscuro profundo
- **Surface**: `#0f141f` - Azul oscuro medio
- **Card**: `#141b2e` - Azul grisáceo
- **Accent**: `#00d4ff` - Cyan brillante
- **Success**: `#00f5a0` - Verde neón

## 📱 Mobile First

- Safe area para notches (iPhone X+)
- Bottom navigation optimizada
- Gestos táctiles suaves
- Viewport height dinámica (dvh)
- Prevención de zoom no deseado

## 🔮 Futuras Mejoras

- Integración con wearables (Apple Watch, Garmin)
- Backend real con API REST
- Sincronización en tiempo real
- Chat entre usuarios
- Mapas de rutas
- Gamificación y logros
- Análisis con IA

## 👥 Créditos

- **Nutrición**: @memimandaa
- **Coaching PRO**: @clarissebermudez
- **Diseño y Desarrollo**: BASE Team

---

**Nota**: Esta es una versión demo/mockup para presentación. Todas las funcionalidades son simuladas y no hay conexión a servicios backend reales.
