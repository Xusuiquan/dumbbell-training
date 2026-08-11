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

export type ExerciseDetailIconKind =
  | 'spine'
  | 'shoulder'
  | 'elbow'
  | 'tempo'
  | 'shrug'
  | 'lower-back'
  | 'overload'
  | 'sets'
  | 'reps'
  | 'rest'

export type ExerciseDetailTone = 'blue' | 'green' | 'orange' | 'red'

export interface ExerciseAnalysis {
  image: string
  imageAlt: string
  primaryMuscle: string
  supportingMuscles: string[]
  summary: string
  callouts: [string, string, string]
}

export interface ExerciseDetailStep {
  title: string
  cue: string
  description: string
  image: string
  imageAlt: string
}

export type ExerciseDetailSteps = [
  ExerciseDetailStep,
  ExerciseDetailStep,
  ExerciseDetailStep,
  ExerciseDetailStep,
]

export interface ExerciseDetailPoint {
  icon: ExerciseDetailIconKind
  tone: ExerciseDetailTone
  title: string
  description: string
}

export interface ExerciseDetailMistake extends ExerciseDetailPoint {
  correction: string
}

export interface ExercisePrescriptionItem {
  icon: Extract<ExerciseDetailIconKind, 'sets' | 'reps' | 'rest'>
  tone: Exclude<ExerciseDetailTone, 'red'>
  label: string
  value: string
}

export interface ExerciseDetailContent {
  analysis: ExerciseAnalysis
  steps: ExerciseDetailSteps
  keyPoints: [ExerciseDetailPoint, ExerciseDetailPoint, ExerciseDetailPoint, ExerciseDetailPoint]
  mistakes: [ExerciseDetailMistake, ExerciseDetailMistake, ExerciseDetailMistake]
  prescription: [ExercisePrescriptionItem, ExercisePrescriptionItem, ExercisePrescriptionItem]
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
  detail?: ExerciseDetailContent
}
