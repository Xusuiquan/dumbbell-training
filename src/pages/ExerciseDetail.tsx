import { Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { ExerciseDetailContent } from '../components/ExerciseDetail/ExerciseDetailContent'
import { ExerciseIllustration } from '../components/ExerciseIllustration/ExerciseIllustration'
import { MotionGuide } from '../components/MotionGuide/MotionGuide'
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
  const [activeTab, setActiveTab] = useState<'guide' | 'details'>('guide')
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const { id } = useParams()
  const exercise = exercises.find((item) => item.id === id) ?? exercises[0]
  const saved = favorites.includes(exercise.id)
  const { t, text } = useLanguage()
  const handleTouchEnd = (x: number, y: number) => {
    if (!swipeStart.current) return
    const deltaX = x - swipeStart.current.x
    const deltaY = y - swipeStart.current.y
    swipeStart.current = null
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    setActiveTab(deltaX < 0 ? 'details' : 'guide')
  }
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
      {exercise.detail ? (
        <div className="detail-panel structured-detail-panel">
          <ExerciseDetailContent
            content={exercise.detail}
            text={text}
            labels={{
              forceAnalysis: t('forceAnalysis'),
              primaryMuscle: t('primaryMuscle'),
              supportingMuscles: t('supportingMuscles'),
              steps: t('steps'),
              keyPoints: t('keyPoints'),
              mistakes: t('mistakes'),
              trainingAdvice: t('trainingAdvice'),
            }}
          />
        </div>
      ) : (
        <>
          <div className="detail-tabs" role="tablist" aria-label={t('exerciseContent')}>
            <button
              className={`detail-tab ${activeTab === 'guide' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'guide'}
              onClick={() => setActiveTab('guide')}
            >
              {t('exerciseGuide')}
            </button>
            <button
              className={`detail-tab ${activeTab === 'details' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'details'}
              onClick={() => setActiveTab('details')}
            >
              {t('trainingDetails')}
            </button>
          </div>
          {activeTab === 'guide' ? (
            <div
              className="detail-panel"
              role="tabpanel"
              onTouchStart={(event) => {
                const touch = event.touches[0]
                swipeStart.current = { x: touch.clientX, y: touch.clientY }
              }}
              onTouchEnd={(event) => {
                const touch = event.changedTouches[0]
                handleTouchEnd(touch.clientX, touch.clientY)
              }}
            >
              {exercise.visualGuide ? (
                <MotionGuide
                  guide={exercise.visualGuide}
                  motionTitle={t('fullMovement')}
                  cueTitle={t('formCheckpoints')}
                  text={text}
                />
              ) : (
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
              )}
            </div>
          ) : (
            <div
              className="detail-panel"
              role="tabpanel"
              onTouchStart={(event) => {
                const touch = event.touches[0]
                swipeStart.current = { x: touch.clientX, y: touch.clientY }
              }}
              onTouchEnd={(event) => {
                const touch = event.changedTouches[0]
                handleTouchEnd(touch.clientX, touch.clientY)
              }}
            >
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
            </div>
          )}
        </>
      )}
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
