import { useMemo, useState } from 'react'
import { Search, FolderOpen } from 'lucide-react'
import Modal from '../Modal/Modal'
import './SearchModal.css'

export default function SearchModal({ categories, words, onClose, onJumpToCategory }) {
  const [query, setQuery] = useState('')

  const categoryById = useMemo(() => {
    const map = new Map()
    categories.forEach((c) => map.set(c.id, c))
    return map
  }, [categories])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return words
      .filter((w) =>
        [w.english, w.russian, w.note, w.example].some((field) =>
          (field || '').toLowerCase().includes(q)
        )
      )
      .slice(0, 60)
  }, [query, words])

  return (
    <Modal title="Search your vocabulary" onClose={onClose} width={560} className="search-modal">
      <div className="search-modal__field">
        <Search size={17} strokeWidth={1.8} className="search-modal__icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search English words, Russian translations, notes…"
          autoFocus
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
        />
      </div>

      {query.trim() && (
        <div className="search-modal__results">
          {results.length === 0 ? (
            <p className="search-modal__empty">No words match "{query.trim()}".</p>
          ) : (
            <>
              <p className="search-modal__count">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <ul className="search-modal__list">
                {results.map((word) => {
                  const category = categoryById.get(word.categoryId)
                  return (
                    <li key={word.id}>
                      <button
                        className="search-result"
                        onClick={() => category && onJumpToCategory(category.id)}
                      >
                        <div className="search-result__text">
                          <span className="search-result__english">{word.english}</span>
                          <span className="search-result__russian">{word.russian}</span>
                          {(word.note || word.example) && (
                            <span className="search-result__extra">
                              {word.example || word.note}
                            </span>
                          )}
                        </div>
                        {category && (
                          <span className="search-result__category">
                            <FolderOpen size={12} strokeWidth={1.8} />
                            {category.name}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      )}

      {!query.trim() && (
        <p className="search-modal__hint">
          Start typing to search across every category — English words, Russian translations,
          notes, and examples.
        </p>
      )}
    </Modal>
  )
}
