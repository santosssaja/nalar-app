"use client";

import React, { useState } from "react";
import { PredictionSpec } from "@/lib/curriculum/pedagogy-types";
import { Lightbulb, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

interface PredictionCardProps {
  prediction: PredictionSpec;
  onPredictionSubmitted?: (optionId: string) => void;
}

export function PredictionCard({ prediction, onPredictionSubmitted }: PredictionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const selectedOpt = prediction.options.find((o) => o.id === selectedId);

  const handleSubmit = () => {
    if (selectedId) {
      setHasSubmitted(true);
      onPredictionSubmitted?.(selectedId);
    }
  };

  return (
    <section className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Tahap Prediksi (Sebelum Simulasi)
          </span>
          <h3 className="text-sm font-bold text-white">{prediction.prompt}</h3>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
        {prediction.question}
      </p>

      {/* Options List */}
      <div className="space-y-2.5">
        {prediction.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasSubmitted}
              onClick={() => setSelectedId(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start justify-between gap-3 ${
                isSelected
                  ? "bg-indigo-600/15 border-indigo-500 text-white font-semibold"
                  : "bg-neutral-800/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700"
              } ${hasSubmitted ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`w-4 h-4 rounded-full mt-0.5 shrink-0 border flex items-center justify-center text-[10px] font-bold ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-600 text-white"
                      : "border-neutral-600 bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {isSelected ? "✓" : ""}
                </span>
                <span>{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action / Result Feedback */}
      {!hasSubmitted ? (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!selectedId}
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedId
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <span>Kunci Prediksi & Jalankan Simulasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* User Prediction */}
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">
                Prediksi Anda
              </span>
              <p className="text-neutral-200">{selectedOpt?.text}</p>
            </div>

            {/* What Actually Happened */}
            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-lg space-y-1">
              <span className="text-[10px] text-indigo-300 uppercase font-bold block">
                Hasil Eksperimen Sebenarnya
              </span>
              <p className="text-indigo-200">{prediction.whatActuallyHappened}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-neutral-300">
            {selectedOpt?.isCorrect ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{selectedOpt?.explanation}</p>
          </div>
        </div>
      )}
    </section>
  );
}
