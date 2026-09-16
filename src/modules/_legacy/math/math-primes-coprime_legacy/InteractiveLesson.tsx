"use client";

import React, { useState } from "react";
import { BookOpen, Volume2 } from "lucide-react";
import { PrimesCoprimeState } from "./engine";
import { Canvas } from "./Canvas";
import { KaTeXFormula } from "./KaTeXFormula";
import { Controls } from "./Controls";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<PrimesCoprimeState>({
    numberN: 12,
    coprimeA: 8,
    coprimeB: 9,
    sieveLimit: 60,
    fermatBase: 3,
    fermatPrime: 7,
  });

  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState({
      numberN: 12,
      coprimeA: 8,
      coprimeB: 9,
      sieveLimit: 60,
      fermatBase: 3,
      fermatPrime: 7,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Overview Hook */}
      <section className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-purple-950/30 border border-neutral-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Fondasi Matematika • Teori Bilangan & Kriptografi</span>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                "Bilangan prima adalah atom penyusun semesta bilangan bulat. Setiap bilangan memiliki sidik jari faktorisasi prima yang unik."
              )
            }
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Audio</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white">
          Faktorisasi Prima & Bilangan Koprima
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
          Eksplorasi partikel dasar aritmetika: amati bagaimana bilangan komposit dapat disusun menjadi
          kisi balok persegi panjang sementara bilangan prima hanya satu baris kaku. Pelajari Saringan
          Eratosthenes, relasi koprima garis pandang 2D, dan fungsi totient Euler yang mengamankan internet dunia.
        </p>
      </section>

      {/* Interactive Canvas & Controls */}
      <div className="space-y-4">
        <KaTeXFormula state={state} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <Canvas
              state={state}
              onNumberSelect={(val) => setState((prev) => ({ ...prev, numberN: val }))}
            />
          </div>

          <div className="lg:col-span-4 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-xl">
            <Controls state={state} onChange={setState} onReset={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
}
