"use client";

import React, { useState } from "react";
import { CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trophy } from "lucide-react";
import { Challenge as ChallengeType } from "@/types/topic";
import { DeterminantCanvasState } from "./engine";
import { useGamification } from "@/context/GamificationContext";
import { useAccessibility } from "@/context/AccessibilityContext";

interface ChallengeProps {
  challenges: ChallengeType[];
  topicSlug: string;
  currentState: DeterminantCanvasState;
}

export function Challenge({ challenges, topicSlug, currentState }: ChallengeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { completeChallenge, progress } = useGamification();
  const { speakText } = useAccessibility();

  const currentChallenge = challenges[activeIndex];
  const isAlreadySolved = progress.solvedChallenges.includes(currentChallenge.id);

  const handleCheckSolution = () => {
    setIsEvaluating(true);
    const varsMap = {
      i_hat_x: currentState.i_hat_x,
      i_hat_y: currentState.i_hat_y,
      j_hat_x: currentState.j_hat_x,
      j_hat_y: currentState.j_hat_y,
    };

    const passed = currentChallenge.targetCondition(varsMap);

    if (passed) {
      setIsSuccess(true);
      setFailedAttempts(0);
      setHint(null);

      completeChallenge({
        topicSlug,
        challengeId: currentChallenge.id,
        xpReward: currentChallenge.xpReward,
        badgeToUnlock: activeIndex === 2 ? "matrix-master" : undefined,
      });

      speakText(currentChallenge.successMessage);
    } else {
      setIsSuccess(false);
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 2 && !hint) {
        requestHint(nextFails);
      } else {
        speakText("Jawaban belum tepat. Perhatikan nilai determinan dan geser kembali vektor.");
      }
    }

    setIsEvaluating(false);
  };

  const requestHint = async (fails = failedAttempts) => {
    try {
      // Event-driven AI Tutor call to FastAPI backend
      const res = await fetch("http://127.0.0.1:8000/api/v1/ai-tutor/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_slug: topicSlug,
          challenge_id: currentChallenge.id,
          current_variables: { ...currentState },
          failed_attempts: fails,
          previous_hints_count: hint ? 1 : 0,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setHint(data.hint_text);
        speakText(data.audio_summary);
        return;
      }
    } catch {
      // Graceful offline degradation to static curated hint
    }

    setHint(currentChallenge.hintText);
    speakText(currentChallenge.hintText);
  };

  const nextChallenge = () => {
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
      aria-label="Tantangan Logika Interaktif"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-xl space-y-4"
    >
      {/* Header & Mission Selector */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm">Teka-Teki Logika Spasial</h3>
        </div>
        <div className="flex items-center gap-1.5">
          {challenges.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsSuccess(false);
                setHint(null);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                idx === activeIndex
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : progress.solvedChallenges.includes(c.id)
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
              aria-label={`Pilih tantangan ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Title & Question */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-white">{currentChallenge.title}</h4>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            +{currentChallenge.xpReward} XP
          </span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {currentChallenge.question}
        </p>
      </div>

      {/* Evaluation Feedback */}
      {isSuccess ? (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tantangan Terselesaikan!</span>
          </div>
          <p className="text-[11px] leading-relaxed">{currentChallenge.successMessage}</p>
          {activeIndex < challenges.length - 1 && (
            <button
              type="button"
              onClick={nextChallenge}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              <span>Lanjut ke Misi Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : failedAttempts > 0 ? (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Kondisi belum tepat ({failedAttempts}x percobaan). Amati nilai determinan lalu sesuaikan kembali.</span>
        </div>
      ) : null}

      {/* Progressive Hint Box */}
      {hint && (
        <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-700 text-indigo-200 text-xs space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-indigo-300">
            <HelpCircle className="w-3.5 h-3.5" /> Bantuan AI Tutor:
          </span>
          <p className="text-[11px] leading-relaxed">{hint}</p>
        </div>
      )}

      {/* Actions: Check button + On-demand Hint */}
      <div className="pt-2 flex items-center gap-2.5">
        <button
          type="button"
          disabled={isEvaluating}
          onClick={handleCheckSolution}
          className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/20 transition focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {isAlreadySolved ? "Verifikasi Ulang Solusi" : "Periksa Solusi Sekarang"}
        </button>

        <button
          type="button"
          onClick={() => requestHint()}
          className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
          aria-label="Minta petunjuk bertahap dari AI"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Petunjuk</span>
        </button>
      </div>
    </div>
  );
}
