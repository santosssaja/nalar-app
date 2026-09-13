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
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch p-4 sm:p-5 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl overflow-hidden">
        {/* Left Column: Avatar + Title + Audio + Analogy */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-1 rounded-xl bg-neutral-900 border border-neutral-800">
                <NaiExpressions expression="teaching" size={54} />
              </div>
              <button
                type="button"
                onClick={() => speakText(content.audioNarrationText || content.conceptText)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
                aria-label="Dengarkan penjelasan audio"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
                <span>Dengarkan</span>
              </button>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                Konsep Dipandu oleh Nai
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {content.title}
              </h2>
            </div>
          </div>

          {/* Analogy Box */}
          {content.analogyText && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  Analogi Intuitif
                </span>
                <p className="text-xs text-amber-100/90 leading-relaxed">{content.analogyText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Concept Text + Key Formulas + Action CTA */}
        <div className="md:col-span-7 flex flex-col justify-between gap-3 p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/60">
          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
            <p className="text-sm font-medium text-neutral-200 leading-relaxed">
              {content.conceptText}
            </p>

            {/* Key Formulas */}
            {content.keyFormulas && content.keyFormulas.length > 0 && (
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Rumus Kunci
                </span>
                <div className="flex flex-col gap-1 overflow-x-auto py-0.5">
                  {content.keyFormulas.map((formula, idx) => (
                    <div key={idx} className="text-center py-0.5 text-sm">
                      <KaTeXView math={formula} displayMode />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="flex justify-end pt-1 border-t border-neutral-800/80">
            <Button
              variant="primary"
              size="md"
              onClick={onNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="text-xs font-bold px-6 shadow-md shadow-indigo-600/30"
            >
              {content.actionText || "Lanjut ke Eksplorasi"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
