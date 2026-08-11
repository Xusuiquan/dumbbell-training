import type { ExerciseDetailContent } from '../../../../src/types/exercise'

export const exerciseDetailTemplate = {
  analysis: {
    image: '/images/exercises/EXERCISE_ID/analysis.webp',
    imageAlt: '动作发力示意',
    primaryMuscle: '主要肌群',
    supportingMuscles: ['辅助肌群一', '辅助肌群二'],
    summary: '先稳定身体，再由目标肌群带动动作。',
    callouts: ['身体保持稳定', '目标关节对齐', '全程控制重量'],
  },
  steps: [
    {
      title: '站稳',
      cue: '建立姿势',
      description: '核心收紧，关节自然',
      image: '/images/exercises/EXERCISE_ID/steps/01.webp',
      imageAlt: '动作第一步',
    },
    {
      title: '准备',
      cue: '控制预载',
      description: '保持躯干稳定与张力',
      image: '/images/exercises/EXERCISE_ID/steps/02.webp',
      imageAlt: '动作第二步',
    },
    {
      title: '发力',
      cue: '目标肌带动',
      description: '沿稳定轨迹完成动作',
      image: '/images/exercises/EXERCISE_ID/steps/03.webp',
      imageAlt: '动作第三步',
    },
    {
      title: '还原',
      cue: '缓慢回落',
      description: '保持姿势与肌肉张力',
      image: '/images/exercises/EXERCISE_ID/steps/04.webp',
      imageAlt: '动作第四步',
    },
  ],
  keyPoints: [
    { icon: 'spine', tone: 'blue', title: '脊柱中立', description: '保持自然曲线与躯干稳定' },
    { icon: 'shoulder', tone: 'green', title: '关节稳定', description: '远离耸肩与突然锁死' },
    { icon: 'elbow', tone: 'orange', title: '轨迹固定', description: '沿可控路径完成动作' },
    { icon: 'tempo', tone: 'blue', title: '控制节奏', description: '发力稳定，回落更慢' },
  ],
  mistakes: [
    {
      icon: 'shrug',
      tone: 'red',
      title: '错误一',
      description: '错误表现',
      correction: '简短修正方式',
    },
    {
      icon: 'lower-back',
      tone: 'red',
      title: '错误二',
      description: '错误表现',
      correction: '简短修正方式',
    },
    {
      icon: 'overload',
      tone: 'red',
      title: '重量过大',
      description: '动作失去控制',
      correction: '降低重量',
    },
  ],
  prescription: [
    { icon: 'sets', tone: 'blue', label: '组数', value: '2–3组' },
    { icon: 'reps', tone: 'green', label: '次数', value: '8–12次' },
    { icon: 'rest', tone: 'orange', label: '休息', value: '60–90秒' },
  ],
} satisfies ExerciseDetailContent
