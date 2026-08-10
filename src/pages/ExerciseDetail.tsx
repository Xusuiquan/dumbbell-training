import { Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { ExerciseIllustration } from '../components/ExerciseIllustration/ExerciseIllustration'
import { Tag } from '../components/Tag/Tag'
import '../components/Tag/Tag.css'
import { exercises } from '../data/exerciseCatalog'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
export function ExerciseDetail({
  favorites,
  onToggle,
}: {
  favorites: string[]
  onToggle: (id: string) => void
}) {
  const { id } = useParams()
  const exercise = exercises.find((item) => item.id === id) ?? exercises[0]
  const saved = favorites.includes(exercise.id)
  const { t, text } = useLanguage()
  return (
    <main className="page detail">
      <div className="detail-head">
        <AppHeader title={text(exercise.name)} back />
        <button
          onClick={() => onToggle(exercise.id)}
          className={`icon-button ${saved ? 'saved' : ''}`}
          aria-label={t('favorite')}
        >
          <Star fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="tag-row">
        <Tag>{text(exercise.bodyPart)}</Tag>
        <Tag>{exercise.difficulty === 'beginner' ? t('beginner') : t('intermediate')}</Tag>
        <Tag>{text(exercise.equipment[0])}</Tag>
      </div>
      <div className="pose-grid">
        <div>
          <ExerciseIllustration label={t('startPosition')} src={exercise.startImage} />
          <p>{t('startPosition')}</p>
        </div>
        <div>
          <ExerciseIllustration label={t('endPosition')} src={exercise.endImage} />
          <p>{t('endPosition')}</p>
        </div>
      </div>
      <DetailSection title={t('targetMuscles')}>
        <div className="muscles">
          {exercise.targetMuscles.map((item) => (
            <div className="muscle" key={item}>
              <span>●</span>
              {text(item)}
            </div>
          ))}
        </div>
      </DetailSection>
      <DetailSection title={t('steps')}>
        <ol className="steps">
          {exercise.steps.map((step) => (
            <li key={step}>{text(step)}</li>
          ))}
        </ol>
      </DetailSection>
      <DetailSection title={t('tips')}>
        <BulletList items={exercise.tips.map(text)} />
      </DetailSection>
      <DetailSection title={t('mistakes')}>
        <BulletList items={exercise.mistakes.map(text)} />
      </DetailSection>
      <DetailSection title={t('recommendation')}>
        <div className="recommendation">
          {[exercise.sets, exercise.reps, exercise.rest].map((item) => (
            <span key={item}>{text(item)}</span>
          ))}
        </div>
      </DetailSection>
    </main>
  )
}
function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
