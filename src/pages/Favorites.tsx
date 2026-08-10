import { ExerciseCard } from '../components/ExerciseCard/ExerciseCard'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { exercises } from '../data/exerciseCatalog'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
export function Favorites({
  favorites,
  onToggle,
}: {
  favorites: string[]
  onToggle: (id: string) => void
}) {
  const items = exercises.filter((item) => favorites.includes(item.id))
  const { t } = useLanguage()
  return (
    <main className="page">
      <AppHeader
        title={t('favorites')}
        tab
      />
      <div className="exercise-list">
        {items.length ? (
          items.map((item) => (
            <ExerciseCard key={item.id} exercise={item} favorite onToggle={onToggle} />
          ))
        ) : (
          <p className="empty">{t('noFavorites')}</p>
        )}
      </div>
    </main>
  )
}
