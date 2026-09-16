import React from "react";
import type { Metadata } from "next";
import { Network, Sparkles, BookOpen } from "lucide-react";
import { SkillTree } from "@/components/skill-tree";

export const metadata: Metadata = {
  title: "Pohon Pengetahuan STEM (Skill Tree) | Nalar",
  description:
    "Peta kurikulum sains dan matematika berbasis Directed Acyclic Graph (DAG). Eksplorasi prasyarat antarkonsep dan jembatan antara matematika dan sains.",
};

export default function SkillTreePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Knowledge Graph & Prerequisite DAG • Fase 1 Foundation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pohon Pengetahuan STEM
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Kurikulum Nalar bukanlah daftar bab kaku. Matematika adalah alat pemodelan sains. Amati relasi prasyarat eksplisit, pelajari jalur bertahap dari fondasi hingga konsep flagship Kinematika.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>6 Topik MVP Vertikal</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Graph */}
      <section role="region" aria-label="Kanvas Pohon Pengetahuan" className="w-full">
        <SkillTree domain="all" stage="all" />
      </section>
    </div>
  );
}
