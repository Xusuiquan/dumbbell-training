import { Navigate, Route, Routes } from 'react-router-dom'
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation'
import { useFavorites } from './hooks/useFavorites'
import { LanguageProvider } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import { ExerciseDetail } from './pages/ExerciseDetail'
import { ExerciseLibrary } from './pages/ExerciseLibrary'
import { Favorites } from './pages/Favorites'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Settings } from './pages/Settings'
export default function App() {
  const { favorites, toggleFavorite } = useFavorites()
  const { theme, setTheme } = useTheme()
  const cardProps = { favorites, onToggle: toggleFavorite }
  return (
    <LanguageProvider>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home {...cardProps} />} />
          <Route path="/exercises" element={<ExerciseLibrary {...cardProps} />} />
          <Route path="/exercises/:id" element={<ExerciseDetail {...cardProps} />} />
          <Route path="/search" element={<Search {...cardProps} />} />
          <Route path="/favorites" element={<Favorites {...cardProps} />} />
          <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNavigation />
      </div>
    </LanguageProvider>
  )
}
