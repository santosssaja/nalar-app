"use client";

import React, { useState } from "react";
import { useGamification } from "@/context/GamificationContext";
import { ALL_BADGES } from "@/lib/gamification/types";
import { XPBar } from "./XPBar";
import { StreakCounter } from "./StreakCounter";
import { BadgeCard } from "./BadgeCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Award,
  Calendar,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export function Dashboard() {
  const { progress, rankInfo, resetProgress } = useGamification();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const unlockedIds = new Set(progress.unlockedBadges);

  // Simple 28-day activity heatmap
  const daysInMonth = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return d.toISOString().split("T")[0];
  });

  const activeDatesSet = new Set(progress.activityDates || [progress.lastActiveDate]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Header Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Dashboard Progres Belajar
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Status Kemampuan: {rankInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              Pantau akumulasi poin pengalaman, konsistensi harian, dan lencana yang telah kamu raih.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StreakCounter />
            <Link href="/explore">
              <Button variant="primary" size="md" leftIcon={<BookOpen className="w-4 h-4" />}>
                Skill Tree
              </Button>
            </Link>
          </div>
        </div>

        {/* XP Bar */}
        <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
          <XPBar />
        </div>
      </section>

      {/* Quick Statistics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block">Total Poin</span>
            <span className="text-2xl font-black text-white font-mono">{progress.xp} XP</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block">Tantangan Diselesaikan</span>
            <span className="text-2xl font-black text-white font-mono">
              {progress.solvedChallenges.length}
            </span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block">Lencana Diraih</span>
            <span className="text-2xl font-black text-white font-mono">
              {progress.unlockedBadges.length} / {ALL_BADGES.length}
            </span>
          </div>
        </Card>
      </section>

      {/* Activity Heatmap Calendar */}
      <section className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-base text-white">Kalender Aktivitas 28 Hari Terakhir</h3>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 pt-2">
          {daysInMonth.map((dateStr) => {
            const isActive = activeDatesSet.has(dateStr);
            return (
              <div
                key={dateStr}
                title={`${dateStr}: ${isActive ? "Aktif Belajar" : "Tidak Ada Aktivitas"}`}
                className={`h-6 rounded-md transition-colors ${
                  isActive
                    ? "bg-emerald-500 border border-emerald-400 shadow-sm shadow-emerald-500/20"
                    : "bg-neutral-800 border border-neutral-700/50"
                }`}
              />
            );
          })}
        </div>
      </section>

      {/* Badges Shelf */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Koleksi Prestasi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Galeri Lencana STEM
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={unlockedIds.has(badge.id)}
            />
          ))}
        </div>
      </section>

      {/* Danger Zone: Reset Data */}
      <section className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
        <p>Data progres disimpan secara lokal di peramban Anda (Zero-friction onboarding).</p>
        <div>
          {!showConfirmReset ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmReset(true)}
              className="text-neutral-500 hover:text-rose-400"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Semua Progres
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">Yakin reset?</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  resetProgress();
                  setShowConfirmReset(false);
                }}
              >
                Ya, Reset
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmReset(false)}
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
