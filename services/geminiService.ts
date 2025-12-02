import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// In a real production app, ensure this key is guarded by a backend proxy if strict security is needed,
// or use allow-lists for domains in the Google AI Studio console.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface PromptResult {
  ideas: string[];
}

export const generateContentIdeas = async (
  niche: string,
  platform: string,
  topic: string
): Promise<string[]> => {
  try {
    if (!process.env.API_KEY) {
      // Return mock data if no key is present to prevent app crash during demo
      console.warn("No API Key found. Returning mock data.");
      return [
        `Mock Idea 1 for ${niche}: 5 Mistakes people make with ${topic}.`,
        `Mock Idea 2 for ${niche}: How I mastered ${topic} in 30 days.`,
        `Mock Idea 3 for ${niche}: The secret tool for ${topic} nobody talks about.`
      ];
    }

    const model = 'gemini-2.5-flash';
    const prompt = `
      Act as an expert social media strategist and copywriter.
      Target Audience Niche: ${niche}
      Platform: ${platform}
      Topic: ${topic}

      Generate 3 distinct, high-viral potential content hooks or ideas for this specific scenario.
      Keep them punchy, concise, and ready to use.
      Return the response as a simple JSON array of strings. Do not use Markdown formatting for the JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];

    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed;
    } 
    // Handle case where it might be wrapped in an object like { ideas: [] }
    if (parsed.ideas && Array.isArray(parsed.ideas)) {
      return parsed.ideas;
    }

    return [text];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["Error generating ideas. Please check your API key or try again later."];
  }
};

// --- Chat Bot Integration ---

// Mock Chat class for demo purposes when API key is missing
class MockChat {
  async sendMessage(props: { message: string }) {
    await new Promise(r => setTimeout(r, 1000));
    return {
      text: `[DEMO MODE] I received your message: "${props.message}". Since no API key is configured, I cannot generate a real AI response. In production, I would answer using Gemini 1.5 Pro.`
    };
  }
}

export const createChatSession = () => {
  if (!process.env.API_KEY) {
    console.warn("No API Key found. Using Mock Chat for Chatbot.");
    return new MockChat();
  }

  // Using the requested model gemini-3-pro-preview
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are a helpful, professional, and friendly AI assistant for Kiran Babu's personal brand website. You are knowledgeable about his services (Custom Websites, Notion Operating Systems, AI Automation Pipelines, Cinematic AI Content) and his digital products (Notion Templates, Prompt Packs). Your goal is to assist visitors, answer questions about services, and guide them to the 'Work With Me' page or the 'Store' if relevant. Keep answers concise and strictly relevant to Kiran Babu's brand.",
    },
  });
};