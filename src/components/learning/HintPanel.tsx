"use client";

import React from "react";
import { HintResponse } from "@/lib/hints/types";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { Volume2, Sparkles, Wand2, X } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { NaiExpression } from "@/components/nai/nai-sprites";

export interface HintPanelProps {
  hint: HintResponse | null;
  isLoading?: boolean;
  onClose: () => void;
  onApplySolution?: (targetVariables: Record<string, number>) => void;
}

export function HintPanel({
  hint,
  isLoading = false,
  onClose,
  onApplySolution,
}: HintPanelProps) {
  const { speakText, isSpeaking } = useAccessibility();

  if (!hint && !isLoading) return null;

  const moodToExpression: Record<string, NaiExpression> = {
    encouraging: "encouraging",
    thinking: "thinking",
    hinting: "hinting",
    teaching: "teaching",
  };

  const expression = hint ? moodToExpression[hint.naiMood] || "neutral" : "thinking";

  return (
    <div
      role="region"
      aria-label="Panel Petunjuk Bertingkat Nai"
      className="w-full p-4 sm:p-5 rounded-3xl bg-neutral-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-md space-y-3.5 animate-fade-in text-neutral-100"
    >
      {/* Header with 4-step progress dots */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
            Sistem 4-Hint Progressive
          </span>
        </div>

        {/* 4 dots indicator */}
        <div className="flex items-center gap-1.5" aria-label={`Tingkat petunjuk ${hint?.hintLevel || 1} dari 4`}>
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={`w-2 h-2 rounded-full transition-all ${
                hint && step <= hint.hintLevel
                  ? step === 4
                    ? "bg-emerald-400 scale-110"
                    : "bg-indigo-400 scale-105"
                  : "bg-neutral-800"
              }`}
            />
          ))}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition ml-2"
            aria-label="Tutup panel petunjuk"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content with Nai avatar */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-1 rounded-2xl bg-neutral-950/60 border border-neutral-800">
          <NaiExpressions expression={expression} size={56} />
        </div>

        <div className="flex-1 space-y-1.5">
          {isLoading ? (
            <div className="space-y-2 py-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-neutral-800 rounded animate-pulse w-1/2" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white">{hint?.title}</h4>
                {hint && (
                  <button
                    type="button"
                    onClick={() => speakText(hint.text)}
                    className="p-1 rounded-md text-neutral-400 hover:text-indigo-300 transition"
                    aria-label="Dengarkan penjelasan petunjuk"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
                  </button>
                )}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">{hint?.text}</p>
            </>
          )}
        </div>
      </div>

      {/* Hint 4 Auto Solver Action */}
      {hint?.hintLevel === 4 && hint.targetVariables && onApplySolution && (
        <div className="pt-2 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={() => onApplySolution(hint.targetVariables!)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition hover:scale-[1.02]"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Terapkan Solusi ke Kanvas Otomatis</span>
          </button>
        </div>
      )}
    </div>
  );
}
