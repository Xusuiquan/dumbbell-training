import { Activity, CircleDot, ShieldCheck, Target } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import type { ExerciseVisualGuide, FormCueKind } from '../../types/exercise'
import './MotionGuide.css'

const cueIcons: Record<FormCueKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  spine: ShieldCheck,
  shoulder: Activity,
  elbow: CircleDot,
  target: Target,
}

export function MotionGuide({
  guide,
  motionTitle,
  cueTitle,
  text,
}: {
  guide: ExerciseVisualGuide
  motionTitle: string
  cueTitle: string
  text: (value: string) => string
}) {
  return (
    <>
      <section className="motion-guide" aria-labelledby="motion-guide-title">
        <div className="motion-guide-heading">
          <h2 className="section-title" id="motion-guide-title">
            {motionTitle}
          </h2>
          <span>{guide.stages.length} steps</span>
        </div>
        <div className="motion-stage-list">
          {guide.stages.map((stage, index) => (
            <article className="motion-stage" key={stage.title}>
              <div className="motion-stage-figure">
                <img
                  src={stage.image}
                  alt={`${text(stage.title)} ${index + 1}`}
                  loading={index > 1 ? 'lazy' : 'eager'}
                />
                <span className="motion-stage-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="motion-stage-copy">
                <h3>{text(stage.title)}</h3>
                <p>{text(stage.cue)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="form-cues" aria-labelledby="form-cues-title">
        <h2 className="section-title" id="form-cues-title">
          {cueTitle}
        </h2>
        <div className="form-cue-list">
          {guide.formCues.map((cue) => {
            const Icon = cueIcons[cue.kind]
            return (
              <article className={`form-cue ${cue.kind}`} key={cue.title}>
                <span className="form-cue-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{text(cue.title)}</h3>
                  <p>{text(cue.description)}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
