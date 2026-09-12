"use client";

import React from "react";
import { CurriculumDomain, CurriculumStage } from "@/lib/curriculum/types";
import { Filter, Sparkles } from "lucide-react";
import { clsx } from "clsx";

export interface SkillTreeFiltersProps {
  selectedDomain: CurriculumDomain;
  onSelectDomain: (domain: CurriculumDomain) => void;
  selectedStage: CurriculumStage;
  onSelectStage: (stage: CurriculumStage) => void;
}

const DOMAINS: { id: CurriculumDomain; label: string }[] = [
  { id: "all", label: "Semua Domain" },
  { id: "math", label: "Matematika" },
  { id: "physics", label: "Fisika" },
  { id: "chemistry", label: "Kimia" },
  { id: "biology", label: "Biologi" },
  { id: "softskill", label: "Soft Skills" },
];

const STAGES: { id: CurriculumStage; label: string }[] = [
  { id: "all", label: "Semua Jenjang" },
  { id: "explorer", label: "Explorer (Lv 1)" },
  { id: "navigator", label: "Navigator (Lv 2)" },
  { id: "scholar", label: "Scholar (Lv 3)" },
];

export function SkillTreeFilters({
  selectedDomain,
  onSelectDomain,
  selectedStage,
  onSelectStage,
}: SkillTreeFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-lg">
      {/* Domain Filters */}
      <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Filter Domain">
        <span className="text-xs font-bold text-neutral-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Domain:</span>
        </span>
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelectDomain(d.id)}
            aria-pressed={selectedDomain === d.id}
            className={clsx(
              "px-3 py-1 rounded-xl text-xs font-bold transition select-none cursor-pointer",
              selectedDomain === d.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Stage Filters */}
      <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Filter Jenjang">
        <span className="text-xs font-bold text-neutral-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Jenjang:</span>
        </span>
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectStage(s.id)}
            aria-pressed={selectedStage === s.id}
            className={clsx(
              "px-2.5 py-1 rounded-xl text-xs font-semibold transition select-none cursor-pointer",
              selectedStage === s.id
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
