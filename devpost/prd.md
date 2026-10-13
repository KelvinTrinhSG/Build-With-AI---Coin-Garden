---
doc: prd
status: approved
---

# Coin Garden — Product Requirements

A cozy, storybook-style garden for one long-term crypto investor: every purchase written in the notebook becomes a seed, and it grows as the coin's price rises toward x2.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. **Arrive.** The investor opens the app and sees *their own* empty plot of land in the middle of a living farm scene. Above it is a welcome line painted onto the scene, and a wooden sign that says "Plant your first seed". No numbers are shown yet.
2. **Plant.** They tap the sign (or the 📖 notebook button) and the notebook opens on a new-entry page. They write the coin, buy price, amount, and date.
3. **See the seed.** They close the notebook and a seed appears in the garden.
4. **Watch it grow.** The garden checks the coin's current market price. The plant shows the growth stage that matches the gain over the buy price.
5. **Revisit.** Tapping a plant reopens its notebook page with everything that was recorded. On that page they can write a lesson for that plant.
6. **Bloom and reflect.** When a plant reaches x2 it becomes a golden sunflower. Tapping it shows its lesson above the flower.
7. **Demo.** Pressing **Demo** plants a special BTC demo plant and simulates its price rising for 10 seconds. It grows through every stage into a sunflower and stays there, tinted and labelled "Demo", with a built-in lesson.
8. **Come back.** On a later visit the garden is still there, and every plant has updated to the current price.

Success: a seed planted from the notebook visibly grows into a sunflower (live or via Demo), and tapping it reveals its notebook page and its lesson.

## Screens and Layout
There is **one screen: the garden**. The notebook opens as a panel on top of it.

**Desktop**
```
┌──────────────────────────────────────────────────────────────┐
│ 🌻 Coin Garden                                    [📖 Notebook] │  ← slim top bar
│                                                              │
│            Welcome to your plot of land.                     │  ← painted onto the scene
│       Every coin you buy is a seed. Patience grows it.       │
│                                                              │
│                 ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲                           │
│        🌳     ╱   empty soil rows  ╲        ~~ pond ~~       │  ← garden centred, ~60% of frame
│               ╲   waiting for seeds╱   ┌──────────────┐      │
│                 ╲________________╱     │ Plant your   │      │  ← wooden sign beside the plot
│                                        │ first seed   │      │
│                                        └──────┃───────┘      │
│                    ┌────────────────┐                        │
│                    │   ▶  Demo      │                        │  ← single large brick-red button
│                    └────────────────┘                        │
└──────────────────────────────────────────────────────────────┘
```

**Mobile:** the same elements stacked vertically. The top bar holds the name and 📖. The welcome text sits above a smaller garden, and the Demo button spans the full width within thumb reach.

| Element | Position | Why |
|---|---|---|
| Garden plot | Centre, slightly above middle | It is the main character; the eye should land on it first. |
| Welcome line | Above the garden, painted onto the scene | One short promise, not a rules explanation. |
| "Plant your first seed" sign | Staked beside the plot, wooden post | Makes "sign = place to act" obvious. Shown only while the garden is empty. |
| Demo button | Bottom centre, brick red, most prominent | Lets anyone see the growth moment immediately. |
| 📖 Notebook | Top-right pill | Always available, never in the way, same place on every view. |

## Look and Feel
Source: `scope.md > Inspiration & Identity`. Visual style only, borrowed from the reference farm app; none of its mechanics.

- **Mood:** a warm, rounded farm picture book; Stardew Valley coziness.
- **Colours:** light grass green background, paper-cream panels, bark-brown borders, brick-red primary button, wheat gold for gains and blooms, slate blue-grey for secondary info. Every colour comes from one single theme file; nothing else invents a colour.
- **Type:** Fredoka for headings (round, friendly); Nunito for body text.
- **"Chunky" wooden-toy UI:** 3px bark-brown borders, large rounded corners, and a solid 4–6px drop shadow directly underneath. Buttons press down 4px and lose their shadow when clicked.
- **On-world titles:** cream text with a brown shadow, like letters painted on a wooden sign.
- **One world:** an isometric SVG farm sits behind everything, and panels (like the notebook) float above it.
- **A living scene:** small ambient motion such as grass swaying, a bird flying across, or ripples on the pond, so an empty garden still feels alive.
- **Empty-state hints:** faint soil rows show where seeds will go.
- **Avoid:** generic dashboard/chart styling, and numbers on the first screen.

## Features and Behavior

### The Garden
- Each purchase entry is one plant. Two purchases of the same coin make two plants.
- A plant's stage is set by its gain over its buy price:

| Gain over buy price | Stage | Look |
|---|---|---|
| Loss, or below +25% | Seed | Seed in soil; a loss never makes it wilt |
| +25% | Sprout | Small sprout, 2 leaves |
| +50% | Young plant | Taller, 4 leaves |
| +75% | Bud | A bud appears |
| +100% (x2) or more | Sunflower | Golden sunflower in full bloom |

- Acceptance criteria:
  - [ ] An empty garden shows the welcome line, faint soil rows, the "Plant your first seed" sign, the Demo button and 📖. No prices or percentages are visible.
  - [ ] After a purchase is saved, a seed appears in the garden without a page reload.
  - [ ] A plant at each gain threshold shows the matching stage from the table above.
  - [ ] A plant below its buy price looks like a seed and shows no wilting.

### The Notebook
Opens from 📖 or from the "Plant your first seed" sign, as a book panel floating over the garden.

Pages:
1. **How your garden grows:** the growth stages and what gain each one needs.
2. **What a seed can become:** an image of the golden sunflower in full bloom, captioned "Your seed can become this."
3. **New entry:** coin, buy price, amount, date. Closing the book after a valid entry plants the seed.
4. **One page per plant:** opened by tapping that plant. Shows the coin, buy price, amount, date, and the current gain once a price is known. Has a field to write this plant's lesson.

- Acceptance criteria:
  - [ ] 📖 opens the notebook from anywhere; the sign opens it directly on the new-entry page.
  - [ ] The new entry can't be saved without coin, buy price, amount, and date. Price and amount must be greater than zero.
  - [ ] Tapping a plant opens its own page showing exactly what was entered.
  - [ ] A lesson written on a plant's page is still there after closing and reopening the app.

### Lessons
- Each plant can hold one lesson, written on its notebook page.
- Tapping a **sunflower** shows its lesson in a small speech-bubble/sign above the flower.
- If a sunflower has no lesson of its own, it shows one of the two built-in lessons:
  - "We don't have to be smarter than the rest. We have to be more disciplined than the rest." — Warren Buffett (attribution to verify before shipping)
  - "Plants need time to grow; fruit doesn't appear in a day."
- The Demo plant always shows a built-in lesson.
- Acceptance criteria:
  - [ ] Tapping a sunflower with a written lesson shows that lesson above it.
  - [ ] Tapping a sunflower without one shows a built-in lesson.

### Live Prices
- The garden looks up each coin's current market price when the app opens, and plants update to match.
- Acceptance criteria:
  - [ ] With a known coin and a working connection, the plant's stage matches the current gain.

### Demo
- Pressing **Demo** plants a special **BTC** demo plant. Its price is simulated rising from the buy price to x2 over about **10 seconds**, so it passes through every stage.
- When the simulation ends, it stays a sunflower, **tinted differently and labelled "Demo"**, so it is never confused with a real purchase.
- Tapping it shows a built-in lesson.
- The Demo never changes any real plant.
- Acceptance criteria:
  - [ ] Pressing Demo shows a BTC plant going seed → sprout → 4 leaves → bud → sunflower within about 10 seconds.
  - [ ] Afterward, the demo plant is visibly marked "Demo" and real plants are unchanged.

## States and Boundaries
- **First use (empty garden):** the empty plot, welcome line, sign, Demo and 📖. No numbers.
- **Normal use:** plants at their stages; the sign is gone once the first seed exists.
- **Price not found or no connection:** the plant stays a seed and shows a **"!" mark** on it. Its notebook page notes that the price couldn't be found. It updates normally once a price is available.
- **Invalid entry:** the notebook says which field is missing or invalid and does not plant a seed.
- **What persists:** all purchases, lessons, and the Demo plant remain after closing and reopening the app on the same device. Plants are never lost.

## Product Decisions
- **Your own empty plot first, not a finished garden.** The investor should see their land, with the "full bloom" image kept inside the notebook as a promise.
- **Only two controls: 📖 Notebook and Demo.** There are no accounts, so no "enter garden / save progress" split.
- **The notebook is both the purchase log and a short guide.** It keeps everything in one storybook object.
- **Losses stay seeds.** No wilting, which matches calm buy-and-hold.
- **Lessons are written per plant on its notebook page and appear above the flower when tapped.** Built-in lessons fill in when a flower has none, and for the Demo plant.
- **Demo uses its own BTC plant, runs about 10 seconds, and stays as a tinted "Demo" sunflower.** This shows the growth moment without faking real data.
- **Missing price: stay a seed with "!".** The investor gets an honest signal without a broken screen.
- **Visual style only from the reference app.** Its Up/Down calls, tiers, coins/time and leaderboard are not part of this product.
- *Assumption:* pressing Demo again replays the same single demo plant instead of adding more.
- *Assumption:* the app name stays **Coin Garden** unless the learner renames it.

## What We're Building
- One garden screen in the picture-book style, desktop and mobile layouts, with ambient motion.
- Empty-garden first view with the welcome line, faint soil rows and the "Plant your first seed" sign.
- The notebook: guide pages, a sunflower preview, a new-entry page, and one page per plant with a lesson field.
- Five growth stages driven by gain over the buy price, using current market prices.
- Lessons shown above sunflowers, with the two built-in lessons as fallback.
- Demo: a 10-second simulated BTC plant that ends as a tinted "Demo" sunflower.
- The "!" seed state for unavailable prices, and validation for incomplete entries.
- The garden saved on the device between visits.

## Deferred From the POC
- **Selling a coin and marking a plant as sold:** not needed to prove the growing-garden idea. Sold plants staying forever comes with it.
- **Editing or deleting a purchase entry:** not discussed. It can be added once the core loop works.
- **Using the garden on more than one device:** that would need accounts or sync. Saving on the device is enough for the PoC.

## Possible Later Enhancements
- A sell flow that freezes a plant as "harvested" and prompts for a lesson at that moment.
- A richer farm progression: fences, raised beds, a more detailed isometric world as the garden fills.
- More built-in lessons, rotated across flowers.

## Non-Goals
- **Price prediction, Up/Down calls, leaderboards, tiers, buyable equipment:** cut in scope; visuals only from the reference app.
- **Exchange or wallet syncing:** manual entry proves the idea and avoids credentials.
- **Wilting or dying plants:** contradicts the kernel.
- **Charts, portfolio totals, trading advice:** the garden is a calm reflection tool, not a trading dashboard.

## Open Questions
- **Buffett quote source:** confirm the original source before shipping. Doesn't block `4-spec`.
- **How a coin is entered** (free text name, ticker, or picked from a list): affects how "price not found" happens. It can be settled in `4-spec`, but the learner should confirm the experience they want.
