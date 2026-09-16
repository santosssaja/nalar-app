"use client";

import React, { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { DeterminantCanvasState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

interface AITutorModalProps {
  topicSlug: string;
  currentState: DeterminantCanvasState;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export function AITutorModal({ topicSlug, currentState }: AITutorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Halo! Saya Asisten AI Nalar. Tanyakan apa saja mengenai transformasi matriks atau determinan di kanvas ini!",
    },
  ]);

  const { speakText } = useAccessibility();

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/ai-tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_slug: topicSlug,
          current_variables: { ...currentState },
          message: textToSend,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
        speakText(data.audio_summary);
        setLoading(false);
        return;
      }
    } catch {
      // Local fallback
    }

    const fallbackReply =
      "Determinan mengukur seberapa banyak luas wilayah melipatgandakan diri. Karena kanvas saat ini memiliki nilai determinan " +
      (currentState.i_hat_x * currentState.j_hat_y - currentState.j_hat_x * currentState.i_hat_y).toFixed(2) +
      ", kotak satuan berubah menjadi jajaran genjang seluas nilai mutlak tersebut.";

    setMessages((prev) => [...prev, { role: "assistant", text: fallbackReply }]);
    speakText("Determinan mengukur perubahan luas kotak satuan di kanvas.");
    setLoading(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-24 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition hover:scale-105"
        aria-label="Buka AI Tutor Tanya Jawab"
      >
        <Bot className="w-4 h-4 animate-bounce" />
        <span>Tanya AI Tutor</span>
      </button>

      {/* Drawer Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tutor-heading"
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col text-neutral-200 animate-slide-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 id="tutor-heading" className="text-sm font-bold text-white">
                  AI STEM Tutor
                </h3>
                <span className="text-[11px] text-emerald-400 font-medium">● Hemat Kuota & Responsif</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              aria-label="Tutup panel tutor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick prompts */}
          <div className="p-3 bg-neutral-950/40 border-b border-neutral-800/60 flex flex-wrap gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleSend("Apa itu determinan secara intuitif?")}
              className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            >
              Apa itu determinan?
            </button>
            <button
              type="button"
              onClick={() => handleSend("Kenapa determinan nol tidak punya invers?")}
              className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            >
              Kenapa det = 0 kolaps?
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs italic">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                AI Tutor sedang merumuskan penjelasan...
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-neutral-800 bg-neutral-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan matematika..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition"
              aria-label="Kirim pertanyaan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
