"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  Keyboard,
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { Tooltip } from "@/components/ui/Tooltip";
import { SidebarNavItems } from "./SidebarNavItems";
import { SidebarRankCard } from "./SidebarRankCard";

export interface SidebarProps {
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  onOpenDrawer?: () => void;
  // Backward-compatible props
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  isDrawerOpen: controlledDrawerOpen,
  onCloseDrawer,
  onOpenDrawer,
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { progress, rankInfo } = useGamification();

  const isDrawerActive = controlledDrawerOpen ?? isOpen ?? false;
  const handleClose = onCloseDrawer ?? onClose;

  // Listen to Escape key to close drawer
  useEffect(() => {
    if (!isDrawerActive || !handleClose) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerActive, handleClose]);

  return (
    <>
      {/* 1. Desktop Permanent Compact Icon-Rail (Fixed 72px width, Zero Layout Shift) */}
      <aside
        aria-label="Sidebar Navigasi Cepat"
        className="hidden md:flex flex-col w-[72px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 bg-neutral-900 border-r border-neutral-800 text-neutral-200 select-none justify-between items-center p-2.5"
      >
        <div className="w-full flex flex-col items-center space-y-4">
          {/* Drawer open button */}
          <div className="w-full flex justify-center pb-2 border-b border-neutral-800/80">
            <Tooltip content="Buka menu lengkap" position="right">
              <button
                type="button"
                onClick={onOpenDrawer}
                aria-label="Buka menu navigasi lengkap"
                className="w-10 h-10 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer border border-neutral-700/50"
              >
                <Menu className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>

          {/* Navigation icons */}
          <SidebarNavItems
            pathname={pathname}
            isCollapsed={true}
            onClose={handleClose}
          />

          {/* User Rank Icon Badge */}
          <SidebarRankCard
            rank={rankInfo}
            currentXp={progress.xp}
            isCollapsed={true}
          />
        </div>

        {/* Footer info icon */}
        <div className="pt-3 border-t border-neutral-800/80 w-full flex justify-center">
          <Tooltip content="Nalar STEM v0.1 • Inklusif & Ramah Difabel" position="right">
            <div className="p-2 rounded-xl text-neutral-500 hover:text-indigo-400 transition cursor-default">
              <Sparkles className="w-4 h-4" />
            </div>
          </Tooltip>
        </div>
      </aside>

      {/* 2. Full Drawer Overlay (for both Desktop detail view and Mobile drawer) */}
      {isDrawerActive && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Penuh"
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in transition-opacity cursor-pointer"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Sliding Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-neutral-900 border-r border-neutral-800 shadow-2xl z-10 flex flex-col justify-between p-4 sm:p-5 animate-slide-in select-none">
            <div className="space-y-5 overflow-y-auto pr-1">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-indigo-500/30">
                    N
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white tracking-tight leading-none">
                      NALAR STEM
                    </h2>
                    <p className="text-[10px] text-neutral-400 font-medium mt-0.5">
                      Menu Navigasi & Progres
                    </p>
                  </div>
                </div>

                <Tooltip content="Tutup menu (Esc)" position="bottom">
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Tutup menu navigasi"
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Tooltip>
              </div>

              {/* Full Navigation Links */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
                  Navigasi Utama
                </span>
                <SidebarNavItems
                  pathname={pathname}
                  isCollapsed={false}
                  onClose={handleClose}
                />
              </div>

              {/* Full User Rank & XP Progress Card */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
                  Pencapaian Belajar
                </span>
                <SidebarRankCard
                  rank={rankInfo}
                  currentXp={progress.xp}
                  isCollapsed={false}
                />
              </div>

              {/* Quick tip / A11y shortcut note */}
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-[11px] text-neutral-400 space-y-1">
                <p className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                  <Keyboard className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Pintasan Cepat</span>
                </p>
                <p className="text-[10px] text-neutral-400">
                  Tekan <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[9px]">Esc</kbd> untuk menutup menu ini kapan saja.
                </p>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 space-y-1">
              <p className="flex items-center gap-1 text-neutral-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Nalar STEM v0.1</span>
              </p>
              <p className="text-[10px]">Pendidikan Berkualitas & Ramah Difabel</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
