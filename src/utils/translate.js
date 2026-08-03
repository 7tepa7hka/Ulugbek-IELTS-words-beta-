/**
 * Translation service
 * ---------------------------------------------------------------
 * A small, swappable architecture so the translation backend can be
 * changed later (e.g. to a paid provider or a self-hosted service)
 * without touching any component code.
 *
 * Every provider implements: async translate(text, from, to) => string
 *
 * Default provider: MyMemory (https://mymemory.translated.net) —
 * a free, keyless translation API well suited for short phrases.
 */

class MyMemoryProvider {
  async translate(text, from = 'en', to = 'ru') {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${from}|${to}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Translation request failed (${response.status})`)
    }

    const data = await response.json()
    const translated = data?.responseData?.translatedText

    if (!translated) {
      throw new Error('No translation returned')
    }

    return translated
  }
}

// Swap this line to plug in a different provider later.
const activeProvider = new MyMemoryProvider()

/**
 * Translate a word or phrase.
 * Returns { text, error } — never throws, so callers can render
 * a clean inline error state instead of crashing the UI.
 */
export async function translateText(text, from = 'en', to = 'ru') {
  const trimmed = text.trim()
  if (!trimmed) {
    return { text: '', error: null }
  }

  try {
    const result = await activeProvider.translate(trimmed, from, to)
    return { text: result, error: null }
  } catch (err) {
    return { text: '', error: err.message || 'Translation unavailable' }
  }
}
