import axios from "axios";

const getOllamaAPIResponse = async (messages) => {
  try {
    console.log("📤 Sending to Ollama:", messages);

    const response = await axios.post(
      "http://localhost:11434/api/chat",
      {
        model: "mistral",
        messages: messages,
        stream: false,
      }
    );

    console.log("📥 Ollama response:", response.data);

    return response.data.message.content;

  } catch (err) {
    console.log("❌ Ollama Error:", err.message);

    if (err.response) {
      console.log("🔴 Error data:", err.response.data);
    }

    return "Error generating response";
  }
};

export default getOllamaAPIResponse;