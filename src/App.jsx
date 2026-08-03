import { useEffect, useMemo, useState, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createId } from './utils/id'

import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Navbar from './components/Navbar/Navbar'
import CategoryGrid from './components/CategoryGrid/CategoryGrid'
import WordList from './components/WordList/WordList'
import CategoryModal from './components/CategoryModal/CategoryModal'
import WordModal from './components/WordModal/WordModal'
import SearchModal from './components/SearchModal/SearchModal'
import SettingsModal from './components/SettingsModal/SettingsModal'
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog'
import Toast from './components/Toast/Toast'

import './App.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useLocalStorage('uiw-theme', 'dark')
  const [categories, setCategories] = useLocalStorage('uiw-categories', [])
  const [words, setWords] = useLocalStorage('uiw-words', [])

  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [categoryModal, setCategoryModal] = useState({ open: false, category: null })
  const [wordModal, setWordModal] = useState({
    open: false,
    word: null,
    prefillRussian: '',
    prefillEnglish: '',
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(null)
  const [toast, setToast] = useState(null)

  // Apply theme to document root so CSS variables cascade everywhere
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Loading screen — brief, elegant entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1900)
    return () => clearTimeout(timer)
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !searchOpen) {
        const tag = document.activeElement?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSettingsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  const showToast = useCallback((message) => {
    setToast({ id: createId(), message })
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  const wordCountFor = (categoryId) => words.filter((w) => w.categoryId === categoryId).length

  // ---- Category actions ----
  const createCategory = (name) => {
    const category = { id: createId(), name: name.trim(), createdAt: new Date().toISOString() }
    setCategories((prev) => [category, ...prev])
    showToast(`Category "${category.name}" created`)
  }

  const renameCategory = (id, name) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: name.trim() } : c)))
    showToast('Category renamed')
  }

  const requestDeleteCategory = (category) => {
    const count = wordCountFor(category.id)
    setConfirmDialog({
      title: `Delete "${category.name}"?`,
      message:
        count > 0
          ? `This will permanently remove this category and all ${count} word${count === 1 ? '' : 's'} inside it. This can't be undone.`
          : `This will permanently remove this category. This can't be undone.`,
      confirmLabel: 'Delete category',
      danger: true,
      onConfirm: () => {
        setCategories((prev) => prev.filter((c) => c.id !== category.id))
        setWords((prev) => prev.filter((w) => w.categoryId !== category.id))
        if (activeCategoryId === category.id) setActiveCategoryId(null)
        showToast(`Category "${category.name}" deleted`)
        setConfirmDialog(null)
      },
    })
  }

  // ---- Word actions ----
  const saveWord = (data) => {
    if (wordModal.word) {
      setWords((prev) => prev.map((w) => (w.id === wordModal.word.id ? { ...w, ...data } : w)))
      showToast('Word updated')
    } else {
      const word = {
        id: createId(),
        categoryId: activeCategoryId,
        createdAt: new Date().toISOString(),
        ...data,
      }
      setWords((prev) => [word, ...prev])
      showToast('Word added')
    }
    setWordModal({ open: false, word: null, prefillRussian: '', prefillEnglish: '' })
  }

  const requestDeleteWord = (word) => {
    setConfirmDialog({
      title: `Delete "${word.english}"?`,
      message: "This word will be permanently removed from this category. This can't be undone.",
      confirmLabel: 'Delete word',
      danger: true,
      onConfirm: () => {
        setWords((prev) => prev.filter((w) => w.id !== word.id))
        showToast('Word deleted')
        setConfirmDialog(null)
      },
    })
  }

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId) || null,
    [categories, activeCategoryId]
  )

  const activeWords = useMemo(
    () => words.filter((w) => w.categoryId === activeCategoryId),
    [words, activeCategoryId]
  )

  if (isLoading) {
    return <LoadingScreen theme={theme} />
  }

  return (
    <div className="app">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        showBack={!!activeCategory}
        onBack={() => setActiveCategoryId(null)}
        categoryName={activeCategory?.name}
        onUseTranslation={(russian, english) =>
          setWordModal({ open: true, word: null, prefillRussian: russian, prefillEnglish: english })
        }
        canAddWord={!!activeCategory}
        onAddWordFromTranslator={() => setWordModal({ open: true, word: null, prefillRussian: '', prefillEnglish: '' })}
      />

      <main className="app-main">
        {!activeCategory ? (
          <CategoryGrid
            categories={categories}
            wordCountFor={wordCountFor}
            onOpenCategory={(id) => setActiveCategoryId(id)}
            onCreateCategory={() => setCategoryModal({ open: true, category: null })}
            onRenameCategory={(category) => setCategoryModal({ open: true, category })}
            onDeleteCategory={requestDeleteCategory}
          />
        ) : (
          <WordList
            category={activeCategory}
            words={activeWords}
            onAddWord={() => setWordModal({ open: true, word: null, prefillRussian: '', prefillEnglish: '' })}
            onEditWord={(word) => setWordModal({ open: true, word, prefillRussian: '', prefillEnglish: '' })}
            onDeleteWord={requestDeleteWord}
          />
        )}
      </main>

      {categoryModal.open && (
        <CategoryModal
          category={categoryModal.category}
          existingNames={categories.map((c) => c.name.toLowerCase())}
          onClose={() => setCategoryModal({ open: false, category: null })}
          onSave={(name) => {
            if (categoryModal.category) renameCategory(categoryModal.category.id, name)
            else createCategory(name)
            setCategoryModal({ open: false, category: null })
          }}
        />
      )}

      {wordModal.open && (
        <WordModal
          word={wordModal.word}
          prefillRussian={wordModal.prefillRussian}
          prefillEnglish={wordModal.prefillEnglish}
          onClose={() => setWordModal({ open: false, word: null, prefillRussian: '', prefillEnglish: '' })}
          onSave={saveWord}
        />
      )}

      {searchOpen && (
        <SearchModal
          categories={categories}
          words={words}
          onClose={() => setSearchOpen(false)}
          onJumpToCategory={(id) => {
            setActiveCategoryId(id)
            setSearchOpen(false)
          }}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          theme={theme}
          onToggleTheme={toggleTheme}
          categories={categories}
          words={words}
          onClose={() => setSettingsOpen(false)}
          onImport={(data) => {
            if (data.categories) setCategories(data.categories)
            if (data.words) setWords(data.words)
            showToast('Data imported')
          }}
          onClearAll={() => {
            setConfirmDialog({
              title: 'Delete all data?',
              message:
                'This permanently removes every category and word from this device. This can\'t be undone.',
              confirmLabel: 'Delete everything',
              danger: true,
              onConfirm: () => {
                setCategories([])
                setWords([])
                setActiveCategoryId(null)
                showToast('All data cleared')
                setConfirmDialog(null)
                setSettingsOpen(false)
              },
            })
          }}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog {...confirmDialog} onCancel={() => setConfirmDialog(null)} />
      )}

      {toast && <Toast key={toast.id} message={toast.message} onDone={() => setToast(null)} />}
    </div>
  )
}
