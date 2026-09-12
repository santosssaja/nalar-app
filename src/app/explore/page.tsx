"use client";

import React, { useState } from "react";
import { SkillTree } from "@/components/skill-tree/SkillTree";
import { SkillTreeFilters } from "@/components/skill-tree/SkillTreeFilters";
import { CurriculumDomain, CurriculumStage } from "@/lib/curriculum/types";
import { Network, Sparkles, CheckCircle2 } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";

export default function ExplorePage() {
  const [domain, setDomain] = useState<CurriculumDomain>("all");
  const [stage, setStage] = useState<CurriculumStage>("all");
  const { progress } = useGamification();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-5">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Peta Kurikulum & Pohon Keterampilan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Eksplorasi Jalur Belajar STEM
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Navigasi berbasis graf prasyarat terstruktur. Topik terbuka seiring kamu menyelesaikan modul fondasi.
            Manipulasi kanvas dengan zoom & geser untuk menelusuri seluruh kurikulum.
          </p>
        </div>

        {/* Quick Progress Counters */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">Topik Selesai</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {progress.completedTopics.length}
            </span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">XP Terkumpul</span>
            <span className="text-base font-black text-amber-400 flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-4 h-4" />
              {progress.xp}
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Filters Bar */}
      <SkillTreeFilters
        selectedDomain={domain}
        onSelectDomain={setDomain}
        selectedStage={stage}
        onSelectStage={setStage}
      />

      {/* Main Interactive Skill Tree Canvas */}
      <section
        role="region"
        aria-label="Kanvas Interaktif Pohon Keterampilan"
        className="w-full"
      >
        <SkillTree domain={domain} stage={stage} />
      </section>
    </div>
  );
}
