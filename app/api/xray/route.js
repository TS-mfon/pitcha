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

    // 3. Check for API key before calling Gemini
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // System instruction tailored to the target market
    const systemInstruction = `
You are a brutally honest startup analyst and venture partner evaluating tech pitches in ${market.name} (${market.currency}).
Context & Realities: ${market.context}.
Lens: ${market.judgeLens}
Be direct, insightful, and constructively critical.
`;

    // 4. Construct prompt requiring the exact output JSON structure
    const prompt = `
Analyze the following startup/hackathon idea with brutal honesty for the ${market.name} market (${market.currency}).

Startup Idea:
"${idea.trim()}"

Return ONLY a JSON object with this exact shape:
{
  "problemScore": 7, // integer or number between 0 and 10 scoring how painful and urgent the problem is
  "marketSize": "Realistic market size estimate in ${market.currency} and USD with local ${market.name} context",
  "competitors": [
    { "name": "Competitor 1", "gap": "What they miss or where they fail in ${market.name}" },
    { "name": "Competitor 2", "gap": "What they miss or where they fail in ${market.name}" }
  ],
  "weakness": "The single most fatal flaw, execution risk, or blind spot in this idea within ${market.name}",
  "suggestion": "One concrete pivot or tweak to make this idea 10x stronger in ${market.name}",
  "pitchScript": "A punchy, conversational 60-second spoken pitch script with an authentic ${market.name} hook",
  "slideOutline": [
    { "title": "Problem", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Solution", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Market", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Product", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Demo", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Business Model", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Competition", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Team", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Roadmap", "bullets": ["Bullet 1", "Bullet 2"] },
    { "title": "Ask", "bullets": ["Bullet 1", "Bullet 2"] }
  ]
}

CRITICAL RULES:
- "slideOutline" MUST contain EXACTLY 10 slides in the order shown: Problem, Solution, Market, Product, Demo, Business Model, Competition, Team, Roadmap, Ask.
- Each slide must have 2 to 3 concise bullet points.
- "problemScore" must be a number from 0 to 10.
`;

    // 5. Call Gemini using shared helper
    const analysis = await generateJSON(prompt, systemInstruction);

    // 6. Return parsed analysis
    return Response.json(analysis, { status: 200 });
  } catch (error) {
    // Return error message and 500 status
    return Response.json(
      { error: error.message || "Failed to analyze idea" },
      { status: 500 }
    );
  }
}
