"use client";

import React, { useState } from "react";
import { CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { euclidLesson } from "./content";
import { EuclidState } from "./Controls";

interface ChallengeProps {
  currentState: EuclidState;
}

export function Challenge({ currentState }: ChallengeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { completeChallenge, progress } = useGamification();
  const { speakText } = useAccessibility();

  const challenges = euclidLesson.challenges;
  const currentChallenge = challenges[activeIndex];
  const challengeId = `challenge-euclid-${activeIndex + 1}`;
  const isAlreadySolved = progress.solvedChallenges.includes(challengeId);

  const handleCheckSolution = () => {
    const varsMap: Record<string, number> = {
      width: currentState.width,
      height: currentState.height,
    };

    const passed = currentChallenge.targetCondition(varsMap);

    if (passed) {
      setIsSuccess(true);
      setFailedAttempts(0);
      setHint(null);

      completeChallenge({
        topicSlug: "math-euclid",
        challengeId,
        xpReward: 50,
      });

      speakText("Luar biasa! Target pengubinan Euclid tercapai dengan tepat.");
    } else {
      setIsSuccess(false);
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 2 && !hint) {
        setHint(currentChallenge.hintText);
        speakText(currentChallenge.hintText);
      } else {
        speakText("Dimensi belum memenuhi target. Coba sesuaikan slider lebar atau tinggi.");
      }
    }
  };

  const handleNextChallenge = () => {
    if (activeIndex < challenges.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setIsSuccess(false);
      setHint(null);
      setFailedAttempts(0);
    }
  };

  return (
    <div
      role="region"
      aria-label="Tantangan Logika Pengubinan Euclid"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4"
    >
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white">Tantangan Logika</h3>
        </div>
        <div className="flex gap-1.5">
          {challenges.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsSuccess(false);
                setHint(null);
              }}
              className={`w-6 h-6 rounded-full text-xs font-bold transition flex items-center justify-center ${
                activeIndex === idx
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : progress.solvedChallenges.includes(`challenge-euclid-${idx + 1}`)
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
              aria-label={`Pilih tantangan ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Question */}
      <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
          Misi #{activeIndex + 1}
        </span>
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
          {currentChallenge.question}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCheckSolution}
          className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Verifikasi Solusi</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setHint(currentChallenge.hintText);
            speakText(currentChallenge.hintText);
          }}
          className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition flex items-center gap-1"
          aria-label="Minta petunjuk"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Petunjuk</span>
        </button>

        {isSuccess && activeIndex < challenges.length - 1 && (
          <button
            type="button"
            onClick={handleNextChallenge}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 animate-bounce"
          >
            <span>Lanjut</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Feedback Banner */}
      {isSuccess && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Hebat! Tantangan berhasil diselesaikan (+50 XP).</span>
        </div>
      )}

      {failedAttempts > 0 && !isSuccess && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium animate-fade-in">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Belum sesuai target (Percobaan {failedAttempts}). Cek petunjuk jika perlu bantuan!</span>
        </div>
      )}

      {hint && (
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-1 animate-fade-in">
          <span className="font-bold block text-indigo-400">💡 Bantuan NAI:</span>
          <p className="leading-relaxed">{hint}</p>
        </div>
      )}

      {isAlreadySolved && (
        <p className="text-[11px] text-neutral-500 text-center">
          ✓ Kamu telah menyelesaikan tantangan ini sebelumnya.
        </p>
      )}
    </div>
  );
}
