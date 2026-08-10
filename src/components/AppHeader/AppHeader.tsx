import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import './AppHeader.css'
export function AppHeader({
  title,
  subtitle,
  back = false,
  tab = false,
  action,
}: {
  title: string
  subtitle?: string
  back?: boolean
  tab?: boolean
  action?: ReactNode
}) {
  const navigate = useNavigate()
  const { t } = useLanguage()
  return (
    <header className={`app-header ${back ? 'has-back' : ''} ${tab ? 'tab-header' : ''}`}>
      {back && (
        <button className="icon-button" onClick={() => navigate(-1)} aria-label={t('back')}>
          <ArrowLeft size={23} />
        </button>
      )}
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="header-action">{action}</div>}
    </header>
  )
}
