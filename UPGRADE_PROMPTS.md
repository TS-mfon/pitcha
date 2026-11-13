# Pitcha Worldwide Grand Prize Upgrade Prompts

This roadmap breaks down the upgrades needed to transform Pitcha into a worldwide hackathon-winning project. Each prompt is isolated, modular, and verified before proceeding to the next.

---

## Prompt 1: Voice Judge Interrogation Mode
- **Goal**: Make the AI Judge Simulator feel like a real verbal pitch stage.
- **Tasks**:
  1. Add browser-native speech-to-text (`webkitSpeechRecognition` / `SpeechRecognition`) to `JudgeSimulator.js` with a pulsing microphone button and live transcript insertion into the answer textarea.
  2. Add text-to-speech (`window.speechSynthesis`) with audio speaker icons next to judge questions and critiques so users can hear Ada, Tunde, and Sarah "speak" their feedback.
  3. Include graceful fallback badges if microphone or audio is unavailable or denied.
- **Status**: ✅ Completed & Verified

---

## Prompt 2: In-Browser Slide Deck Presenter (Live Deck Mode)
- **Goal**: Allow founders to present their 10-slide deck live on stage directly from Pitcha without PowerPoint.
- **Tasks**:
  1. Build `components/DeckPresenter.js` with full-screen presentation mode, slide carousel, and keyboard controls (`←`, `→`, `Escape`).
  2. Include a collapsible "Speaker Notes" drawer showing the slide's pitch talking points.
  3. Add a "Present Deck" button to `XRayResults.js` next to "Download Deck PDF".
- **Status**: ✅ Completed & Verified

---

## Prompt 3: 60-Second Auto-Scrolling Teleprompter
- **Goal**: Help founders rehearse and nail their 60-second spoken pitch with exact pacing.
- **Tasks**:
  1. Build `components/TeleprompterModal.js` featuring large high-contrast text, a circular 60-second countdown timer, and smooth auto-scrolling.
  2. Add speed controls (Slow 110 WPM, Normal 130 WPM, Fast 160 WPM).
  3. Add an audio voice recorder (MediaRecorder API) so founders can record, replay, and critique their spoken delivery.
- **Status**: ✅ Completed & Verified

---

## Prompt 4: Multi-Market & Ecosystem Selector
- **Goal**: Expand Pitcha's market intelligence beyond Nigeria to global hackathon judges.
- **Tasks**:
  1. Add an interactive Market Selector pill group in `IdeaInput.js`:
     - 🇳🇬 Nigeria (Naira ₦, USSD, informal retail, FX volatility)
     - 🇰🇪 Kenya (KES, M-Pesa, mobile-first logistics)
     - 🇮🇳 India (INR ₹, UPI ecosystem, tier-2 vernacular)
     - 🌎 Global / Silicon Valley (USD $, YC standard, SaaS metrics)
  2. Update API routes (`/api/xray`, `/api/judge/question`, `/api/judge/score`, `/api/demo-script`) to receive `market` and adapt system prompts, currencies, and judge questions accordingly.
- **Status**: ⏳ In Progress

---

## Prompt 5: Viral "Roast My Idea" Social Share Card
- **Goal**: Drive organic hackathon viral distribution.
- **Tasks**:
  1. Build `components/RoastCardModal.js` rendering an Afro-Tech social card with the startup name, Problem Score gauge, brutal judge quote, and fatal flaw.
  2. Export the card as a downloadable PNG image via HTML5 Canvas.
  3. Add a "Share to X / Twitter" button with pre-filled viral copy and link.
- **Status**: 📋 Pending

---

## Prompt 6: Polar Ecosystem Depth & Customer Portal
- **Goal**: Showcase comprehensive Polar payments capabilities for the Polar hackathon track.
- **Tasks**:
  1. Add tiered pricing options in `PricingSection.js`: Hackathon Pass ($3) vs Founder Pro ($9) vs Team Bundle ($19).
  2. Add Polar Customer Portal redirect link in `Navbar.js` and `/success`.
  3. Display purchase receipt metadata and order confirmation badges.
- **Status**: 📋 Pending
