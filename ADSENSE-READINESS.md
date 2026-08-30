# AdSense Readiness Guide

This document explains what's already in place for Google AdSense, what you
still need to do before applying, and how to activate ads once you're
approved. It does not guarantee AdSense approval — Google makes that
decision based on their own review.

## 1. Required pages (already built)

AdSense requires a real, useful site with clear policies. These pages exist
and are linked from the footer on every page:

- `/about` — what ScamCheck does and how it works
- `/contact` — a working contact form
- `/privacy-policy` — how submitted data and cookies are handled
- `/terms` — terms of service
- `/disclaimer` — honest limitations of the tool
- `/editorial-policy` — how guide content is researched and maintained

**Before applying, you must:**

- Replace every `[SITE OWNER: ...]` placeholder in `/privacy-policy`,
  `/terms`, and elsewhere with your real business details.
- Make sure your domain has been live with real content for a reasonable
  period before applying (Google doesn't publish an exact number, but a
  brand-new, empty-feeling site is unlikely to be approved).
- Have a working privacy policy that accurately reflects your actual
  cookie/analytics/ad setup at the time you apply.

## 2. Ad placement strategy

The `AdSlot` component (`components/AdSlot.tsx`) marks reserved, clearly
defined ad zones:

| Placement    | Where it's used                                  |
| ------------ | ------------------------------------------------- |
| `header`     | Not currently used — reserved for future use       |
| `in-content` | Below the checker on tool pages and the homepage   |
| `sidebar`    | Reserved for a future desktop sidebar layout       |
| `footer`     | Reserved for future use                            |

Placement rules we followed:

- **Never over the checker tool.** No ad slot overlaps or sits inside the
  main checker form.
- **Never disguised as a button or navigation.** Ads render in clearly
  separated blocks with no styling that mimics interactive site elements.
- **No forced interaction.** No popups, no interstitials blocking the
  checker, no auto-playing media.

## 3. Privacy considerations

- `/privacy-policy` includes an "Advertising" section describing AdSense's
  use of cookies once active. Update it to match your actual configuration
  and add a proper consent mechanism if you serve users in regions that
  require one (e.g. GDPR in the EU/UK, ePrivacy).
- Consider a consent management platform (CMP) if you have EU/UK/California
  traffic — Google's own "Funding Choices" is one option; there are also
  third-party CMPs. This isn't built into this repo, since consent
  requirements and vendor choice vary by business.

## 4. User experience considerations

- Ads are visually separated from content with spacing and, ideally, a
  small "Advertisement" label if your ad network requires it in your
  region.
- Layout is reserved (not collapsed) so pages don't visually "jump" when
  ads load, once you wire in real ad code — see `AdSlot`'s implementation
  notes.
- Mobile ad placements should never cover the checker input or the "Check
  Now" button. Test on a real phone before launch.

## 5. Things to avoid (per Google's policies and this project's own rules)

- No fake ad graphics, no ad-style buttons that aren't real ads
- No clicking incentives ("click below to support us")
- No placing ads so close to buttons that accidental clicks are likely
- No more than a reasonable ad density per page — prioritize the checker
  tool and content, not ad count
- No content generated purely to host ads (thin/doorway pages)

## 6. How to add AdSense once approved

1. Get your AdSense Publisher ID (looks like `ca-pub-XXXXXXXXXXXXXXXX`).
2. Set it as `NEXT_PUBLIC_ADSENSE_CLIENT_ID` in your hosting provider's
   environment variables (see `.env.example`).
3. `components/AdSlot.tsx` will automatically render the AdSense `<ins>`
   unit once that variable is set — no other code changes needed for basic
   placements.
4. Add the AdSense loader script to `app/layout.tsx` in the `<head>`
   (Next.js `Script` component with `strategy="afterInteractive"`),
   pointing at your publisher ID, per Google's current setup instructions
   in your AdSense dashboard.
5. In your AdSense dashboard, create ad units and copy their `data-ad-slot`
   values into the relevant `AdSlot` usages in the codebase
   (`app/page.tsx` and the tool pages under `app/*/page.tsx`).
6. Submit your sitemap in Google Search Console (see README) so your pages
   get indexed — indexed, quality content is what makes ad placements
   valuable in the first place.

## 7. No guarantees

Google approves or rejects AdSense applications based on their own review
process, which can change over time and varies by policy area, region, and
account history. This document describes how to make the site
AdSense-ready from a technical and content standpoint — it does not
guarantee approval.
