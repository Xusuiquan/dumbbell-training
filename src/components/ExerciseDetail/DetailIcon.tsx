import {
  Activity,
  Bone,
  Clock3,
  ClipboardList,
  Dumbbell,
  PersonStanding,
  Target,
  Timer,
  UserRound,
} from 'lucide-react'
import type { ExerciseDetailIconKind } from '../../types/exercise'

const iconByKind = {
  spine: Bone,
  shoulder: PersonStanding,
  elbow: Activity,
  tempo: Timer,
  shrug: UserRound,
  'lower-back': Bone,
  overload: Dumbbell,
  sets: ClipboardList,
  reps: Target,
  rest: Clock3,
} satisfies Record<ExerciseDetailIconKind, typeof Activity>

export function DetailIcon({ kind, size = 24 }: { kind: ExerciseDetailIconKind; size?: number }) {
  const Icon = iconByKind[kind]

  return <Icon aria-hidden="true" size={size} strokeWidth={1.9} />
}
