"use client";

import React, { useState } from "react";
import { Volume2, BookOpen } from "lucide-react";
import { modularClockLesson } from "./content";
import { ModularClockState } from "./engine";
import { Canvas } from "./Canvas";
import { KaTeXFormula } from "./KaTeXFormula";
import { Controls } from "./Controls";
import { Challenge } from "./Challenge";
import { AITutorModal } from "../linear-algebra-determinant-2d/AITutorModal";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<ModularClockState>({
    n: modularClockLesson.initialVariables.n,
    multiplier: modularClockLesson.initialVariables.multiplier,
    activeNode: null,
    hourA: modularClockLesson.initialVariables.hourA,
    hourB: modularClockLesson.initialVariables.hourB,
  });

  const { speakText } = useAccessibility();

  const handleNodeClick = (index: number) => {
    setState((prev) => ({
      ...prev,
      activeNode: prev.activeNode === index ? null : index,
    }));
  };

  const handleReset = () => {
    setState({
      n: modularClockLesson.initialVariables.n,
      multiplier: modularClockLesson.initialVariables.multiplier,
      activeNode: null,
      hourA: modularClockLesson.initialVariables.hourA,
      hourB: modularClockLesson.initialVariables.hourB,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Pedagogical Hook */}
      <section
        role="region"
        aria-label="Pengantar Aritmetika Jam"
        className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 shadow-xl space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Aritmetika & Teori Bilangan • Level 1 • Modul 01</span>
          </div>

          <button
            type="button"
            onClick={() => speakText(modularClockLesson.audioNarrationText)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition"
            aria-label="Dengarkan penjelasan audio konsep modul jam ini"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Narasi Konsep</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {modularClockLesson.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
          {modularClockLesson.summary}
        </p>
      </section>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas + KaTeX (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Canvas state={state} onNodeClick={handleNodeClick} />
          <KaTeXFormula state={state} />
        </div>

        {/* Right Column: Controls + Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Controls state={state} onChange={setState} onReset={handleReset} />
          <Challenge
            challenges={modularClockLesson.challenges}
            topicSlug={modularClockLesson.slug}
            currentState={state}
          />
        </div>
      </div>

      {/* On-Demand AI Tutor Widget */}
      <AITutorModal
        topicSlug={modularClockLesson.slug}
        currentState={{
          i_hat_x: state.n,
          i_hat_y: state.multiplier,
          j_hat_x: state.hourA,
          j_hat_y: state.hourB,
        }}
      />
    </div>
  );
}
