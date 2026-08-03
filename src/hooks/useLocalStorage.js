import { useEffect, useRef, useState } from 'react'

/**
 * useLocalStorage
 * Persists state to localStorage automatically — no save button, ever.
 * Falls back gracefully if localStorage is unavailable (private browsing, etc).
 */
export function useLocalStorage(key, initialValue) {
  const isFirstRun = useRef(true)

  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err)
    }
    isFirstRun.current = false
  }, [key, value])

  return [value, setValue]
}
