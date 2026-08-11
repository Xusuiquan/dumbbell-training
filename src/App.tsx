import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation'
import { Toast } from './components/Toast/Toast'
import { useFavorites } from './hooks/useFavorites'
import { LanguageProvider, useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import { ExerciseDetail } from './pages/ExerciseDetail'
import { ExerciseLibrary } from './pages/ExerciseLibrary'
import { Favorites } from './pages/Favorites'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Settings } from './pages/Settings'
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

function AppContent() {
  const location = useLocation()
  const { favorites, toggleFavorite } = useFavorites()
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [notice, setNotice] = useState<{ id: number; message: string } | null>(null)
  const handleToggleFavorite = (id: string) => {
    const saved = toggleFavorite(id)
    setNotice({ id: Date.now(), message: t(saved ? 'favoriteAdded' : 'favoriteRemoved') })
  }
  const cardProps = { favorites, onToggle: handleToggleFavorite }
  const isExerciseDetail = /^\/exercises\/[^/]+$/.test(location.pathname)
  return (
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
      {!isExerciseDetail && <BottomNavigation />}
      {notice && (
        <Toast key={notice.id} message={notice.message} onDismiss={() => setNotice(null)} />
      )}
    </div>
  )
}
