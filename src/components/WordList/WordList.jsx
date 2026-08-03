import { BookOpen, Plus } from 'lucide-react'
import WordCard from '../WordCard/WordCard'
import EmptyState from '../EmptyState/EmptyState'
import './WordList.css'

export default function WordList({ category, words, onAddWord, onEditWord, onDeleteWord }) {
  return (
    <div className="word-list">
      <div className="word-list__header">
        <div>
          <h1 className="word-list__title">{category.name}</h1>
          <p className="word-list__subtitle">
            {words.length} {words.length === 1 ? 'word' : 'words'} saved
          </p>
        </div>
        <button className="btn btn-primary word-list__cta" onClick={onAddWord}>
          <Plus size={16} strokeWidth={2} /> Add word
        </button>
      </div>

      {words.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No words in this category yet"
          description="Add your first word — the English form, its Russian translation, and an optional example or note to help it stick."
          action={
            <button className="btn btn-primary" onClick={onAddWord}>
              <Plus size={16} strokeWidth={2} /> Add word
            </button>
          }
        />
      ) : (
        <div className="word-list__items">
          {words.map((word, i) => (
            <WordCard
              key={word.id}
              word={word}
              onEdit={onEditWord}
              onDelete={onDeleteWord}
              style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
