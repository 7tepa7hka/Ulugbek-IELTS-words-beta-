import { Sun, Moon } from 'lucide-react'
import './ThemeToggle.css'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__thumb">
        {isDark ? <Moon size={13} strokeWidth={2} /> : <Sun size={13} strokeWidth={2} />}
      </span>
    </button>
  )
}
