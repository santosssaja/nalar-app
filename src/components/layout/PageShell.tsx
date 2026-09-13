"use client";

import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export interface PageShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function PageShell({ children, showSidebar = true }: PageShellProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const shouldShowSidebar = showSidebar && !isLandingPage;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <TopBar
        onToggleSidebar={shouldShowSidebar ? handleToggleDrawer : undefined}
        isSidebarOpen={isDrawerOpen}
      />

      <div className="flex-1 flex w-full">
        {shouldShowSidebar && (
          <Sidebar
            isDrawerOpen={isDrawerOpen}
            onCloseDrawer={handleCloseDrawer}
            onOpenDrawer={handleOpenDrawer}
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
