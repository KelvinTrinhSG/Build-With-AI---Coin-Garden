---
doc: prd
status: approved
---

# Coin Garden — Product Requirements

A cozy, storybook-style garden for one long-term crypto investor: every purchase written in the notebook becomes a seed, and it grows as the coin's price rises toward x2.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. **Arrive.** The investor opens the app and sees a living farm with three plots: a small **Demo** plot on the left, *their own* empty **Growing** plot in the middle, and an empty **Harvest** plot on the right. A short caption card above each plot says what it is for and what to do there. A welcome line is painted onto the sky, and a wooden sign in front of the Growing plot says "Plant your first seed". No numbers are shown yet.
2. **Plant.** They tap the sign (or the 📖 notebook button) and open the **Seed table**, a spreadsheet of their purchases. In its last row they fill in the coin, buy price, amount, and date, and press **＋ Plant** (or Enter).
3. **See the seed.** A seed appears in the Growing plot straight away, and the row joins the table. The table stays open, so they can add more purchases one after another.
4. **Correct it any time.** Any cell in the table can be edited again. Each valid change re-draws the garden at once, and a row can be removed after a confirmation.
5. **Watch it grow.** The garden checks the coin's current market price. The plant shows the growth stage that matches the gain over the buy price.
6. **Revisit.** Tapping a plant reopens its notebook page with everything that was recorded.
7. **Bloom.** When a plant reaches x2 it becomes a golden sunflower. It has no lesson yet; tapping it opens its page, where the Harvest button now appears.
8. **Harvest.** On a sunflower's notebook page they press **🌻 Harvest**. The flower moves to the Harvest plot and stays a sunflower from then on, with the date and price it was harvested at, and it **receives its lesson**: a quote from a successful long-term investor, picked at random from a register of 100. Tapping the flower shows the lesson above it.
9. **Demo.** Pressing the **▶ Demo** sign in front of the Demo plot plants a special BTC demo plant there and simulates its price rising for 10 seconds. It grows through every stage into a sunflower and stays there, with paler petals and a quote from the register.
10. **Come back.** On a later visit the garden is still there, every growing plant has updated to the current price, and harvested flowers are unchanged.

Success: a seed planted from the notebook visibly grows into a sunflower (live or via Demo), and harvesting it reveals a lesson from a great investor.

## Screens and Layout
There is **one screen: the farm**. The notebook opens as a panel on top of it. The farm fills the whole window; the top bar and the title float over its sky.

**Desktop:** the farm is split into four equal quarters across the full width: Demo | Growing | Growing | Harvest.
```
┌────────────────────────────────────────────────────────────────────────────┐
│ 🌻 Coin Garden          Your farm is growing.                 [📖 Notebook] │ ← bar + title over the sky
│               Patience turns every seed into a sunflower.                  │
│ ┌──────────────┐   ┌──────────────────────────────┐   ┌──────────────┐     │
│ │ 🧪 Try it out │   │ 🌱 Your growing garden        │   │ 🌻 Harvest    │     │ ← one caption per zone
│ └──────────────┘   └──────────────────────────────┘   └──────────────┘     │
│  🏠 barn  silo        🌳      ╱‾‾‾‾‾‾‾‾‾‾‾‾‾╲   hay   🌳      fence 🌳       │
│     ╱‾╲              ╱   Growing plot     ╲                ╱‾‾‾‾╲          │
│     ╲_╱ demo plot    ╲   5 × 4, grows      ╱   🚜 tractor  ╲harvest╱  tools │
│   [▶ Demo] sign  ~~pond~~ ╲____________╱                [Harvested] basket │
│                          [🌱 Growing]                                      │
└────────────────────────────────────────────────────────────────────────────┘
   ← 1/4 Demo →      ←────────── 2/4 Growing ──────────→      ← 1/4 Harvest →
```

**Mobile (under 640px):** the three plots are stacked top to bottom (Demo, Growing, Harvest), each with its caption above it. The top bar and title sit in the flow above the farm, and the page scrolls.

| Element | Position | Why |
|---|---|---|
| Growing plot | Centre, across the middle two quarters | It is the main character; the eye should land on it first. |
| Demo plot | Left quarter, small (one tile), in front of the barn | A safe place to try the growth moment without touching real plants. |
| Harvest plot | Right quarter | Finished x2 flowers rest here, apart from the plants still growing. |
| Zone captions | A paper card above each plot | Say what each zone is and what to do there, in one sentence. |
| Title | Painted onto the sky, top centre | First visit: a welcome promise. Afterwards: a short line that cheers the farm on. |
| "Plant your first seed" sign | Staked in front of the Growing plot | Makes "sign = place to act" obvious. Shown only while there are no real plants; otherwise a "🌱 Growing" name sign stands there. |
| ▶ Demo sign | The Demo plot's own sign, brick red | The sign *is* the Demo button, so the control sits right where the demo plant grows. |
| 📖 Notebook | Top-right pill | Always available, never in the way, same place on every view. |

## Look and Feel
Source: `scope.md > Inspiration & Identity`. Visual style only, borrowed from the reference farm app; none of its mechanics.

- **Mood:** a warm, rounded farm picture book; Stardew Valley coziness.
- **Colours:** light grass green background, paper-cream panels, bark-brown borders, brick-red primary button, wheat gold for gains and blooms, slate blue-grey for secondary info. Every colour comes from one single theme file; nothing else invents a colour.
- **Type:** Fredoka for headings (round, friendly); Nunito for body text.
- **"Chunky" wooden-toy UI:** 3px bark-brown borders, large rounded corners, and a solid 4–6px drop shadow directly underneath. Buttons press down 4px and lose their shadow when clicked.
- **On-world titles:** soil-brown text with a cream outline (the title and the "Coin Garden" name), easy to read against the light grass.
- **One world:** an isometric SVG farm fills the window, and panels (like the notebook) float above it.
- **A working farm:** a red barn and silo, hay bales, a tractor, a wheelbarrow, a watering can, a pitchfork and shovel, a basket of sunflowers, a fence, trees and a pond. They are decoration only.
- **A living scene:** small ambient motion such as grass swaying, a bird flying across, ripples on the pond, or puffs from the tractor, so an empty garden still feels alive.
- **Empty-state hints:** faint soil rows show where seeds will go.
- **Avoid:** generic dashboard/chart styling, and numbers on the first screen.

## Features and Behavior

### The Garden
- The farm has three plots:
  - **Demo:** holds only the demo plant.
  - **Growing:** every real plant that hasn't been harvested, in the order they were planted. It starts at 5 × 4 slots (4 × 3 on phones) and adds a row whenever it fills.
  - **Harvest:** every harvested flower, in the order they were harvested. It starts at 2 × 2 and adds rows as needed.
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
  - [ ] An empty garden shows the three plots with their captions, the welcome line, faint soil rows, the "Plant your first seed" sign, the ▶ Demo sign and 📖. No prices or percentages are visible.
  - [ ] After a purchase is saved, a seed appears in the Growing plot without a page reload.
  - [ ] A plant at each gain threshold shows the matching stage from the table above.
  - [ ] A plant below its buy price looks like a seed and shows no wilting.

### The Notebook
Opens from 📖 or from the "Plant your first seed" sign, as a book panel floating over the garden.

Pages:
1. **How your garden grows:** the growth stages and what gain each one needs.
2. **What a seed can become:** an image of the golden sunflower in full bloom, captioned "Your seed can become this."
3. **Seed table:** a spreadsheet with one row per real plant (growing or harvested; never the demo plant) and columns Coin · Buy price (USD) · Amount · Date · Plant · ✕.
   - **Edit in place:** every cell can be changed again. The coin is changed with a "change" link that opens the coin search. A valid value is applied to the garden on each keystroke; an empty, zero or negative value is marked red, isn't applied, and goes back to the saved value when the cell is left.
   - **Add:** the last row is blank. Filling it in and pressing **＋ Plant** (or Enter) plants a seed and clears the row; the table stays open. Missing or invalid fields are listed under the row.
   - **Plant column:** a small drawing and the stage name ("Seed", "Golden sunflower", "🌻 Harvested", or "! No price"). Tapping it opens that plant's page.
   - **Remove:** ✕ asks first in a notebook-style card ("Pull up this plant?", with **Keep it** and **Remove**). Removing deletes the plant and its lesson and can't be undone.
4. **One page per plant:** opened by tapping that plant. Shows the coin, buy price, amount, date, and the current gain once a price is known (or, for a harvested flower, the date, price and gain at harvest). Has the **🌻 Harvest** button when the plant is a sunflower, and, once harvested (or for the demo plant), a card with its lesson: the quote, its author and its source. There is no field to write a lesson.

- Acceptance criteria:
  - [ ] 📖 opens the notebook from anywhere; the sign opens it directly on the Seed table.
  - [ ] A new row can't be planted without coin, buy price, amount, and date. Price and amount must be greater than zero.
  - [ ] Editing a buy price, amount, date or coin in the table changes the plant in the garden without closing the notebook or reloading.
  - [ ] An invalid edit is never applied, and the cell returns to the saved value when left.
  - [ ] Removing a row asks for confirmation in the app's own style (not the browser's dialog); "Keep it" or Escape leaves the plant and the notebook as they were.
  - [ ] Tapping a plant opens its own page showing exactly what was entered.
  - [ ] A growing plant's page shows no lesson; a harvested flower's page shows its quote card.

### Lessons
- **Lessons arrive with the harvest.** A plant that is still growing — even a sunflower — has no lesson; the investor never types one.
- **The quote register** holds 100 quotes on long-term investing from investors with long, successful records (Warren Buffett, Benjamin Graham, Charlie Munger, John Bogle, Peter Lynch, Howard Marks, Sir John Templeton, Philip Fisher, Burton Malkiel and others). Each has its author and source, is verbatim from that source (with "…" for words left out), and was gathered from Buffett's Berkshire Hathaway letters and Wikiquote's sourced sections. Misattributed or disputed quotes are excluded.
- **On harvest,** the flower receives one quote at random, preferring quotes no other flower holds yet; once all 100 are used, the choice starts over. The quote stays with that flower.
- Tapping a **harvested sunflower** shows its quote and author in a small speech-bubble/sign above it, with a "📖 page" link. Its notebook page shows the full quote, author and source.
- **The Demo plant** also carries a quote (labelled "Demo lesson"), because it plays out the whole journey.
- **Older saves:** a flower harvested before quotes existed gets a steady quote chosen from its id; a lesson someone typed in an earlier version is kept.
- Acceptance criteria:
  - [ ] A growing sunflower has no lesson: tapping it opens its page, which has no lesson card or lesson field.
  - [ ] Harvesting gives the flower a quote from the register, shown on its page with author and source.
  - [ ] Tapping a harvested sunflower shows its quote and author above it.
  - [ ] Two harvests in a row receive different quotes.

### Live Prices
- The garden looks up each growing coin's current market price when the app opens, and plants update to match. Harvested flowers don't need a price.
- Acceptance criteria:
  - [ ] With a known coin and a working connection, the plant's stage matches the current gain.

### Harvest
- Only a real plant that is a sunflower at today's price (x2 or more) can be harvested. Its notebook page then shows a **🌻 Harvest** button.
- Harvesting moves the flower to the Harvest plot and records the date and that day's price. From then on it stays a sunflower whatever the price does, and it shows "Harvested {date} at {price} · +{gain}%" on its page.
- Harvesting gives the flower its lesson (see Lessons), and tapping it afterwards shows that lesson above it.
- Harvesting can't be undone in the PoC.
- Acceptance criteria:
  - [ ] The Harvest button appears only on a real sunflower's page, never on a growing plant or the demo plant.
  - [ ] After pressing it, the flower appears in the Harvest plot, still a sunflower, and its page shows the harvest date, price and gain.
  - [ ] After a reload the flower is still in the Harvest plot.

### Demo
- Pressing the **▶ Demo** sign plants a special **BTC** demo plant in the Demo plot. Its price is simulated rising from the buy price to x2 over about **10 seconds**, so it passes through every stage. While it runs, the sign reads "🌱 Growing…" and can't be pressed again.
- When the simulation ends, it stays a sunflower with **paler petals**. Because it lives in its own Demo plot, it is never confused with a real purchase.
- Tapping it shows a quote from the register.
- The Demo never changes any real plant.
- Acceptance criteria:
  - [ ] Pressing ▶ Demo shows a BTC plant going seed → sprout → 4 leaves → bud → sunflower in the Demo plot within about 10 seconds.
  - [ ] Afterward, the demo plant stays in the Demo plot with paler petals, and real plants are unchanged.

## States and Boundaries
- **First use (empty garden):** the three empty plots with captions, the welcome line, the "Plant your first seed" sign, ▶ Demo and 📖. No numbers. A demo plant alone still counts as an empty garden.
- **Normal use:** plants at their stages; the sign becomes a "🌱 Growing" name sign once the first real seed exists, and the title changes to "Your farm is growing."
- **Price not found or no connection:** the plant stays a seed and shows a **"!" mark** on it. Its notebook page notes that the price couldn't be found. It updates normally once a price is available.
- **Invalid entry:** a new row lists which fields are missing or invalid and doesn't plant a seed; an invalid edit to an existing row is marked red and isn't applied.
- **What persists:** all purchases, lessons, harvests and the Demo plant remain after closing and reopening the app on the same device. Plants are never lost.

## Product Decisions
- **Your own empty plot first, not a finished garden.** The investor should see their land, with the "full bloom" image kept inside the notebook as a promise.
- **Three plots with one job each: try (Demo), grow (Growing), keep (Harvest).** Each has a caption, so a first-time visitor knows what to do in every part of the farm.
- **Only two controls on the farm: 📖 Notebook and the ▶ Demo sign.** Harvest lives on a sunflower's notebook page. There are no accounts, so no "enter garden / save progress" split.
- **Purchases are kept in a spreadsheet-style table, not a one-off form.** Investors think of their buys as a list; editing in place, with the garden re-drawing live, makes mistakes cheap to fix and shows the cause and effect.
- **Harvest is a manual press, not automatic at x2.** The investor decides when a flower is done; reaching x2 only makes it possible.
- **The notebook is both the purchase log and a short guide.** It keeps everything in one storybook object.
- **Losses stay seeds.** No wilting, which matches calm buy-and-hold.
- **Lessons come from a register of 100 investor quotes and are given at harvest, not written by the investor.** Reaching the harvest is the moment worth marking, and a sourced quote from a great investor carries more weight than a note typed in passing.
- **Demo uses its own BTC plant in its own plot, runs about 10 seconds, and stays as a pale-petalled sunflower.** This shows the growth moment without faking real data.
- **Missing price: stay a seed with "!".** The investor gets an honest signal without a broken screen.
- **Visual style only from the reference app.** Its Up/Down calls, tiers, coins/time and leaderboard are not part of this product.
- *Assumption:* pressing Demo again replays the same single demo plant instead of adding more.
- *Assumption:* the app name stays **Coin Garden** unless the learner renames it.

## What We're Building
- One full-window farm screen in the picture-book style with three plots (Demo, Growing, Harvest), zone captions, farm props and ambient motion; desktop and mobile layouts.
- Empty-garden first view with the welcome line, faint soil rows and the "Plant your first seed" sign.
- The notebook: guide pages, a sunflower preview, the editable Seed table (add, edit, remove), and one page per plant with the Harvest button and, after harvest, its lesson card.
- Five growth stages driven by gain over the buy price, using current market prices.
- Harvesting a sunflower into the Harvest plot.
- A register of 100 sourced long-term investing quotes; a random one given to each flower at harvest and shown above it and on its page.
- Demo: a 10-second simulated BTC plant in the Demo plot, started from the ▶ Demo sign, that ends as a pale-petalled sunflower.
- The "!" seed state for unavailable prices, and validation for incomplete entries.
- The garden saved on the device between visits.

## Deferred From the POC
- **Selling part of a position, or harvesting before x2:** harvest is all-or-nothing and only for sunflowers in the PoC.
- **Undoing a harvest:** not needed to prove the idea.
- **Undo for removed rows, and import/export of the table** (e.g. CSV): not needed to prove the idea.
- **Using the garden on more than one device:** that would need accounts or sync. Saving on the device is enough for the PoC.

## Possible Later Enhancements
- Letting the investor add a personal note next to the harvest quote.
- A richer farm progression: raised beds and a more detailed isometric world as the garden fills.
- More quotes in the register, or a choice of quote at harvest.

## Non-Goals
- **Price prediction, Up/Down calls, leaderboards, tiers, buyable equipment:** cut in scope; visuals only from the reference app.
- **Exchange or wallet syncing:** manual entry proves the idea and avoids credentials.
- **Wilting or dying plants:** contradicts the kernel.
- **Charts, portfolio totals, trading advice:** the garden is a calm reflection tool, not a trading dashboard.

## Open Questions
- ~~**Buffett quote source**~~ — resolved: the unverified built-in quote was replaced by the sourced quote register.
- **How a coin is entered** (free text name, ticker, or picked from a list): affects how "price not found" happens. It can be settled in `4-spec`, but the learner should confirm the experience they want.
