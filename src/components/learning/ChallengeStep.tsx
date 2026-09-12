"use client";

import React, { useState } from "react";
import { ChallengeConfig } from "@/types/level";
import { ModulePlaygroundEmbed } from "./ModulePlaygroundEmbed";
import { HintPanel } from "./HintPanel";
import { CanvasAutoSolver } from "./CanvasAutoSolver";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, HelpCircle, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useNai } from "@/components/nai/NaiContext";
import { requestProgressiveHint } from "@/lib/hints/hint-engine";
import { HintResponse, UserAttemptSnapshot } from "@/lib/hints/types";

export interface ChallengeStepProps {
  topicSlug: string;
  levelIndex: number;
  config: ChallengeConfig;
  onSuccessNext: () => void;
}

export function ChallengeStep({
  topicSlug,
  levelIndex,
  config,
  onSuccessNext,
}: ChallengeStepProps) {
  const { completeChallenge } = useGamification();
  const { say } = useNai();

  const [currentVariables, setCurrentVariables] = useState<Record<string, number>>({});
  const [targetVariables, setTargetVariables] = useState<Record<string, number> | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [attempts, setAttempts] = useState<UserAttemptSnapshot[]>([]);
  const [activeHint, setActiveHint] = useState<HintResponse | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const [autoSolveTargets, setAutoSolveTargets] = useState<Record<string, number> | null>(null);

  const handleValidate = () => {
    const isCorrect = config.targetCondition(currentVariables);

    if (isCorrect) {
      setIsSolved(true);
      setErrorMessage(null);
      setActiveHint(null);
      completeChallenge({
        topicSlug,
        challengeId: config.id,
        xpReward: config.xpReward,
      });
      say("Luar biasa! Jawaban dan manipulasi kanvasmu tepat sekali!", {
        expression: "celebrating",
        readAloud: true,
      });
    } else {
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      const newAttemptList = [...attempts, { attemptNumber: nextAttempt, canvasSnapshot: currentVariables }];
      setAttempts(newAttemptList);

      setErrorMessage("Kondisi target belum terpenuhi. Periksa kembali nilai atau manipulasi kanvas.");

      // Auto trigger progressive hint on repeated failure
      if (nextAttempt === 2) {
        handleRequestHint(2, newAttemptList);
      } else {
        say("Hmm, belum tepat. Coba perhatikan kembali nilai yang diminta pada soal.", {
          expression: "encouraging",
        });
      }
    }
  };

  const handleRequestHint = async (explicitLevel?: 1 | 2 | 3 | 4, customAttempts?: UserAttemptSnapshot[]) => {
    const nextLevel = explicitLevel || ((Math.min(4, (activeHint?.hintLevel || 0) + 1)) as 1 | 2 | 3 | 4);
    setIsLoadingHint(true);

    try {
      const res = await requestProgressiveHint({
        topicSlug,
        levelIndex,
        challengeId: config.id,
        challengeQuestion: config.question,
        userAttempts: customAttempts || attempts,
        hintLevel: nextLevel,
        hint2Static: config.hint2Static,
        solutionVariables: config.solutionVariables,
        solutionExplanation: config.solutionExplanation,
      });
      setActiveHint(res);
      say(res.text, {
        expression: res.naiMood,
      });
    } catch (e) {
      console.warn("Failed requesting hint:", e);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleApplySolution = (vars: Record<string, number>) => {
    setAutoSolveTargets(vars);
    setIsAutoSolving(true);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Challenge Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Tantangan Logika
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> +{config.xpReward} XP
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRequestHint()}
              disabled={isSolved || isLoadingHint}
              leftIcon={<HelpCircle className="w-3.5 h-3.5 text-amber-400" />}
            >
              {activeHint ? `Petunjuk Berikutnya (${activeHint.hintLevel}/4)` : "Butuh Petunjuk?"}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-white">{config.title}</h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
            {config.question}
          </p>
        </div>

        {/* Validation and Action row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {errorMessage && !isSolved && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSolved && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tantangan Selesai! Kamu berhak atas +{config.xpReward} XP.</span>
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            {!isSolved ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleValidate}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Validasi Jawaban
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={onSuccessNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40 shadow-emerald-600/20"
              >
                Lanjut ke Rangkuman
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Hint Scaffolding */}
      <HintPanel
        hint={activeHint}
        isLoading={isLoadingHint}
        onClose={() => setActiveHint(null)}
        onApplySolution={handleApplySolution}
      />

      {/* Canvas Auto-Solver Animation (Hint 4) */}
      {autoSolveTargets && (
        <CanvasAutoSolver
          isSolving={isAutoSolving}
          currentVariables={currentVariables}
          targetVariables={autoSolveTargets}
          onUpdateVariables={(interpolated) => {
            setTargetVariables(interpolated);
            setCurrentVariables(interpolated);
          }}
          onComplete={() => {
            setIsAutoSolving(false);
            say("Nai telah menggerakkan nilai kanvas ke posisi solusi yang benar. Sekarang klik Validasi Jawaban!", {
              expression: "teaching",
            });
          }}
        />
      )}

      {/* Interactive Playground Canvas */}
      <div className="w-full">
        <ModulePlaygroundEmbed
          slug={topicSlug}
          onVariablesChange={setCurrentVariables}
          externalVariables={targetVariables}
        />
      </div>
    </div>
  );
}
