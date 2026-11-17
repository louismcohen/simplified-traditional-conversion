# 繁簡橋 — Traditional Transition Learner

A small study app for learners at about **HSK 1 simplified** who want to move to **Taiwan traditional** characters. It teaches transition methods and drills — it is not a live converter.

## What you practice

1. **Same-form first** — characters that are identical in both scripts  
2. **Component patterns** — reversible radicals (門↔门, 言↔讠, …)  
3. **Divergent flashcards** — only HSK 1 items that actually differ  
4. **Recognition ↔ production quiz** — simplified→traditional and traditional→meaning  

Progress (known cards, patterns done, quiz best) stays in the browser via `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://127.0.0.1:3457`).

```bash
npm run build    # production build
npm run preview  # serve the build on the same port
```

## Stack

Vite, React, TypeScript, Tailwind CSS, React Router. Curriculum data lives in `src/data/`.
