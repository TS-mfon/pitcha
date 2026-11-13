# Pitcha Design System: Afro-Tech Builder Workbench

**Version:** 1.0.0  
**Target:** Pitcha Web App (Hackathon & Startup Pitch Accelerator)  
**Tone & Philosophy:** Confident, electric, energetic, street-smart & investor-sharp. Crafted specifically for African builders and Nigerian tech founders. Not a sterile corporate SaaS template.

---

## 1. Visual Direction & Personality

Pitcha is designed as a **high-voltage command center** for late-night hackathon sprints and real-world pitch prep. 

### Core Design Pillars
1. **Afro-Tech Electric Energy:** Deep obsidian foundations paired with high-contrast, pulsating neon accents (Naira Emerald, Solar Gold, Electric Indigo). It channels the relentless hustle of Lagos tech hubs (Yaba, Computer Village) and Pan-African innovation corridors.
2. **Brutal Honesty & Tactile Feedback:** Zero ambiguity. High scores glow with emerald triumph; fatal flaws and weak pitches trigger immediate crimson alert states. Micro-copy and visual markers are punchy, direct, and unvarnished.
3. **Stage-Ready Legibility:** Engineered to be readable at a glance from across a hackathon table, on a dimmed laptop screen at 3:00 AM, or on low-end mobile devices under bright sunlight.
4. **Accessible Performance:** Lightweight CSS tokens, buttery smooth CSS transitions, crisp borders, and zero heavy dependencies.

---

## 2. Color Palette & Token System

The primary experience is dark mode (the builder's native habitat), supported by a high-contrast daylight mode.

### 2.1 Base Neutrals

| Token Name | Dark Mode (Primary) | Light Mode (High Contrast) | Usage |
| :--- | :--- | :--- | :--- |
| `bg-canvas` | `#080C14` | `#F8FAFC` | App root background |
| `bg-surface` | `#0F172A` | `#FFFFFF` | Primary cards, panels, inputs |
| `bg-surface-elevated` | `#1E293B` | `#F1F5F9` | Hover states, modals, floating popups |
| `border-subtle` | `#1E293B` | `#E2E8F0` | Subtle dividers, card outlines |
| `border-default` | `#334155` | `#CBD5E1` | Standard card borders, inactive inputs |
| `border-highlight` | `#475569` | `#94A3B8` | Focused components, prominent outlines |
| `text-primary` | `#F8FAFC` | `#0F172A` | Main headings, primary content |
| `text-secondary` | `#94A3B8` | `#475569` | Subheadings, descriptions, body text |
| `text-muted` | `#64748B` | `#94A3B8` | Placeholders, timestamps, microcopy |

### 2.2 Brand & Energy Accents

| Token | Hex Value | RGB Channels | Meaning / Application |
| :--- | :--- | :--- | :--- |
| `brand-emerald` | `#10B981` | `16, 185, 129` | Naira prosperity, successful pitch, high validation |
| `brand-gold` | `#F59E0B` | `245, 158, 11` | African sun, builder energy, warnings, Pro highlights |
| `brand-indigo` | `#6366F1` | `99, 102, 241` | Electric tech co-founder, primary CTAs |
| `brand-coral` | `#EF4444` | `239, 68, 68` | Brutal weakness, fatal flaw, low score |

### 2.3 Semantic Score Colors

Used across the Problem Score meter, slide rating, and judge verdicts:

| Score Bracket | Range | Background (Dark) | Border | Text | Badge Style | Verdict Stamp |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Low (Danger)** | 0 - 4 | `#450A0A` (900) | `#DC2626` (600) | `#FCA5A5` (300) | `bg-red-950/80 text-red-400 border-red-500/40` | **FATAL GAPS / PIVOT** |
| **Medium (Warning)** | 5 - 7 | `#451A03` (900) | `#D97706` (600) | `#FCD34D` (300) | `bg-amber-950/80 text-amber-400 border-amber-500/40` | **PROMISING / UNREFINED**|
| **High (Success)** | 8 - 10 | `#022C22` (900) | `#059669` (600) | `#6EE7B7` (300) | `bg-emerald-950/80 text-emerald-400 border-emerald-500/40`| **INVESTABLE / WINNER** |

### 2.4 State Colors

- **Locked / Gated:** Frosted obsidian backdrop with violet/amber shimmer:
  - Background: `rgba(15, 23, 42, 0.85)`
  - Backdrop Blur: `backdrop-blur-md`
  - Accent: `#818CF8` (Indigo 400) + `#C084FC` (Purple 400)
- **Success State:** `#10B981` with radiant drop shadow `0 0 20px rgba(16, 185, 129, 0.35)`
- **Loading / Skeleton State:** Subtle pulse gradient from `#1E293B` to `#334155`

---

## 3. Typography

The type scale combines **Geist Sans** (clean, modern, highly legible at small sizes) with **Geist Mono** (for numeric metrics, countdown timers, currency calculations, and code snippets).

### 3.1 Font Families
- **Heading & UI:** `var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Data & Numbers:** `var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### 3.2 Type Hierarchy Scale

| Role | Class / Size | Tracking | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Metric** | `text-6xl sm:text-7xl` (60–72px) | `-0.04em` | `font-black` (900) | `1` | Big Problem Score (e.g. `8.5`) |
| **Display H1** | `text-4xl sm:text-5xl` (36–48px) | `-0.03em` | `font-extrabold` (800) | `1.15` | Landing Hero Headline |
| **Section H2** | `text-2xl sm:text-3xl` (24–30px) | `-0.025em` | `font-bold` (700) | `1.25` | Section titles ("Idea X-Ray", "AI Judges") |
| **Card H3** | `text-xl` (20px) | `-0.02em` | `font-bold` (700) | `1.3` | Card headers, judge names |
| **Subhead H4** | `text-lg` (18px) | `-0.01em` | `font-semibold` (600) | `1.4` | Slide titles, question titles |
| **Body Large** | `text-base` (16px) | `0` | `font-normal` (400) | `1.6` | Hero lead paragraph, pitch script body |
| **Body Standard**| `text-sm` (14px) | `0` | `font-normal` (400) | `1.5` | Feedback text, bullet points, judge analysis |
| **Microcopy / Tag**| `text-xs` (12px) | `+0.02em` | `font-medium` (500) | `1.4` | Character counter, badges, timestamps |

---

## 4. Spacing, Radius, Shadow & Motion

### 4.1 Spacing Scale (4px Base Grid)
- `space-1` = 4px (tight badge padding)
- `space-2` = 8px (gap between icon and label)
- `space-3` = 12px (form input internal vertical padding)
- `space-4` = 16px (card body padding on mobile)
- `space-6` = 24px (standard desktop card padding, component gaps)
- `space-8` = 32px (section inner margins)
- `space-12` = 48px (major section spacing)
- `space-16` = 64px (hero spacing)

### 4.2 Border Radius
- `radius-sm` (`rounded-lg` / 8px): Small badges, code pills, mini buttons
- `radius-md` (`rounded-xl` / 12px): Interactive buttons, text inputs, dropdowns
- `radius-lg` (`rounded-2xl` / 16px): Main result cards, judge cards, modal dialogue
- `radius-xl` (`rounded-3xl` / 24px): Outer container wraps, hero feature panels
- `radius-pill` (`rounded-full` / 9999px): Status badges, score tags, judge avatars

### 4.3 Shadows & Radiant Glows
```css
/* Standard surface elevation */
--shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
--shadow-elevated: 0 10px 30px -5px rgba(0, 0, 0, 0.7);

/* Radiant State Glows */
--glow-emerald: 0 0 25px -4px rgba(16, 185, 129, 0.45);
--glow-amber: 0 0 25px -4px rgba(245, 158, 11, 0.45);
--glow-coral: 0 0 25px -4px rgba(239, 68, 68, 0.45);
--glow-indigo: 0 0 30px -4px rgba(99, 102, 241, 0.45);
```

### 4.4 Motion Rules
- **Tactile Click:** `transition-transform duration-150 active:scale-[0.98]`
- **Card Hover:** `transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg`
- **Dynamic Accordion / Drawer:** `transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)`
- **Skeleton Pulse:** 1.8s smooth breathing cycle `ease-in-out infinite`

---

## 5. Component Specifications

### 5.1 Buttons

#### Primary Afro-CTA ("Tear My Idea Apart", "Unlock Pro")
- **Background:** Gradient `linear-gradient(135deg, #10B981 0%, #059669 100%)` (or Electric Indigo `linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)`)
- **Text:** White, `font-bold text-sm tracking-tight`
- **Hover:** Brightness boost, `shadow-glow-emerald`, subtle scale
- **Active:** `scale-[0.98]`
- **Height / Padding:** Desktop `h-12 px-6`, Mobile `h-11 px-5`

#### Secondary / Ghost ("Practice Pitch", "Copy Script")
- **Background:** `bg-slate-900/90` with border `border-slate-700`
- **Text:** `text-slate-200 hover:text-white`
- **Hover:** `bg-slate-800 border-slate-600`

#### Disabled / Loading Button
- **State:** `opacity-60 cursor-not-allowed pointer-events-none`
- **Icon:** Embedded spinning SVG indicator with `animate-spin`

---

### 5.2 Idea Input Box

- **Type:** Multi-line expandable `textarea`
- **Container:** `bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-inner`
- **Focus:** `focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20`
- **Min Height:** 120px (comfortably holds a 2-3 sentence pitch premise)
- **Live Counter & Validation Indicator:**
  - Below 10 characters: Text turns `#EF4444` (`"At least 10 characters needed to evaluate"`)
  - 10+ characters: Text turns `#10B981` (`"Ready for X-Ray"`) with a checkmark badge
- **Quick-Prompt Pills:** 3 clickable African market prompts below the box (e.g., *"AI inventory for Balogun market"*, *"Solar cold chain pay-as-you-go"*, *"Fintech for motorcycle taxi riders"*)

---

### 5.3 Big Problem Score Display

- **Placement:** Front and center of the Idea X-Ray analysis.
- **Layout:** Circular gauge or high-impact score box featuring:
  1. **Score Number:** `font-mono font-black text-6xl text-white` (e.g. `8/10`)
  2. **Verbal Verdict Pill:** Dynamic badge based on score tier:
     - `0–4`: `bg-red-500/20 text-red-400 border-red-500/30` -> `"HIGH EXECUTION RISK"`
     - `5–7`: `bg-amber-500/20 text-amber-400 border-amber-500/30` -> `"SURVIVABLE, NEEDS WORK"`
     - `8–10`: `bg-emerald-500/20 text-emerald-400 border-emerald-500/30` -> `"INVESTABLE HACKATHON TIER"`
  3. **Visual Meter Bar:** Animated progress track with glowing gradient indicator matching the score tier.

---

### 5.4 Result Cards (Idea X-Ray)

Each section of the analysis is encased in a distinct visual card:
1. **Market Size & Local Context:**
   - Dark slate card, highlighted TAM in Naira (`₦`) and USD (`$`), target audience scale.
2. **Competitors & Gaps:**
   - 2-column or list cards highlighting Competitor Name vs **Where They Drop The Ball** (the unfair founder advantage).
3. **Fatal Flaw / Weakness:**
   - Crimson-bordered alert card (`border-red-500/40 bg-red-950/20`), skull or warning hazard badge, brutal feedback text.
4. **Concrete Pivot / Suggestion:**
   - Emerald-bordered innovation card (`border-emerald-500/40 bg-emerald-950/20`), lightbulb badge, clear tactical action.
5. **60-Second Pitch Script (Teleprompter):**
   - Teleprompter-style card with a monospace read-time badge (`~60 sec | 145 words`), "Copy to Clipboard" button, and spoken-word cadence styling.
6. **10-Slide Deck Outline:**
   - Sequential numbered grid (1 to 10) with clean slide tags (Problem, Solution, Market, Product, Demo, Business Model, Competition, Team, Roadmap, Ask), expandable bullet points.

---

### 5.5 Judge Cards (Distinct Visual Identities)

The 3 AI judges have dedicated visual personas reflecting their evaluation angles:

#### 1. Ada — Strict Technical Judge
- **Color Accent:** Cyber Cyan (`#06B6D4` / Tailwind `cyan-500`)
- **Badge:** `TECH ARCHITECTURE & SECURITY`
- **Avatar Styling:** Hexagonal neon badge with microchip icon ⚡
- **Aesthetic:** Dark terminal motif, monospace accents, rigorous questions on offline mode, 2G connectivity, server scalability, and data privacy.
- **Tone:** Uncompromising, analytical, code-first.

#### 2. Tunde — Business & Unit Economics Judge
- **Color Accent:** Solar Gold / Amber (`#F59E0B` / Tailwind `amber-500`)
- **Badge:** `REVENUE & LOCAL UNIT ECONOMICS`
- **Avatar Styling:** Rounded square badge with Naira currency graph icon 💼
- **Aesthetic:** High-roller boardroom contrast, bold numbers, ruthless questioning on margins, CAC, collection friction, and Naira devaluation resilience.
- **Tone:** Street-smart, fast-talking, commercial realist.

#### 3. Sarah — Product & Grassroots Usability Judge
- **Color Accent:** Vibrant Magenta / Coral Pink (`#EC4899` / Tailwind `pink-500`)
- **Badge:** `PRODUCT DESIGN & MARKET USABILITY`
- **Avatar Styling:** Smooth rounded pill badge with user empathy icon 🎯
- **Aesthetic:** Human-centered, warm undertones, probing whether non-tech everyday users (like a busy market vendor or student) can navigate without a tutorial.
- **Tone:** Empathetic yet fiercely protective of end users.

---

### 5.6 Score Gauge

- **Type:** Semicircular arc or segmented 10-bar meter.
- **Visual:** Inactive bars in dark slate (`#1E293B`), active bars filled with dynamic score color (Red -> Amber -> Emerald) with glowing head-marker.
- **Interactivity:** Smooth ease-out fill animation on initial load (0.8s transition).

---

### 5.7 Locked & Blurred Overlay (Polar Paywall)

- **Application:** Gating Pro features (Full 3-judge round, 10-slide investor deck download, stage demo script).
- **Styling:**
  - `backdrop-blur-md bg-slate-950/80` absolute overlay covering locked content.
  - Centered Lock Card: `border border-indigo-500/40 bg-slate-900/95 p-6 rounded-2xl shadow-2xl max-w-md text-center`.
  - Icon: Glowing golden/purple lock badge.
  - Copy: *"Unlock Full Investor Deck, Stage Demo Script & 3 AI Judges"*.
  - Badge: *"Polar Sandbox Enabled — Instant Demo Access"*.
  - Action: High-contrast primary CTA button triggering Polar checkout.

---

### 5.8 Pricing Cards (Free vs Pro vs Team)

A 3-tier card layout tailored for hackathons:

1. **Free Tier ("Starter Builder"):**
   - Border: `border-slate-800`
   - Price: `₦0 / Free Forever`
   - Features: Basic Idea X-Ray, 1 Judge Question, Pitch snippet.
   - Button: `Ghost Button` ("Current Plan").
2. **Pro Tier ("Hackathon Winner" - FEATURED):**
   - Border: Glowing multi-stop gradient border (`emerald-500` to `indigo-500`)
   - Badge: `POPULAR FOR HACKATHONS` in solar amber.
   - Price: One-time payment badge via Polar (e.g. `$5` or `₦5,000` test sandbox).
   - Features: All 3 Judges with score analysis, 10-Slide Deck Outline, jsPDF export, second-by-second demo script.
   - Button: High-voltage `Emerald Afro-CTA` ("Unlock Pro Now").
3. **Team Tier ("Incubator & Campus Club"):**
   - Border: `border-slate-800/60 border-dashed`
   - Badge: `COMING SOON`
   - Price: Contact for campus hub bulk access.
   - Disabled appearance with muted typography.

---

### 5.9 Timeline for Stage Demo Script

- **Format:** Vertical milestone timeline representing a 60-to-180 second pitch presentation.
- **Elements:**
  - **Left Rail:** Glowing vertical line (`bg-slate-800` with active emerald milestones).
  - **Timestamp Bead:** Monospace pill (`00:00 - 00:15`, `00:15 - 00:45`, etc.).
  - **Presenter Cue Tag:** Small colored tags indicating actions (`[SCREEN SHARE]`, `[HOLD UP PHONE]`, `[REACTION PAUSE]`, `[THE ASK]`).
  - **Spoken Line Box:** High-contrast text box with exact founder speech and speaker tone directions.

---

### 5.10 Loading Skeletons

- **Theme:** Dark slate shimmering blocks mimicking final component layout.
- **Key Silhouettes:**
  - Score Gauge skeleton: circular shimmer with centered score placeholder.
  - Judge Question skeleton: avatar circle + 2 lines of animated text.
  - Slide Cards skeleton: 10-grid cards with title and bullet pulse blocks.
- **CSS Animation:** `shimmer` animation moving from `bg-slate-900` through `bg-slate-800` smoothly.

---

### 5.11 Error Toasts

- **Position:** Fixed top-right on desktop (`top-6 right-6`), top-center on mobile (`top-4 inset-x-4`).
- **Styling:** `bg-slate-900/95 border border-red-500/50 shadow-2xl rounded-xl p-4 flex items-start gap-3 z-50 text-slate-100`.
- **Icon:** Red alert exclamation icon in glowing circle.
- **Action:** Clear error message with an optional "Try Again" inline link or dismiss cross button.

---

## 6. Accessibility & Inclusivity Rules

1. **Color Contrast (WCAG AA Standard):**
   - All body copy achieves minimum **4.5:1** contrast ratio against its card surface.
   - Large headings, badges, and score indicators maintain at least **3.0:1** contrast.
2. **Focus States:**
   - Every interactive control (button, link, textarea, tab) has a dedicated `focus-visible` ring:
     `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`.
3. **Touch Targets:**
   - Every clickable target on mobile is at least **44 × 44px** (including copy buttons, tabs, judge selectors, and CTA buttons).
4. **Reduced Motion:**
   - All transitions, pulses, and spinning animations respect `@media (prefers-reduced-motion: reduce)` by falling back to immediate static states.

---

## 7. Mobile-First Breakpoints

| Breakpoint | Width | Typical Target Device in African Context |
| :--- | :--- | :--- |
| `xs` | `375px` | Compact Android smartphones (Tecno, Infinix, itel) |
| `sm` | `640px` | Modern phablets & large smartphones |
| `md` | `768px` | Tablets & iPads |
| `lg` | `1024px` | Laptops & Hackathon workstations |
| `xl` | `1280px` | External monitors & desktop displays |
| `2xl`| `1536px` | Ultra-wide presentations |

---

## 8. Summary of Design Tokens for Tailwind CSS

```json
{
  "colors": {
    "pitcha-bg": "#080C14",
    "pitcha-surface": "#0F172A",
    "pitcha-elevated": "#1E293B",
    "pitcha-border": "#334155",
    "pitcha-border-subtle": "#1E293B",
    "pitcha-border-highlight": "#475569",
    "pitcha-emerald": "#10B981",
    "pitcha-gold": "#F59E0B",
    "pitcha-indigo": "#6366F1",
    "pitcha-coral": "#EF4444",
    "judge-ada": "#06B6D4",
    "judge-tunde": "#F59E0B",
    "judge-sarah": "#EC4899"
  }
}
```
