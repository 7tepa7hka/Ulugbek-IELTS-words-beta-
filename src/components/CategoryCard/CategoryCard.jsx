import { MoreHorizontal, Pencil, Trash2, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils/id'
import './CategoryCard.css'

export default function CategoryCard({ category, wordCount, onOpen, onRename, onDelete, style }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <article className="category-card" style={style} onClick={() => onOpen(category.id)}>
      <div className="category-card__top">
        <span className="category-card__count">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>

        <div className="category-card__menu" ref={menuRef}>
          <button
            className="category-card__menu-btn"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((v) => !v)
            }}
            aria-label="Category options"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={17} strokeWidth={1.8} />
          </button>

          {menuOpen && (
            <div className="category-card__dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  onRename(category)
                }}
              >
                <Pencil size={14} strokeWidth={1.8} /> Rename
              </button>
              <button
                className="category-card__dropdown-danger"
                onClick={() => {
                  setMenuOpen(false)
                  onDelete(category)
                }}
              >
                <Trash2 size={14} strokeWidth={1.8} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="category-card__name">{category.name}</h3>
      <p className="category-card__date">Created {formatDate(category.createdAt)}</p>

      <div className="category-card__footer">
        <span className="category-card__open">
          Open category
          <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </div>
    </article>
  )
}
