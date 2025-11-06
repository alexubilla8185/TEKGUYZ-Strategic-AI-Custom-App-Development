
import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the TEKGUYZ AI Assistant. Your persona is friendly, confident, pragmatic, and concise. You are a lead-qualifying expert for a premium AI solutions provider.

**Primary Goal:**
Your main objective is to understand a potential client's needs by collecting key information, and then determine if they are a good fit for TEKGUYZ. When you have enough information, you will hand them off to a human to start a project.

**Knowledge Base:**
Answer questions PRIMARILY using the information provided here. Be honest if you don't know something.
- TEKGUYZ specializes in: AI & ML Consulting, Custom Chatbots, and Bespoke AI Application Development.
- We build intelligent systems that solve complex business problems, driving efficiency and unlocking new opportunities.
- Our process involves: Discovery, Strategy, Development, and Deployment.
- We work with startups and enterprise clients.
- We do not offer off-the-shelf software or hardware solutions.

**Communication Rules:**
1.  **Formatting:** Keep responses SHORT and SCANNABLE (3-5 sentences is ideal, 8 is the absolute maximum). Use Markdown for emphasis (**bold**) and lists (* item). NEVER use Markdown headers (#, ##, etc.).
2.  **Tone:** Be conversational and helpful, but always professional.

**Lead-Qualifying Strategy:**
Your primary task is to listen for and collect these 5 key data points:
1.  **Name:** The user's name.
2.  **ProjectType:** What kind of project are they interested in? Normalize this to one of: "AI Consulting", "Custom Chatbot", "Bespoke AI Development", "Unsure".
3.  **Objectives:** What are their business goals? What problem are they trying to solve?
4.  **Budget:** What is their estimated budget? Normalize to: "<$10k", "$10k-$50k", "$50k-$100k", "$100k+".
5.  **Timeline:** What is their desired project timeline? Normalize to: "1-3 Months", "3-6 Months", "6+ Months".

**Handoff Workflow (CRITICAL):**
When you have collected AT LEAST 3 of the 5 key data points and you are reasonably confident (average confidence score >= 0.65), you MUST initiate the handoff.
To do this, after your natural language response, you MUST inject this exact, single-line command:
[ACTION:OPEN_FORM]{"prefill":{"name":"...", "service":"...", "budget":"...", "timeline":"...", "details":"..."},"confidence":0.XX}
- The \`prefill\` object should contain the normalized data you have collected.
- \`details\` should be a brief summary of their objectives.
- \`confidence\` is your estimated confidence (0.00 to 1.00) that this is a qualified lead.
- Example: [ACTION:OPEN_FORM]{"prefill":{"name":"Jane", "service":"Custom Chatbot", "budget":"$50k-$100k", "details":"To improve customer support response times."}, "confidence":0.85}

**Suggestion Chips (CRITICAL):**
To guide the user, provide dynamic suggestion chips. At the end of your response (but BEFORE the ACTION command if present), you MUST inject this exact, single-line command:
[CHIPS:["Option 1","Option 2","Option 3"]]
- Provide 2-4 relevant, short (under 25 characters) options.
- These should help the user provide the next piece of information you need.
- Example: [CHIPS:["Tell me about your project","What's your budget?","Our timeline is flexible"]]
- Example after getting project type: [CHIPS:["My budget is around $25k", "Our goal is to increase sales", "What's the next step?"]]

Your first message should be a brief, welcoming introduction.
`;

const handler: Handler = async (event: HandlerEvent) => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const grokApiKey = process.env.GROK_API_KEY;
  const allowedOrigin = process.env.URL;
  const origin = event.headers.origin;

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin || '*',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: { code: 405, message: 'Method Not Allowed' } }),
    };
  }
  
  if (allowedOrigin && origin !== allowedOrigin) {
      return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ error: { code: 401, message: 'Unauthorized: Invalid origin' } })
      };
  }

  try {
    const { history, message, model } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: { code: 400, message: 'Bad Request: Message content is required.' } }),
      };
    }
    
    if (model === 'grok') {
        if (!grokApiKey) {
            return { statusCode: 503, headers: corsHeaders, body: JSON.stringify({ error: { code: 503, message: 'Grok AI Service Offline. API key is not configured.' } })};
        }
        
        const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${grokApiKey}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: SYSTEM_INSTRUCTION },
                    ...history.map((msg: any) => ({ role: msg.role, content: msg.content })),
                    { role: 'user', content: message }
                ],
                model: 'grok-4-latest', // As per user request, assuming latest is desired.
            })
        });

        if (!grokResponse.ok) {
            const errorBody = await grokResponse.json();
            console.error("Grok API Error:", errorBody);
            return {
                statusCode: grokResponse.status,
                headers: corsHeaders,
                body: JSON.stringify({ error: { code: grokResponse.status, message: errorBody.error?.message || 'Grok API error' } }),
            };
        }

        const grokData = await grokResponse.json();
        const responseText = grokData.choices?.[0]?.message?.content || "Sorry, I couldn't get a response from Grok.";

        // We wrap the response to match the structure the frontend expects from Gemini
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ text: responseText }),
        };

    } else { // Default to Gemini
        if (!geminiApiKey) {
            return { statusCode: 503, headers: corsHeaders, body: JSON.stringify({ error: { code: 503, message: 'Gemini AI Service Offline. API key is not configured.' } })};
        }

        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const chat = ai.chats.create({
            model: 'gemini-2.5-pro',
            history,
            config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7, maxOutputTokens: 2048 }
        });

        const result: GenerateContentResponse = await chat.sendMessage(message);
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(result),
        };
    }

  } catch (error) {
    console.error("Error in AI Proxy:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: { code: 500, message: 'An error occurred while processing your request.' } }),
    };
  }
};

export { handler };