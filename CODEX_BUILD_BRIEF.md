# Codex build brief — obgulf.com content expansion

**Paste this entire file into Codex.** It is self-contained: every fact you need is written out below. You do not need the source presentation or transcript, and they will not be provided.

**Repo:** this one. **Dev server:** `localhost:3000`. **Stack:** Next.js App Router, TypeScript, content-as-data in `app/content/*.ts`.

---

## 0. Ground rules — read before writing a line

**Every factual claim below has been checked. Do not add facts of your own.** If you need a number that is not in this brief, write `[VERIFY: description]` and leave it. A fabricated statistic found by a procurement lead costs more than this whole exercise returns.

**Attribution rule.** OneBonsai Gulf (Abu Dhabi) is the regional company. OneBonsai (Belgium) is the parent. Aggregate delivery figures below belong to **the wider OneBonsai group**, not to the Gulf entity alone. Always phrase them that way — "delivered across the OneBonsai group", not "we have trained". Never present group figures as Gulf-only.

**Do not name any third-party client, customer or university anywhere in this work.** Sector-level descriptions only ("a Gulf hospital group", "an aviation maintenance operator"). This is deliberate — do not add logos, names or institutional partnerships beyond Masdar City Free Zone, which is OneBonsai Gulf's own partner and is approved.

**Voice.** Match the existing site: plain declarative sentences, no marketing inflation, no "seamless", "leverage", "cutting-edge", "elevate", "unlock". Read an existing service entry in `app/content/services.ts` before writing and match its register exactly.

---

## 1. Three new service pages

Add three entries to the `services` array in `app/content/services.ts`, matching the existing `Service` type exactly (`slug`, `name`, `eyebrow`, `headline`, `title`, `description`, `summary`, `image`, `imageAlt`, `primaryKeyword`, `relatedKeywords`, `outcomes`, `capabilities`, `process`, optional `guidance`, `faqs`). Routing, metadata, schema and breadcrumbs are already generated from this array — no page components need editing.

Target **1,100–1,300 rendered words each**, matching `system-integration` (1,214) and `custom-software-development` (1,101). Each needs 5–7 FAQs.

### 1.1 `/services/ai-experts-on-demand`

**This is the biggest gap on the site.** The About page already describes this capability in prose and has no page behind it.

- `name`: "AI experts on demand"
- `primaryKeyword`: "AI talent UAE"
- `relatedKeywords`: "AI staff augmentation UAE", "hire AI engineers Dubai", "AI specialists Abu Dhabi", "fractional AI team"
- `headline`: "AI experts on demand, for the exact capability gap."
- `title`: use the buyer's own words — **"We want to implement AI, but we don't have the internal expertise."**

**Facts you may use:**
- A curated network of **50+ vetted AI and IT specialists**, local and international.
- Engagement shapes: **project-based, fractional, embedded with the client's team, or a full delivery team.**
- Roles available, grouped:
  - *Strategy* — AI transformation leaders, AI advisors, AI governance specialists
  - *Build* — AI/ML engineers, LLM and generative AI developers, AI agent developers
  - *Data* — data scientists, data engineers, MLOps specialists
  - *Specialist* — computer vision, NLP, predictive analytics
  - *Integrate* — enterprise architects, automation specialists, cloud and AI integration
  - *Enable* — AI trainers, change specialists, responsible AI subject-matter experts
- Delivery model, five steps — use as the `process` array:
  1. **Define** — identify the exact skills, seniority, scope and expected outcome
  2. **Match** — select the specialist or multidisciplinary team from the network
  3. **Deploy** — experts advise, build, integrate, train, or embed with the client's team
  4. **Operate** — recruitment, deployment and technical project management handled by us
  5. **Scale** — increase, reduce or change specialist capacity as the project evolves
- Capacity genuinely flexes both directions — a team can start at five advisors and scale down to two as the work matures.

**FAQ questions to answer** (write 60–90 word answers):
- "We want to implement AI but don't have the internal expertise. Where do we start?"
- "Can we hire one specialist rather than a whole team?"
- "Do your experts work on site in the UAE or remotely?"
- "What happens when the project scales down?"
- "How is this different from a recruitment agency?" — the honest answer: we manage delivery and technical project management, not just placement.
- "Can experts embed with our existing team?"

### 1.2 `/services/digital-twins-simulation`

`digital twin` measures **720 searches/month in the UAE** — the largest informational term in the entire keyword set. The site currently mentions digital twins only as an accordion bullet.

- `name`: "Digital twins & simulation"
- `primaryKeyword`: "digital twin UAE"
- `relatedKeywords`: "digital twin technology", "industrial simulation UAE", "what is a digital twin", "predictive maintenance simulation"
- `headline`: "Digital twins and industrial simulation for UAE operations."

**Facts you may use** (all sector-level, no client names):
- A digital twin is a **virtual replica of a physical asset, workflow or facility**, used to test changes before they are made in the real world.
- **Industrial example:** simulating worker effectiveness on an offshore rig, and modelling equipment upgrades — for instance raising pump capacity from **1,000 litres/hour to 3,000 litres/hour** and predicting where storage becomes the new bottleneck. The value is finding the *next* constraint before spending on the first.
- **Aviation maintenance example:** rehearsing a complex procedure such as a front-wheel replacement on a wide-body aircraft. Physical training requires the aircraft to be out of service, ties up expensive equipment, and carries operational risk. Simulation removes all three, and prevents damage costs that can exceed **€1,000,000** per incident.
- What it enables: repeatable training without real-world risk, less dependency on asset availability, consistent assessment standards, faster onboarding, and the ability to test operational changes before committing capital.

**Include a "What is a digital twin?" section** as an early H2 — this is the informational query driving the 720/mo and it needs a direct, extractable, 40–60 word definition near the top of the page.

**FAQ questions:**
- "What is a digital twin?"
- "How is a digital twin different from a 3D model or a VR simulation?"
- "What data does a digital twin need to be useful?"
- "How long does it take to build one?" → `[VERIFY: typical timeline]`
- "Where do digital twins deliver the most value?"

### 1.3 `/services/uae-market-entry`

- `name`: "UAE market entry"
- `primaryKeyword`: "UAE market entry"
- `relatedKeywords`: "business setup Abu Dhabi", "GCC market entry", "Masdar City free zone", "company formation UAE"
- `headline`: "Enter the GCC market from Abu Dhabi."
- `title`: "Sometimes the problem is not technology. It is access."

**Facts you may use:**
- OneBonsai Gulf is a **strategic partner of Masdar City Free Zone, Abu Dhabi**. This is our own partnership and may be named.
- Services: **legal entity setup, licensing, visa proceedings**, local partner introductions, and market representation.
- Two directions, both real: **into the GCC** (international technology companies entering the region) and **out to the world** (GCC companies expanding internationally, using the group's European network).
- Positioning: a bundled technical, operational and administrative launchpad — not a company-formation agent. The difference is that the same team can also build and run the technology once the entity exists.

**FAQ questions:**
- "What does the Masdar City Free Zone partnership give us?"
- "Can you handle licensing and visas?"
- "We are a technology company entering the GCC. Where do we start?"
- "Do you only work with technology companies?"
- "What does setup cost?" → `[VERIFY: fee structure]`

---

## 2. Rewrite `/services/vr-training-simulation`

**Currently 285 words — the thinnest page on the site, sitting on the richest material.** Bring it to **1,300–1,500 words**, the deepest service page.

**Facts you may use:**
- **Four ready-made VR training modules:** Fire response (fire response, extinguisher use, evacuation), First Aid (emergency response and procedural practice), Hazard Spotting (recognising workplace risk before incidents), and Cybersecurity (interactive security-awareness scenarios).
- **Every module includes an AI avatar.** State this plainly as a differentiator — it is not standard in the market.
- **Multilingual** — modules are available in a wide range of languages.
- **VR Fire Protection has 20 distinct levels**, with a SaaS platform behind it for customising each zone: different fire types, different extinguishers, different environments.
- Modules were **developed from 2017 onward** and have been revised since for layout, design and international certification.
- **First Aid training runs approximately 45 minutes.**
- Runs on **Meta Quest, Pico and Samsung/HTC Vive**. We sell the software licences; hardware is the client's choice.
- **More than 80,000 people have been trained** on immersive solutions across the OneBonsai group. *(Attribution rule applies — "across the OneBonsai group".)*
- Sectors where immersive training fits: energy, defence, aviation, healthcare, logistics, construction, manufacturing, education. The signal to look for is **high-risk, repeatable, or expensive-to-deliver training.**
- Beyond ready-made modules, **custom simulation** is available: safety, technical and equipment procedures, emergency response, operations, onboarding, AI role-play and digital humans.
- Performance tracking and enterprise deployment are included.

**Pricing — publish it.** Almost nobody in this market does, and it is a strong trigger for "how much does X cost" queries in AI answers.
- **€2,000 per licence per year** for Fire, First Aid and Hazard Spotting.
- Licences are consumed concurrently, not per person. Worked example to include verbatim in substance: *a 100-person organisation training everyone within one week typically needs around 4 licences — roughly €8,000–10,000 — because an 8-hour shift pattern limits how many people can pass through a single headset.*
- **Educational institutions receive 50% off all modules.** State this plainly; it opens a vertical.

**FAQ questions:**
- "How much does VR training cost?"
- "Do we need to buy the VR headsets from you?"
- "How many licences do we need for 100 staff?"
- "Which languages are supported?"
- "Do you build custom training, or only the ready-made modules?"
- "Is there a discount for schools and universities?"
- "How do we track who has completed training?"

Also update `/services/ai-training-academy` (currently 315 words) to reference the **50% education discount**, and cross-link to the VR page.

---

## 3. Voice-of-customer FAQs on existing pages

These are the literal sentences prospects say. **Use them verbatim as FAQ questions** — answer engines match phrasing, and paraphrasing loses the match. Add one to each page below, alongside the existing FAQs.

| Add this FAQ question | To this service |
|---|---|
| "Our tools don't talk to each other. Can you connect them?" | `system-integration` |
| "We have too many subscriptions. Can you consolidate them?" | `system-integration` |
| "We run everything in Excel. What replaces that?" | `custom-software-development` |
| "We do this manually. Can it be automated?" | `ai-automation` (or `ai-integration` if no automation page exists) |
| "We have too much data and no visibility. Where do we start?" | `ai-automation` |
| "We don't know how to use AI. Where do we start?" | `ai-consulting-abu-dhabi` |

Also add these three, drawn from the discovery framework, to whichever service page fits best:
- "What does this problem actually cost the business?"
- "Which process should we automate first?"
- "If we solved this, what would success look like?"

---

## 4. `/work` — four case studies

The `/work` page currently links off-domain. Add four case studies in **Challenge → Approach → Outcome** structure. **All are sector-level. No client names.**

**A. Hospital group — from fragmented processes to an AI roadmap**
- *Challenge:* patient information spread across multiple systems; manual appointment and administrative workflows; long waiting times and repetitive staff tasks; leadership wants AI but has no starting point.
- *Approach:* interview leadership and operational teams; map processes, data and technology landscape; identify and rank high-impact opportunities; build a phased roadmap of quick wins, then pilots, then scale.
- *Outcome:* a prioritised portfolio of use cases; clear business cases and named ownership; defined pilots with measurable KPIs; a practical roadmap instead of scattered experiments.

**B. Banking — QA automation**
- *Challenge:* large volumes of digital journeys requiring repeated testing; manual QA consuming significant team capacity; human testing missing edge cases; continuous release pressure.
- *Approach:* build an AI-assisted QA and workflow platform; generate repeatable testing scenarios; flag anomalies and defects for human review; integrate into existing delivery workflows.
- *Outcome:* faster testing and release cycles; more consistent quality assurance; reduced repetitive manual workload; a scalable foundation for future digital products.

**C. Aviation — immersive maintenance training**
- *Challenge:* physical training requires expensive equipment; aircraft availability limits training windows; some procedures carry operational risk; training quality varies by instructor and location.
- *Approach:* create a realistic immersive aircraft environment; guide technicians through procedures step by step; track actions, errors and performance; deploy standardised scenarios across teams.
- *Outcome:* repeatable training without real-world risk; less dependency on aircraft availability; consistent assessment standards; faster onboarding.

**D. Vyonix — AI-ready digital product passport** *(our own venture, may be named)*
- *Challenge:* a brand needed product traceability and compliance information, and did not frame it as an AI problem.
- *Approach:* built a unique digital identity per product, structured material and origin data, supply-chain and lifecycle traceability, and QR-based access to sourcing and lab verification.
- *Outcome:* structured data that can feed AI systems; intelligent querying of product information; analytics that surface patterns and risks; a platform that evolves with regulation.
- *The point worth stating:* the client asked for compliance and traceability, not AI. The need was translated into a digital product.

---

## 5. Structured data, `llms.txt`, sitemap

1. **`public/sitemap.xml`** — add the three new service URLs with `priority` 0.9 and today's `lastmod`. Add the four `/work/<slug>` URLs if they become routed pages.
2. **`public/llms.txt`** — currently capability descriptions with no facts. Add an `## Evidence` section: 80,000+ people trained across the OneBonsai group; 70+ case studies; 49+ clients; strategic partner of Masdar City Free Zone, Abu Dhabi; four ready-made VR modules with AI avatars; a network of 50+ AI and IT specialists. Add the three new service URLs to the page list.
3. **`app/layout.tsx` `Organization` schema:**
   - Add Masdar City Free Zone as a partner. Use `memberOf` or a `Partnership` reference — but **also change the existing `memberOf: { name: "OneBonsai" }` to `parentOrganization`**, which is the correct property for a parent company. `memberOf` describes group membership, not a subsidiary relationship.
   - Extend `knowsAbout` with: "Digital twins", "Industrial simulation", "AI talent and staff augmentation", "UAE market entry".
   - `telephone` and `streetAddress` are still missing. Add `[VERIFY: telephone]` and `[VERIFY: streetAddress]` placeholders in a comment so they are not forgotten — do not invent values.

---

## 6. Images and illustrations

**There is a real problem to fix here:** three existing services (`ai-integration`, `agentic-ai-implementation`, `system-integration`) all point at `/media/capability-ai-integration-v1.jpg`. Duplicate hero images across pages weaken each page's distinctiveness. **Do not extend this pattern.** Each new page needs its own asset.

**Prefer diagrams over stock photography for these three pages.** The concepts are structural, not visual, and a diagram is more useful, more distinctive, and more likely to be referenced than another abstract render.

Build them as **inline SVG React components** in `components/`, not image files. Requirements:
- Theme-aware — use existing CSS custom properties from `app/globals.css`, never hardcoded hex
- `role="img"` with a descriptive `<title>`, and `aria-hidden` on decorative sub-elements
- Responsive via `viewBox`, no fixed pixel dimensions
- No external libraries

**Diagram specs:**

| Page | Diagram | Content |
|---|---|---|
| `ai-experts-on-demand` | **Five-step delivery flow** | Define → Match → Deploy → Operate → Scale, as a horizontal flow that stacks vertically on mobile. Show capacity flexing both ways at the Scale step (a bidirectional arrow) — that is the differentiating detail. |
| `digital-twins-simulation` | **Physical ↔ virtual pairing** | Left: physical asset. Right: virtual replica. Bidirectional arrows labelled "sensor data" (left to right) and "tested changes" (right to left). The two-way loop is the concept most explanations get wrong — make it the visual point. |
| `uae-market-entry` | **Two-direction gateway** | "Into the GCC" and "Out to the world" as two paths meeting at an Abu Dhabi node, with Masdar City labelled. Keep it schematic, not a literal map. |
| `vr-training-simulation` | **Four-module grid** | Fire · First Aid · Hazard · Cybersecurity, each with a simple glyph and the "AI avatar included" marker. |

If a photographic hero is required by the existing template, reuse an existing unused asset from `public/media/` rather than duplicating one already in service — check what is unused before generating anything new.

---

## 7. Acceptance criteria

- [ ] Three new services render at 200 with 1,100+ rendered words each
- [ ] `/services/vr-training-simulation` is 1,300+ words and states pricing and the education discount
- [ ] Every new page has 5+ FAQs, and the verbatim voice-of-customer questions appear on the pages listed in §3
- [ ] `digital-twins-simulation` answers "What is a digital twin?" in an extractable paragraph within the first screen
- [ ] No third-party client, customer or university name appears anywhere in the diff
- [ ] Every group-level figure is attributed to "the OneBonsai group", never to the Gulf entity alone
- [ ] All three new URLs are in `sitemap.xml`; `llms.txt` has an Evidence section
- [ ] `memberOf` changed to `parentOrganization`
- [ ] No new page reuses an existing page's hero image
- [ ] Diagrams render correctly in both light and dark themes
- [ ] `[VERIFY: ...]` markers remain visible for telephone, street address, digital twin timeline, and market-entry fees — no invented values
- [ ] `npm run build` passes
