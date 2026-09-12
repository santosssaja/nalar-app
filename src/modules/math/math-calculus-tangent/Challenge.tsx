"use client";

import React, { useState } from "react";
import { CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { tangentLesson } from "./content";
import { TangentCanvasState } from "./engine";

interface ChallengeProps {
  currentState: TangentCanvasState;
}

export function Challenge({ currentState }: ChallengeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { completeChallenge, progress } = useGamification();
  const { speakText } = useAccessibility();

  const challenges = tangentLesson.challenges;
  const currentChallenge = challenges[activeIndex];
  const challengeId = `challenge-tangent-${activeIndex + 1}`;
  const isAlreadySolved = progress.solvedChallenges.includes(challengeId);

  const handleCheckSolution = () => {
    const varsMap: Record<string, number> = {
      a: currentState.a,
      deltaX: currentState.deltaX,
    };

    const passed = currentChallenge.targetCondition(varsMap);

    if (passed) {
      setIsSuccess(true);
      setFailedAttempts(0);
      setHint(null);

      completeChallenge({
        topicSlug: "math-calculus-tangent",
        challengeId,
        xpReward: 50,
      });

      speakText("Luar biasa! Target kalkulus turunan tercapai dengan tepat.");
    } else {
      setIsSuccess(false);
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 2 && !hint) {
        setHint(currentChallenge.hintText);
        speakText(currentChallenge.hintText);
      } else {
        speakText("Nilai belum memenuhi target tantangan. Coba sesuaikan nilai titik a atau delta x.");
      }
    }
  };

  const handleNextChallenge = () => {
    if (activeIndex < challenges.length - 1) {
      setActiveIndex(activeIndex + 1);
      setIsSuccess(false);
      setFailedAttempts(0);
      setHint(null);
    }
  };

  return (
    <div
      role="region"
      aria-label="Tantangan Logika Kalkulus Garis Singgung"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-neutral-100 text-sm">
            Tantangan Kalkulus {activeIndex + 1} dari {challenges.length}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {challenges.map((_, idx) => {
            const isDone = progress.solvedChallenges.includes(`challenge-tangent-${idx + 1}`);
            const isCurrent = idx === activeIndex;
            return (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isCurrent
                    ? "bg-amber-400 ring-2 ring-amber-500/40"
                    : isDone
                    ? "bg-emerald-500"
                    : "bg-neutral-700"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
        <p className="text-neutral-200 text-sm font-medium leading-relaxed">
          {currentChallenge.question}
        </p>

        {isAlreadySolved && !isSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Tantangan ini telah diselesaikan sebelumnya! (+50 XP diperoleh)</span>
          </div>
        )}
      </div>

      {hint && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300">Petunjuk Konseptual Nai:</span>
            <p className="leading-relaxed">{hint}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/70 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">Benar! Intuisi limit dan garis singgung Anda tepat.</span>
          </div>
          {activeIndex < challenges.length - 1 && (
            <button
              type="button"
              onClick={handleNextChallenge}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition-all shadow"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {!isSuccess && failedAttempts > 0 && (
        <div className="flex items-center gap-2 text-xs text-rose-400 font-medium px-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Parameter belum memenuhi target ({failedAttempts}x percobaan). Terus eksplorasi!</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            setHint(currentChallenge.hintText);
            speakText(currentChallenge.hintText);
          }}
          className="text-xs text-neutral-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Minta Petunjuk</span>
        </button>

        <button
          type="button"
          onClick={handleCheckSolution}
          className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
        >
          Periksa Solusi
        </button>
      </div>
    </div>
  );
}
