import { useRef } from 'react'
import { Download, Upload, Trash2, Sun, Moon } from 'lucide-react'
import Modal from '../Modal/Modal'
import './SettingsModal.css'

export default function SettingsModal({
  theme,
  onToggleTheme,
  categories,
  words,
  onClose,
  onImport,
  onClearAll,
}) {
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      categories,
      words,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ulugbek-ielts-words-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        onImport(data)
      } catch {
        alert('This file could not be read. Please choose a valid backup file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <Modal title="Settings" onClose={onClose} width={460}>
      <section className="settings-section">
        <h3 className="settings-section__title">Appearance</h3>
        <button className="settings-row" onClick={onToggleTheme}>
          <span className="settings-row__label">
            {theme === 'dark' ? <Moon size={17} strokeWidth={1.8} /> : <Sun size={17} strokeWidth={1.8} />}
            {theme === 'dark' ? 'Dark mode' : 'Light mode'}
          </span>
          <span className="settings-row__hint">Tap to switch</span>
        </button>
      </section>

      <section className="settings-section">
        <h3 className="settings-section__title">Your data</h3>
        <p className="settings-section__desc">
          {categories.length} {categories.length === 1 ? 'category' : 'categories'} ·{' '}
          {words.length} {words.length === 1 ? 'word' : 'words'} · stored only on this device
        </p>

        <button className="settings-row" onClick={handleExport}>
          <span className="settings-row__label">
            <Download size={17} strokeWidth={1.8} /> Export backup
          </span>
          <span className="settings-row__hint">.json file</span>
        </button>

        <button className="settings-row" onClick={handleImportClick}>
          <span className="settings-row__label">
            <Upload size={17} strokeWidth={1.8} /> Import backup
          </span>
          <span className="settings-row__hint">Replace current data</span>
        </button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="visually-hidden"
        />
      </section>

      <section className="settings-section">
        <h3 className="settings-section__title settings-section__title--danger">Danger zone</h3>
        <button className="settings-row settings-row--danger" onClick={onClearAll}>
          <span className="settings-row__label">
            <Trash2 size={17} strokeWidth={1.8} /> Delete all data
          </span>
        </button>
      </section>
    </Modal>
  )
}
