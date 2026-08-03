import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './Modal.css'

export default function Modal({ title, onClose, children, width = 460, className = '' }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const timer = setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        'input, textarea, select, button:not(.modal__close)'
      )
      ;(focusable || panelRef.current)?.focus()
    }, 60)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal-panel ${className}`}
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="modal-panel__header">
          <h2 className="modal-panel__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>
        <div className="modal-panel__body">{children}</div>
      </div>
    </div>
  )
}
