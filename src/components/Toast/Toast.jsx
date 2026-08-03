import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import './Toast.css'

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2600)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="toast" role="status">
      <CheckCircle2 size={16} strokeWidth={1.8} />
      <span>{message}</span>
    </div>
  )
}
