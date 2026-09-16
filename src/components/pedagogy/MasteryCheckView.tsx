"use client";

import React, { useState } from "react";
import { MasteryAssessmentItem } from "@/lib/curriculum/pedagogy-types";
import { useLearner } from "@/context/LearnerContext";
import { Award, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface MasteryCheckViewProps {
  topicId: string;
  items: MasteryAssessmentItem[];
  onComplete?: () => void;
}

export function MasteryCheckView({ topicId, items, onComplete }: MasteryCheckViewProps) {
  const { updateTopicMastery, recordActivity } = useLearner();
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (itemId: string, optionId: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [itemId]: optionId }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    items.forEach((item) => {
      const selected = item.options.find((o) => o.id === userAnswers[item.id]);
      const isSuccess = !!selected?.isCorrect;
      if (isSuccess) {
        correctCount += 1;
        updateTopicMastery(topicId, { [item.dimension]: 15 });
      }
      recordActivity({
        topicId,
        topicTitle: topicId,
        activityId: item.id,
        activityType: "mastery_check",
        route: `/topics/${topicId}`,
        success: isSuccess,
      });
    });
    setSubmitted(true);
    onComplete?.();
  };

  const allAnswered = items.every((item) => userAnswers[item.id]);
  const correctCount = items.filter((item) => {
    const selected = item.options.find((o) => o.id === userAnswers[item.id]);
    return selected?.isCorrect;
  }).length;

  return (
    <section className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
              Evaluasi 5 Dimensi Kemahiran STEM
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Mastery Check Matrix
            </h3>
          </div>
        </div>

        {submitted && (
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Skor: {correctCount} / {items.length} Benar
          </span>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item, index) => {
          const selectedId = userAnswers[item.id];
          const selectedOpt = item.options.find((o) => o.id === selectedId);

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-800 text-indigo-300 font-semibold uppercase">
                  Dimensi {index + 1}: {item.dimensionLabel}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-100 font-medium leading-relaxed">
                {item.question}
              </p>

              <div className="space-y-2 pt-1">
                {item.options.map((opt) => {
                  const isPicked = selectedId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(item.id, opt.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-start gap-2.5 ${
                        isPicked
                          ? "bg-indigo-600/15 border-indigo-500 text-white font-semibold"
                          : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        {isPicked ? "✓" : ""}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && selectedOpt && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 border animate-fade-in ${
                    selectedOpt.isCorrect
                      ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-200"
                      : "bg-rose-950/40 border-rose-800/40 text-rose-200"
                  }`}
                >
                  {selectedOpt.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <p>{selectedOpt.feedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-2 border-t border-neutral-800">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={calculateScore}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
              allAnswered
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            Kirim Evaluasi & Perbarui Matriks Penguasaan 5D
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setUserAnswers({});
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ulangi Evaluasi</span>
          </button>
        )}
      </div>
    </section>
  );
}
