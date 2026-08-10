export type FormCueKind = 'spine' | 'shoulder' | 'elbow' | 'target'

export interface PostureStage {
  title: string
  cue: string
  image: string
}

export interface FormCue {
  kind: FormCueKind
  title: string
  description: string
}

export interface ExerciseVisualGuide {
  stages: PostureStage[]
  formCues: FormCue[]
}

export interface Exercise {
  id: string
  name: string
  bodyPart: string
  targetMuscles: string[]
  difficulty: 'beginner' | 'intermediate'
  equipment: string[]
  thumbnail: string
  startImage: string
  endImage: string
  steps: string[]
  tips: string[]
  mistakes: string[]
  sets: string
  reps: string
  rest: string
  visualGuide?: ExerciseVisualGuide
}
