"use client";

import React, { useEffect } from "react";
import { ExplanationContent } from "@/types/level";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { KaTeXView } from "@/components/ui/KaTeXView";
import { Button } from "@/components/ui/Button";
import { Volume2, Lightbulb, ArrowRight } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useNai } from "@/components/nai/NaiContext";

export interface ExplanationStepProps {
  content: ExplanationContent;
  onNext: () => void;
}

export function ExplanationStep({ content, onNext }: ExplanationStepProps) {
  const { speakText, isSpeaking } = useAccessibility();
  const { say } = useNai();

  useEffect(() => {
    say(content.conceptText, {
      expression: "teaching",
    });
  }, [content, say]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header with Nai Avatar */}
      <div className="flex items-center gap-4 p-5 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl">
        <div className="shrink-0 p-1.5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
          <NaiExpressions expression="teaching" size={68} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
              Konsep Dipandu oleh Nai
            </span>
            <button
              type="button"
              onClick={() => speakText(content.audioNarrationText || content.conceptText)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
              aria-label="Dengarkan penjelasan audio"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
              <span>Dengarkan</span>
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {content.title}
          </h2>
        </div>
      </div>

      {/* Concept Body */}
      <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4 shadow-lg text-sm text-neutral-200 leading-relaxed">
        <p className="text-base font-medium text-neutral-100">{content.conceptText}</p>

        {/* Analogy Box */}
        {content.analogyText && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Analogi Intuitif
              </span>
              <p className="text-xs sm:text-sm text-amber-100">{content.analogyText}</p>
            </div>
          </div>
        )}

        {/* Key Formulas */}
        {content.keyFormulas && content.keyFormulas.length > 0 && (
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              Rumus Kunci
            </span>
            <div className="flex flex-col gap-2 overflow-x-auto py-1">
              {content.keyFormulas.map((formula, idx) => (
                <div key={idx} className="text-center py-1">
                  <KaTeXView math={formula} displayMode />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {content.actionText || "Lanjut ke Simulasi"}
        </Button>
      </div>
    </div>
  );
}
