"use client";

import React from "react";
import { ComprehensiveLesson, LearningMode } from "@/lib/curriculum/pedagogy-types";
import { Badge } from "@/components/ui/Badge";
import { Volume2, BookOpen, Compass, Award, Sparkles } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

interface PedagogyHeaderProps {
  lesson: ComprehensiveLesson;
  activeMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
}

export function PedagogyHeader({ lesson, activeMode, onModeChange }: PedagogyHeaderProps) {
  const { speakText, isSpeaking } = useAccessibility();

  return (
    <header className="w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={lesson.subject === "math" ? "math" : "science"} size="md">
            {lesson.subject === "math" ? "Matematika" : "Sains"}
          </Badge>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            {lesson.domain}
          </span>
          {lesson.crossDomainBridge && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {lesson.crossDomainBridge.badgeText}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => speakText(lesson.audioNarrationText)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition"
          aria-label="Dengarkan pengantar audio materi"
        >
          <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
          <span>Pengantar Audio</span>
        </button>
      </div>

      {/* Title & Summary */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-4xl">
          {lesson.summary}
        </p>
      </div>

      {/* 3 Learning Modes Switcher (docs/new-module.md Section 12) */}
      <nav aria-label="Mode Belajar" className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
        <button
          type="button"
          onClick={() => onModeChange("learn")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeMode === "learn"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Alur Belajar (11 Tahap Pedagogis)</span>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("explore")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeMode === "explore"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Eksplorasi Bebas (Sandbox Interaktif)</span>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("master")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeMode === "master"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Evaluasi 5D (Mastery Check)</span>
        </button>
      </nav>
    </header>
  );
}
