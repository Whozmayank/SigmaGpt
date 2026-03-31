import axios from "axios";

const getOllamaAPIResponse = async (messages) => {
  try {
    console.log("📤 Sending:", messages);

    const response = await axios.post(
      "http://localhost:11434/api/chat",
      {
        model: "mistral",
        messages: messages,
        stream: false,
      }
    );

    console.log("📥 Full response:", response.data);

    // ✅ SAFE parsing
    if (
      response.data &&
      response.data.message &&
      response.data.message.content
    ) {
      return response.data.message.content;
    }

    console.log("⚠️ Unexpected format");
    return "No valid response from model";

  } catch (err) {
    console.log("❌ ERROR:", err.message);

    if (err.response) {
      console.log("🔴 DATA:", err.response.data);
    }

    return "Error generating response";
  }
};

export default getOllamaAPIResponse;