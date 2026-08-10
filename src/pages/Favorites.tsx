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
  const { t, text } = useLanguage()
  return (
    <main className="page">
      <AppHeader
        title={t('favorites')}
        tab
        action={<span className="header-action-text">{t('edit')}</span>}
      />
      <div className="filter-row">
        {['全部', '胸部', '背部', '肩部', '手臂', '腿部'].map((x, i) => (
          <button className={`chip ${i === 0 ? 'active' : ''}`} key={x}>
            {text(x)}
          </button>
        ))}
      </div>
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
