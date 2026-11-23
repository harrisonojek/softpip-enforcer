# SoftPip Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify the complete SoftPip trading-education platform, open-source risk bot documentation, and affiliate acquisition funnel to exact spec requirements across 16 routes, with zero placeholder text, full MDX content, and root repo files (`governor.py`, `README.md`, `config.example.yaml`, `LICENSE`).

**Architecture:** Next.js 15 App Router application with static generation (`generateStaticParams`, `generateMetadata`), Tailwind v4 token system adhering to Apple/Linear dark aesthetic standards, `next-mdx-remote` + `gray-matter` for local MDX parsing, accessible client interactive components (Web3Forms lead gates, expandable accordions, mobile drawer), and standalone Python risk governor (`governor.py`).

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, Motion (`motion`/`framer-motion`), `next/font` (Geist & Inter), `gray-matter`, `next-mdx-remote`, `@vercel/analytics`, Python 3.

**Spec:** Build Spec — SoftPip (verbatim requirements provided in user prompt).

---

## Global Constraints

- **Theme & Colors:** Dark-only; `--void: #080B0F;`, `--navy: #0C1117;`, `--slate: #141B23;`, `--line: #1F2831;`, `--text: #E6EAEE;`, `--text-70: #9AA6B2;`, `--text-45: #6B7885;`, `--mint: #7BE8C4;`, `--mint-text: #5FD9B4;`, `--mint-deep: #3FC7A0;`, `--rust: #E8735A;`, `--rule: rgba(230,234,238,.10);`.
- **Typography:** Display `clamp(2.75rem,7vw,6rem)` Geist 600; H1 `clamp(2.25rem,4.6vw,3.75rem)` Geist 600; H2 `clamp(1.75rem,3vw,2.5rem)` Geist 600; H3 `clamp(1.125rem,1.6vw,1.375rem)` Inter 500; Body `clamp(1rem,1.05vw,1.0625rem)` Inter 400 lh 1.7 max 64ch; Small `.875rem/1.6`; Micro `.75rem` Inter 500.
- **Tone & Banned Words:** Calm, precise, quietly confident. Short sentences. Numbers over adjectives. Banned: "financial freedom", "passive income", "10x", rocket emoji, "DM to learn", "winning team". Never imply profit guarantee (use "designed to", "aims to", "historically").
- **External Links & Referral Attribution:** All Deriv referral links must target `https://t.deriv.link?t=B9FG9YL4HJVF` with `rel="sponsored noopener" target="_blank"`. Instagram link to `https://www.instagram.com/soft.pip` with `rel="noopener me" target="_blank"`.
- **Web3Forms API:** Gate and application forms submit to `https://api.web3forms.com/submit` using `access_key: 87ef4130-07a8-496c-bf8c-f69b2cf77bb6`.
- **Verbatim Disclosures:** Mandatory risk disclaimer and affiliate commission disclosures rendered verbatim on all routes.
- **Quality Gates:** Clean TypeScript (`tsc --noEmit`), zero `any`, no horizontal scroll at 320px, WCAG 2.2 AA accessibility with 2px mint focus ring.

---

## Review Focus

1. **Gate Form Validation & Submission Failure:** Unchecked required $10 confirmation or network drop during Web3Forms submission must gracefully surface aria-live alert states without navigating away.
2. **Invalid Curriculum Route Access:** Direct navigation to `/curriculum/[unrecognized-slug]` must trigger Next.js `notFound()` and render the custom 404 page rather than throwing an unhandled server error.
3. **Motion Accessibility:** Users with `prefers-reduced-motion: reduce` must receive opacity-only reveals without translateY or scale shifts.
4. **Mobile Viewport Boundary (320px):** Stat grid, navigation drawer, and code blocks must never overflow viewport width or cause horizontal window scrolling.
5. **Exact Verbatim Copy & Affiliate Attributes:** Every single Deriv link must include `rel="sponsored noopener"`, and all financial/risk disclaimers must match the spec word-for-word.

---

## File Structure

```
softpip/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── autopsy/page.tsx
│   ├── curriculum/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── bot/page.tsx
│   ├── track-record/page.tsx
│   ├── milestones/page.tsx
│   ├── partner/page.tsx
│   ├── about/page.tsx
│   ├── risk/page.tsx
│   ├── faq/page.tsx
│   ├── terms/page.tsx
│   └── privacy/page.tsx
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── gate-form.tsx
│   ├── partner-form.tsx
│   ├── spec-card.tsx
│   ├── module-row.tsx
│   ├── track-table.tsx
│   ├── accordion.tsx
│   ├── reveal.tsx
│   └── stat-card.tsx
├── content/
│   ├── autopsy.mdx
│   └── curriculum/
│       ├── 01-the-autopsy-line-by-line.mdx
│       ├── 02-how-synthetic-indices-are-actually-generated.mdx
│       ├── 03-risk-of-ruin-and-drawdown-math.mdx
│       ├── 04-position-sizing-from-10-up.mdx
│       ├── 05-why-martingale-cannot-survive-a-small-account.mdx
│       ├── 06-contract-mechanics-ticks-duration-spread-cost.mdx
│       ├── 07-account-segregation-bot-account-vs-manual-account.mdx
│       ├── 08-operating-the-bot-tokens-vps-kill-switch.mdx
│       ├── 09-the-four-failure-archetypes.mdx
│       └── 10-auditing-a-losing-month.mdx
├── lib/
│   ├── content.ts
│   ├── track-record.ts
│   └── seo.ts
├── public/
│   └── images/
│       ├── icon-512.png
│       ├── hero-glow.png
│       ├── about-portrait.jpg
│       ├── bot-dashboard.png
│       └── og-default.png
├── tests/
│   ├── content.test.ts
│   ├── track-record.test.ts
│   └── governor_test.py
├── governor.py
├── config.example.yaml
├── README.md
└── LICENSE
```

---

## Tasks

### Task 1: Next.js 15 Project Setup, Styling Tokens, Fonts, and Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/globals.css`, `app/layout.tsx`
- Test: Build configuration sanity check via `npm run build` or `npx next info`

**Interfaces:**
- Produces: Base Next.js app with CSS variables (`--void`, `--navy`, `--slate`, `--line`, `--text`, `--text-70`, `--text-45`, `--mint`, `--mint-text`, `--mint-deep`, `--rust`, `--rule`), typography clamp utilities, Geist and Inter font loaders, and metadata base.

- [ ] **Step 1: Initialize Next.js 15 project in workspace directory**
Initialize clean Next.js 15 App Router project with TypeScript strict mode, Tailwind CSS v4, and install dependencies (`motion`, `gray-matter`, `next-mdx-remote`, `@vercel/analytics`).
- [ ] **Step 2: Configure `app/globals.css` with exact design tokens and typography rules**
Add all specified root CSS variables, font families, hairline border rules, 6% radial mint glow utility, and card shadow token (`0 1px 2px rgba(0,0,0,.4)`).
- [ ] **Step 3: Setup `app/layout.tsx` with Geist & Inter fonts, metadata base, and theme color**
Configure `metadataBase: new URL('https://softpip.com')`, `themeColor: '#080B0F'`, `lang="en-NG"`, skip link to `#main`, and Analytics.
- [ ] **Step 4: Verify Next.js compilation and typecheck**
Run `npm.cmd run build` to confirm zero errors in base scaffolding.
- [ ] **Step 5: Commit**
`git init && git add . && git commit -m "feat: scaffold Next.js 15 project with design tokens and fonts"`

---

### Task 2: Data Models, Content Loader (`content.ts`), and Track Record Store (`track-record.ts`)

**Files:**
- Create: `lib/content.ts`, `lib/track-record.ts`, `lib/seo.ts`, `tests/content.test.ts`, `tests/track-record.test.ts`

**Interfaces:**
- Produces:
  - `getCurriculumModules(): Promise<CurriculumModule[]>`
  - `getCurriculumModule(slug: string): Promise<CurriculumModuleDetail | null>`
  - `getAutopsyContent(): Promise<AutopsyContent>`
  - `TRACK_RECORD_DATA: TrackRecordEntry[]`
  - `getTrackRecordSummary(): TrackRecordSummary`

- [ ] **Step 1: Write tests for content parsing and track record calculations**
Define unit tests asserting module slug resolution, total 10 modules count, running net ₦ sum calculation, and negative/positive coloring tags.
- [ ] **Step 2: Run tests to verify failure**
Run `npx.cmd tsx tests/track-record.test.ts` (fails due to missing files).
- [ ] **Step 3: Implement `lib/track-record.ts`**
Seed the four weekly records from the spec (weeks, instrument, trades, net ₦, max drawdown, demo/live notes), with running total calculation.
- [ ] **Step 4: Implement `lib/content.ts` using `gray-matter`**
Implement file system readers for `/content/autopsy.mdx` and `/content/curriculum/*.mdx` returning metadata and MDX string source.
- [ ] **Step 5: Run tests to verify passing**
Verify both `content.test.ts` and `track-record.test.ts` pass cleanly.
- [ ] **Step 6: Commit**
`git commit -m "feat: implement content parser and track record data store"`

---

### Task 3: Core UI Components, Global Nav, Mobile Bottom Bar, and Verbatim Footer

**Files:**
- Create: `components/nav.tsx`, `components/footer.tsx`, `components/reveal.tsx`, `components/stat-card.tsx`, `components/spec-card.tsx`, `components/module-row.tsx`, `components/accordion.tsx`

**Interfaces:**
- Consumes: CSS variables, design tokens, `TRACK_RECORD_DATA`.
- Produces:
  - `<Nav />`: Fixed header, 28px mint mark, links, "Open $10 account" pill (`rel="sponsored noopener"`), mobile overlay drawer (<880px) with trapped focus & ESC handler, and sticky 60px mobile bottom bar.
  - `<Footer />`: 4 columns, social link (`rel="noopener me"`), email (`softpip.contact@gmail.com`), verbatim affiliate disclosure, and verbatim Deriv risk disclaimer.
  - `<Reveal />`: Motion reveal container with 600ms opacity + 12px translateY (opacity-only under reduced motion).
  - `<Accordion items={...} />`: Accessible disclosure with keyboard navigation (Enter/Space, Home/End) and `aria-expanded`/`aria-controls`.

- [ ] **Step 1: Implement `<Reveal />` supporting `prefers-reduced-motion`**
Create wrapper component applying 600ms reveal with 12px translateY or opacity-only based on media query.
- [ ] **Step 2: Implement `<Nav />` with responsive overlay and sticky mobile bar**
Build fixed navbar with 28px rounded mint mark, desktop navigation, external sponsored CTA pill, accessible mobile drawer toggle, and fixed bottom mobile bar.
- [ ] **Step 3: Implement `<Footer />` with exact verbatim copy**
Embed verbatim affiliate disclosure and Deriv risk warning without single word omitted.
- [ ] **Step 4: Implement `<StatCard />`, `<SpecCard />`, `<ModuleRow />`, and `<Accordion />`**
Build presentational components adhering strictly to 14px border-radius, hairline borders, and fluid clamp type.
- [ ] **Step 5: Commit**
`git commit -m "feat: implement navigation, footer, motion reveals, and core UI components"`

---

### Task 4: Homepage (`/`) Implementation

**Files:**
- Create: `app/page.tsx`, `public/images/hero-glow.png`, `public/images/icon-512.png`

**Interfaces:**
- Consumes: `<Nav />`, `<Footer />`, `<Reveal />`, `<StatCard />`, `<SpecCard />`, `<ModuleRow />`, `lib/track-record.ts`, `lib/content.ts`.

- [ ] **Step 1: Assemble Section 1 (Hero) & Section 2 (Dual CTAs)**
Display: "Trade with rules, not feelings.", Sub: "In 2025 I lost ₦32M trading. The full autopsy is free. So is the ten-module curriculum and the risk bot. You need $10 to start.", mint pill to `/autopsy`, ghost pill to `/bot`, with 6% radial mint glow.
- [ ] **Step 2: Assemble Section 3 (Stat Row) & Section 4 (How It Works)**
4 cells in a rounded card with hairline dividers: "₦32M lost", "28 trades a $10 account survives", "5 steps martingale can't complete", "40% of revenue funds this". 3 numbered cards for How it works with commission disclosure note.
- [ ] **Step 3: Assemble Section 5 (Curriculum Preview) & Section 6 (Bot Teaser)**
Preview 4 modules linking to `/curriculum`; Bot spec card with rust caveat "No edge over the market. An edge over you." linking to `/bot`.
- [ ] **Step 4: Assemble Section 7 (Track Record Strip), Section 8 (Testimonials), and Section 9 (Final CTA)**
4-week strip with green and red figures; 3 testimonials (first name and Nigerian city only); final CTA card with mint glow and dual buttons.
- [ ] **Step 5: Commit**
`git commit -m "feat: complete homepage with all 10 required sections and token styles"`

---

### Task 5: The Autopsy Route (`/autopsy`), Gate Form (`gate-form.tsx`), and MDX Autopsy Report

**Files:**
- Create: `app/autopsy/page.tsx`, `components/gate-form.tsx`, `content/autopsy.mdx`

**Interfaces:**
- Consumes: `lib/content.ts`.
- Produces:
  - Form submitting via POST to `https://api.web3forms.com/submit` with hidden fields `access_key`, `subject`, `from_name`.
  - On submit success: Unlocks autopsy PDF download link and private Telegram community link `https://t.me/+UbVnSmaiazlhY2Nk`.
  - Comprehensive MDX autopsy report covering all 7 mandatory sections.

- [ ] **Step 1: Create `content/autopsy.mdx`**
Write detailed, authentic 7-section technical report in first person without moralising: "The setup", "Position sizing", "The missing stops", "The unaudited tooling", "The exact sequence", "What it cost beyond money", "What changed", linking to `/curriculum` and `/bot`.
- [ ] **Step 2: Implement `<GateForm />` with Web3Forms integration**
Include email, WhatsApp number, required $10 confirmation checkbox, hidden inputs, client-side validation, error handling, and animated success state revealing download & Telegram link.
- [ ] **Step 3: Build `app/autopsy/page.tsx`**
Render H1 "₦32M: the full autopsy.", subtitle, Gate Form card, followed by the complete MDX body.
- [ ] **Step 4: Commit**
`git commit -m "feat: build autopsy page, lead capture gate, and full 7-section report"`

---

### Task 6: Curriculum Hub (`/curriculum`) and 10 Module Detail Routes (`/curriculum/[slug]`)

**Files:**
- Create:
  - `app/curriculum/page.tsx`
  - `app/curriculum/[slug]/page.tsx`
  - `content/curriculum/01-the-autopsy-line-by-line.mdx` through `10-auditing-a-losing-month.mdx` (all 10 complete modules)

**Interfaces:**
- Consumes: `lib/content.ts`.
- Produces:
  - Dynamic route with `generateStaticParams()` pre-rendering all 10 modules.
  - Module index with title, one-line outcome, and duration.
  - Module details with 64ch readable MDX container, rust "failure this corrects" callout, and prev/next links.

- [ ] **Step 1: Author all 10 MDX modules in `content/curriculum/`**
Write thorough, high-utility technical content for each module (no placeholder text, no empty states):
  - 01 The autopsy, line by line
  - 02 How synthetic indices are actually generated
  - 03 Risk of ruin and drawdown math
  - 04 Position sizing, from $10 up
  - 05 Why martingale cannot survive a small account
  - 06 Contract mechanics: ticks, duration, spread cost
  - 07 Account segregation: bot account vs manual account
  - 08 Operating the bot: tokens, VPS, kill switch
  - 09 The four failure archetypes
  - 10 Auditing a losing month
- [ ] **Step 2: Build `app/curriculum/page.tsx`**
Render H1 "Ten modules. Free. Built backwards from the failures.", intro copy, and 10 interactive module rows with duration and outcome.
- [ ] **Step 3: Build `app/curriculum/[slug]/page.tsx`**
Implement static generation (`generateStaticParams`), MDX renderer, rust callout box ("failure this corrects"), navigation bar with prev/next module links, and Course JSON-LD schema.
- [ ] **Step 4: Verify slug routing and 404 handling**
Confirm valid slugs render cleanly and invalid slugs call `notFound()`.
- [ ] **Step 5: Commit**
`git commit -m "feat: build curriculum index and all ten detailed module routes"`

---

### Task 7: Bot Route (`/bot`) — The Enforcer Specification and Guide

**Files:**
- Create: `app/bot/page.tsx`, `public/images/bot-dashboard.png`

**Interfaces:**
- Consumes: `<Nav />`, `<Footer />`, `<SpecCard />`, tokens.

- [ ] **Step 1: Build Header & Rust Caveat Card**
H1 "The Enforcer.", Sub: "Most bots optimise entries. This one optimises survival. Open source, MIT, free.", rust card: "No edge over the market. An edge over you."
- [ ] **Step 2: Build Guardian Spec Card**
Display the exact hard parameters: max stake $0.35 flat · 1.3× ladder capped at 5 steps · daily loss cap $1.00 · 40 trades per session · 15 min cool-off after 3 losses · 20% drawdown stop · $2.00 balance floor · kill switch on disconnect, token error, margin error · 60 min session timer.
- [ ] **Step 3: Build Stake Ladder Comparison Table**
Create 3-row comparative table for Flat stake, 1.3× ladder, and 2× Martingale, showing total risked and survival probability on a $10 account (with rust ✕ on Martingale).
- [ ] **Step 4: Build Step-by-Step Installation & Telegram Commands**
Step-by-step code blocks for Deriv API app registration, read-and-trade scoped token creation, git clone, docker run, YAML configuration, one-command VPS script, and Telegram commands (`/start`, `/stop`, `/pause`, `/status`, `/stats`, `/ladder`).
- [ ] **Step 5: Build "Built for $10" Rationale & GitHub Repository Links**
Explain $0.35 floor (3.5% of $10) and CFD limitation; provide direct links to GitHub repository, README, and releases.
- [ ] **Step 6: Commit**
`git commit -m "feat: implement bot documentation and specification page"`

---

### Task 8: Track Record (`/track-record`) and Milestones (`/milestones`)

**Files:**
- Create: `app/track-record/page.tsx`, `app/milestones/page.tsx`, `components/track-table.tsx`

**Interfaces:**
- Consumes: `lib/track-record.ts`.

- [ ] **Step 1: Build `components/track-table.tsx` & `/track-record` page**
H1 "Track record.", Sub: "Weekly. Red weeks included. Demo before live.", table rendering week, instrument, trades, net ₦ (rust negative, mint positive), max drawdown, and notes, with running total at foot. "How to read this" section explaining demo verification.
- [ ] **Step 2: Build `/milestones` page**
H1 "The $10 ladder.", Sub: "A $10 account dies in about 28 trades at minimum stake. The ladder gets you past that.", 4 rung cards:
  - Rung 1: Fund $10 → first 5 trades logged
  - Rung 2: Reach $50 → preset config
  - Rung 3: Reach $100 → 1-on-1 review
  - Rung 4: Hold $100 for 30 days → operator badge
  Each with unlock perk and honest failure risk note for that capital level.
- [ ] **Step 3: Commit**
`git commit -m "feat: implement track record table and milestones ladder"`

---

### Task 9: Partner (`/partner`), About (`/about`), and Risk Disclosure (`/risk`)

**Files:**
- Create: `app/partner/page.tsx`, `components/partner-form.tsx`, `app/about/page.tsx`, `app/risk/page.tsx`, `public/images/about-portrait.jpg`

**Interfaces:**
- Consumes: Web3Forms API, tokens.

- [ ] **Step 1: Build `/partner` with Application Form**
H1 "Keep 100% of your commission.", Sub: "Deriv pays the override, not you. Ten a month. Free.", Sections: who this is for, what you get, what you commit to; Partner application form POSTing to Web3Forms (`access_key: 87ef4130-07a8-496c-bf8c-f69b2cf77bb6`, `subject=New partner application`, `from_name=SoftPip Partner`); disclosure: "You earn your own commission. I earn 7.5% of it as a Master Partner. It comes from Deriv, not you."
- [ ] **Step 2: Build `/about` with 700-word Narrative**
First-person personal narrative structured in 3 sections: Before, The ₦32M, What survived. Close on why it's free. Portrait placeholder image with mint caption, link to `/curriculum`.
- [ ] **Step 3: Build `/risk` with Verbatim Deriv Warning and 5 Blunt Bullets**
H1 "Risk.", 64ch body container. Verbatim Deriv warning in full, followed by 5 blunt bullets:
  1. Minimum stake is 3.5% of a $10 account.
  2. You can lose the whole $10.
  3. No bot survives every regime.
  4. Commission isn't a recommendation.
  5. Past weeks aren't forecasts.
- [ ] **Step 4: Commit**
`git commit -m "feat: build partner application, about story, and risk disclosure routes"`

---

### Task 10: FAQ (`/faq`), Legal Pages (`/terms`, `/privacy`), and Custom 404 (`not-found.tsx`)

**Files:**
- Create: `app/faq/page.tsx`, `app/terms/page.tsx`, `app/privacy/page.tsx`, `app/not-found.tsx`

**Interfaces:**
- Consumes: `<Accordion />`, tokens.

- [ ] **Step 1: Build `/faq` with 12 Hairline Accordion Entries**
H1 "FAQ.", Hairline accordion containing exact 12 entries:
  1. Is it really free?
  2. Why $10?
  3. What experience is needed?
  4. Is the bot profitable?
  5. Which instrument does it trade?
  6. Can I run it from my phone?
  7. Which VPS is recommended?
  8. Does it work on MT5?
  9. Why must I use your referral link?
  10. What if I already have a Deriv account?
  11. Do you take a cut of my profits?
  12. What's the catch?
- [ ] **Step 2: Build `/terms` and `/privacy`**
Clean 64ch legal pages tailored to educational software, risk limitations, and privacy principles.
- [ ] **Step 3: Build `app/not-found.tsx`**
Sleek dark 404 page: "Nothing here." with mint link back to home `/`.
- [ ] **Step 4: Commit**
`git commit -m "feat: implement FAQ accordion, legal pages, and custom 404"`

---

### Task 11: SEO Metadata, OpenGraph Generator, and Static Assets

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `public/images/*`

**Interfaces:**
- Produces:
  - Dynamically generated XML sitemap indexing all 16 routes.
  - Standard `robots.txt` granting search crawler access.
  - Dynamic Edge OG image generator via `@vercel/og` with dark void background and mint accents.
  - Placeholder graphics for icons and previews.

- [ ] **Step 1: Implement `app/sitemap.ts` and `app/robots.ts`**
Enumerate all 16 static and dynamic routes (`/`, `/autopsy`, `/curriculum`, 10 module slugs, `/bot`, `/track-record`, `/milestones`, `/partner`, `/about`, `/risk`, `/faq`, `/terms`, `/privacy`).
- [ ] **Step 2: Implement OpenGraph image generator using `next/og`**
Create dynamic 1200x630 OG image generator with Geist typography, dark background, and mint badge.
- [ ] **Step 3: Create local asset placeholders in `public/images/`**
Generate valid placeholder image files: `icon-512.png`, `hero-glow.png`, `about-portrait.jpg`, `bot-dashboard.png`, `og-default.png` with slate fill and 1px mint cross.
- [ ] **Step 4: Commit**
`git commit -m "feat: add sitemap, robots.txt, dynamic OpenGraph image, and visual assets"`

---

### Task 12: Root Repository Files (`README.md`, `LICENSE`, `config.example.yaml`, `governor.py`)

**Files:**
- Create: `README.md`, `LICENSE`, `config.example.yaml`, `governor.py`, `tests/governor_test.py`

**Interfaces:**
- Produces:
  - Standalone risk governor module with `RiskGovernor` class:
    - `can_trade(current_balance: float, consecutive_losses: int, daily_loss: float, session_trades: int, session_duration_minutes: float) -> tuple[bool, str, float]`
    - Enforces: flat stake $0.35, daily loss cap $1.00, 40 trades/session, 15 min cool-off after 3 losses, 20% drawdown stop, $2.00 balance floor, 60 min session timer.
  - Unit test suite verifying risk rules.
  - `config.example.yaml` with documented configuration.
  - `README.md` with full project explanation and setup steps.
  - `LICENSE` (MIT, Oghenerioborue Harrison Ekuetafia, 2026).

- [ ] **Step 1: Write unit tests in `tests/governor_test.py`**
Test each hard rule: stake calculation, daily loss limit breach, trade count cutoff, cool-off trigger, balance floor stop, and session timeout.
- [ ] **Step 2: Run test to verify failure**
Run `python tests/governor_test.py` (fails because `governor.py` is not yet created).
- [ ] **Step 3: Implement `governor.py`**
Implement production-grade risk governor class with clear status codes and safe defaults.
- [ ] **Step 4: Run test to verify passing**
Run `python tests/governor_test.py` confirming 100% test pass.
- [ ] **Step 5: Write `config.example.yaml`, `README.md`, and `LICENSE`**
Document the "$0.35 floor vs $10.85 martingale problem", "No edge over the market. An edge over you.", defaults table, setup guide, and MIT license.
- [ ] **Step 6: Commit**
`git commit -m "feat: implement risk governor, test suite, and open source repo files"`

---

### Task 13: Full Build Verification, Cross-Device Viewport Check, and Section 15 Acceptance Audit

**Files:**
- Verify: All repository and application files across the project.

**Interfaces:**
- Verifies:
  - Clean TypeScript build: `npx.cmd tsc --noEmit`
  - Production Next.js build: `npm.cmd run build`
  - Zero `any` types.
  - All 16 routes accessible and linked.
  - Verbatim risk warnings present across routes.
  - Every Deriv referral link contains `rel="sponsored noopener" target="_blank"`.
  - Zero horizontal scroll at 320px width.

- [ ] **Step 1: Run TypeScript compiler check**
Execute `npx.cmd tsc --noEmit` and ensure zero errors.
- [ ] **Step 2: Run Next.js production build**
Execute `npm.cmd run build` and ensure all static pages and dynamic routes generate successfully.
- [ ] **Step 3: Run Section 15 acceptance checklist script**
Run automated script validating all 16 routes, link attributes, form keys, and token consistency.
- [ ] **Step 4: Responsive viewport verification**
Verify page rendering at 1440px, 768px, 390px, and 320px viewport widths.
- [ ] **Step 5: Final commit**
`git commit -m "chore: complete acceptance verification and quality audit"`

---

## Plan Review & Handoff

Plan complete and saved to `C:\Users\harry\.gemini\antigravity\scratch\softpip\docs\superpowers\plans\2026-11-23-softpip-build.md`.
