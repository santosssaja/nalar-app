"use client";

import React from "react";
import { Brain, Layers, CheckCircle2, Award } from "lucide-react";
import { useLearnerModel } from "@/context/LearnerContext";

export function MasteryRadarCard() {
  const { overallMastery } = useLearnerModel();

  const dimensions: {
    key: keyof typeof overallMastery;
    label: string;
    description: string;
    color: string;
    barColor: string;
  }[] = [
    {
      key: "conceptual",
      label: "Conceptual Understanding",
      description: "Pemahaman esensi dan intuisi fisis/matematis",
      color: "text-indigo-400",
      barColor: "bg-indigo-500",
    },
    {
      key: "procedural",
      label: "Procedural Fluency",
      description: "Kelancaran manipulasi simbolik dan aljabar",
      color: "text-sky-400",
      barColor: "bg-sky-500",
    },
    {
      key: "reasoning",
      label: "Mathematical Reasoning",
      description: "Penalaran logis, deduksi, dan pembuktian",
      color: "text-emerald-400",
      barColor: "bg-emerald-500",
    },
    {
      key: "problemSolving",
      label: "Problem Solving",
      description: "Kemampuan memecahkan masalah tak terstruktur",
      color: "text-amber-400",
      barColor: "bg-amber-500",
    },
    {
      key: "transfer",
      label: "Transfer of Knowledge",
      description: "Penerapan konsep pada situasi dan domain baru",
      color: "text-rose-400",
      barColor: "bg-rose-500",
    },
  ];

  return (
    <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>Matriks 5 Dimensi Kemahiran STEM</span>
          </div>
          <h2 className="text-xl font-black text-white">Evaluasi Penguasaan Konsep</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-baseline gap-2">
            <span className="text-xs text-neutral-400">Skor Agregat:</span>
            <span className="text-xl font-black text-white font-mono">{overallMastery.overall}%</span>
          </div>
        </div>
      </div>

      {/* 5 Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dimensions.map((dim) => {
          const score = overallMastery[dim.key] || 0;
          return (
            <div
              key={dim.key}
              className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${dim.color}`}>{dim.label}</span>
                  <span className="text-xs font-mono font-bold text-neutral-200">{score}%</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">{dim.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full ${dim.barColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.max(score, 6)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
