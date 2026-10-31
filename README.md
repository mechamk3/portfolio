# MohammadJavad Tolou — Portfolio

Bilingual English/Persian software engineer portfolio with project pages and an HRIS case study.

## Development

Extract the source archive and open its `portfolio-source` folder. Install [Bun](https://bun.sh), then run:

```sh
bun install
bun run dev
```

Open the local address printed by the development server. `/` redirects to `/fa`; use `/en` for English.

The sun/moon control switches between neutral dark and white light themes and remembers the visitor's choice.

## Editing

- Text: `src/content/en.ts` and `src/content/fa.ts`.
- HRIS case-study text: `src/content/hris/`.
- Palette and styling: `src/styles.css`.
- Pages: `src/routes/`; shared portfolio pieces: `src/components/site/`.
- Screenshots: `public/projects/hris/`.

`bun run test` runs the tests. `bun run build` creates the production output.

This version uses TanStack Start, not Next.js App Router; an old Next.js deployment workflow must be replaced.
The LinkedIn address is still a placeholder in `src/routes/$locale.index.tsx`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
