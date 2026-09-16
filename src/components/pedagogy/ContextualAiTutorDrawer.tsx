"use client";

import React, { useState } from "react";
import { useLearner } from "@/context/LearnerContext";
import { Bot, Sparkles, X, MessageSquare, ArrowRight } from "lucide-react";

interface ContextualAiTutorDrawerProps {
  topicTitle: string;
  currentPhase: string;
  hintsUsedCount: number;
}

export function ContextualAiTutorDrawer({
  topicTitle,
  currentPhase,
  hintsUsedCount,
}: ContextualAiTutorDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { learnerState, overallMastery } = useLearner();

  const mistakesOnTopic = learnerState.mistakes.filter(
    (m: { topicId: string }) => m.topicId === topicTitle
  ).length;
  const conceptualScore = overallMastery.conceptual;

  // Socratic guidance context
  const getSocraticPrompt = () => {
    if (currentPhase === "prediction") {
      return "Pikirkan hubungan sebab-akibat sebelum mengubah nilai. Apa yang paling memengaruhi gerak ini menurut intuisimu?";
    }
    if (currentPhase === "explore") {
      return "Coba ubah satu variabel saja terlebih dahulu, amati grafiknya, baru ubah variabel kedua. Mengapa isolasi variabel penting?";
    }
    if (currentPhase === "transfer") {
      return "Perhatikan konteks nyatanya: di mana titik henti atau batas aman yang ditargetkan oleh skenario?";
    }
    if (mistakesOnTopic > 1) {
      return "Tidak apa-apa! Kesalahan adalah data awal pemahaman. Coba buka kembali petunjuk tingkat 2 untuk melihat prinsip dasarnya.";
    }
    return "Ingat, rumus fisika dan matematika adalah model penyederhanaan dari apa yang kamu lihat di kanvas interaktif.";
  };

  return (
    <>
      {/* Floating Socratic Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition duration-200 border border-indigo-400/30 font-bold text-xs"
        aria-label="Buka AI Tutor Kontekstual"
      >
        <Bot className="w-4 h-4" />
        <span>Tutor Socratic Nalar</span>
        <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
      </button>

      {/* Tutor Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Tutor Kontekstual Nalar</h3>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Fokus: {topicTitle} ({currentPhase})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 transition"
                aria-label="Tutup Tutor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Learner Context Telemetry */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl">
              <div>
                <span className="text-neutral-500 block">Penguasaan</span>
                <span className="text-indigo-400 font-bold">{conceptualScore}%</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Petunjuk</span>
                <span className="text-sky-400 font-bold">{hintsUsedCount} Level</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Evaluasi</span>
                <span className="text-emerald-400 font-bold">Aktif</span>
              </div>
            </div>

            {/* Socratic Message */}
            <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pertanyaan Pemandu (Socratic Guidance)</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                "{getSocraticPrompt()}"
              </p>
            </div>

            {/* Hint Suggestion */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              <span>Tutor ini memandu pola pikir, bukan memberi contekan.</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
              >
                <span>Lanjutkan Eksperimen</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
