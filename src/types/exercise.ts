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
}
