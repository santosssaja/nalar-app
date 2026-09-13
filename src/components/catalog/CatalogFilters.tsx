"use client";

import React from "react";
import { Search, X, Calculator, Atom, FlaskConical, Dna, Brain, Layers } from "lucide-react";
import { CurriculumDomain, CurriculumStage } from "@/lib/curriculum/types";

export interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDomain: CurriculumDomain;
  onSelectDomain: (d: CurriculumDomain) => void;
  selectedStage: CurriculumStage;
  onSelectStage: (s: CurriculumStage) => void;
  selectedAvailability: "all" | "available" | "completed" | "locked";
  onSelectAvailability: (a: "all" | "available" | "completed" | "locked") => void;
  domainCounts: Record<CurriculumDomain, number>;
  totalFiltered: number;
}

const DOMAINS: { id: CurriculumDomain; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "Semua", icon: Layers },
  { id: "math", label: "Matematika", icon: Calculator },
  { id: "physics", label: "Fisika", icon: Atom },
  { id: "chemistry", label: "Kimia", icon: FlaskConical },
  { id: "biology", label: "Biologi", icon: Dna },
  { id: "softskill", label: "Soft Skills", icon: Brain },
];

const STAGES: { id: CurriculumStage; label: string; desc: string }[] = [
  { id: "all", label: "Semua Jenjang", desc: "Semua fase" },
  { id: "explorer", label: "Adik Explorer", desc: "Dasar" },
  { id: "navigator", label: "Pelajar Navigator", desc: "Menengah" },
  { id: "scholar", label: "Mahasiswa Pioneer", desc: "Lanjutan" },
];

const STATUSES: { id: "all" | "available" | "completed" | "locked"; label: string }[] = [
  { id: "all", label: "Semua Status" },
  { id: "available", label: "Siap Dimainkan (Kanvas)" },
  { id: "completed", label: "Tuntas Selesai" },
  { id: "locked", label: "Prasyarat Terkunci" },
];

export function CatalogFilters({
  searchQuery,
  onSearchChange,
  selectedDomain,
  onSelectDomain,
  selectedStage,
  onSelectStage,
  selectedAvailability,
  onSelectAvailability,
  domainCounts,
  totalFiltered,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-neutral-200">
      {/* Top row: Search input & Status filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari topik (misal: Modulo, Tangen, Newton, Vektor, Riemann)..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            aria-label="Cari topik pembelajaran"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Availability dropdown/pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {STATUSES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onSelectAvailability(st.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedAvailability === st.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Domain Selection Tabs with Counts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {DOMAINS.map((dom) => {
          const Icon = dom.icon;
          const isSelected = selectedDomain === dom.id;
          const count = domainCounts[dom.id] ?? 0;

          return (
            <button
              key={dom.id}
              type="button"
              onClick={() => onSelectDomain(dom.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{dom.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Selection Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-neutral-500 uppercase mr-1">Jenjang:</span>
          {STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onSelectStage(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedStage === st.id
                  ? "bg-neutral-200 text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-neutral-400 font-mono">
          Menampilkan <strong className="text-white">{totalFiltered}</strong> topik
        </span>
      </div>
    </div>
  );
}
