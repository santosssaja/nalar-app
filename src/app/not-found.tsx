"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NaiExpressions } from "@/components/nai/NaiExpressions";
import { Button } from "@/components/ui/Button";
import { Home, Compass, ArrowLeft, Sparkles, Volume2 } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useNai } from "@/components/nai/NaiContext";

const RECOMMENDED_TOPICS = [
  {
    title: "Jam Modular",
    category: "Matematika",
    route: "/topics/arithmetic-modular-clock",
  },
  {
    title: "Bidang Miring Newton",
    category: "Fisika",
    route: "/topics/physics-newton-incline",
  },
  {
    title: "Kanon Proyektil",
    category: "Fisika",
    route: "/topics/physics-projectile-motion",
  },
  {
    title: "Rangkaian Listrik DC",
    category: "Fisika",
    route: "/topics/physics-dc-circuits",
  },
];

export default function NotFound() {
  const router = useRouter();
  const { speakText, isSpeaking } = useAccessibility();
  const { say } = useNai();

  const narrationText =
    "Wah, kamu berada di luar koordinat semesta Nalar! Halaman yang kamu tuju belum terpetakan atau tautan telah berpindah. Yuk kembali ke beranda atau jelajahi katalog modul.";

  useEffect(() => {
    say("Wah, sepertinya kita tersesat di luar peta nalar!", {
      expression: "curious",
    });
  }, [say]);

  return (
    <div
      className="flex-1 w-full min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-neutral-950 to-neutral-950 animate-fade-in select-none"
      role="region"
      aria-label="Halaman Tidak Ditemukan (404)"
    >
      <div className="w-full max-w-xl mx-auto space-y-6 flex flex-col items-center">
        {/* Animated Nai Avatar in Portal Ring */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/20 via-amber-500/20 to-rose-500/20 blur-xl animate-pulse" />
          <div className="relative p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-sm">
            <NaiExpressions expression="curious" size={96} />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>Tersesat?</span>
          </div>
        </div>

        {/* 404 Heading & Text */}
        <div className="space-y-2">
          <div className="inline-block">
            <span className="text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-amber-300 to-rose-400 bg-clip-text text-transparent font-mono">
              404
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Koordinat Belum Terpetakan
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Sepertinya kamu berada di luar koordinat semesta Nalar. Materi atau halaman yang kamu tuju belum tersedia atau tautan telah berpindah dimensi.
          </p>
        </div>

        {/* Audio Assistant Trigger */}
        <button
          type="button"
          onClick={() => speakText(narrationText)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition"
          aria-label="Dengarkan penjelasan audio asisten Nai"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-sky-400 animate-pulse" : "text-amber-400"}`} />
          <span>Dengarkan Nai</span>
        </button>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
              className="font-bold text-xs px-5 shadow-lg shadow-indigo-600/30"
            >
              Kembali ke Beranda
            </Button>
          </Link>

          <Link href="/explore">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Compass className="w-4 h-4 text-indigo-400" />}
              className="font-bold text-xs px-5 bg-neutral-900/80 hover:bg-neutral-800"
            >
              Jelajahi Katalog Modul
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="md"
            onClick={() => router.back()}
            leftIcon={<ArrowLeft className="w-4 h-4 text-neutral-400" />}
            className="font-medium text-xs text-neutral-400 hover:text-neutral-200"
          >
            Halaman Sebelumnya
          </Button>
        </div>

        {/* Recommended Topics Suggestions */}
        <div className="w-full pt-4 border-t border-neutral-800/80 space-y-2.5">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            Atau Jelajahi Laboratorium Populer:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {RECOMMENDED_TOPICS.map((top) => (
              <Link
                key={top.route}
                href={top.route}
                className="px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition flex items-center gap-1.5 shadow-sm"
              >
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 font-mono text-neutral-400">
                  {top.category}
                </span>
                <span className="font-semibold">{top.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
