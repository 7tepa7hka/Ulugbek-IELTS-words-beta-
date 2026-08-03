import { useState } from 'react'
import Modal from '../Modal/Modal'
import './CategoryModal.css'

export default function CategoryModal({ category, existingNames, onClose, onSave }) {
  const [name, setName] = useState(category?.name || '')
  const [error, setError] = useState('')

  const isEditing = !!category

  const handleSubmit = (e) => {
    e?.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Give this category a name.')
      return
    }
    const isDuplicate =
      existingNames.includes(trimmed.toLowerCase()) &&
      trimmed.toLowerCase() !== category?.name.toLowerCase()
    if (isDuplicate) {
      setError('You already have a category with this name.')
      return
    }
    onSave(trimmed)
  }

  return (
    <Modal title={isEditing ? 'Rename category' : 'New category'} onClose={onClose} width={420}>
      <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
        <div className="field">
          <label className="field__label" htmlFor="category-name">
            Category name
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (error) setError('')
            }}
            placeholder="e.g. IELTS Speaking"
            maxLength={40}
            autoFocus
          />
          {error && <span className="field__error">{error}</span>}
        </div>

        <div className="category-modal__actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save changes' : 'Create category'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
