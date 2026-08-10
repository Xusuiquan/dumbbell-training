import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Exercise } from '../../types/exercise'
import { ExerciseIllustration } from '../ExerciseIllustration/ExerciseIllustration'
import { Tag } from '../Tag/Tag'
import '../Tag/Tag.css'
import { useLanguage } from '../../hooks/useLanguage'
import './ExerciseCard.css'
export function ExerciseCard({
  exercise,
  favorite,
  onToggle,
}: {
  exercise: Exercise
  favorite: boolean
  onToggle: (id: string) => void
}) {
  const { t, text } = useLanguage()
  return (
    <article className="exercise-card card">
      <Link to={`/exercises/${exercise.id}`} className="exercise-link">
        <ExerciseIllustration compact src={exercise.thumbnail} />
        <div className="exercise-copy">
          <h3>{text(exercise.name)}</h3>
          <p>{exercise.targetMuscles.map(text).join(' · ')}</p>
          <div>
            <Tag>{exercise.difficulty === 'beginner' ? t('beginner') : t('intermediate')}</Tag>{' '}
            <Tag>{text(exercise.equipment[0])}</Tag>
          </div>
        </div>
      </Link>
      <button
        className={`favorite-button ${favorite ? 'saved' : ''}`}
        onClick={() => onToggle(exercise.id)}
        aria-label={t('favorite')}
      >
        <Star size={19} fill={favorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}
