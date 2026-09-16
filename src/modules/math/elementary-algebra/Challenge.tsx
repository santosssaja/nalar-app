"use client";

import React, { useState } from "react";
import { elementaryAlgebraLesson } from "./content";
import { CheckCircle2, AlertCircle, HelpCircle, Trophy } from "lucide-react";

interface ChallengeProps {
  state: { a: number; b: number; c: number; x: number };
  onComplete?: (xp: number) => void;
}

export function Challenge({ state, onComplete }: ChallengeProps) {
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completedList, setCompletedList] = useState<string[]>([]);

  const currentCh = elementaryAlgebraLesson.challenges[activeChallengeIdx];
  const isSatisfied = currentCh?.targetCondition(state as unknown as Record<string, number>);

  const handleVerify = () => {
    if (isSatisfied && currentCh && !completedList.includes(currentCh.id)) {
      setCompletedList([...completedList, currentCh.id]);
      onComplete?.(currentCh.xpReward);
    }
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">
            Tantangan {activeChallengeIdx + 1} dari {elementaryAlgebraLesson.challenges.length}
          </h3>
        </div>
        <div className="flex gap-1.5">
          {elementaryAlgebraLesson.challenges.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                setActiveChallengeIdx(idx);
                setShowHint(false);
              }}
              className={`w-6 h-6 rounded-full text-xs font-bold transition flex items-center justify-center ${
                completedList.includes(ch.id)
                  ? "bg-emerald-600 text-white"
                  : idx === activeChallengeIdx
                  ? "bg-indigo-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-neutral-200">{currentCh?.title}</h4>
        <p className="text-xs text-neutral-300 leading-relaxed">{currentCh?.question}</p>
      </div>

      {showHint && currentCh && (
        <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 animate-fade-in">
          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{currentCh.hintText}</span>
        </div>
      )}

      {completedList.includes(currentCh?.id || "") ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{currentCh?.successMessage} (+{currentCh?.xpReward} XP)</span>
        </div>
      ) : isSatisfied ? (
        <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs text-indigo-300">
          <span>Kondisi setimbang terpenuhi!</span>
          <button
            type="button"
            onClick={handleVerify}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition text-xs"
          >
            Verifikasi Jawaban
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-neutral-400 hover:text-neutral-200 underline font-medium"
          >
            {showHint ? "Sembunyikan Petunjuk" : "Butuh Petunjuk?"}
          </button>
          <span className="flex items-center gap-1 text-neutral-500">
            <AlertCircle className="w-3.5 h-3.5" /> Atur slider variabel x sampai setimbang
          </span>
        </div>
      )}
    </div>
  );
}
