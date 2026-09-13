"use client";

import React, { useState } from "react";
import { CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { electricFieldLesson } from "./content";
import { ElectricFieldState } from "./engine";

interface ChallengeProps {
  currentState: ElectricFieldState;
}

export function Challenge({ currentState }: ChallengeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { completeChallenge, progress } = useGamification();
  const { speakText } = useAccessibility();

  const challenges = electricFieldLesson.challenges;
  const currentChallenge = challenges[activeIndex];
  const challengeId = `challenge-electric-field-${activeIndex + 1}`;
  const isAlreadySolved = progress.solvedChallenges.includes(challengeId);

  const handleCheckSolution = () => {
    const varsMap: Record<string, number> = {
      q1: currentState.q1,
      q2: currentState.q2,
      distance: currentState.distance,
      testCharge: currentState.testCharge,
      testPosX: currentState.testPosX,
      testPosY: currentState.testPosY,
    };

    const passed = currentChallenge.targetCondition(varsMap);

    if (passed) {
      setIsSuccess(true);
      setFailedAttempts(0);
      setHint(null);

      completeChallenge({
        topicSlug: "physics-electric-field",
        challengeId,
        xpReward: 40,
      });

      speakText("Luar biasa! Konfigurasi elektrostatik tepat memenuhi target.");
    } else {
      setIsSuccess(false);
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 2 && !hint) {
        setHint(currentChallenge.hintText);
        speakText(currentChallenge.hintText);
      } else {
        speakText("Belum tepat. Cek kembali nilai muatan atau posisi muatan uji.");
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
      className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 text-neutral-200 space-y-3.5"
      aria-label="Tantangan Logika Medan Listrik"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Misi Tantangan #{activeIndex + 1} / {challenges.length}
          </h3>
        </div>
        {isAlreadySolved && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Selesai (+40 XP)
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-neutral-100 leading-relaxed">
        {currentChallenge.question}
      </p>

      {/* Hint Box */}
      {hint && (
        <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-200 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-300 mb-0.5">Petunjuk AI Tutor Nai:</div>
            <div>{hint}</div>
          </div>
        </div>
      )}

      {/* Failure Message */}
      {failedAttempts > 0 && !isSuccess && (
        <div className="p-2.5 bg-rose-950/30 border border-rose-800/50 rounded-lg text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Nilai belum sesuai target. Coba sesuaikan slider di panel kontrol.</span>
        </div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Hebat! Kamu berhasil menuntaskan tantangan ini.</span>
          </div>
          {activeIndex < challenges.length - 1 && (
            <button
              onClick={handleNextChallenge}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium flex items-center gap-1 transition-colors"
            >
              Lanjut <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleCheckSolution}
          className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/50"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Periksa Jawaban
        </button>

        {!hint && failedAttempts >= 1 && (
          <button
            onClick={() => {
              setHint(currentChallenge.hintText);
              speakText(currentChallenge.hintText);
            }}
            className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg font-medium text-xs transition-colors flex items-center gap-1 border border-neutral-700"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Bantuan
          </button>
        )}
      </div>
    </div>
  );
}
