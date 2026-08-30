# Keyword Strategy

This document organizes ScamCheck's target keywords by intent and maps each
to a page. Where we don't have verified search-volume or keyword-difficulty
data, we label estimates clearly as **[unverified estimate]** rather than
inventing numbers. Treat this as a starting framework — refine it using
real data from Google Search Console and a keyword research tool once the
site has traffic history (see SEO-ROADMAP.md Phase 6).

## How to read this document

- **Intent** — what the searcher actually wants (a tool, an answer, a
  purchase decision, etc.)
- **Suggested page** — where that intent should be served on this site
- **Content angle** — what that page needs to say to satisfy the intent
- **Priority** — High / Medium / Low, based on how directly the keyword
  matches a tool we already built

---

## Tool intent (transactional — "I want to check something right now")

| Keyword / topic | Suggested page | Content angle | Priority |
|---|---|---|---|
| website scam checker | `/website-scam-checker` | Free structural URL check, no sign-up | High |
| is this website a scam | `/website-scam-checker` | Direct answer + tool | High |
| is this website legit | `/website-scam-checker` | Same tool, different phrasing | High |
| url checker | `/url-checker` | Structural breakdown of any URL | High |
| phishing checker | `/phishing-checker` | Link/email/message phishing patterns | High |
| scam message checker | `/message-scam-checker` | Paste-and-check for SMS/WhatsApp | High |
| is this text message a scam | `/message-scam-checker` | Same tool | High |
| email scam checker | `/email-scam-checker` | Paste sender/subject/body | High |
| phishing email checker | `/email-scam-checker` | Same tool, phishing-specific framing | High |
| job scam checker | `/job-scam-checker` | Paste job offer text | High |
| fake job offer checker | `/job-scam-checker` | Same tool | High |
| online store scam checker | `/online-store-checker` | URL + shopping checklist | High |
| screenshot scam checker | `/screenshot-scam-checker` | OCR + analysis | Medium |

## Informational intent ("how do I / how can I")

| Keyword / topic | Suggested page | Content angle | Priority |
|---|---|---|---|
| how to tell if a website is a scam | `/guides/how-to-check-if-a-website-is-a-scam` | Step-by-step checklist | High |
| how to identify a phishing email | `/guides/how-to-identify-a-phishing-email` | Concrete examples + checklist | High |
| how to recognize a job scam | `/guides/how-to-recognize-a-job-scam` | Pattern list + what to do | High |
| how to check a website before buying | `/guides/how-to-check-an-online-store` | Pre-purchase checklist | Medium |
| common whatsapp scams | `/guides/common-whatsapp-scams` | Named scam patterns | Medium |
| common payment scams | `/guides/common-payment-scams` | Payment-specific patterns | Medium |
| online shopping scams | `/guides/online-shopping-scams` | Shopping-specific patterns | Medium |
| phishing warning signs | `/guides/phishing-warning-signs` | Comprehensive checklist | Medium |
| what should I do if I've been scammed | Homepage FAQ; candidate for a dedicated guide **[unverified estimate — validate demand via Search Console before building]** | Action steps | Medium |

## Commercial intent (comparison / trust-building before an action)

| Keyword / topic | Suggested page | Content angle | Priority |
|---|---|---|---|
| is [store name] legit | `/online-store-checker` (generic, not per-brand) | See "What we won't do" below | N/A |
| best scam checker tools | Homepage | Honest description of what ScamCheck does and doesn't do | Low |

## Long-tail intent

| Keyword / topic | Suggested page | Content angle | Priority |
|---|---|---|---|
| is this job offer asking me to buy equipment a scam | `/guides/how-to-recognize-a-job-scam` | Directly addresses the equipment-purchase pattern | Medium |
| why is my bank asking for my otp a scam sign | `/guides/phishing-warning-signs` | OTP-specific section | Medium |
| gift card payment scam | `/guides/common-payment-scams` | Dedicated section already covers this | Medium |
| whatsapp verification code scam | `/guides/common-whatsapp-scams` | Dedicated section already covers this | Medium |

## What we won't do

Per this project's own quality standards (see `SEO-ROADMAP.md` and
`ADSENSE-READINESS.md`), we will **not**:

- Build a separate page for every named brand/company ("is Amazon.com
  legit", "is [random store] legit"). This leads to thin, near-duplicate
  programmatic pages with little unique value and real accuracy/legal risk
  around naming specific businesses.
- Publish keyword-stuffed variations of the same page.
- Invent search volume numbers. Any volume/difficulty figures added later
  should come from an actual tool (Search Console, Keyword Planner, or a
  paid SEO tool) and be labeled with their source and date pulled.

## Next steps

1. Once Search Console has 4–8 weeks of data (see `SEO-ROADMAP.md` Phase 6),
   export the Queries report and look for:
   - Queries with high impressions but low click-through rate (title/meta
     description may need work)
   - Queries ranking on page 2 that a small content addition could push to
     page 1
   - New query patterns not covered in this document
2. Update this document with real data, clearly labeled with date and source.
