import { useEffect, useRef, useState } from 'react'
import { Languages, ArrowRight, Loader2, CornerDownLeft } from 'lucide-react'
import { translateText } from '../../utils/translate'
import './Translator.css'

export default function Translator({ onUseTranslation, canAddWord }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!input.trim()) {
      setResult('')
      setStatus('idle')
      return
    }
    setStatus('loading')
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const { text, error } = await translateText(input, 'en', 'ru')
      if (error) {
        setStatus('error')
        setResult('')
      } else {
        setResult(text)
        setStatus('done')
      }
    }, 450)
    return () => clearTimeout(debounceRef.current)
  }, [input])

  return (
    <div className="translator">
      <div className="translator__field">
        <Languages size={15} strokeWidth={1.8} className="translator__icon" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Translate a word…"
          aria-label="Word to translate"
          autoComplete="off"
        />
      </div>

      <div className={`translator__result translator__result--${status}`}>
        {status === 'loading' && (
          <span className="translator__loading">
            <Loader2 size={13} className="spin" /> Translating…
          </span>
        )}
        {status === 'error' && <span className="translator__error">Translation unavailable</span>}
        {status === 'done' && result && (
          <>
            <ArrowRight size={13} strokeWidth={1.8} className="translator__arrow" />
            <span className="translator__text">{result}</span>
            <button
              type="button"
              className="translator__use"
              onClick={() => onUseTranslation(result, input)}
              title={canAddWord ? 'Fill this into a new word' : 'Open a category first to save a word'}
            >
              Use translation
              <CornerDownLeft size={12} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
