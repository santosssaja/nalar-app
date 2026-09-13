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

      setErrorMessage("Kondisi target belum terpenuhi. Sesuaikan kembali slider kontrol.");

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

  const challengeSidebar = (
    <div className="space-y-2.5 animate-fade-in">
      {/* Compact Challenge Card */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/95 border border-neutral-800 shadow-md space-y-2">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              Tantangan Logika
            </span>
            <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-0.5">
              <Sparkles className="w-3 h-3" /> +{config.xpReward} XP
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRequestHint()}
            disabled={isSolved || isLoadingHint}
            leftIcon={<HelpCircle className="w-3 h-3 text-amber-400" />}
            className="text-[11px] py-1 px-2 h-auto text-neutral-400 hover:text-white"
          >
            {activeHint ? `Petunjuk (${activeHint.hintLevel}/4)` : "Bantuan"}
          </Button>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-black text-white">{config.title}</h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-medium mt-0.5">
            {config.question}
          </p>
        </div>

        {/* Feedback Message */}
        {errorMessage && !isSolved && (
          <div className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold bg-rose-950/40 p-2 rounded-lg border border-rose-800/50">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSolved && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/50">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Target tercapai! +{config.xpReward} XP diperoleh.</span>
          </div>
        )}

        {/* Action Button */}
        <div>
          {!isSolved ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleValidate}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
              className="w-full text-xs font-bold py-1.5"
            >
              Validasi Jawaban
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onSuccessNext}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full text-xs font-bold py-1.5 bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40 shadow-emerald-600/20"
            >
              Lanjut ke Rangkuman
            </Button>
          )}
        </div>
      </div>

      {/* Progressive Hint Scaffolding */}
      {activeHint && (
        <div className="max-h-[160px] overflow-y-auto">
          <HintPanel
            hint={activeHint}
            isLoading={isLoadingHint}
            onClose={() => setActiveHint(null)}
            onApplySolution={handleApplySolution}
          />
        </div>
      )}

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
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-y-auto md:overflow-hidden">
      <ModulePlaygroundEmbed
        slug={topicSlug}
        initialVariables={config.solutionVariables}
        onVariablesChange={setCurrentVariables}
        externalVariables={targetVariables}
        challengeSidebar={challengeSidebar}
      />
    </div>
  );
}
