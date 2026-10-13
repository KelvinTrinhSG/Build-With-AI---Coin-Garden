---
doc: scope
status: approved
---

# Coin Garden (working title)

A cozy, storybook-style farm where every crypto purchase is a seed you plant, and it grows as the coin's price rises toward your x2 goal.

## The Unique Kernel
Buy-and-hold investing shown as a gentle, patient garden instead of a stressful chart. Each purchase is a seed. It grows only as the price rises toward x2 and blooms into a golden sunflower at x2. A loss never kills it; it just stays a seed. Flowers hold lessons about patience and discipline.

## Who It's For
The learner: a long-term buy-and-hold crypto investor who also loves games like Stardew Valley. Today, their purchase history lives on exchanges and in numbers. They want a personal, visual record that rewards patience instead of feeding the urge to check charts.

## The Core Loop
1. Tap the **notebook** button and write a purchase: coin, buy price, amount, date.
2. Close the notebook, and a seed appears in the garden.
3. Come back later. Current prices (from a free price API such as CoinGecko) decide how far each plant has grown.
4. Tap a plant to reopen its notebook page and see what was recorded.

Growth stages, based on gain over the buy price:

| Gain | Plant |
|---|---|
| Loss, or below +25% | Seed (unchanged; a loss never makes it wilt) |
| +25% | Small sprout, 2 leaves |
| +50% | Taller, 4 leaves |
| +75% | Bud appears |
| +100% (x2) | Golden sunflower in full bloom |

## Inspiration & Identity
- **Stardew Valley:** a cozy farming mood.
- **Visual style borrowed from another farm app the learner described (visuals only, none of its mechanics):**
  - A warm, rounded picture-book look in earthy colours: light grass green, paper cream, bark-brown borders, brick-red primary buttons, wheat gold for gains, slate blue-grey for time/down.
  - All colours come from one single theme file.
  - Fonts: Fredoka for headings, Nunito for body text.
  - "Chunky" wooden-toy UI: thick 3px brown borders, large radius, solid 4–6px drop shadow. Buttons press down 4px and lose their shadow when clicked.
  - Titles written onto the scene in cream text with a brown shadow, like a painted wooden sign.
  - One isometric SVG farm world sits behind the UI, with panels floating on top of it.

## Why This Matters to the Learner
They invest long-term and love games. The garden turns a habit they care about, patient buy-and-hold, into something calm and rewarding to look at. It is also practice toward their learning goals: building with AI, clean architecture, and product design that is pleasant for users.

## What "Working" Looks Like
The learner opens the app and writes a purchase in the notebook. A seed appears in the garden. They press **Demo**, which simulates the price rising, and they watch their plant grow stage by stage: sprout, 4 leaves, bud, then a golden sunflower at x2. Tapping the plant shows its notebook entry. The "oh, that's cool" beat is the seed growing into a sunflower in front of you.

## The POC Boundary
- Notebook entry: coin, buy price, amount, date.
- A garden scene in the picture-book style, with one plant per purchase.
- Five growth stages driven by gain over the buy price.
- Current price from a free price API (CoinGecko or similar).
- **Demo** button that simulates a price rise so growth can be seen in seconds.
- Tap a plant to view its notebook entry.
- Two built-in lessons for the first version:
  - "We don't have to be smarter than the rest. We have to be more disciplined than the rest." (widely attributed to Warren Buffett; check the original source before shipping);
  - "Plants need time to grow; fruit doesn't appear in a day."
- The garden is saved between visits, so plants are never lost.

## Later
- Selling a coin, and writing your own lesson into the flower at the moment you sell.
- Sold plants stay in the garden forever, marked as sold.
- Richer farm progression: fences, raised beds, a more detailed isometric world.

## Explicitly Cut
- **Prediction (Up/Down) calls, leaderboards, tiers and buyable equipment from the reference app:** the learner only wants its visual style, not its mechanics.
- **Syncing with exchanges or wallets:** manual notebook entry is enough to prove the idea, and it avoids API keys and credentials.
- **Wilting or dying plants on losses:** this goes against the kernel; losses simply stay seeds.
