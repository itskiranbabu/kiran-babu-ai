import { GoogleGenAI } from "@google/genai";
import { getEnv } from '../utils/env';

const apiKey = getEnv('API_KEY')?.replace(/[\"']/g, '').trim() || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const FLASH_MODEL = 'gemini-2.5-flash';
const PRO_MODEL = 'gemini-2.5-pro';

// ============================================
// ADVANCED AI FEATURES
// ============================================

/**
 * Analyze content performance and provide optimization suggestions
 */
export const analyzeContentPerformance = async (
  content: string,
  platform: string,
  metrics?: { views?: number; engagement?: number; clicks?: number }
): Promise<{
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  predictedEngagement: string;
}> => {
  if (!ai) {
    return {
      score: 75,
      strengths: ['Clear messaging', 'Good hook'],
      weaknesses: ['Could be more concise'],
      suggestions: ['Add more emojis', 'Include a stronger CTA'],
      predictedEngagement: 'Medium-High'
    };
  }

  const prompt = `
    Analyze this ${platform} content for performance optimization.
    
    Content: "${content}"
    ${metrics ? `Current Metrics: ${JSON.stringify(metrics)}` : ''}
    
    Provide analysis in JSON format:
    {
      "score": <0-100>,
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "predictedEngagement": "Low|Medium|High"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error('Content analysis error:', e);
    throw e;
  }
};

/**
 * Generate content variations for A/B testing
 */
export const generateABTestVariations = async (
  originalContent: string,
  platform: string,
  numVariations: number = 3
): Promise<Array<{
  variation: string;
  hypothesis: string;
  expectedImprovement: string;
}>> => {
  if (!ai) {
    return Array(numVariations).fill(null).map((_, i) => ({
      variation: `${originalContent} (Variation ${i + 1})`,
      hypothesis: `Testing different hook approach`,
      expectedImprovement: '+10-15% engagement'
    }));
  }

  const prompt = `
    Create ${numVariations} A/B test variations for this ${platform} content.
    
    Original: "${originalContent}"
    
    For each variation, test a different hypothesis (hook style, CTA placement, tone, etc.)
    
    Return JSON array:
    [
      {
        "variation": "the new content",
        "hypothesis": "what we're testing",
        "expectedImprovement": "predicted impact"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error('A/B variation error:', e);
    throw e;
  }
};

/**
 * Analyze competitor content and provide insights
 */
export const analyzeCompetitor = async (
  competitorContent: string,
  yourNiche: string
): Promise<{
  contentStrategy: string;
  strengths: string[];
  gaps: string[];
  opportunities: string[];
}> => {
  if (!ai) {
    return {
      contentStrategy: 'Educational + Promotional mix',
      strengths: ['Consistent posting', 'Strong visuals'],
      gaps: ['Limited engagement with audience'],
      opportunities: ['Create more interactive content', 'Leverage trending topics']
    };
  }

  const prompt = `
    Analyze this competitor content in the ${yourNiche} niche.
    
    Content: "${competitorContent}"
    
    Provide strategic insights in JSON:
    {
      "contentStrategy": "their overall approach",
      "strengths": ["what they do well"],
      "gaps": ["what they're missing"],
      "opportunities": ["how you can differentiate"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error('Competitor analysis error:', e);
    throw e;
  }
};

/**
 * Predict content virality potential
 */
export const predictVirality = async (
  content: string,
  platform: string,
  targetAudience: string
): Promise<{
  viralityScore: number;
  factors: Array<{ factor: string; impact: string; score: number }>;
  recommendations: string[];
  bestPostingTime: string;
}> => {
  if (!ai) {
    return {
      viralityScore: 72,
      factors: [
        { factor: 'Hook Strength', impact: 'High', score: 85 },
        { factor: 'Emotional Appeal', impact: 'Medium', score: 65 },
        { factor: 'Shareability', impact: 'High', score: 78 }
      ],
      recommendations: ['Add more emotional triggers', 'Include a question to boost engagement'],
      bestPostingTime: '9:00 AM - 11:00 AM EST'
    };
  }

  const prompt = `
    Predict the virality potential of this ${platform} content for ${targetAudience}.
    
    Content: "${content}"
    
    Analyze and return JSON:
    {
      "viralityScore": <0-100>,
      "factors": [
        {"factor": "name", "impact": "Low|Medium|High", "score": <0-100>}
      ],
      "recommendations": ["how to increase virality"],
      "bestPostingTime": "optimal time to post"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error('Virality prediction error:', e);
    throw e;
  }
};

/**
 * Generate personalized content based on audience insights
 */
export const generatePersonalizedContent = async (
  topic: string,
  audienceData: {
    demographics?: string;
    interests?: string[];
    painPoints?: string[];
    preferredTone?: string;
  },
  platform: string
): Promise<string> => {
  if (!ai) {
    return `Personalized content about ${topic} for your audience (Demo Mode)`;
  }

  const prompt = `
    Create highly personalized ${platform} content about: ${topic}
    
    Audience Profile:
    - Demographics: ${audienceData.demographics || 'General'}
    - Interests: ${audienceData.interests?.join(', ') || 'Various'}
    - Pain Points: ${audienceData.painPoints?.join(', ') || 'Common challenges'}
    - Preferred Tone: ${audienceData.preferredTone || 'Professional yet friendly'}
    
    Make it resonate deeply with this specific audience.
  `;

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt
    });
    
    return response.text || '';
  } catch (e) {
    console.error('Personalized content error:', e);
    throw e;
  }
};

/**
 * Sentiment analysis for content
 */
export const analyzeSentiment = async (
  content: string
): Promise<{
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  emotions: Array<{ emotion: string; intensity: number }>;
  tone: string;
}> => {
  if (!ai) {
    return {
      overall: 'positive',
      score: 0.75,
      emotions: [
        { emotion: 'excitement', intensity: 0.8 },
        { emotion: 'confidence', intensity: 0.7 }
      ],
      tone: 'Enthusiastic and motivational'
    };
  }

  const prompt = `
    Perform detailed sentiment analysis on this content.
    
    Content: "${content}"
    
    Return JSON:
    {
      "overall": "positive|neutral|negative",
      "score": <-1 to 1>,
      "emotions": [{"emotion": "name", "intensity": <0-1>}],
      "tone": "description of tone"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error('Sentiment analysis error:', e);
    throw e;
  }
};

/**
 * Generate content calendar based on trends and analytics
 */
export const generateSmartCalendar = async (
  niche: string,
  goals: string[],
  frequency: string,
  duration: number = 30
): Promise<Array<{
  date: string;
  contentType: string;
  topic: string;
  platform: string[];
  reasoning: string;
}>> => {
  if (!ai) {
    const today = new Date();
    return Array(7).fill(null).map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        contentType: ['Educational', 'Promotional', 'Engagement'][i % 3],
        topic: `${niche} topic ${i + 1}`,
        platform: ['Instagram', 'LinkedIn', 'Twitter'],
        reasoning: 'Balanced content mix for audience growth'
      };
    });
  }

  const prompt = `
    Create a ${duration}-day content calendar for ${niche}.
    
    Goals: ${goals.join(', ')}
    Posting Frequency: ${frequency}
    
    Consider:
    - Trending topics
    - Optimal posting times
    - Content variety
    - Audience engagement patterns
    
    Return JSON array of daily content plans.
  `;

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error('Smart calendar error:', e);
    throw e;
  }
};

/**
 * Revenue forecasting based on content strategy
 */
export const forecastRevenue = async (
  currentMetrics: {
    followers: number;
    avgEngagement: number;
    conversionRate: number;
    avgOrderValue: number;
  },
  strategy: string,
  timeframe: number = 90
): Promise<{
  projectedRevenue: number;
  confidence: number;
  breakdown: Array<{ month: number; revenue: number; followers: number }>;
  recommendations: string[];
}> => {
  if (!ai) {
    return {
      projectedRevenue: 15000,
      confidence: 0.75,
      breakdown: [
        { month: 1, revenue: 4000, followers: currentMetrics.followers + 500 },
        { month: 2, revenue: 5500, followers: currentMetrics.followers + 1200 },
        { month: 3, revenue: 5500, followers: currentMetrics.followers + 2000 }
      ],
      recommendations: ['Increase posting frequency', 'Focus on high-converting content']
    };
  }

  const prompt = `
    Forecast revenue for the next ${timeframe} days.
    
    Current Metrics:
    - Followers: ${currentMetrics.followers}
    - Avg Engagement: ${currentMetrics.avgEngagement}%
    - Conversion Rate: ${currentMetrics.conversionRate}%
    - Avg Order Value: $${currentMetrics.avgOrderValue}
    
    Strategy: ${strategy}
    
    Provide realistic projections in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error('Revenue forecast error:', e);
    throw e;
  }
};

export default {
  analyzeContentPerformance,
  generateABTestVariations,
  analyzeCompetitor,
  predictVirality,
  generatePersonalizedContent,
  analyzeSentiment,
  generateSmartCalendar,
  forecastRevenue
};
