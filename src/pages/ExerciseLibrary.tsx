import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { ExerciseCard } from '../components/ExerciseCard/ExerciseCard'
import { exercises } from '../data/exerciseCatalog'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
const filters = ['all', 'beginner', 'intermediate'] as const
type DifficultyFilter = (typeof filters)[number]
export function ExerciseLibrary({
  favorites,
  onToggle,
}: {
  favorites: string[]
  onToggle: (id: string) => void
}) {
  const [searchParams] = useSearchParams()
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const bodyPart = searchParams.get('bodyPart')
  const { t } = useLanguage()
  const bodyPartExercises = bodyPart
    ? exercises.filter((exercise) => exercise.bodyPart === bodyPart)
    : exercises
  const filteredExercises =
    difficultyFilter === 'all'
      ? bodyPartExercises
      : bodyPartExercises.filter((exercise) => exercise.difficulty === difficultyFilter)
  return (
    <main className="page">
      <AppHeader title={t('library')} tab />
      <div className="filter-row">
        {filters.map((item) => (
          <button
            key={item}
            className={`chip ${difficultyFilter === item ? 'active' : ''}`}
            onClick={() => setDifficultyFilter(item)}
          >
            {t(item)}
          </button>
        ))}
      </div>
      <div className="exercise-list">
        {filteredExercises.map((item) => (
          <ExerciseCard
            key={item.id}
            exercise={item}
            favorite={favorites.includes(item.id)}
            onToggle={onToggle}
          />
        ))}
        {!filteredExercises.length && <p className="empty">{t('noExercises')}</p>}
      </div>
    </main>
  )
}
