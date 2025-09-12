import mongoose from "mongoose";
import dotenv from "dotenv";
import Chat from "./models/chatModel.js";

dotenv.config();

const seedData = [
    {
        question: "What is the course duration?",
        answer:
            "The course lasts 2 days — specifically two live sessions (Day 1 and Day 2). Example: Day 1 from ~7:00-8:30 PM, Day 2 from ~6:30-8:30 PM. In some cases, timings may vary.",
        type: "faq",
    },
    {
        question: "What are the fees?",
        answer:
            "The promotional price for the 2-day Masterclass is ₹129 (regular/original price may be higher, e.g., ₹499).",
        type: "faq",
    },
    {
        question: "Is certification provided?",
        answer:
            "It is not clearly stated whether completing the 2-day Masterclass gives a formal certification. The program is described more as a workshop/masterclass rather than a certified course.",
        type: "faq",
    },
    {
        question: "Is mentor availability included?",
        answer:
            "The course includes interaction with instructors live, and there is also a community aspect. Guest speakers may also join. However, 1:1 personalized mentoring is not guaranteed.",
        type: "faq",
    },
    {
        question: "What is the learning mode?",
        answer:
            "The course is live and interactive, conducted online. Some sessions (Day 1) may be recorded and shared, but Day 2 may not be recorded to protect participant privacy.",
        type: "faq",
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB connected");

        // Clear old FAQ entries
        await Chat.deleteMany({ type: "faq" });

        // Insert fresh FAQ
        await Chat.insertMany(seedData);

        console.log(" FAQ seed data inserted successfully");
        process.exit(0);
    } catch (error) {
        console.error(" Error seeding data:", error);
        process.exit(1);
    }
};

seedDatabase();
