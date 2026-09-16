"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  Keyboard,
} from "lucide-react";
import { clsx } from "clsx";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const isDrawerActive = controlledDrawerOpen ?? isOpen ?? false;
  const handleClose = onCloseDrawer ?? onClose;

  // Manage focus: when drawer opens, focus close button. When closed, return focus to open trigger button.
  useEffect(() => {
    if (isDrawerActive) {
      // Small timeout to allow transition initialization
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isDrawerActive]);

  // Listen to Escape key to close drawer and restore focus
  useEffect(() => {
    if (!isDrawerActive || !handleClose) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        openButtonRef.current?.focus();
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
          {/* Drawer open button with micro-animation */}
          <div className="w-full flex justify-center pb-2 border-b border-neutral-800/80">
            <Tooltip content="Buka menu lengkap" position="right">
              <button
                ref={openButtonRef}
                type="button"
                onClick={onOpenDrawer}
                aria-label="Buka menu navigasi lengkap"
                aria-expanded={isDrawerActive}
                className="w-10 h-10 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-neutral-700/50 hover:border-indigo-500/40 group shadow-sm"
              >
                <Menu className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 group-hover:text-indigo-400" />
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

      {/* 2. Full Drawer Overlay with Fluid Enter & Exit Transitions */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Penuh"
        aria-hidden={!isDrawerActive}
        inert={!isDrawerActive ? true : undefined}
        className={clsx(
          "fixed inset-0 z-50 flex transition-[visibility] duration-300",
          isDrawerActive
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible delay-300"
        )}
      >
        {/* Backdrop Blur with Fade-in and Fade-out */}
        <div
          className={clsx(
            "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out cursor-pointer",
            isDrawerActive ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Sliding Drawer Panel with Snappy Spring Easing */}
        <div
          className={clsx(
            "relative w-80 max-w-[85vw] h-full bg-neutral-900 border-r border-neutral-800 shadow-2xl z-10 flex flex-col justify-between p-4 sm:p-5 select-none",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
            isDrawerActive ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div
            className={clsx(
              "flex-1 space-y-5 overflow-y-auto pr-1 transition-all duration-500 ease-out",
              isDrawerActive
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-3"
            )}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center gap-2 sm:gap-2.5 font-black tracking-tight text-white hover:text-indigo-400 transition group"
                aria-label="Beranda Nalar"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base tracking-tight font-black leading-none text-white group-hover:text-indigo-300 transition-colors">
                    NALAR
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium tracking-normal mt-0.5">
                    STEM Interaktif & Inklusif
                  </span>
                </div>
              </Link>

              <Tooltip content="Tutup menu (Esc)" position="bottom">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Tutup menu navigasi"
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer border border-neutral-700/40 group"
                >
                  <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90 group-hover:text-rose-400" />
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
          <div
            className={clsx(
              "pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 space-y-1 transition-opacity duration-500",
              isDrawerActive ? "opacity-100" : "opacity-0"
            )}
          >
            <p className="flex items-center gap-1 text-neutral-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Nalar STEM v0.1</span>
            </p>
            <p className="text-[10px]">Pendidikan Berkualitas & Ramah Difabel</p>
          </div>
        </div>
      </div>
    </>
  );
}
