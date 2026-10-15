# Coin Garden 🌻

A cozy, storybook-style garden for long-term crypto investors. Every purchase you write in the notebook becomes a seed, and it grows as the coin's price rises toward your x2 goal. A loss never kills a plant; it just stays a seed.

The farm has three plots:

- **🧪 Demo:** press the ▶ Demo sign to watch a BTC seed grow to x2 in 10 seconds.
- **🌱 Growing:** your real purchases, growing with live prices.
- **🌻 Harvest:** sunflowers you harvested from their notebook page once they reached x2. Each one receives a lesson: a quote from a successful long-term investor, picked from a register of 100 sourced quotes in [`lib/quotes.ts`](lib/quotes.ts).

Your purchases live in the notebook's **Seed table**, a small spreadsheet: add a row to plant a seed, edit any cell to correct it (the garden re-draws as you type), or remove a row.

Built for Devpost Learn's **Build With AI: Basics** hackathon.

**Try it:** https://build-with-ai-coin-garden.vercel.app/

## Run it locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Run the tests with `npm test`.

## How it works

- **Next.js (App Router) + TypeScript.**
- Prices and coin search come from the [CoinGecko API](https://docs.coingecko.com/reference/introduction), called through our own `/api` routes with a short shared cache.
- Your garden is saved only in your browser (`localStorage`). No accounts.
- Optional: set `COINGECKO_API_KEY` (a free CoinGecko Demo key) in `.env.local` if the keyless API is rate-limited. See `.env.example`.

Planning documents (scope, PRD, technical spec, build checklist) live in [`devpost/`](devpost/).
