import { Pencil, Trash2 } from 'lucide-react'
import './WordCard.css'

export default function WordCard({ word, onEdit, onDelete, style }) {
  return (
    <article className="word-card" style={style}>
      <div className="word-card__main">
        <div className="word-card__lang">
          <span className="word-card__label">English</span>
          <p className="word-card__english">{word.english}</p>
        </div>
        <div className="word-card__lang">
          <span className="word-card__label">Russian</span>
          <p className="word-card__russian">{word.russian}</p>
        </div>

        {word.example && (
          <div className="word-card__extra">
            <span className="word-card__label">Example</span>
            <p className="word-card__example">{word.example}</p>
          </div>
        )}

        {word.note && (
          <div className="word-card__extra">
            <span className="word-card__label">Note</span>
            <p className="word-card__note">{word.note}</p>
          </div>
        )}
      </div>

      <div className="word-card__actions">
        <button className="word-card__btn" onClick={() => onEdit(word)} aria-label={`Edit ${word.english}`}>
          <Pencil size={15} strokeWidth={1.8} />
        </button>
        <button
          className="word-card__btn word-card__btn--danger"
          onClick={() => onDelete(word)}
          aria-label={`Delete ${word.english}`}
        >
          <Trash2 size={15} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  )
}
