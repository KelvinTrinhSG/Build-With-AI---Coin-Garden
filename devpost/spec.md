---
doc: spec
status: approved
---

# Coin Garden — Technical Spec

## How This Works, In Plain Language
Coin Garden is a **Next.js** web app deployed on **Vercel**, so anyone can open it from a link.

It has two halves:

- **The browser half (Client Components).** This is everything you see and touch: the garden scene, the plants, the notebook, and the Demo button. Your purchases and lessons are saved in the browser's `localStorage`, like a sticky note the browser keeps for this one site. So every person who opens the link gets their own private garden, and nothing is stored on a server.
- **The server half (Route Handlers).** These are two small endpoints, `/api/coins/search` and `/api/prices`. The browser asks them, and they ask CoinGecko. They cache each answer for about 60 seconds and share it between all visitors. That keeps us under CoinGecko's free rate limits and gives one place to hold an API key later.

At the centre sits one small, pure function: *given a buy price and a current price, which growth stage is this plant in?* It knows nothing about React, storage, or networks. The garden, the notebook, and the Demo all use it, so the plant's look is decided in exactly one place.

**Why this shape:** a single Next.js app covers both halves with one deploy. `localStorage` avoids accounts and databases, which the PRD doesn't need. The server proxy is the one piece of real architecture, and it earns its place by guarding the price feed.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **Arrive.** The server sends the page shell. In the browser, `useGarden` reads `localStorage` *after mount*, so server and browser HTML match and there is no hydration mismatch. With no plants saved, `GardenScene` shows the empty plot, `WelcomeSign`, faint soil rows and ambient motion, with no numbers.
2. **Plant.** Tapping the sign or 📖 opens `Notebook` on `NewEntryPage`. Typing in `CoinSearch` calls `/api/coins/search?q=…` (debounced about 300ms). The server asks CoinGecko `/search` and returns the top matches. Choosing one stores its CoinGecko `id` (e.g. `bitcoin`).
3. **See the seed.** On a valid save, `useGarden` adds a `Plant` to state and writes it to `localStorage`. Closing the notebook reveals the new seed in the next free plot slot.
4. **Watch it grow.** `useGarden` gathers the unique coin ids and calls `/api/prices?ids=bitcoin,ethereum`. The server asks CoinGecko `/simple/price` (cached about 60 seconds). For each plant, `stageFor(buyPrice, currentPrice)` returns the stage, and `Plant` draws it.
5. **Revisit.** Tapping a plant opens `Notebook` on that plant's `PlantPage`. Editing the lesson saves it to `localStorage`.
6. **Bloom and reflect.** Tapping a sunflower shows `LessonBubble` above it, with the plant's own lesson or a built-in one from `lessons.ts`.
7. **Demo.** `useDemo` creates or resets the single demo BTC plant. For about 10 seconds it animates a *simulated* price from the buy price up to x2. The same `stageFor` drives each stage. At the end, the plant is saved as a finished demo sunflower, tinted and labelled "Demo".
8. **Come back.** On the next visit, the same flow repeats from step 1 with fresh prices.

```
 Browser (Client Components)                     Server (Route Handlers)        External
┌───────────────────────────────┐               ┌───────────────────────┐     ┌───────────┐
│ GardenScene · Plant · Notebook │──search q──▶ │ /api/coins/search      │──▶ │           │
│ CoinSearch · DemoButton        │◀──matches─── │   (cache 60s)          │◀── │ CoinGecko │
│        │         ▲             │──ids───────▶ │ /api/prices            │──▶ │  API v3   │
│        ▼         │             │◀──usd prices │   (cache 60s)          │◀── │           │
│ useGarden ── stageFor()        │               └───────────────────────┘     └───────────┘
│        │                       │
│        ▼                       │
│ localStorage "coin-garden:v1"  │
└───────────────────────────────┘
```

## Stack
- **Next.js (App Router), latest stable at build time, with TypeScript.** This is the learner's choice, made for easy deployment on Vercel. TypeScript matches their experience and keeps the data model honest. Docs: https://nextjs.org/docs
  - *Verify early in the build:* the exact current major version and its caching API for Route Handlers (`fetch(..., { next: { revalidate: 60 } })` and/or a `Cache-Control` response header).
- **React** (bundled with Next.js). Docs: https://react.dev
- **CSS Modules + a single `theme.css` of CSS variables.** This is the learner's choice, because it enforces "every colour comes from one file". Docs: https://nextjs.org/docs/app/building-your-application/styling/css
- **`next/font/google`** for Fredoka and Nunito. It self-hosts the fonts at build time, with no runtime font requests. Docs: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- **Hand-written SVG React components** for the isometric farm and plants. No graphics library is needed for one scene and five plant stages.
- **Vitest** for unit tests of the pure logic (`stageFor`, storage parsing). This is an implementation detail recommended by the agent; it is small and fast. Docs: https://vitest.dev
- No database, no auth, no state library. React state, one custom hook and `localStorage` are enough.

## Where It Runs and How Someone Tries It
- **Requirements:** Node.js 20 or newer, and npm. No API key is required to start.
- **Local:**
  ```
  npm install
  npm run dev
  ```
  Then open http://localhost:3000.
- **Tests:** `npm test`.
- **Deploy (learner's choice):** push the public GitHub repo, then on Vercel choose *Add New → Project → Import* that repo. The defaults work. Optional environment variable: `COINGECKO_API_KEY` (a CoinGecko Demo key), only if the keyless public API proves too limited.
- **Demo recording:** open the deployed URL or localhost, in a fresh browser profile or a private window for an empty garden. Show the empty plot, add a purchase through the notebook with coin search, close the book to see the seed, press **Demo** to watch BTC grow to a sunflower, then tap it to show the lesson.
- **Submission:** the demo video and the public GitHub repository are both required. The Vercel link is an extra, not a replacement.

## Look and Feel
Carried from `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

- **`app/theme.css` is the only file that defines colours.** It holds these variables, with starting values the build may tune:

  | Variable | Value | Role |
  |---|---|---|
  | `--grass` | `#cfe6b0` | background grass |
  | `--grass-deep` | `#9cc47a` | soil and grass shade |
  | `--cream` | `#fbf3df` | paper panels, on-world text |
  | `--cream-deep` | `#f1e3c0` | secondary surfaces |
  | `--bark` | `#6b4a2b` | borders |
  | `--bark-dark` | `#4a321c` | solid shadows |
  | `--brick` | `#c2553a` | primary button, "!" badge |
  | `--wheat` | `#e8b730` | gains, sunflower petals |
  | `--slate` | `#6f8796` | secondary text, Demo label |
  | `--soil` | `#8a6239` | plot earth |

  SVG fills use `var(--…)` too. Nothing else invents a colour.
- **Shared tokens in `theme.css`:** `--border: 3px solid var(--bark)`, `--radius: 18px`, `--shadow: 0 5px 0 var(--bark-dark)`.
- **Chunky buttons:** a `.chunky` style, so on `:active` a button moves `translateY(4px)` and its shadow becomes `none`.
- **Fonts:** Fredoka (600/700) for headings and on-world titles; Nunito (400/700) for body. They are exposed as `--font-heading` and `--font-body`.
- **On-world titles:** cream text with a `text-shadow` of `0 4px 0 var(--bark-dark)`.
- **Ambient motion:** CSS keyframes for grass sway, a bird crossing every 20–30 seconds, and pond ripples. All of it is disabled under `prefers-reduced-motion`.
- **Layout:** the garden sits centred at about 60% of the viewport on desktop. Under 640px, elements stack vertically and Demo spans the full width.
- **Copy tone:** short, warm, storybook. No finance jargon on the garden screen.

## Components

### Page Shell — `app/page.tsx`
A server component that renders the top bar layout and mounts `<CoinGardenApp />` (a client component). It holds no data.
PRD ref: `prd.md > Screens and Layout`.

### CoinGardenApp — `components/CoinGardenApp.tsx`
The client root. It owns `useGarden` and `useDemo`, tracks which notebook page is open and which plant is selected, and wires the top bar, scene, notebook and Demo button together.
PRD ref: `prd.md > The Core Journey`.

### GardenScene — `components/garden/GardenScene.tsx`
The isometric SVG world: background, trees, pond, the plot with faint soil rows, and ambient motion. It places each `Plant` into a plot slot, filling slots in order. It starts as a 4×3 grid and adds rows as plants grow in number. It shows `WelcomeSign` and the on-world welcome text only when there are no plants.
PRD ref: `prd.md > The Garden`, `prd.md > States and Boundaries` (first use).

### Plant — `components/garden/Plant.tsx`
Draws one plant as SVG for a given `stage` (0–4). It overlays a "!" badge when the price is missing, applies the demo tint plus a "Demo" label when `isDemo`, and calls `onSelect` when tapped.
PRD ref: `prd.md > The Garden`, `prd.md > Demo`.

### LessonBubble — `components/garden/LessonBubble.tsx`
A wooden speech-sign above a selected **sunflower** that shows its lesson. It appears only for stage 4.
PRD ref: `prd.md > Lessons`.

### WelcomeSign — `components/garden/WelcomeSign.tsx`
The staked wooden sign that says "Plant your first seed". Tapping it opens the notebook on the new-entry page.
PRD ref: `prd.md > Screens and Layout`.

### TopBar and DemoButton — `components/TopBar.tsx`, `components/DemoButton.tsx`
The top bar holds the name and the 📖 pill; DemoButton is the brick-red primary button. Demo is disabled while a demo run is in progress.
PRD ref: `prd.md > Screens and Layout`, `prd.md > Demo`.

### Notebook — `components/notebook/Notebook.tsx`
A book panel floating over the garden, with page navigation. It has four page components:
- `GuidePage.tsx`: the growth stages and the gain each needs, rendered from the same `STAGES` table used by `stageFor`.
- `PreviewPage.tsx`: a large sunflower with "Your seed can become this."
- `NewEntryPage.tsx`: `CoinSearch`, buy price (USD), amount and date. It validates before saving: all fields required, price and amount above 0. Errors appear inline next to their field.
- `PlantPage.tsx`: the recorded details, the current price and gain (or "Price couldn't be found" with "!"), and the lesson textarea, saved on blur.

PRD ref: `prd.md > The Notebook`, `prd.md > Lessons`.

### CoinSearch — `components/notebook/CoinSearch.tsx`
An autocomplete input. It calls `/api/coins/search` after about 300ms with at least 2 characters, then shows up to 8 matches (thumbnail, name, symbol). A purchase can't be saved until a suggestion is selected. If the search fails, it says "Couldn't reach the coin list — try again."
PRD ref: `prd.md > The Notebook`; resolves `prd.md > Open Questions` (how a coin is entered).

### useGarden — `hooks/useGarden.ts`
Holds the plant list. It loads from storage after mount, saves on every change, and fetches prices for unique non-demo coin ids on mount. It exposes `plants`, `prices`, `addPlant`, `updateLesson`, `upsertDemoPlant` and `stageOf(plant)`.
PRD ref: `prd.md > Live Prices`, `prd.md > States and Boundaries` (persistence).

### useDemo — `hooks/useDemo.ts`
Runs the Demo. It creates or resets the single demo BTC plant, using the current BTC price as the buy price (or a labelled sample price of 60,000 USD if prices are unavailable). Over 10 seconds it animates `simulatedPrice` from the buy price to 2× with `requestAnimationFrame`. At the end it marks the demo plant `demoComplete: true`. It never touches non-demo plants.
PRD ref: `prd.md > Demo`.

### Growth Logic — `lib/growth.ts`
A pure function, `stageFor(buyPrice, currentPrice): 0 | 1 | 2 | 3 | 4`, plus the `STAGES` table:

| Ratio (current ÷ buy) | Stage |
|---|---|
| below 1.25 | 0 · Seed |
| 1.25 or more | 1 · Sprout |
| 1.5 or more | 2 · Young plant |
| 1.75 or more | 3 · Bud |
| 2 or more | 4 · Sunflower |

A missing price returns stage 0. This function is unit-tested.
PRD ref: `prd.md > The Garden`.

### Lessons — `lib/lessons.ts`
Holds the two built-in lessons and `lessonFor(plant)`: the plant's own lesson if present, otherwise a built-in one chosen deterministically from the plant id, so the same flower always shows the same lesson.
PRD ref: `prd.md > Lessons`.

### Storage — `lib/storage.ts`
Reads and writes the `GardenSave` in `localStorage` under the key `coin-garden:v1`. Parsing is defensive: corrupt or unknown data starts an empty garden and logs a warning, and never crashes. It is unit-tested.
PRD ref: `prd.md > States and Boundaries` (persistence).

### Price Client — `lib/priceClient.ts`
Browser-side `fetch` wrappers for `/api/prices` and `/api/coins/search`. They return typed results or `null` on failure.

### CoinGecko Server Client — `lib/coingecko.ts`
Server-only (`import "server-only"`). It calls CoinGecko and adds the `x-cg-demo-api-key` header if `COINGECKO_API_KEY` is set.

### API: Coin Search — `app/api/coins/search/route.ts`
`GET /api/coins/search?q=bit` returns `{ coins: [{ id, name, symbol, thumb }] }` with up to 8 entries, cached about 60 seconds. Upstream errors return `502 { error }`.

### API: Prices — `app/api/prices/route.ts`
`GET /api/prices?ids=bitcoin,ethereum` returns `{ prices: { bitcoin: 64000.12 } }`. A coin with no price is simply missing from the result. Cached about 60 seconds, with at most 50 ids. Upstream errors return `502 { error }`.

## Data Model
```ts
type Plant = {
  id: string;            // crypto.randomUUID()
  coinId: string;        // CoinGecko id, e.g. "bitcoin"
  symbol: string;        // "BTC"
  name: string;          // "Bitcoin"
  thumb?: string;        // coin icon URL from search
  buyPrice: number;      // USD per coin, > 0
  amount: number;        // > 0
  date: string;          // "YYYY-MM-DD"
  lesson?: string;
  isDemo?: boolean;
  demoComplete?: boolean;
  createdAt: string;     // ISO timestamp; also decides plot order
};

type GardenSave = { version: 1; plants: Plant[] };
```

| Data | Where it lives | How it's updated | When you leave and come back |
|---|---|---|---|
| Plants and lessons | `localStorage["coin-garden:v1"]` | `useGarden` writes on every change | Restored after the page mounts |
| Current prices | React state in `useGarden`, plus a 60s server cache | Fetched on page open | Fetched fresh |
| Demo animation price | React state in `useDemo` | Animated for 10 seconds | Not stored; a finished demo plant reloads as a sunflower via `demoComplete` |
| Open page / selected plant | React state in `CoinGardenApp` | Taps | Resets to the garden view |

Stage for a plant:
- Demo plant: `demoComplete ? 4 : stageFor(buyPrice, simulatedPrice)`.
- Every other plant: `stageFor(buyPrice, prices[coinId])`.

## File Structure
```
coin-garden/                    (project root)
├── app/
│   ├── layout.tsx              # fonts (next/font), imports theme.css + globals.css
│   ├── page.tsx                # server page shell → <CoinGardenApp />
│   ├── theme.css               # THE ONLY place colours/tokens are defined
│   ├── globals.css             # resets, .chunky button, on-world title, motion keyframes
│   └── api/
│       ├── coins/search/route.ts   # GET search proxy → CoinGecko /search
│       └── prices/route.ts         # GET price proxy → CoinGecko /simple/price
├── components/
│   ├── CoinGardenApp.tsx       # "use client" root: wires hooks + UI
│   ├── TopBar.tsx (+ .module.css)
│   ├── DemoButton.tsx (+ .module.css)
│   ├── garden/
│   │   ├── GardenScene.tsx     # isometric SVG world + plot slots
│   │   ├── Plant.tsx           # 5 stages, "!" badge, demo tint/label
│   │   ├── LessonBubble.tsx
│   │   ├── WelcomeSign.tsx
│   │   └── garden.module.css
│   └── notebook/
│       ├── Notebook.tsx        # book panel + page navigation
│       ├── GuidePage.tsx
│       ├── PreviewPage.tsx
│       ├── NewEntryPage.tsx
│       ├── PlantPage.tsx
│       ├── CoinSearch.tsx
│       └── notebook.module.css
├── hooks/
│   ├── useGarden.ts            # plants + persistence + prices
│   └── useDemo.ts              # 10s simulated BTC growth
├── lib/
│   ├── growth.ts               # stageFor() + STAGES (pure)
│   ├── growth.test.ts
│   ├── lessons.ts              # built-in lessons + lessonFor()
│   ├── storage.ts              # localStorage load/save, defensive parse
│   ├── storage.test.ts
│   ├── priceClient.ts          # browser → our API routes
│   ├── coingecko.ts            # server-only → CoinGecko
│   └── types.ts                # Plant, GardenSave, Stage
├── public/                     # (optional) favicon
├── devpost/                    # Devpost learning workspace (planning docs)
├── .env.example                # COINGECKO_API_KEY= (optional, no secret)
├── .gitignore
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md                   # what it is, how to run, Vercel link
```

## External Services and Dependencies

### CoinGecko API v3 (public / Demo plan)
Docs: https://docs.coingecko.com/reference/introduction

- **Search:**
  - Request: `GET https://api.coingecko.com/api/v3/search?query={q}`
  - Response (fields used): `{ coins: [{ id, name, symbol, thumb, market_cap_rank }] }`. We sort by `market_cap_rank` (unranked last) and keep 8.
- **Price:**
  - Request: `GET https://api.coingecko.com/api/v3/simple/price?ids={id1,id2}&vs_currencies=usd`
  - Response: `{ "bitcoin": { "usd": 64000.12 }, ... }`
- **Auth:** none for the public endpoint. An optional Demo key goes in the header `x-cg-demo-api-key` via `COINGECKO_API_KEY`, stored only in `.env.local` or Vercel environment variables and never in chat or git.
- **Limits and cost:** free. Rate limits on the free tier are low (on the order of tens of calls per minute). The 60-second server cache keeps us well below them.
- **Unverified, check early in the build:** whether keyless access still works for `/search` and `/simple/price`, the current rate limit, and the exact response fields. If keyless access is blocked, create a free Demo key.

### Vercel (hosting)
Docs: https://vercel.com/docs/frameworks/nextjs. The Hobby plan is free. It deploys from GitHub with no configuration. Route Handlers run as serverless functions.

## Important Failure Modes
- **CoinGecko unreachable or rate-limited** → `/api/prices` returns 502 or omits coins. Affected plants stay seeds with a "!" badge, and `PlantPage` says "Price couldn't be found right now." Everything else works. (`prd.md > States and Boundaries`)
- **Coin search fails** → `CoinSearch` shows "Couldn't reach the coin list — try again." The entry can't be saved without a selected coin. (`prd.md > The Notebook`)
- **Hydration mismatch from reading `localStorage` during render** → prevented by loading in `useEffect` after mount. Before that, the garden renders a neutral loading state (the empty plot with no sign) instead of a flash of the welcome sign.
- **Corrupt `localStorage` data** → `storage.ts` falls back to an empty garden and logs a warning instead of crashing.

## What Was Simplified and Why
- **`localStorage`** instead of a database or accounts. Each visitor gets a private garden with no infrastructure. The fuller version would need auth plus a hosted database to work across devices (deferred in `prd.md > Deferred From the POC`).
- **Prices fetched when the page opens** instead of live streaming or background refresh. Buy-and-hold doesn't need second-by-second updates. A refresh would be a timer or a button later.
- **The Demo uses a simulated price**, clearly labelled with a "Demo" tint and label. This shows the growth moment in 10 seconds without faking real data. The growth logic itself is real and shared.
- **A hand-drawn SVG scene** instead of a game engine or canvas library. One static world plus CSS motion is enough for the picture-book look.
- **USD only** for buy price and current price (confirmed by the learner). One currency keeps entry and comparison simple.

## Decisions and Open Issues

**Learner choices**
- **Next.js on Vercel**, so others can open it from a link. Accepted tradeoff: a heavier framework than a static page, in exchange for one-step deploys plus server routes.
- **Data saved locally on the player's device** (`localStorage`). Accepted tradeoff: the garden lives in one browser and is lost if the browser data is cleared.
- **Coin entry by typing and picking from CoinGecko suggestions.** Accepted tradeoff: one more component and one more API route, in exchange for almost no "unknown coin" cases.
- **CoinGecko via Next.js API routes with a 60s cache.** Accepted tradeoff: a few extra files, in exchange for protection from rate limits, a place for a key, and a clear client/server boundary.
- **CSS Modules + one `theme.css`.** This enforces "nothing outside this file invents a colour".
- **Prices in USD.**
- **The Demo plant's buy price is the current BTC price.** If no price can be fetched, it falls back to a labelled sample price so the Demo still runs offline.

**Implementation details derived by the agent**
- The `stageFor` pure function and the `STAGES` table shared by garden, guide page and Demo.
- The `useGarden` and `useDemo` hooks.
- Vitest for the pure logic.
- Deterministic built-in lesson choice per plant.
- The 4×3 plot grid that adds rows as needed.
- The offline fallback for the demo buy price: a labelled sample of 60,000 USD.

**The learner's uncertainty: how Next.js splits server and browser work**
- **What clarified it:** Route Handlers (`app/api/**/route.ts`) run on the server and talk to CoinGecko. Anything with clicks, animation or `localStorage` is a Client Component (`"use client"`). The server renders HTML before it can know what is in your `localStorage`.
- **Check during the build:**
  1. Briefly read `localStorage` during render to see the hydration warning in the console.
  2. Move the read into `useEffect` and confirm the warning disappears.
  3. In the browser Network tab, confirm that the browser only ever calls `/api/...` and never `api.coingecko.com` directly.

**Open issues**
- **Carried from `prd.md > Open Questions`:** verify the source of the Buffett quote before shipping. This doesn't block the build.
- **Verify early in the build:** CoinGecko keyless access, rate limits and response fields, and the current Next.js caching API for Route Handlers.
