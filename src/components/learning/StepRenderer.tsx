"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Level } from "@/types/level";
import { ExplanationStep } from "./ExplanationStep";
import { PlaygroundStep } from "./PlaygroundStep";
import { ChallengeStep } from "./ChallengeStep";
import { ValidationStep } from "./ValidationStep";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft, Layers } from "lucide-react";
import Link from "next/link";

export interface StepRendererProps {
  topicSlug: string;
  level: Level;
}

export function StepRenderer({ topicSlug, level }: StepRendererProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = level.steps;
  const currentStep = steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinishLevel = () => {
    router.push(`/topics/${topicSlug}`);
  };

  if (!currentStep) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Breadcrumb & Step Progress Bar */}
      <div className="space-y-3 p-4 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/topics/${topicSlug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Peta Level</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-300 font-bold">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>
              Tingkat {level.index}: {level.title}
            </span>
          </div>
        </div>

        {/* Animated Step Progress Bar */}
        <ProgressBar
          value={currentStepIndex + 1}
          max={steps.length}
          size="sm"
          label={`Langkah ${currentStepIndex + 1} dari ${steps.length}: ${currentStep.title}`}
          showValueLabel
          variant="gradient"
        />
      </div>

      {/* Dynamic Step Body */}
      <div className="w-full">
        {currentStep.type === "explanation" && currentStep.explanation && (
          <ExplanationStep
            content={currentStep.explanation}
            onNext={handleNextStep}
          />
        )}

        {currentStep.type === "playground" && currentStep.playground && (
          <PlaygroundStep
            config={currentStep.playground}
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

        {currentStep.type === "validation" && currentStep.validation && (
          <ValidationStep
            config={currentStep.validation}
            topicSlug={topicSlug}
            onFinishLevel={handleFinishLevel}
          />
        )}
      </div>
    </div>
  );
}
