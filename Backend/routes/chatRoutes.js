import express from "express";
import { handleChatQuery } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat → send user question, get answer
router.post("/", handleChatQuery);

export default router;
