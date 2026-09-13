"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section
      role="region"
      aria-label="Ajak Belajar Sekarang"
      className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80 mb-12"
    >
      <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/60 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mulai Petualangan Nalarmu</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Siap Memahami STEM Tanpa Menghafal Rumus Buta?
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            Pilih modul pertamamu sekarang. Eksplorasi ratusan kanvas interaktif, raih poin pengalaman (XP), kumpulkan lencana penalaran, dan diskusikan ide bersama maskot Nai!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/topics/math-real-numbers-line">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold shadow-lg shadow-indigo-600/30"
              >
                Mulai Level 1: Bilangan Riil
              </Button>
            </Link>

            <Link href="/explore">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Layers className="w-4 h-4 text-sky-400" />}
                className="border-neutral-700 hover:border-neutral-500 text-neutral-200"
              >
                Jelajahi Katalog Lengkap
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Pill Tags on the side */}
        <div className="relative z-10 grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center space-y-1">
            <span className="text-base font-black text-emerald-400 font-mono">100% Gratis</span>
            <p className="text-[10px] text-neutral-400">Pendidikan Terbuka</p>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center space-y-1">
            <span className="text-base font-black text-amber-400 font-mono">Zero Login</span>
            <p className="text-[10px] text-neutral-400">Langsung Main</p>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center space-y-1">
            <span className="text-base font-black text-sky-400 font-mono">60 FPS</span>
            <p className="text-[10px] text-neutral-400">Kanvas Interaktif</p>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center space-y-1">
            <span className="text-base font-black text-indigo-400 font-mono">AI Hemat Token</span>
            <p className="text-[10px] text-neutral-400">On-Demand Hint</p>
          </div>
        </div>
      </div>
    </section>
  );
}
