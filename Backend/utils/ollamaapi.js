import axios from "axios";

const getOllamaAPIResponse = async (messages) => {
  try {
    console.log("🔥 FUNCTION CALLED");
    console.log("📤 Messages:", JSON.stringify(messages, null, 2));

    const response = await axios.post(
      "http://localhost:11434/api/chat",
      {
        model: "mistral",
        messages: messages,
        stream: false,
      }
    );

    console.log("📥 FULL RESPONSE:", JSON.stringify(response.data, null, 2));

    if (
      response.data &&
      response.data.message &&
      response.data.message.content
    ) {
      return response.data.message.content;
    }

    console.log("⚠️ Unexpected response structure");
    return "No valid response from model";

  } catch (err) {
    console.log("❌ FULL ERROR:", err.message);

    if (err.response) {
      console.log("🔴 STATUS:", err.response.status);
      console.log("🔴 DATA:", err.response.data);
    }

    return "Error generating response";
  }
};

export default getOllamaAPIResponse;