import type { Exercise } from '../../types/exercise'

const reverseFlyAssetRoot = '/images/exercises/bent-over-reverse-fly'
const reverseFlyStageImages = ['01', '02', '03', '04'].map(
  (step) => `${reverseFlyAssetRoot}/steps/${step}.webp`,
)

export const dumbbellExercises: Exercise[] = [
  {
    id: 'bent-over-reverse-fly',
    name: '俯身飞鸟',
    bodyPart: '肩部',
    targetMuscles: ['三角肌后束', '菱形肌'],
    difficulty: 'beginner',
    equipment: ['哑铃'],
    thumbnail: `${reverseFlyAssetRoot}/thumbnail.webp`,
    startImage: reverseFlyStageImages[0],
    endImage: reverseFlyStageImages[2],
    steps: [
      '双脚与髋同宽站立，核心收紧，胸部打开，哑铃自然下垂。',
      '髋部后折，身体前倾，膝盖微屈，保持背部自然中立。',
      '肩胛先稳定后收，手肘保持微屈，双臂向身体两侧打开。',
      '保持躯干稳定，缓慢控制哑铃回落，回到起始位置前仍保持张力。',
    ],
    tips: [
      '全程保持背部自然中立',
      '肩膀下沉，肩胛骨稳定后收',
      '手肘全程微屈且角度不变',
      '选择可控制的轻重量，用肩后束而非摆动躯干发力',
    ],
    mistakes: ['耸肩代偿', '下背部弯曲', '重量过大导致动作变形'],
    sets: '2–3组',
    reps: '12–15次',
    rest: '休息60–90秒',
    visualGuide: {
      stages: [
        {
          title: '起始站姿',
          cue: '核心收紧，胸部打开，哑铃自然下垂',
          image: reverseFlyStageImages[0],
        },
        {
          title: '俯身准备',
          cue: '髋部后折，膝盖微屈，背部保持平直',
          image: reverseFlyStageImages[1],
        },
        {
          title: '打开',
          cue: '肩胛先动，肩后束带动手臂向两侧展开',
          image: reverseFlyStageImages[2],
        },
        {
          title: '还原',
          cue: '保持躯干稳定，缓慢下放并持续保持张力',
          image: reverseFlyStageImages[3],
        },
      ],
      formCues: [
        {
          kind: 'spine',
          title: '保持中立脊柱',
          description: '全程背部平直，核心收紧，避免弓背或塌腰',
        },
        {
          kind: 'shoulder',
          title: '肩胛稳定后收',
          description: '肩膀下沉，肩胛骨稳定，顶峰更好孤立后肩',
        },
        {
          kind: 'elbow',
          title: '肘部微屈固定',
          description: '肘部角度全程不变，减少小臂和关节代偿',
        },
        {
          kind: 'target',
          title: '肩后束 · 上背部',
          description: '顶峰稍停，感受目标肌肉发力，控制节奏',
        },
      ],
    },
    detail: {
      analysis: {
        image: `${reverseFlyAssetRoot}/analysis.webp`,
        imageAlt: '俯身飞鸟顶峰收缩与肩后束发力示意',
        primaryMuscle: '肩后束',
        supportingMuscles: ['菱形肌', '斜方肌中束'],
        summary: '肩胛先稳定后收，再带动双臂向两侧展开。',
        callouts: ['肩膀下沉，颈部放松', '肩胛骨向脊柱靠拢', '肘部微屈并保持固定'],
      },
      steps: [
        {
          title: '站稳',
          cue: '核心收紧',
          description: '胸部打开，颈部自然',
          image: reverseFlyStageImages[0],
          imageAlt: '双手持哑铃自然站立',
        },
        {
          title: '俯身',
          cue: '髋部后折',
          description: '膝盖微屈，背部平直',
          image: reverseFlyStageImages[1],
          imageAlt: '髋部后折进入俯身姿势',
        },
        {
          title: '打开',
          cue: '肩胛先动',
          description: '肩后束带动手臂展开',
          image: reverseFlyStageImages[2],
          imageAlt: '俯身姿势向两侧打开哑铃',
        },
        {
          title: '还原',
          cue: '缓慢下放',
          description: '保持躯干稳定与张力',
          image: reverseFlyStageImages[3],
          imageAlt: '控制哑铃回到起始位置',
        },
      ],
      keyPoints: [
        {
          icon: 'spine',
          tone: 'blue',
          title: '背部中立',
          description: '髋部折叠，脊柱保持自然直线',
        },
        {
          icon: 'shoulder',
          tone: 'green',
          title: '肩膀下沉',
          description: '远离耳朵，肩胛稳定后收',
        },
        {
          icon: 'elbow',
          tone: 'orange',
          title: '肘部微屈',
          description: '固定角度，不要甩动小臂',
        },
        {
          icon: 'tempo',
          tone: 'blue',
          title: '控制节奏',
          description: '打开1秒 · 停1秒 · 回落2秒',
        },
      ],
      mistakes: [
        {
          icon: 'shrug',
          tone: 'red',
          title: '耸肩代偿',
          description: '斜方肌抢先发力',
          correction: '主动下沉肩膀',
        },
        {
          icon: 'lower-back',
          tone: 'red',
          title: '下背弯曲',
          description: '脊柱失去中立',
          correction: '核心收紧并减重',
        },
        {
          icon: 'overload',
          tone: 'red',
          title: '重量过大',
          description: '身体借力甩动',
          correction: '全程保持可控',
        },
      ],
      prescription: [
        { icon: 'sets', tone: 'blue', label: '组数', value: '2–3组' },
        { icon: 'reps', tone: 'green', label: '次数', value: '12–15次' },
        { icon: 'rest', tone: 'orange', label: '休息', value: '60–90秒' },
      ],
    },
  },
]
