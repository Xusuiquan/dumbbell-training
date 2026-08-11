import type { Exercise } from '../../types/exercise'

const reverseFlyAssetRoot = '/images/exercises/bent-over-reverse-fly'
const reverseFlyStageImages = ['01', '02', '03', '04'].map(
  (step) => `${reverseFlyAssetRoot}/steps/${step}.webp`,
)
const oneArmRowAssetRoot = '/images/exercises/one-arm-dumbbell-row'
const oneArmRowStageImages = ['01', '02', '03', '04'].map(
  (step) => `${oneArmRowAssetRoot}/steps/${step}.webp`,
)
const romanianDeadliftAssetRoot = '/images/exercises/dumbbell-romanian-deadlift'
const romanianDeadliftStageImages = ['01', '02', '03', '04'].map(
  (step) => `${romanianDeadliftAssetRoot}/steps/${step}.webp`,
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
  {
    id: 'one-arm-dumbbell-row',
    name: '单臂哑铃划船',
    bodyPart: '背部',
    targetMuscles: ['背阔肌', '菱形肌', '肱二头肌'],
    difficulty: 'beginner',
    equipment: ['哑铃'],
    thumbnail: `${oneArmRowAssetRoot}/thumbnail.webp`,
    startImage: oneArmRowStageImages[0],
    endImage: oneArmRowStageImages[2],
    steps: [
      '双脚前后站稳，左手撑住左腿，右手握住哑铃。',
      '髋部后折进入俯身，背部保持自然中立，右臂垂在肩膀下方。',
      '肩胛先稳定后收，右手肘贴近身体并拉向髋部。',
      '保持躯干和髋部稳定，缓慢下放哑铃至手臂自然伸展。',
    ],
    tips: [
      '支撑手稳定压住大腿',
      '背部保持自然中立，髋部不要转动',
      '手肘贴近身体并拉向髋部',
      '选择可控重量，避免借力扭转躯干',
    ],
    mistakes: ['耸肩代偿', '躯干旋转', '重量过大导致手臂猛拉'],
    sets: '3组',
    reps: '每侧10–12次',
    rest: '休息60–90秒',
    visualGuide: {
      stages: [
        {
          title: '支撑站姿',
          cue: '前后站稳，左手支撑左腿',
          image: oneArmRowStageImages[0],
        },
        {
          title: '俯身准备',
          cue: '髋部后折，右臂自然下垂',
          image: oneArmRowStageImages[1],
        },
        {
          title: '拉向髋部',
          cue: '肩胛后收，手肘贴近身体',
          image: oneArmRowStageImages[2],
        },
        {
          title: '控制下放',
          cue: '躯干不转，沿原轨迹还原',
          image: oneArmRowStageImages[3],
        },
      ],
      formCues: [
        {
          kind: 'spine',
          title: '保持背部中立',
          description: '髋部折叠，核心收紧，避免弓背或塌腰',
        },
        {
          kind: 'shoulder',
          title: '肩胛稳定后收',
          description: '肩膀下沉，先稳定肩胛再拉起哑铃',
        },
        {
          kind: 'elbow',
          title: '手肘拉向髋部',
          description: '手肘贴近身体，不要向外张开',
        },
        {
          kind: 'target',
          title: '背阔肌 · 中背部',
          description: '顶峰稍停，躯干保持稳定，感受背部收缩',
        },
      ],
    },
    detail: {
      analysis: {
        image: `${oneArmRowAssetRoot}/analysis.webp`,
        imageAlt: '单臂哑铃划船顶峰收缩与背阔肌发力示意',
        primaryMuscle: '背阔肌',
        supportingMuscles: ['菱形肌', '肱二头肌'],
        summary: '肩胛先稳定后收，手肘贴身拉向髋部。',
        callouts: ['支撑手稳定，肩膀下沉', '背部中立，髋部保持正对', '手肘贴身拉向髋部'],
      },
      steps: [
        {
          title: '支撑',
          cue: '站距稳定',
          description: '左手压稳左侧大腿',
          image: oneArmRowStageImages[0],
          imageAlt: '前后站立并以左手支撑左腿',
        },
        {
          title: '俯身',
          cue: '背部中立',
          description: '哑铃垂在肩膀下方',
          image: oneArmRowStageImages[1],
          imageAlt: '背部保持中立让右臂自然下垂',
        },
        {
          title: '拉起',
          cue: '手肘贴身',
          description: '沿身体拉向髋部',
          image: oneArmRowStageImages[2],
          imageAlt: '右手肘贴近身体拉起哑铃',
        },
        {
          title: '下放',
          cue: '缓慢还原',
          description: '躯干不转，肩膀不耸',
          image: oneArmRowStageImages[3],
          imageAlt: '控制哑铃沿原轨迹缓慢下放',
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
          title: '肩胛稳定',
          description: '肩膀下沉，先稳定再向后收',
        },
        {
          icon: 'elbow',
          tone: 'orange',
          title: '肘向髋部',
          description: '手肘贴身，不要向外张开',
        },
        {
          icon: 'tempo',
          tone: 'blue',
          title: '控制节奏',
          description: '拉起1秒 · 停1秒 · 下放2秒',
        },
      ],
      mistakes: [
        {
          icon: 'shrug',
          tone: 'red',
          title: '耸肩代偿',
          description: '斜方肌抢先发力',
          correction: '肩膀主动远离耳朵',
        },
        {
          icon: 'lower-back',
          tone: 'red',
          title: '躯干旋转',
          description: '髋部跟随打开',
          correction: '核心收紧保持正对',
        },
        {
          icon: 'overload',
          tone: 'red',
          title: '重量过大',
          description: '手臂借力猛拉',
          correction: '减轻重量慢速完成',
        },
      ],
      prescription: [
        { icon: 'sets', tone: 'blue', label: '组数', value: '3组' },
        { icon: 'reps', tone: 'green', label: '次数', value: '每侧10–12次' },
        { icon: 'rest', tone: 'orange', label: '休息', value: '60–90秒' },
      ],
    },
  },
  {
    id: 'dumbbell-romanian-deadlift',
    name: '哑铃罗马尼亚硬拉',
    bodyPart: '腿部',
    targetMuscles: ['腘绳肌', '臀大肌', '竖脊肌'],
    difficulty: 'beginner',
    equipment: ['哑铃'],
    thumbnail: `${romanianDeadliftAssetRoot}/thumbnail.webp`,
    startImage: romanianDeadliftStageImages[0],
    endImage: romanianDeadliftStageImages[2],
    steps: [
      '双脚与髋同宽站立，双手持哑铃贴近大腿前侧。',
      '膝盖保持微屈，髋部向后移动，背部保持自然中立。',
      '哑铃贴腿下放至小腿中段，感受大腿后侧拉伸。',
      '脚掌踩稳，臀腿发力带动髋部向前，站直后不要后仰。',
    ],
    tips: [
      '动作由髋部后移主导，不要主动下蹲',
      '哑铃始终贴近双腿移动',
      '下放至背部仍能保持自然中立的位置',
      '使用可控重量，站起时不要过度后仰',
    ],
    mistakes: ['弓背下放', '屈膝过多变成深蹲', '哑铃远离双腿'],
    sets: '3组',
    reps: '10–12次',
    rest: '休息60–90秒',
    visualGuide: {
      stages: [
        {
          title: '站稳持铃',
          cue: '双脚与髋同宽，哑铃贴近大腿',
          image: romanianDeadliftStageImages[0],
        },
        {
          title: '髋部后移',
          cue: '膝盖微屈，背部保持自然中立',
          image: romanianDeadliftStageImages[1],
        },
        {
          title: '下放拉伸',
          cue: '哑铃贴腿，感受大腿后侧拉伸',
          image: romanianDeadliftStageImages[2],
        },
        {
          title: '站直还原',
          cue: '臀腿发力，髋部向前回到站姿',
          image: romanianDeadliftStageImages[3],
        },
      ],
      formCues: [
        {
          kind: 'spine',
          title: '保持背部中立',
          description: '躯干随髋部前倾，避免弓背或塌腰',
        },
        {
          kind: 'shoulder',
          title: '髋部主动后移',
          description: '想象臀部向后触碰墙面，不要主动下蹲',
        },
        {
          kind: 'elbow',
          title: '哑铃贴近双腿',
          description: '手臂自然垂直，哑铃沿腿部上下移动',
        },
        {
          kind: 'target',
          title: '腘绳肌 · 臀部',
          description: '下放感受拉伸，站起感受臀腿收缩',
        },
      ],
    },
    detail: {
      analysis: {
        image: `${romanianDeadliftAssetRoot}/analysis.webp`,
        imageAlt: '哑铃罗马尼亚硬拉底部姿势与臀腿后侧发力示意',
        primaryMuscle: '腘绳肌',
        supportingMuscles: ['臀大肌', '竖脊肌'],
        summary: '髋部向后移动，哑铃贴腿下放，再由臀腿带动站起。',
        callouts: ['背部自然中立，颈部放松', '髋部向后，膝盖保持微屈', '哑铃贴腿，下放至小腿中段'],
      },
      steps: [
        {
          title: '站稳',
          cue: '双脚髋宽',
          description: '哑铃贴近大腿前侧',
          image: romanianDeadliftStageImages[0],
          imageAlt: '双脚与髋同宽持哑铃自然站立',
        },
        {
          title: '后移',
          cue: '髋部主导',
          description: '膝盖微屈，臀部向后',
          image: romanianDeadliftStageImages[1],
          imageAlt: '保持背部中立并将髋部向后移动',
        },
        {
          title: '下放',
          cue: '哑铃贴腿',
          description: '下放至小腿中段',
          image: romanianDeadliftStageImages[2],
          imageAlt: '哑铃贴近双腿下放至小腿中段',
        },
        {
          title: '站起',
          cue: '臀腿发力',
          description: '髋部向前，站直不后仰',
          image: romanianDeadliftStageImages[3],
          imageAlt: '臀腿发力带动身体回到站姿',
        },
      ],
      keyPoints: [
        {
          icon: 'spine',
          tone: 'blue',
          title: '背部中立',
          description: '核心收紧，脊柱保持自然直线',
        },
        {
          icon: 'shoulder',
          tone: 'green',
          title: '髋部后移',
          description: '臀部向后，不要主动向下蹲',
        },
        {
          icon: 'elbow',
          tone: 'orange',
          title: '哑铃贴腿',
          description: '手臂垂直，重量靠近身体',
        },
        {
          icon: 'tempo',
          tone: 'blue',
          title: '控制节奏',
          description: '下放2秒 · 停1秒 · 站起1秒',
        },
      ],
      mistakes: [
        {
          icon: 'lower-back',
          tone: 'red',
          title: '弓背下放',
          description: '脊柱失去自然中立',
          correction: '减小幅度并收紧核心',
        },
        {
          icon: 'overload',
          tone: 'red',
          title: '下蹲过多',
          description: '膝盖过度向前移动',
          correction: '髋部主动向后移动',
        },
        {
          icon: 'shoulder',
          tone: 'red',
          title: '哑铃离腿',
          description: '重量远离身体重心',
          correction: '沿双腿贴近上下移动',
        },
      ],
      prescription: [
        { icon: 'sets', tone: 'blue', label: '组数', value: '3组' },
        { icon: 'reps', tone: 'green', label: '次数', value: '10–12次' },
        { icon: 'rest', tone: 'orange', label: '休息', value: '60–90秒' },
      ],
    },
  },
]
