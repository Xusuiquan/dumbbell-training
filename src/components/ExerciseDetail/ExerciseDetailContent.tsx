import { Target } from 'lucide-react'
import type { ExerciseDetailContent as ExerciseDetailContentValue } from '../../types/exercise'
import { DetailIcon } from './DetailIcon'
import './ExerciseDetailContent.css'

type TextResolver = (value: string) => string

interface DetailLabels {
  forceAnalysis: string
  primaryMuscle: string
  supportingMuscles: string
  steps: string
  keyPoints: string
  mistakes: string
  trainingAdvice: string
}

export function ExerciseDetailContent({
  content,
  labels,
  text,
}: {
  content: ExerciseDetailContentValue
  labels: DetailLabels
  text: TextResolver
}) {
  return (
    <div className="exercise-detail-content">
      <section className="analysis-card" aria-labelledby="force-analysis-title">
        <h2 id="force-analysis-title" className="analysis-title">
          <Target aria-hidden="true" size={25} strokeWidth={2.2} />
          {labels.forceAnalysis}
        </h2>
        <div className="analysis-figure">
          <img src={content.analysis.image} alt={text(content.analysis.imageAlt)} />
        </div>
        <div className="analysis-copy">
          <ul className="analysis-callouts">
            {content.analysis.callouts.map((callout) => (
              <li key={callout}>{text(callout)}</li>
            ))}
          </ul>
          <div className="analysis-muscles">
            <p>
              <span>{labels.primaryMuscle}</span>
              <strong>{text(content.analysis.primaryMuscle)}</strong>
            </p>
            <p>
              <span>{labels.supportingMuscles}</span>
              {content.analysis.supportingMuscles.map(text).join('、')}
            </p>
            <p className="analysis-summary">{text(content.analysis.summary)}</p>
          </div>
        </div>
      </section>

      <DetailSection title={labels.steps}>
        <ol className="exercise-step-grid">
          {content.steps.map((step, index) => (
            <li key={step.title} className="exercise-step-card">
              <div className="exercise-step-heading">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{text(step.title)}</strong>
              </div>
              <p className="exercise-step-cue">{text(step.cue)}</p>
              <p className="exercise-step-description">{text(step.description)}</p>
              <div className="exercise-step-image">
                <img src={step.image} alt={text(step.imageAlt)} />
              </div>
            </li>
          ))}
        </ol>
      </DetailSection>

      <DetailSection title={labels.keyPoints}>
        <div className="exercise-key-grid">
          {content.keyPoints.map((point) => (
            <article key={point.title} className="exercise-key-card">
              <span className={`detail-icon tone-${point.tone}`}>
                <DetailIcon kind={point.icon} />
              </span>
              <div>
                <h3>{text(point.title)}</h3>
                <p>{text(point.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={labels.mistakes}>
        <div className="exercise-mistake-grid">
          {content.mistakes.map((mistake) => (
            <article key={mistake.title} className="exercise-mistake-card">
              <span className="detail-icon tone-red">
                <DetailIcon kind={mistake.icon} size={21} />
              </span>
              <div>
                <h3>{text(mistake.title)}</h3>
                <p>{text(mistake.correction)}</p>
              </div>
              <span className="sr-only">{text(mistake.description)}</span>
            </article>
          ))}
        </div>
      </DetailSection>

      <DetailSection title={labels.trainingAdvice}>
        <div className="exercise-prescription-grid">
          {content.prescription.map((item) => (
            <article key={item.label} className="exercise-prescription-card">
              <span className={`detail-icon tone-${item.tone}`}>
                <DetailIcon kind={item.icon} size={25} />
              </span>
              <div>
                <p>{text(item.label)}</p>
                <strong>{text(item.value)}</strong>
              </div>
            </article>
          ))}
        </div>
      </DetailSection>
    </div>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="exercise-detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
