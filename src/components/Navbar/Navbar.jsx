import { useState } from 'react'
import { Search, Settings, Menu, X, ArrowLeft } from 'lucide-react'
import logoLight from '../../assets/logo-light.png'
import logoDark from '../../assets/logo-dark.png'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Translator from '../Translator/Translator'
import './Navbar.css'

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenSettings,
  showBack,
  onBack,
  categoryName,
  onUseTranslation,
  canAddWord,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          {showBack ? (
            <button className="navbar__back" onClick={onBack} aria-label="Back to categories">
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
          ) : null}
          <a className="navbar__brand" href="/" onClick={(e) => e.preventDefault()}>
            <img
              src={theme === 'dark' ? logoDark : logoLight}
              alt="Ulugbek IELTS Words"
              className="navbar__logo"
            />
            <div className="navbar__brand-text">
              <span className="navbar__title">Ulugbek IELTS Words</span>
              {showBack && categoryName && <span className="navbar__subtitle">{categoryName}</span>}
            </div>
          </a>
        </div>

        <div className="navbar__translator">
          <Translator onUseTranslation={onUseTranslation} canAddWord={canAddWord} />
        </div>

        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={onOpenSearch} aria-label="Search words">
            <Search size={18} strokeWidth={1.8} />
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button className="navbar__icon-btn" onClick={onOpenSettings} aria-label="Settings">
            <Settings size={18} strokeWidth={1.8} />
          </button>
          <button
            className="navbar__icon-btn navbar__menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-panel">
          <Translator onUseTranslation={onUseTranslation} canAddWord={canAddWord} />
        </div>
      )}
    </header>
  )
}
