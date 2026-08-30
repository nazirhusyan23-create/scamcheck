# SEO Roadmap

A phased plan for growing ScamCheck's organic traffic after launch. Every
phase avoids spammy tactics — no bought links, no auto-generated pages, no
keyword stuffing.

## Phase 1 — Technical SEO (before/at launch)

- [x] `sitemap.xml` and `robots.txt` generated dynamically (`app/sitemap.ts`, `app/robots.ts`)
- [x] Canonical URL on every page (`alternates.canonical` in each page's metadata)
- [x] Unique `<title>` and meta description per page
- [x] One `<h1>` per page
- [x] Open Graph + Twitter card metadata (`app/layout.tsx`)
- [x] Structured data: WebSite, WebApplication, FAQPage, BreadcrumbList, Article
- [x] Mobile-responsive layout, semantic HTML, descriptive alt text
- [x] Custom 404 page
- **After launch:** run Google's Rich Results Test and PageSpeed Insights on
  the homepage and at least one tool page and one guide page; fix anything
  flagged.

## Phase 2 — Initial content (launch content set)

Already built: 8 tool/landing pages + 8 educational guides (see
`content/guides/`). This is a deliberately small, high-quality starting set
— see `KEYWORD-STRATEGY.md` for the full mapping.

- [ ] Have each guide reviewed by a second person before/shortly after
  launch for accuracy and clarity.
- [ ] Confirm every internal link in guides and tool pages resolves (no
  broken links) — re-check after any content edits.

## Phase 3 — Long-tail keyword expansion

Once the initial set is indexed and you have 4+ weeks of Search Console
data:

- [ ] Identify long-tail queries already driving impressions (Phase 6) that
  don't yet have a dedicated answer on the site.
- [ ] Expand existing guides with a new section (preferred) before creating
  a brand-new page for a closely related query — this avoids near-duplicate
  content.
- [ ] Only create a new guide when the search intent is genuinely distinct
  from existing content.

## Phase 4 — Internal linking

- [ ] Audit that every guide links to at least one relevant tool, and every
  tool page links to at least one relevant guide (already done for the
  initial set — re-verify after adding new content).
- [ ] Add a "Related Guides" block to guide pages once there are enough
  guides in the same category to make it useful (3+ per category).
- [ ] Avoid orphan pages — every new page should be linked from at least
  one existing page (a guide, a tool page, or the guides index) within one
  click of publishing it.

## Phase 5 — Backlink / outreach strategy

Legitimate approaches only:

- [ ] Reach out to consumer-protection blogs, personal finance sites, and
  digital literacy resources that might genuinely find the tool useful —
  offer the tool, not a "guest post for a link" exchange.
- [ ] Submit the tool to relevant, reputable directories (e.g. genuine
  security/privacy tool roundups), not link farms.
- [ ] If press coverage happens organically (e.g. a journalist covering
  scam trends), make sure the homepage and About page clearly explain what
  the tool does so it's easy to reference accurately.

**Do NOT:**
- Buy backlinks or use link exchange networks
- Use private blog networks (PBNs)
- Post low-value comments/forum links purely for backlinks

## Phase 6 — Search Console analysis (ongoing)

Recurring monthly process once the site is verified in Search Console (see
README "Google Search Console setup"):

1. Export the **Queries** report (Performance tab) for the last 28 days.
2. Sort by impressions to find what people are already searching that
   surfaces your site.
3. Sort by CTR (ascending) among queries with meaningful impressions to
   find pages whose title/meta description might not be compelling enough.
4. Check the **Coverage/Indexing** report for any pages failing to index
   and investigate why (usually a `noindex`, a redirect issue, or a
   `robots.txt` block).
5. Note new query patterns to feed into `KEYWORD-STRATEGY.md`.

## Phase 7 — Content expansion

Once Phases 1–6 are running smoothly and you have real query data:

- [ ] Add new guides only for query clusters with genuine, distinct search
  intent and real answerable substance — quality over quantity, as stated
  throughout this project.
- [ ] Consider expanding tool pages with more detailed, page-specific FAQ
  content if Search Console shows people searching question-style queries
  that land on tool pages.
- [ ] Periodically revisit and update existing guides (update the
  `updated` frontmatter date) as scam tactics evolve — stale advice hurts
  both users and rankings.
- [ ] Re-evaluate `KEYWORD-STRATEGY.md` priorities using real data at least
  quarterly.

## Ongoing hygiene (every phase)

- No duplicate or near-duplicate pages
- No content published purely to rank, without genuine usefulness
- No fabricated statistics, reviews, or trust badges anywhere on the site
- Every new page reviewed against the checklist in `README.md` → "SEO
  Validation" before publishing
