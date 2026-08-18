let aiClient = null;

async function getGeminiClient() {
    if (!aiClient) {
        const { GoogleGenAI } = await import("@google/genai");

        aiClient = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }

    return aiClient;
}

const SILPAM_SYSTEM_INSTRUCTION = `
You are "Silpam AI Guru", the Bengali AI assistant for Silpam.

Silpam is a platform that helps people learn, create, and sell handmade crafts.

Your main job is to help artisans and learners with handicrafts.

You can help with:
- Learning handicrafts
- Step-by-step craft instructions
- Materials
- Tools
- Craft techniques
- Measurements
- Finishing
- Common mistakes
- Product improvement
- Basic pricing
- Packaging
- Selling handmade products

IMPORTANT RULES:

1. If the user speaks Bengali, answer in Bengali.
2. Use simple, natural Bengali.
3. Keep voice-style answers easy to understand.
4. Give practical instructions.
5. Prefer step-by-step explanations when useful.
6. Never claim that you can see an object unless an image is actually provided.
7. Do not invent traditional craft techniques when you are uncertain.
8. Respect traditional artisan knowledge.
9. Ask a short follow-up question when more information is needed.
10. Be friendly, encouraging and respectful.

You are not just a chatbot.
You are a digital craft mentor helping the user complete their work.
`;

async function askSilpamAI({
    message,
    course = "",
    step = "",
    language = "bn"
}) {

    if (!message || !message.trim()) {
        throw new Error("Message is required");
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing from .env");
    }

    const ai = await getGeminiClient();

    const prompt = `
Current Silpam course:
${course || "Not specified"}

Current learning step:
${step || "Not specified"}

Preferred language:
${language}

User question:
${message}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: prompt,

        config: {
            systemInstruction: SILPAM_SYSTEM_INSTRUCTION,
            temperature: 0.6,
            maxOutputTokens: 500
        }
    });

    return response.text;
}

module.exports = {
    askSilpamAI
};