import './BodyPartGrid.css'
import { useLanguage } from '../../hooks/useLanguage'

const parts = [
  { name: '胸部', asset: 'chest' },
  { name: '背部', asset: 'back' },
  { name: '肩部', asset: 'shoulders' },
  { name: '手臂', asset: 'arms' },
  { name: '腿部', asset: 'legs' },
  { name: '臀部', asset: 'glutes' },
  { name: '核心', asset: 'core' },
  { name: '全身', asset: 'full-body' },
] as const
type BodyPart = (typeof parts)[number]['name']

export function BodyPartGrid({
  selectedBodyPart,
  onSelect,
}: {
  selectedBodyPart: string | null
  onSelect: (bodyPart: BodyPart) => void
}) {
  const { text } = useLanguage()
  return (
    <div className="body-grid">
      {parts.map(({ name, asset }) => (
        <button
          className={`body-part ${selectedBodyPart === name ? 'selected' : ''}`}
          key={name}
          onClick={() => onSelect(name)}
        >
          <span className="body-icon-shell" aria-hidden="true">
            <img
              className="body-icon body-icon-light"
              src={`/images/body-parts/${asset}.png`}
              alt=""
            />
            <img
              className="body-icon body-icon-dark"
              src={`/images/body-parts/${asset}-dark.png`}
              alt=""
            />
          </span>
          <span>{text(name)}</span>
        </button>
      ))}
    </div>
  )
}
