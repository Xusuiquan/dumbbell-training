import { Search as SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { ExerciseCard } from '../components/ExerciseCard/ExerciseCard'
import { exercises } from '../data/exerciseCatalog'
import { useLanguage } from '../hooks/useLanguage'
import './Pages.css'
export function Search({
  favorites,
  onToggle,
}: {
  favorites: string[]
  onToggle: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const { t, text } = useLanguage()
  const results = useMemo(
    () =>
      exercises.filter((item) =>
        `${item.name}${text(item.name)}${item.bodyPart}${text(item.bodyPart)}${item.targetMuscles.join('')}${item.targetMuscles.map(text).join('')}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query, text],
  )
  return (
    <main className="page">
      <AppHeader title={t('search')} />
      <label className="search-box">
        <SearchIcon size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchPlaceholder')}
        />
      </label>
      {!query && (
        <>
          <h2 className="section-title">{t('recentSearches')}</h2>
          <div className="filter-row static-tags">
            {['哑铃卧推', '侧平举', '背部'].map((x) => (
              <span className="chip" key={x}>
                {text(x)}
              </span>
            ))}
          </div>
          <h2 className="section-title">{t('popularSearches')}</h2>
          <div className="filter-row static-tags">
            {['哑铃卧推', '哑铃推举', '胸部', '肩部'].map((x) => (
              <span className="chip" key={x}>
                {text(x)}
              </span>
            ))}
          </div>
        </>
      )}
      <h2 className="section-title">{t('searchResults')}</h2>
      {results.map((item) => (
        <ExerciseCard
          key={item.id}
          exercise={item}
          favorite={favorites.includes(item.id)}
          onToggle={onToggle}
        />
      ))}
    </main>
  )
}
