import { Dumbbell } from 'lucide-react'
import { useState } from 'react'
import './ExerciseIllustration.css'
export function ExerciseIllustration({
  label,
  compact = false,
  src,
}: {
  label?: string
  compact?: boolean
  src?: string
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(src) && !imageFailed

  return (
    <div
      className={`illustration ${compact ? 'compact' : ''}`}
      aria-label={label || '动作插图占位'}
    >
      {showImage ? (
        <img src={src} alt={label || '哑铃训练动作图示'} onError={() => setImageFailed(true)} />
      ) : (
        <>
          <Dumbbell strokeWidth={1.25} />
          {label && <span>{label}</span>}
        </>
      )}
    </div>
  )
}
