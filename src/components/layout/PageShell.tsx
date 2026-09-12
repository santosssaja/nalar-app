"use client";

import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useLocalStorage } from "@/lib/storage";

export interface PageShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function PageShell({ children, showSidebar = true }: PageShellProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const shouldShowSidebar = showSidebar && !isLandingPage;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useLocalStorage<boolean>(
    "nalar_sidebar_collapsed",
    false
  );

  const toggleDesktopCollapse = useCallback(() => {
    setIsDesktopCollapsed((prev) => !prev);
  }, [setIsDesktopCollapsed]);

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
        onToggleSidebar={shouldShowSidebar ? handleToggleSidebar : undefined}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex w-full">
        {shouldShowSidebar && (
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
