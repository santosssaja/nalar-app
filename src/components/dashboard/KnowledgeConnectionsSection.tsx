"use client";

import React from "react";
import { Link2, ArrowDown, Sparkles, BookOpen } from "lucide-react";
import { CONCEPT_CONNECTIONS } from "@/lib/curriculum/data/connections";
import { KaTeXView } from "@/components/ui/KaTeXView";

export function KnowledgeConnectionsSection() {
  return (
    <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <Link2 className="w-4 h-4" />
            <span>Jembatan Konseptual • Math ➔ Science</span>
          </div>
          <h2 className="text-xl font-black text-white">Hubungan Antara Matematika & Sains</h2>
        </div>
        <span className="text-xs text-neutral-400 hidden sm:inline">
          Matematika adalah bahasa formal pemodelan sains
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONCEPT_CONNECTIONS.map((conn) => (
          <div
            key={conn.id}
            className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-indigo-500/40 transition space-y-3.5"
          >
            {/* Bridge indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
                {conn.badgeText}
              </span>
            </div>

            {/* Concept Flow: Math -> Science */}
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-indigo-300">
                {conn.mathTopicTitle}
              </div>
              <span className="text-neutral-500 font-mono">➔</span>
              <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sky-300">
                {conn.scienceTopicTitle}
              </div>
            </div>

            {/* Content description */}
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-white">{conn.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{conn.description}</p>
            </div>

            {/* Math Formula if available */}
            {conn.formulaTeX && (
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/80 text-amber-300 flex items-center justify-center overflow-x-auto min-h-[44px]">
                <KaTeXView math={conn.formulaTeX} displayMode />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
