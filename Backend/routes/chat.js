import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/geminiapi.js";

const router = express.Router();


// GET all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});


// GET single thread
router.get("/thread/:threadId", async (req, res) => {
  try {
    const thread = await Thread.findOne({ threadId: req.params.threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});


// DELETE thread
router.delete("/thread/:threadId", async (req, res) => {
  try {
    const deleted = await Thread.findOneAndDelete({
      threadId: req.params.threadId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json({ success: "Thread deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});


// MAIN CHAT ROUTE
router.post("/chat", async (req, res) => {
  console.log("🔥 /chat route hit");
  const { threadId, message } = req.body;

  console.log("📩 Incoming:", { threadId, message });

  if (!threadId || !message || !message.trim()) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      console.log("🆕 Creating new thread");

      thread = new Thread({
        threadId,
        title: message.slice(0, 30),
        messages: [],
      });
    }

    // add user message
    thread.messages.push({
      role: "user",
      content: message,
    });

    console.log("📚 Conversation:", thread.messages);

    // 🔥 send FULL history to Ollama
    const assistantReply = await getGeminiResponse(thread.messages);

    if (!assistantReply || assistantReply === "Error generating response") {
      return res.status(500).json({ error: "AI failed to respond" });
    }

    console.log("🤖 Reply:", assistantReply);

    // save assistant reply
    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    await thread.save();

    res.json({
      reply: assistantReply,
      thread,
    });

  } catch (err) {
    console.log("❌ SERVER ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;