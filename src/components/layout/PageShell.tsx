"use client";

import React, { useState, useCallback } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export interface PageShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

function getInitialDesktopCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("nalar_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
}

export function PageShell({ children, showSidebar = true }: PageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(getInitialDesktopCollapsed);

  const toggleDesktopCollapse = useCallback(() => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("nalar_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const handleToggleSidebar = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      toggleDesktopCollapse();
    } else {
      setIsSidebarOpen((prev) => !prev);
    }
  }, [toggleDesktopCollapse]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <TopBar
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex w-full">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isCollapsed={isDesktopCollapsed}
            onToggleCollapse={toggleDesktopCollapse}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
