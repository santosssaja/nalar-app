"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Level, Step } from "@/types/level";
import { ExplanationStep } from "./ExplanationStep";
import { PlaygroundStep } from "./PlaygroundStep";
import { ChallengeStep } from "./ChallengeStep";
import { ValidationStep } from "./ValidationStep";
import { ProvokeScreen } from "./screens/ProvokeScreen";
import { PredictScreen } from "./screens/PredictScreen";
import { GuidedScreen } from "./screens/GuidedScreen";
import { FormalizeScreen } from "./screens/FormalizeScreen";
import { CheckScreen } from "./screens/CheckScreen";
import { ReflectScreen } from "./screens/ReflectScreen";
import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Compass,
  FileText,
  Gamepad2,
  Target,
  Award,
  BookOpen,
} from "lucide-react";
import { useNai } from "@/components/nai/NaiContext";
import { getLevelToken } from "@/lib/curriculum/level-token";

export interface StepRendererProps {
  topicSlug: string;
  level: Level;
  totalLevels?: number;
}

function getStepMeta(step: Step, index: number) {
  switch (step.type) {
    case "provoke":
      return { label: "Pemantik", icon: Sparkles, color: "text-amber-400" };
    case "predict":
      return { label: "Prediksi", icon: HelpCircle, color: "text-blue-400" };
    case "guided":
      return { label: "Eksplorasi", icon: Compass, color: "text-cyan-400" };
    case "formalize":
      return { label: "Rumus", icon: FileText, color: "text-purple-400" };
    case "check":
      return { label: "Kuis", icon: CheckCircle2, color: "text-rose-400" };
    case "sandbox":
    case "playground":
      return { label: "Sandbox", icon: Gamepad2, color: "text-emerald-400" };
    case "challenge":
      return { label: "Tantangan", icon: Target, color: "text-amber-400" };
    case "reflect":
    case "validation":
      return { label: "Refleksi", icon: Award, color: "text-yellow-400" };
    case "explanation":
      return { label: "Konsep", icon: BookOpen, color: "text-indigo-400" };
    default:
      return { label: `Langkah ${index + 1}`, icon: Layers, color: "text-neutral-400" };
  }
}

export function StepRenderer({ topicSlug, level, totalLevels }: StepRendererProps) {
  const router = useRouter();
  const { say } = useNai();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = level.steps;
  const currentStep = steps[currentStepIndex];

  // Auto trigger Nai commentary for current step if available with auto-dismiss
  useEffect(() => {
    if (currentStep?.naiDialogue) {
      say(currentStep.naiDialogue, {
        expression: currentStep.naiExpression || "neutral",
        autoDismissMs: 4000,
      });
    }
  }, [currentStepIndex, currentStep, say]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinishLevel();
    }
  };

  const handleFinishLevel = () => {
    if (totalLevels && level.index < totalLevels) {
      // Smooth auto-progression to next unlocked level token
      const nextToken = getLevelToken(topicSlug, level.index + 1);
      router.push(`/topics/${topicSlug}/${nextToken}`);
    } else {
      // Completed last level or returning to map
      router.push(`/topics/${topicSlug}`);
    }
  };

  if (!currentStep) return null;

  return (
    <div className="w-full h-full max-w-6xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
      {/* Dynamic Compact Top Navigation Bar */}
      <header className="shrink-0 flex items-center justify-between gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-md">
        <Link
          href={`/topics/${topicSlug}`}
          className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition shadow-sm shrink-0"
          aria-label="Kembali ke Peta Level"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Peta Level</span>
        </Link>

        {/* Mobile Step Badge */}
        <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-950/70 border border-indigo-800/60 text-xs font-bold text-indigo-300 shrink-0">
          {(() => {
            const currentMeta = getStepMeta(currentStep, currentStepIndex);
            const StepIcon = currentMeta.icon;
            return (
              <>
                <StepIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentStepIndex + 1}/{steps.length} {currentMeta.label}</span>
              </>
            );
          })()}
        </div>

        {/* Desktop Responsive Step Segment Indicators */}
        <div className="hidden md:flex items-center gap-1 sm:gap-1.5 py-0.5">
          {steps.map((s, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const meta = getStepMeta(s, idx);
            const Icon = meta.icon;

            return (
              <button
                key={s.id || idx}
                type="button"
                onClick={() => {
                  if (idx <= currentStepIndex) {
                    setCurrentStepIndex(idx);
                  }
                }}
                disabled={idx > currentStepIndex}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-xl text-xs font-semibold transition shrink-0 ${
                  isCurrent
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : isCompleted
                    ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60 cursor-pointer"
                    : "bg-neutral-950/60 border border-neutral-800 text-neutral-600 cursor-not-allowed opacity-60"
                }`}
                title={`${idx + 1}. ${meta.label}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <Icon className={`w-3 h-3 ${isCurrent ? "text-white" : meta.color} shrink-0`} />
                )}
                <span className="text-[11px]">{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Level Title Pill */}
        <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300 font-bold shrink-0">
          <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate max-w-[80px] sm:max-w-[200px]">
            <span className="sm:hidden">Lvl {level.index}</span>
            <span className="hidden sm:inline">Lvl {level.index}: {level.title}</span>
          </span>
        </div>
      </header>

      {/* Dynamic Step Body (Scrollable on mobile, single screen on desktop) */}
      <main className="flex-1 min-h-0 w-full flex flex-col justify-start md:justify-center overflow-y-auto md:overflow-hidden py-1">
        {currentStep.type === "provoke" && currentStep.provoke && (
          <ProvokeScreen config={currentStep.provoke} onNext={handleNextStep} />
        )}

        {currentStep.type === "predict" && currentStep.predict && (
          <PredictScreen config={currentStep.predict} onNext={handleNextStep} />
        )}

        {currentStep.type === "guided" && currentStep.guided && (
          <GuidedScreen config={currentStep.guided} onNext={handleNextStep} />
        )}

        {currentStep.type === "formalize" && currentStep.formalize && (
          <FormalizeScreen config={currentStep.formalize} onNext={handleNextStep} />
        )}

        {currentStep.type === "check" && currentStep.check && (
          <CheckScreen config={currentStep.check} onNext={handleNextStep} />
        )}

        {(currentStep.type === "sandbox" || currentStep.type === "playground") &&
          (currentStep.sandbox || currentStep.playground) && (
            <PlaygroundStep
              config={(currentStep.sandbox || currentStep.playground)!}
              onNext={handleNextStep}
            />
          )}

        {currentStep.type === "challenge" && currentStep.challenge && (
          <ChallengeStep
            topicSlug={topicSlug}
            levelIndex={level.index}
            config={currentStep.challenge}
            onSuccessNext={handleNextStep}
          />
        )}

        {currentStep.type === "reflect" && currentStep.reflect && (
          <ReflectScreen
            config={currentStep.reflect}
            onNext={handleFinishLevel}
            isLastLevel={totalLevels ? level.index >= totalLevels : false}
          />
        )}

        {/* Legacy Step Renderers for Backward Compatibility */}
        {currentStep.type === "explanation" && currentStep.explanation && (
          <ExplanationStep
            content={currentStep.explanation}
            onNext={handleNextStep}
          />
        )}

        {currentStep.type === "validation" && currentStep.validation && (
          <ValidationStep
            config={currentStep.validation}
            topicSlug={topicSlug}
            onFinishLevel={handleFinishLevel}
          />
        )}
      </main>
    </div>
  );
}
