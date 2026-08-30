# ScamCheck

**Check suspicious websites, messages, emails and online offers before you trust them.**

A free, no-sign-up scam risk checker built with Next.js. Paste a URL,
message, email, or job offer — or upload a screenshot — and get a clear,
explainable risk assessment instead of a black-box verdict.

> ScamCheck never claims certainty. Results use language like "High Risk
> indicators detected" or "Unable to verify," never "this is definitely a
> scam." See [`app/disclaimer/page.tsx`](app/disclaimer/page.tsx) for the
> full disclaimer.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Technology](#technology)
- [Architecture](#architecture)
- [Installation](#installation)
- [Development](#development)
- [Environment variables](#environment-variables)
- [Production build](#production-build)
- [Testing](#testing)
- [Deployment](#deployment)
- [GitHub setup](#github-setup)
- [Domain setup](#domain-setup)
- [Google Search Console setup](#google-search-console-setup)
- [AdSense setup](#adsense-setup)
- [Adding articles](#adding-articles)
- [Adding tools](#adding-tools)
- [Security](#security)
- [Privacy](#privacy)
- [Troubleshooting](#troubleshooting)

---

## Overview

ScamCheck analyzes user-submitted content (URLs, messages, emails, job
offers, store links, and screenshots) against a transparent, rule-based
detection engine and returns:

- A 0–100 risk score with a plain-language level (Low Risk → High Risk)
- A list of specific findings, each with a human-readable explanation
- Recommended next steps
- An honest list of what could **not** be verified (we never invent data)

The core engine requires **no external API or AI service** — it works
fully offline using local pattern matching. An optional AI-enhancement hook
exists (`lib/engine/aiEngine.ts`) for future extension but is disabled by
default.

## Features

- Website / URL structural scam checker
- Suspicious message (SMS/WhatsApp/social) checker
- Email phishing checker (sender/subject/body, with domain-mismatch detection)
- Job offer scam checker
- Online store checker
- Screenshot checker with **client-side OCR** (the image never leaves the
  browser — only the extracted text you approve is analyzed)
- 8 educational guides on recognizing common scam types
- Full technical SEO: sitemap, robots.txt, canonical URLs, Open Graph,
  structured data (WebSite, WebApplication, FAQPage, Article, BreadcrumbList)
- AdSense-ready ad placement components (no fake ads, nothing rendered
  until you configure a real publisher ID)
- Rate limiting, SSRF protections, strict input validation, and safe error
  handling throughout

## Technology

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript + React 19
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) for testing
- [tesseract.js](https://tesseract.projectnaomi.com/) for client-side OCR
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://marked.js.org/) for the Markdown guide content system
- No database — the product is intentionally stateless for the MVP

## Architecture

```
scamcheck/
├── app/                      # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── analyze/url/      # URL & store analysis endpoint
│   │   ├── analyze/text/     # Message/email/job analysis endpoint
│   │   └── contact/          # Contact form endpoint
│   ├── guides/[slug]/        # Dynamic guide article pages
│   ├── *-scam-checker/       # SEO tool landing pages
│   ├── about/, privacy-policy/, terms/, disclaimer/, editorial-policy/, contact/
│   ├── sitemap.ts, robots.ts, not-found.tsx, error.tsx
├── components/                # Shared UI (Checker, ResultPanel, AdSlot, etc.)
├── lib/
│   ├── engine/                # AnalysisEngine: urlAnalyzer, textAnalyzer,
│   │                           # storeAnalyzer, patterns.ts, aiEngine.ts
│   ├── security/ssrf.ts       # SSRF protections for any server-side fetch
│   ├── rateLimit/              # In-memory abuse-rate limiter
│   └── content/guides.ts      # Markdown guide loader
├── content/guides/*.md        # Guide content (frontmatter + Markdown)
├── tests/                     # Vitest test suite
├── .github/workflows/build.yml
├── ADSENSE-READINESS.md
├── SEO-ROADMAP.md
├── KEYWORD-STRATEGY.md
└── .env.example
```

### Analysis engine design

The engine is split so an AI provider can optionally be layered in later
without changing the product's core behavior:

- **`LocalRuleEngine`** (`urlAnalyzer.ts`, `textAnalyzer.ts`,
  `storeAnalyzer.ts`, `patterns.ts`) — deterministic, explainable,
  zero-dependency pattern matching. This is what powers the product today.
- **`OptionalAIEngine`** (`aiEngine.ts`) — a safe no-op unless
  `ANTHROPIC_API_KEY` (or another provider key you wire up) is set
  server-side. Never imported into client components; never exposes keys
  to the browser.

## Installation

Requirements: Node.js 20+ and npm.

```bash
git clone <your-fork-url> scamcheck
cd scamcheck
npm install
cp .env.example .env.local
# edit .env.local — at minimum set NEXT_PUBLIC_SITE_URL for local dev
```

## Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

See [`.env.example`](.env.example) for the full list with descriptions.
Summary:

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, sitemap, OG metadata |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Optional | Activates real AdSense units once set |
| `CONTACT_FORM_PROVIDER_API_KEY` | Optional | Enables the contact form to actually send email |
| `ANTHROPIC_API_KEY` | Optional | Enables the optional AI-enhancement hook (not required for the product to work) |

**Never commit `.env` or `.env.local`.** They're gitignored by default.

## Production build

```bash
npm run build
npm start
```

## Testing

```bash
npm run lint    # ESLint
npm test        # Vitest — risk scoring, pattern detection, SSRF, rate limiting
```

## Deployment

This is a standard Next.js app and deploys to any Next.js-compatible host:

- **Vercel** (simplest): import the GitHub repo, set environment variables
  in the dashboard, deploy.
- **Other Node hosts** (Render, Railway, a VPS, etc.): run `npm run build`
  then `npm start`, behind your usual reverse proxy/process manager, with
  the environment variables set.

Client-side OCR (tesseract.js) downloads its language data from a CDN at
runtime in the user's browser — no special server configuration is needed
for this, but it does mean end users need normal internet access when using
the screenshot checker (which they already do to load the page).

## GitHub setup

```bash
cd scamcheck
git init
git add .
git commit -m "Initial commit: ScamCheck"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

The included workflow (`.github/workflows/build.yml`) runs lint, tests, and
a production build on every push/PR to `main`. No secrets are required for
CI to pass (`NEXT_PUBLIC_SITE_URL` is set inline in the workflow for the
build step).

## Domain setup

1. Buy a domain from any registrar.
2. Point it at your hosting provider (most providers document this — for
   Vercel: add the domain in your project's Domains settings and follow
   the DNS instructions shown).
3. Update `NEXT_PUBLIC_SITE_URL` in your hosting provider's environment
   variables to match your real domain, then redeploy.

## Google Search Console setup

1. Go to [Google Search Console](https://search.google.com/search-console)
   and add your domain/property.
2. Verify ownership (DNS TXT record is usually simplest for a whole-domain
   property).
3. Submit your sitemap: `https://your-domain.com/sitemap.xml`.
4. Monitor the **Coverage/Indexing** report over the following days/weeks
   to catch any pages failing to index.
5. Monitor the **Performance** report for query and click data — this
   feeds `KEYWORD-STRATEGY.md` Phase 6 (see `SEO-ROADMAP.md`).
6. If a page fails to index, check for accidental `noindex` tags, a
   `robots.txt` block, or a redirect issue.

Indexing is not guaranteed or instant — Google decides what and when to
index based on their own crawling and quality signals.

## AdSense setup

See [`ADSENSE-READINESS.md`](ADSENSE-READINESS.md) for the full guide,
including required pages, ad placement strategy, and exactly how to wire
in your publisher ID once approved. Approval is decided by Google and is
not guaranteed.

## Adding articles

1. Create a new Markdown file in `content/guides/your-slug.md`.
2. Add frontmatter matching the shape in `lib/content/guides.ts`
   (`title`, `description`, `date`, `updated`, `author`, `category`,
   `tags`, optionally `relatedTools` and `faq`).
3. Write the body in Markdown below the frontmatter.
4. The guide is automatically picked up by `/guides` (index),
   `/guides/[slug]` (the article page), and `sitemap.ts` — no other code
   changes needed.
5. Link to it from at least one relevant tool page or existing guide (see
   `SEO-ROADMAP.md` Phase 4 on avoiding orphan pages).

## Adding tools

To add a new checker (e.g. a new content type):

1. Add detection logic to `lib/engine/` (either extend `patterns.ts` +
   `textAnalyzer.ts`, or create a new analyzer following the existing
   pattern in `urlAnalyzer.ts` / `storeAnalyzer.ts`).
2. Wire it into the relevant API route in `app/api/analyze/`.
3. Add a new tab to `components/Checker.tsx` if it's a new input type.
4. Create a dedicated SEO landing page under `app/your-new-checker/page.tsx`
   following the pattern of the existing tool pages (metadata, breadcrumbs,
   the `Checker` component, unique educational content, FAQ).
5. Add the new route to `app/sitemap.ts`'s `STATIC_ROUTES`.

## Security

- **SSRF protections** (`lib/security/ssrf.ts`): the URL checker performs
  purely local structural analysis and does not fetch target URLs
  server-side in this MVP. If you add live fetching later, route it
  through `assertSafeToFetch()` first — it blocks private/internal IP
  ranges, localhost, non-http(s) protocols, and embedded credentials.
- **Rate limiting** (`lib/rateLimit/`): a simple in-memory limiter caps
  requests per IP per minute. For a multi-instance/serverless deployment
  at scale, replace this with a shared store (e.g. Redis/Upstash) — the
  in-memory approach only works correctly on a single instance.
- **Input validation**: every API route validates types, lengths, and
  required fields before processing, and returns generic error messages
  (never stack traces) on failure.
- **File upload safety**: the screenshot checker restricts file type
  (PNG/JPEG/WEBP) and size (8MB), and never uploads the image itself to
  the server — OCR runs client-side.
- **No sensitive logging**: server logs never include submitted message
  content, passwords, or OTPs.

If you find a security issue, please report it privately rather than
opening a public issue.

## Privacy

Submitted content (URLs, messages, emails, job offers) is processed
in-memory to generate a result and is **not** persisted to a database.
Screenshot images are OCR'd client-side and never uploaded. See
[`/privacy-policy`](app/privacy-policy/page.tsx) for the full policy —
**replace the `[SITE OWNER: ...]` placeholders** with your real details
before publishing.

## Troubleshooting

**Build fails with a font/network error** — this project intentionally
avoids `next/font/google` (system fonts only) so it builds without
external network access. If you add Google Fonts back in, make sure your
build environment can reach `fonts.googleapis.com` / `fonts.gstatic.com`.

**Contact form always returns "not fully set up"** — this is expected
until you set `CONTACT_FORM_PROVIDER_API_KEY` and implement the actual
send call in `app/api/contact/route.ts` (see the comment marked
"Integration point"). We intentionally never fake a successful send.

**Rate limit errors during testing** — the in-memory limiter allows 12
requests/minute per IP by default; adjust `MAX_REQUESTS` in
`lib/rateLimit/index.ts` if needed for local testing.

**OCR doesn't extract text well** — tesseract.js accuracy depends on image
quality/resolution. Users can always review and manually correct the
extracted text before analysis; this is a designed fallback, not a bug.

---

Questions not covered here? Open an issue on your fork's repository, or see
`/contact` once deployed.
