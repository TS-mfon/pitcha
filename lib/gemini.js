import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client using server-side API key only
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in .env.local");
  }
  return new GoogleGenerativeAI(apiKey);
}

// Strip markdown code fences (like ```json ... ```) from Gemini text
function cleanJSONString(text) {
  if (!text) return "";
  let cleaned = text.trim();

  // Remove opening ```json or ```
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  }

  // Remove closing ```
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/\s*```$/, "");
  }

  return cleaned.trim();
}

/**
 * Shared helper to call Gemini in JSON output mode.
 * Hackathon-resilient: strips code fences, parses JSON, and falls back
 * across models if one hits rate limits or temporary high demand.
 *
 * @param {string} prompt - The user prompt
 * @param {string} systemInstruction - Optional persona/system instructions
 * @returns {Promise<object>} Parsed JSON object
 */
export async function generateJSON(prompt, systemInstruction = "") {
  const genAI = getGeminiClient();

  // Model fallback chain: primary fast model with automatic fallback
  const candidateModels = [
    process.env.GEMINI_MODEL || "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-2.5-flash",
  ];

  let lastError = null;

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemInstruction || undefined,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      // Attempt primary request
      let rawText = "";
      try {
        const result = await model.generateContent(prompt);
        rawText = result.response.text();
      } catch (genError) {
        const msg = (genError.message || "").toLowerCase();
        // Fall back if quota exceeded (429), busy (503), or retired (404)
        if (msg.includes("503") || msg.includes("404") || msg.includes("429") || msg.includes("quota")) {
          lastError = genError;
          continue;
        }
        throw genError;
      }

      // Try parsing JSON
      try {
        const cleaned = cleanJSONString(rawText);
        return JSON.parse(cleaned);
      } catch (parseError) {
        // Retry once with an explicit reminder if parsing failed
        const retryPrompt = `${prompt}\n\nCRITICAL: Return ONLY valid, RFC 8259 JSON. Do not wrap in markdown or backticks.`;
        const retryResult = await model.generateContent(retryPrompt);
        const retryCleaned = cleanJSONString(retryResult.response.text());
        return JSON.parse(retryCleaned);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate valid response from Gemini");
}
