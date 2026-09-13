"use client";

import React from "react";
import { Eye, Volume2, LockOpen, Keyboard } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function InclusivityShowcase() {
  const pillars = [
    {
      title: "Ramah Low-Vision & Difabel Visual",
      desc: "Dukungan tema gelap natif, palet kontras tinggi (High-Contrast Mode), serta skala font fleksibel tanpa merusak proporsi grafis kanvas matematika.",
      icon: Eye,
      badge: "WCAG AAA",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Asistensi Suara & Takarir Teks",
      desc: "Pemanfaatan Web Speech API bawaan peramban untuk mendiktekan ringkasan materi dan nilai variabel, dilengkapi takarir teks visual ramah tunarungu.",
      icon: Volume2,
      badge: "Native Speech API",
      accent: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Navigasi Papan Ketik Penuh",
      desc: "Seluruh tombol, slider nilai, dan kanvas interaktif dapat dioperasikan 100% menggunakan keyboard (Tab, tombol panah, Space, Enter) dengan atribut ARIA lengkap.",
      icon: Keyboard,
      badge: "Keyboard-First",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Zero-Friction & Privasi Terjaga",
      desc: "Bebas dari login/register paksa di awal. Skor tantangan, perolehan XP, dan preferensi aksesibilitas disimpan secara lokal di localStorage peramban Anda.",
      icon: LockOpen,
      badge: "100% Client-Side",
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <section
      role="region"
      aria-label="Pilar Aksesibilitas dan Inklusivitas Nalar"
      className="w-full max-w-6xl px-4 py-12 border-t border-neutral-800/80"
    >
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          Inklusivitas Berakar dalam Arsitektur
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Pendidikan STEM Tanpa Hambatan Fisik atau Finansial
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Mewujudkan tujuan SDG 4 dengan memastikan setiap anak, terlepas dari keterbatasan sensorik atau perangkat, memiliki akses setara ke intuisi sains tingkat tinggi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Card key={idx} className="p-5 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${p.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white leading-snug">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
