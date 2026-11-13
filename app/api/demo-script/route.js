import { generateJSON } from "@/lib/gemini";
import { getMarket } from "@/lib/markets";

export const maxDuration = 60;

export async function POST(request) {
  try {
    // 1. Parse request body safely
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { idea, market: marketId } = body || {};
    const market = getMarket(marketId);

    // 2. Validate idea: reject if missing or under 10 characters
    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return Response.json(
        { error: "Idea must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 3. Verify GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // Persona: Hackathon Pitch Coach & Demo Specialist
    const coachSystemInstruction = `
You are a legendary startup pitch coach and demo day director specialized in ${market.name} (${market.currency}).
You coach founders to win competitive hackathons and demo days (e.g., Polar, YC, Techstars, regional demo competitions).
Market Realities: ${market.context}.
You specialize in high-energy, second-by-second stage choreography that hooks judges immediately and avoids boring slide reading.
`;

    // 4. Construct prompt for second-by-second stage demo script
    const prompt = `
Create a second-by-second, stage-winning live hackathon demo script for this startup idea in the ${market.name} ecosystem (${market.currency}):

Startup Idea:
"${idea.trim()}"

Target: A high-impact 3-minute (180 seconds) live presentation in front of venture capitalists and technical judges. Localize stories, customer examples, and currency to ${market.name}.

Return ONLY a JSON object with this exact shape:
{
  "totalDuration": "180 seconds (3:00 mins)",
  "openingHook": "Punchy 1-sentence opening that grabs attention before slides start",
  "steps": [
    {
      "time": "00:00 - 00:25",
      "cue": "[STAGE ENTRANCE & HOOK]",
      "action": "Walk to center stage, make eye contact with judges, hold hands empty.",
      "speech": "Judges, earlier today in Balogun Market, Mama Ngozi sold ₦200,000 worth of fabrics...",
      "directorNote": "Do not touch the clicker yet. Speak with unhurried conviction."
    },
    {
      "time": "00:25 - 00:55",
      "cue": "[THE BRUTAL PROBLEM]",
      "action": "Point to slide showing real merchant notebook vs formal bank denial letter.",
      "speech": "She tried getting an inventory loan. The bank demanded collateral she doesn't have...",
      "directorNote": "Emphasize the contrast between her real daily cashflow and bank blindness."
    },
    {
      "time": "00:55 - 01:40",
      "cue": "[LIVE PRODUCT DEMO]",
      "action": "Switch to live screen share or hold up phone running the web app.",
      "speech": "Watch this. Mama Ngozi sends a 5-second voice note in Pidgin. Our engine parses it instantly...",
      "directorNote": "Show, don't tell. Let the UI update on screen while you speak."
    },
    {
      "time": "01:40 - 02:20",
      "cue": "[BUSINESS MODEL & TRACTION]",
      "action": "Advance to unit economics slide showing Naira revenue model and pilot numbers.",
      "speech": "We charge a 1.5% origination fee on disbursed credit. With 500 pilot merchants...",
      "directorNote": "Keep numbers crystal clear. No hypothetical trillions, just realistic monthly revenue."
    },
    {
      "time": "02:20 - 02:45",
      "cue": "[DEFENSIVE MOAT & WHY US]",
      "action": "Highlight team experience and market union relationships.",
      "speech": "Why can't OPay or standard banks copy this? Because we own the trust layer...",
      "directorNote": "Project technical and operational defensibility."
    },
    {
      "time": "02:45 - 03:00",
      "cue": "[THE CLOSING ASK]",
      "action": "Direct eye contact with lead judges, display final slide with clear CTA.",
      "speech": "We are seeking strategic introductions to microfinance partners. Join us in unlocking Africa's 40 million merchants. Thank you!",
      "directorNote": "Hold the final pose until applause begins. Do not rush off stage."
    }
  ]
}

CRITICAL RULES:
- Include 5 to 6 distinct timestamped steps covering the full 180 seconds.
- Every step MUST have "time", "cue", "action", "speech", and "directorNote".
- Ground the speech in authentic African / Nigerian tech realities (Naira, local markets, real hustle).
`;

    // 5. Call Gemini
    const result = await generateJSON(prompt, COACH_SYSTEM_INSTRUCTION);

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to generate demo script" },
      { status: 500 }
    );
  }
}
