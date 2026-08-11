import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'zh' | 'en'

const storageKey = 'dumbbell-language'

const translations = {
  zh: {
    appName: '哑铃训练',
    subtitle: '图示详解',
    home: '首页',
    library: '动作库',
    favorites: '收藏',
    profile: '我的',
    selectBodyPart: '选择训练部位',
    recommended: '推荐动作',
    viewAll: '查看全部',
    chestTraining: '胸部训练',
    all: '全部',
    beginner: '入门',
    intermediate: '进阶',
    noEquipment: '无需器械',
    benchRequired: '需要训练凳',
    dumbbellsOnly: '哑铃',
    search: '搜索',
    searchPlaceholder: '搜索动作、部位、肌肉群...',
    recentSearches: '最近搜索',
    popularSearches: '热门搜索',
    searchResults: '搜索结果',
    myFavorites: '我的收藏',
    edit: '编辑',
    noFavorites: '还没有收藏动作',
    settings: '设置',
    darkMode: '深色模式',
    language: '语言',
    displaySettings: '显示设置',
    fontSize: '字体大小',
    clearCache: '清除缓存',
    backup: '数据备份与导出',
    about: '关于应用',
    terms: '使用条款',
    privacy: '隐私政策',
    startPosition: '起始姿势',
    endPosition: '结束姿势',
    targetMuscles: '目标肌肉',
    steps: '动作步骤',
    tips: '动作要点',
    mistakes: '常见错误',
    recommendation: '推荐',
    back: '返回',
    favorite: '收藏',
    favoriteAdded: '已收藏',
    favoriteRemoved: '已取消收藏',
    exerciseContent: '动作内容',
    exerciseGuide: '动作图解',
    trainingDetails: '训练要点',
    forceAnalysis: '发力解析',
    primaryMuscle: '主要肌群',
    supportingMuscles: '辅助肌群',
    keyPoints: '关键要点',
    trainingAdvice: '训练建议',
    fullMovement: '动作全程',
    formCheckpoints: '姿势要点',
    training: '训练',
    allExercises: '全部',
    noExercises: '该部位暂未收录动作',
  },
  en: {
    appName: 'Dumbbell Training',
    subtitle: 'Visual Exercise Guide',
    home: 'Home',
    library: 'Exercises',
    favorites: 'Favorites',
    profile: 'Profile',
    selectBodyPart: 'Choose a body part',
    recommended: 'Recommended',
    viewAll: 'View all',
    chestTraining: 'Chest Training',
    all: 'All',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    noEquipment: 'No equipment',
    benchRequired: 'Bench required',
    dumbbellsOnly: 'Dumbbell',
    search: 'Search',
    searchPlaceholder: 'Search exercises, body parts, muscles...',
    recentSearches: 'Recent searches',
    popularSearches: 'Popular searches',
    searchResults: 'Search results',
    myFavorites: 'My Favorites',
    edit: 'Edit',
    noFavorites: 'No exercises saved yet',
    settings: 'Settings',
    darkMode: 'Dark mode',
    language: 'Language',
    displaySettings: 'Display settings',
    fontSize: 'Font size',
    clearCache: 'Clear cache',
    backup: 'Backup & export',
    about: 'About',
    terms: 'Terms of use',
    privacy: 'Privacy policy',
    startPosition: 'Start position',
    endPosition: 'End position',
    targetMuscles: 'Target muscles',
    steps: 'Steps',
    tips: 'Form tips',
    mistakes: 'Common mistakes',
    recommendation: 'Recommendation',
    back: 'Back',
    favorite: 'Favorite',
    favoriteAdded: 'Added to favorites',
    favoriteRemoved: 'Removed from favorites',
    exerciseContent: 'Exercise content',
    exerciseGuide: 'Visual guide',
    trainingDetails: 'Training details',
    forceAnalysis: 'Muscle focus',
    primaryMuscle: 'Primary',
    supportingMuscles: 'Supporting',
    keyPoints: 'Key points',
    trainingAdvice: 'Training advice',
    fullMovement: 'Full movement',
    formCheckpoints: 'Form checkpoints',
    training: ' Training',
    allExercises: 'All',
    noExercises: 'No exercises have been added for this body part yet',
  },
} as const

const exerciseText: Record<string, string> = {
  俯身飞鸟: 'Bent-Over Reverse Fly',
  胸部: 'Chest',
  背部: 'Back',
  肩部: 'Shoulders',
  手臂: 'Arms',
  腿部: 'Legs',
  臀部: 'Glutes',
  核心: 'Core',
  全身: 'Full Body',
  三角肌后束: 'Rear Deltoid',
  菱形肌: 'Rhomboids',
  斜方肌中束: 'Middle trapezius',
  肩后束: 'Rear delts',
  哑铃: 'Dumbbell',
  起始站姿: 'Start stance',
  俯身准备: 'Hinge setup',
  打开: 'Open',
  还原: 'Return',
  '核心收紧，胸部打开，哑铃自然下垂':
    'Brace your core, open your chest, and let the dumbbells hang naturally.',
  '髋部后折，膝盖微屈，背部保持平直':
    'Hinge at the hips, soften your knees, and keep your back flat.',
  '肩胛先动，肩后束带动手臂向两侧展开':
    'Lead with the shoulder blades and let the rear delts open the arms.',
  '保持躯干稳定，缓慢下放并持续保持张力':
    'Keep the torso steady, lower slowly, and maintain tension.',
  保持中立脊柱: 'Keep a neutral spine',
  '全程背部平直，核心收紧，避免弓背或塌腰':
    'Keep your back flat and core braced without rounding or overextending.',
  肩胛稳定后收: 'Retract stable shoulder blades',
  '肩膀下沉，肩胛骨稳定，顶峰更好孤立后肩':
    'Keep the shoulders down and blades stable to isolate the rear delts at the top.',
  肘部微屈固定: 'Keep a fixed soft elbow',
  '肘部角度全程不变，减少小臂和关节代偿':
    'Keep the elbow angle unchanged to reduce forearm and joint compensation.',
  '肩后束 · 上背部': 'Rear delts · Upper back',
  '顶峰稍停，感受目标肌肉发力，控制节奏':
    'Pause briefly at the top, feel the target muscles, and control the tempo.',
  站稳: 'Set stance',
  俯身: 'Hinge',
  核心收紧: 'Brace core',
  髋部后折: 'Hinge hips',
  肩胛先动: 'Lead with shoulder blades',
  缓慢下放: 'Lower slowly',
  '胸部打开，颈部自然': 'Open the chest and keep the neck neutral',
  '膝盖微屈，背部平直': 'Soften the knees and keep the back flat',
  肩后束带动手臂展开: 'Let the rear delts drive the arms open',
  保持躯干稳定与张力: 'Keep the torso steady and maintain tension',
  俯身飞鸟顶峰收缩与肩后束发力示意: 'Bent-over reverse fly peak contraction and rear-delt focus',
  双手持哑铃自然站立: 'Stand naturally with a dumbbell in each hand',
  髋部后折进入俯身姿势: 'Hinge at the hips into the bent-over position',
  俯身姿势向两侧打开哑铃: 'Open the dumbbells to both sides from the hinged position',
  控制哑铃回到起始位置: 'Control the dumbbells back to the starting position',
  '肩胛先稳定后收，再带动双臂向两侧展开。':
    'Stabilize and retract the shoulder blades before opening both arms.',
  '肩膀下沉，颈部放松': 'Keep the shoulders down and neck relaxed',
  肩胛骨向脊柱靠拢: 'Draw the shoulder blades toward the spine',
  肘部微屈并保持固定: 'Keep a fixed soft bend in the elbows',
  背部中立: 'Neutral back',
  肩膀下沉: 'Shoulders down',
  肘部微屈: 'Soft elbows',
  控制节奏: 'Control the tempo',
  '髋部折叠，脊柱保持自然直线': 'Hinge at the hips and keep a naturally straight spine',
  '远离耳朵，肩胛稳定后收': 'Keep the shoulders away from the ears and retract with control',
  '固定角度，不要甩动小臂': 'Fix the elbow angle without swinging the forearms',
  '打开1秒 · 停1秒 · 回落2秒': 'Open 1 sec · pause 1 sec · lower 2 sec',
  斜方肌抢先发力: 'The upper traps take over',
  主动下沉肩膀: 'Actively lower the shoulders',
  下背弯曲: 'Rounded lower back',
  脊柱失去中立: 'The spine loses its neutral position',
  核心收紧并减重: 'Brace the core and reduce the load',
  重量过大: 'Too much weight',
  身体借力甩动: 'The body swings for momentum',
  全程保持可控: 'Keep every phase controlled',
  组数: 'Sets',
  次数: 'Reps',
  休息: 'Rest',
  '60–90秒': '60–90 sec',
  '双脚与髋同宽站立，核心收紧，胸部打开，哑铃自然下垂。':
    'Stand hip-width apart, brace your core, open your chest, and let the dumbbells hang naturally.',
  '髋部后折，身体前倾，膝盖微屈，保持背部自然中立。':
    'Hinge at the hips with a soft bend in the knees and keep your back naturally neutral.',
  '肩胛先稳定后收，手肘保持微屈，双臂向身体两侧打开。':
    'Stabilize and retract the shoulder blades, keep soft elbows, and open both arms to the sides.',
  '保持躯干稳定，缓慢控制哑铃回落，回到起始位置前仍保持张力。':
    'Keep the torso steady and lower with control, maintaining tension before the next rep.',
  全程保持背部自然中立: 'Keep a naturally neutral back throughout',
  '肩膀下沉，肩胛骨稳定后收': 'Keep the shoulders down and shoulder blades stable',
  手肘全程微屈且角度不变: 'Keep a fixed soft bend in the elbows',
  '选择可控制的轻重量，用肩后束而非摆动躯干发力':
    'Choose a controllable light load and use the rear delts instead of swinging the torso',
  耸肩代偿: 'Shrugging to compensate',
  下背部弯曲: 'Rounding the lower back',
  重量过大导致动作变形: 'Using too much weight and losing form',
  '2–3组': '2–3 sets',
  '12–15次': '12–15 reps',
  '休息60–90秒': 'Rest 60–90 sec',
}

type TranslationKey = keyof typeof translations.zh
type LanguageValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
  text: (value: string) => string
}
const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || 'zh',
  )
  useEffect(() => {
    localStorage.setItem(storageKey, language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])
  const t = (key: TranslationKey) => translations[language][key]
  const text = (value: string) => (language === 'en' ? exerciseText[value] || value : value)
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, text }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
