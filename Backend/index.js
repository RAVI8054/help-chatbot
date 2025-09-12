import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Optional welcome route
app.get("/api/chat/welcome", (req, res) => {
    res.json({ reply: "Hi, I'm Jasmin from Iron Lady Foundation. How can I help you?" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
