"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { ModuleCatalog } from "@/components/catalog";

export default function ExplorePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Katalog Kurikulum STEM • Data Prasyarat Terstruktur</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Katalog Modul Pembelajaran STEM
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Eksplorasi seluruh kurikulum topik matematika, fisika, kimia, biologi, dan penalaran kritis.
            Temukan konsep fondasi, cek prasyarat materi, dan langsung mulai simulasi interaktif.
          </p>
        </div>
      </section>

      {/* Main Module Catalog Component */}
      <section role="region" aria-label="Katalog Modul Pembelajaran" className="w-full">
        <ModuleCatalog defaultDomain="all" defaultStage="all" />
      </section>
    </div>
  );
}
