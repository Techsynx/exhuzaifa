"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
You are a minimal AI assistant created by Huzaifa Malik. Your name is 'Huzaifa's AI Assistant'. 
Always start your first response with 'I am a bot created by Huzaifa.'. 
Keep all responses extremely short, minimal (max 2 sentences), and professional. 
You only talk about Huzaifa Malik, his projects (Fraud AI, Posture Tracking, EXP-AI, Chessy), his skills (AI, ML, Web Dev, Security), and his background (BS-IT GC University). 
If asked about anything else, politely redirect the conversation back to Huzaifa's work.
`;

const QUICK_QUESTIONS = [
  "Tell me about Fraud AI",
  "What are Huzaifa's ML skills?",
  "Tell me about Chessy project",
  "How to contact Huzaifa?"
];

export const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "I am a bot created by Huzaifa. How can I help you learn more about his AI journey?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride || input.trim();
    if (!messageToSend || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: messageToSend },
          ],
          temperature: 0.5,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) throw new Error("Rate limit exceeded. Wait a bit.");
        throw new Error(errorData.error?.message || "Connection failed");
      }

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "I'm here, but I couldn't generate a response. Ask again!";

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "I'm having a quick space-nap. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="flex flex-col items-center justify-center py-20 z-[20]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[900px] px-5"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-4"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">Cosmic AI Assistant</h1>
          </motion.div>
          
          <motion.h1 
            variants={slideInFromLeft(0.5)}
            className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center"
          >
            Neural Chat Interface
          </motion.h1>
        </div>

        <motion.div
          variants={slideInFromRight(0.5)}
          className="h-[650px] w-full border border-[#7042f88b] bg-[#111b21] rounded-3xl flex flex-col overflow-hidden shadow-[0_0_80px_-12px_rgba(112,66,248,0.4)] relative"
        >
          {/* Neural Header */}
          <div className="p-5 bg-[#202c33] border-b border-[#7042f88b] flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#7042f88b] p-[2px] shadow-[0_0_15px_rgba(112,66,248,0.5)]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-150">
                    <source src="/videos/blackhole.webm" type="video/webm" />
                  </video>
                </div>
              </div>
              <div>
                <h3 className="text-[#e9edef] font-bold text-base tracking-wide">Huzaifa's Core AI</h3>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#00a884] rounded-full animate-pulse"></span>
                  <p className="text-[#8696a0] text-[11px] uppercase tracking-widest font-medium">Online</p>
                </div>
              </div>
            </div>
            <SparklesIcon className="h-6 w-6 text-purple-500 animate-bounce" />
          </div>

          {/* Authentic WhatsApp Dark Window */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hidden relative bg-[#111b21]"
          >
            {/* Official WhatsApp Web Dark Doodle Background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.3] animate-doodle"
              style={{
                backgroundImage: `url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b401f101c.png")`,
                backgroundSize: "400px",
                backgroundRepeat: "repeat",
              }}
            ></div>

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} z-10`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-[14.2px] relative transition-all duration-300 ${
                      msg.role === "user"
                        ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none shadow-[0_0_15px_rgba(0,168,132,0.4)]"
                        : "bg-[#202c33] text-[#e9edef] rounded-tl-none shadow-[0_0_15px_rgba(112,66,248,0.4)]"
                    }`}
                  >
                    {/* Authentic Bubble Tail */}
                    <div 
                      className={`absolute top-0 w-3 h-3 ${
                        msg.role === "user" 
                          ? "-right-2 bg-[#005c4b]" 
                          : "-left-2 bg-[#202c33]"
                      }`}
                      style={{
                        clipPath: msg.role === "user" 
                          ? "polygon(0 0, 0 100%, 100% 0)" 
                          : "polygon(100% 0, 100% 100%, 0 0)"
                      }}
                    />
                    {msg.content}
                    <div className="text-[10px] text-[#8696a0] text-right mt-1.5 opacity-90">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <div className="flex justify-start z-10">
                <div className="bg-[#202c33] text-cyan-500 px-5 py-3 rounded-2xl rounded-tl-none border border-[#7042f88b]/30 text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(112,66,248,0.3)]">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="text-[11px] uppercase tracking-tighter ml-2 font-bold">Neural Link...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Chips */}
          {!isLoading && (
            <div className="px-4 py-2 bg-[#111b21] flex gap-2 overflow-x-auto scrollbar-hidden z-10 border-t border-[#202c33]">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#202c33] border border-[#7042f844] text-[#8696a0] text-xs hover:text-white hover:border-[#00a884] transition-all active:scale-95 shadow-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp Dark Input Area */}
          <div className="p-5 bg-[#1e2428] flex gap-4 items-center z-10">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="w-full bg-[#2a2f32] border-none rounded-2xl px-6 py-4 text-[#e9edef] outline-none focus:ring-1 focus:ring-[#00a884]/50 transition-all text-sm placeholder:text-[#8696a0]"
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="h-14 w-14 flex items-center justify-center bg-[#00a884] hover:bg-[#06cf9c] text-white rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg group"
            >
              <PaperAirplaneIcon className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
