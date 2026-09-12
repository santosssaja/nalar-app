"use client";

import React, { useState } from "react";
import { TopicModule } from "@/types/topic";
import { getTopicModule } from "@/modules/registry";
import { LevelMap } from "./LevelMap";
import { Badge } from "@/components/ui/Badge";
import { Map, Sliders, Volume2 } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useGamification } from "@/context/GamificationContext";

export interface TopicModuleViewProps {
  slug?: string;
  moduleData?: TopicModule;
  sandboxContent?: React.ReactNode;
}

export function TopicModuleView({
  slug,
  moduleData: propModuleData,
  sandboxContent,
}: TopicModuleViewProps) {
  const [activeTab, setActiveTab] = useState<"levels" | "sandbox">("levels");
  const { speakText, isSpeaking } = useAccessibility();
  const { progress } = useGamification();

  const moduleData = propModuleData || (slug ? getTopicModule(slug) : undefined);

  if (!moduleData) {
    return (
      <div className="p-8 text-center text-neutral-400">
        Modul topik tidak ditemukan.
      </div>
    );
  }

  // Determine completed level indexes from gamification solved challenges
  const completedLevelIndexes = moduleData.levels
    .filter((lvl) => {
      const challengeSteps = lvl.steps.filter((s) => s.type === "challenge" && s.challenge);
      if (challengeSteps.length === 0) return false;
      return challengeSteps.every((cs) =>
        progress.solvedChallenges.includes(cs.challenge!.id)
      );
    })
    .map((lvl) => lvl.index);

  const currentLevelIndex = Math.min(
    moduleData.levels.length,
    (completedLevelIndexes[completedLevelIndexes.length - 1] || 0) + 1
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Topic Header Hero */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={moduleData.category} size="md">
              {moduleData.category}
            </Badge>
            <span className="text-xs font-mono text-neutral-400 uppercase">
              {moduleData.levels.length} TINGKAT PEMBELAJARAN
            </span>
          </div>

          <button
            type="button"
            onClick={() => speakText(moduleData.audioNarrationText)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
            aria-label="Dengarkan pengantar topik"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
            <span>Pengantar Audio</span>
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {moduleData.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            {moduleData.summary}
          </p>
        </div>

        {/* Tab switch buttons */}
        {sandboxContent && (
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab("levels")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "levels"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Jalur Tingkat Belajar ({moduleData.levels.length} Level)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "sandbox"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Kanvas Interaktif Penuh (Sandbox)</span>
            </button>
          </div>
        )}
      </section>

      {/* Main View Area */}
      {activeTab === "levels" ? (
        <LevelMap
          topicSlug={moduleData.slug}
          levels={moduleData.levels}
          completedLevelIndexes={completedLevelIndexes}
          currentLevelIndex={currentLevelIndex}
        />
      ) : (
        <div className="w-full">{sandboxContent}</div>
      )}
    </div>
  );
}
