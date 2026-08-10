import { useEffect } from 'react'
import './Toast.css'

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onDismiss, 1800)
    return () => window.clearTimeout(timeout)
  }, [onDismiss])

  return (
    <div className="toast" role="status" aria-live="polite">
      <span>{message}</span>
    </div>
  )
}
