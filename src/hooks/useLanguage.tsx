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
    training: ' Training',
    allExercises: 'All',
    noExercises: 'No exercises have been added for this body part yet',
  },
} as const

const exerciseText: Record<string, string> = {
  哑铃卧推: 'Dumbbell Bench Press',
  上斜哑铃卧推: 'Incline Dumbbell Press',
  哑铃飞鸟: 'Dumbbell Fly',
  下斜哑铃卧推: 'Decline Dumbbell Press',
  单臂哑铃划船: 'Single-Arm Dumbbell Row',
  哑铃罗马尼亚硬拉: 'Dumbbell Romanian Deadlift',
  上斜卧推: 'Incline Press',
  二头弯举: 'Biceps Curl',
  核心训练: 'Core Training',
  胸部: 'Chest',
  背部: 'Back',
  肩部: 'Shoulders',
  手臂: 'Arms',
  腿部: 'Legs',
  臀部: 'Glutes',
  核心: 'Core',
  全身: 'Full Body',
  胸大肌: 'Pectoralis Major',
  肱三头肌: 'Triceps',
  三角肌前束: 'Front Deltoid',
  胸大肌中缝: 'Inner Chest',
  胸大肌内侧: 'Inner Pectoral',
  胸大肌下部: 'Lower Chest',
  背阔肌: 'Latissimus Dorsi',
  菱形肌: 'Rhomboids',
  肱二头肌: 'Biceps',
  臀大肌: 'Gluteus Maximus',
  腘绳肌: 'Hamstrings',
  竖脊肌: 'Erector Spinae',
  需要训练凳: 'Bench required',
  哑铃: 'Dumbbell',
  '仰卧在平板凳上，双脚踩稳地面，保持身体稳定。':
    'Lie on a flat bench with both feet firmly on the floor and your body stable.',
  '双手各持一只哑铃，掌心向前，哑铃位于胸部两侧。':
    'Hold a dumbbell in each hand, palms forward, positioned beside your chest.',
  '吸气，缓慢将哑铃下降至胸部两侧，肘部与身体保持约45度。':
    'Inhale and slowly lower the dumbbells to chest level, with elbows at about 45 degrees.',
  '呼气，胸部发力将哑铃向上推起，直到手臂接近伸直。':
    'Exhale and press upward with your chest until your arms are nearly straight.',
  '顶峰收缩后缓慢控制哑铃下降。': 'Pause at the top, then slowly lower the dumbbells with control.',
  肩胛骨向后收紧: 'Keep shoulder blades retracted',
  背部保持稳定: 'Keep your back stable',
  手腕保持中立: 'Keep wrists neutral',
  下放过程缓慢可控: 'Lower slowly with control',
  避免耸肩: 'Avoid shrugging',
  手肘过度外展: 'Flaring elbows too wide',
  下放速度过快: 'Lowering too quickly',
  借力弹起: 'Bouncing for momentum',
  手腕向后折: 'Bending wrists backward',
  臀部离开训练凳: 'Lifting hips from the bench',
  '仰卧在平板凳上，双脚踩稳地面，双手将哑铃举于胸部上方。':
    'Lie on a flat bench with both feet planted and dumbbells above your chest.',
  '仰卧地面，双膝屈曲、双脚踩稳，双手将哑铃举于胸部上方。':
    'Lie on the floor with knees bent and feet planted, holding the dumbbells above your chest.',
  '手肘保持微屈，吸气后向两侧缓慢张开手臂。':
    'Keep a soft bend in the elbows, inhale, and slowly open your arms to the sides.',
  '下放到胸部有拉伸感、肩部仍舒适的范围即可。':
    'Lower only until your chest feels stretched and your shoulders remain comfortable.',
  '缓慢张开至上臂轻触地面或肩部仍舒适的范围即可。':
    'Open slowly until your upper arms lightly touch the floor or your shoulders remain comfortable.',
  '呼气，像拥抱大树一样弧线收回哑铃。':
    'Exhale and bring the dumbbells back in a wide hugging arc.',
  手肘全程保持微屈: 'Keep a soft bend in the elbows',
  上臂轻触地面即可停止: 'Stop when the upper arms lightly touch the floor',
  下放幅度以肩部舒适为准: 'Use a shoulder-comfortable range',
  用胸部发力收回而非甩动手臂: 'Bring the weights back with your chest, not momentum',
  手肘锁死: 'Locking the elbows',
  哑铃下放过深: 'Lowering the dumbbells too deep',
  让哑铃撞击地面: 'Letting the dumbbells strike the floor',
  重量过大导致肩部不适: 'Using a load that irritates the shoulders',
  回收时撞击哑铃: 'Banging the dumbbells together',
  '双脚与髋同宽站立，髋向后移、上身前倾；空手轻扶同侧大腿。':
    'Stand hip-width apart, hinge your hips back, and lightly brace the free hand on the same-side thigh.',
  '持铃手自然下垂，肩膀远离耳朵，保持躯干稳定。':
    'Let the weight hang, keep the shoulder away from the ear, and steady your torso.',
  '将哑铃沿身体方向拉向髋部，感受肩胛骨向后下方移动。':
    'Pull the dumbbell toward your hip and feel the shoulder blade move back and down.',
  '在顶点短暂停顿，再缓慢控制哑铃下放。':
    'Pause briefly at the top, then lower the dumbbell under control.',
  先稳定躯干再拉肘: 'Stabilize the torso before pulling the elbow',
  哑铃向髋部而非胸口移动: 'Pull toward the hip, not the chest',
  避免耸肩和扭转身体: 'Avoid shrugging and torso rotation',
  身体跟着哑铃旋转: 'Rotating the torso with the dumbbell',
  用下背反复甩动: 'Swinging with the lower back',
  拉到胸口导致耸肩: 'Pulling to the chest and shrugging',
  下放过快: 'Lowering too quickly',
  '3–4组': '3–4 sets',
  '8–12次': '8–12 reps',
  '休息60–90秒': 'Rest 60–90 sec',
  '2–3组': '2–3 sets',
  '10–15次': '10–15 reps',
  '8–12次/侧': '8–12 reps / side',
  '双脚与髋同宽站立，双手各持一只哑铃放在大腿前方。':
    'Stand hip-width apart with one dumbbell in each hand in front of your thighs.',
  '膝盖微屈，吸气并将髋部向后送，让哑铃贴近双腿缓慢下滑。':
    'Soften the knees, inhale, hinge your hips back, and lower the dumbbells close to your legs.',
  '感到大腿后侧拉伸后，呼气并用臀部发力回到站立。':
    'When your hamstrings feel stretched, exhale and use your glutes to return to standing.',
  '站直后停稳，不要向后过度挺腰。':
    'Stand tall, then stop without leaning your lower back too far back.',
  这是髋部折叠而不是弯腰够地: 'Hinge at the hips instead of bending down to reach the floor',
  哑铃始终贴近双腿: 'Keep the dumbbells close to your legs',
  全程保持背部自然中立: 'Keep a naturally neutral back throughout',
  为了下得更低而圆背: 'Rounding the back to lower farther',
  膝盖弯曲过多变成深蹲: 'Bending the knees too much and turning it into a squat',
  起身时过度后仰: 'Leaning too far back at the top',
  哑铃远离双腿: 'Letting the dumbbells drift away from the legs',
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
