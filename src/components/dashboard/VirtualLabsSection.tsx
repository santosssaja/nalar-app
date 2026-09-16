"use client";

import React from "react";
import Link from "next/link";
import { FlaskConical, Play, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function VirtualLabsSection() {
  const labs = [
    {
      id: "lab-kinematics",
      title: "Simulator Kinematika Multi-Grafik",
      subtitle: "Flagship STEM Experience",
      description: "Manipulasi kecepatan awal v₀, percepatan a, dan sudut elevasi θ. Amati sinkronisasi 4 grafik: lintasan parabola, x-t, v-t, dan a-t secara real-time.",
      route: "/topics/science-kinematics",
      isFlagship: true,
      tag: "Flagship Lab",
    },
    {
      id: "lab-number-line",
      title: "Laboratorium Garis Bilangan Riil",
      subtitle: "Eksplorasi Spasial Kontinum",
      description: "Uji coba perbesaran tak hingga, vektor translasi penjumlahan, dilatasi perkalian, dan penataan geometris hukum distributif.",
      route: "/topics/math-real-numbers",
      isFlagship: false,
      tag: "Math Lab",
    },
    {
      id: "lab-unit-circle",
      title: "Kanvas Lingkaran Satuan Trigonometri",
      subtitle: "Proyeksi Polar ke Ortogonal",
      description: "Putar titik pada lingkaran berjejari satu, saksikan proyeksi sinus dan kosinus membentuk kurva gelombang sinusoidal reaktif.",
      route: "/topics/math-trig-unit-circle",
      isFlagship: false,
      tag: "Math Lab",
    },
  ];

  return (
    <section className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" />
            <span>Laboratorium & Eksperimen Virtual</span>
          </div>
          <h2 className="text-xl font-black text-white">Simulasi Kanvas Interaktif</h2>
        </div>
        <span className="text-xs text-neutral-400 hidden sm:inline">
          Ubah parameter, amati reaksi seketika
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${lab.isFlagship
                ? "bg-gradient-to-br from-neutral-950 via-indigo-950/20 to-amber-950/20 border-amber-500/40 shadow-xl shadow-amber-500/5 hover:border-amber-400"
                : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
              }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lab.isFlagship
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-neutral-800 text-neutral-400 border-neutral-700"
                    }`}
                >
                  {lab.tag}
                </span>
                {lab.isFlagship && (
                  <span className="text-amber-400 flex items-center gap-1 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 fill-current" /> MVP Star
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-base text-white">{lab.title}</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{lab.description}</p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-end">
              <Link href={lab.route}>
                <Button
                  variant={lab.isFlagship ? "primary" : "secondary"}
                  size="sm"
                  leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                >
                  Buka Simulator
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
