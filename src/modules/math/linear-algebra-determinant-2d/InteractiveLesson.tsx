"use client";

import React, { useState } from "react";
import { Volume2, BookOpen } from "lucide-react";
import { determinantLesson } from "./content";
import { DeterminantCanvasState } from "./engine";
import { Canvas } from "./Canvas";
import { KaTeXFormula } from "./KaTeXFormula";
import { Controls } from "./Controls";
import { Challenge } from "./Challenge";
import { AITutorModal } from "./AITutorModal";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<DeterminantCanvasState>({
    i_hat_x: determinantLesson.initialVariables.i_hat_x,
    i_hat_y: determinantLesson.initialVariables.i_hat_y,
    j_hat_x: determinantLesson.initialVariables.j_hat_x,
    j_hat_y: determinantLesson.initialVariables.j_hat_y,
  });

  const { speakText } = useAccessibility();

  const handleVectorMove = (key: "i" | "j", point: [number, number]) => {
    setState((prev) => {
      if (key === "i") {
        return { ...prev, i_hat_x: point[0], i_hat_y: point[1] };
      }
      return { ...prev, j_hat_x: point[0], j_hat_y: point[1] };
    });
  };

  const handleReset = () => {
    setState({
      i_hat_x: determinantLesson.initialVariables.i_hat_x,
      i_hat_y: determinantLesson.initialVariables.i_hat_y,
      j_hat_x: determinantLesson.initialVariables.j_hat_x,
      j_hat_y: determinantLesson.initialVariables.j_hat_y,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Pedagogical Hook & Header */}
      <section
        role="region"
        aria-label="Pengenalan Konsep Determinan"
        className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Aljabar Linear • Level 3 • Modul 01</span>
          </div>

          <button
            type="button"
            onClick={() => speakText(determinantLesson.audioNarrationText)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition"
            aria-label="Dengarkan penjelasan audio konsep modul ini"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Narasi Konsep</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {determinantLesson.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
          {determinantLesson.summary}
        </p>
      </section>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Canvas & KaTeX Formula (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Canvas state={state} onVectorMove={handleVectorMove} />
          <KaTeXFormula state={state} />
        </div>

        {/* Right Column: Interactive Sliders & Logic Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Controls state={state} onChange={setState} onReset={handleReset} />
          <Challenge
            challenges={determinantLesson.challenges}
            topicSlug={determinantLesson.slug}
            currentState={state}
          />
        </div>
      </div>

      {/* On-Demand AI Tutor Widget */}
      <AITutorModal topicSlug={determinantLesson.slug} currentState={state} />
    </div>
  );
}
