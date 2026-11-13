import { generateJSON } from "@/lib/gemini";
import { getJudge } from "@/lib/judges";

// POST /api/judge/question
// Generates a targeted question from a specific judge (Ada, Tunde, Sarah) for an idea.
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

    const { idea, judge } = body || {};

    // 2. Validate idea: reject if missing or under 10 characters
    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return Response.json(
        { error: "Idea must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 3. Validate judge: must be one of the known judges ("ada", "tunde", "sarah")
    const judgeConfig = getJudge(judge);
    if (!judgeConfig) {
      return Response.json(
        { error: "Invalid judge. Must be one of: ada, tunde, sarah." },
        { status: 400 }
      );
    }

    // 4. Check that GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 5. Construct prompt for Gemini
    const prompt = `
Startup Idea:
"${idea.trim()}"

As ${judgeConfig.name} (${judgeConfig.role}), ask the founder ONE tough, direct, specific question challenging their idea.
Requirements:
- The question must be 1 to 2 sentences maximum.
- Be specific to this startup idea (do NOT ask a generic question).
- Speak directly to the founder in your authentic judging voice.

Return ONLY a JSON object with this exact shape:
{
  "question": "Your 1-2 sentence question here"
}
`;

    // 6. Call Gemini using the shared helper with the judge's persona
    const result = await generateJSON(prompt, judgeConfig.systemInstruction);

    // 7. Return the question
    return Response.json(
      {
        question: result?.question || "Can you explain how this idea works in practice?",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to generate question" },
      { status: 500 }
    );
  }
}
