import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Initial welcome message
    useEffect(() => {
        setMessages([
            {
                type: "bot",
                text: "Hi, I’m Jasmin from Iron Lady Foundation. How can I help you today?",
            },
        ]);
    }, []);

    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Clear chat
    const clearChat = () => setMessages([]);

    // Back button
    const goBack = () => {
        window.location.href = "/";
    };

    // Send user message
    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { type: "user", text: input }];
        setMessages(newMessages);

        try {
            const res = await axios.post("http://localhost:5000/api/chat", {
                question: input,
            });

            const botReply = res.data.answer || "Sorry, I don’t have an answer for that.";
            setMessages([...newMessages, { type: "bot", text: botReply }]);
        } catch (err) {
            console.error(err);
            setMessages([
                ...newMessages,
                { type: "bot", text: " Server error, please try again later." },
            ]);
        }

        setInput("");
    };

    return (
        <div className="flex w-full h-screen flex-col">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-red-200 p-3 shadow-md z-10">
                <button
                    onClick={goBack}
                    className="px-3 py-1 bg-white text-red-600 rounded-lg shadow hover:bg-gray-100"
                >
                    Back
                </button>
                <div className="hidden md:block text-red-800 font-semibold animate-pulse text-center">
                     Please wait for response...
                </div>
                <button
                    onClick={clearChat}
                    className="px-3 py-1 bg-white text-red-600 rounded-lg shadow hover:bg-gray-100"
                >
                    Clear
                </button>
            </div>

            {/* Main Section */}
            <div className="flex flex-1 pt-16">
                {/* Left AI Image */}
                <div className="hidden md:block w-1/5 h-screen">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1659018966834-99be9746b49e?w=500&auto=format&fit=crop&q=60"
                        alt="AI"
                    />
                </div>

                {/* Chat Window */}
                <div className="w-full md:w-3/5 h-screen flex flex-col bg-red-200 relative">
                    <div className="flex-1 overflow-y-auto p-4 space-y-5">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"
                                    }`}
                            >
                                <div
                                    className={`max-w-xs whitespace-pre-line px-4 py-2 rounded-lg shadow ${msg.type === "bot" ? "bg-blue-100 text-left" : "bg-green-100 text-right"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-red-200 flex items-center">
                        <input
                            type="text"
                            className="w-full p-2 outline-none border-r-0 bg-white rounded-l-4xl"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <div
                            onClick={sendMessage}
                            className="bg-white p-2 cursor-pointer rounded-r-4xl"
                        >
                            <IoSearch size="25px" color="black" />
                        </div>
                    </div>
                </div>

                {/* Right User Image */}
                <div className="hidden md:block w-1/5 h-screen">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1613061174169-19c33d651be6?w=500&auto=format&fit=crop&q=60"
                        alt="User"
                    />
                </div>
            </div>
        </div>
    );
}
