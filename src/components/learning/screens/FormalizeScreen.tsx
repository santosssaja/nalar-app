"use client";

import React, { useState } from "react";
import { FormalizeConfig } from "@/types/level";
import { FileText, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KaTeXView } from "@/components/ui/KaTeXView";

export interface FormalizeScreenProps {
  config: FormalizeConfig;
  onNext: () => void;
}

export function FormalizeScreen({ config, onNext }: FormalizeScreenProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const handleSelect = (blankId: string, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [blankId]: value,
    }));
  };

  const isComplete = config.blanks.every(
    (b) => selectedAnswers[b.id] === b.correctOption
  );

  // Compute rendered LaTeX template with filled or placeholder blanks
  let renderedTemplate = config.formulaTemplate;
  config.blanks.forEach((b) => {
    const val = selectedAnswers[b.id];
    const placeholder = val ? `\\mathbf{${val}}` : `\\underline{\\phantom{xx}?\\phantom{xx}}`;
    renderedTemplate = renderedTemplate.replace(`[${b.id}]`, placeholder);
  });

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              {config.title}
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              {config.prompt}
            </p>
          </div>
        </div>

        {isComplete && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0 text-xs py-1.5 font-bold"
          >
            Uji Pemahaman
          </Button>
        )}
      </div>

      {/* Main Center Stage Card */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-4 bg-neutral-900/80 border border-neutral-800 rounded-3xl shadow-xl overflow-y-auto space-y-5 sm:space-y-6">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Merumuskan Kesimpulan Ilmiah</span>
          </div>
          <h3 className="text-base sm:text-xl font-black text-white">
            {config.prompt}
          </h3>
          <p className="text-xs text-neutral-400">
            Pilihlah komponen yang tepat untuk melengkapi persamaan di bawah ini:
          </p>
        </div>

        {/* Interactive Blanks Container */}
        <div className="w-full max-w-xl p-4 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-inner space-y-4">
          <div className="text-center py-2 overflow-x-auto max-w-full">
            <KaTeXView
              math={renderedTemplate}
              displayMode
              className="text-sm sm:text-lg text-neutral-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
            {config.blanks.map((blank) => {
              const currentChoice = selectedAnswers[blank.id];
              return (
                <div key={blank.id} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                    {blank.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {blank.options.map((opt) => {
                      const isSelected = currentChoice === opt;
                      const isCorrect = opt === blank.correctOption;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelect(blank.id, opt)}
                          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                            isSelected
                              ? isCorrect
                                ? "bg-emerald-600/30 border-emerald-500 text-emerald-200"
                                : "bg-rose-600/30 border-rose-500 text-rose-200"
                              : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolved KaTeX Equation Display */}
        {isComplete && (
          <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-fade-in shadow-xl">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Persamaan Berhasil Dirumuskan!</span>
            </div>
            <div className="py-1 overflow-x-auto max-w-full">
              <KaTeXView
                math={config.resolvedFormulaKaTeX}
                displayMode
                className="text-base sm:text-xl font-bold text-emerald-300"
              />
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto">
              {config.explanation}
            </p>
          </div>
        )}

        <div className="w-full max-w-sm pt-2">
          <Button
            variant="primary"
            size="md"
            disabled={!isComplete}
            onClick={onNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full text-xs font-bold py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
          >
            {isComplete ? "Lanjut ke Cek Pemahaman →" : "Lengkapi semua bagian rumus"}
          </Button>
        </div>
      </div>
    </div>
  );
}
