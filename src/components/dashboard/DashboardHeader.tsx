"use client";

import React from "react";
import { Sparkles, Compass, BookOpen, Trophy, Flame } from "lucide-react";
import { LearningMode } from "@/lib/curriculum/types";
import { useLearnerModel } from "@/context/LearnerContext";
import { useGamification } from "@/context/GamificationContext";

export function DashboardHeader() {
  const { learningMode, setLearningMode } = useLearnerModel();
  const { progress, rankInfo } = useGamification();

  const modes: { id: LearningMode; label: string; icon: React.ElementType; desc: string }[] = [
    { id: "learn", label: "Belajar Terstruktur", icon: BookOpen, desc: "Alur bertahap dengan bimbingan" },
    { id: "explore", label: "Eksplorasi Bebas", icon: Compass, desc: "Bermain kanvas & parameter" },
    { id: "master", label: "Uji Penguasaan", icon: Trophy, desc: "Tantangan transfer mandiri" },
  ];

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Title and value proposition */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learning Environment • Nalar STEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Lingkungan Belajar Sains & Matematika
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Bangun intuisi ilmiah dari manipulasi visual, temukan pola matematis, dan terapkan konsep pada fenomena dunia nyata.
          </p>
        </div>

        {/* Quick Streak & Rank status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-2 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Status Kemampuan</span>
            <span className="text-sm font-black text-indigo-300">{rankInfo.title}</span>
          </div>
          <div className="px-3 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-current text-amber-400" />
            <span className="text-sm font-bold font-mono">{progress.consecutiveDays} Hari</span>
          </div>
        </div>
      </div>

      {/* Learning Mode Switcher (docs/new-module.md Section 12) */}
      <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-neutral-400 font-medium">Pilih Mode Belajar:</span>
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950/80 rounded-2xl border border-neutral-800/80">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = learningMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setLearningMode(m.id)}
                title={m.desc}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
