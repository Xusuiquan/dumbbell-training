import { useState } from 'react'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { BodyPartGrid } from '../components/BodyPartGrid/BodyPartGrid'
import { ExerciseCard } from '../components/ExerciseCard/ExerciseCard'
import { exercises } from '../data/exerciseCatalog'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
export function Home({
  favorites,
  onToggle,
}: {
  favorites: string[]
  onToggle: (id: string) => void
}) {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const { t, text } = useLanguage()
  const selectedExercises = selectedBodyPart
    ? exercises.filter((exercise) => exercise.bodyPart === selectedBodyPart)
    : exercises
  const resultTitle = selectedBodyPart
    ? `${text(selectedBodyPart)}${t('training')}`
    : t('allExercises')
  return (
    <main className="page home-page">
      <div className="home-body-part-picker">
        <AppHeader title={t('appName')} tab />
        <h2 className="section-title">{t('selectBodyPart')}</h2>
        <BodyPartGrid
          selectedBodyPart={selectedBodyPart}
          onSelect={(bodyPart) =>
            setSelectedBodyPart((currentBodyPart) =>
              currentBodyPart === bodyPart ? null : bodyPart,
            )
          }
        />
      </div>
      <section className="home-exercise-results">
        <h2 className="section-title">{resultTitle}</h2>
        {selectedExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            favorite={favorites.includes(exercise.id)}
            onToggle={onToggle}
          />
        ))}
        {!selectedExercises.length && <p className="empty">{t('noExercises')}</p>}
      </section>
    </main>
  )
}
