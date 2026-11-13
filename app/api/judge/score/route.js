import { generateJSON } from "@/lib/gemini";
import { getJudge } from "@/lib/judges";

export const maxDuration = 60;

// POST /api/judge/score
// Scores the founder's answer to a judge's question and provides critique.
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

    const { idea, judge, question, answer } = body || {};

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

    // 4. Validate question: required string
    if (!question || typeof question !== "string" || !question.trim()) {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    // 5. Validate answer: required string
    if (!answer || typeof answer !== "string" || !answer.trim()) {
      return Response.json(
        { error: "Answer is required." },
        { status: 400 }
      );
    }

    // 6. Check that GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 7. Construct prompt for Gemini
    const prompt = `
Startup Idea:
"${idea.trim()}"

Your Question as ${judgeConfig.name} (${judgeConfig.role}):
"${question.trim()}"

Founder's Answer:
"${answer.trim()}"

Evaluate the founder's answer strictly from your perspective as ${judgeConfig.name} (${judgeConfig.role}).
- Score the answer between 0 and 100 based on realism, technical/business/design depth, and how well it solves your concern.
- Provide 1 to 3 sentences of honest, constructive feedback in your authentic voice.
- Provide a "betterAnswer": 1 to 2 sentences demonstrating what a world-class, punchy founder answer to your question looks like.

Return ONLY a JSON object with this exact shape:
{
  "score": 75,
  "feedback": "Your concise critique and feedback here",
  "betterAnswer": "Example of a winning answer that addresses your exact objection"
}
`;

    // 8. Call Gemini using shared helper with judge persona
    const result = await generateJSON(prompt, judgeConfig.systemInstruction);

    // 9. Clamp the score strictly to 0-100 in code, even if the model returns something else
    let rawScore = Number(result?.score);
    if (isNaN(rawScore)) {
      rawScore = 50; // Fallback if model returns non-numeric output
    }
    const clampedScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    // 10. Return scored result
    return Response.json(
      {
        score: clampedScore,
        feedback: result?.feedback || "No feedback provided.",
        betterAnswer: result?.betterAnswer || "Focus on concrete metrics and direct local context."
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to score answer" },
      { status: 500 }
    );
  }
}
