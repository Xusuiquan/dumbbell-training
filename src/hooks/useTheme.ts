import { useEffect, useState } from 'react'
export type Theme = 'light' | 'dark'
const key = 'dumbbell-theme'
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(key) as Theme) ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(key, theme)
  }, [theme])
  return { theme, setTheme }
}
