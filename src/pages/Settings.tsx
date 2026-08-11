import {
  ChevronRight,
  CircleHelp,
  Download,
  Moon,
  Paintbrush,
  Trash2,
  Type,
  WalletCards,
} from 'lucide-react'
import type { ElementType, ReactNode } from 'react'
import { AppHeader } from '../components/AppHeader/AppHeader'
import type { Theme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
// const rows = [
//   ['displaySettings', Paintbrush],
//   ['fontSize', Type],
//   ['clearCache', Trash2],
//   ['backup', Download],
//   ['about', CircleHelp],
//   ['terms', WalletCards],
//   ['privacy', WalletCards],
// ] as const
export function Settings({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <main className="page">
      <AppHeader title={t('profile')} tab />
      <div className="settings card">
        <SettingRow label={t('darkMode')} Icon={Moon}>
          <button
            className={`switch ${theme === 'dark' ? 'on' : ''}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={t('darkMode')}
          >
            <i />
          </button>
        </SettingRow>
        <SettingRow label={t('language')} Icon={Type}>
          <button
            className="language-switch"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          >
            {language === 'zh' ? '中文' : 'English'}
          </button>
        </SettingRow>
        {/* {rows.map(([key, Icon]) => (
          <SettingRow label={t(key)} Icon={Icon} key={key}>
            <ChevronRight size={18} />
          </SettingRow>
        ))} */}
      </div>
    </main>
  )
}
function SettingRow({
  label,
  Icon,
  children,
}: {
  label: string
  Icon: ElementType
  children: ReactNode
}) {
  return (
    <div className="setting-row">
      <Icon size={19} />
      <span>{label}</span>
      <div>{children}</div>
    </div>
  )
}
