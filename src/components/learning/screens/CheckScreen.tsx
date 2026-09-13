"use client";

import React, { useState } from "react";
import { CheckConfig } from "@/types/level";
import { CheckCircle2, ArrowRight, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CheckScreenProps {
  config: CheckConfig;
  onNext: () => void;
}

export function CheckScreen({ config, onNext }: CheckScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isTrueFalse = config.checkType === "true_false";

  const isCorrect = isTrueFalse
    ? selectedAnswer === config.trueFalseAnswer
    : Boolean(config.options?.find((o) => o.id === selectedAnswer)?.isCorrect);

  const selectedOption = !isTrueFalse
    ? config.options?.find((o) => o.id === selectedAnswer)
    : null;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 animate-fade-in overflow-y-auto md:overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black text-white truncate leading-tight">
              Cek Pemahaman Cepat
            </h2>
            <p className="text-[11px] text-neutral-400 truncate leading-tight">
              Verifikasi pemahaman konsepmu sebelum menghadapi tantangan.
            </p>
          </div>
        </div>

        {hasSubmitted && isCorrect && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0 text-xs py-1.5 font-bold"
          >
            Lanjut
          </Button>
        )}
      </div>

      {/* Main Center Stage */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-neutral-900/80 border border-neutral-800 rounded-3xl shadow-xl overflow-y-auto space-y-5 sm:space-y-6">
        <div className="w-full max-w-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Pertanyaan Konseptual</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {config.question}
          </h3>

          {/* True / False Choice */}
          {isTrueFalse && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAnswer(true);
                  setHasSubmitted(true);
                }}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedAnswer === true
                    ? isCorrect
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-200"
                      : "bg-rose-600/20 border-rose-500 text-rose-200"
                    : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>BENAR</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAnswer(false);
                  setHasSubmitted(true);
                }}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedAnswer === false
                    ? isCorrect
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-200"
                      : "bg-rose-600/20 border-rose-500 text-rose-200"
                    : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>SALAH</span>
              </button>
            </div>
          )}

          {/* Multiple Choice Options */}
          {!isTrueFalse && config.options && (
            <div className="space-y-2 pt-2">
              {config.options.map((opt) => {
                const isSelected = selectedAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedAnswer(opt.id);
                      setHasSubmitted(true);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                      isSelected
                        ? opt.isCorrect
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-200 font-semibold"
                          : "bg-rose-600/20 border-rose-500 text-rose-200 font-semibold"
                        : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation Banner */}
          {hasSubmitted && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1.5 animate-fade-in ${
                isCorrect
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Tepat Sekali!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-400">Coba Pikirkan Kembali:</span>
                  </>
                )}
              </div>
              <p>{selectedOption ? selectedOption.explanation : config.explanation}</p>
            </div>
          )}
        </div>

        <div className="w-full max-w-sm pt-2">
          {hasSubmitted && isCorrect ? (
            <Button
              variant="primary"
              size="md"
              onClick={onNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs font-bold py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500"
            >
              Lanjut ke Langkah Berikutnya →
            </Button>
          ) : (
            <p className="text-[11px] text-neutral-500 text-center">
              Pilih salah satu jawaban di atas untuk memverifikasi nalar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
