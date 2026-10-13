# Coin Garden 🌻

A cozy, storybook-style garden for long-term crypto investors. Every purchase you write in the notebook becomes a seed, and it grows as the coin's price rises toward your x2 goal. A loss never kills a plant; it just stays a seed.

Built for Devpost Learn's **Build With AI: Basics** hackathon.

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
