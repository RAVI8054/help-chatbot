import mongoose from "mongoose";

// Schema for storing FAQ questions/answers and user queries
const chatSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        // Optional: to differentiate seeded FAQs vs user logs
        type: {
            type: String,
            enum: ["faq", "user"],
            default: "faq",
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
