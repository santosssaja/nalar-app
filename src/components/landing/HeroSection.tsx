"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Network, ArrowRight, Compass, ShieldCheck, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative w-full max-w-6xl px-4 pt-10 sm:pt-14 pb-10 text-center flex flex-col items-center space-y-7 overflow-hidden">
      {/* Subtle Background Radial Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-gradient-to-b from-indigo-500/15 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SDG 4 Tag Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide shadow-sm animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Pendidikan Berkualitas: Inklusif, Merata, dan Tanpa Hambatan</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15]">
        Pahami Konsep Sains & Matematika Lewat{" "}
        <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
          Penalaran Visual & Kanvas
        </span>
      </h1>

      {/* Value Proposition Subtitle */}
      <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed">
        Bukan sekadar hafalan rumus mati. Eksplorasi simulasi interaktif, bangun intuisi lewat manipulasi grafis langsung, dan didampingi AI Tutor <strong className="text-amber-300 font-semibold">Nai</strong> yang ramah difabel.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/topics/math-real-numbers-line">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shadow-lg shadow-indigo-600/25 font-bold"
          >
            Mulai Belajar: Bilangan Riil
          </Button>
        </Link>

        <Link href="/explore">
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Network className="w-4 h-4 text-sky-400" />}
            className="border-neutral-700 hover:border-neutral-500 text-neutral-200"
          >
            Peta Kurikulum (Skill Tree)
          </Button>
        </Link>

        <a href="#katalog">
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<Compass className="w-4 h-4 text-emerald-400" />}
            className="text-neutral-300"
          >
            Lihat 15+ Topik
          </Button>
        </a>
      </div>

      {/* Quick Metrics Bar (4 Pillar Cards) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl">
        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col items-center text-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-indigo-400 font-mono text-base sm:text-lg font-black">
            <Layers className="w-4 h-4" />
            <span>15+ Topik</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">Matematika & Fisika Interaktif</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col items-center text-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-base sm:text-lg font-black">
            <Zap className="w-4 h-4" />
            <span>8 Layar</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">Alur Guided Discovery per Tingkat</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col items-center text-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-sky-400 font-mono text-base sm:text-lg font-black">
            <Sparkles className="w-4 h-4" />
            <span>WCAG AAA</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">Suara Web Speech, Tema Kontras</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col items-center text-center space-y-1 shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono text-base sm:text-lg font-black">
            <ShieldCheck className="w-4 h-4" />
            <span>Bebas Login</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium">Progres Tersimpan di Browser</span>
        </div>
      </div>
    </section>
  );
}
