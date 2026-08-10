import { useState } from 'react'
const key = 'dumbbell-favorites'
const initial = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as string[]
  } catch {
    return []
  }
}
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(initial)
  const toggleFavorite = (id: string) => {
    const willSave = !favorites.includes(id)
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
    return willSave
  }
  return { favorites, toggleFavorite }
}
