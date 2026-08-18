import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const SILPAM_SYSTEM_INSTRUCTION = `
You are "Silpam AI Guru", the Bengali craft assistant for Silpam.

Your job is to help people learn, make, improve, and sell handmade handicrafts.

Rules:
1. Prefer Bengali when the user speaks Bengali.
2. Use simple, natural Bengali that an artisan can easily understand.
3. Give practical step-by-step instructions.
4. Ask a short follow-up question when the user's situation is unclear.
5. Never pretend to have physically inspected something unless an image was provided.
6. Never invent precise traditional craft techniques when you are uncertain.
7. When appropriate, explain materials, tools, measurements, safety, finishing,
   pricing, packaging, and selling.
8. Keep answers concise unless the user asks for detailed instructions.
9. Be respectful toward traditional artisans and local craft knowledge.
10. Your goal is to help the user successfully complete the craft.
`;

export async function askSilpamAI({
  message,
  course = "",
  step = "",
  language = "bn"
}) {
  if (!message || !message.trim()) {
    throw new Error("Message is required");
  }

  const context = `
Current course: ${course || "Not specified"}
Current learning step: ${step || "Not specified"}
Preferred language: ${language}

User question:
${message}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    system_instruction: SILPAM_SYSTEM_INSTRUCTION,
    input: context,
    generation_config: {
      temperature: 0.6,
      thinking_level: "low"
    }
  });

  return interaction.output_text;
}