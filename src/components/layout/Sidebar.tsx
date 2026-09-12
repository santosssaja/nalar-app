"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { clsx } from "clsx";
import { useGamification } from "@/context/GamificationContext";
import { Tooltip } from "@/components/ui/Tooltip";
import { SidebarNavItems } from "./SidebarNavItems";
import { SidebarRankCard } from "./SidebarRankCard";

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
  const { progress, rankInfo } = useGamification();
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

  const renderContent = (collapsed: boolean) => (
    <div
      className={clsx(
        "flex flex-col h-full justify-between bg-neutral-900 border-r border-neutral-800 text-neutral-200 transition-all duration-200 select-none",
        collapsed ? "w-20 p-2.5 items-center overflow-visible" : "w-64 p-4 overflow-y-auto"
      )}
    >
      <div className={clsx("w-full space-y-5", collapsed && "overflow-visible")}>
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
            position={collapsed ? "right" : "bottom"}
          >
            <button
              type="button"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? "Perlebar sidebar desktop" : "Perkecil sidebar desktop"}
              className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition cursor-pointer"
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
        <SidebarNavItems
          pathname={pathname}
          isCollapsed={collapsed}
          onClose={onClose}
        />

        {/* User Rank Card */}
        <SidebarRankCard
          rank={rankInfo}
          currentXp={progress.xp}
          isCollapsed={collapsed}
        />
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
          "hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 transition-[width] duration-200",
          isCollapsed ? "w-20 overflow-visible" : "w-64 overflow-y-auto"
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
