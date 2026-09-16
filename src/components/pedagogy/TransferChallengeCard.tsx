"use client";

import React, { useState } from "react";
import { TransferChallengeSpec } from "@/lib/curriculum/pedagogy-types";
import { Globe, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";

interface TransferChallengeCardProps {
  transferSpec: TransferChallengeSpec;
  currentVariables: Record<string, number>;
  onComplete?: (xp: number) => void;
}

export function TransferChallengeCard({
  transferSpec,
  currentVariables,
  onComplete,
}: TransferChallengeCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const isSatisfied = transferSpec.targetCondition(currentVariables);

  const handleVerify = () => {
    if (isSatisfied && !isCompleted) {
      setIsCompleted(true);
      onComplete?.(transferSpec.xpReward);
    }
  };

  return (
    <section className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
              Tantangan Transfer Dunia Nyata (Real-World Transfer)
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              {transferSpec.title}
            </h3>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
          +{transferSpec.xpReward} XP
        </span>
      </div>

      {/* Real World Scenario */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
          Skenario Kasus Nyata
        </span>
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
          {transferSpec.realWorldScenario}
        </p>
      </div>

      {/* Task Prompt */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
          Tugas Rekayasa Anda:
        </span>
        <p className="text-xs sm:text-sm text-neutral-300 font-medium">
          {transferSpec.taskPrompt}
        </p>
      </div>

      {/* Verification & Reflection */}
      {isCompleted ? (
        <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Tantangan Transfer Berhasil Diselesaikan!</span>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed">
            {transferSpec.solutionExplanation}
          </p>
          <div className="pt-2 border-t border-emerald-800/30 text-xs text-neutral-300">
            <b className="text-white block mb-1">Refleksi Kritis:</b>
            {transferSpec.reflectionPrompt}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="text-xs text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Manipulasi variabel pada simulator di atas untuk memenuhi target
          </span>
          <button
            type="button"
            onClick={handleVerify}
            disabled={!isSatisfied}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isSatisfied
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 cursor-pointer"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <span>Verifikasi Solusi Kasus</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
