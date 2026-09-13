"use client";

import React from "react";
import { HelpCircle, Compass, FileText, Target, ArrowRight } from "lucide-react";

export function GuidedDiscoveryShowcase() {
  const steps = [
    {
      step: "01",
      title: "Pemantik & Prediksi",
      subtitle: "Aktifkan Intuisi",
      desc: "Hadapi fenomena misterius. Tebak hipotesismu di kanvas sebelum simulasi dijalankan.",
      icon: HelpCircle,
      accent: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/30",
      text: "text-purple-400",
    },
    {
      step: "02",
      title: "Eksplorasi Terbimbing",
      subtitle: "Manipulasi Langsung",
      desc: "Putar dan geser slider kanvas real-time. Amati pergeseran angka dan keteraturan pada tabel observasi.",
      icon: Compass,
      accent: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
    },
    {
      step: "03",
      title: "Formalisasi Rumus",
      subtitle: "Susun Persamaan",
      desc: "Lengkapi persamaan simbolik KaTeX berdasarkan pola grafis yang baru saja kamu temukan sendiri.",
      icon: FileText,
      accent: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
    {
      step: "04",
      title: "Tantangan & Refleksi",
      subtitle: "Uji Pemahaman",
      desc: "Pecahkan teka-teki logika target kanvas, klaim XP & lencana, serta jembatani konsep ke materi berikutnya.",
      icon: Target,
      accent: "from-amber-500/20 to-amber-500/5",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
  ];

  return (
    <section
      role="region"
      aria-label="Metodologi Pembelajaran Guided Discovery"
      className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80"
    >
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          Paradigma Belajar Nalar
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Siklus Belajar: Discover → Build → Apply
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Tidak ada teks ceramah panjang. Setiap tingkat membimbingmu dari ketidaktahuan menuju perumusan kaidah sains secara mandiri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className={`relative p-5 rounded-3xl bg-gradient-to-b ${s.accent} border ${s.border} bg-neutral-900/90 shadow-lg flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform duration-200`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-black ${s.text} px-2 py-0.5 rounded-md bg-neutral-950/60 border border-neutral-800`}>
                    Fase {s.step}
                  </span>
                  <div className={`p-2 rounded-xl bg-neutral-950/70 ${s.text}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                    {s.subtitle}
                  </span>
                  <h3 className="text-base font-black text-white">{s.title}</h3>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
