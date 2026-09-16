"use client";

import React, { useState } from "react";
import { BookOpen, Volume2 } from "lucide-react";
import { RealNumberState } from "./engine";
import { Canvas } from "./Canvas";
import { KaTeXFormula } from "./KaTeXFormula";
import { Controls } from "./Controls";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<RealNumberState>({
    point1: 3,
    point2: -4,
    scaleFactor: 2,
    sqrtN: 2,
    zoomLevel: 1,
    distribA: 3,
    distribB: 4,
    distribC: 2,
  });

  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState({
      point1: 3,
      point2: -4,
      scaleFactor: 2,
      sqrtN: 2,
      zoomLevel: 1,
      distribA: 3,
      distribB: 4,
      distribC: 2,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Overview Hook */}
      <section className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-blue-950/30 border border-neutral-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Fondasi Matematika • Bilangan & Aritmetika</span>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                "Garis bilangan riil menghubungkan bilangan positif, negatif, pecahan, dan irasional dalam satu ruang spasial kontinu."
              )
            }
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Audio</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white">
          Operasi Bilangan Riil & Garis Bilangan
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
          Eksplorasi garis bilangan interaktif dengan pembesaran skala tanpa batas. Pelajari
          bagaimana penjumlahan adalah translasi arah vektor, perkalian adalah dilatasi skala,
          dan teorema Pythagoras melahirkan bilangan irasional di dunia fisik.
        </p>
      </section>

      {/* Interactive Canvas & Controls */}
      <div className="space-y-4">
        <KaTeXFormula state={state} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <Canvas state={state} />
          </div>

          <div className="lg:col-span-4 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-xl">
            <Controls state={state} onChange={setState} onReset={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
}
