import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  baseUrl: "https://generativelanguage.googleapis.com",
});

const getGeminiResponse = async (messages) => {

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    console.log("✅ Model created");

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(latestMessage);

    const text = result.response.text();
    console.log("📥 Gemini response:", text);
    return text.trim();

  } catch (err) {
    console.error("❌ ERROR NAME:", err.name);
    console.error("❌ ERROR MESSAGE:", err.message);
    console.error("❌ ERROR STATUS:", err.status);
    console.error("❌ FULL:", JSON.stringify(err, null, 2));
    return "Error generating response";
  }
};

export default getGeminiResponse;