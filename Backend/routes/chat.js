import express from "express";
import Thread from "../models/Thread.js";
import getOllamaAPIResponse from "../utils/ollamaapi.js";

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


//  DELETE thread
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


//  CHAT ROUTE (MAIN LOGIC)
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  console.log("📩 Incoming:", { threadId, message });

  if (!threadId || !message || !message.trim()) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    //  Create thread if not exists
    if (!thread) {
      console.log("🆕 Creating new thread");

      thread = new Thread({
        threadId,
        title: message.slice(0, 30),
        messages: [],
      });
    }

    //  Add user message
    thread.messages.push({
      role: "user",
      content: message,
    });

    //  Get AI response using FULL history
    const assistantReply = await getOllamaAPIResponse(thread.messages);

    console.log("🤖 Reply:", assistantReply);

    //  Save assistant reply
    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    //  Save thread
    await thread.save();

    res.json({
      reply: assistantReply,
      thread, // optional but useful
    });

  } catch (err) {
    console.log("❌ Server Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;