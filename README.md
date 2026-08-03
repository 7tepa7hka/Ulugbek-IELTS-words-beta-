# Ulugbek IELTS Words

A personal vocabulary manager for learning IELTS English words. Black &
white, minimal, and built so you never have to write words in a notebook
again — everything saves automatically to your browser's local storage.

## Features

- Unlimited categories (School, Travel, Business, IELTS Speaking, etc.)
- Word cards with English, Russian, an optional example sentence, and an
  optional note
- Instant global search across every category
- A built-in English → Russian translator (free MyMemory API) with a
  "Use translation" shortcut that pre-fills a new word
- Light and dark mode with a smoothly animated switch
- Everything persists in `localStorage` — no accounts, no backend, no Save
  button
- Export/import a JSON backup of your data from Settings
- Fully responsive, keyboard-friendly (Enter to save, Esc to close)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. It's a static site — deploy it
anywhere that serves static files (Vercel, Netlify, GitHub Pages, etc.).

## Project structure

```
src/
  assets/            Logo and static assets
  components/        One folder per component (JSX + its own CSS file)
  hooks/
    useLocalStorage.js
  utils/
    id.js            ID generation + date formatting
    translate.js      Pluggable translation provider
  App.jsx            App state, routing between the category grid and a
                      category's word list, and all modals
  index.css          Design tokens (colors, type, spacing) + shared
                      button/field primitives
```

## Notes on the translator

Translation runs through a small provider interface in
`src/utils/translate.js`. It ships wired to MyMemory
(`api.mymemory.translated.net`), a free, keyless translation API well
suited to short phrases. To switch providers later (e.g. a paid API),
implement the same `translate(text, from, to)` method on a new class and
swap the `activeProvider` at the bottom of that file — no component code
needs to change.

## Data & privacy

All categories and words are stored only in your browser's `localStorage`,
scoped to this site. Nothing is sent anywhere except the word you're
actively translating, which is sent to the translation API. Clearing your
browser data — or using Settings → Delete all data — removes it
permanently.
# Ulugbek-IELTS-words-beta-
