---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Write a purchase in the notebook and see a seed appear**
  Becomes usable: A running Next.js app showing a simple garden plot and a 📖 button. The notebook's new-entry page searches real coins from CoinGecko, validates the entry, and on close a seed appears in the next plot slot. Plants are held in memory only for now.
  Why now: Bootstraps the whole stack (Next.js, TypeScript, theme.css, fonts) and proves the riskiest unknown first. It confirms the CoinGecko `/search` call works through our server route, without a key, with the fields the spec assumes.
  PRD ref: `prd.md > The Core Journey` (steps 1–3), `prd.md > The Notebook`, `prd.md > States and Boundaries` (invalid entry)
  Spec ref: `spec.md > Stack`, `spec.md > File Structure`, `spec.md > Look and Feel`, `spec.md > CoinGardenApp — components/CoinGardenApp.tsx`, `spec.md > Notebook — components/notebook/Notebook.tsx`, `spec.md > CoinSearch — components/notebook/CoinSearch.tsx`, `spec.md > API: Coin Search — app/api/coins/search/route.ts`, `spec.md > CoinGecko Server Client — lib/coingecko.ts`, `spec.md > Data Model`
  Build:
  - Scaffold Next.js (App Router, TS) at the project root without clobbering `devpost/`, `.agents/`, `.claude/`, or `.gitignore`.
  - Add `app/theme.css`, `globals.css`, and the Fredoka/Nunito fonts.
  - Add `lib/types.ts`, `lib/coingecko.ts`, `app/api/coins/search/route.ts`, and `lib/priceClient.ts` (search).
  - Add `CoinGardenApp` with an in-memory plant list, `TopBar` with 📖, and a basic `GardenScene` with plot slots and seed placeholders.
  - Add `Notebook` with `NewEntryPage` and `CoinSearch`.
  Verify (mechanical):
  - `npm run build` succeeds.
  - `curl "http://localhost:3000/api/coins/search?q=bit"` returns `coins` including `bitcoin`.
  - Grep confirms no hex colours outside `app/theme.css`.
  Learner check: Run `npm run dev`, open http://localhost:3000, tap 📖, type "eth", pick Ethereum, and fill in a price, amount and date. Close the book and see a seed in the plot. Try saving with an empty field and see the notebook point at it.
  Commit: `Scaffold Coin Garden and plant seeds from the notebook`

- [x] **2. Seeds grow with real prices**
  Becomes usable: Each plant shows its real growth stage (seed, sprout, 4 leaves, bud, sunflower) from the current CoinGecko price versus its buy price. A plant whose price can't be found stays a seed with a "!" badge.
  Why now: This is the kernel: patience grows the plant, and losses stay seeds. It must work early. It also proves the second CoinGecko call and the 60-second cache.
  PRD ref: `prd.md > The Garden`, `prd.md > Live Prices`, `prd.md > States and Boundaries` (price not found / no connection)
  Spec ref: `spec.md > Growth Logic — lib/growth.ts`, `spec.md > API: Prices — app/api/prices/route.ts`, `spec.md > Plant — components/garden/Plant.tsx`, `spec.md > useGarden — hooks/useGarden.ts`, `spec.md > Important Failure Modes`
  Build:
  - Add `lib/growth.ts` (`stageFor`, `STAGES`) with Vitest tests.
  - Add `app/api/prices/route.ts` (cached about 60 seconds) and the price fetch in `priceClient`.
  - Add a `useGarden` hook that fetches prices for the plant coin ids.
  - Add `Plant` SVGs for stages 0–4, plus the "!" badge.
  Verify (mechanical):
  - `npm test` passes, covering the thresholds 1.24, 1.25, 1.5, 1.75 and 2, plus a missing price.
  - `curl "http://localhost:3000/api/prices?ids=bitcoin,notacoin"` returns a BTC price and omits `notacoin`.
  - `npm run build` succeeds.
  Learner check: Plant a coin with a buy price far below today's price (e.g. BTC at 1,000) and see a sunflower. Plant one above today's price and see a plain seed with no wilting.
  Commit: `Grow plants from live CoinGecko prices`

- [x] **3. Press Demo and watch BTC grow into a sunflower**
  Becomes usable: The Demo button plants a single BTC demo plant at the current BTC price. Over about 10 seconds it grows through every stage into a sunflower, and then stays tinted and labelled "Demo". Pressing it again replays the same plant, and real plants are untouched.
  Why now: This is the "oh, that's cool" moment from `scope.md > What "Working" Looks Like`, and it's the heart of the demo video. Building it right after the growth logic proves `stageFor` drives both live and simulated growth.
  PRD ref: `prd.md > Demo`
  Spec ref: `spec.md > useDemo — hooks/useDemo.ts`, `spec.md > TopBar and DemoButton — components/TopBar.tsx, components/DemoButton.tsx`, `spec.md > Plant — components/garden/Plant.tsx`
  Build:
  - Add `useDemo` (requestAnimationFrame, 10s, from buy price to 2×, offline fallback of a labelled 60,000 USD sample).
  - Add `DemoButton`, disabled while running.
  - Add the demo tint and "Demo" label in `Plant`.
  Verify (mechanical):
  - `npm run build` succeeds.
  - Add a unit test for the demo price curve (start = buy, end = 2× buy, every stage reached).
  - `npm test` passes.
  Learner check: Press Demo and watch the BTC plant go seed → sprout → 4 leaves → bud → sunflower in about 10 seconds. Confirm your other plants didn't change. Press Demo again and see the same plant replay instead of a second one.
  Commit: `Add 10-second BTC Demo growth`

- [x] **4. The garden remembers you**
  Becomes usable: Purchases and the finished Demo sunflower are still there after closing and reopening the browser, with no hydration warning.
  Why now: The PRD says plants are never lost, and lessons (next slice) need somewhere to live. This is also the agreed investigation from `spec.md > Decisions and Open Issues`: see the hydration trap, then fix it.
  PRD ref: `prd.md > States and Boundaries` (persistence)
  Spec ref: `spec.md > Storage — lib/storage.ts`, `spec.md > useGarden — hooks/useGarden.ts`, `spec.md > Data Model`, `spec.md > Decisions and Open Issues`
  Build:
  - Add `lib/storage.ts` with a defensive parse, plus tests.
  - Make `useGarden` load after mount and save on change.
  - Persist `demoComplete`.
  - Briefly demonstrate the render-time read, which shows the hydration warning, then the `useEffect` version, which removes it.
  Verify (mechanical):
  - `npm test` passes, including corrupt-JSON and unknown-version cases.
  - `npm run build` succeeds.
  - Reload the page and confirm the saved plants are restored and the console shows no hydration error.
  Learner check: Plant two coins, run Demo, close the tab, and reopen it. Everything is still there. In DevTools → Network, confirm the browser only calls `/api/...`, never `api.coingecko.com`.
  Commit: `Persist the garden in localStorage`

- [ ] **5. Tap a plant to read its notebook page and lesson**
  Becomes usable: Tapping a plant opens its own notebook page with the recorded details, current gain or the "!" explanation, and a lesson field that saves. Tapping a sunflower shows its lesson in a bubble above it, falling back to a built-in lesson; the Demo flower always shows a built-in one. The notebook also has the "How your garden grows" and "Your seed can become this" pages.
  Why now: It completes the reflection half of the kernel and closes the core loop (steps 5–6) on top of persistent data.
  PRD ref: `prd.md > The Notebook`, `prd.md > Lessons`, `prd.md > The Core Journey` (steps 5–6)
  Spec ref: `spec.md > Notebook — components/notebook/Notebook.tsx`, `spec.md > LessonBubble — components/garden/LessonBubble.tsx`, `spec.md > Lessons — lib/lessons.ts`
  Build:
  - Add `PlantPage` (with the lesson saved on blur), `GuidePage` (from `STAGES`), and `PreviewPage`.
  - Add `lib/lessons.ts` (`lessonFor`, deterministic) and `LessonBubble`.
  - Add notebook page navigation.
  Verify (mechanical):
  - Unit test for `lessonFor`: own lesson first, built-in fallback, stable per plant id.
  - `npm test` and `npm run build` pass.
  Learner check: Tap a plant and see exactly what you entered. Write a lesson, reload, tap the sunflower, and see your lesson above it. Tap the Demo flower and see a built-in lesson.
  Commit: `Add plant pages, lessons and notebook guide`

- [ ] **6. The picture-book farm**
  Becomes usable: The full look from `prd.md > Look and Feel`:
  - The isometric SVG farm world with trees and a pond.
  - Faint soil rows, the on-world welcome text, and the "Plant your first seed" sign when the garden is empty, with no numbers.
  - Chunky wooden-toy UI and ambient motion (respecting reduced motion).
  - The mobile stacked layout.
  Why now: The logic is proven and stable, so polish can't break hidden plumbing. The early checkpoint's feedback (after slice 3) shapes it.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`, `prd.md > States and Boundaries` (first use)
  Spec ref: `spec.md > GardenScene — components/garden/GardenScene.tsx`, `spec.md > WelcomeSign — components/garden/WelcomeSign.tsx`, `spec.md > Look and Feel`, `spec.md > Page Shell — app/page.tsx`
  Build:
  - Draw the isometric scene and slot placement (4×3, adding rows).
  - Add `WelcomeSign`, the on-world title, the `.chunky` buttons, and ambient keyframes behind `prefers-reduced-motion`.
  - Add the responsive layout below 640px.
  - Add a neutral pre-mount state.
  Verify (mechanical):
  - `npm run build` succeeds.
  - Grep confirms no colour literals outside `app/theme.css`.
  - Check the empty-garden render (fresh storage) for the sign and the absence of numbers.
  - Check at 375px and 1280px widths.
  Learner check: Open a private window and see your own empty plot, the welcome line, the sign, Demo and 📖, with nothing else. Resize to phone width. Then plant a seed and press Demo, and judge whether it feels like a storybook farm.
  Commit: `Picture-book farm scene and responsive layout`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 3 (plant from the notebook, real growth, Demo), before visual polish is locked in. *Not performed: the learner chose to continue straight to slices 4–6; early feedback folds into the final review.*
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence:
Route and stops:
Edit outcome:
Reflection:
Activity mode:

## Revisions

- **Route caching uses `"use cache"` with `cacheLife("minutes")` in `lib/coingecko.ts`, not `fetch(..., { next: { revalidate: 60 } })`.** The scaffold is Next.js 16.4 with Cache Components enabled, which caches through `use cache` helpers. The `minutes` profile revalidates every 60s, so the behaviour is the same.
- **`@types/node` was bumped to ^24 so Vitest 5 installs.** Its peer range excludes the scaffold's ^20. The runtime is Node 24.
- **CoinGecko keyless access was verified.** On 2026-10-13, `/search` and `/simple/price` both worked without a key, with the fields the spec assumed.
- **Added `demoSamplePrice?: boolean` to `Plant`, and moved the demo price curve into `lib/demo.ts`.** The labelled sample fallback needs to be remembered on the plant, and keeping the curve pure makes it unit-testable.
- **The hydration demonstration (read `localStorage` during render, see the warning, fix it) moved to the learning wrap-up, and the browser reload/console check moved to the final review.** The agent has no browser to observe console warnings in fast mode. The fix (load in `useEffect` after mount) is implemented in `hooks/useGarden.ts`.
- **A demo plant interrupted by a reload now loads as a finished sunflower.** Previously it would have been stuck as a seed, because the simulated price isn't stored.

