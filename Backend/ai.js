import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();


const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant", 
});

// System prompt to keep AI focused
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are Jasmin, an assistant for Iron Lady Foundation workshops. Be polite, helpful, and concise. Answer questions related to workshops. If unsure, respond kindly."],
    ["human", "{input}"],
]);

export async function getAIResponse(question) {
    try {
        const chain = prompt.pipe(model);

        const response = await chain.invoke({
            input: question,
        });

        return response.content || "I’m not sure, but I’ll try to find out for you!";
    } catch (error) {
        console.error(" Groq AI error:", error.message);
        return " Sorry, I’m having trouble answering that right now.";
    }
}
