import Chat from "../models/chatModel.js";
import { getAIResponse } from "../ai.js";

// 🔹 Keyword → mapped FAQ question
const keywordMap = [
    {
        keywords: ["duration", "length", "days", "time"],
        faqQuestion: "What is the course duration?",
    },
    {
        keywords: ["fee", "fees", "price", "cost"],
        faqQuestion: "What are the fees?",
    },
    {
        keywords: ["certificate", "certification"],
        faqQuestion: "Is certification provided?",
    },
    {
        keywords: ["mentor", "teacher", "guide", "instructor", "support"],
        faqQuestion: "Is mentor availability included?",
    },
    {
        keywords: ["mode", "online", "live", "recording", "class"],
        faqQuestion: "What is the learning mode?",
    },
];

export const handleChatQuery = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const lowerQ = question.toLowerCase();

        // 1 Smart keyword-based tool calling
        for (const map of keywordMap) {
            if (map.keywords.some((kw) => lowerQ.includes(kw))) {
                const faq = await Chat.findOne({ question: map.faqQuestion, type: "faq" });
                if (faq) {
                    return res.json({
                        type: "faq",
                        question: faq.question,
                        answer: faq.answer,
                    });
                }
            }
        }

        // 2 Exact/regex match in DB
        const faq = await Chat.findOne({
            question: { $regex: new RegExp(question, "i") },
            type: "faq",
        });

        if (faq) {
            return res.json({
                type: "faq",
                question: faq.question,
                answer: faq.answer,
            });
        }

        // 3AI fallback (Groq + LangChain)
        const aiAnswer = await getAIResponse(question);

        // Save query log
        await Chat.create({
            question,
            answer: aiAnswer,
            type: "user",
        });

        return res.json({
            type: "ai",
            question,
            answer: aiAnswer,
        });
    } catch (error) {
        console.error(" Chat error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
