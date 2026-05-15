# Threnne

Independent romance publishing and tools.

This is the parent brand site for Threnne — a small, founder-led company building resources, tools, and (eventually) publishing and production capacity for the romance market.

## What lives here

- The Threnne brand site ([threnne.com](https://threnne.com))
- Information about the company, its philosophy, and ongoing projects
- A directory of tools and products under the Threnne umbrella

## What does not live here

Each tool gets its own repo. The first one:

- **Romance Signal** — a subscription analytics product for indie romance authors, editors, and adaptation scouts. ([romancesignal.com](https://romancesignal.com)) — private repo

## Stack

- Astro 5 + Tailwind CSS
- Deployed on Netlify
- Static site, no backend

## Local development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy

Connected to Netlify.

- `main` -> [threnne.com](https://threnne.com) (production)
- `staging` -> [staging.threnne.com](https://staging.threnne.com) (QA)
- Pull requests get their own deploy preview URL

Workflow: build and QA on `staging`, then merge to `main` to promote.

## License

All content © Threnne LLC. Source code MIT.
