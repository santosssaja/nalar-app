"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Flame,
  Award,
  Menu,
  X,
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { KeyboardShortcutsModal } from "@/components/accessibility/KeyboardShortcutsModal";
import { BadgesModal } from "./BadgesModal";
import { Tooltip } from "@/components/ui/Tooltip";
import { TopBarA11yControls } from "./TopBarA11yControls";

export interface TopBarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function TopBar({ onToggleSidebar, isSidebarOpen }: TopBarProps) {
  const { progress, unlockedBadgeList } = useGamification();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <>
      <header
        role="banner"
        className="w-full max-w-full overflow-x-hidden h-16 bg-neutral-900/95 border-b border-neutral-800 backdrop-blur-md px-2.5 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 text-neutral-200 text-sm z-40 sticky top-0"
      >
        {/* Left: Brand, Mobile Toggle & Landing Nav */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleSidebar && (
            <Tooltip
              content={isSidebarOpen ? "Tutup menu" : "Menu navigasi"}
              position="bottom"
            >
              <button
                type="button"
                onClick={onToggleSidebar}
                className="md:hidden p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                aria-label={isSidebarOpen ? "Tutup menu" : "Buka menu"}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </Tooltip>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 font-black tracking-tight text-white hover:text-indigo-400 transition"
            aria-label="Beranda Nalar"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-md shadow-indigo-500/25">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base tracking-tight font-black leading-none">NALAR</span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-normal hidden lg:inline">
                STEM Interaktif & Inklusif
              </span>
            </div>
          </Link>

          {/* Desktop Navigation for Landing Page */}
          {isLandingPage && (
            <nav
              aria-label="Navigasi Header Landing"
              className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-neutral-800"
            >
              <Link
                href="/explore"
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                Katalog Modul
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>

        {/* Center: Gamification Stats (Streak & XP) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Streak Counter */}
          <Tooltip content="Streak belajar berturut-turut" position="bottom">
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
              aria-label={`Streak belajar: ${progress.consecutiveDays} hari`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[11px] sm:text-xs font-bold">{progress.consecutiveDays}<span className="hidden sm:inline"> hr</span></span>
            </div>
          </Tooltip>

          {/* XP Counter */}
          <Tooltip content="Total poin pengalaman (XP) yang diraih" position="bottom">
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono"
              aria-label={`Poin pengalaman: ${progress.xp} XP`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] sm:text-xs font-bold">{progress.xp}<span className="hidden sm:inline"> XP</span></span>
            </div>
          </Tooltip>

          {/* Badges Button */}
          <Tooltip content="Lihat lencana penghargaan kamu" position="bottom">
            <button
              type="button"
              onClick={() => setShowBadgeModal(true)}
              className="relative p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
              aria-label="Buka daftar lencana"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              {unlockedBadgeList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unlockedBadgeList.length}
                </span>
              )}
            </button>
          </Tooltip>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center shrink-0">
          <TopBarA11yControls onOpenShortcuts={() => setShowShortcuts(true)} />
        </div>
      </header>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Badges Modal */}
      <BadgesModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        unlockedBadgeList={unlockedBadgeList}
      />
    </>
  );
}
