import { GoogleGenerativeAI } from "@google/generative-ai";
import { CopilotPlan, StepRun, WorkflowStep } from '../types';
import { mockDb } from './mockDb';

const apiKey = process.env.API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MODEL_NAME = 'gemini-2.0-flash-exp';

if (!genAI) {
  console.warn("⚠️ App is running in Mock/Demo Mode.");
}

// Helper to clean JSON
const cleanAndParseJSON = (text: string) => {
  try {
    if (!text) return null;
    let clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const firstOpen = clean.indexOf('{');
    const lastClose = clean.lastIndexOf('}');
    
    if (firstOpen !== -1 && lastClose !== -1) {
      clean = clean.substring(firstOpen, lastClose + 1);
    } else {
        const firstArr = clean.indexOf('[');
        const lastArr = clean.lastIndexOf(']');
        if (firstArr !== -1 && lastArr !== -1) {
            clean = clean.substring(firstArr, lastArr + 1);
        }
    }
    
    return JSON.parse(clean);
  } catch (e) {
    console.error("JSON Parse Error. Raw Text:", text, e);
    return null;
  }
};

// --- PLANNER AGENT ---
export const generateWorkflowPlan = async (goal: string): Promise<CopilotPlan | null> => {
    if (!genAI) {
        await new Promise(r => setTimeout(r, 1500));
        // Mock Plan
        return {
            summary: "A simplified launch campaign for your product (Demo Mode - No API Key).",
            steps: [
                { title: "Generate Teaser Post", type: "generate_content", description: "Create excitement on LinkedIn", prompt: "Write a LinkedIn post teasing a new launch for " + goal },
                { title: "Wait 1 Day", type: "wait", description: "Wait for engagement" },
                { title: "Send Launch Email", type: "send_email", description: "Email to list announcing live", prompt: "Write a short sales email for " + goal },
                { title: "Update CRM", type: "update_crm", description: "Tag leads as 'Launch Targeted'" }
            ]
        };
    }

    const prompt = `
        You are an expert Automation Architect.
        Goal: "${goal}"

        Create a structured workflow plan. 
        Return ONLY a JSON object with this structure:
        {
            "summary": "Short description of the strategy",
            "steps": [
                {
                    "title": "Step Name",
                    "type": "generate_content" | "send_email" | "wait" | "update_crm",
                    "description": "What this step does",
                    "prompt": "The prompt needed for AI generation (if applicable)"
                }
            ]
        }
    `;

    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return cleanAndParseJSON(response.text() || '{}');
    } catch (e) {
        console.error("Planner Error", e);
        return null;
    }
};

// --- EXECUTOR AGENT ---
export const executeWorkflowStep = async (step: WorkflowStep, context: any = {}): Promise<string> => {
    if (!genAI) {
        await new Promise(r => setTimeout(r, 1000));
        return `[Mock Output] Executed ${step.title}. Result: Success.`;
    }

    if (step.type === 'wait') {
        return "Waited successfully.";
    }

    if (step.type === 'update_crm') {
        return "CRM Updated successfully.";
    }

    if (step.type === 'send_email') {
        // Generate Email Content first
        const prompt = `Write an email subject and body for: ${step.config.promptTemplate || step.description}`;
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text() || "No content.";
        
        // "Send" it (Log to DB)
        await mockDb.logEmail("client@example.com", "Automated Email", content);
        return `Email Sent: ${content.substring(0, 50)}...`;
    }

    const prompt = `
        Task: ${step.config.promptTemplate || step.description}
        Context: ${JSON.stringify(context)}
        
        Generate the content. Plain text only.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text() || "No output generated.";
    } catch (e) {
        return "Error executing step.";
    }
};

// --- Smart CRM Outreach ---
export const generateOutreachEmail = async (leadData: any) => {
    if (!genAI) return "Hi [Name], saw your work in [Niche] and would love to connect.";

    const prompt = `
        Draft a cold outreach email for a potential client.
        Client Name: ${leadData.name}
        Client Budget: ${leadData.value}
        Source: ${leadData.source}
        
        Tone: Professional, Persuasive, Short (under 100 words).
        Goal: Book a call.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (e) {
        return "Could not generate email.";
    }
};

// --- Existing Functions ---
export const repurposeContent = async (text: string, tone: string) => {
  if (!genAI) {
    console.log("Mock Mode: Returning default repurpose data.");
    await new Promise(r => setTimeout(r, 2000));
    return {
      instagram: {
        script: "🔥 STOP SCROLLING! Here is how to automate your content...\n\n1. Use Templates\n2. Batch Create\n3. Use AI",
        caption: "Automation isn't about laziness. It's about leverage. Save 10 hours/week and focus on strategy.",
        hashtags: "#contenttips #automation #creator #strategy"
      },
      linkedin: "Automation isn't about laziness. It's about leverage.\n\n• Save 10 hours/week\n• Focus on strategy\n• Scale without burnout\n\nWhat are you automating today?",
      twitter: ["Content creation is broken.", "Most creators spend 80% time editing and 20% creating.", "Here is how to flip that ratio...", "Use AI to draft, human to polish.", "That is the KeySpark way."],
      youtube: { title: "How to Automate Content (Step by Step)", description: "In this video I break down my entire content OS...", tags: "content automation, AI tools, creator economy" }
    };
  }

  const prompt = `
    Act as a professional social media manager.
    Source Text: "${text}"
    Tone: ${tone}

    Repurpose this content into 4 formats. 
    IMPORTANT: Return ONLY a valid JSON object. Do not wrap in markdown.
    
    Structure:
    {
      "instagram": {
        "script": "Reel script (max 30s) with visual cues",
        "caption": "Engaging caption with call to action",
        "hashtags": "10 relevant hashtags"
      },
      "linkedin": "A professional, value-driven post with bullet points",
      "twitter": ["Thread Tweet 1", "Thread Tweet 2", "Thread Tweet 3", "Thread Tweet 4", "Thread Tweet 5"],
      "youtube": {
         "title": "Viral Clickable Title",
         "description": "SEO optimized description",
         "tags": "comma separated tags"
      }
    }
  `;

  try {
      const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
        generationConfig: { responseMimeType: "application/json" }
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return cleanAndParseJSON(response.text() || '{}');
  } catch (e) {
      console.error("Repurpose Error:", e);
      return null;
  }
};

export const refineContent = async (text: string, platform: string, instruction: string) => {
    if (!genAI) return `(Refined Mock) ${text} [Adjusted: ${instruction}]`;

    const prompt = `
        Refine the following ${platform} content.
        Instruction: ${instruction}
        Original Content: "${text}"
        
        Return ONLY the rewritten content text. No explanations.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text()?.trim() || text;
    } catch (e) {
        return text;
    }
};

export const generateCampaign = async (goal: string) => {
  if (!genAI) {
    return {
      campaign_summary: "Launch a comprehensive 7-day sprint focusing on value-first education followed by a scarcity offer (Demo Mode).",
      target_audience: "Creators and Solopreneurs earning $0-$5k/mo",
      daily_plan: [
        { day: 1, theme: "The Problem", action_items: ["Post IG Reel about the struggle", "Send teaser email"], platforms: ["IG", "Email"] },
        { day: 2, theme: "The Solution", action_items: ["Showcase the product in action", "Twitter thread breakdown"], platforms: ["Twitter", "IG"] },
        { day: 3, theme: "Social Proof", action_items: ["Share client wins", "Go live for Q&A"], platforms: ["LinkedIn", "IG Live"] }
      ]
    };
  }

  const prompt = `
    Act as a launch strategist.
    Goal: "${goal}"

    Create a 7-day launch campaign. Return ONLY a valid JSON object:
    {
      "campaign_summary": "2-3 sentence strategic overview",
      "target_audience": "Description of who this targets",
      "daily_plan": [
        { "day": 1, "theme": "Topic/Angle", "action_items": ["Action 1", "Action 2"], "platforms": ["IG", "Email"] },
        ... (up to day 7)
      ]
    }
  `;

  try {
      const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
        generationConfig: { responseMimeType: "application/json" }
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return cleanAndParseJSON(response.text() || '{}');
  } catch (e) {
      console.error("Campaign Gen Error", e);
      return null;
  }
};

export const analyzeLead = async (leadData: any) => {
  if (!genAI) return "This lead shows high intent based on budget. Suggest offering a paid discovery call.";

  const prompt = `
    Analyze this lead for a creator agency:
    Name: ${leadData.name}
    Source: ${leadData.source}
    Budget: ${leadData.value}
    
    Provide 2 brief insights on how to close them and a suggested "Next Step". 
    Keep it under 50 words.
  `;

  try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
  } catch (e) {
      return "Analysis unavailable.";
  }
};

export const generateOnboardingPlan = async (data: any) => {
  if (!genAI) return "Phase 1: Build Audience. Phase 2: Create Offer. Phase 3: Automate.";
  
  const prompt = `
    Create a high-level 90-day growth plan for a ${data.type} creator.
    Goal: ${data.goal}
    Current Revenue: ${data.revenueRange}
    
    Return a short, motivating 3-step roadmap (Phase 1, 2, 3). Plain text, max 100 words.
  `;

  try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
  } catch (e) {
      return "Could not generate plan.";
  }
};

export const generateContentIdeas = async (niche: string, platform: string, topic: string) => {
    if (!genAI) return ["Why you need automation (3 reasons)", "My daily tech stack revealed", "Stop trading time for money"];
    const prompt = `Generate 3 viral hooks for ${niche} on ${platform} about ${topic}. JSON array of strings.`;
    
    try {
        const model = genAI.getGenerativeModel({ 
          model: MODEL_NAME,
          generationConfig: { responseMimeType: "application/json" }
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return cleanAndParseJSON(response.text() || '[]');
    } catch(e) {
        return [];
    }
};

export const createChatSession = () => {
    if (!genAI) return new MockChat();
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: "You are KeySpark AI assistant."
    });
    return model.startChat();
};

class MockChat {
  async sendMessage(props: { message: string }) {
    return { response: { text: () => "[Demo Mode] I can't connect to Gemini right now, but I can tell you about our services! Check out the Services page." } };
  }
}