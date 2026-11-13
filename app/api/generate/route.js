import { GoogleGenerativeAI } from "@google/generative-ai";

// POST handler for pitch generation or feedback
export async function POST(request) {
  try {
    // 1. Read request body from user
    const { prompt } = await request.json();

    // 2. Validate Gemini API Key (stays strictly server-side)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 3. Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. Generate content
    const result = await model.generateContent(prompt || "Pitch your startup in 2 sentences.");
    const response = await result.response;
    const text = response.text();

    // 5. Send response back to frontend
    return Response.json({ result: text });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to generate pitch" },
      { status: 500 }
    );
  }
}
