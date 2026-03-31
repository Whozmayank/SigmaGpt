import express from "express";
import Thread from "../models/Thread.js";
import getOllamaAPIResponse from "../utils/ollamaapi.js";

const router = express.Router();



// get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "thread not found" });
    }
    res.json(thread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "thread not found" });
    }

    res.status(200).json({ success: "thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", async (req, res) => {
  let { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "threadId and message are required" });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({ error: "Empty message not allowed" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.slice(0, 30),
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    // ✅ Pass full chat history
    const assistantReply = await getOllamaAPIResponse(thread.messages);

    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    await thread.save();

    res.json({ reply: assistantReply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
