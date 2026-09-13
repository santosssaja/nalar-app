"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare, Volume2, Lightbulb, Compass, Award, CheckCircle2 } from "lucide-react";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { NaiExpression } from "@/components/nai/nai-sprites";
import { useNai } from "@/components/nai/NaiContext";
import { useAccessibility } from "@/context/AccessibilityContext";

export function NaiIntroSection() {
  const { say, setExpression: setGlobalExp } = useNai();
  const { speakText, isSpeaking } = useAccessibility();
  const [localExp, setLocalExp] = useState<NaiExpression>("happy");
  const [introDialogue, setIntroDialogue] = useState<string>(
    "Halo! Aku Nai, teman belajarmu di Nalar 👋 Aku akan menemanimu bereksperimen di kanvas dan menemukan rumus-rumus sains serta matematika lewat rasa ingin tahu!"
  );

  const handleSapaNai = () => {
    setLocalExp("celebrating");
    setGlobalExp("celebrating");
    const text =
      "Hai! Senang sekali bisa bertemu denganmu! Di Nalar, kita tidak menghafal rumus mati, melainkan menemukan rahasia di baliknya lewat simulasi langsung!";
    setIntroDialogue(text);
    say(text, { expression: "celebrating", readAloud: true, autoDismissMs: 10000 });
  };

  const handleTanyaCaraBelajar = () => {
    setLocalExp("teaching");
    setGlobalExp("teaching");
    const text =
      "Cara belajarnya sangat seru: Setiap modul dimulai dari tebak fenomena (PREDICT), geser parameter kanvas (GUIDED), lalu kamu merumuskan sendiri polanya (FORMALIZE)!";
    setIntroDialogue(text);
    say(text, { expression: "teaching", readAloud: true, autoDismissMs: 10000 });
  };

  const handleCobaSuara = () => {
    setLocalExp("curious");
    setGlobalExp("curious");
    const text =
      "Nalar ramah untuk semua pembelajar! Aku dilengkapi suara audio Web Speech API bawaan untuk membantu teman-teman tunanetra atau pembelajar auditori.";
    setIntroDialogue(text);
    speakText(text);
  };

  return (
    <section
      role="region"
      aria-label="Perkenalan Teman Belajar Nai"
      className="w-full max-w-6xl px-4 my-8"
    >
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40 border border-indigo-500/20 shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mascot Avatar & Interactive Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative group cursor-pointer" onClick={handleSapaNai}>
              <div className="p-3 rounded-full bg-neutral-900 border-2 border-amber-500/30 shadow-xl group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300">
                <NaiExpressions expression={localExp} size={130} />
              </div>
              <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                Klik untuk Menyapa
              </span>
            </div>

            {/* Speech Bubble */}
            <div className="relative w-full max-w-md p-4 rounded-2xl bg-neutral-950/90 border border-amber-500/30 shadow-lg text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-400">Nai Berkata:</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {introDialogue}
              </p>
            </div>

            {/* Quick Interaction Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSapaNai}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Sapa Nai
              </button>

              <button
                type="button"
                onClick={handleTanyaCaraBelajar}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                Tanya Cara Belajar
              </button>

              <button
                type="button"
                onClick={handleCobaSuara}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                {isSpeaking ? "Membacakan..." : "Tes Asistensi Suara"}
              </button>
            </div>
          </div>

          {/* Right Column: Introduction Narrative & Feature Highlights */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Kenalan dengan Teman Belajarmu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Nai: Teman Belajar STEM Inklusif &amp; Adaptif
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Belajar sains dan matematika tidak harus terasa menakutkan atau penuh rumus hafalan mati.
                Nai hadir di setiap langkah belajarmu untuk memastikan konsep rumit berubah menjadi intuisi alami.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Compass className="w-4 h-4" />
                  <span>Guided Discovery</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Menemukan konsep dan rumus sendiri melalui observasi kanvas interaktif langkah demi langkah.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Volume2 className="w-4 h-4" />
                  <span>Asistensi Suara Difabel</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Dukungan narasi audio Web Speech API bawaan peramban ramah tunanetra dan pembelajar low-vision.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>4-Tier Smart Hints</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Petunjuk bertahap hemat token hanya saat kamu membutuhkannya, tanpa merusak proses berpikir mandiri.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                  <Award className="w-4 h-4" />
                  <span>Gamifikasi &amp; XP Nalar</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Raih poin pengalaman, buka lencana keahlian, dan pantau progres belajarmu di penyimpanan lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
