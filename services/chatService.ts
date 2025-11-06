import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

// The response from the proxy is normalized, so we can expect a simple object with a text property.
interface NormalizedResponse {
    text: string;
}

export const postChatMessage = async (
  history: ChatMessage[],
  message: string,
  model: 'gemini' | 'grok'
): Promise<NormalizedResponse> => {
  const response = await fetch('/.netlify/functions/ai-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ history, message, model }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    // Create an error object that includes status and body for better handling
    const error: any = new Error(response.statusText);
    error.status = response.status;
    error.body = responseBody;
    throw error;
  }

  // The Gemini SDK returns a GenerateContentResponse, but our proxy normalizes Grok's response.
  // We'll ensure a consistent { text: "..." } structure for the frontend.
  if (responseBody.text) {
     return { text: responseBody.text };
  }
  // This handles the original Gemini SDK response shape
  if (responseBody.candidates && responseBody.candidates[0].content.parts[0].text) {
     return { text: responseBody.candidates[0].content.parts[0].text };
  }

  // Fallback for unexpected shapes
  return responseBody as NormalizedResponse;
};