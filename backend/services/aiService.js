import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function generateAIData(title, description) {
  try {
    const prompt = `
You are an AI product classification system.

Analyze the product:

Title: ${title}
Description: ${description}

Strictly return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanations.

Return this format:

{
  "primaryCategory": "",
  "subCategory": "",
  "seoTags": [],
  "sustainabilityFilters": []
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You generate structured JSON for product metadata. Always return valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    // Remove possible markdown wrappers
    const cleaned = content.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    throw new Error("Failed to generate AI data");
  }
}