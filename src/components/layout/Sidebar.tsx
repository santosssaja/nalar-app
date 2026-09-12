"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Network,
  BookOpen,
  Sparkles,
  Compass,
  ChevronRight,
  ChevronLeft,
  Clock,
  Grid,
} from "lucide-react";
import { clsx } from "clsx";
import { useGamification } from "@/context/GamificationContext";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tooltip } from "@/components/ui/Tooltip";

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function getInitialCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("nalar_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
}

export function Sidebar({
  isOpen = false,
  onClose,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { progress } = useGamification();
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(getInitialCollapsed);

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem("nalar_sidebar_collapsed", String(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  };

  const getRank = (xp: number) => {
    if (xp >= 5000) return { title: "Master", next: 10000, min: 5000 };
    if (xp >= 2000) return { title: "Scholar", next: 5000, min: 2000 };
    if (xp >= 500) return { title: "Navigator", next: 2000, min: 500 };
    return { title: "Explorer", next: 500, min: 0 };
  };

  const rank = getRank(progress.xp);
  const xpInRank = progress.xp - rank.min;
  const xpToNext = rank.next - rank.min;

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Skill Tree (Peta)",
      href: "/explore",
      icon: Network,
      isActive: pathname.startsWith("/explore"),
      badge: "Graf",
    },
    {
      label: "Katalog Modul",
      href: "/#katalog",
      icon: BookOpen,
      isActive: pathname.startsWith("/topics"),
    },
  ];

  const renderContent = (collapsed: boolean) => (
    <div
      className={clsx(
        "flex flex-col h-full justify-between bg-neutral-900 border-r border-neutral-800 text-neutral-200 transition-all duration-200 select-none",
        collapsed ? "w-20 p-2.5 items-center" : "w-64 p-4"
      )}
    >
      <div className="w-full space-y-5">
        {/* Top collapse toggle for desktop */}
        <div
          className={clsx(
            "hidden md:flex items-center pb-1 border-b border-neutral-800/80",
            collapsed ? "justify-center" : "justify-between px-1"
          )}
        >
          {!collapsed && (
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Navigasi
            </span>
          )}
          <Tooltip
            content={collapsed ? "Perlebar sidebar" : "Perkecil sidebar"}
            position="right"
          >
            <button
              type="button"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? "Perlebar sidebar desktop" : "Perkecil sidebar desktop"}
              className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </Tooltip>
        </div>

        {/* Navigation links */}
        <nav aria-label="Navigasi Utama" className="space-y-1.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center rounded-xl text-sm font-bold transition duration-150",
                  collapsed
                    ? "justify-center w-full p-2.5"
                    : "justify-between px-3.5 py-2.5",
                  item.isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                )}
                aria-current={item.isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={clsx(
                      "w-4 h-4 shrink-0",
                      item.isActive ? "text-indigo-400" : "text-neutral-400"
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href} content={item.label} position="right">
                  {linkContent}
                </Tooltip>
              );
            }
            return linkContent;
          })}
        </nav>

        {/* User Rank Card */}
        {collapsed ? (
          <Tooltip
            content={`Level ${rank.title} • ${progress.xp} XP (${Math.max(0, rank.next - progress.xp)} XP lagi)`}
            position="right"
          >
            <div className="w-full flex justify-center py-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
            </div>
          </Tooltip>
        ) : (
          <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  Level {rank.title}
                </span>
              </div>
              <span className="text-[10px] text-amber-300 font-mono font-bold">
                {progress.xp} XP
              </span>
            </div>

            <ProgressBar
              value={xpInRank}
              max={xpToNext}
              size="sm"
              variant="amber"
            />

            <p className="text-[11px] text-neutral-400 leading-tight">
              {Math.max(0, rank.next - progress.xp)} XP lagi menuju tingkatan berikutnya.
            </p>
          </div>
        )}

        {/* Quick Launch Topics */}
        {collapsed ? (
          <div className="w-full space-y-2 pt-2 border-t border-neutral-800/60 flex flex-col items-center">
            <Tooltip content="Modulo & Pola Jam" position="right">
              <Link
                href="/topics/arithmetic-modular-clock"
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 text-amber-400 border border-amber-500/20 hover:border-amber-400 transition flex items-center justify-center"
              >
                <Clock className="w-4 h-4" />
              </Link>
            </Tooltip>

            <Tooltip content="Determinan Matriks 2D" position="right">
              <Link
                href="/topics/linear-algebra-determinant-2d"
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 text-indigo-400 border border-indigo-500/20 hover:border-indigo-400 transition flex items-center justify-center"
              >
                <Grid className="w-4 h-4" />
              </Link>
            </Tooltip>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-1">
              Topik Siap Akses
            </span>
            <div className="space-y-1 text-xs">
              <Link
                href="/topics/arithmetic-modular-clock"
                onClick={onClose}
                className="group flex items-center justify-between p-2 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-transparent hover:border-amber-500/30 text-neutral-300 hover:text-white transition"
              >
                <div className="truncate pr-1">
                  <p className="font-semibold truncate">Modulo & Pola Jam</p>
                  <p className="text-[10px] text-neutral-500">Level 1 • Aritmetika</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 shrink-0" />
              </Link>

              <Link
                href="/topics/linear-algebra-determinant-2d"
                onClick={onClose}
                className="group flex items-center justify-between p-2 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-transparent hover:border-indigo-500/30 text-neutral-300 hover:text-white transition"
              >
                <div className="truncate pr-1">
                  <p className="font-semibold truncate">Determinan Ruang 2D</p>
                  <p className="text-[10px] text-neutral-500">Level 3 • Aljabar Linear</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-indigo-400 shrink-0" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div
        className={clsx(
          "pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 w-full",
          collapsed ? "text-center" : "space-y-1"
        )}
      >
        <p className="flex items-center justify-center md:justify-start gap-1 text-neutral-400 font-semibold">
          <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
          {!collapsed && <span>Nalar STEM v0.1</span>}
        </p>
        {!collapsed && <p>Inklusif & Ramah Difabel</p>}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (responsive width, collapsable) */}
      <aside
        aria-label="Sidebar Navigasi Desktop"
        className={clsx(
          "hidden md:block shrink-0 sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto transition-[width] duration-200",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {renderContent(isCollapsed)}
      </aside>

      {/* Mobile Drawer (overlay, always expanded when opened) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside
            aria-label="Sidebar Navigasi Mobile"
            className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-slide-in"
          >
            {renderContent(false)}
          </aside>
        </div>
      )}
    </>
  );
}
