import { useState } from 'react'
import Modal from '../Modal/Modal'
import './WordModal.css'

export default function WordModal({ word, prefillRussian, prefillEnglish, onClose, onSave }) {
  const [english, setEnglish] = useState(word?.english || prefillEnglish || '')
  const [russian, setRussian] = useState(word?.russian || prefillRussian || '')
  const [example, setExample] = useState(word?.example || '')
  const [note, setNote] = useState(word?.note || '')
  const [errors, setErrors] = useState({})

  const isEditing = !!word

  const handleSubmit = (e) => {
    e?.preventDefault()
    const nextErrors = {}
    if (!english.trim()) nextErrors.english = 'Add the English word.'
    if (!russian.trim()) nextErrors.russian = 'Add the Russian translation.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    onSave({
      english: english.trim(),
      russian: russian.trim(),
      example: example.trim(),
      note: note.trim(),
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && (e.metaKey || e.ctrlKey || e.target.tagName === 'INPUT')) {
      handleSubmit(e)
    }
  }

  return (
    <Modal title={isEditing ? 'Edit word' : 'Add word'} onClose={onClose} width={480}>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="field">
          <label className="field__label" htmlFor="word-english">
            English word
          </label>
          <input
            id="word-english"
            type="text"
            value={english}
            onChange={(e) => {
              setEnglish(e.target.value)
              if (errors.english) setErrors((p) => ({ ...p, english: null }))
            }}
            placeholder="e.g. Ubiquitous"
            autoFocus
          />
          {errors.english && <span className="field__error">{errors.english}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="word-russian">
            Russian translation
          </label>
          <input
            id="word-russian"
            type="text"
            value={russian}
            onChange={(e) => {
              setRussian(e.target.value)
              if (errors.russian) setErrors((p) => ({ ...p, russian: null }))
            }}
            placeholder="e.g. Повсеместный"
          />
          {errors.russian && <span className="field__error">{errors.russian}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="word-example">
            Example sentence <span className="field__optional">Optional</span>
          </label>
          <textarea
            id="word-example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="Smartphones have become ubiquitous in modern life."
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="word-note">
            Note <span className="field__optional">Optional</span>
          </label>
          <textarea
            id="word-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A memory hook, synonym, or context for this word."
          />
        </div>

        <div className="word-modal__actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save changes' : 'Add word'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
