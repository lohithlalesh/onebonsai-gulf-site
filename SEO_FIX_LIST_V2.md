# obgulf.com — v2 Build Fix List

**Method:** live DOM inspection at localhost:3000, raw-HTML fetch, source grep across `app/`, URL probing, Semrush UAE database (`ae`) for volume, difficulty and competitor rankings.
**Date:** 10 September 2026
**Scope:** the rebuilt site — 35 URLs, six service pages, 20 insight articles, full `/ar` locale.

> **This supersedes the keyword and priority sections of the earlier audit.** Two recommendations I made previously are retracted below. Where this document and the September strategy documents disagree, this one has the ranking data behind it.

---

## Corrections to my own earlier reporting

Three things I got wrong. Stating them plainly so nobody builds against them.

| I previously said | Verified reality |
|---|---|
| `agentic ai uae implementation` is the standout Tier 1 term (170/mo, KD 17) | **Retracted.** The SERP is 10/10 government and national news — UAE Cabinet, Sheikh Mohammed's office, Gulf News, Khaleej Times, Media Office. The difficulty is low *because* news pages attract no commercial links, not because it is winnable. Intent is "what is this mandate", not "who builds it". |
| Scroll-reveal `visibility:hidden` is a gap worth fixing | **Over-flagged, twice.** 14 of 147 elements, scroll-scrubbed by design, `prefers-reduced-motion` handled, text present in raw HTML. Only real cost is the accessibility tree. Priority: Low. |
| `FAQPage` schema is "the highest-leverage AEO change" | **No longer true.** Google retired FAQ rich results for all sites on 7 May 2026. Keep the FAQ *content* — it is what AI answer engines extract — but expect no SERP feature from the markup, and do not add `FAQPage` to new pages for Google benefit. |

**The generalisable lesson:** keyword difficulty without SERP inspection is misleading. Check the actual SERP before building a page for any term.

---

## What is already right — do not touch these

- **Heading word-spans are fixed.** H1 reads `AI integration and custom software, built in Abu Dhabi.` with real spaces. Every H2 too. This was the worst finding in the original audit and it is closed.
- **3 URLs → 35.** Six service pages, 20 insight articles, industries index, contact, privacy, terms.
- **Sitemap is comprehensive** — 35 URLs with sensible `lastmod`, replacing the two-entry version.
- **`Organization` + `WebSite` `@graph` sitewide**, `Service` schema per service page, `BreadcrumbList` present.
- **Full Arabic locale at `/ar`** — `lang="ar-AE"`, `dir="rtl"`, translated titles, H1s and article set. This was a year-two recommendation and it already exists.
- **`llms.txt` is live and well-formed** (1,396 bytes, correct structure).
- **Canonicals are correct** and absolute (`https://obgulf.com/...`) even when served from localhost.
- **404s return 404.** `robots.txt` allows all. `prefers-reduced-motion` is handled.
- **Title tags are well-sized** — 57 chars on service pages, keyword-led.
- **`/contact` has a working form** (4 fields, POSTs to `/api/enquire`).

---

## Critical — fix before anything else

> **Re-checked 10 September, later the same day. C1 and C3 below were wrong — retracted.** My first pass hit a stale dev server. The pages exist, and the H1s are already keyword-led. Corrected record follows; do not action the struck items.

### ~~C1. The two easiest wins return 404~~ — RETRACTED

All nine service slugs exist in `app/content/services.ts`, are mapped by `generateStaticParams`, are in the sitemap, and return 200. The 404s I reported were a dev server that had not recompiled. Verified live:

| URL | Words | H1 | Target | Vol / KD |
|---|---|---|---|---|
| `/services/system-integration` | 1,214 | "System integration services for UAE enterprises." | software integration company in dubai | 210 / **12** |
| `/services/cybersecurity` | 1,147 | "Cybersecurity services for UAE enterprises." | cybersecurity companies in dubai | 590 / **21** |
| `/services/custom-software-development` | 1,101 | "Custom software development in Abu Dhabi." | custom software development company | 3,600 / **21** |
| `/services/application-development` | 1,189 | "Application development services in Abu Dhabi and the UAE." | application development company | 720 / **19** |

**All four Tier 1 terms now have a page, at target depth, with the keyword in the H1 and title.** This is the work done.

### ~~C3. Service H1s carry no primary keyword~~ — RETRACTED

Same cause. Current H1s carry the term. The two I quoted were from the stale build.

### C2. No telephone number or street address anywhere in the codebase

```
grep -rE "\+971|telephone|streetAddress|postalCode" app/
→ only "phonePlaceholder: '+971'" in PlanIntegrationModal.tsx
```

`Organization` schema carries `addressLocality: "Abu Dhabi"` and `addressCountry: "AE"` and nothing else. No `telephone`, no `streetAddress`, no `postalCode`, no `geo`.

**Why this is Critical:** it blocks Google Business Profile verification. GBP is the mechanism that puts you in the local pack when someone in Abu Dhabi searches "AI company" or "software company" — which is the literal brief from management. Nothing else on this list moves that brief.

**Fix:** get the registered address and a UAE phone number. Publish them identically in: the site footer, `/contact`, the `Organization` schema, and the GBP listing. Then add `LocalBusiness` schema (currently absent).

### C3. Service page H1s carry no primary keyword

| Page | H1 | Contains keyword? |
|---|---|---|
| `/services/custom-software-development` | "Build the software your operating model actually needs." | No |
| `/services/ai-integration` | "Connect AI to the systems and decisions that run your business." | No |

The title tags are correct. The H1s are not. This is the same brand-voice-over-search-signal mistake the old homepage made — fixed at the top level, repeated one level down.

**Fix:** put the primary term in the H1, demote the current line to the subhead directly beneath it. Exactly the fix that worked on the homepage.

### C4. Stale Twitter Card tags — the same bug as the original audit

On `/services/ai-integration`:

```
og:title       = "Enterprise AI integration in the UAE"        ← correct, page-specific
twitter:title  = "AI Integration & Custom Software in Abu Dhabi"  ← the HOMEPAGE title
twitter:description = homepage description
og:image       = ABSENT on this page
```

Every social share of a service page misrepresents it as the homepage. This was finding H3 in the original audit and it survived the rebuild.

**Fix:** generate Twitter tags from the same source as the OG tags. Add a per-page `og:image`, or at minimum inherit the site default so the tag exists.

---

---

## E-E-A-T assessment — all pages

Scored against Google's Experience, Expertise, Authoritativeness, Trust framework.

| Pillar | Grade | Evidence |
|---|---|---|
| **Experience** | **Strong** | Real delivered proof throughout — 1,600 staff at University Hospital Bonn, named clients, first-hand process detail. This is the pillar most competitors fake and you do not have to. |
| **Authoritativeness** | **Strong** | Articles cite genuine primary sources — `ai.gov.ae` National Strategy PDF, `uaelegislation.gov.ae` Federal Decree-Law No. 45, MOCAI AI Ethics PDF, ADGM, Abu Dhabi Digital Strategy. Real government URLs, not other agencies' blogs. Better than every UAE competitor reviewed. |
| **Expertise** | **Weak — the main gap** | `"author": {"@type": "Organization", "name": "OneBonsai Gulf"}` on every article. **No named human author anywhere.** No byline, no bio, no credentials, no LinkedIn, no author pages. The only `Person` in the markup is `founder: Ivan M Grey` inside `Organization`. Your own master plan §7.2 says "No anonymous or 'Admin' posts, ever." The site breaks its own standard. |
| **Trust** | **Partial** | Good: `/privacy`, `/terms`, visible dates, a Sources block, real contact form, correct canonicals. Missing: **no telephone, no street address anywhere** (C2), so no `LocalBusiness` and no verifiable NAP. |

**Two specific E-E-A-T defects to fix:**

1. **All 22 articles share one hardcoded date.** `app/insights/[slug]/page.tsx:14` — `const reviewedDate = "2026-09-09"`, used for both `datePublished` and `dateModified` on every article. Twenty-two pieces published and modified the same day reads as bulk generation, which is what it was. **Fix:** per-article `publishedAt` and `updatedAt` in the content file, and only bump `updatedAt` on real edits.

2. **No named authors.** Attach a real person per article, matched to topic — governance to Ivan or Jelena, technical to Aditya, healthcare to Hugo, per your own §7.2 author-topic matching. Add `/authors/<slug>` pages with `Person` schema and `worksFor` pointing at the Organization `@id`. This is the highest-value E-E-A-T change available and it costs no research.

---

## Can these pages rank for Tier 1 and Tier 2?

**On-page: yes. Off-page: not yet — and that is now the only thing in the way.**

| Tier | Keyword | Vol / KD | Page | On-page verdict |
|---|---|---|---|---|
| 1 | custom software development company | 3,600 / 21 | ✅ 1,101 words | Competitive |
| 1 | software integration company in dubai | 210 / 12 | ✅ 1,214 words | Competitive |
| 1 | cybersecurity companies in dubai | 590 / 21 | ✅ 1,147 words | Competitive |
| 1 | application development company | 720 / 19 | ✅ 1,189 words | Competitive |
| 2 | software development companies in abu dhabi | 260 / **10** | ⚠️ no dedicated page | Partially served by the custom-software H1 |
| 2 | ai automation | 480 / 57 | ⚠️ thin | `/services/ai-integration` is 555 words and targets a zero-volume term |
| 2 | ai training / ai courses in uae | 210–480 / 43–67 | ⚠️ 315 words | `ai-training-academy` too thin for a ~1,100/mo cluster |

The four Tier 1 pages now have keyword-led titles and H1s, 1,100–1,200 words, TL;DR blocks, FAQ sections, `Service` + `FAQPage` + `BreadcrumbList` schema and real source citations. **That is a genuinely rankable page shape** — it matches what `baone.ae` and `code-brew.ae` hold positions 1 and 2 with.

**What stops them ranking is authority, not content.** obgulf.com has zero referring domains and zero organic keywords. The competitors at positions 1–2 are established `.ae` domains. No amount of further on-page work closes that gap.

**So the constraint has moved.** The content problem is largely solved. Every remaining hour is better spent on Barnacle SEO (Clutch, GoodFirms, Sortlist), the followed link from onebonsai.com, and Google Business Profile — than on another service page.

**How you would know this is working:** impressions in Search Console inside 4–6 weeks of indexing, before any clicks. If impressions stay at zero after eight weeks with pages indexed, the problem is indexation or authority, not the copy.

---

## High priority

| # | Issue | Verified detail | Fix |
|---|---|---|---|
| H1 | **Service pages are thin** | `/services/custom-software-development` renders 426 words. Competitors ranking at positions 1–2 run 1,500–2,400. | Target 1,200–1,800 on pages targeting real terms. See H2 for why this matters more than page count. |
| H2 | **Page count is not the lever — depth is** | Sokrab UAE runs 6 AI service pages + 8 AI micro-pages and ranks for **zero AI keywords**. NomadX, with city pages, service pages, FAQ schema and a blog, ranks for **one** keyword total. | Stop adding AI service pages. Deepen the ones targeting measured terms. Sokrab is the controlled experiment for the "many thin exact-match pages" strategy and it returned nothing. |
| H3 | **Two service pages target zero-volume terms** | `/services/ai-consulting-abu-dhabi` and `/services/ai-integration` — Semrush returns no row for either term in the UAE database. | Do not delete; they serve buyers who arrive by other routes. But stop treating them as ranking assets and do not add more of this shape. |
| H4 | **Homepage leads with the weaker term** | Title and H1 lead with "AI integration" (20/mo, too thin to score) ahead of "custom software" (3,600/mo, KD 21). | Reorder: `Custom Software and AI in Abu Dhabi`. The demand is 180× larger and the difficulty is measurable. |
| H5 | **Arabic built but not submitted** | 35 sitemap URLs, zero `/ar`. `hreflang` declares `ar-AE` on every page. | Add every `/ar` URL to the sitemap. Sokrab ranks with an Arabic page, so Arabic does rank in this market — the asset exists and is not being declared. |
| H6 | **Insights skew to verticals with no measured demand** | 10 of 20 articles are `ai-<industry>-uae`. Measured informational demand sits elsewhere: `digital twin` 720, `ai automation` 480, `computer vision` 390, `pdpl` 320. | Keep what is published. Weight the next batch toward the measured terms. |
| H7 | **No `LocalBusiness` schema** | Only `Organization`. Blocked by C2. | Add once the NAP exists. `Organization` alone does not produce local entity signals. |
| H8 | **`memberOf` is the wrong relationship** | `memberOf: { name: "OneBonsai" }` in layout.tsx. | Use `parentOrganization` on this side and `subOrganization` on onebonsai.com. `memberOf` describes group membership, not a subsidiary. |

---

## Medium priority

- **Dev fallback URL is `:3001` while the dev server runs on `:3000`** (`app/layout.tsx:10`). Harmless in production — `NEXT_PUBLIC_SITE_URL` or `https://obgulf.com` wins — but local schema previews and `twitter:image` show the wrong host, which makes local validation misleading.
- **Scroll-journey steps are outside the accessibility tree.** `visibility:hidden` removes them. A screen reader user gets step 1 and never steps 2–4. Give those four process steps one always-visible home (the mobile layout, or a static list) so the scrubbed version is pure enhancement.
- **No followed link from onebonsai.com** to obgulf.com. Unchanged since the first audit. Still the cheapest link available.
- **Case studies** — verify `/work/<slug>` pages host the content rather than linking out to `onebonsai.com/cases`. Original finding C4.

---

## Low priority / non-issues

- **`FAQPage` markup on service pages** — harmless, keep it, but it produces no SERP feature since 7 May 2026. Not worth removing, not worth extending.
- **Sitemap `changefreq` and `priority`** — Google ignores both. No harm in leaving them.
- **20 insight articles is already substantial.** Do not add more until the service pages that need internal links exist.

---

## Revised sequence

**Week 1 — the three 404s and the NAP**
1. Build `/services/system-integration` (KD 12) and `/services/cybersecurity` (KD 21)
2. Get the registered address and UAE phone number; publish in footer, `/contact` and `Organization` schema
3. Fix the Twitter Card tags and add per-page `og:image`
4. Put primary keywords in the service page H1s

**Weeks 2–4 — depth and the profile**
5. Start Google Business Profile verification (needs step 2; allow up to a fortnight)
6. `/services/application-development` (720/mo, KD 19)
7. Bring the four measured-term service pages to 1,200–1,800 words
8. Add `/ar` URLs to the sitemap
9. Add `LocalBusiness` schema; switch `memberOf` → `parentOrganization`

**Weeks 5+ — authority**
10. Claim Crunchbase, LinkedIn, Clutch, GoodFirms; add each to `sameAs`
11. Request the followed link from onebonsai.com
12. Next article batch weighted to `digital twin`, `ai automation`, `computer vision`, `pdpl`

---

## What I still could not audit

- **Backlink profile.** Ahrefs returns `Insufficient plan` on every endpoint including the free ones; the connected key has no API entitlement. No referring-domain data exists for this site.
- **Search Console data.** Not yet verified, so there is no query or impression data. This remains the single most valuable free source and it is still not set up.
- **Production behaviour.** Everything here is measured against `localhost:3000`. The `www` → apex redirect, HSTS, cache headers and production Core Web Vitals need re-checking after deploy.

**Baseline, for the record:** obgulf.com currently ranks for **zero** organic keywords in the Semrush UAE database. Every number in this document starts from nothing.

---

# Appendix — the 10 advanced techniques, triaged

Six of these need a site with existing rankings and backlinks. obgulf.com has neither. Applying them now is motion without movement. Here is what each one actually requires and where it lands.

## Do these now — they work from zero

### 1. Barnacle SEO — **the single highest-ROI action available**

Rank on domains that already rank, instead of trying to outrank them. This is built for exactly your situation: no authority, strong proof, and a SERP full of directories.

The evidence is in the SERPs I pulled:

```
"custom software development company" (3,600/mo)
  3  linkedin.com  — "Top 10 custom software companies Dubai" listicle
  4  clutch.co/developers
  5  xchange.avixa.org — listicle
  8  fullstack.com — listicle

"software development companies in abu dhabi" (260/mo, KD 10)
  1  sortlist.com
  5  techreviewer.co
  9  clutch.co/ae/developers/abu-dhabi
```

You will not outrank Clutch. You can be *inside* Clutch, on page one, next week — and every listing is also a citation source AI answer engines read.

**Targets, in order:** Clutch (verified profile + 3 client reviews), GoodFirms, Sortlist, TechBehemoths, techreviewer.co, then the "Top AI companies UAE 2026" listicles. Your UKB / EEAS / Red Cross roster is a stronger pitch than most firms already listed can make.

**How you know it failed:** three months in, you have profiles but no referral sessions and no listing appears for your target terms. Leading indicator: profile views on Clutch inside week 2.

### 2. Entity Stacking — already half-built, finish it

Making Google and the AI engines resolve OneBonsai Gulf to one unambiguous entity. You have `Organization` schema; what is missing is the corroboration.

**Do:** consistent NAP everywhere (blocked on C2), `sameAs` listing every profile as it goes live, `parentOrganization` instead of `memberOf` (H8), `LocalBusiness` once the address exists, Crunchbase + LinkedIn + GBP claimed. Same description string verbatim in all of them.

**Falsifiable check:** search the brand name and see whether Google shows a knowledge panel. No panel after six months of consistent signals means the entity has not resolved.

### 3. Search Intent Splitting — you have a live case of this

Splitting one topic into pages by intent instead of one page trying to serve all of it.

Concrete instances in your data:
- `custom software development company` (commercial) and `what is custom software development` (informational) are different pages, not one.
- `software development companies in abu dhabi` (260/mo, KD 10) is contaminated with **job-seeker intent** — `software developer jobs in abu dhabi` (210/mo) and two job boards rank in its top 10. Your page must signal *hiring a firm*, not *being hired*, or it competes with Indeed.
- `ai automation` is informational; `business process automation` skews commercial. Different treatments.

### 4. Query Fan-Out Optimization — the honest answer to the management brief

AI Mode and AI Overviews decompose one question into several sub-queries, answer each, then synthesise. You get cited by answering the *sub-questions* explicitly, not the head term.

For "who does AI implementation in Abu Dhabi", the fan-out is roughly: who provides it · what does it cost · how long does it take · do they meet UAE data rules · can they show delivered work · are they actually local.

**So:** each service page needs a short, self-contained, extractable answer to each of those — cost framing, timeline, PDPL/data-residency position, named proof, local presence. This is where a zero-volume query still gets served, and it is the mechanism that delivers the "present for AI in Abu Dhabi" brief without a page targeting `ai enablement`.

### 5. Digital PR SEO — you have the asset, use it

Real proof beats outreach volume. 1,600 staff trained at University Hospital Bonn, plus EEAS and Red Cross EU, is a genuine story for Gulf News, Khaleej Times and the regional trade press.

**Cheapest link on the table remains unclaimed:** a followed link from onebonsai.com. Ask for it this week.

---

## Not yet — these need a mature site

### 6. Content Pruning · 7. Content Decay Recovery

Both operate on content that once ranked and no longer does. **You rank for zero keywords.** Nothing has decayed because nothing has risen. Revisit at month 9–12, once Search Console has history. Pruning a brand-new site removes pages before they have had a chance to be indexed.

### 8. Reverse Siloing

Points external link equity at a hub, then distributes it down to money pages. It requires backlinks to distribute. **You have none.** Meaningless until the Barnacle and Digital PR work lands. Revisit once you pass roughly 15–20 referring domains.

### 9. Internal Link Sculpting

Partially applicable. With 35 pages there is real internal linking to do — and section D of the audit specifies it. But *sculpting* means shaping the flow of authority you already have, and there is none to shape yet. **Do the plain hub-and-spoke now; sculpt in year two.**

---

## Do not do this one

### 10. Programmatic SEO — actively dangerous for this site

Generating pages at scale from a template and a data set. It is the wrong tool here, for three reasons:

1. **Your pages are already thin** — 426 words on the flagship service page. Programmatic multiplies thin, it does not fix it.
2. **You already have 10 industry articles with no measured search demand behind them.** That is programmatic thinking without the automation.
3. **Sokrab UAE is the controlled experiment.** Fourteen templated AI service and micro-solution pages. Zero AI rankings. It has already been run in your exact market and it failed.

Standard quality gates apply: warning at 30+ templated location pages, hard stop at 50+ without justification, and 60%+ genuinely unique content per page. You would breach all three.

**If you want scale later,** the honest version is one deep page per *measured* term — which is four or five pages, not fifty.

---

## Google Trends categories — pending

The Trends "Categories" feature is worth running: it surfaces rising queries inside a category rather than requiring you to guess the seed term, and rising terms are where the least competition sits.

The 24-hour **Trending Now** view for the UAE is consumer news — iPhone launches and football — and is not useful here. The value is in **Explore → 12 months → category filter → Rising queries**, which is where a term like `creatine gummies` surfaces in the nutrition example.

Browser access timed out mid-session, so this is not yet done. Worth running against: Computers & Electronics, Business & Industrial, and Internet & Telecom, geo UAE, 12-month window, sorted by Rising. Treat anything it surfaces as a hypothesis and validate the volume in Semrush before building — Trends shows *relative* movement, not absolute demand, and a 1,000% rise on 8 searches a month is still 8 searches a month.
