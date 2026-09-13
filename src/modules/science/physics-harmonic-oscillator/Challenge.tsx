"use client";

import React, { useState } from "react";
import { CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { harmonicLesson } from "./content";
import { HarmonicState } from "./engine";

interface ChallengeProps {
  currentState: HarmonicState;
}

export function Challenge({ currentState }: ChallengeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { completeChallenge, progress } = useGamification();
  const { speakText } = useAccessibility();

  const challenges = harmonicLesson.challenges;
  const currentChallenge = challenges[activeIndex];
  const challengeId = `challenge-ghs-${activeIndex + 1}`;
  const isAlreadySolved = progress.solvedChallenges.includes(challengeId);

  const handleCheckSolution = () => {
    const varsMap: Record<string, number> = {
      length: currentState.length,
      initialAngleDeg: currentState.initialAngleDeg,
      gravity: currentState.gravity,
      springConstant: currentState.springConstant,
      mass: currentState.mass,
      amplitude: currentState.amplitude,
    };

    const passed = currentChallenge.targetCondition(varsMap);

    if (passed) {
      setIsSuccess(true);
      setFailedAttempts(0);
      setHint(null);

      completeChallenge({
        topicSlug: "physics-harmonic-oscillator",
        challengeId,
        xpReward: currentChallenge.xpReward || 50,
      });

      speakText(currentChallenge.successMessage || "Luar biasa! Frekuensi dan periode terkalibrasi dengan tepat.");
    } else {
      setIsSuccess(false);
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 2 && !hint) {
        setHint(currentChallenge.hintText);
        speakText(currentChallenge.hintText);
      } else {
        speakText("Belum tepat. Coba sesuaikan panjang tali bandul atau parameter pegas.");
      }
    }
  };

  const handleNextChallenge = () => {
    if (activeIndex < challenges.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setIsSuccess(false);
      setFailedAttempts(0);
      setHint(null);
    }
  };

  return (
    <div
      role="region"
      aria-label="Tantangan Logika Osilator Harmonik"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 text-neutral-100"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-sm tracking-wide uppercase">
            Tantangan Logika #{activeIndex + 1}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{currentChallenge.xpReward || 50} XP</span>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="font-semibold text-white text-sm">{currentChallenge.title}</h5>
        <p className="text-xs text-neutral-300 leading-relaxed">{currentChallenge.question}</p>
      </div>

      {hint && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5 animate-fade-in">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Petunjuk AI Tutor Nai:</span>
            <p className="leading-relaxed text-neutral-300">{hint}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Berhasil!</span>
            <p className="text-neutral-200">{currentChallenge.successMessage}</p>
          </div>
        </div>
      )}

      {!isSuccess && failedAttempts > 0 && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Kondisi osilasi belum terpenuhi. Periksa kembali nilai variabel.</span>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setHint(currentChallenge.hintText);
            speakText(currentChallenge.hintText);
          }}
          className="text-xs text-neutral-400 hover:text-neutral-200 underline underline-offset-4 cursor-pointer"
        >
          Minta Petunjuk
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCheckSolution}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              isAlreadySolved
                ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/40"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
            }`}
          >
            {isAlreadySolved ? "Verifikasi Ulang" : "Cek Jawaban"}
          </button>

          {isSuccess && activeIndex < challenges.length - 1 && (
            <button
              type="button"
              onClick={handleNextChallenge}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition cursor-pointer"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
