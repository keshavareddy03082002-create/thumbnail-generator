import { GoogleGenAI } from "@google/genai";
import { ThumbnailPrompt, GenerationConfig } from "../types";

// Helper to construct the final text prompt from structured data
const constructFullPrompt = (promptData: ThumbnailPrompt): string => {
  return `
    Create a high-quality image with the following specifications:
    
    Subject: ${promptData.subject}
    Style: ${promptData.style}
    Lighting: ${promptData.lighting}
    Background: ${promptData.background}
    Composition: ${promptData.composition}
    
    Negative Prompt (Avoid these): ${promptData.negative_prompt}
  `.trim();
};

export const generateImage = async (
  promptData: ThumbnailPrompt, 
  config: GenerationConfig
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Select model based on resolution/quality request
  // Flash is faster, Pro is better for high detail/resolution
  const modelName = config.model === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  const fullPrompt = constructFullPrompt(promptData);

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [{ text: fullPrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: promptData.aspect_ratio,
          // imageSize only works for Pro model
          imageSize: config.model === 'pro' ? config.resolution : undefined,
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }
    
    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};