"use client";

import React, { useState } from "react";
import { ComprehensiveLesson, LearningMode } from "@/lib/curriculum/pedagogy-types";
import { PedagogyHeader } from "./PedagogyHeader";
import { MasteryCheckView } from "./MasteryCheckView";
import { ContextualAiTutorDrawer } from "./ContextualAiTutorDrawer";
import { ModulePlaygroundEmbed } from "@/components/learning/ModulePlaygroundEmbed";
import { Compass } from "lucide-react";
import { useLessonSimulation } from "./useLessonSimulation";
import { LearnModeView } from "./LearnModeView";

import { getComprehensiveLesson } from "@/modules/pedagogy-registry";

export interface ComprehensiveLessonPlayerProps {
  lesson?: ComprehensiveLesson;
  topicSlug?: string;
}

export function ComprehensiveLessonPlayer({ lesson: propLesson, topicSlug }: ComprehensiveLessonPlayerProps) {
  const lesson = propLesson || (topicSlug ? getComprehensiveLesson(topicSlug) : undefined);

  if (!lesson) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 text-center text-neutral-400 space-y-4">
        <p className="text-lg">Modul pembelajaran tidak ditemukan.</p>
      </div>
    );
  }

  return <ComprehensiveLessonPlayerInner lesson={lesson} />;
}

function ComprehensiveLessonPlayerInner({ lesson }: { lesson: ComprehensiveLesson }) {
  const [activeMode, setActiveMode] = useState<LearningMode>("learn");
  const sim = useLessonSimulation(lesson.slug, lesson.explore.initialVariables);

  const handleClaimXp = (amount: number, challengeId = "challenge") => {
    sim.handleClaimXp(amount, challengeId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-8 animate-fade-in text-neutral-100">
      {/* 1. Header with 3 Learning Modes */}
      <PedagogyHeader
        lesson={lesson}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />

      {/* MODE 1: LEARN (The 11 Pedagogical Phases) */}
      {activeMode === "learn" && (
        <LearnModeView
          lesson={lesson}
          simVars={sim.simVars}
          onSimVarsChange={sim.handleSimVarsChange}
          onClaimXp={handleClaimXp}
          onHintUnlocked={sim.registerHintUnlocked}
        />
      )}

      {activeMode === "explore" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span><b>Mode Eksplorasi Bebas:</b> Silakan bereksperimen dengan seluruh parameter tanpa batasan soal.</span>
            </div>
          </div>
          <ModulePlaygroundEmbed
            slug={lesson.slug}
            initialVariables={sim.simVars}
            onVariablesChange={sim.handleSimVarsChange}
          />
        </div>
      )}
      {activeMode === "master" && (
        <div className="space-y-6 animate-fade-in">
          <MasteryCheckView
            topicId={lesson.id}
            items={lesson.masteryCheck}
            onComplete={() => handleClaimXp(50, `mastery-${lesson.id}`)}
          />
        </div>
      )}
      {/* Floating Socratic AI Tutor Drawer */}
      <ContextualAiTutorDrawer
        topicTitle={lesson.title}
        currentPhase={activeMode}
        hintsUsedCount={sim.hintsUsedCount}
      />
    </div>
  );
}
