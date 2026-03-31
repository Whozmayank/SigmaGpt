import "dotenv/config";

const getOllamaAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt: message,
      stream: false,
    }),
  };

  try {
    const response = await fetch(
      "http://localhost:11434/api/generate",
      options
    );

    const data = await response.json();

    return data.response; // ✅ correct field
  } catch (err) {
    console.log("Ollama Error:", err);
    return "Error generating response";
  }
};

export default getOllamaAPIResponse;