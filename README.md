**English** · [Українська](README.uk.md) · [Polski](README.pl.md)

# mindterms

A psychology reference in plain language. 48 concepts, each with a definition, an
example from life, the most common misuse — and an honest note on how solid the
science behind it actually is.

The project exists because popular psychology presents everything with the same
confidence: the Big Five, replicated across decades and cultures, sits on the same
shelf as growth mindset, whose effect shrinks to near zero once publication bias is
corrected for. A reader has no way to tell them apart. So every concept here carries
an evidence rating from 1 to 3, and the article says out loud where the data is thin.

## Contents

| | |
|---|---|
| Concepts | 48 |
| Topics | 12 |
| Collections by life situation | 6 |
| Commonly confused pairs | 9 |
| Primary sources linked | 96 |
| Languages | Ukrainian, English, Polish |

Evidence ratings across the 48 concepts: **33** on solid ground, **13** partly
supported, **2** on weak ground.

## Stack

- **Next.js 15** (App Router) with **React 19** — everything is statically generated
  at build time; the site ships as HTML plus a 103 kB shared JS bundle
- **TypeScript** in `strict` mode with `noUncheckedIndexedAccess`
- **CSS Modules** — no utility framework; the design system lives in CSS custom
  properties
- **Zod** — the content schema is the single source of truth; all TypeScript types
  are derived from it with `z.infer`

Runtime dependencies are `next`, `react`, `react-dom`, `zod` and `clsx`. Nothing else.

## Getting started

```bash
npm install
npm run dev        # development server on http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build — 192 static pages |
| `npm start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Content model

All content lives in three JSON files — `content/content.json` (Ukrainian, the
source of truth), `content.en.json` and `content.pl.json`. Every one of them is
validated against [`content/schema.ts`](content/schema.ts) at build time, so a typo
in the data fails the build instead of reaching production.

The schema describes seven entities: `Category`, `Concept`, `Source`, `Figure`,
`Collection`, `Confusion` and `HelpCard`. A concept's slug is its `id`, identical
across all three languages — which is what lets the language switcher keep you on
the same article.

## Architecture

```
src/
  app/         routing only: params, metadata, generateStaticParams
    [locale]/  the locale segment owns the root layout and <html lang>
  views/       one folder per page — the page's whole markup
  components/  17 reusable components, folder-per-component
  services/    reading and querying content, search
  i18n/        locales, plurals, message catalogs for uk / en / pl
  utils/       formatters, constants, inline markup
  types/       types re-exported from the Zod schema
  styles/      design tokens and base styles
```

Route files stay thin: they resolve the locale, build metadata and render a view.
All page markup lives in `views/`, so a page is one file you can read top to bottom.

Data flows in one direction — `app` → `views` → `components` — with no cycles
anywhere in the 83 modules. Components receive what they need as props; the two
exceptions are the footer and the confusion card, which read content directly.
That is deliberate: they are server components, and reading from an in-memory cache
where the data is used beats threading it through the layout.

Only 9 of 83 modules are client components (the catalog filters, search, the mobile
menu and the language switcher). Everything else renders on the server.

## Some decisions worth explaining

**The locale segment holds the root layout.** `app/[locale]/layout.tsx` renders
`<html lang={locale}>`, which is the only way to get a correct `lang` attribute per
language. The cost is that the global 404 lives outside that layout and has to bring
its own styles and fonts — which is why `src/styles/not-found.css` exists.

**`dynamicParams = false` everywhere.** Without it, `/xx` and `/bogus/catalog`
returned 200 with a full copy of the site. Now anything outside the generated
params is a 404.

**Catalog filters live in the URL.** Topic and evidence-level selections are stored
in `searchParams`, so a filtered view can be shared as a link. `useSearchParams`
would deoptimise prerendering for the whole subtree, so it is isolated in a
null-rendering sync component — that way all 48 cards stay in the static HTML.

**OG images use a static font.** `satori` cannot render variable fonts, so the
route ships PT Sans next to itself and `next.config.ts` pins it into the function
bundle with `outputFileTracingIncludes`.

**The evidence badge is the brand.** Three dots — two filled, one dimmed — appear on
every card, in every article, on the OG image, and in the favicon.

## Accessibility and SEO

Text contrast meets WCAG AA in both light and dark themes. One `h1` per page, no
heading-level jumps, a visible focus ring on everything reachable by keyboard, and
`prefers-reduced-motion` respected. No horizontal scrolling at 320, 375, 768 or
1440 px in any of the three languages.

Every page carries a canonical URL and `hreflang` links for all three languages.
Concept pages emit Schema.org `DefinedTerm`, and every page emits `BreadcrumbList`.
`sitemap.xml` lists 180 URLs with language alternates; `robots.txt` is generated too.

## Limits of the project

**No professional review.** The texts were written by one person from primary
sources. No practising psychologist or researcher has checked them, so errors of
interpretation are possible — most likely where the source is complex and the
wording is simple.

**The translations are unreviewed too.** The English and Polish versions are machine
translations of the Ukrainian, proofread but not checked by a professional translator
or by a psychologist working in those languages. Terminology may differ from what is
established in those countries.

**Western samples dominate.** Most of the studies behind these articles were run in
the United States and Western Europe, often on university students. Whether the
conclusions carry over elsewhere is, in most cases, simply untested.

**This is not a diagnostic tool.** The site explains concepts. It does not diagnose,
and it does not replace a consultation with a professional.

## Licence

The code is a personal portfolio project. The content is compiled from published
research; sources are linked at the end of every article.
