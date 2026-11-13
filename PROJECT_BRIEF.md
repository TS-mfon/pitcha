# PROJECT BRIEF: Pitcha

## 1. What we are building
Pitcha is a web app that helps hackathon builders and startup founders sharpen their idea and practice their pitch. A user types a startup or hackathon idea. Pitcha then:
1. Tears the idea apart honestly (Idea X-Ray).
2. Lets the user face three AI judges who ask hard questions and score the answers (AI Judge Simulator).
3. Writes a 60-second pitch script and a 10-slide outline.
4. Writes a second-by-second stage demo script.
Free users get a limited taste. A one-time Polar payment (Pro) unlocks everything.

Tagline: "Your AI co-founder, AI judge and AI salesman in one."
Audience: African student and startup builders, with a Nigeria-first tone (Naira, local market examples). The app UI is in English.

## 2. Context
- Built for a hackathon (Polar payments track). The build window is about 3 hours, so working beats fancy.
- A flawless live demo matters most. Keep the flow simple and robust.
- Payments run in the Polar SANDBOX only. No real money moves.

## 3. Tech stack
- Next.js (App Router), JavaScript only (no TypeScript), Tailwind CSS
- Gemini API via @google/generative-ai, model gemini-2.5-flash, JSON output mode
- Polar via @polar-sh/sdk, with server: "sandbox"
- jspdf for the deck PDF, generated in the browser
- No database. Pro status and the last result live in localStorage (demo-level; a database is the production plan).
- Deployment: Vercel

## 4. Environment variables (.env.local, never committed)
GEMINI_API_KEY=
POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
Secrets are used only inside API routes, never in client code. If one is missing, show a clear error.

## 5. Developer environment (important)
The developer is on Windows and uses Command Prompt (CMD) only. Give CMD-compatible commands, never PowerShell or bash syntax. The developer is a JavaScript beginner: keep code simple, readable, and commented briefly. Prefer small files and plain functions over clever abstractions.

## 6. Features

### 6.1 Idea X-Ray (POST /api/xray)
Input: { idea }. Reject ideas under 10 characters.
Output JSON:
{
  "problemScore": 0-10,
  "marketSize": "string",
  "competitors": [{ "name": "", "gap": "" }],
  "weakness": "string",
  "suggestion": "string",
  "pitchScript": "60-second pitch script",
  "slideOutline": [{ "title": "", "bullets": ["", ""] }]
}
slideOutline has exactly 10 slides: Problem, Solution, Market, Product, Demo, Business Model, Competition, Team, Roadmap, Ask.
Persona: a brutally honest startup analyst with an African market focus.

### 6.2 AI Judge Simulator (the headline feature)
Three judges:
- Ada: strict technical judge. Architecture, security, feasibility.
- Tunde: business judge. Revenue, first customers, unit economics in Nigeria.
- Sarah: design judge. Usability for a non-technical user such as a market woman.
POST /api/judge/question takes { idea, judge: "ada" | "tunde" | "sarah" } and returns { question }. One or two sentences, specific to the idea, in the judge's voice.
POST /api/judge/score takes { idea, judge, question, answer }

and returns { score, feedback, betterAnswer }.
- score: 0-100 based on realism, depth, and solving the judge's objection.
- feedback: 1-3 sentences of honest, constructive feedback in authentic judge persona.
- betterAnswer: 1-2 sentences showing what a world-class, punchy answer looks like.

### 6.3 60-Second Pitch & 10-Slide Deck
- 60-second spoken pitch script with word count and teleprompter cadence.
- 10-slide outline structured for investor hackathons.
- Client-side PDF generation via jspdf.

### 6.4 Second-by-Second Stage Demo Script
- Vertical timeline with exact presentation timestamps (e.g. 00:00 - 00:15, 00:15 - 00:45).
- Stage presenter cues ([SCREEN SHARE], [HOLD UP PHONE], [REACTION PAUSE], [THE ASK]).

## 7. Monetization with Polar (Sandbox)
- Track: Polar Payments Hackathon Track.
- Polar SDK (@polar-sh/sdk) configured with server: "sandbox".
- Secrets stay strictly on the server: POLAR_ACCESS_TOKEN, POLAR_PRODUCT_ID, POLAR_WEBHOOK_SECRET.
- Endpoints:
  - POST /api/checkout: creates a sandbox checkout session for POLAR_PRODUCT_ID with successUrl `${NEXT_PUBLIC_APP_URL}/success?checkout_id={CHECKOUT_ID}`. Returns { url }.
  - GET /api/verify?checkout_id=...: retrieves checkout session from Polar and returns { paid: true } strictly if status === "succeeded".
- Free Tier vs Pro Tier:
  - Free: basic Idea X-Ray, 1 judge question.
  - Pro (one-time payment): unlocks all 3 AI judges, 10-slide PDF download, second-by-second demo script.
  - Client state lives in localStorage (`pitcha_is_pro`), unlocked only upon verified payment. Cancelled payments must NEVER unlock Pro.

## 8. Pages and UI Architecture
- Visual identity: Afro-Tech Builder Workbench (high contrast, energetic, obsidian canvas, Naira Emerald, Solar Gold, Electric Indigo).
- Pages:
  - `/`: Main interactive workbench (Idea input, Idea X-Ray results, Big Problem Score, 3 Judge cards, stage demo timeline, upgrade CTA).
  - `/success`: Payment confirmation & celebration page. Verifies checkout_id with /api/verify before setting isPro=true. If unpaid or cancelled, displays clear failure message without unlocking Pro.

## 9. Error Handling & Resilience
- All secrets stay server-side in API routes. If any required secret is missing, return status 500 with a descriptive JSON error `{ error: "KEY_NAME is not configured in .env.local" }`.
- Input validation: reject ideas under 10 characters with status 400 `{ error: "Idea must be at least 10 characters long." }`.
- Safe JSON handling: strip markdown code fences and retry once if JSON.parse fails.
- Cancelled / Failed payments must never grant access or unlock Pro tier.
