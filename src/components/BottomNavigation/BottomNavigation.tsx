import { Dumbbell, House, Star, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import './BottomNavigation.css'
const items = [
  ['/', 'home', House],
  ['/exercises', 'library', Dumbbell],
  ['/favorites', 'favorites', Star],
  ['/settings', 'profile', UserRound],
] as const
export function BottomNavigation() {
  const { t } = useLanguage()
  return (
    <nav className="bottom-nav">
      {items.map(([to, key, Icon]) => (
        <NavLink to={to} key={to} end={to === '/'}>
          <Icon size={21} />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
